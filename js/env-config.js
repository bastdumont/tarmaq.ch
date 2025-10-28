// Environment Configuration Injector
// This script injects environment variables into the browser window object
// For static sites, environment variables need to be injected at build time or runtime

(function() {
    'use strict';
    
    // Environment variables (set these in your hosting platform or build process)
    const envVars = {
        // Airtable Configuration
        AIRTABLE_API_KEY: window.AIRTABLE_API_KEY || process?.env?.AIRTABLE_API_KEY || '',
        AIRTABLE_BASE_ID: window.AIRTABLE_BASE_ID || process?.env?.AIRTABLE_BASE_ID || '',
        
        // Email Configuration
        EMAILJS_PUBLIC_KEY: window.EMAILJS_PUBLIC_KEY || process?.env?.EMAILJS_PUBLIC_KEY || '',
        EMAILJS_SERVICE_ID: window.EMAILJS_SERVICE_ID || process?.env?.EMAILJS_SERVICE_ID || '',
        EMAILJS_TEMPLATE_ID: window.EMAILJS_TEMPLATE_ID || process?.env?.EMAILJS_TEMPLATE_ID || '',
        
        // General
        ENVIRONMENT: window.ENVIRONMENT || process?.env?.NODE_ENV || 'development'
    };
    
    // Inject environment variables into window object
    window.ENV = envVars;
    
    // Also set individual variables for backward compatibility
    Object.keys(envVars).forEach(key => {
        window[key] = envVars[key];
    });
    
    // Log configuration status (only in development)
    if (envVars.ENVIRONMENT === 'development') {
        console.log('Environment Configuration:', {
            airtableConfigured: !!(envVars.AIRTABLE_API_KEY && envVars.AIRTABLE_BASE_ID),
            emailjsConfigured: !!(envVars.EMAILJS_PUBLIC_KEY && envVars.EMAILJS_SERVICE_ID),
            environment: envVars.ENVIRONMENT
        });
    }
})();
