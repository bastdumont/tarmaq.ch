// Airtable API Integration
// Provides CRUD operations for Airtable tables

const AirtableAPI = {
    config: window.AirtableConfig || {},
    cache: new Map(),
    cacheTimeout: 5 * 60 * 1000, // 5 minutes
    
    /**
     * Fetch records from Airtable table
     * @param {string} tableName - Name of the Airtable table
     * @param {object} options - Query options (filter, sort, maxRecords, etc.)
     * @returns {Promise<Array>} Array of records
     */
    getRecords: async function(tableName, options = {}) {
        try {
            // Check cache first
            const cacheKey = `${tableName}_${JSON.stringify(options)}`;
            const cached = this.cache.get(cacheKey);
            if (cached && Date.now() - cached.timestamp < this.cacheTimeout) {
                console.log(`Cache hit for ${tableName}`);
                return cached.data;
            }
            
            // Build URL with query parameters
            const url = new URL(this.config.getApiUrl(tableName));
            if (options.filterByFormula) {
                url.searchParams.append('filterByFormula', options.filterByFormula);
            }
            if (options.sort) {
                options.sort.forEach(({field, direction = 'asc'}) => {
                    url.searchParams.append('sort[0][field]', field);
                    url.searchParams.append('sort[0][direction]', direction);
                });
            }
            if (options.maxRecords) {
                url.searchParams.append('maxRecords', options.maxRecords);
            }
            
            // Fetch from API
            const response = await fetch(url, {
                method: 'GET',
                headers: this.config.getHeaders()
            });
            
            if (!response.ok) {
                throw new Error(`Airtable API error: ${response.status} ${response.statusText}`);
            }
            
            const data = await response.json();
            
            // Store in cache
            this.cache.set(cacheKey, {
                data: data.records,
                timestamp: Date.now()
            });
            
            return data.records;
            
        } catch (error) {
            console.error(`Error fetching records from ${tableName}:`, error);
            throw error;
        }
    },
    
    /**
     * Get a single record by ID
     * @param {string} tableName - Name of the Airtable table
     * @param {string} recordId - Record ID
     * @returns {Promise<Object>} Record object
     */
    getRecord: async function(tableName, recordId) {
        try {
            const url = `${this.config.getApiUrl(tableName)}/${recordId}`;
            
            const response = await fetch(url, {
                method: 'GET',
                headers: this.config.getHeaders()
            });
            
            if (!response.ok) {
                throw new Error(`Airtable API error: ${response.status} ${response.statusText}`);
            }
            
            const data = await response.json();
            return data;
            
        } catch (error) {
            console.error(`Error fetching record ${recordId} from ${tableName}:`, error);
            throw error;
        }
    },
    
    /**
     * Create a new record in Airtable
     * @param {string} tableName - Name of the Airtable table
     * @param {object} fields - Record fields
     * @returns {Promise<Object>} Created record
     */
    createRecord: async function(tableName, fields) {
        try {
            const url = this.config.getApiUrl(tableName);
            
            const response = await fetch(url, {
                method: 'POST',
                headers: this.config.getHeaders(),
                body: JSON.stringify({
                    fields: fields
                })
            });
            
            if (!response.ok) {
                throw new Error(`Airtable API error: ${response.status} ${response.statusText}`);
            }
            
            const data = await response.json();
            
            // Clear cache for this table
            this.clearCache(tableName);
            
            return data;
            
        } catch (error) {
            console.error(`Error creating record in ${tableName}:`, error);
            throw error;
        }
    },
    
    /**
     * Update an existing record in Airtable
     * @param {string} tableName - Name of the Airtable table
     * @param {string} recordId - Record ID to update
     * @param {object} fields - Updated fields
     * @returns {Promise<Object>} Updated record
     */
    updateRecord: async function(tableName, recordId, fields) {
        try {
            const url = `${this.config.getApiUrl(tableName)}/${recordId}`;
            
            const response = await fetch(url, {
                method: 'PATCH',
                headers: this.config.getHeaders(),
                body: JSON.stringify({
                    fields: fields
                })
            });
            
            if (!response.ok) {
                throw new Error(`Airtable API error: ${response.status} ${response.statusText}`);
            }
            
            const data = await response.json();
            
            // Clear cache for this table
            this.clearCache(tableName);
            
            return data;
            
        } catch (error) {
            console.error(`Error updating record ${recordId} in ${tableName}:`, error);
            throw error;
        }
    },
    
    /**
     * Delete a record from Airtable
     * @param {string} tableName - Name of the Airtable table
     * @param {string} recordId - Record ID to delete
     * @returns {Promise<Object>} Deletion result
     */
    deleteRecord: async function(tableName, recordId) {
        try {
            const url = `${this.config.getApiUrl(tableName)}/${recordId}`;
            
            const response = await fetch(url, {
                method: 'DELETE',
                headers: this.config.getHeaders()
            });
            
            if (!response.ok) {
                throw new Error(`Airtable API error: ${response.status} ${response.statusText}`);
            }
            
            const data = await response.json();
            
            // Clear cache for this table
            this.clearCache(tableName);
            
            return data;
            
        } catch (error) {
            console.error(`Error deleting record ${recordId} from ${tableName}:`, error);
            throw error;
        }
    },
    
    /**
     * Clear cache for a specific table or all tables
     * @param {string} tableName - Optional table name to clear cache for
     */
    clearCache: function(tableName = null) {
        if (tableName) {
            // Clear all cache entries for this table
            for (let [key] of this.cache) {
                if (key.startsWith(tableName)) {
                    this.cache.delete(key);
                }
            }
        } else {
            // Clear all cache
            this.cache.clear();
        }
    },
    
    /**
     * Batch create records (up to 10 at a time)
     * @param {string} tableName - Name of the Airtable table
     * @param {Array} records - Array of record objects with fields
     * @returns {Promise<Object>} Created records
     */
    batchCreate: async function(tableName, records) {
        try {
            // Airtable allows max 10 records per batch
            const batchSize = 10;
            const results = [];
            
            for (let i = 0; i < records.length; i += batchSize) {
                const batch = records.slice(i, i + batchSize);
                
                const url = this.config.getApiUrl(tableName);
                const response = await fetch(url, {
                    method: 'POST',
                    headers: this.config.getHeaders(),
                    body: JSON.stringify({
                        records: batch
                    })
                });
                
                if (!response.ok) {
                    throw new Error(`Airtable API error: ${response.status} ${response.statusText}`);
                }
                
                const data = await response.json();
                results.push(...data.records);
            }
            
            // Clear cache for this table
            this.clearCache(tableName);
            
            return results;
            
        } catch (error) {
            console.error(`Error batch creating records in ${tableName}:`, error);
            throw error;
        }
    }
};

// Export for global use
window.AirtableAPI = AirtableAPI;

