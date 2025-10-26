# System Patterns - TARMAQ Website

## Naming Conventions

### File Naming
- **HTML Pages**: lowercase with hyphens (`index.html`, `projet.html`, `activites.html`)
- **CSS Files**: lowercase (`style.css`)
- **JavaScript Files**: lowercase (`i18n.js`, `main.js`, `charter.js`)
- **Assets**: lowercase (`logo.png`, `image.png`)
- **Documentation**: UPPERCASE (`README.md`, `CHANGELOG.md`)

### CSS Class Naming
- **Tailwind Utilities**: Standard Tailwind classes (`bg-primary`, `text-white`, `px-6`)
- **Custom Classes**: kebab-case with prefixes
  - `.animate-fade-in-up` - Animation classes
  - `.btn-primary`, `.btn-secondary` - Button variants
  - `.scroll-reveal` - Scroll animation elements
  - `.lang-btn` - Language selector buttons
  - `.nav-link` - Navigation links

### JavaScript Naming
- **Variables**: camelCase (`currentLanguage`, `signatureData`)
- **Functions**: camelCase (`changeLanguage()`, `updatePageContent()`)
- **Constants**: UPPER_SNAKE_CASE (`TRANSLATIONS`, `EMAIL_CONFIG`)
- **Event Handlers**: descriptive camelCase (`handleFormSubmit`, `toggleMobileMenu`)

### HTML Attributes
- **Data Attributes**: kebab-case (`data-i18n`, `data-animate`, `data-target`)
- **IDs**: kebab-case (`mobile-menu-btn`, `signatories-list`, `charter-form`)
- **Classes**: Tailwind utilities + custom classes

## Architecture Patterns

### Static Site Architecture
```
┌─────────────────────────────────────────┐
│                Browser                  │
├─────────────────────────────────────────┤
│  HTML Pages (7)                         │
│  ├── index.html                         │
│  ├── projet.html                        │
│  ├── activites.html                     │
│  ├── impact.html                        │
│  ├── soutenir.html                      │
│  ├── contact.html                       │
│  ├── charte.html                        │
│  └── 404.html                           │
├─────────────────────────────────────────┤
│  CSS Styles                             │
│  ├── Tailwind CSS (CDN)                 │
│  └── Custom CSS (style.css)             │
├─────────────────────────────────────────┤
│  JavaScript Modules                     │
│  ├── i18n.js (Translation System)      │
│  ├── main.js (UI Interactions)          │
│  └── charter.js (Charter Functionality) │
├─────────────────────────────────────────┤
│  External Dependencies (CDN)            │
│  ├── Google Fonts (Inter)               │
│  ├── Font Awesome (Icons)               │
│  └── EmailJS (Email Service)            │
└─────────────────────────────────────────┘
```

### Translation System Architecture
```javascript
// Centralized translation object
const translations = {
    fr: { 'key.name': 'French Text' },
    en: { 'key.name': 'English Text' },
    de: { 'key.name': 'German Text' },
    it: { 'key.name': 'Italian Text' }
};

// HTML usage
<h1 data-i18n="hero.title">Default Text</h1>

// JavaScript processing
function updatePageContent() {
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(element => {
        const key = element.getAttribute('data-i18n');
        const translation = translations[currentLanguage][key];
        if (translation) {
            element.textContent = translation;
        }
    });
}
```

### Component Patterns

#### Page Structure Pattern
```html
<!DOCTYPE html>
<html lang="fr">
<head>
    <!-- Meta tags, CDN links, custom styles -->
</head>
<body>
    <!-- Header (loaded by header.js) -->
    
    <!-- Main Content -->
    <main>
        <!-- Page-specific content -->
    </main>
    
    <!-- Footer -->
    
    <!-- Scripts -->
    <script src="js/i18n.js"></script>
    <script src="js/main.js"></script>
    <!-- Page-specific scripts -->
</body>
</html>
```

#### Card Component Pattern
```html
<div class="bg-accent p-8 rounded-2xl hover:shadow-xl transition duration-300">
    <div class="w-16 h-16 bg-primary rounded-full flex items-center justify-center mb-6 mx-auto">
        <i class="fas fa-icon text-white text-2xl"></i>
    </div>
    <h3 class="text-2xl font-bold mb-4 text-center" data-i18n="card.title">
        Card Title
    </h3>
    <p class="text-gray-600 text-center" data-i18n="card.description">
        Card description
    </p>
</div>
```

#### Button Component Pattern
```html
<!-- Primary Button -->
<button class="btn-primary bg-primary text-white hover:bg-red-700 px-8 py-4 rounded-full font-semibold text-lg transition">
    Button Text
</button>

<!-- Secondary Button -->
<button class="btn-secondary border-2 border-primary text-primary hover:bg-primary hover:text-white px-8 py-4 rounded-full font-semibold text-lg transition">
    Button Text
</button>
```

## Styling Patterns

