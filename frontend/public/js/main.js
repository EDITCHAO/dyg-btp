/**
 * ============================================
 * DYG-BTP - Site Web Professionnel
 * JavaScript Module - Architecture Moderne
 * ============================================
 */

'use strict';

/**
 * Navigation Module
 * Gère toutes les fonctionnalités de navigation
 */
const NavigationModule = (() => {
    // Cache des éléments DOM
    const DOM = {
        navWrapper: null,
        burger: null,
        menu: null,
        links: null,
        langButtons: null,
    };
    
    // État de l'application
    const state = {
        isMenuOpen: false,
        currentLang: 'fr',
        scrollPosition: 0,
    };
    
    /**
     * Initialise le cache DOM
     */
    const cacheDOMElements = () => {
        DOM.navWrapper = document.querySelector('.nav-wrapper');
        DOM.burger = document.querySelector('.nav-burger');
        DOM.menu = document.querySelector('.nav-menu');
        DOM.links = document.querySelectorAll('.nav-menu a');
        DOM.langButtons = document.querySelectorAll('.lang-btn');
    };
    
    /**
     * Gestion du menu burger (mobile)
     */
    const handleBurgerMenu = () => {
        if (!DOM.burger || !DOM.menu) return;
        
        DOM.burger.addEventListener('click', () => {
            state.isMenuOpen = !state.isMenuOpen;
            
            DOM.burger.classList.toggle('active');
            DOM.menu.classList.toggle('active');
            DOM.burger.setAttribute('aria-expanded', state.isMenuOpen);
            
            // Empêcher le scroll quand le menu est ouvert
            document.body.style.overflow = state.isMenuOpen ? 'hidden' : '';
        });
    };
    
    /**
     * Ferme le menu mobile lors du clic sur un lien
     */
    const handleMenuLinkClick = () => {
        if (!DOM.links) return;
        
        DOM.links.forEach(link => {
            link.addEventListener('click', () => {
                if (state.isMenuOpen) {
                    DOM.burger.classList.remove('active');
                    DOM.menu.classList.remove('active');
                    DOM.burger.setAttribute('aria-expanded', 'false');
                    state.isMenuOpen = false;
                    document.body.style.overflow = '';
                }
                
                // Mise à jour du lien actif
                DOM.links.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
            });
        });
    };
    
    /**
     * Gestion du scroll - Ajout d'ombre à la navigation
     */
    const handleScroll = () => {
        if (!DOM.navWrapper) return;
        
        let ticking = false;
        
        window.addEventListener('scroll', () => {
            state.scrollPosition = window.scrollY;
            
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    if (state.scrollPosition > 50) {
                        DOM.navWrapper.classList.add('scrolled');
                    } else {
                        DOM.navWrapper.classList.remove('scrolled');
                    }
                    ticking = false;
                });
                ticking = true;
            }
        });
    };
    
    /**
     * Gestion du changement de langue
     */
    const handleLanguageSwitch = () => {
        if (!DOM.langButtons) return;
        
        DOM.langButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const lang = btn.dataset.lang;
                
                if (lang === state.currentLang) return;
                
                // Mise à jour de l'état
                state.currentLang = lang;
                
                // Mise à jour de l'UI
                DOM.langButtons.forEach(b => {
                    b.classList.remove('active');
                    b.setAttribute('aria-pressed', 'false');
                });
                btn.classList.add('active');
                btn.setAttribute('aria-pressed', 'true');
                
                // Déclencher le changement de langue
                LanguageModule.switchLanguage(lang);
            });
        });
    };
    
    /**
     * Initialisation du module
     */
    const init = () => {
        cacheDOMElements();
        handleBurgerMenu();
        handleMenuLinkClick();
        handleScroll();
        handleLanguageSwitch();
        
        console.log('✅ Navigation Module initialisé');
    };
    
    return {
        init,
    };
})();

/**
 * Language Module
 * Gère la traduction de l'interface
 */
