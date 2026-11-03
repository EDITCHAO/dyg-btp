/**
 * DYG-BTP — INGER Animation & Micro-Interactions Engine
 * Inspired by www.inger-group.com
 * Handles: 3D Mouse Tilt, Levitation, Count-up, Scroll Reveal, Magnetic Pill Buttons
 */

(function() {
    'use strict';

    document.addEventListener('DOMContentLoaded', () => {
        initFloatingNavbar();
        initHeroLevitationTilt();
        initNumberCounters();
        initScrollRevealStagger();
        initMagneticButtons();
        initBentoHoverEffects();
        initSpiralScrollEffect();
    });

    /**
     * 1. FLOATING PILL NAVBAR SCROLL BEHAVIOR
     */
    function initFloatingNavbar() {
        const navWrapper = document.querySelector('.nav-wrapper');
        if (!navWrapper) return;

        let lastScroll = 0;
        window.addEventListener('scroll', () => {
            const currentScroll = window.scrollY;

            if (currentScroll > 40) {
                navWrapper.classList.add('scrolled');
            } else {
                navWrapper.classList.remove('scrolled');
            }

            lastScroll = currentScroll;
        }, { passive: true });
    }

    /**
     * 2. HERO 3D PERSPECTIVE TILT ON MOUSEMOVE
     */
    function initHeroLevitationTilt() {
        const visualZone = document.querySelector('.hero-visual-cluster, .hero-visual');
        const cards = document.querySelectorAll('.cluster-card, .hero-visual-card');

        if (!visualZone || cards.length === 0) return;

        visualZone.addEventListener('mousemove', (e) => {
            const rect = visualZone.getBoundingClientRect();
            const x = e.clientX - rect.left; // x position within element
            const y = e.clientY - rect.top;  // y position within element

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -10; // max -10 to 10 deg
            const rotateY = ((x - centerX) / centerX) * 10;

            cards.forEach((card, index) => {
                const depth = (index + 1) * 0.4;
                card.style.transform = `perspective(1000px) rotateX(${rotateX * depth}deg) rotateY(${rotateY * depth}deg) translateZ(${depth * 15}px)`;
            });
        });

        visualZone.addEventListener('mouseleave', () => {
            cards.forEach(card => {
                card.style.transform = '';
            });
        });
    }

    /**
     * 3. NUMBER COUNTER ANIMATION WITH EASING
     */
    function initNumberCounters() {
        const counterElements = document.querySelectorAll('[data-target], .bento-stat-num');

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    const target = parseInt(el.getAttribute('data-target') || el.textContent.trim(), 10);
                    if (!isNaN(target)) {
                        animateValue(el, 0, target, 2200);
                    }
                    observer.unobserve(el);
                }
            });
        }, { threshold: 0.3 });

        counterElements.forEach(el => observer.observe(el));

        function animateValue(element, start, end, duration) {
            let startTimestamp = null;
            const step = (timestamp) => {
                if (!startTimestamp) startTimestamp = timestamp;
                const progress = Math.min((timestamp - startTimestamp) / duration, 1);
                // Ease out cubic: 1 - pow(1 - progress, 3)
                const easedProgress = 1 - Math.pow(1 - progress, 3);
                const current = Math.floor(easedProgress * (end - start) + start);
                
                element.textContent = current;

                if (progress < 1) {
                    window.requestAnimationFrame(step);
                } else {
                    element.textContent = end;
                }
            };
            window.requestAnimationFrame(step);
        }
    }

    /**
     * 4. SCROLL REVEAL WITH STAGGER
     */
    function initScrollRevealStagger() {
        const revealElements = document.querySelectorAll('.bento-card, .about-row-item, .quote-statement-card, .domaine-card, .service-card');

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12 });

        revealElements.forEach((el, index) => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(28px)';
            el.style.transition = `opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${index % 4 * 0.1}s, transform 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${index % 4 * 0.1}s`;
            observer.observe(el);
        });
    }

    /**
     * 5. MAGNETIC BUTTON EFFECT ON PILL BUTTONS
     */
    function initMagneticButtons() {
        const buttons = document.querySelectorAll('.btn-inger-primary, .nav-cta, .btn-inger-secondary');

        buttons.forEach(btn => {
            btn.addEventListener('mousemove', (e) => {
                const rect = btn.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;

                btn.style.transform = `translate(${x * 0.22}px, ${y * 0.22}px)`;
            });

            btn.addEventListener('mouseleave', () => {
                btn.style.transform = '';
            });
        });
    }

    /**
     * 6. BENTO CARDS 3D HOVER LIFT
     */
    function initBentoHoverEffects() {
        const bentoCards = document.querySelectorAll('.bento-card');

        bentoCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-6px)';
            });
            card.addEventListener('mouseleave', () => {
                card.style.transform = '';
            });
        });
    }

    /**
     * 7. GOLDEN SPIRAL ROTATION ON SCROLL
     */
    function initSpiralScrollEffect() {
        const spiral = document.querySelector('.hero-spiral-watermark');
        if (!spiral) return;

        window.addEventListener('scroll', () => {
            const rotation = window.scrollY * 0.08;
            spiral.style.transform = `rotate(${rotation}deg)`;
        }, { passive: true });
    }

})();

