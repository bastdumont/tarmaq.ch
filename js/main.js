// Main JavaScript for TARMAQ website

// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
            mobileMenu.classList.toggle('show');
            
            // Toggle icon
            const icon = this.querySelector('i');
            if (icon.classList.contains('fa-bars')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
        
        // Close mobile menu when clicking on a link
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
                mobileMenu.classList.remove('show');
                const icon = mobileMenuBtn.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            });
        });
    }
});

// Header scroll effect
window.addEventListener('scroll', function() {
    const header = document.getElementById('header');
    if (window.scrollY > 50) {
        header.classList.add('header-scrolled');
    } else {
        header.classList.remove('header-scrolled');
    }
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href !== '#!') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// Modern Scroll Reveal Animation System
const scrollRevealOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -100px 0px'
};

const scrollRevealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            // Keep observing for re-animation if element leaves and re-enters viewport
        }
    });
}, scrollRevealOptions);

// Initialize scroll reveal on page load
document.addEventListener('DOMContentLoaded', () => {
    // Add scroll-reveal class to all elements you want to animate
    const revealElements = document.querySelectorAll('.scroll-reveal');
    revealElements.forEach(element => {
        scrollRevealObserver.observe(element);
    });
    
    // Also animate cards, sections, and headings automatically
    const autoReveal = document.querySelectorAll(
        'section > div > h2, section > div > h3, ' +
        '.card, article, .stat-number, ' +
        '.hover\\:shadow-xl, .bg-white.rounded-2xl'
    );
    
    autoReveal.forEach((element, index) => {
        // Add scroll-reveal class
        element.classList.add('scroll-reveal');
        // Add staggered delay for multiple elements
        element.style.transitionDelay = `${index * 0.1}s`;
        scrollRevealObserver.observe(element);
    });
});

// Counter animation for statistics
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target + '+';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start) + '+';
        }
    }, 16);
}

// Trigger counter animation when stats section is visible
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            statNumbers.forEach(stat => {
                const target = parseInt(stat.dataset.target);
                animateCounter(stat, target);
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

// Form validation and submission
function validateForm(formId) {
    const form = document.getElementById(formId);
    if (!form) return;
    
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Clear previous errors
        const errorElements = form.querySelectorAll('.error-message');
        errorElements.forEach(el => el.remove());
        
        // Basic validation
        let isValid = true;
        const requiredFields = form.querySelectorAll('[required]');
        
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                isValid = false;
                showError(field, 'Ce champ est requis');
            }
            
            // Email validation
            if (field.type === 'email' && field.value) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(field.value)) {
                    isValid = false;
                    showError(field, 'Email invalide');
                }
            }
        });
        
        if (isValid) {
            // Show loading state
            const submitButton = form.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            submitButton.disabled = true;
            submitButton.textContent = 'Envoi en cours...';
            
            // Simulate form submission (replace with actual API call)
            setTimeout(() => {
                showSuccessMessage(form);
                form.reset();
                submitButton.disabled = false;
                submitButton.textContent = originalText;
            }, 1500);
        }
    });
}

function showError(field, message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message text-red-500 text-sm mt-1';
    errorDiv.textContent = message;
    field.parentNode.appendChild(errorDiv);
    field.classList.add('border-red-500');
}

function showSuccessMessage(form) {
    const successDiv = document.createElement('div');
    successDiv.className = 'alert alert-success';
    successDiv.textContent = 'Message envoyé avec succès ! Nous vous répondrons bientôt.';
    form.parentNode.insertBefore(successDiv, form);
    
    setTimeout(() => {
        successDiv.remove();
    }, 5000);
}

// Initialize form validation on page load
document.addEventListener('DOMContentLoaded', () => {
    validateForm('contact-form');
    validateForm('support-form');
});

// Lazy loading for images
if ('loading' in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
        img.src = img.dataset.src;
    });
} else {
    // Fallback for browsers that don't support lazy loading
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
    document.body.appendChild(script);
}

// Cookie consent (simple implementation)
function checkCookieConsent() {
    if (!localStorage.getItem('cookie_consent')) {
        showCookieBanner();
    }
}

function showCookieBanner() {
    const banner = document.createElement('div');
    banner.className = 'fixed bottom-0 left-0 right-0 bg-secondary text-white p-4 z-50 shadow-lg';
    banner.innerHTML = `
        <div class="container mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <p class="text-sm">Ce site utilise des cookies pour améliorer votre expérience. En continuant, vous acceptez notre utilisation des cookies.</p>
            <button onclick="acceptCookies()" class="bg-primary hover:bg-red-700 text-white px-6 py-2 rounded-full whitespace-nowrap transition">
                Accepter
            </button>
        </div>
    `;
    document.body.appendChild(banner);
}

function acceptCookies() {
    localStorage.setItem('cookie_consent', 'true');
    const banner = document.querySelector('.fixed.bottom-0');
    if (banner) {
        banner.remove();
    }
}

// Check cookie consent on page load
document.addEventListener('DOMContentLoaded', checkCookieConsent);

// Back to top button
function createBackToTopButton() {
    const button = document.createElement('button');
    button.id = 'back-to-top';
    button.className = 'fixed bottom-8 right-8 bg-primary text-white w-12 h-12 rounded-full shadow-lg hover:bg-red-700 transition opacity-0 pointer-events-none z-40';
    button.innerHTML = '<i class="fas fa-arrow-up"></i>';
    button.setAttribute('aria-label', 'Retour en haut');
    
    button.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    document.body.appendChild(button);
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            button.classList.remove('opacity-0', 'pointer-events-none');
            button.classList.add('opacity-100');
        } else {
            button.classList.add('opacity-0', 'pointer-events-none');
            button.classList.remove('opacity-100');
        }
    });
}

// Initialize back to top button
document.addEventListener('DOMContentLoaded', createBackToTopButton);

// Utility function to format dates
function formatDate(date, locale = 'fr-FR') {
    return new Intl.DateTimeFormat(locale, {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }).format(new Date(date));
}

// Utility function to format numbers
function formatNumber(number, locale = 'fr-FR') {
    return new Intl.NumberFormat(locale).format(number);
}

// Export functions for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        validateForm,
        animateCounter,
        formatDate,
        formatNumber
    };
}