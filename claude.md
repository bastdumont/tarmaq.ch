# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**TARMAQ Website** - Static multilingual site (FR/EN/DE/IT) for a Geneva-based youth tech organization. Pure HTML/CSS/JS with zero dependencies, no build tools, no CMS.

**Repository**: https://github.com/bastdumont/tarmaq.ch

**Tech Stack**: HTML5, Tailwind CSS 3.4 (CDN), Vanilla JavaScript, Google Fonts (Inter), Font Awesome 6.4.0

**Critical Constraint**: This is a **pure static HTML project**. No npm, no build process, no server-side code. Everything runs directly in the browser via CDN-loaded libraries.

## Running Locally

```bash
# Option 1: Python (most common)
python -m http.server 8000

# Option 2: Node.js
npx serve

# Option 3: PHP
php -S localhost:8000

# Option 4: Just open index.html in browser (works but limited)
```

Then open `http://localhost:8000`

## Architecture

### File Structure
```
├── Main Pages (10)
│   ├── index.html              # Homepage
│   ├── projet.html             # Project details
│   ├── activites.html          # Activities overview
│   ├── impact.html             # Impact metrics
│   ├── soutenir.html           # Support hub
│   ├── contact.html            # Contact form
│   ├── charte.html             # Charter page
│   ├── about.html              # About page
│   ├── formation-residence.html # Residential training
│   └── 404.html                # Error page
│
├── Support Detail Pages (6)
│   ├── soutenir-donations.html
│   ├── soutenir-mentorat.html
│   ├── soutenir-locaux.html
│   ├── soutenir-materiel.html
│   ├── soutenir-evenements.html
│   └── soutenir-communaute.html
│
├── adémie/                     # Educational content (saved HTML pages)
│
├── css/style.css               # Custom CSS + animations
│
├── js/
│   ├── i18n.js                 # Translation system (4 languages)
│   ├── main.js                 # UI interactions + scroll effects
│   ├── header.js               # Header component logic
│   ├── charter.js              # Charter signature system
│   ├── airtable-api.js         # Airtable API wrapper
│   ├── airtable-config.js      # Airtable configuration
│   └── env-config.js           # Environment config loader
│
├── config.js                   # Global configuration (gitignored)
├── config.example.js           # Config template
│
└── assets/                     # Images, logos, favicon
```

### Multilingual System (js/i18n.js)

**How it works:**
- Centralized `translations` object with keys for FR/EN/DE/IT
- HTML elements use `data-i18n="key.name"` attribute
- On page load, `applyTranslations()` replaces element text with current language
- Language stored in localStorage as `tarmaq_language`
- Change via `changeLanguage('fr'|'en'|'de'|'it')` function

**Structure:**
```javascript
const translations = {
    fr: { 'nav.home': 'Accueil', ... },
    en: { 'nav.home': 'Home', ... },
    de: { 'nav.home': 'Startseite', ... },
    it: { 'nav.home': 'Home', ... }
};
```

**Usage in HTML:**
```html
<h1 data-i18n="hero.title">Default text</h1>
<button onclick="changeLanguage('fr')">🇫🇷</button>
```

### Airtable Integration System (js/airtable-api.js)

**Purpose:** Backend data storage for charter signatures and potentially other dynamic content.

**Architecture:**
- `config.js` (gitignored) - Contains API keys and base ID
- `config.example.js` - Template for configuration
- `js/airtable-config.js` - Airtable-specific configuration wrapper
- `js/airtable-api.js` - API wrapper with caching, CRUD operations
- `js/charter.js` - Uses Airtable API to save charter signatures

**Setup:**
1. Copy `config.example.js` to `config.js`
2. Add Airtable credentials (API key, Base ID)
3. See `AIRTABLE_SETUP.md` for detailed setup instructions

**Key Functions:**
- `AirtableAPI.getRecords(tableName, options)` - Fetch records with caching
- `AirtableAPI.createRecord(tableName, fields)` - Create new record
- `AirtableAPI.updateRecord(tableName, recordId, fields)` - Update existing record
- `AirtableAPI.deleteRecord(tableName, recordId)` - Delete record

**Security Note:** The `config.js` file is gitignored to prevent API key exposure. Always use the template file for new setups.

### Charter Signature System (js/charter.js)

**Features:**
- Collects signatures (name, email) on charte.html
- Stores signatures in localStorage for immediate display
- Persists to Airtable for permanent storage
- Displays current signature count
- Shows list of signatories

**Workflow:**
1. User fills form on charte.html
2. JavaScript validates input
3. Saves to localStorage (instant feedback)
4. Sends to Airtable (permanent storage)
5. Updates UI with new signature count

### UI System (js/main.js)

**Core features:**
1. Mobile menu toggle (hamburger icon)
2. Header scroll effect (adds `.header-scrolled` class after 50px)
3. Smooth scroll for anchor links
4. Scroll reveal animations (IntersectionObserver for `.fade-in`, `.slide-up`, etc.)

