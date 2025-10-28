# Airtable Setup Instructions

## Quick Setup

1. **Copy the template file:**
   ```bash
   cp js/airtable-config.template.js js/airtable-config.js
   ```

2. **Edit `js/airtable-config.js` and replace:**
   - `YOUR_AIRTABLE_API_KEY_HERE` with your actual API key: `patr201PuiBKCVfir`
   - `YOUR_BASE_ID_HERE` with your Base ID: `appJ4MLPYJyuWWBG8`

3. **Your final `js/airtable-config.js` should look like:**
   ```javascript
   const AirtableConfig = {
       apiKey: window.AIRTABLE_API_KEY || window.ENV?.AIRTABLE_API_KEY || 'patr201PuiBKCVfir',
       baseId: window.AIRTABLE_BASE_ID || window.ENV?.AIRTABLE_BASE_ID || 'appJ4MLPYJyuWWBG8',
       // ... rest of config
   };
   ```

4. **Test the integration:**
   - Open `charte.html` in your browser
   - Open browser console (F12)
   - Fill out and submit the charter form
   - Check console for success messages
   - Check your Airtable base for new records

## Security Notes

✅ **Safe:** `js/airtable-config.js` is in `.gitignore` - your API key will NOT be committed to git
✅ **Safe:** Only the template file (`js/airtable-config.template.js`) is in git
✅ **Safe:** Template contains no real credentials

## Files Overview

- `js/airtable-config.js` - Your actual config (NOT in git, contains real API key)
- `js/airtable-config.template.js` - Template file (in git, safe to commit)
- `js/airtable-api.js` - API functions (in git, no credentials)

Your API key is now secure! 🔒
