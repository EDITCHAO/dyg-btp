/* ============================================================
   DYG-BTP · Moteur de recherche RAG local (BM25 simplifié)
   Charge data/dyg-kb.json et indexe tout le contenu.
   API publique : window.DYG_KB.search(query, {topK, minScore})
                  window.DYG_KB.getContext(query, maxTokens)
   ============================================================ */

(function () {
  "use strict";

  if (window.DYG_KB) return;

  var STOP_FR = new Set(["le","la","les","un","une","des","de","du","à","au","aux","et","ou","est","sont","que","qui","dans","sur","pour","par","avec","sans","être","son","sa","ses","ce","cette","ces","nous","vous","ils","elles","je","tu","il","elle","on","mais","comme","plus","moins","très","tout","tous","toute","non","ne","pas","si","car","donc","alors"]);

  var STOP_EN = new Set(["the","a","an","of","to","and","or","is","are","was","were","that","which","in","on","for","by","with","at","as","be","but","not","this","these","those","i","you","he","she","we","they","it","its","have","has","had","do","does","did","will","would","should","can","could","if","because","so"]);

  function normalize(s) {
    return String(s || "")
      .toLowerCase()
      .normalize("NFD").replace(/[̀-ͯ]/g, "") // retire accents
      .replace(/['''`""«»]/g, " ")
      .replace(/[^\w\s]/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  }

  function tokenize(s) {
    return normalize(s)
      .split(" ")
      .filter(function (w) { return w.length > 1 && !STOP_FR.has(w) && !STOP_EN.has(w); });
  }

  // === Index BM25 simplifié ===
  var STATE = { docs: [], invIndex: {}, avgDocLen: 0, k1: 1.4, b: 0.75, loaded: false };

  function addDoc(doc) {
    // doc = { id, category, title, text, meta }
    var tokens = tokenize(doc.title + " " + doc.text + " " + (doc.tags || []).join(" "));
    var tf = {};

    tokens.forEach(function (t) { tf[t] = (tf[t] || 0) + 1; });

    doc._tokens = tokens;
    doc._tf = tf;
    doc._len = tokens.length;

    STATE.docs.push(doc);

    // Index inverse
    Object.keys(tf).forEach(function (t) {
      (STATE.invIndex[t] = STATE.invIndex[t] || []).push(STATE.docs.length - 1);
    });
  }

  function build() {
    STATE.avgDocLen = STATE.docs.reduce(function (a, d) { return a + d._len; }, 0) / Math.max(1, STATE.docs.length);
  }

  function idf(term) {
    var n = STATE.docs.length;
    var df = (STATE.invIndex[term] || []).length;
    if (df === 0) return 0;
    return Math.log((n - df + 0.5) / (df + 0.5) + 1);
  }

  function bm25Score(doc, queryTokens) {
    var score = 0;

    for (var i = 0; i < queryTokens.length; i++) {
      var t = queryTokens[i];
      var tf = doc._tf[t] || 0;
      if (tf === 0) continue;

      var termIdf = idf(t);
      var num = tf * (STATE.k1 + 1);
      var den = tf + STATE.k1 * (1 - STATE.b + STATE.b * doc._len / STATE.avgDocLen);
      score += termIdf * (num / den);
    }

    return score;
  }

  // === Chargement de la base de connaissances ===
  function loadKB() {
    return fetch("data/dyg-kb.json", { cache: "force-cache" })
      .then(function (r) { return r.json(); })
      .then(function (kb) {
        STATE.kb = kb;

        // Convertir chaque section en documents indexables

        // 1) Entité
        var e = kb.entity;
        addDoc({
          id: "entity",
          category: "identity",
          title: "DYG-BTP — identité",
          text: e.legalName + " · Créée en " + e.founded + " · " + e.yearsExperience + " ans d'expérience · " + e.projectsDelivered + "+ projets · Siège : " + e.headquarters.building + ", " + e.headquarters.street + ", " + e.headquarters.city + ", " + e.headquarters.country + ". Contacts : Fixe " + e.contacts.phone_fixed + ", Mobile " + e.contacts.phone_mobile + ", Email " + e.contacts.email_pro + ". Horaires : lun-ven " + e.hours.mon_fri + " · sam " + e.hours.sat + ".",
          tags: ["identité","entreprise","adresse","contact","société","siège","fondation"]
        });

        // 2) Certification ISO
        var c = kb.certification.iso9001;
        addDoc({
          id: "iso9001",
          category: "certification",
          title: "Certification " + c.referential,
          text: "DYG-BTP est certifié " + c.referential + ". Périmètre : " + c.scope_fr + ". Validité : du " + c.valid_from + " au " + c.valid_until + ".",
          tags: ["ISO","9001","certification","qualité","management"]
        });

        // 3) Agréments d'État
        var a = kb.accreditations_state;
        addDoc({
          id: "accreditations",
          category: "certification",
          title: "Agréments d'État",
          text: "DYG-BTP est agréé par l'État. Domaines : " + a.items.map(function(x){return x.domain+" (n° "+x.number+")";}).join(", ") + ". Base réglementaire : " + a.decree + ".",
          tags: ["agréments","État","autorisations"]
        });

        // 4) Domaines d'expertise
        kb.domains.forEach(function (d) {
          addDoc({
            id: "domain-" + d.id,
            category: "domain",
            title: d.name_fr,
            text: d.name_fr + " · " + d.subtitle_fr + ". Agrément n° " + d.accreditation + ". Expertise : " + d.expertise.join(" ; "),
            tags: [d.id, d.name_fr.toLowerCase()]
          });
        });

        // 5) Services
        kb.services.forEach(function (s) {
          addDoc({
            id: "svc-" + s.n,
            category: "service",
            title: "Service " + s.n + " : " + s.name,
            text: "Nous proposons le service « " + s.name + " » (référence " + s.n + ") dans le cadre de nos missions d'ingénierie conseil.",
            tags: ["service","prestation"]
          });
        });

        // 6) Valeurs
        kb.values.forEach(function (v) {
          addDoc({
            id: "value-" + v.name.toLowerCase(),
            category: "value",
            title: "Valeur · " + v.name,
            text: v.name + " — « " + v.punch + " » " + v.desc,
            tags: ["valeur","principe","vision"]
          });
        });

        // 7) Politique Qualité
        var q = kb.quality_policy;
        q.sections.forEach(function (s) {
          addDoc({
            id: "quality-" + s.n,
            category: "quality",
            title: "Politique Qualité · " + s.title,
            text: s.title + " : " + s.content + " Engagement : " + q.commitment,
            tags: ["qualité","politique","ISO"]
          });
        });

        // 8) Zones d'intervention
        var z = kb.zones;
        addDoc({
          id: "zones",
          category: "zones",
          title: "Zones d'intervention",
          text: "DYG-BTP intervient " + z.primary + ", dans " + z.sphere + " (" + z.regional.join(", ") + "), en " + z.extended + ". Clients : " + z.clients_types.join(", ") + ".",
          tags: ["zones","intervention","clients"]
        });

        // 9) Références projets
        Object.keys(kb.references).forEach(function (cat) {
          kb.references[cat].forEach(function (r) {
            addDoc({
              id: "ref-" + cat.replace(/\W/g,"") + "-" + r.n,
              category: "reference",
              title: r.title,
              text: r.title + " — Client : " + r.client + ". Catégorie : " + cat,
              tags: ["référence","projet","réalisation",cat.toLowerCase()]
            });
          });
        });

        // 10) FAQ
        kb.faq.forEach(function (f, idx) {
          addDoc({
            id: "faq-" + idx,
            category: "faq",
            title: f.q,
            text: f.q + " " + f.a,
            tags: f.tags || []
          });
        });

        build();
        STATE.loaded = true;

        try { 
          window.dispatchEvent(new CustomEvent("dyg:kb:loaded", { 
            detail: { docs: STATE.docs.length } 
          })); 
        } catch(e) {}

        console.log("[DYG KB] ✅ Base de connaissances chargée :", STATE.docs.length, "documents");
        return STATE.docs.length;
      })
      .catch(function (e) { 
        console.warn("[DYG KB] Échec chargement :", e); 
        STATE.loaded = false; 
      });
  }

  // === API publique ===
  function search(query, opts) {
    opts = opts || {};
    var topK = opts.topK || 5;
    var minScore = opts.minScore || 0.5;

    var qTokens = tokenize(query);
    if (!qTokens.length || !STATE.loaded) return [];

    // Injection synonymes (élargissement de requête)
    var syn = STATE.kb.keywords_synonyms || {};
    var expanded = qTokens.slice();

    qTokens.forEach(function (t) {
      Object.keys(syn).forEach(function (key) {
        var keyNorm = normalize(key);
        if (t === keyNorm || (syn[key] || []).some(function(v){return normalize(v)===t;})) {
          expanded.push(keyNorm);
          (syn[key] || []).forEach(function (v) { expanded.push(normalize(v)); });
        }
      });
    });

    expanded = Array.from(new Set(expanded));

    // Scorer chaque doc
    var candidates = new Set();
    expanded.forEach(function (t) { 
      (STATE.invIndex[t] || []).forEach(function (i) { candidates.add(i); }); 
    });

    var results = [];
    candidates.forEach(function (i) {
      var doc = STATE.docs[i];
      var s = bm25Score(doc, expanded);
      if (s >= minScore) results.push({ doc: doc, score: s });
    });

    results.sort(function (a, b) { return b.score - a.score; });
    return results.slice(0, topK);
  }

  function getContext(query, maxTokens) {
    maxTokens = maxTokens || 800;
    var hits = search(query, { topK: 5, minScore: 0.5 });

    if (!hits.length) return "";

    var out = [], total = 0;

    for (var i = 0; i < hits.length; i++) {
      var t = "### " + hits[i].doc.title + "\n" + hits[i].doc.text;
      var w = Math.ceil(t.length / 4); // ~4 chars par token

      if (total + w > maxTokens) break;

      out.push(t);
      total += w;
    }

    return out.join("\n\n");
  }

  window.DYG_KB = {
    load: loadKB,
    search: search,
    getContext: getContext,
    isReady: function () { return STATE.loaded; },
    stats: function () { 
      return { 
        docs: STATE.docs.length, 
        terms: Object.keys(STATE.invIndex).length 
      }; 
    }
  };

  // Auto-load
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", loadKB);
  else loadKB();

})();