### Styling System (css/style.css + Tailwind)

**Tailwind config** (embedded in each HTML `<head>`):
```javascript
tailwind.config = {
    theme: {
        extend: {
            colors: {
                primary: '#DA2F2C',      // TARMAQ red - DO NOT CHANGE
                secondary: '#111827',     // Dark gray
                accent: '#F3F4F6'        // Light gray
            }
        }
    }
}
```

**Custom animations** (css/style.css):
- 15+ CSS animations: fade-in, slide-up, scale-in, rotate-in, bounce-in, float, etc.
- Scroll reveal effects via IntersectionObserver
- 3D hover effects (lift, glow, zoom)
- Animated gradients for text and backgrounds

## Configuration & Environment Setup

### Setting Up Airtable Integration

If you need to work with the charter signature system or other Airtable-backed features:

1. **Copy the config template:**
   ```bash
   cp config.example.js config.js
   ```

2. **Get Airtable credentials:**
   - Create an Airtable account at airtable.com
   - Create a new base or use existing "TARMAQ Website Backend"
   - Generate a Personal Access Token with `data.records:read` and `data.records:write` scopes
   - Copy your Base ID from the API documentation

3. **Update config.js:**
   ```javascript
   window.CONFIG = {
       AIRTABLE: {
           API_KEY: 'patXXXXXXXXXXXXXX',  // Your token
           BASE_ID: 'appXXXXXXXXXXXXXX'   // Your base ID
       }
   };
   ```

4. **Security:** Never commit `config.js` to git - it's already in `.gitignore`

**Note:** The site will work without Airtable configuration, but charter signatures will only be stored in localStorage (browser-only, not persistent across devices).

For detailed setup instructions, see [AIRTABLE_SETUP.md](AIRTABLE_SETUP.md).

## Common Development Tasks

### Adding/Editing Content

**DO NOT use a CMS** - edit HTML files directly.

1. Open the relevant HTML file (e.g., `index.html`)
2. Find the section to modify
3. If text should be translatable:
   - Add `data-i18n="unique.key"` to element
   - Add translations in `js/i18n.js` for all 4 languages
4. Test in all languages (🇫🇷 🇬🇧 🇩🇪 🇮🇹 buttons)

### Adding a New Page

1. Create `nouvelle-page.html`
2. Copy structure from existing page (header, footer, scripts)
3. Update `<title>` and meta tags
4. **CRITICAL: Add navigation link in ALL HTML files** (there are 16 pages total - update both desktop + mobile menus in each)
5. Add translations in `js/i18n.js` for nav link (all 4 languages)
6. Update this CLAUDE.md file to include the new page in the Pages Overview section
7. Test responsive design and all languages

**Important:** The site has 10 main pages + 6 support detail pages. When adding navigation, consider whether the page should appear in the main nav or just be linked from related pages.

### Adding Translations

**In js/i18n.js:**
```javascript
// Add to each language object
fr: {
    'section.title': 'Titre français',
    'section.description': 'Description française'
},
en: {
    'section.title': 'English title',
    'section.description': 'English description'
},
de: {
    'section.title': 'Deutscher Titel',
    'section.description': 'Deutsche Beschreibung'
},
it: {
    'section.title': 'Titolo italiano',
    'section.description': 'Descrizione italiana'
}
```

**In HTML:**
```html
<h2 data-i18n="section.title">Default Title</h2>
<p data-i18n="section.description">Default description</p>
```

**Critical:** ALL new text must have translations in all 4 languages.

### Modifying Styles

**Tailwind utilities** (preferred):
```html
<div class="bg-primary text-white px-6 py-4 rounded-lg hover:shadow-xl transition">
```

