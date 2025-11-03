/**
 * Airtable API Integration Module
 * Handles all Airtable API calls with caching and error handling
 */

class AirtableAPI {
  constructor() {
    this.apiKey = '';
    this.baseId = 'appJ4MLPYJyuWWBG8';
    this.cache = new Map();
    this.cacheTimeout = 5 * 60 * 1000; // 5 minutes
    this.apiBaseUrl = 'https://api.airtable.com/v0';
  }

  /**
   * Initialize API by loading configuration from production or local sources
   * Priority: 1) Production env vars (via /api/env.js), 2) Local config file, 3) localStorage (dev only)
   */
  async init() {
    // First, try to load from production environment variables (Vercel serverless function)
    try {
      const response = await fetch('/api/env.js');
      if (response.ok) {
        const config = await response.json();
        if (config.AIRTABLE_API_KEY) {
          this.apiKey = config.AIRTABLE_API_KEY;
          if (config.AIRTABLE_BASE_ID) {
            this.baseId = config.AIRTABLE_BASE_ID;
          }
          console.log('✅ Airtable API initialized from production environment');
          return true;
        }
      }
    } catch (error) {
      console.log('⚠️ Production config not available, trying local sources...');
    }

    // If production config failed, try local config file (for local development)
    try {
      // Check if local config script exists and load it
      if (window.AIRTABLE_CONFIG) {
        this.apiKey = window.AIRTABLE_CONFIG.AIRTABLE_API_KEY || '';
        this.baseId = window.AIRTABLE_CONFIG.AIRTABLE_BASE_ID || this.baseId;
        console.log('✅ Airtable API initialized from local config (window.AIRTABLE_CONFIG)');
        return true;
      }
    } catch (error) {
      console.log('⚠️ Local config (window.AIRTABLE_CONFIG) not found');
    }

    // For localhost development, check localStorage (allows manual setting in browser console)
    const isLocalhost = window.location.hostname === 'localhost' || 
                       window.location.hostname === '127.0.0.1' ||
                       window.location.hostname === '';
    
    if (isLocalhost) {
      const localKey = localStorage.getItem('AIRTABLE_API_KEY');
      const localBaseId = localStorage.getItem('AIRTABLE_BASE_ID');
      
      if (localKey) {
        this.apiKey = localKey;
        if (localBaseId) {
          this.baseId = localBaseId;
        }
        console.log('✅ Airtable API initialized from localStorage (development mode)');
        console.log('💡 To set API key: localStorage.setItem("AIRTABLE_API_KEY", "your-key")');
        return true;
      }
    }

    // If all methods failed
    console.error('❌ Failed to initialize Airtable API: No configuration found');
    console.log('💡 Options:');
    console.log('   1. Set Vercel environment variables (production)');
    console.log('   2. Create js/airtable-config.local.js with: window.AIRTABLE_CONFIG = { AIRTABLE_API_KEY: "...", AIRTABLE_BASE_ID: "..." }');
    console.log('   3. Set localStorage: localStorage.setItem("AIRTABLE_API_KEY", "...") (localhost only)');
    return false;
  }

  /**
   * Check if API is ready
   */
  isReady() {
    return !!this.apiKey;
  }

  /**
   * Get cached data if available and not expired
   */
  getCached(tableName) {
    const cached = this.cache.get(tableName);
    if (cached && Date.now() - cached.timestamp < this.cacheTimeout) {
      return cached.data;
    }
    return null;
  }

  /**
   * Cache data with timestamp
   */
  setCache(tableName, data) {
    this.cache.set(tableName, {
      data,
      timestamp: Date.now(),
    });
  }

  /**
   * Clear cache for a specific table or all tables
   */
  clearCache(tableName = null) {
    if (tableName) {
      this.cache.delete(tableName);
    } else {
      this.cache.clear();
    }
  }

  /**
   * Make API request to Airtable
   */
  async makeRequest(tableName, options = {}) {
    if (!this.isReady()) {
      throw new Error('API not initialized. Call init() first.');
    }

    const url = `${this.apiBaseUrl}/${this.baseId}/${encodeURIComponent(tableName)}`;
    const params = new URLSearchParams();

    // Add query parameters
    if (options.view) {
      params.append('view', options.view);
    }
    if (options.filterByFormula) {
      params.append('filterByFormula', options.filterByFormula);
    }
    if (options.sort) {
      options.sort.forEach((sort, index) => {
        params.append(`sort[${index}][field]`, sort.field);
        params.append(`sort[${index}][direction]`, sort.direction || 'asc');
      });
    }
    if (options.maxRecords) {
      params.append('maxRecords', options.maxRecords);
    }

    const queryString = params.toString();
    const fullUrl = queryString ? `${url}?${queryString}` : url;

    try {
      const response = await fetch(fullUrl, {
        method: options.method || 'GET',
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
          ...options.headers,
        },
        body: options.body ? JSON.stringify(options.body) : undefined,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.error?.message || `HTTP error! status: ${response.status}`
        );
      }

      return await response.json();
    } catch (error) {
      console.error(`Error fetching ${tableName}:`, error);
      throw error;
    }
  }

  /**
   * Get all records from a table
   */
  async getRecords(tableName, options = {}) {
    // Check cache first
    const cacheKey = `${tableName}_${JSON.stringify(options)}`;
    const cached = this.getCached(cacheKey);
    if (cached) {
      return cached;
    }

    try {
      const data = await this.makeRequest(tableName, options);
      this.setCache(cacheKey, data);
      return data;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Get a single record by ID
   */
  async getRecord(tableName, recordId) {
    const url = `${this.apiBaseUrl}/${this.baseId}/${encodeURIComponent(tableName)}/${recordId}`;

    try {
      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error(`Error fetching record ${recordId}:`, error);
      throw error;
    }
  }

  /**
   * Create a new record
   */
  async createRecord(tableName, fields) {
    const data = await this.makeRequest(tableName, {
      method: 'POST',
      body: {
        fields,
      },
    });

    // Clear cache for this table
    this.clearCache(tableName);

    return data;
  }

  /**
   * Update a record
   */
  async updateRecord(tableName, recordId, fields) {
    const url = `${this.apiBaseUrl}/${this.baseId}/${encodeURIComponent(tableName)}/${recordId}`;

    try {
      const response = await fetch(url, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fields,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Clear cache for this table
      this.clearCache(tableName);

      return await response.json();
    } catch (error) {
      console.error(`Error updating record ${recordId}:`, error);
      throw error;
    }
  }

  /**
   * Delete a record
   */
  async deleteRecord(tableName, recordId) {
    const url = `${this.apiBaseUrl}/${this.baseId}/${encodeURIComponent(tableName)}/${recordId}`;

    try {
      const response = await fetch(url, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Clear cache for this table
      this.clearCache(tableName);

      return await response.json();
    } catch (error) {
      console.error(`Error deleting record ${recordId}:`, error);
      throw error;
    }
  }
}

// Create singleton instance
const airtableAPI = new AirtableAPI();

