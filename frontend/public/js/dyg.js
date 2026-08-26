// ========== DYG-BTP - Script Principal ==========
// Ce fichier gère les interactions et animations du site
// Les traductions sont gérées par translations.js

// Initialisation
document.addEventListener('DOMContentLoaded', function() {
    
    // Smooth scrolling pour les liens d'ancrage
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Animation on scroll avec IntersectionObserver
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                entry.target.classList.add('in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observer tous les éléments animés
    document.querySelectorAll('.service-card, .project-card, .stat-item, .domaine-card, .reveal, .team-card, .expertise-card, .faq-item, .ci-block, .contact-form').forEach(el => {
        observer.observe(el);
    });

    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        const nav = document.querySelector('nav');
        if (nav) {
            if (window.scrollY > 100) {
                nav.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
            } else {
                nav.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
            }
        }
    });
});


// ========== Curseur Custom ==========
(function initCustomCursor() {
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorRing = document.querySelector('.cursor-ring');
    
    if (!cursorDot || !cursorRing) return;
    
    let mouseX = 0;
    let mouseY = 0;
    let dotX = 0;
    let dotY = 0;
    let ringX = 0;
    let ringY = 0;
    
    // Suivre la position de la souris
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    // Animation fluide du curseur (lerp)
    function animateCursor() {
        // Point central suit immédiatement
        dotX = mouseX;
        dotY = mouseY;
        
        // Anneau suit avec un léger délai (effet smooth)
        ringX += (mouseX - ringX) * 0.15;
        ringY += (mouseY - ringY) * 0.15;
        
        cursorDot.style.transform = `translate(${dotX}px, ${dotY}px) translate(-50%, -50%)`;
        cursorRing.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;
        
        requestAnimationFrame(animateCursor);
    }
    
    animateCursor();
    
    // Effet hover sur les éléments cliquables
    const hoverElements = document.querySelectorAll('a, button, .service-card, .project-card, .team-card, .domaine-card, .expertise-card, .nav-links a, .lang-btn, .cta-button, .btn-primary, .btn-secondary, .btn-see-more');
    
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorRing.classList.add('hover');
        });
        
        el.addEventListener('mouseleave', () => {
            cursorRing.classList.remove('hover');
        });
    });
    
    // Cacher le curseur par défaut
    document.body.style.cursor = 'none';
    hoverElements.forEach(el => {
        el.style.cursor = 'none';
    });
})();


// ========== FAQ Accordéon ==========
(function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-q');
        
        if (question) {
            question.addEventListener('click', () => {
                // Fermer les autres items
                faqItems.forEach(otherItem => {
                    if (otherItem !== item && otherItem.classList.contains('active')) {
                        otherItem.classList.remove('active');
                    }
                });
                
                // Toggle l'item cliqué
                item.classList.toggle('active');
            });
        }
    });
})();


// ========== Formulaire de Contact ==========
(function initContactForm() {
    const form = document.getElementById('contact-form');
    const status = document.getElementById('form-status');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Récupérer les données du formulaire
            const formData = new FormData(form);
            const data = Object.fromEntries(formData);
            
            // Afficher un message de confirmation
            if (status) {
                status.innerHTML = '<div style="color: #2c5f7f; padding: 1rem; background: #e8f4f8; border-radius: 8px; margin-top: 1rem;"><i class="fas fa-check-circle"></i> Merci ! Votre message a été envoyé. Nous vous recontacterons rapidement.</div>';
            }
            
            // Réinitialiser le formulaire
            form.reset();
            
            // Logger les données (en production, envoyer au serveur)
            console.log('Formulaire soumis:', data);
            
            // Masquer le message après 5 secondes
            setTimeout(() => {
                if (status) {
                    status.innerHTML = '';
                }
            }, 5000);
        });
    }
})();


// ========== Animation des Stats (compteur) ==========
(function initStatsCounter() {
    const stats = document.querySelectorAll('.stat-number');
    let animated = false;
    
    function animateStats() {
        if (animated) return;
        
        stats.forEach(stat => {
            const target = stat.textContent;
            const isPlus = target.includes('+');
            const number = parseInt(target.replace('+', ''));
            
            let current = 0;
            const increment = number / 50;
            const duration = 2000;
            const stepTime = duration / 50;
            
            const counter = setInterval(() => {
                current += increment;
                if (current >= number) {
                    stat.textContent = number + (isPlus ? '+' : '');
                    clearInterval(counter);
                } else {
                    stat.textContent = Math.floor(current) + (isPlus ? '+' : '');
                }
            }, stepTime);
        });
        
        animated = true;
    }
    
    // Observer la section stats
    const statsSection = document.querySelector('.stats');
    if (statsSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateStats();
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(statsSection);
    }
})();


// ========== Menu Mobile (si nécessaire) ==========
(function initMobileMenu() {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    if (burger && nav) {
        // Toggle menu
        burger.addEventListener('click', () => {
            nav.classList.toggle('active');
            burger.classList.toggle('active');
        });
        
        // Fermer le menu quand on clique sur un lien
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('active');
                burger.classList.remove('active');
            });
        });
        
        // Fermer le menu quand on clique en dehors
        document.addEventListener('click', (e) => {
            if (!burger.contains(e.target) && !nav.contains(e.target)) {
                nav.classList.remove('active');
                burger.classList.remove('active');
            }
        });
    }
})();


// ========== Console Log de bienvenue ==========
console.log('%c🏗️ DYG-BTP', 'font-size: 24px; font-weight: bold; color: #2c5f7f;');
console.log('%cSite développé avec ❤️ pour DYG-BTP', 'font-size: 12px; color: #666;');
console.log('%cIngénieurs Conseils - Études et Contrôle en Génie Civil', 'font-size: 10px; color: #999;');
