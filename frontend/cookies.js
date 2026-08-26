/* ============================================================
   DYG-BTP · Bannière de consentement cookies (RGPD) - Version Premium
   - Choix : Accepter / Refuser / Personnaliser (sans dark pattern)
   - Mémorise le choix (localStorage 'dyg_cookie_consent')
   - Expose window.DYG_CONSENT + événement 'dyg:consent'
   - Réouverture : window.DYG_openCookiePrefs()
   ============================================================ */

(function () {
  "use strict";

  if (window.__dygCookies) return; 
  window.__dygCookies = true;

  var KEY = "dyg_cookie_consent";

  function getLang() { 
    var l = ""; 
    try { 
      l = localStorage.getItem("dyg_lang") || ""; 
    } catch(e) {}
    l = l || document.documentElement.lang || "fr"; 
    return l.slice(0,2) === "en" ? "en" : "fr"; 
  }

  var T = {
    fr: {
      title: "Respect de votre vie privée",
      text: "Nous utilisons uniquement les cookies nécessaires au bon fonctionnement du site et, avec votre accord, une mesure d'audience anonyme. Vous gardez le contrôle.",
      more: "En savoir plus",
      refuse: "Refuser", 
      custom: "Personnaliser", 
      accept: "Accepter", 
      save: "Enregistrer mes choix",
      necessary: "Nécessaires", 
      necessaryD: "Indispensables au fonctionnement du site. Toujours actifs.",
      analytics: "Mesure d'audience", 
      analyticsD: "Statistiques de visite anonymes, pour améliorer le site."
    },
    en: {
      title: "Your privacy matters",
      text: "We only use cookies necessary for the site to work and, with your consent, anonymous audience measurement. You stay in control.",
      more: "Learn more",
      refuse: "Decline", 
      custom: "Customise", 
      accept: "Accept", 
      save: "Save my choices",
      necessary: "Necessary", 
      necessaryD: "Essential for the site to function. Always on.",
      analytics: "Audience measurement", 
      analyticsD: "Anonymous visit statistics, to improve the site."
    }
  };


  var css = `
  #ck-banner{position:fixed;left:24px;bottom:24px;z-index:1400;width:min(430px,calc(100vw - 48px));
    opacity:0;transform:translateY(16px);pointer-events:none;
    transition:opacity .5s var(--ease,cubic-bezier(.22,1,.36,1)),transform .5s var(--ease,cubic-bezier(.22,1,.36,1));
    font-family:var(--sans,'Inter',sans-serif)}
  #ck-banner.show{opacity:1;transform:none;pointer-events:auto}
  .ck-card{position:relative;background:var(--paper-2,#fff);border:1px solid rgba(0,0,0,.12);
    border-radius:18px;padding:20px 20px 16px;display:flex;gap:14px;
    box-shadow:0 30px 70px -30px rgba(18,28,38,.5),0 2px 8px rgba(36,52,68,.10)}
  .ck-ic{flex:none;width:34px;height:34px;color:var(--secondary-color,#2c5f7f)}
  .ck-ic svg{width:34px;height:34px}
  .ck-title{font-family:var(--serif,'Fraunces',serif);font-size:16px;color:var(--ink,#1a1a1a);margin:1px 0 6px}
  .ck-text{font-size:13px;line-height:1.55;color:rgba(0,0,0,.66);margin:0 0 14px;font-weight:300}
  .ck-text a{color:var(--secondary-color,#2c5f7f);text-decoration:underline;text-underline-offset:2px}
  .ck-prefs{display:none;flex-direction:column;gap:10px;margin:0 0 14px;
    border-top:1px solid rgba(0,0,0,.10);padding-top:12px}
  #ck-banner.custom .ck-prefs{display:flex}
  .ck-row{display:flex;align-items:flex-start;justify-content:space-between;gap:12px}
  .ck-row .ck-tx{display:flex;flex-direction:column}
  .ck-row .ck-n{font-size:12.5px;color:var(--ink,#1a1a1a);font-weight:500}
  .ck-row .ck-d{font-size:11.5px;color:rgba(0,0,0,.55);line-height:1.45;font-weight:300}
  .ck-sw{appearance:none;-webkit-appearance:none;flex:none;width:38px;height:22px;border-radius:30px;
    background:rgba(0,0,0,.18);position:relative;cursor:pointer;transition:background .3s ease;margin-top:2px}
  .ck-sw::after{content:"";position:absolute;top:2px;left:2px;width:18px;height:18px;border-radius:50%;background:#fff;
    box-shadow:0 1px 3px rgba(0,0,0,.25);transition:transform .3s ease}
  .ck-sw:checked{background:var(--secondary-color,#2c5f7f)}
  .ck-sw:checked::after{transform:translateX(16px)}
  .ck-sw:disabled{opacity:.55;cursor:not-allowed}
  .ck-actions{display:flex;flex-wrap:wrap;gap:8px}
  .ck-btn{font-family:var(--mono,monospace);font-size:11px;letter-spacing:.04em;cursor:pointer;
    padding:10px 16px;border-radius:30px;border:1px solid rgba(0,0,0,.16);
    background:transparent;color:var(--ink,#1a1a1a);transition:all .3s ease;flex:1 1 auto;white-space:nowrap}
  .ck-btn:hover{border-color:var(--ink,#1a1a1a)}
  .ck-accept{background:var(--ink,#1a1a1a);color:var(--paper,#fff);border-color:var(--ink,#1a1a1a)}
  .ck-accept:hover{background:var(--secondary-color,#2c5f7f);border-color:var(--secondary-color,#2c5f7f)}
  .ck-save{display:none}
  #ck-banner.custom .ck-save{display:block}
  #ck-banner.custom .ck-custom{display:none}
  @media(max-width:600px){
    #ck-banner{left:12px;right:12px;width:auto;bottom:calc(env(safe-area-inset-bottom,0px) + 12px)}
    .ck-actions .ck-btn{flex:1 1 100%}
  }
  @media(prefers-reduced-motion:reduce){#ck-banner{transition:opacity .2s}}
  `;

  var st = document.createElement("style"); 
  st.textContent = css; 
  document.head.appendChild(st);

  var ICON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a9 9 0 1 0 9 9 3 3 0 0 1-3-3 3 3 0 0 1-3-3 3 3 0 0 1-3-3Z"/><circle cx="9" cy="11" r="1" fill="currentColor" stroke="none"/><circle cx="13" cy="15" r="1" fill="currentColor" stroke="none"/><circle cx="15.5" cy="10.5" r="1" fill="currentColor" stroke="none"/></svg>';

  var el = document.createElement("div");
  el.id = "ck-banner"; 
  el.setAttribute("role", "dialog"); 
  el.setAttribute("aria-label", "Cookies");

  function render() {
    var t = T[getLang()];

    el.innerHTML =
      '<div class="ck-card">' +
        '<span class="ck-ic" aria-hidden="true">' + ICON + '</span>' +
        '<div class="ck-bd">' +
          '<div class="ck-title">' + t.title + '</div>' +
          '<p class="ck-text">' + t.text + ' <a href="politique-confidentialite.html">' + t.more + '</a></p>' +
          '<div class="ck-prefs">' +
            '<div class="ck-row"><span class="ck-tx"><span class="ck-n">' + t.necessary + '</span><span class="ck-d">' + t.necessaryD + '</span></span><input class="ck-sw" type="checkbox" checked disabled aria-label="' + t.necessary + '"></div>' +
            '<div class="ck-row"><span class="ck-tx"><span class="ck-n">' + t.analytics + '</span><span class="ck-d">' + t.analyticsD + '</span></span><input class="ck-sw" id="ck-analytics" type="checkbox" aria-label="' + t.analytics + '"></div>' +
          '</div>' +
          '<div class="ck-actions">' +
            '<button class="ck-btn ck-refuse" type="button">' + t.refuse + '</button>' +
            '<button class="ck-btn ck-custom" type="button">' + t.custom + '</button>' +
            '<button class="ck-btn ck-save" type="button">' + t.save + '</button>' +
            '<button class="ck-btn ck-accept" type="button">' + t.accept + '</button>' +
          '</div>' +
        '</div>' +
      '</div>';

    bind();
  }

  function save(consent) {
    consent.ts = Date.now(); 
    consent.necessary = true;
    try { 
      localStorage.setItem(KEY, JSON.stringify(consent)); 
    } catch(e) {}

    apply(consent); 
    hide();
  }

  function apply(consent) {
    window.DYG_CONSENT = consent;

    try { 
      window.dispatchEvent(new CustomEvent("dyg:consent", { detail: consent })); 
    } catch(e) {}

    console.log('[DYG Cookies] Consentement appliqué:', consent);
  }

  function show() { 
    el.classList.add("show"); 
  }

  function hide() { 
    el.classList.remove("show", "custom"); 
  }

  function bind() {
    el.querySelector(".ck-accept").onclick = function() { 
      save({ analytics: true }); 
    };

    el.querySelector(".ck-refuse").onclick = function() { 
      save({ analytics: false }); 
    };

    el.querySelector(".ck-custom").onclick = function() { 
      el.classList.add("custom"); 
    };

    el.querySelector(".ck-save").onclick = function() {
      var a = el.querySelector("#ck-analytics"); 
      save({ analytics: !!(a && a.checked) });
    };
  }

  function init() {
    var saved = null;

    try { 
      saved = JSON.parse(localStorage.getItem(KEY) || "null"); 
    } catch(e) {}

    document.body.appendChild(el); 
    render();

    if (saved && typeof saved.necessary !== "undefined") { 
      apply(saved); 
      return; 
    }

    setTimeout(show, 900);
  }

  // Réouverture manuelle (ex. lien « Gérer les cookies »)
  window.DYG_openCookiePrefs = function() { 
    render(); 
    el.classList.add("custom"); 
    show();

    var a = el.querySelector("#ck-analytics");
    if (a && window.DYG_CONSENT) a.checked = !!window.DYG_CONSENT.analytics; 
  };

  // Met à jour la langue de la bannière si elle est affichée
  document.addEventListener("DOMContentLoaded", function() {
    document.querySelectorAll(".lang-btn").forEach(function(b) {
      b.addEventListener("click", function() { 
        setTimeout(function() { 
          if (el.classList.contains("show")) { 
            var wasCustom = el.classList.contains("custom"); 
            render(); 
            if (wasCustom) el.classList.add("custom"); 
          } 
        }, 30); 
      });
    });
  });

  // ========== API Publique ==========
  window.DYG_COOKIES = {
    accept: function() { save({ analytics: true }); },
    refuse: function() { save({ analytics: false }); },
    reset: function() { 
      try {
        localStorage.removeItem(KEY);
      } catch(e) {}
      window.DYG_CONSENT = { analytics: false };
      console.log('[DYG Cookies] Consentement réinitialisé');
    },
    getConsent: function() { return window.DYG_CONSENT; },
    openPrefs: function() { window.DYG_openCookiePrefs(); }
  };

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();

  console.log('[DYG Cookies] ✅ Système de cookies premium chargé');

})();
