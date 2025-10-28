// Airtable API Configuration Template
// Copy this file to airtable-config.js and update with your actual credentials
// For production: Set environment variables in your hosting platform

const AirtableConfig = {
    // Airtable API Key (Personal Access Token)
    // Get from: https://airtable.com/create/tokens
    // Set as AIRTABLE_API_KEY environment variable
    apiKey: 'YOUR_AIRTABLE_API_KEY_HERE',
    
    // Airtable Base ID
    // Find in your base URL: https://airtable.com/{BASE_ID}/tableName
    // Set as AIRTABLE_BASE_ID environment variable
    baseId: 'YOUR_BASE_ID_HERE',
    
    // Airtable API Base URL
    apiUrl: 'https://api.airtable.com/v0',
    
    // Environment
    environment: 'development', // or 'production'
    
    // API Rate Limit (requests per second)
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
window.AirtableConfig = AirtableConfig;

