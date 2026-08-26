/* ============================================================
   DYG-BTP · Assistant conversationnel premium (acquisition)
   Bilingue FR / EN — suit le sélecteur de langue
   Autonome : injecte CSS + UI + logique. Évolutif : LLM endpoint.
   ============================================================ */

(function () {
  "use strict";

  if (window.__dygChat) return; 
  window.__dygChat = true;

  var CFG = {
    name: "Euloge", 
    org: "DYG-BTP", 
    wa: "22899339658", // Numéro WhatsApp DYG-BTP
    tel: "+123-456-7890", 
    mail: "contact@dyg-btp.com",
    endpoint: window.DYG_CHAT_ENDPOINT || null,
    llmEndpoint: window.DYG_LLM_ENDPOINT || null, // Cloudflare Worker URL (optionnel)
    delay: 520
  };

  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var lead = { type: "", besoin: "", nom: "", contact: "" };
  var ask = null;

  function getLang() { 
    var l = ""; 
    try { 
      l = localStorage.getItem("dyg_lang") || ""; 
    } catch(e) {}
    l = l || document.documentElement.lang || "fr"; 
    return l.slice(0,2) === "en" ? "en" : "fr"; 
  }

  /* ---------- Packs de langue ---------- */
  var S = {
    fr: {
      status: "En ligne · réponse rapide", 
      fab: "Discuter avec " + CFG.name, 
      foot: "DYG-BTP · Ingénieurs Conseils",
      ph: "Écrivez votre message…",
      g1: "Bonjour 👋 Je suis <b>" + CFG.name + "</b>, votre interlocuteur chez <b>DYG-BTP</b>.",
      gGen: "Ingénieurs-conseils en bâtiments, routes et topographie. Comment puis-je vous accompagner ?",
      mServices: "Découvrir nos services", 
      mDevis: "Demander un devis", 
      mFaq: "Questions fréquentes", 
      mWa: "Parler sur WhatsApp",
      svcIntro: "Nous intervenons sur <b>trois domaines</b>, agréés par l'État — études et contrôle technique :",
      svc: {
        bat: {
          name: "Bâtiments & Construction",
          desc: "Immeubles IGH/ERP, habitats planifiés, équipements publics, contrôle technique et supervision de chantiers. Agrément État."
        },
        route: {
          name: "Infrastructures routières",
          desc: "Routes, voiries urbaines, ponts, ouvrages d'art, drainage et signalisation. Agrément État pour études et contrôle."
        },
        topo: {
          name: "Topographie",
          desc: "Relevés topographiques, implantations de chantiers, calculs de volumes, contrôles de nivellement et bornages."
        }
      },
      svcQ: "Souhaitez-vous être recontacté pour ce type de projet ?", 
      cOther: "Un autre domaine", 
      cWa: "WhatsApp",
      dStart: "Avec plaisir — 30 secondes pour préparer votre demande. Quel est le <b>type de projet</b> ?",
      dTypes: ["Bâtiment", "Route / Ouvrage", "Topographie", "Autre"],
      dBesoinQ: "Et votre <b>besoin</b> principal ?",
      dBesoins: ["Étude", "Contrôle de travaux", "Conseil / Expertise", "Je ne sais pas encore"], 
      dBesoinX: "À définir",
      dNameQ: "Parfait. À quel <b>nom</b> dois-je préparer la demande ?",
      dContactQ: "Merci {n} ! Laissez-moi votre <b>e-mail ou téléphone</b> — notre équipe revient vers vous sous 24 h.",
      dInvalid: "Pouvez-vous préciser un e-mail ou un numéro valide ? (ex. nom@mail.com ou +228 …)",
      dFinish: "C'est noté ✅ Votre demande est transmise à nos ingénieurs. Pour une réponse <b>immédiate</b>, écrivez-nous sur WhatsApp :",
      cWaOpen: "Ouvrir WhatsApp", 
      cMail: "Envoyer un e-mail", 
      cDone: "Terminer", 
      mMail: "E-mail",
      thanksMe: "Merci !", 
      thanksBot: "Merci de votre confiance. À très vite chez <b>DYG-BTP</b>.",
      waBot: "Je vous ouvre WhatsApp 💬 Notre équipe vous répond directement.",
      faqIntro: "Voici les questions les plus posées :", 
      faqHuman: "Parler à un humain",
      faqOther: "Autre question",
      faq: [
        {
          q: "Quels types de projets prenez-vous en charge ?",
          a: "DYG-BTP intervient en bâtiments (IGH, ERP, villas, hôtels, hôpitaux, écoles), infrastructures routières (routes, ponts, ouvrages d'art) et topographie (relevés, implantations, calculs de volumes)."
        },
        {
          q: "Vos qualifications officielles ?",
          a: "DYG-BTP est agréé par l'État, certifié ISO 9001:2015 en Études et Contrôle en Génie Civil. Nous intervenons en tant qu'ingénieurs-conseils depuis 2004."
        },
        {
          q: "Intervenez-vous en dehors de votre région ?",
          a: "Oui — DYG-BTP est actif localement et développe des partenariats stratégiques pour une présence accrue dans la région."
        },
        {
          q: "Comment se déroule une mission de contrôle ?",
          a: "Vérification de la conformité technique, suivi de l'avancement, contrôle qualité et financier, avec rapports périodiques jusqu'à la réception des travaux."
        },
        {
          q: "Comment obtenir un devis ?",
          a: "Via ce chat, le formulaire de contact, par téléphone, WhatsApp ou e-mail à contact@dyg-btp.com. Réponse adaptée sous 24 h."
        }
      ],
      hi: "Bonjour 👋 Comment puis-je vous aider ?",
      fallback: "Je peux vous orienter vers le bon service, répondre à vos questions ou préparer un devis. Que souhaitez-vous ?",
      nudge: "Besoin d'un conseil ou d'un devis ? Je suis là 👋",
      hooks: { 
        domaines: "Vous explorez nos domaines d'expertise. Souhaitez-vous être orienté vers le bon service ?",
        projects: "Nos réalisations vous intéressent ? Je peux préparer un projet similaire pour vous.",
        portfolio: "Un projet vous inspire ? Demandons ensemble un devis adapté.",
        expertise: "Bureau certifié ISO 9001:2015. Une question sur nos qualifications ?",
        faq: "Une question fréquente ? Je peux y répondre tout de suite.",
        contact: "Je peux préparer votre demande de devis en 30 secondes." 
      },
      waHello: "Bonjour DYG-BTP, je viens de votre site.", 
      waProj: "Projet", 
      waNeed: "Besoin", 
      waName: "Nom", 
      waContact: "Contact"
    },
    en: {
      status: "Online · quick reply", 
      fab: "Chat with " + CFG.name, 
      foot: "DYG-BTP · Engineering Consultants",
      ph: "Type your message…",
      g1: "Hello 👋 I'm <b>" + CFG.name + "</b>, your contact at <b>DYG-BTP</b>.",
      gGen: "Consulting engineers in buildings, roads and surveying. How can I help you?",
      mServices: "Discover our services", 
      mDevis: "Request a quote", 
      mFaq: "FAQ", 
      mWa: "Chat on WhatsApp",
      svcIntro: "We operate across <b>three fields</b>, state-accredited — studies and technical supervision:",
      svc: {
        bat: {
          name: "Buildings & Construction",
          desc: "High-rise/public buildings, planned housing, public facilities, technical control and construction supervision. State accredited."
        },
        route: {
          name: "Road Infrastructure",
          desc: "Roads, urban streets, bridges, structures, drainage and signage. State accredited for studies and control."
        },
        topo: {
          name: "Surveying",
          desc: "Topographic surveys, construction siting, volume calculations, leveling controls and boundary markers."
        }
      },
      svcQ: "Would you like to be contacted about this type of project?", 
      cOther: "Another field", 
      cWa: "WhatsApp",
      dStart: "With pleasure — 30 seconds to prepare your request. What is the <b>project type</b>?",
      dTypes: ["Building", "Road / Structure", "Surveying", "Other"],
      dBesoinQ: "And your main <b>need</b>?",
      dBesoins: ["Study", "Works supervision", "Consulting / Appraisal", "Not sure yet"], 
      dBesoinX: "To be defined",
      dNameQ: "Great. Under what <b>name</b> should I prepare the request?",
      dContactQ: "Thank you {n}! Leave your <b>email or phone</b> — our team will get back to you within 24h.",
      dInvalid: "Could you provide a valid email or number? (e.g. name@mail.com or +228 …)",
      dFinish: "All set ✅ Your request has been sent to our engineers. For an <b>immediate</b> reply, message us on WhatsApp:",
      cWaOpen: "Open WhatsApp", 
      cMail: "Send an email", 
      cDone: "Finish", 
      mMail: "Email",
      thanksMe: "Thank you!", 
      thanksBot: "Thank you for your trust. See you soon at <b>DYG-BTP</b>.",
      waBot: "Opening WhatsApp 💬 Our team will reply to you directly.",
      faqIntro: "Here are the most common questions:", 
      faqHuman: "Talk to a human",
      faqOther: "Another question",
      faq: [
        {
          q: "What types of projects do you handle?",
          a: "DYG-BTP works on buildings (high-rise, public buildings, villas, hotels, hospitals, schools), road infrastructure (roads, bridges, structures) and surveying (surveys, siting, volume calculations)."
        },
        {
          q: "Your official qualifications?",
          a: "DYG-BTP is state-accredited, ISO 9001:2015 certified in Studies and Control in Civil Engineering. We have been working as consulting engineers since 2004."
        },
        {
          q: "Do you work outside your region?",
          a: "Yes — DYG-BTP is active locally and develops strategic partnerships for increased regional presence."
        },
        {
          q: "How does a supervision mission work?",
          a: "Technical compliance verification, progress monitoring, quality and financial control, with periodic reports until works reception."
        },
        {
          q: "How do I get a quote?",
          a: "Through this chat, the contact form, by phone, WhatsApp or email at contact@dyg-btp.com. Tailored reply within 24h."
        }
      ],
      hi: "Hello 👋 How can I help you?",
      fallback: "I can point you to the right service, answer your questions or prepare a quote. What would you like?",
      nudge: "Need advice or a quote? I'm here 👋",
      hooks: { 
        domaines: "Exploring our fields of expertise? Shall I point you to the right service?",
        projects: "Interested in our projects? I can prepare a similar one for you.",
        portfolio: "Inspired by a project? Let's request a tailored quote together.",
        expertise: "ISO 9001:2015 certified firm. Any question about our qualifications?",
        faq: "A common question? I can answer it right away.",
        contact: "I can prepare your quote request in 30 seconds." 
      },
      waHello: "Hello DYG-BTP, I'm coming from your website.", 
      waProj: "Project", 
      waNeed: "Need", 
      waName: "Name", 
      waContact: "Contact"
    }
  };

  function t() { return S[getLang()]; }

  /* ---------- Styles ---------- */
  var css = `
  #dc-fab,#dc-panel{font-family:var(--mono,'JetBrains Mono',monospace)}
  #dc-fab{position:fixed;right:22px;bottom:24px;z-index:1300;display:flex;align-items:center;gap:0;
    height:58px;width:58px;border:none;border-radius:40px;cursor:pointer;overflow:hidden;
    background:var(--ink,#1a1a1a);color:var(--paper,#F8F6F0);
    box-shadow:0 18px 40px -16px rgba(36,52,68,.55),0 2px 6px rgba(36,52,68,.18);
    transition:width .45s var(--ease,cubic-bezier(.22,1,.36,1)),transform .3s,box-shadow .3s}
  #dc-fab:hover{width:200px;transform:translateY(-2px)}
  #dc-fab .dc-ic{min-width:58px;height:58px;display:grid;place-items:center}
  #dc-fab .dc-ic svg{width:24px;height:24px}
  #dc-fab .dc-tx{white-space:nowrap;font-size:12px;letter-spacing:.04em;opacity:0;
    transform:translateX(-6px);transition:opacity .3s,transform .3s;padding-right:20px}
  #dc-fab:hover .dc-tx{opacity:1;transform:none}
  #dc-fab .dc-dot{position:absolute;top:12px;right:13px;width:9px;height:9px;border-radius:50%;
    background:#4caf50;box-shadow:0 0 0 3px var(--ink,#1a1a1a)}
  #dc-fab.hide{opacity:0;pointer-events:none;transform:scale(.6)}
  #dc-nudge{position:fixed;right:24px;bottom:92px;z-index:1299;max-width:248px;
    background:var(--paper-2,#fff);color:var(--ink,#1a1a1a);font-family:var(--sans,'Inter',sans-serif);
    font-size:13.5px;line-height:1.5;padding:13px 16px;border-radius:16px 16px 4px 16px;
    border:1px solid rgba(0,0,0,.1);box-shadow:0 20px 46px -24px rgba(36,52,68,.5);
    opacity:0;transform:translateY(8px) scale(.97);
    transition:all .45s var(--ease,cubic-bezier(.22,1,.36,1));pointer-events:none}
  #dc-nudge.show{opacity:1;transform:none;pointer-events:auto;cursor:pointer}
  #dc-nudge .dc-x{position:absolute;top:-8px;right:-8px;width:22px;height:22px;border-radius:50%;
    background:var(--ink,#1a1a1a);color:#fff;border:none;font-size:13px;cursor:pointer;line-height:1}
  #dc-panel{position:fixed;right:22px;bottom:24px;z-index:1301;width:380px;max-width:calc(100vw - 32px);
    height:600px;max-height:calc(100vh - 40px);display:flex;flex-direction:column;overflow:hidden;
    border-radius:22px;background:var(--paper,#f5f5f5);border:1px solid rgba(0,0,0,.1);
    box-shadow:0 40px 90px -36px rgba(18,28,38,.6),0 2px 8px rgba(36,52,68,.14);
    opacity:0;transform:translateY(18px) scale(.98);pointer-events:none;
    transition:opacity .4s var(--ease,cubic-bezier(.22,1,.36,1)),transform .4s var(--ease,cubic-bezier(.22,1,.36,1))}
  #dc-panel.open{opacity:1;transform:none;pointer-events:auto}
  .dc-head{position:relative;padding:18px 18px 16px;display:flex;align-items:center;gap:13px;
    background:var(--primary-color,#1a1a1a);color:var(--white,#fff)}
  .dc-av{width:42px;height:42px;border-radius:50%;flex:none;display:grid;place-items:center;
    background:linear-gradient(140deg,var(--secondary-color,#2c5f7f),#1a4d6b);
    font-family:var(--serif,'Fraunces',serif);font-size:17px;color:#fff}
  .dc-h-tx{display:flex;flex-direction:column;line-height:1.25}
  .dc-h-tx .n{font-family:var(--serif,'Fraunces',serif);font-size:16px;letter-spacing:.01em}
  .dc-h-tx .s{font-size:10.5px;letter-spacing:.06em;text-transform:uppercase;opacity:.7;
    display:flex;align-items:center;gap:6px;margin-top:2px}
  .dc-h-tx .s::before{content:"";width:6px;height:6px;border-radius:50%;background:#4caf50}
  .dc-close{margin-left:auto;background:transparent;border:none;color:var(--white,#fff);
    cursor:pointer;width:32px;height:32px;border-radius:50%;font-size:18px;opacity:.8;transition:.3s}
  .dc-close:hover{opacity:1;background:rgba(255,255,255,.1)}
  .dc-log{flex:1;overflow-y:auto;padding:20px 16px 6px;display:flex;flex-direction:column;gap:12px;scrollbar-width:thin}
  .dc-log::-webkit-scrollbar{width:6px}
  .dc-log::-webkit-scrollbar-thumb{background:rgba(0,0,0,.16);border-radius:6px}
  .dc-row{display:flex;max-width:86%}
  .dc-row.bot{align-self:flex-start}
  .dc-row.me{align-self:flex-end;justify-content:flex-end}
  .dc-b{font-family:var(--sans,'Inter',sans-serif);font-size:14px;line-height:1.55;
    padding:11px 15px;border-radius:16px;animation:dcIn .4s ease both}
  .dc-row.bot .dc-b{background:var(--white,#fff);color:var(--text-color,#333);
    border:1px solid rgba(0,0,0,.1);border-bottom-left-radius:5px}
  .dc-row.me .dc-b{background:var(--secondary-color,#2c5f7f);color:#fff;border-bottom-right-radius:5px}
  .dc-b a{color:inherit;text-decoration:underline;text-underline-offset:2px}
  @keyframes dcIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}
  .dc-type{display:inline-flex;gap:4px;padding:13px 15px}
  .dc-type i{width:6px;height:6px;border-radius:50%;background:rgba(0,0,0,.4);animation:dcBlink 1.2s infinite}
  .dc-type i:nth-child(2){animation-delay:.18s}.dc-type i:nth-child(3){animation-delay:.36s}
  @keyframes dcBlink{0%,60%,100%{opacity:.25;transform:translateY(0)}30%{opacity:1;transform:translateY(-3px)}}
  .dc-quick{display:flex;flex-wrap:wrap;gap:8px;padding:4px 16px 12px}
  .dc-chip{font-family:var(--mono,monospace);font-size:11.5px;letter-spacing:.02em;cursor:pointer;
    padding:9px 14px;border-radius:30px;background:transparent;color:var(--secondary-color,#2c5f7f);
    border:1px solid rgba(0,0,0,.14);transition:all .3s ease;animation:dcIn .4s both}
  .dc-chip:hover{background:var(--primary-color,#1a1a1a);color:var(--white,#fff);border-color:var(--primary-color,#1a1a1a)}
  .dc-chip.wa{border-color:#25D366;color:#1a8a45}
  .dc-chip.wa:hover{background:#25D366;color:#fff;border-color:#25D366}
  .dc-form{display:flex;gap:8px;padding:12px 14px;border-top:1px solid rgba(0,0,0,.1);background:var(--paper,#f5f5f5)}
  .dc-form input{flex:1;font-family:var(--sans,'Inter',sans-serif);font-size:14px;padding:11px 14px;border-radius:30px;
    border:1px solid rgba(0,0,0,.16);background:var(--white,#fff);color:var(--text-color,#333);outline:none;transition:border .3s}
  .dc-form input:focus{border-color:var(--secondary-color,#2c5f7f)}
  .dc-send{flex:none;width:42px;height:42px;border-radius:50%;border:none;cursor:pointer;
    background:var(--primary-color,#1a1a1a);color:var(--white,#fff);display:grid;place-items:center;transition:.3s}
  .dc-send:hover{background:var(--secondary-color,#2c5f7f)}
  .dc-send svg{width:18px;height:18px}
  .dc-foot{text-align:center;font-size:9.5px;letter-spacing:.08em;text-transform:uppercase;
    color:#999;padding:0 0 9px;background:var(--paper,#f5f5f5)}
  @media(max-width:600px){
    #dc-fab{right:16px;bottom:calc(env(safe-area-inset-bottom,0px) + 84px);height:52px;width:52px}
    #dc-fab .dc-ic{min-width:52px;height:52px}
    #dc-fab:hover{width:52px}#dc-fab .dc-tx{display:none}
    #dc-nudge{right:16px;bottom:calc(env(safe-area-inset-bottom,0px) + 146px)}
    #dc-panel{right:0;left:0;bottom:0;width:100%;max-width:100%;height:88vh;max-height:88vh;border-radius:20px 20px 0 0}
  }`;

  var st = document.createElement("style"); 
  st.textContent = css; 
  document.head.appendChild(st);

  /* ---------- DOM ---------- */
  var ICON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.4 8.4 0 0 1-12.3 7.4L3 21l2.1-5.6A8.4 8.4 0 1 1 21 11.5Z"/></svg>';
  var SEND = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h13M13 6l6 6-6 6"/></svg>';

  var fab = el('button', { id: "dc-fab", "aria-label": CFG.name });
  fab.innerHTML = '<span class="dc-ic">' + ICON + '</span><span class="dc-tx" id="dc-fabtx"></span><span class="dc-dot"></span>';

  var panel = el('div', { id: "dc-panel", role: "dialog", "aria-label": "Assistant DYG-BTP" });
  panel.innerHTML =
    '<div class="dc-head"><span class="dc-av">K</span>' +
    '<span class="dc-h-tx"><span class="n">' + CFG.name + ' · ' + CFG.org + '</span><span class="s" id="dc-status"></span></span>' +
    '<button class="dc-close" aria-label="Close">×</button></div>' +
    '<div class="dc-log" id="dc-log"></div>' +
    '<div class="dc-quick" id="dc-quick"></div>' +
    '<form class="dc-form" id="dc-form" autocomplete="on"><input id="dc-in" type="text" aria-label="Message"><button class="dc-send" type="submit" aria-label="Send">' + SEND + '</button></form>' +
    '<div class="dc-foot" id="dc-foot"></div>';

  var nudge = el('div', { id: "dc-nudge" });

  document.body.appendChild(fab); 
  document.body.appendChild(panel); 
  document.body.appendChild(nudge);

  var log = panel.querySelector("#dc-log"), 
      quick = panel.querySelector("#dc-quick"),
      form = panel.querySelector("#dc-form"), 
      input = panel.querySelector("#dc-in");

  function el(tag, a) { 
    var e = document.createElement(tag); 
    for (var k in a) e.setAttribute(k, a[k]); 
    return e; 
  }

  function scroll() { log.scrollTop = log.scrollHeight; }

  function esc(s) { 
    return s.replace(/[<>]/g, function(c) { 
      return c === "<" ? "&lt;" : "&gt;"; 
    }); 
  }

  function me(text) { 
    var r = el('div', {class: "dc-row me"}); 
    r.innerHTML = '<div class="dc-b">' + esc(text) + '</div>'; 
    log.appendChild(r); 
    scroll(); 
  }

  function typing() { 
    var r = el('div', {class: "dc-row bot"}); 
    r.innerHTML = '<div class="dc-b dc-type"><i></i><i></i><i></i></div>'; 
    log.appendChild(r); 
    scroll(); 
    return r; 
  }

  function bot(html, cb) { 
    var ty = typing(); 
    setTimeout(function() { 
      ty.remove();
      var r = el('div', {class: "dc-row bot"}); 
      r.innerHTML = '<div class="dc-b">' + html + '</div>'; 
      log.appendChild(r); 
      scroll(); 
      if (cb) cb();
    }, reduce ? 60 : CFG.delay + Math.min(html.length * 7, 700)); 
  }

  function chips(list) { 
    quick.innerHTML = "";
    list.forEach(function(c) { 
      var b = el('button', {class: "dc-chip" + (c.wa ? " wa" : ""), type: "button"}); 
      b.textContent = c.label; 
      b.onclick = c.act; 
      quick.appendChild(b); 
    });
  }

  function waLink() { 
    var T = t();
    var msg = T.waHello + (lead.type ? " " + T.waProj + ": " + lead.type + "." : "") + (lead.besoin ? " " + T.waNeed + ": " + lead.besoin + "." : "") + (lead.nom ? " " + T.waName + ": " + lead.nom + "." : "") + (lead.contact ? " " + T.waContact + ": " + lead.contact + "." : "");
    return "https://wa.me/" + CFG.wa + "?text=" + encodeURIComponent(msg);
  }

  function pushLead() { 
    try { 
      var a = JSON.parse(localStorage.getItem("dyg_leads") || "[]");
      a.push(Object.assign({ts: Date.now(), page: location.pathname + location.hash, lang: getLang()}, lead)); 
      localStorage.setItem("dyg_leads", JSON.stringify(a)); 
    } catch(e) {}
    
    if (CFG.endpoint) { 
      try { 
        fetch(CFG.endpoint, {
          method: "POST", 
          headers: {"Content-Type": "application/json"}, 
          body: JSON.stringify(lead)
        }); 
      } catch(e) {} 
    }
    
    if (typeof window.DYG_CHAT_ON_LEAD === "function") window.DYG_CHAT_ON_LEAD(lead);
  }

  /* ---------- Scénarios ---------- */
  function menu() { 
    var T = t(); 
    chips([
      {label: T.mServices, act: services},
      {label: T.mDevis, act: devisStart},
      {label: T.mFaq, act: faqMenu},
      {label: T.mWa, wa: true, act: function() { me(T.mWa); openWA(); }}
    ]); 
  }

  function services() { 
    var T = t(); 
    me(T.mServices);
    bot(T.svcIntro, function() { 
      chips([
        {label: T.svc.bat.name, act: function() { svc("bat"); }},
        {label: T.svc.route.name, act: function() { svc("route"); }},
        {label: T.svc.topo.name, act: function() { svc("topo"); }}
      ]); 
    });
  }

  function svc(key) { 
    var T = t(), o = T.svc[key]; 
    me(o.name); 
    lead.type = o.name;
    bot("<b>" + o.name + "</b> — " + o.desc, function() {
      bot(T.svcQ, function() { 
        chips([
          {label: T.mDevis, act: devisStart},
          {label: T.cOther, act: services},
          {label: T.cWa, wa: true, act: function() { me(T.cWa); openWA(); }}
        ]); 
      });
    });
  }

  function devisStart() { 
    var T = t(); 
    me(T.mDevis);
    bot(T.dStart, function() { 
      chips(T.dTypes.map(function(x) { 
        return {label: x, act: function() { devType(x); }}; 
      })); 
    });
  }

  function devType(x) { 
    var T = t(); 
    me(x); 
    lead.type = x;
    bot(T.dBesoinQ, function() { 
      chips(T.dBesoins.map(function(b, i) { 
        return {label: b, act: function() { devBesoin(i === 3 ? T.dBesoinX : b); }}; 
      })); 
    });
  }

  function devBesoin(b) { 
    var T = t(); 
    me(b); 
    lead.besoin = b; 
    bot(T.dNameQ, function() { 
      ask = "nom"; 
      quick.innerHTML = ""; 
      input.focus(); 
    }); 
  }

  function askContact() { 
    var T = t(); 
    bot(T.dContactQ.replace("{n}", lead.nom || ""), function() { 
      ask = "contact"; 
      input.focus(); 
    }); 
  }

  function finish() { 
    var T = t(); 
    pushLead();
    bot(T.dFinish, function() { 
      chips([
        {label: T.cWaOpen, wa: true, act: openWA},
        {label: T.cMail, act: function() { 
          me(T.mMail); 
          window.location.href = "mailto:" + CFG.mail + "?subject=" + encodeURIComponent("DYG-BTP — " + T.mDevis) + "&body=" + encodeURIComponent(T.waProj + ": " + lead.type + "\n" + T.waNeed + ": " + lead.besoin + "\n" + T.waName + ": " + lead.nom + "\n" + T.waContact + ": " + lead.contact); 
        }},
        {label: T.cDone, act: function() { 
          me(T.thanksMe); 
          bot(T.thanksBot, menu); 
        }}
      ]); 
    });
  }

  function openWA() { 
    var T = t(); 
    window.open(waLink(), "_blank", "noopener"); 
    bot(T.waBot, menu); 
  }

  function faqMenu() { 
    var T = t(); 
    me(T.mFaq);
    bot(T.faqIntro, function() {
      var list = T.faq.map(function(f) { 
        return {label: f.q, act: function() { 
          me(f.q); 
          bot(f.a, faqMore); 
        }}; 
      });
      list.push({label: T.faqHuman, wa: true, act: function() { 
        me(T.faqHuman); 
        openWA(); 
      }});
      chips(list);
    });
  }

  function faqMore() { 
    var T = t(); 
    chips([
      {label: T.faqOther, act: faqMenu},
      {label: T.mDevis, act: devisStart},
      {label: T.cWa, wa: true, act: openWA}
    ]); 
  }

  /* ---------- Saisie libre ---------- */
  form.addEventListener("submit", function(e) { 
    e.preventDefault(); 
    var v = input.value.trim(); 
    if (!v) return; 
    input.value = ""; 
    me(v); 
    var T = t();

    if (ask === "nom") { 
      lead.nom = v; 
      ask = null; 
      return askContact(); 
    }

    if (ask === "contact") { 
      var ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) || /[+0-9][0-9 ().\-]{6,}/.test(v); 
      lead.contact = v; 
      ask = null;
      if (!ok) return bot(T.dInvalid, function() { ask = "contact"; }); 
      return finish(); 
    }

    route(v.toLowerCase(), v);
  });

  function route(s, original) { 
    var T = t();

    // Intents rapides (menus/actions dynamiques)
    if (/devis|quote|prix|tarif|price|co[uû]t|estimat|offre/.test(s)) return devisStart();
    if (/whatsapp|appel|t[ée]l[ée]phone|phone|call|joindre/.test(s)) return openWA();
    if (/bonjour|salut|hello|hi|bonsoir|hey/.test(s)) return bot(T.hi, menu);
    if (/service|domaine|expertise|field|domain/.test(s)) return services();
    if (/faq|question|aide|help/.test(s)) return faqMenu();

    // Sinon : RAG local + fallback LLM cloud
    askAssistant(original || s);
  }

  /* ---------- Assistant v2.0 : LLM cloud PRIORITAIRE quand configuré ---------- */
  function askAssistant(query) {
    var T = t();

    console.log("[DYG Chat] askAssistant:", query, "| LLM endpoint:", CFG.llmEndpoint);

    // 1) LLM cloud disponible → toujours prioritaire (avec contexte KB)
    if (CFG.llmEndpoint) {
      var ctx = (window.DYG_KB && window.DYG_KB.isReady())
        ? window.DYG_KB.getContext(query, 1500)
        : "";

      console.log("[DYG Chat] → LLM avec contexte:", ctx.length, "chars");
      return callLLM(query, ctx);
    }

    // 2) Fallback KB local si LLM absent
    var hits = (window.DYG_KB && window.DYG_KB.isReady()) ? window.DYG_KB.search(query, {topK: 5, minScore: 0.5}) : [];

    if (hits.length && hits[0].score >= 1.5) {
      console.log("[DYG Chat] → KB local (score:", hits[0].score, ")");
      return bot(formatKbAnswer(hits[0].doc, hits), faqMore);
    }

    // 3) Menu par défaut
    console.log("[DYG Chat] → menu fallback");
    bot(T.fallback, menu);
  }

  function formatKbAnswer(top, hits) {
    var lines = [top.text];

    // Suggestions si autres résultats pertinents
    if (hits.length > 1) {
      var more = hits.slice(1, 3).map(function(h) { 
        return "• " + h.doc.title; 
      }).join("<br>");
      lines.push("<br><small style='opacity:.7'>Liens utiles :<br>" + more + "</small>");
    }

    return lines.join("");
  }

  function callLLM(query, context) {
    var T = t(), ty = typing();

    var body = {
      query: query,
      context: context,
      lang: getLang(),
      history: [] // à alimenter si nécessaire
    };

    fetch(CFG.llmEndpoint, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(body)
    })
    .then(function(r) { return r.json(); })
    .then(function(j) {
      ty.remove();
      var answer = j && j.answer ? j.answer : T.fallback;
      var row = el('div', {class: "dc-row bot"});
      row.innerHTML = '<div class="dc-b">' + answer.replace(/\n/g, '<br>') + '</div>';
      log.appendChild(row); 
      scroll();
      faqMore();
    })
    .catch(function() {
      ty.remove();
      bot(T.fallback, menu);
    });
  }

  /* ---------- Ouverture / fermeture ---------- */
  var started = false;

  function applyStatic() { 
    var T = t();
    document.getElementById("dc-fabtx").textContent = T.fab;
    document.getElementById("dc-status").textContent = T.status;
    document.getElementById("dc-foot").textContent = T.foot;
    input.setAttribute("placeholder", T.ph);
  }

  function open() { 
    panel.classList.add("open"); 
    fab.classList.add("hide"); 
    hideNudge();

    if (!started) { 
      started = true; 
      greet(); 
    }

    setTimeout(function() { 
      if (window.innerWidth > 600) input.focus(); 
    }, 300);
  }

  function close() { 
    panel.classList.remove("open"); 
    fab.classList.remove("hide"); 
  }

  fab.onclick = open; 
  panel.querySelector(".dc-close").onclick = close;

  window.addEventListener("keydown", function(e) { 
    if (e.key === "Escape") close(); 
  });

  function greet() { 
    var T = t(); 
    bot(T.g1, function() { 
      bot(pageHook() || T.gGen, menu); 
    }); 
  }

  function pageHook() { 
    var sec = currentSection(); 
    return sec ? (t().hooks[sec] || null) : null; 
  }

  function currentSection() { 
    var ids = ["contact", "faq", "expertise", "projects", "portfolio", "domaines"];

    for (var i = 0; i < ids.length; i++) { 
      var el2 = document.getElementById(ids[i]); 
      if (!el2) continue;

      var r = el2.getBoundingClientRect(); 
      if (r.top < window.innerHeight * 0.6 && r.bottom > window.innerHeight * 0.4) return ids[i]; 
    }

    return null;
  }

  function showNudge() { 
    if (panel.classList.contains("open") || sessionStorage.getItem("dc_nudged")) return;

    var msg = pageHook() || t().nudge; 
    nudge.innerHTML = '<button class="dc-x" aria-label="x">×</button>' + msg;

    nudge.classList.add("show"); 
    sessionStorage.setItem("dc_nudged", "1");

    nudge.querySelector(".dc-x").onclick = function(e) { 
      e.stopPropagation(); 
      hideNudge(); 
    }; 
    nudge.onclick = open;

    setTimeout(hideNudge, 12000);
  }

  function hideNudge() { 
    nudge.classList.remove("show"); 
  }

  /* ---------- Réaction au changement de langue ---------- */
  window.addEventListener("dyg:langchange", function() {
    setTimeout(applyStatic, 30);
  });

  // Écouter les boutons de langue
  document.querySelectorAll(".lang-btn").forEach(function(b) {
    b.addEventListener("click", function() { 
      setTimeout(applyStatic, 30); 
    });
  });

  applyStatic();
  setTimeout(showNudge, 9000);

  /* ---------- API Publique ---------- */
  window.DYG_CHAT = {
    open: open,
    close: close,
    sendMessage: function(msg) {
      if (!started) open();
      input.value = msg;
      form.dispatchEvent(new Event('submit'));
    },
    getLeads: function() {
      try {
        return JSON.parse(localStorage.getItem("dyg_leads") || "[]");
      } catch(e) {
        return [];
      }
    }
  };

  console.log("[DYG Chat] ✅ Chatbot chargé avec succès");

})();
