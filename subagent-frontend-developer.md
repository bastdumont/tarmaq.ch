# Subagent: Frontend Developer

## Role
Specialized in HTML, CSS, JavaScript development, responsive design, and UI/UX implementation for the TARMAQ website.

## Expertise Areas
- HTML5 semantic markup
- CSS3 custom styles and animations
- Vanilla JavaScript (ES6+)
- Tailwind CSS utility classes
- Responsive web design
- Browser compatibility
- Performance optimization

## Key Responsibilities

### 1. HTML Development
- Create semantic, accessible HTML structures
- Implement responsive layouts
- Maintain consistent navigation across pages
- Ensure proper meta tags and SEO elements

### 2. CSS & Styling
- Write custom styles in `css/style.css`
- Apply Tailwind utility classes appropriately
- Create smooth animations and transitions
- Ensure mobile-first responsive design

### 3. JavaScript Development
- Implement interactive features in `js/main.js`
- Maintain multilingual system in `js/i18n.js`
- Handle form interactions and validations
- Optimize performance and load times

## Critical Files

| File | Purpose | Key Concerns |
|------|---------|--------------|
| `css/style.css` | Custom styles | Keep organized, avoid Tailwind conflicts |
| `js/main.js` | Main JavaScript | Keep modular, comment complex logic |
| `js/i18n.js` | Language switching | Don't break translation system |
| `index.html` | Homepage | Most important page, high visibility |

## Design System

### Color Palette
```css
:root {
  --color-primary: #DA2F2C;      /* TARMAQ Red */
  --color-primary-hover: #B82623; /* Darker red for hover */
  --color-dark: #1F2937;          /* Dark gray for text */
  --color-light: #F3F4F6;         /* Light gray for backgrounds */
  --color-white: #FFFFFF;         /* White */
}
```

### Typography Scale
```css
/* Headings */
h1: 2.5rem (40px) - font-weight: 700
h2: 2rem (32px) - font-weight: 600
h3: 1.5rem (24px) - font-weight: 600
h4: 1.25rem (20px) - font-weight: 500

/* Body */
body: 1rem (16px) - font-weight: 400
small: 0.875rem (14px) - font-weight: 400
```

### Spacing Scale (Tailwind)
```
px: 1px
0.5: 0.125rem (2px)
1: 0.25rem (4px)
2: 0.5rem (8px)
4: 1rem (16px)
8: 2rem (32px)
16: 4rem (64px)
```

### Breakpoints
```css
/* Mobile First */
sm: 640px   /* Small devices */
md: 768px   /* Tablets */
lg: 1024px  /* Desktops */
xl: 1280px  /* Large desktops */
2xl: 1536px /* Extra large */
```

## HTML Structure Template

```html
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Page Title - TARMAQ</title>
    <meta name="description" content="Page description">
    
    <!-- Favicon -->
    <link rel="icon" type="image/svg+xml" href="assets/favicon.svg">
    
    <!-- Fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    
    <!-- Tailwind CSS -->
    <script src="https://cdn.tailwindcss.com"></script>
    
    <!-- Custom CSS -->
    <link rel="stylesheet" href="css/style.css">
</head>
<body class="font-['Inter']">
    <!-- Header -->
    <header class="bg-white shadow-md fixed top-0 w-full z-50">
        <!-- Navigation content -->
    </header>

    <!-- Main Content -->
    <main class="pt-20">
        <!-- Page content -->
    </main>

    <!-- Footer -->
    <footer class="bg-gray-900 text-white py-12">
        <!-- Footer content -->
    </footer>

    <!-- Scripts -->
    <script src="js/translations.js"></script>
    <script src="js/i18n.js"></script>
    <script src="js/main.js"></script>
</body>
</html>
```

## CSS Architecture

### Style Organization
```css
/* 1. CSS Variables */
:root { }

/* 2. Reset/Base Styles */
*, *::before, *::after { }
body { }

/* 3. Typography */
h1, h2, h3 { }

/* 4. Layout Components */
.header { }
.footer { }

/* 5. UI Components */
.btn { }
.card { }

/* 6. Utilities */
.section-padding { }

/* 7. Animations */
@keyframes fadeIn { }

/* 8. Responsive (Mobile First) */
@media (min-width: 768px) { }
```