const LanguageModule = (() => {
    let currentLang = 'fr';
    let translations = {};
    
    /**
     * Charge les traductions
     */
    const loadTranslations = async () => {
        try {
            // Vérifier si les traductions sont déjà chargées dans le DOM
            if (window.translations) {
                translations = window.translations;
                return;
            }
            
            // Sinon, charger depuis le fichier
            const response = await fetch('/js/translations.js');
            if (response.ok) {
                const script = await response.text();
                eval(script);
                translations = window.translations || {};
            }
        } catch (error) {
            console.warn('⚠️ Traductions non chargées:', error);
        }
    };
    
    /**
     * Change la langue de l'interface
     */
    const switchLanguage = (lang) => {
        currentLang = lang;
        document.documentElement.lang = lang;
        
        // Mise à jour de tous les éléments avec data-i18n
        const elements = document.querySelectorAll('[data-i18n]');
        elements.forEach(element => {
            const key = element.dataset.i18n;
            const translation = getTranslation(key, lang);
            if (translation) {
                element.textContent = translation;
            }
        });
        
        console.log(`🌐 Langue changée: ${lang}`);
    };
    
    /**
     * Récupère une traduction
     */
    const getTranslation = (key, lang = currentLang) => {
        const keys = key.split('.');
        let value = translations[lang];
        
        for (const k of keys) {
            if (value && value[k]) {
                value = value[k];
            } else {
                return key; // Retourne la clé si traduction non trouvée
            }
        }
        
        return value;
    };
    
    /**
     * Initialisation
     */
    const init = async () => {
        await loadTranslations();
        console.log('✅ Language Module initialisé');
    };
    
    return {
        init,
        switchLanguage,
        getTranslation,
    };
})();

/**
 * Smooth Scroll Module
 * Gestion du défilement fluide
 */
const SmoothScrollModule = (() => {
    const init = () => {
        const links = document.querySelectorAll('a[href^="#"]');
        
        links.forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                
                // Ignorer les liens sans ancre ou juste "#"
                if (!href || href === '#') return;
                
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    
                    const navHeight = document.querySelector('.nav-wrapper')?.offsetHeight || 0;
                    const targetPosition = target.offsetTop - navHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
        
        console.log('✅ Smooth Scroll Module initialisé');
    };
    
    return {
        init,
    };
})();

/**
 * Performance Module
 * Optimisations de performance
 */
const PerformanceModule = (() => {
    /**
     * Lazy loading des images
     */
    const lazyLoadImages = () => {
        const images = document.querySelectorAll('img[data-src]');
        
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        imageObserver.unobserve(img);
                    }
                });
            });
            
            images.forEach(img => imageObserver.observe(img));
        } else {
            // Fallback pour les navigateurs anciens
            images.forEach(img => {
                img.src = img.dataset.src;
            });
        }
    };
    
    /**
     * Préchargement des ressources critiques
     */
    const preloadCriticalResources = () => {
        // Précharger le logo
        const logo = new Image();
        logo.src = '/logo-dyg-btp.png';
    };
    
    const init = () => {
        lazyLoadImages();
        preloadCriticalResources();
        console.log('✅ Performance Module initialisé');
    };
    
    return {
        init,
    };
})();

/**
 * ============================================
 * INITIALISATION DE L'APPLICATION
 * ============================================
 */
const App = {
    init: () => {
        console.log('🚀 Initialisation de DYG-BTP...');
        
        // Initialiser tous les modules
        NavigationModule.init();
        LanguageModule.init();
        SmoothScrollModule.init();
        PerformanceModule.init();
        
        console.log('✅ DYG-BTP initialisé avec succès!');
    }
};

// Démarrer l'application quand le DOM est chargé
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', App.init);
} else {
    App.init();
}

// Export pour utilisation externe si besoin
window.DYG = {
    Navigation: NavigationModule,
    Language: LanguageModule,
    SmoothScroll: SmoothScrollModule,
    Performance: PerformanceModule,
};
