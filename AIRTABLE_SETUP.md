# Airtable API Setup Guide

This guide will help you set up Airtable backend integration for the TARMAQ website.

## Prerequisites

1. **Airtable Account**: Sign up at [airtable.com](https://airtable.com/)
2. **Admin Access**: Ability to create bases and generate API tokens

## Step 1: Create Your Airtable Base

1. Go to [airtable.com](https://airtable.com/)
2. Click **"New base"** → **"Start from scratch"**
3. Name it: **"TARMAQ Website Backend"**

## Step 2: Import the Schema

Refer to the schema documentation at: `.taskmaster/docs/airtable-schema.md`

Create the following tables with all specified fields:
- **Courses**
- **Opportunities**
- **Applications**
- **Donations**
- **KPIs**
- **Program Participants**
- **Mentors**

## Step 3: Get Your API Credentials

### Base ID
1. Open your Airtable base
2. Click **"Help"** in the top menu
3. Select **"API documentation"**
4. Copy your Base ID (starts with `app...`)

### API Key (Personal Access Token)
1. Go to [https://airtable.com/create/tokens](https://airtable.com/create/tokens)
2. Click **"Create new token"**
3. Name it: **"TARMAQ Website"**
4. Set scopes:
   - ✅ `data.records:read` (for fetching data)
   - ✅ `data.records:write` (for creating/updating records)
   - ✅ `schema.bases:read` (for reading table structure)
5. Set access to your **"TARMAQ Website Backend"** base
6. Copy the token (starts with `pat...`)

## Step 4: Configure Environment Variables

### Option A: Local Development (.env file)

1. Copy `env-template.txt` to `.env` in your project root
2. Update with your actual credentials:
   ```
   AIRTABLE_API_KEY=pat_your_token_here
   AIRTABLE_BASE_ID=app_your_base_id_here
   ```

### Option B: Hosting Platform Environment Variables

**For Netlify:**
1. Go to Site Settings → Environment Variables
2. Add:
   - `AIRTABLE_API_KEY` = `pat...your_token`
   - `AIRTABLE_BASE_ID` = `app...your_base_id`

**For Vercel:**
1. Go to Project Settings → Environment Variables
2. Add:
   - `AIRTABLE_API_KEY` = `pat...your_token`
   - `AIRTABLE_BASE_ID` = `app...your_base_id`

### Option C: Manual Configuration

Add this script **before** loading `airtable-config.js` in your HTML files:

```html
<script>
    // Manual configuration (not recommended for production)
    window.AIRTABLE_API_KEY = 'pat_your_token_here';
    window.AIRTABLE_BASE_ID = 'app_your_base_id_here';
    window.ENVIRONMENT = 'production';
</script>
<script src="js/env-config.js"></script>
<script src="js/airtable-config.js"></script>
```

## Step 5: Update HTML Files

Add the Airtable scripts to your pages that need dynamic content:

```html
<!-- Add to pages that use Airtable -->
<script>
    // API Configuration (inject from environment)
    window.AIRTABLE_API_KEY = 'pat_YOUR_TOKEN';
    window.AIRTABLE_BASE_ID = 'app_YOUR_BASE';
</script>
<script src="js/airtable-config.js"></script>
<script src="js/airtable-api.js"></script>
```

## Step 6: Test the Connection

Open browser console and run:

```javascript
// Check if configuration is valid
console.log('Config valid:', AirtableConfig.isValid());

// Test fetching records
AirtableAPI.getRecords('KPIs', { maxRecords: 5 })
    .then(records => console.log('Records:', records))
    .catch(error => console.error('Error:', error));
```

## Security Best Practices

### ✅ DO:
- Keep API keys in environment variables
- Use read-only tokens when possible
- Restrict token scopes to minimum required
- Rotate tokens regularly
- Use HTTPS for all requests

### ❌ DON'T:
- Commit API keys to git
- Expose full-access tokens in frontend code
- Share tokens publicly
- Use tokens with wide scope unnecessarily

## API Usage Examples

### Fetch KPI Metrics
```javascript
async function loadKPIs() {
    try {
        const records = await AirtableAPI.getRecords('KPIs', {
            maxRecords: 10,
            sort: [{ field: 'display_order' }]
        });
        
        // Display KPIs on dashboard
        records.forEach(record => {
            console.log(record.fields);
        });
    } catch (error) {
        console.error('Failed to load KPIs:', error);
    }
}
```

### Load Active Opportunities
```javascript
async function loadOpportunities() {
    try {
        const records = await AirtableAPI.getRecords('Opportunities', {
            filterByFormula: "{status} = 'Open'",
            sort: [{ field: 'application_deadline' }]
        });
        
        // Display opportunities
        displayOpportunities(records);
    } catch (error) {
        console.error('Failed to load opportunities:', error);
    }
}
```

### Create a Donation Record
```javascript
async function recordDonation(donorInfo) {
    try {
        const record = await AirtableAPI.createRecord('Donations', {
            donor_name: donorInfo.name,
            email: donorInfo.email,
            amount: donorInfo.amount,
            currency: 'CHF',
            anonymous: donorInfo.anonymous || false,
            message: donorInfo.message
        });
        
        console.log('Donation recorded:', record);
        return record;
    } catch (error) {
        console.error('Failed to record donation:', error);
        throw error;
    }
}
```

## Rate Limiting

Airtable API has rate limits:
- **Free tier**: 5 requests/second
- **Plus tier**: 5 requests/second
- **Pro tier**: 5 requests/second

The API includes automatic caching to help manage rate limits.

## Troubleshooting

### "Invalid API key"
- Verify your token is correct
- Check token hasn't expired
- Ensure token has proper scopes

### "Missing base ID"
- Verify base ID is correct
- Check base is accessible to your token

### "CORS errors"
- Airtable API supports CORS, but check browser console
- Ensure you're using HTTPS

### "Cache issues"
- Clear cache manually: `AirtableAPI.clearCache('TableName')`
- Or wait 5 minutes for cache expiry

## Next Steps

1. ✅ Complete Airtable base setup
2. ✅ Configure API credentials
3. ✅ Test API connection
4. ✅ Implement frontend integration
5. ✅ Add dynamic content to pages

## Support

For issues with:
- **Airtable setup**: [Airtable Support](https://support.airtable.com/)
- **API integration**: Check browser console for errors
- **Website issues**: Contact TARMAQ development team

---

**Last Updated**: 2025-01-23  
**Version**: 1.0