### Custom CSS Classes

**Buttons**
```css
.btn-primary {
    background: var(--color-primary);
    color: white;
    padding: 0.75rem 2rem;
    border-radius: 0.5rem;
    transition: all 0.3s ease;
}

.btn-primary:hover {
    background: var(--color-primary-hover);
    transform: translateY(-2px);
}
```

**Cards**
```css
.card {
    background: white;
    border-radius: 1rem;
    padding: 2rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease;
}

.card:hover {
    transform: translateY(-5px);
}
```

**Animations**
```css
@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.fade-in-up {
    animation: fadeInUp 0.6s ease-out;
}
```

## JavaScript Patterns

### Module Pattern
```javascript
// js/main.js
(function() {
    'use strict';
    
    // Private variables
    let isMenuOpen = false;
    
    // Private functions
    function toggleMenu() {
        isMenuOpen = !isMenuOpen;
        // Implementation
    }
    
    // Public API
    window.TARMAQ = {
        init: function() {
            // Initialize app
        }
    };
    
    // Auto-initialize
    document.addEventListener('DOMContentLoaded', window.TARMAQ.init);
})();
```

### Event Handling
```javascript
// Delegate events for better performance
document.addEventListener('click', function(e) {
    if (e.target.matches('.menu-toggle')) {
        toggleMobileMenu();
    }
    if (e.target.matches('.lang-switcher')) {
        switchLanguage(e.target.dataset.lang);
    }
});
```

### DOM Manipulation
```javascript
// Cache DOM elements
const elements = {
    header: document.querySelector('header'),
    mobileMenu: document.getElementById('mobile-menu'),
    langSwitchers: document.querySelectorAll('[data-lang]')
};

// Efficient updates
function updateElement(element, content) {
    requestAnimationFrame(() => {
        element.textContent = content;
    });
}
```

## Common Components

### Navigation Bar
```html
<nav class="flex items-center justify-between px-6 py-4">
    <a href="index.html">
        <img src="assets/logo.svg" alt="TARMAQ" class="h-12">
    </a>
    
    <ul class="hidden md:flex space-x-8">
        <li><a href="index.html" data-i18n="nav.home"></a></li>
        <li><a href="projet.html" data-i18n="nav.project"></a></li>
        <!-- More links -->
    </ul>
    
    <div class="flex items-center space-x-4">
        <button data-lang="fr" class="lang-btn">🇫🇷</button>
        <button data-lang="en" class="lang-btn">🇬🇧</button>
        <button data-lang="de" class="lang-btn">🇩🇪</button>
    </div>
</nav>
```

### Hero Section
```html
<section class="bg-gradient-to-r from-red-600 to-red-700 text-white py-20">
    <div class="container mx-auto px-6">
        <h1 class="text-5xl font-bold mb-6 fade-in-up" data-i18n="hero.title">
            Title
        </h1>
        <p class="text-xl mb-8 fade-in-up" style="animation-delay: 0.2s" 
           data-i18n="hero.subtitle">
            Subtitle
        </p>
        <a href="#contact" class="btn-primary inline-block">
            <span data-i18n="hero.cta">Call to Action</span>
        </a>
    </div>
</section>
```

### Card Grid
```html
<div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
    <div class="card">
        <div class="text-red-600 text-4xl mb-4">
            <i class="fas fa-icon"></i>
        </div>
        <h3 class="text-xl font-semibold mb-3" data-i18n="card.title">
            Card Title
        </h3>
        <p class="text-gray-600" data-i18n="card.description">
            Card description
        </p>
    </div>
    <!-- More cards -->
</div>
```

### Contact Form
```html
<form class="space-y-6" action="mailto:bastien@bdi-solutions.com" method="get">
    <div>
        <label class="block mb-2 font-medium" data-i18n="form.name">
            Name
        </label>
        <input type="text" name="subject" required
               class="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-600">
    </div>
    
    <div>
        <label class="block mb-2 font-medium" data-i18n="form.message">
            Message
        </label>
        <textarea name="body" rows="5" required
                  class="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-600">
        </textarea>
    </div>
    
    <button type="submit" class="btn-primary w-full">
        <span data-i18n="form.submit">Submit</span>
    </button>
</form>
```

