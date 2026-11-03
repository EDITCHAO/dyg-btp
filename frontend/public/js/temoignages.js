/**
 * DYG-BTP — Slider Témoignages
 */
'use strict';

(function () {
    const track   = document.getElementById('temoTrack');
    const dotsWrap= document.getElementById('temoDots');
    if (!track) return;

    const slides  = track.querySelectorAll('.temo-slide');
    const total   = slides.length;
    let current   = 0;
    let timer;

    /* Créer les points */
    slides.forEach((_, i) => {
        const dot = document.createElement('button');
        dot.className = 'temo-dot' + (i === 0 ? ' active' : '');
        dot.setAttribute('aria-label', `Témoignage ${i + 1}`);
        dot.addEventListener('click', () => goTo(i));
        dotsWrap.appendChild(dot);
    });

    const dots = dotsWrap.querySelectorAll('.temo-dot');

    function goTo(index) {
        current = (index + total) % total;
        track.style.transform = `translateX(-${current * 100}%)`;
        dots.forEach((d, i) => d.classList.toggle('active', i === current));
        resetTimer();
    }

    function resetTimer() {
        clearInterval(timer);
        timer = setInterval(() => goTo(current + 1), 5000);
    }

    /* Flèches */
    document.querySelector('.temo-prev')?.addEventListener('click', () => goTo(current - 1));
    document.querySelector('.temo-next')?.addEventListener('click', () => goTo(current + 1));

    /* Swipe tactile */
    let startX = 0;
    track.addEventListener('touchstart', e => { startX = e.touches[0].clientX; }, { passive: true });
    track.addEventListener('touchend',   e => {
        const diff = startX - e.changedTouches[0].clientX;
        if (Math.abs(diff) > 40) goTo(diff > 0 ? current + 1 : current - 1);
    });

    /* Démarrer */
    resetTimer();
})();
