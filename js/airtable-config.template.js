// Airtable API Configuration Template
// COPY THIS FILE TO js/airtable-config.js AND UPDATE WITH YOUR ACTUAL CREDENTIALS
// 
// IMPORTANT: js/airtable-config.js is in .gitignore and will NOT be committed
// This template file shows the structure but contains no real credentials

const AirtableConfig = {
    // Airtable API Key (Personal Access Token)
    // Get from: https://airtable.com/create/tokens
    // Set as AIRTABLE_API_KEY environment variable
    apiKey: window.AIRTABLE_API_KEY || window.ENV?.AIRTABLE_API_KEY || 'YOUR_AIRTABLE_API_KEY_HERE',
    
    // Airtable Base ID
    // Find in your base URL: https://airtable.com/{BASE_ID}/tableName
    // Set as AIRTABLE_BASE_ID environment variable
    baseId: window.AIRTABLE_BASE_ID || window.ENV?.AIRTABLE_BASE_ID || 'YOUR_BASE_ID_HERE',
    
    // Airtable API Base URL
    apiUrl: 'https://api.airtable.com/v0',
    
    // Environment
    environment: window.ENVIRONMENT || window.ENV?.ENVIRONMENT || 'development',
    
    // API Rate Limit (requests per second)
    // Free tier: 5 requests/second
    rateLimit: 5,
    
    // Get full API URL
    getApiUrl: function(tableName) {
        return `${this.apiUrl}/${this.baseId}/${tableName}`;
    },
    
    // Get headers for API requests
    getHeaders: function() {
        return {
            'Authorization': `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json'
        };
    },
    
    // Check if configuration is valid
    isValid: function() {
        return this.apiKey && 
               this.apiKey !== 'YOUR_AIRTABLE_API_KEY_HERE' &&
               this.baseId && 
               this.baseId !== 'YOUR_BASE_ID_HERE';
    }
};

// Export for use in other scripts
// Note: In a static site, this will be globally available
window.AirtableConfig = AirtableConfig;
