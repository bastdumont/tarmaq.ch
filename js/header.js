/**
 * TARMAQ Header Component
 * Reusable navigation header for all pages
 */

class TarmaqHeader {
  constructor(currentPage = '') {
    this.currentPage = currentPage;
    this.init();
  }

  init() {
    // Create header HTML
    const headerHTML = this.generateHeaderHTML();
    
    // Insert header into page
    const body = document.body;
    if (body) {
      body.insertAdjacentHTML('afterbegin', headerHTML);
    }
  }

  generateHeaderHTML() {
    return `
    <!-- Header / Navigation -->
    <header
      id="header"
      class="fixed w-full top-0 z-50 bg-white shadow-sm transition-all duration-300"
    >
      <nav
        class="container mx-auto px-4 py-4 flex justify-between items-center"
      >
        <!-- Logo -->
        <a href="index.html" class="flex items-center space-x-2">
          <img src="assets/logo.png" alt="TARMAQ Logo" class="h-10" />
        </a>

        <!-- Desktop Menu -->
        <div class="hidden lg:flex items-center space-x-8">
          <a
            href="index.html"
            class="nav-link ${this.currentPage === 'index' ? 'text-primary font-semibold' : 'hover:text-primary transition'}"
            data-i18n="nav.home"
            >Accueil</a
          >
          <a
            href="projet.html"
            class="nav-link ${this.currentPage === 'projet' ? 'text-primary font-semibold' : 'hover:text-primary transition'}"
            data-i18n="nav.project"
            >Le projet</a
          >
          <a
            href="about.html"
            class="nav-link ${this.currentPage === 'about' ? 'text-primary font-semibold' : 'hover:text-primary transition'}"
            data-i18n="nav.about"
            >À propos</a
          >
          <a
            href="activites.html"
            class="nav-link ${this.currentPage === 'activites' ? 'text-primary font-semibold' : 'hover:text-primary transition'}"
            data-i18n="nav.activities"
            >Activités</a
          >
          <a
            href="soutenir.html"
            class="nav-link ${this.currentPage === 'soutenir' ? 'text-primary font-semibold' : 'hover:text-primary transition'}"
            data-i18n="nav.support"
            >Soutien</a
          >
          <a
            href="charte.html"
            class="nav-link ${this.currentPage === 'charte' ? 'text-primary font-semibold' : 'hover:text-primary transition'}"
            data-i18n="nav.manifeste"
            >Manifeste</a
          >
          <a
            href="contact.html"
            class="nav-link ${this.currentPage === 'contact' ? 'text-primary font-semibold' : 'hover:text-primary transition'}"
            data-i18n="nav.contact"
            >Contact</a
          >
        </div>

        <!-- Language Selector -->
        <div class="hidden lg:flex items-center space-x-2">
          <button
            onclick="changeLanguage('fr')"
            class="lang-btn w-8 h-8 rounded-full overflow-hidden border-2 border-transparent hover:border-primary transition"
            title="Français"
          >
            <span class="text-xl">🇫🇷</span>
          </button>
          <button
            onclick="changeLanguage('en')"
            class="lang-btn w-8 h-8 rounded-full overflow-hidden border-2 border-transparent hover:border-primary transition"
            title="English"
          >
            <span class="text-xl">🇬🇧</span>
          </button>
          <button
            onclick="changeLanguage('de')"
            class="lang-btn w-8 h-8 rounded-full overflow-hidden border-2 border-transparent hover:border-primary transition"
            title="Deutsch"
          >
            <span class="text-xl">🇩🇪</span>
          </button>
          <button
            onclick="changeLanguage('it')"
            class="lang-btn w-8 h-8 rounded-full overflow-hidden border-2 border-transparent hover:border-primary transition"
            title="Italiano"
          >
            <span class="text-xl">🇮🇹</span>
          </button>
        </div>

        <!-- Mobile Menu Button -->
        <button id="mobile-menu-btn" class="lg:hidden text-2xl">
          <i class="fas fa-bars"></i>
        </button>
      </nav>

      <!-- Mobile Menu -->
      <div id="mobile-menu" class="hidden lg:hidden bg-white border-t">
        <div class="container mx-auto px-4 py-4 flex flex-col space-y-4">
          <a
            href="index.html"
            class="nav-link ${this.currentPage === 'index' ? 'text-primary font-semibold' : 'hover:text-primary transition'}"
            data-i18n="nav.home"
            >Accueil</a
          >
          <a
            href="projet.html"
            class="nav-link ${this.currentPage === 'projet' ? 'text-primary font-semibold' : 'hover:text-primary transition'}"
            data-i18n="nav.project"
            >Le projet</a
          >
          <a
            href="about.html"
            class="nav-link ${this.currentPage === 'about' ? 'text-primary font-semibold' : 'hover:text-primary transition'}"
            data-i18n="nav.about"
            >À propos</a
          >
          <a
            href="activites.html"
            class="nav-link ${this.currentPage === 'activites' ? 'text-primary font-semibold' : 'hover:text-primary transition'}"
            data-i18n="nav.activities"
            >Activités</a
          >
          <a
            href="soutenir.html"
            class="nav-link ${this.currentPage === 'soutenir' ? 'text-primary font-semibold' : 'hover:text-primary transition'}"
            data-i18n="nav.support"
            >Soutien</a
          >
          <a
            href="charte.html"
            class="nav-link ${this.currentPage === 'charte' ? 'text-primary font-semibold' : 'hover:text-primary transition'}"
            data-i18n="nav.manifeste"
            >Manifeste</a
          >
          <a
            href="contact.html"
            class="nav-link ${this.currentPage === 'contact' ? 'text-primary font-semibold' : 'hover:text-primary transition'}"
            data-i18n="nav.contact"
            >Contact</a
          >

          <div class="flex space-x-3 pt-2">
            <button onclick="changeLanguage('fr')" class="lang-btn text-2xl">
              🇫🇷
            </button>
            <button onclick="changeLanguage('en')" class="lang-btn text-2xl">
              🇬🇧
            </button>
            <button onclick="changeLanguage('de')" class="lang-btn text-2xl">
              🇩🇪
            </button>
            <button onclick="changeLanguage('it')" class="lang-btn text-2xl">
              🇮🇹
            </button>
          </div>
        </div>
      </div>
    </header>
    `;
  }
}

// Auto-initialize header based on current page
document.addEventListener('DOMContentLoaded', function() {
  // Determine current page from filename
  const currentPath = window.location.pathname;
  const currentPage = currentPath.split('/').pop().replace('.html', '') || 'index';
  
  // Initialize header with current page
  new TarmaqHeader(currentPage);
});
