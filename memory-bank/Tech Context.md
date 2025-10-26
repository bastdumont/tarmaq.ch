# Tech Context - TARMAQ Website

## Technology Stack

### Core Technologies
- **HTML5**: Semantic markup with modern standards
- **CSS3**: Custom styles with modern features (Grid, Flexbox, Animations)
- **JavaScript ES6+**: Modern JavaScript with modules and async/await
- **Tailwind CSS 3.4**: Utility-first CSS framework (CDN)

### External Dependencies (CDN Only)
- **Google Fonts**: Inter font family (300-800 weights)
- **Font Awesome 6.4.0**: Icon library
- **EmailJS**: Email service for charter notifications
- **Tailwind CSS**: Utility-first styling framework

### No Build Tools
- **No npm**: No package management
- **No Webpack**: No bundling or compilation
- **No Babel**: No JavaScript transpilation
- **No Sass/Less**: No CSS preprocessing
- **No TypeScript**: Pure JavaScript

## Architecture Constraints

### Static Site Requirements
- **Pure Static**: All files must work directly in browser
- **No Server-Side Code**: No PHP, Node.js, Python, etc.
- **No Database**: No MySQL, PostgreSQL, MongoDB, etc.
- **No Backend API**: No REST endpoints or GraphQL
- **No Authentication**: No user login or session management

### CDN-Only Dependencies
- **External Libraries**: Must be loaded via CDN
- **No Local Dependencies**: No node_modules or vendor folders
- **No Package Locking**: No package-lock.json or yarn.lock
- **No Version Control**: Dependencies managed by CDN providers

### Browser Compatibility
- **Modern Browsers**: Chrome 90+, Firefox 88+, Safari 14+
- **ES6+ Support**: Arrow functions, modules, async/await
- **CSS Grid**: Modern layout features
- **IntersectionObserver**: Scroll animation support
- **LocalStorage**: Client-side data persistence

## File Structure

### Project Organization
```
tarmaq.ch/
├── 📄 HTML Pages (7)
│   ├── index.html              # Homepage
│   ├── projet.html             # Project details
│   ├── activites.html          # Activities
│   ├── impact.html             # Impact & testimonials
│   ├── soutenir.html           # Support page
│   ├── contact.html            # Contact & booking
│   ├── charte.html             # Interactive charter
│   └── 404.html                # Error page
├── 🎨 Styles
│   └── css/style.css           # Custom CSS (14KB)
├── ⚡ JavaScript
│   ├── js/i18n.js              # Translation system (644 lines)
│   ├── js/main.js              # UI interactions (308 lines)
│   ├── js/charter.js           # Charter functionality (191 lines)
│   └── js/header.js            # Header component (untracked)
├── 🖼️ Assets
│   ├── assets/logo.png         # Main logo
│   └── assets/image.png        # Additional images
├── 📚 Documentation
│   ├── README.md               # Project documentation
│   ├── CHANGELOG.md            # Version history
│   ├── claude.md               # AI assistant context
│   └── memory-bank/            # Project memory bank
└── ⚙️ Configuration
    └── vercel.json             # Deployment config
```

### File Size Analysis
- **Total Project**: ~95KB
- **HTML Pages**: ~50KB (7 pages)
- **CSS Styles**: ~14KB (custom + Tailwind CDN)
- **JavaScript**: ~31KB (3 files + CDN dependencies)
- **Assets**: ~10KB (images)

## Dependencies Analysis

### Tailwind CSS 3.4 (CDN)
```html
<script src="https://cdn.tailwindcss.com"></script>
```
- **Purpose**: Utility-first CSS framework
- **Size**: ~3MB (uncompressed, cached by CDN)
- **Features**: Responsive design, color system, spacing
- **Customization**: Extended colors and fonts

### Google Fonts - Inter
```html
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
```
- **Purpose**: Typography system
- **Weights**: 300, 400, 500, 600, 700, 800
- **Size**: ~50KB (cached by CDN)
- **Fallback**: sans-serif

### Font Awesome 6.4.0
```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css">
```
- **Purpose**: Icon library
- **Size**: ~100KB (cached by CDN)
- **Usage**: Navigation, buttons, decorative elements

### EmailJS (Conditional)
```html
<script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"></script>
```
- **Purpose**: Email notifications for charter signatures
- **Size**: ~50KB (loaded only when needed)
- **Configuration**: Service ID, template ID, public key

## Performance Considerations

### Loading Strategy
- **Critical CSS**: Inline critical styles
- **Non-Critical CSS**: Loaded asynchronously
- **JavaScript**: Deferred loading
- **Images**: Lazy loading with fallback

### Caching Strategy
- **Static Assets**: Long-term caching (1 year)
- **HTML Pages**: Short-term caching (1 hour)
- **CDN Dependencies**: Cached by CDN providers
- **LocalStorage**: Client-side data persistence

