// Global Configuration Template for TARMAQ Website
// Copy this file to config.js and update with your actual credentials

window.CONFIG = {
    // EmailJS Configuration
    EMAILJS: {
        PUBLIC_KEY: 'your_emailjs_public_key_here',
        SERVICE_ID: 'service_15n2y6q',
        TEMPLATE_ID: 'template_tzrwo6d'
    },
    
    // Email Configuration
    EMAIL: {
        NOTIFICATION_EMAIL: 'bastien@balder-app.com'
    },
    
    // Webhook Configuration
    WEBHOOK: {
        URL: 'https://webhook.site/your-unique-webhook-url'
    },
    
    // Airtable Configuration (for backward compatibility)
    AIRTABLE: {
        API_KEY: 'your_airtable_api_key_here',
        BASE_ID: 'your_airtable_base_id_here'
    }
};