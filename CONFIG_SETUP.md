# Configuration Setup Guide - TARMAQ

## 🔐 Security Setup

This guide explains how to set up secure configuration for the TARMAQ website.

## 📁 Files Created

- ✅ `.gitignore` - Prevents sensitive files from being committed
- ✅ `config.example.js` - Template for configuration
- ✅ Updated `js/charter.js` - Now uses configuration variables
- ✅ Updated `contact.html` - Now uses configuration variables

## 🚀 Quick Setup

### 1. Create Configuration File

```bash
# Copy the example configuration
cp config.example.js config.js
```

### 2. Edit Configuration

Open `config.js` and replace the placeholder values:

```javascript
const CONFIG = {
    EMAILJS: {
        PUBLIC_KEY: 'your_actual_emailjs_public_key',
        SERVICE_ID: 'your_actual_service_id',
        TEMPLATE_ID: 'your_actual_template_id'
    },
    EMAIL: {
        NOTIFICATION_EMAIL: 'bastien@balder-app.com',
        CONTACT_FORM_EMAIL: 'bastien@balder-app.com'
    },
    WEBHOOK: {
        URL: 'https://webhook.site/your-actual-webhook-url'
    }
};
```

### 3. Test Configuration

1. Open `charte.html` in your browser
2. Try signing the charter
3. Check that emails are sent correctly

## 🔧 Configuration Options

### EmailJS (Recommended)

**For Charter Signatures:**
- `EMAILJS.PUBLIC_KEY` - Your EmailJS public key
- `EMAILJS.SERVICE_ID` - Your EmailJS service ID
- `EMAILJS.TEMPLATE_ID` - Your EmailJS template ID

**Setup Steps:**
1. Create account at [EmailJS.com](https://www.emailjs.com/)
2. Add email service (Gmail, Outlook, etc.)
3. Create template with ID `template_charter_signature`
4. Get public key from Account > General

### Webhook (Alternative)

**For Fallback Email:**
- `WEBHOOK.URL` - Your webhook URL

**Setup Steps:**
1. Go to [webhook.site](https://webhook.site/)
2. Copy your unique URL
3. Set up Zapier/Make to send emails from webhook

### Contact Form

**For Contact Page:**
- `EMAIL.CONTACT_FORM_EMAIL` - Email to receive contact form submissions

**Note:** Uses FormSubmit service (no API key needed)

## 🛡️ Security Features

### ✅ What's Protected

- EmailJS keys and IDs
- Email addresses
- Webhook URLs
- Any future API keys

### ✅ What's Not Committed

- `config.js` (actual configuration)
- `.env` files
- Sensitive keys and tokens
- Local development files

### ✅ Fallback Values

If `config.js` is missing, the code uses safe fallback values:
- Default email addresses
- Placeholder API keys
- Example webhook URLs

## 📝 File Structure

```
tarmaq-website/
├── .gitignore              # Git ignore rules
├── config.example.js       # Configuration template
├── config.js               # Your actual config (NOT in git)
├── js/charter.js           # Updated to use CONFIG
├── contact.html            # Updated to use CONFIG
└── charte.html            # Updated to load config.js
```

## 🔄 Migration from Hardcoded Values

### Before (Hardcoded)
```javascript
const serviceId = 'service_15n2y6q';
const publicKey = 'y1Kqm2dLN_vha6uqh';
```

### After (Configuration)
```javascript
const serviceId = window.CONFIG?.EMAILJS?.SERVICE_ID || 'service_15n2y6q';
const publicKey = window.CONFIG?.EMAILJS?.PUBLIC_KEY || 'your_public_key';
```

## 🚨 Important Notes

### ⚠️ Never Commit `config.js`
- Contains real API keys and sensitive data
- Already added to `.gitignore`
- Use `config.example.js` as template

### ⚠️ EmailJS Keys Are Public
- EmailJS public keys are meant to be public
- They're restricted by domain and usage limits
- Still good practice to keep them in config

### ⚠️ Test Before Deploying
- Always test email functionality locally
- Verify webhook URLs work
- Check that fallbacks work if config is missing

## 🆘 Troubleshooting

### Problem: Emails not sending
**Solution:** Check EmailJS configuration in `config.js`

### Problem: Config not loading
**Solution:** Ensure `config.js` exists and is loaded before other scripts

### Problem: Fallback values being used
**Solution:** Check that `window.CONFIG` is properly defined

### Problem: Git still tracking sensitive files
**Solution:** Run `git rm --cached config.js` if accidentally committed

## 📞 Support

If you need help with configuration:
- **Email**: bastien@bdi-solutions.com
- **Phone**: +41 79 670 77 43

---

*Configuration setup completed - TARMAQ website is now secure!* 🔒