### Optimization Techniques
- **Minification**: CSS and JS minified
- **Compression**: Gzip/Brotli compression
- **Image Optimization**: Compressed PNG assets
- **Code Splitting**: Modular JavaScript files

## Browser Support

### Supported Browsers
- **Chrome**: 90+ (ES6+, CSS Grid, IntersectionObserver)
- **Firefox**: 88+ (ES6+, CSS Grid, IntersectionObserver)
- **Safari**: 14+ (ES6+, CSS Grid, IntersectionObserver)
- **Edge**: 90+ (Chromium-based)

### Feature Support
- **ES6 Modules**: import/export statements
- **Async/Await**: Modern promise handling
- **CSS Grid**: Modern layout system
- **CSS Custom Properties**: CSS variables
- **IntersectionObserver**: Scroll animations
- **LocalStorage**: Client-side storage
- **Fetch API**: Modern HTTP requests

### Fallbacks
- **CSS Grid**: Flexbox fallback for older browsers
- **IntersectionObserver**: Scroll event fallback
- **LocalStorage**: Cookie fallback for data persistence
- **Modern JavaScript**: Babel polyfills if needed

## Security Considerations

### Client-Side Security
- **XSS Prevention**: Input sanitization and validation
- **CSRF Protection**: Not applicable (no server-side)
- **Content Security Policy**: Recommended for production
- **HTTPS Only**: Secure connections required

### Data Privacy
- **LocalStorage**: Client-side data only
- **No Personal Data**: No sensitive information stored
- **Email Privacy**: EmailJS handles data transmission
- **GDPR Compliance**: Cookie consent implementation

### External Dependencies
- **CDN Security**: Trusted CDN providers only
- **HTTPS CDNs**: All external resources over HTTPS
- **Subresource Integrity**: Recommended for CDN resources
- **CORS Policy**: Proper cross-origin handling

## Deployment Constraints

### Static Hosting Only
- **Netlify**: Drag & drop deployment
- **Vercel**: GitHub integration or drag & drop
- **GitHub Pages**: Git-based deployment
- **AWS S3**: Static website hosting
- **Any Static Host**: No server requirements

### No Server Configuration
- **No .htaccess**: No Apache configuration
- **No nginx.conf**: No Nginx configuration
- **No server.js**: No Node.js server
- **No PHP**: No server-side processing

### Environment Variables
- **No .env**: No environment configuration
- **No Secrets**: No sensitive configuration
- **Public Configuration**: All settings in code
- **CDN Keys**: EmailJS keys in JavaScript

## Development Workflow

### Local Development
```bash
# Option 1: Python HTTP Server
python -m http.server 8000

# Option 2: Node.js Serve
npx serve

# Option 3: PHP Built-in Server
php -S localhost:8000

# Option 4: Direct File Opening
open index.html
```

### No Build Process
- **Direct Editing**: Edit HTML/CSS/JS files directly
- **Live Reload**: Browser refresh for changes
- **No Compilation**: No build step required
- **No Bundling**: No asset bundling needed

### Version Control
- **Git**: Standard version control
- **No .gitignore**: No build artifacts to ignore
- **No node_modules**: No dependency folders
- **Clean Repository**: Only source files tracked

## Monitoring & Analytics

### Performance Monitoring
- **Core Web Vitals**: LCP, FID, CLS metrics
- **Page Speed**: Lighthouse scores
- **Resource Loading**: Network timing
- **User Experience**: Real user metrics

### Error Tracking
- **JavaScript Errors**: Console error logging
- **Form Validation**: Client-side error handling
- **Network Errors**: Fetch API error handling
- **User Feedback**: Contact form submissions

### Analytics Integration
- **Google Analytics**: Recommended for production
- **Privacy Compliance**: GDPR-compliant tracking
- **Event Tracking**: User interaction monitoring
- **Conversion Tracking**: Form submissions and charter signatures

## Future Considerations

### Potential Enhancements
- **Progressive Web App**: Service worker implementation
- **Offline Support**: Cached content for offline viewing
- **Push Notifications**: Browser notification support
- **Advanced Analytics**: Enhanced user behavior tracking

### Scalability Options
- **CDN Integration**: Enhanced content delivery
- **Image Optimization**: WebP format support
- **Code Splitting**: Dynamic imports for larger features
- **Performance Budget**: Automated performance monitoring

### Technology Evolution
- **CSS Features**: Container queries, CSS nesting
- **JavaScript Features**: Top-level await, import maps
- **Web Standards**: New HTML/CSS/JS features
- **Browser Support**: Extended compatibility

---

**Last Updated**: 2025-01-21  
**Version**: 3.1  
**Status**: Production Ready