### Tailwind Configuration
```javascript
tailwind.config = {
    theme: {
        extend: {
            colors: {
                primary: '#DA2F2C',    // TARMAQ red
                secondary: '#111827',   // Dark gray
                accent: '#F3F4F6'      // Light gray
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif']
            }
        }
    }
};
```

### Animation Patterns
```css
/* Entrance Animations */
.animate-fade-in-up { animation: fadeInUp 0.8s ease-out; }
.animate-fade-in-down { animation: fadeInDown 0.8s ease-out; }
.animate-scale-in { animation: scaleIn 0.6s ease-out; }

/* Continuous Animations */
.animate-float { animation: float 3s ease-in-out infinite; }
.animate-pulse-slow { animation: pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite; }

/* Hover Effects */
.hover\:shadow-xl:hover {
    transform: translateY(-10px) scale(1.02);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
}
```

### Responsive Design Patterns
```css
/* Mobile First Approach */
.container {
    @apply mx-auto px-4;
}

/* Breakpoint Usage */
.grid {
    @apply grid-cols-1 md:grid-cols-2 lg:grid-cols-3;
}

.text-responsive {
    @apply text-2xl md:text-3xl lg:text-4xl;
}
```

## JavaScript Patterns

### Module Pattern
```javascript
// i18n.js - Translation module
const translations = { /* ... */ };

function changeLanguage(lang) {
    currentLanguage = lang;
    localStorage.setItem('tarmaq_language', lang);
    updatePageContent();
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { changeLanguage, translations, currentLanguage };
}
```

### Event Handling Pattern
```javascript
// main.js - Event handling
document.addEventListener('DOMContentLoaded', function() {
    // Initialize components
    initializeMobileMenu();
    initializeScrollEffects();
    initializeFormValidation();
});

function initializeMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', toggleMobileMenu);
    }
}
```

### Form Validation Pattern
```javascript
function validateForm(formId) {
    const form = document.getElementById(formId);
    if (!form) return;
    
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Clear previous errors
        clearErrors(form);
        
        // Validate required fields
        if (validateRequiredFields(form)) {
            await submitForm(form);
        }
    });
}
```

### LocalStorage Pattern
```javascript
// charter.js - Data persistence
function saveSignatories(signatories) {
    try {
        localStorage.setItem('tarmaq_charter_signatories', JSON.stringify(signatories));
    } catch (error) {
        console.error('Error saving signatories:', error);
    }
}

function loadSignatories() {
    try {
        const stored = localStorage.getItem('tarmaq_charter_signatories');
        return stored ? JSON.parse(stored) : getDefaultSignatories();
    } catch (error) {
        console.error('Error loading signatories:', error);
        return getDefaultSignatories();
    }
}
```

## Data Flow Patterns

### Translation Flow
```
1. User clicks language button
2. changeLanguage() function called
3. currentLanguage updated
4. localStorage updated
5. updatePageContent() called
6. All [data-i18n] elements updated
7. UI reflects new language
```

### Charter Signature Flow
```
1. User fills charter form
2. Form validation performed
3. Signature data created
4. Data saved to localStorage
5. Email notification sent
6. UI updated with new signature
7. Success message displayed
```

### Scroll Animation Flow
```
1. Page loads
2. IntersectionObserver created
3. Elements with .scroll-reveal observed
4. When element enters viewport
5. .revealed class added
6. CSS animation triggered
7. Element animates into view
```

## Error Handling Patterns

### Try-Catch Pattern
```javascript
function safeLocalStorageOperation(operation) {
    try {
        return operation();
    } catch (error) {
        console.error('LocalStorage operation failed:', error);
        return getDefaultValue();
    }
}
```

### Form Validation Pattern
```javascript
function validateField(field) {
    const value = field.value.trim();
    
    if (!value && field.hasAttribute('required')) {
        showError(field, 'This field is required');
        return false;
    }
    
    if (field.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            showError(field, 'Invalid email format');
            return false;
        }
    }
    
    return true;
}
```

### Fallback Pattern
```javascript
// EmailJS fallback to webhook
async function sendEmailNotification(data) {
    try {
        await emailjs.send(serviceId, templateId, templateParams);
    } catch (error) {
        console.error('EmailJS failed, trying webhook:', error);
        try {
            await fetch(webhookUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
        } catch (fallbackError) {
            console.error('All email methods failed:', fallbackError);
        }
    }
}
```

## Performance Patterns

### Lazy Loading Pattern
```javascript
// Image lazy loading
if ('loading' in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
        img.src = img.dataset.src;
    });
} else {
    // Fallback for older browsers
    loadLazyLoadingPolyfill();
}
```

### Debounced Scroll Pattern
```javascript
let scrollTimeout;
window.addEventListener('scroll', function() {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(function() {
        // Perform scroll-based operations
        updateHeaderState();
        triggerScrollAnimations();
    }, 16); // ~60fps
});
```

### Intersection Observer Pattern
```javascript
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
        }
    });
}, observerOptions);
```

---

**Last Updated**: 2025-01-21  
**Version**: 3.1  
**Status**: Production Ready
