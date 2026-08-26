/* ============================================================
   DYG-BTP · Google Analytics (GA4) — chargé UNIQUEMENT après
   consentement « Mesure d'audience » (RGPD).
   Se déclenche via window.DYG_CONSENT et l'évènement 'dyg:consent'
   émis par cookies.js.
   ============================================================ */

(function () {
  "use strict";

  if (window.__dygGA) return; 
  window.__dygGA = true;

  // ⚠️ REMPLACER PAR VOTRE ID GOOGLE ANALYTICS
  var ID = "G-XXXXXXXXXX"; // TODO: Remplacer par votre vrai ID GA4

  var loaded = false;

  function loadGA(){
    if (loaded) return; 
    loaded = true;

    console.log('[DYG Analytics] 📊 Chargement de Google Analytics (GA4)...');

    var s = document.createElement("script");
    s.async = true;
    s.src = "https://www.googletagmanager.com/gtag/js?id=" + ID;
    document.head.appendChild(s);

    window.dataLayer = window.dataLayer || [];
    function gtag(){ dataLayer.push(arguments); }
    window.gtag = gtag;

    gtag("js", new Date());
    gtag("config", ID, { 
      anonymize_ip: true,
      cookie_flags: 'SameSite=None;Secure'
    });

    console.log('[DYG Analytics] ✅ Google Analytics chargé avec succès');
  }

  // 1) Choix déjà enregistré (rechargement / visite suivante)
  if (window.DYG_CONSENT && window.DYG_CONSENT.analytics) {
    console.log('[DYG Analytics] Consentement trouvé en mémoire');
    loadGA();
  }

  // 2) L'utilisateur accepte la mesure d'audience pendant la visite
  window.addEventListener("dyg:consent", function (e) {
    if (e.detail && e.detail.analytics) {
      console.log('[DYG Analytics] Consentement reçu via événement');
      loadGA();
    }
  });

})();