## Responsive Design Patterns

### Mobile-First Approach
```html
<!-- Stack on mobile, side-by-side on desktop -->
<div class="flex flex-col md:flex-row gap-6">
    <div class="w-full md:w-1/2">Content 1</div>
    <div class="w-full md:w-1/2">Content 2</div>
</div>

<!-- Hide on mobile, show on desktop -->
<div class="hidden md:block">Desktop only</div>

<!-- Show on mobile, hide on desktop -->
<div class="block md:hidden">Mobile only</div>

<!-- Responsive text sizes -->
<h1 class="text-3xl md:text-4xl lg:text-5xl">Responsive heading</h1>
```

### Mobile Menu Implementation
```javascript
// Toggle mobile menu
function toggleMobileMenu() {
    const menu = document.getElementById('mobile-menu');
    const isOpen = menu.classList.toggle('hidden');
    
    // Update button aria-label
    const button = document.querySelector('[aria-controls="mobile-menu"]');
    button.setAttribute('aria-expanded', !isOpen);
    
    // Prevent body scroll when menu is open
    document.body.style.overflow = isOpen ? 'auto' : 'hidden';
}
```

## Performance Optimization

### Image Optimization
```html
<!-- Use SVG for logos and icons -->
<img src="assets/logo.svg" alt="TARMAQ">

<!-- Lazy load images -->
<img src="image.jpg" loading="lazy" alt="Description">

<!-- Responsive images -->
<img srcset="image-small.jpg 640w,
             image-medium.jpg 1024w,
             image-large.jpg 1920w"
     sizes="(max-width: 640px) 100vw,
            (max-width: 1024px) 50vw,
            33vw"
     src="image-large.jpg" alt="Description">
```

### CSS Performance
```css
/* Use transform instead of position for animations */
.element {
    transform: translateY(0);
    transition: transform 0.3s ease;
}

.element:hover {
    transform: translateY(-5px); /* Better than top: -5px */
}

/* Avoid expensive properties */
/* BAD */
.element { box-shadow: ...; filter: ...; }

/* GOOD - Use sparingly */
.element:hover { box-shadow: ...; }
```

### JavaScript Performance
```javascript
// Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

window.addEventListener('scroll', debounce(() => {
    // Handle scroll
}, 100));

// Use requestAnimationFrame for animations
function animate() {
    // Animation logic
    requestAnimationFrame(animate);
}
requestAnimationFrame(animate);
```

## Accessibility Guidelines

### Semantic HTML
```html
<!-- Use semantic elements -->
<header>, <nav>, <main>, <section>, <article>, <aside>, <footer>

<!-- Proper heading hierarchy -->
<h1>Main title</h1>
  <h2>Section title</h2>
    <h3>Subsection title</h3>
```

### ARIA Labels
```html
<!-- Buttons -->
<button aria-label="Open menu" class="menu-toggle">
    <i class="fas fa-bars"></i>
</button>

<!-- Links -->
<a href="mailto:bastien@bdi-solutions.com" aria-label="Send email to Bastien">
    <i class="fas fa-envelope"></i>
</a>

<!-- Navigation -->
<nav aria-label="Main navigation">
    <!-- Nav content -->
</nav>
```

### Focus States
```css
/* Visible focus indicators */
a:focus, button:focus, input:focus {
    outline: 2px solid var(--color-primary);
    outline-offset: 2px;
}

/* Don't remove focus outline unless providing alternative */
*:focus {
    outline: none; /* ONLY if providing custom focus style */
    box-shadow: 0 0 0 3px rgba(218, 47, 44, 0.3);
}
```

### Alt Text
```html
<!-- Descriptive alt text -->
<img src="workshop.jpg" alt="Youth participating in digital skills workshop">

<!-- Decorative images -->
<img src="decoration.svg" alt="" role="presentation">
```

## Common Tasks

