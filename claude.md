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
├── index.html, projet.html, activites.html, impact.html,
│   soutenir.html, contact.html, 404.html    # 7 pages total
├── css/style.css                             # Custom CSS + animations
├── js/
│   ├── i18n.js                               # Translation system (4 languages)
│   └── main.js                               # UI interactions + scroll effects
└── assets/                                   # SVG logos + favicon
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
4. **Add navigation link in ALL 7 HTML files** (desktop + mobile menus)
5. Add translations in `js/i18n.js` for nav link
6. Test responsive design and all languages

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

1. **index.html** - Homepage: hero, mission, stats, programs
2. **projet.html** - Project details: vision, values, 2030 objectives
3. **activites.html** - Activities: training, hackathons, educational trips
4. **impact.html** - Impact: statistics, testimonials, success stories
5. **soutenir.html** - Support page: 6 ways to help (donations, mentoring, spaces, equipment, events, community)
6. **contact.html** - Contact form, coordinates, HubSpot booking integration
7. **404.html** - Custom error page

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

- **README.md** - User-facing project documentation (French)
- **CHANGELOG.md** - Version history and changes
- **subagent-content-editor.md** - Detailed translation guide
- **subagent-frontend-developer.md** - Frontend development guide

---

**Last Updated**: 2025-10-23
**Version**: 3.1 (Static HTML with 4-language support)
**Status**: Production ready
