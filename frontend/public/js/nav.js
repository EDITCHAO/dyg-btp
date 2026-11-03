/**
 * DYG-BTP — Navigation Pill
 * Gestion scroll, burger, menu mobile, langue
 */
'use strict';

(function () {

  const nav    = document.getElementById('nav');
  const burger = document.getElementById('burger');
  const mmenu  = document.getElementById('mmenu');
  const mclose = document.getElementById('mclose');

  /* ---- Scroll : classe scrolled ---- */
  const onScroll = () => {
    if (window.scrollY > 40) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---- Burger : ouvrir menu mobile ---- */
  if (burger && mmenu) {
    burger.addEventListener('click', () => {
      const open = mmenu.classList.toggle('open');
      burger.classList.toggle('open', open);
      burger.setAttribute('aria-expanded', open);
      mmenu.setAttribute('aria-hidden', !open);
      document.body.style.overflow = open ? 'hidden' : '';
    });
  }

  /* ---- Fermer menu mobile ---- */
  const closeMenu = () => {
    mmenu.classList.remove('open');
    burger.classList.remove('open');
    burger.setAttribute('aria-expanded', 'false');
    mmenu.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  if (mclose) mclose.addEventListener('click', closeMenu);

  /* Fermer en cliquant sur un lien du menu mobile */
  document.querySelectorAll('.m-links a').forEach(a => {
    a.addEventListener('click', closeMenu);
  });

  /* ---- Lien actif selon section visible ---- */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  const observerOpts = { rootMargin: '-40% 0px -55% 0px' };
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navLinks.forEach(a => {
          a.classList.toggle('active', a.getAttribute('href') === `#${id}`);
        });
      }
    });
  }, observerOpts);

  sections.forEach(s => observer.observe(s));

  /* ---- Langue (sync toutes les instances) ---- */
  document.querySelectorAll('.lang-opt').forEach(btn => {
    btn.addEventListener('click', () => {
      const lang = btn.dataset.lang;
      // Mettre à jour tous les boutons langue sur la page
      document.querySelectorAll('.lang-opt').forEach(b => {
        const active = b.dataset.lang === lang;
        b.classList.toggle('active', active);
        b.setAttribute('aria-pressed', active);
      });
      // Déclencher traduction si module dispo
      if (window.DYG && window.DYG.Language) {
        window.DYG.Language.switchLanguage(lang);
      }
    });
  });

})();