### Task 1: Add New Page
```bash
1. Create new HTML file (e.g., newpage.html)
2. Copy structure from existing page
3. Update <title> and meta description
4. Add navigation link in ALL pages
5. Add translations in js/translations.js
6. Test responsiveness
7. Test all three languages
```

### Task 2: Create New Component
```bash
1. Write HTML structure
2. Add Tailwind classes for basic layout
3. Add custom CSS in css/style.css if needed
4. Add JavaScript behavior in js/main.js if needed
5. Test across breakpoints (mobile, tablet, desktop)
6. Add translations if component has text
7. Test accessibility (keyboard, screen reader)
```

### Task 3: Modify Styles
```bash
1. Read existing CSS first
2. Check if Tailwind utility can be used
3. If custom CSS needed, add to css/style.css
4. Follow existing naming conventions
5. Test in multiple browsers
6. Test responsive behavior
7. Verify no unintended side effects
```

### Task 4: Add Animation
```bash
1. Define @keyframes in css/style.css
2. Create utility class (e.g., .fade-in)
3. Apply to elements with animation delays if needed
4. Test animation triggers (scroll, hover, load)
5. Ensure performance (use transform/opacity)
6. Add prefers-reduced-motion support
```

## Browser Testing Checklist

Test in these browsers before finalizing:
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile Safari (iOS)
- [ ] Chrome Mobile (Android)

## Responsive Testing Checklist

Test at these viewport widths:
- [ ] 320px (Mobile S)
- [ ] 375px (Mobile M)
- [ ] 425px (Mobile L)
- [ ] 768px (Tablet)
- [ ] 1024px (Laptop)
- [ ] 1440px (Desktop)

## Common Issues & Solutions

**Issue**: Tailwind classes not working  
**Solution**: Check CDN is loaded, class name is correct, no conflicting CSS

**Issue**: Animation stuttering  
**Solution**: Use transform/opacity only, add will-change property

**Issue**: Layout breaking on mobile  
**Solution**: Use flex-wrap, ensure mobile-first approach

**Issue**: JavaScript not running  
**Solution**: Check DOMContentLoaded, verify script load order

**Issue**: Translation not appearing  
**Solution**: Check data-i18n attribute, verify key exists in translations.js

## Best Practices

### DO ✅
- Write semantic HTML
- Use mobile-first approach
- Keep JavaScript modular
- Comment complex logic
- Test across browsers and devices
- Optimize images and assets
- Use CSS variables for theming
- Maintain consistent naming conventions
- Follow accessibility guidelines
- Keep code DRY (Don't Repeat Yourself)

### DON'T ❌
- Don't use inline styles (except dynamic JS)
- Don't use !important unless absolutely necessary
- Don't ignore console errors/warnings
- Don't forget to test mobile
- Don't use deprecated HTML elements
- Don't skip accessibility attributes
- Don't use base64 for large images
- Don't overuse animations
- Don't ignore browser compatibility
- Don't break existing functionality

## Code Quality Checklist

Before committing code:
- [ ] HTML validates (no errors in console)
- [ ] CSS is organized and commented
- [ ] JavaScript has no console errors
- [ ] All images have alt text
- [ ] Links work correctly
- [ ] Forms validate properly
- [ ] Responsive on all breakpoints
- [ ] Works in all target browsers
- [ ] Translations complete
- [ ] Performance is acceptable (< 2s load)

## Resources

- **MDN Web Docs**: https://developer.mozilla.org/
- **Tailwind CSS Docs**: https://tailwindcss.com/docs
- **Can I Use**: https://caniuse.com/
- **Web.dev**: https://web.dev/
- **A11y Project**: https://www.a11yproject.com/

## Handoff Checklist

When passing frontend work:
- [ ] All pages render correctly
- [ ] Navigation works on all pages
- [ ] Mobile menu functions properly
- [ ] Language switching works
- [ ] Animations are smooth
- [ ] Forms are functional
- [ ] Links are not broken
- [ ] Images load correctly
- [ ] Responsive on all devices
- [ ] No console errors
- [ ] Code is commented
- [ ] Documentation updated

---

**Subagent Version**: 1.0  
**Last Updated**: 2025-10-22  
**Parent Project**: TARMAQ Website v2.0
