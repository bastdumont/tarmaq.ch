# TARMAQ Website - Configuration Template
# Copy this file to config.js and fill in your actual values

// TARMAQ Website Configuration
// This file contains sensitive information - DO NOT commit to git

const CONFIG = {
    // EmailJS Configuration
    EMAILJS: {
        PUBLIC_KEY: 'your_public_key_here',
        SERVICE_ID: 'service_tarmaq',
        TEMPLATE_ID: 'template_charter_signature'
    },
    
    // Email Configuration
    EMAIL: {
        NOTIFICATION_EMAIL: 'bastien@balder-app.com',
        CONTACT_FORM_EMAIL: 'bastien@balder-app.com'
    },
    
    // Webhook Configuration (Alternative to EmailJS)
    WEBHOOK: {
        URL: 'https://webhook.site/your-unique-webhook-url'
    },
    
    // HubSpot Integration (if used)
    HUBSPOT: {
        PORTAL_ID: 'your_hubspot_portal_id',
        FORM_GUID: 'your_hubspot_form_guid'
    },
    
    // Analytics (if added later)
    ANALYTICS: {
        GOOGLE_ANALYTICS_ID: 'your_ga_id',
        GOOGLE_TAG_MANAGER_ID: 'your_gtm_id'
    },
    
    // Development
    DEVELOPMENT: {
        NODE_ENV: 'development',
        DEBUG: false
    }
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CONFIG;
} else if (typeof window !== 'undefined') {
    window.CONFIG = CONFIG;
}