**Custom CSS** (when Tailwind isn't enough):
Add to `css/style.css` - existing animations and effects are there.

**DO NOT:**
- Change `primary` color (#DA2F2C) without approval
- Use inline styles (use Tailwind classes instead)
- Break responsive design (always test mobile/tablet/desktop)

### Adding Animations

Use existing CSS classes from `css/style.css`:
- `.fade-in` - Fade in effect
- `.slide-up` - Slide from bottom
- `.slide-left` / `.slide-right` - Horizontal slides
- `.scale-in` - Scale up from small
- `.rotate-in` - Rotate while appearing
- `.bounce-in` - Bouncy entrance
- `.float` - Continuous floating
- `.pulse-slow` - Subtle pulsing
- `.gradient-text` - Animated gradient text

Add `data-animate` attribute to trigger on scroll:
```html
<div class="fade-in" data-animate>Content appears on scroll</div>
```

## Pages Overview

### Main Pages (10)

1. **index.html** - Homepage: hero, mission, stats, programs
2. **projet.html** - Project details: vision, values, 2030 objectives
3. **activites.html** - Activities: training, hackathons, educational trips
4. **impact.html** - Impact: statistics, testimonials, success stories
5. **soutenir.html** - Support hub: overview of 6 ways to help with links to detail pages
6. **contact.html** - Contact form, coordinates, HubSpot booking integration
7. **charte.html** - Charter page with signature form and Airtable integration
8. **about.html** - About TARMAQ
9. **formation-residence.html** - Residential training program details
10. **404.html** - Custom error page

### Support Detail Pages (6)

Each provides detailed information about a specific way to support TARMAQ:

1. **soutenir-donations.html** - Financial donations, scholarships, equipment funding
2. **soutenir-mentorat.html** - Mentoring program (2-4h/month, in-person/online)
3. **soutenir-locaux.html** - Space lending (training rooms, coworking, offices)
4. **soutenir-materiel.html** - Equipment donations (computers, network, licenses)
5. **soutenir-evenements.html** - Event partnerships (sponsoring, speakers, co-organization)
6. **soutenir-communaute.html** - Community support (social sharing, word-of-mouth)

### Special Folders

**adémie/** - Contains archived/saved HTML pages for educational content. These are complete standalone HTML files (not part of the main site navigation).

## Important Information

### Contact Details (REAL - Do Not Modify Without Approval)
- Email: bastien@bdi-solutions.com
- Phone: +41 79 670 77 43
- Address: Perspectives Jeunesse, 11 avenue Eugène-Pittard, 1206 Genève
- HubSpot: https://meetings-eu1.hubspot.com/bdumont?uuid=a342bacf-b1c4-4182-82dd-64b39fa7b307

### Design System Rules
- **Primary color**: #DA2F2C (TARMAQ red) - DO NOT CHANGE
- **Typography**: Inter (Google Fonts) - 300 to 800 weights
- **Style**: Modern Swiss institutional - clean, professional, accessible
- **Responsive**: Mobile-first - test all breakpoints (sm, md, lg, xl)

## Deployment

**Zero configuration needed** - pure static files.

1. **Netlify**: Drag & drop folder → done
2. **Vercel**: Import from GitHub or drag & drop
3. **GitHub Pages**: Push to repo → enable in settings
4. **FTP**: Upload all files to web server

No build step, no environment variables, no config files required.

## Common Issues

| Problem | Solution |
|---------|----------|
| Tailwind classes not working | Check CDN script loaded, verify class names |
| Translations not appearing | Check `data-i18n` attribute, verify key exists in all 4 languages in `js/i18n.js` |
| Language not persisting | Check localStorage in browser console, verify `changeLanguage()` function |
| Images not loading | Use relative paths (`assets/logo.svg` not `/assets/logo.svg`) |
| Animations not triggering | Check IntersectionObserver support, verify `data-animate` attribute |
| Mobile menu not working | Check `js/main.js` loaded, verify IDs match (`mobile-menu-btn`, `mobile-menu`) |
| Charter signatures not saving | Verify `config.js` exists with valid Airtable credentials, check browser console for API errors |
| Airtable API errors | Check API key has correct scopes (`data.records:read`, `data.records:write`), verify Base ID is correct |
| Config file not loading | Ensure `config.js` exists (copy from `config.example.js`), check it's loaded before `airtable-api.js` in HTML |

## Critical Rules

### DO ✅
- Edit HTML directly for content changes
- Test ALL 4 languages after any text change
- Maintain responsive design (test mobile, tablet, desktop)
- Keep translations synchronized across all languages
- Use `data-i18n` for ALL user-facing text
- Use semantic HTML and Tailwind utility classes
- Test in Chrome, Firefox, Safari

### DON'T ❌
- **Add npm packages or build tools** (kills the simplicity)
- **Use CMS or markdown files** (content is in HTML)
- **Hardcode text in HTML** (use `data-i18n` instead)
- **Change contact info** without user approval
- **Modify primary color** (#DA2F2C) without approval
- **Skip language testing** (breaks user experience)
- **Use base64 for images** (use SVG files in assets/)

## Additional Documentation

- **README.md** - User-facing project documentation (French, comprehensive)
- **CHANGELOG.md** - Version history and changes
- **AIRTABLE_SETUP.md** - Detailed Airtable integration setup guide
- **CONFIG_SETUP.md** / **CONFIGURATION_GUIDE.md** - Configuration instructions
- **subagent-content-editor.md** - Detailed translation guide
- **subagent-frontend-developer.md** - Frontend development guide

## Testing Checklist

Before deploying changes, verify:

- [ ] All 4 languages work correctly (FR, EN, DE, IT)
- [ ] Responsive design on mobile, tablet, desktop
- [ ] Navigation works on all pages (main + mobile menu)
- [ ] Animations trigger properly on scroll
- [ ] Forms submit correctly (contact, charter)
- [ ] Airtable integration works (if configured)
- [ ] No console errors in browser DevTools
- [ ] All images and assets load
- [ ] Links work (internal and external)

---

**Last Updated**: 2025-11-02
**Version**: 3.1+ (Static HTML with 4-language support + Airtable integration)
**Status**: Production ready
