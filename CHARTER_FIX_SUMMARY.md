# Charter Form Airtable Integration - Fix Summary

## Issues Found and Fixed

### 1. ❌ MutationObserver Error in Production
**Problem:** Console error `TypeError: Failed to execute 'observe' on 'MutationObserver': parameter 1 is not of type 'Node'`

**Cause:** The `/api/env.js` script was failing to load (404 error), which caused subsequent scripts to fail.

**Fix:** Added error handlers to all script tags in `charte.html`:
```html
<script src="config.js" onerror="console.warn('config.js not found, using environment variables')"></script>
<script src="/api/env.js" onerror="console.log('Vercel API not available, using config.js')"></script>
```

### 2. ❌ Wrong Airtable Table Name
**Problem:** Code was using table name `'Charter Signatures'` instead of table ID

**Fix:** Changed to use table ID `'tbl9jqKoSak8XjWcQ'` in `js/charter.js`:
```javascript
// Before:
const result = await window.AirtableAPI.createRecord('Charter Signatures', airtableData);

// After:
const result = await window.AirtableAPI.createRecord('tbl9jqKoSak8XjWcQ', airtableData);
```

### 3. ⚠️ Incomplete Airtable API Token
**Problem:** The API token in `config.js` appears truncated: `patr201PuiBKCVfir`

**Required Action:** You need to update this with your complete Airtable Personal Access Token.

## Setup Instructions

### Step 1: Get Your Complete Airtable Credentials

1. **Get your Personal Access Token:**
   - Go to https://airtable.com/create/tokens
   - Click "Create new token"
   - Name it "TARMAQ Website"
   - Add scopes:
     - ✅ `data.records:read`
     - ✅ `data.records:write`
   - Add access to base `appJ4MLPYJyuWWBG8`
   - Click "Create token"
   - **Copy the complete token** (starts with `pat`, should be ~40+ characters)

2. **Verify your Base ID:**
   - Your base ID is: `appJ4MLPYJyuWWBG8` ✅
   - Your table ID is: `tbl9jqKoSak8XjWcQ` ✅

### Step 2: Update Local Configuration

Edit `/Users/bastiendumont/Documents/GitHub/tarmaq.ch/config.js`:

```javascript
window.CONFIG = {
    AIRTABLE: {
        API_KEY: 'patXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',  // ← Paste your FULL token here
        BASE_ID: 'appJ4MLPYJyuWWBG8'  // ← This is correct
    }
};
```

### Step 3: Set Up Vercel Environment Variables

For production deployment on Vercel:

1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add these variables:
   - `AIRTABLE_API_KEY` = `patXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX` (your full token)
   - `AIRTABLE_BASE_ID` = `appJ4MLPYJyuWWBG8`
4. Make sure they apply to **Production**, **Preview**, and **Development**
5. Redeploy your site

### Step 4: Verify Airtable Table Structure

Make sure your Airtable base `appJ4MLPYJyuWWBG8` has a table `tbl9jqKoSak8XjWcQ` with these exact field names:

| Field Name       | Field Type | Required |
|------------------|------------|----------|
| `Name`           | Single line text | Yes |
| `Email`          | Email | No |
| `Timestamp`      | Single line text or Date | Yes |
| `Signature_Date` | Single line text | Yes |

**Important:** Field names are case-sensitive!

## Testing

### Local Testing

1. Open the test page:
   ```
   http://localhost:8000/test-airtable-config.html
   ```

2. Check for:
   - ✅ All green checkmarks
   - ✅ API Key and Base ID showing (partially hidden)
   - ✅ "Airtable configuration is VALID"

3. Click "Test Fetch Records" - should load existing signatures
4. Click "Test Create Record" - should create a test signature

### Production Testing

1. After deploying to Vercel, visit:
   ```
   https://www.tarmaq.ch/test-airtable-config.html
   ```

2. Check the same indicators as local testing

3. Then test the actual form:
   ```
   https://www.tarmaq.ch/charte.html
   ```

4. Fill in the form and submit
5. Check browser console (F12) for debug messages:
   - Should see: `✅ Signature saved to Airtable successfully`
6. Verify the record appears in Airtable

## Files Modified

### 1. `charte.html`
- Added error handlers to script tags
- Added comments for clarity
- Organized script loading order

### 2. `js/charter.js`
- Changed table name to table ID: `'tbl9jqKoSak8XjWcQ'`
- Already has good error handling and debug logging

### 3. `js/airtable-config.js`
- Enhanced validation to check token format
- Added detailed error messages for invalid config

### 4. `test-airtable-config.html` (NEW)
- Diagnostic page to test Airtable connection
- Shows configuration status
- Allows testing read/write operations

## Current Status

✅ **Fixed:**
- MutationObserver error (script loading)
- Table name → table ID conversion
- Error handling for missing scripts
- Enhanced validation and debugging

⚠️ **Requires Your Action:**
- Update `config.js` with complete Airtable API token
- Set Vercel environment variables
- Test and verify

## Debugging Tips

### If signatures aren't saving:

1. **Open browser console (F12)**
2. **Look for these messages:**
   - ❌ `Airtable API not loaded` → Script loading issue
   - ❌ `Airtable not configured properly` → Check API key/Base ID
   - ❌ `Airtable API error: 401` → Invalid API token
   - ❌ `Airtable API error: 404` → Wrong table ID or base ID
   - ❌ `Airtable API error: 422` → Field name mismatch

3. **Common fixes:**
   - 401 Unauthorized → Update API token
   - 404 Not Found → Verify Base ID and Table ID
   - 422 Unprocessable → Check field names in Airtable match exactly

### Console Commands for Manual Testing

Open browser console on charte.html and try:

```javascript
// Check configuration
window.AirtableConfig.isValid()

// Test fetch
window.AirtableAPI.getRecords('tbl9jqKoSak8XjWcQ').then(console.log)

// Test create
window.AirtableAPI.createRecord('tbl9jqKoSak8XjWcQ', {
    "Name": "Test User",
    "Email": "test@example.com",
    "Timestamp": new Date().toISOString(),
    "Signature_Date": new Date().toLocaleString('fr-FR')
}).then(console.log)
```

## Next Steps

1. ✅ Update `config.js` with your complete Airtable Personal Access Token
2. ✅ Test locally with `test-airtable-config.html`
3. ✅ Set Vercel environment variables
4. ✅ Deploy to production
5. ✅ Test production charter form
6. ✅ Verify signatures appear in Airtable

---

**Last Updated:** 2025-11-02
**Status:** Ready for testing after API token update
