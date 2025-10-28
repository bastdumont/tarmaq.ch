# TARMAQ Website Configuration Guide

This guide will help you set up all the necessary configurations for the TARMAQ website to work properly.

## Quick Setup Checklist

- [ ] Create Airtable base and get credentials
- [ ] Set up EmailJS account and get credentials  
- [ ] Configure environment variables
- [ ] Test charter signature functionality

## 1. Airtable Setup

### Create Airtable Base
1. Go to [airtable.com](https://airtable.com/) and create a new base
2. Name it "TARMAQ Website Backend"
3. Create a table called "Charter Signatures" with these fields:
   - `Name` (Single line text)
   - `Email` (Email field)
   - `Timestamp` (Date & time)
   - `Signature_Date` (Single line text)

### Get Airtable Credentials
1. **Base ID**: Go to Help → API documentation, copy your Base ID (starts with `app...`)
2. **API Key**: Go to [airtable.com/create/tokens](https://airtable.com/create/tokens)
   - Create new token named "TARMAQ Website"
   - Set scopes: `data.records:read`, `data.records:write`, `schema.bases:read`
   - Grant access to your base
   - Copy the token (starts with `pat...`)

## 2. EmailJS Setup

### Create EmailJS Account
1. Go to [emailjs.com](https://emailjs.com/) and sign up
2. Create a new service (Gmail, Outlook, etc.)
3. Create an email template for charter notifications

### Get EmailJS Credentials
1. **Public Key**: Found in Account → API Keys
2. **Service ID**: Found in Email Services
3. **Template ID**: Found in Email Templates

## 3. Configuration Files

### Option A: Environment Variables (Recommended for Production)

**For Netlify:**
1. Go to Site Settings → Environment Variables
2. Add these variables:
   ```
   AIRTABLE_API_KEY=pat_your_token_here
   AIRTABLE_BASE_ID=app_your_base_id_here
   EMAILJS_PUBLIC_KEY=your_emailjs_public_key_here
   EMAILJS_SERVICE_ID=your_service_id_here
   EMAILJS_TEMPLATE_ID=your_template_id_here
   ```

**For Vercel:**
1. Go to Project Settings → Environment Variables
2. Add the same variables as above

### Option B: Local Configuration Files

**Create `config.js` (copy from `config.example.js`):**
```javascript
window.CONFIG = {
    EMAILJS: {
        PUBLIC_KEY: 'your_emailjs_public_key_here',
        SERVICE_ID: 'your_service_id_here',
        TEMPLATE_ID: 'your_template_id_here'
    },
    EMAIL: {
        NOTIFICATION_EMAIL: 'bastien@balder-app.com'
    },
    AIRTABLE: {
        API_KEY: 'pat_your_token_here',
        BASE_ID: 'app_your_base_id_here'
    }
};
```

**Create `js/airtable-config.js` (copy from `js/airtable-config.example.js`):**
```javascript
const AirtableConfig = {
    apiKey: 'pat_your_token_here',
    baseId: 'app_your_base_id_here',
    // ... rest of config
};
```

## 4. Testing the Integration

### Test Charter Signatures
1. Open the charter page (`charte.html`)
2. Open browser console (F12)
3. Fill out and submit the charter form
4. Check console for messages:
   - ✅ "Signature saved to Airtable successfully"
   - ✅ "Email notification sent successfully"
5. Check your Airtable base for the new record
6. Check your email for the notification

### Debug Common Issues

**"Airtable not configured"**
- Check that `js/airtable-config.js` exists and has valid credentials
- Verify API key starts with `pat...` and Base ID starts with `app...`

**"EmailJS not loaded"**
- Check that `config.js` exists and has valid EmailJS credentials
- Verify EmailJS service and template IDs are correct

**"Airtable API not loaded"**
- Check that `js/airtable-api.js` is loaded in the HTML
- Verify script loading order in `charte.html`

## 5. Script Loading Order

Make sure scripts are loaded in this order in `charte.html`:
```html
<script src="config.js"></script>
<script src="js/env-config.js"></script>
<script src="js/airtable-config.js"></script>
<script src="js/airtable-api.js"></script>
<script src="js/charter.js"></script>
```

## 6. Security Notes

- Never commit `config.js` or `js/airtable-config.js` to git
- Use environment variables in production
- Rotate API keys regularly
- Use read-only tokens when possible

## 7. Troubleshooting

### Console Errors
- Check browser console for specific error messages
- Verify all script files are loading correctly
- Check network tab for failed API requests

### API Rate Limits
- Airtable free tier: 5 requests/second
- EmailJS free tier: 200 emails/month
- Consider caching for high-traffic sites

### CORS Issues
- Airtable API supports CORS
- Ensure you're using HTTPS in production
- Check browser console for CORS errors

## Support

If you encounter issues:
1. Check browser console for error messages
2. Verify all configuration files are correct
3. Test API credentials independently
4. Check Airtable and EmailJS documentation

---

**Last Updated**: 2025-01-23  
**Version**: 1.0
