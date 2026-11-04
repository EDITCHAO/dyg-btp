/**
 * DYG-BTP — Réalisations Lightbox
 */
'use strict';

(function () {
    const lb      = document.getElementById('projLightbox');
    const lbImg   = document.getElementById('projLbImg');
    const lbTitle = document.getElementById('projLbTitle');
    const lbCat   = document.getElementById('projLbCat');
    const btnClose = document.getElementById('projLbClose');
    const btnPrev  = document.getElementById('projLbPrev');
    const btnNext  = document.getElementById('projLbNext');

    if (!lb) return;

    const items = Array.from(document.querySelectorAll('.proj-item'));
    let current = 0;

    function open(index) {
        current = index;
        update();
        lb.classList.add('active');
        lb.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }

    function close() {
        lb.classList.remove('active');
        lb.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    function update() {
        const item = items[current];
        lbImg.src   = item.querySelector('img').src;
        lbImg.alt   = item.querySelector('img').alt;
        lbTitle.textContent = item.dataset.title || '';
        lbCat.textContent   = item.dataset.cat   || '';
    }

    function prev() { current = (current - 1 + items.length) % items.length; update(); }
    function next() { current = (current + 1) % items.length; update(); }

    // Clic sur le bouton zoom de chaque item
    items.forEach((item, i) => {
        item.querySelector('.proj-zoom')?.addEventListener('click', (e) => {
            e.stopPropagation();
            open(i);
        });
        // Clic sur l'image aussi
        item.querySelector('img')?.addEventListener('click', () => open(i));
    });

    btnClose?.addEventListener('click', close);
    btnPrev?.addEventListener('click', prev);
    btnNext?.addEventListener('click', next);

    // Clic arrière-plan
    lb.addEventListener('click', (e) => { if (e.target === lb) close(); });

    // Clavier
    document.addEventListener('keydown', (e) => {
        if (!lb.classList.contains('active')) return;
        if (e.key === 'Escape')     close();
        if (e.key === 'ArrowLeft')  prev();
        if (e.key === 'ArrowRight') next();
    });

    // Swipe tactile
    let startX = 0;
    lb.addEventListener('touchstart', e => { startX = e.touches[0].clientX; }, { passive: true });
    lb.addEventListener('touchend',   e => {
        const diff = startX - e.changedTouches[0].clientX;
        if (Math.abs(diff) > 40) diff > 0 ? next() : prev();
    });
})();
