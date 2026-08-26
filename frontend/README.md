# 🏗️ Site Web DYG-BTP - Documentation Complète

## 📋 Vue d'ensemble

Site web mono-page premium pour **DYG-BTP** (Ingénieurs Conseils en Génie Civil), avec fonctionnalités avancées d'acquisition de leads et conformité RGPD.

### ✨ Caractéristiques principales

- ✅ **Design premium** : Effets glass, animations reveal, curseur custom
- ✅ **Bilingue FR/EN** : Système de traduction complet
- ✅ **Mono-page** : Navigation fluide avec smooth scroll
- ✅ **Chatbot conversationnel** : Assistant IA pour capture de leads
- ✅ **Moteur RAG** : Recherche intelligente dans base de connaissances (BM25)
- ✅ **RGPD-compliant** : Système de cookies premium avec personnalisation
- ✅ **Google Analytics GA4** : Tracking conditionnel (avec consentement)
- ✅ **SEO optimisé** : Meta tags, Open Graph, JSON-LD schema
- ✅ **Responsive** : Design adaptatif mobile/tablet/desktop
- ✅ **Performances** : CSS optimisé, animations GPU-accelerated
- ✅ **Accessibilité** : ARIA labels, contraste, navigation clavier

---

## 📁 Structure du projet

```
dyg-BTP/
├── dyg1.html              # Page principale (mono-page)
├── dyg.css                # Styles principaux (3800+ lignes)
├── dyg.js                 # Traductions + interactions
├── chatbot.js             # Assistant conversationnel IA
├── cookies.js             # Gestion consentement RGPD (premium)
├── analytics.js           # Google Analytics GA4
├── kb-search.js           # Moteur de recherche RAG (BM25)
├── site.webmanifest       # PWA manifest
│
├── data/
│   └── dyg-kb.json        # Base de connaissances (RAG)
│
├── test-chatbot.html      # Interface test chatbot
├── test-analytics.html    # Interface test analytics
│
└── Documentation/
    ├── README.md              # Ce fichier
    ├── README-CHATBOT.md      # Doc complète chatbot
    ├── README-ANALYTICS.md    # Doc complète analytics + RGPD
    └── README-RAG.md          # Doc complète moteur RAG
```

---

## 🚀 Démarrage rapide (5 minutes)

### 1️⃣ Configuration Google Analytics

Ouvrez **`analytics.js`** ligne 12 :
```javascript
var ID = "G-XXXXXXXXXX"; // Remplacez par votre ID GA4
```

### 2️⃣ Configuration WhatsApp (chatbot)

Ouvrez **`chatbot.js`** ligne 12 :
```javascript
wa: "22812345678", // Votre numéro international (sans + ni espaces)
```

### 3️⃣ Personnalisation

- **Informations entreprise** : `chatbot.js` (CFG)
- **Traductions** : `dyg.js` (translations object)
- **Couleurs** : `dyg.css` (:root variables)

### 4️⃣ Tester

1. Ouvrez **`dyg1.html`** dans votre navigateur
2. Testez le chatbot : **`test-chatbot.html`**
3. Testez les cookies : **`test-analytics.html`**

---

## 🎨 Sections du site

### 1. Navigation (Header)
- Logo + liens de navigation
- Sélecteur de langue FR/EN
- Bouton CTA "Demander un devis"
- Fixed au scroll

### 2. Hero Section (#accueil)
- Titre accrocheur avec span coloré
- Sous-titre descriptif
- 3 badges (ISO, Agréé État, Expérience)
- 2 CTA buttons
- Grille d'images (2 colonnes)

### 3. Stats Section
- 3 statistiques clés avec animations reveal
- Années d'expérience / Projets / Agréments

### 4. About Section (#apropos)
- Grille 2 colonnes (images + contenu)
- Certifications ISO 9001:2015
- Badges de confiance

### 5. Domaines Section (#domaines)
- 3 cartes domaines avec effets hover
- Bâtiments / Routes / Topographie
- Images + descriptions détaillées

### 6. Services Section (#services)
- 6 cartes services avec icônes
- Grid responsive 3 colonnes
- Hover effects premium

### 7. Expertise Section (#expertise) - Inline
- 3 cartes certifications État
- N° agréments officiels
- Design premium avec effets glass

### 8. Team Section (#equipe)
- 4 membres d'équipe
- Photos + noms + rôles
- Bouton "Voir toute l'équipe"

### 9. Projects Section (#projets)
- Galerie 3 colonnes
- Overlay avec catégorie + titre
- Images avec zoom hover

### 10. FAQ Section (#faq)
- Layout 2 colonnes (aside + liste)
- Accordion interactif
- 7 questions fréquentes
- Sticky sidebar

### 11. Contact Section (#contact)
- Grid 2 colonnes (infos + formulaire)
- 4 blocs d'infos avec effet glass
- Formulaire complet avec validation
- Google Maps intégration

### 12. Career CTA (#carriere)
- Call-to-action carrière
- Fond gradient avec effet glass
- Bouton vers page recrutement

### 13. Footer
- Grid 4 colonnes (marque + liens)
- Réseaux sociaux
- Copyright + mentions légales
- Lien "Gérer les cookies"
- Bouton scroll to top

---

## 💬 Chatbot Conversationnel

### Fonctionnalités

- **Bilingue FR/EN** automatique
- **Parcours devis guidé** (4 étapes - 30 secondes)
- **FAQ intelligente** (5 questions + "Parler à un humain")
- **Intégration WhatsApp** avec contexte pré-rempli
- **Capture de leads** (localStorage + API optionnelle)
- **Support LLM cloud** (Cloudflare Workers - optionnel)
- **RAG local** (base de connaissances - optionnel)
- **Hooks contextuels** (messages adaptés par page)

### Utilisation

```javascript
// Ouvrir le chatbot
window.DYG_CHAT.open();

// Envoyer un message
window.DYG_CHAT.sendMessage("Je veux un devis");

// Récupérer les leads
var leads = window.DYG_CHAT.getLeads();
```

📖 **Documentation complète** : `README-CHATBOT.md`

---

## 🍪 Système de Cookies RGPD (Premium)

### Fonctionnalités

- **3 options claires** : Accepter / Refuser / Personnaliser
- **Pas de dark pattern** : choix équitables
- **Bilingue FR/EN** automatique
- **Design premium** : icône SVG, animations fluides
- **localStorage** (pas de cookies HTTP tiers)
- **Réouverture** : Lien "Gérer les cookies" dans footer

### Types de cookies

1. **Nécessaires** : Toujours actifs (fonctionnement du site)
2. **Mesure d'audience** : Google Analytics (optionnel, avec consentement)

### Utilisation

```javascript
// Accepter
window.DYG_COOKIES.accept();

// Refuser
window.DYG_COOKIES.refuse();

// Ouvrir préférences
window.DYG_openCookiePrefs();

// Obtenir consentement
var consent = window.DYG_COOKIES.getConsent();
```

📖 **Documentation complète** : `README-ANALYTICS.md`

---

## 🔍 Moteur de Recherche RAG (BM25)

### Vue d'ensemble

Moteur de recherche local permettant au chatbot de répondre intelligemment aux questions en interrogeant une base de connaissances structurée.

### Fonctionnalités

- **Algorithme BM25** : Scoring de pertinence TF-IDF amélioré
- **Index inversé** : Recherche rapide sur milliers de documents
- **Tokenization intelligente** : Normalisation, stop words FR/EN
- **Synonymes** : Expansion automatique (ex: "devis" → "tarif", "prix")
- **Bilingue** : Support français et anglais
- **API simple** : `search()` et `getContext()` prêts à l'emploi

### Base de connaissances (`data/dyg-kb.json`)

Structure JSON contenant :
- Identité entreprise
- Certification ISO 9001:2015
- Agréments d'État
- Domaines d'expertise (Bâtiments, Routes, Topographie)
- Services (S1-S6)
- Valeurs (Excellence, Expertise, Fiabilité)
- Politique qualité
- Zones d'intervention
- Références projets
- FAQ (7 questions)
- Synonymes (10+ catégories)

### Utilisation

```javascript
// Rechercher
const results = window.DYG_KB.search("certification iso", {
  topK: 5,       // Max 5 résultats
  minScore: 0.5  // Score minimum
});

// Obtenir contexte pour LLM
const context = window.DYG_KB.getContext("vos domaines", 800);

// Vérifier chargement
if (window.DYG_KB.isReady()) {
  console.log("✅ KB prête");
}

// Statistiques
window.DYG_KB.stats(); // { docs: 42, terms: 387 }
```

📖 **Documentation complète** : `README-RAG.md`

---

## 🎨 Design System

### Palette de couleurs

```css
:root {
  /* Couleurs principales */
  --primary-color: #1a1a1a;      /* Noir profond */
  --secondary-color: #2c5f7f;    /* Bleu acier */
  --accent-color: #d4af37;       /* Or */
  
  /* Palette INGER premium */
  --ink: #15171C;                /* Noir profond */
  --paper: #E8E9EA;              /* Béton clair */
  --steel: #8FB9CE;              /* Bleu acier */
  
  /* Effets Glass */
  --glass-bg: rgba(232, 233, 234, 0.3);
  --glass-border: rgba(143, 185, 206, 0.15);
  --glass-blur: blur(12px);
  
  /* Utilitaires */
  --light-gray: #f5f5f5;
  --text-color: #333;
  --white: #ffffff;
}
```

### Typographie

- **Body** : Segoe UI, Tahoma (sans-serif)
- **Titres** : Héritée + font-weight variations
- **Mono** : JetBrains Mono (chatbot, buttons)

### Animations

- **Reveal** : Fade-in + translateY (IntersectionObserver)
- **Hover** : Scale, translateY, shadow
- **Curseur custom** : Dot + ring avec lerp smoothing
- **Ease** : `cubic-bezier(0.23, 1, 0.32, 1)`

---

## 🌐 Système de traduction FR/EN

### Fichiers concernés

- **`dyg.js`** : Traductions du site principal
- **`chatbot.js`** : Traductions du chatbot
- **`cookies.js`** : Traductions du banner cookies

### Fonctionnement

```javascript
// Changer la langue
function setLanguage(lang) {
  localStorage.setItem("dyg_lang", lang);
  // Le système applique automatiquement les traductions
}

// Boutons de langue
<button class="lang-btn" data-lang="fr">FR</button>
<button class="lang-btn" data-lang="en">EN</button>
```

### Ajouter une traduction

Dans **`dyg.js`** :
```javascript
const translations = {
  fr: {
    nouveauTexte: "Texte en français",
    // ...
  },
  en: {
    nouveauTexte: "Text in English",
    // ...
  }
};
```

---

## 📊 SEO & Performance

### Meta Tags

- ✅ Title, description, keywords
- ✅ Open Graph (Facebook)
- ✅ Twitter Cards
- ✅ JSON-LD Schema (Organization, WebSite, Services)
- ✅ Canonical URL
- ✅ Multilingual (hreflang)

### Performance

- ✅ CSS optimisé (variables, min/max, clamp)
- ✅ Animations GPU (transform, opacity)
- ✅ Lazy loading images (loading="lazy")
- ✅ Preconnect aux ressources externes
- ✅ Font loading optimisé

### Accessibilité

- ✅ ARIA labels sur éléments interactifs
- ✅ Navigation clavier (Tab, Escape)
- ✅ Contraste couleurs (WCAG AA)
- ✅ Focus visible
- ✅ Alt texts sur images

---

## 🔧 API JavaScript publiques

### Chatbot

```javascript
window.DYG_CHAT = {
  open: function() { },
  close: function() { },
  sendMessage: function(msg) { },
  getLeads: function() { }
};
```

### Cookies

```javascript
window.DYG_COOKIES = {
  accept: function() { },
  refuse: function() { },
  reset: function() { },
  getConsent: function() { },
  openPrefs: function() { }
};

window.DYG_openCookiePrefs(); // Alias
```

### Événements

```javascript
// Consentement cookies
window.addEventListener('dyg:consent', function(e) {
  console.log('Consentement:', e.detail);
});

// Changement de langue
window.addEventListener('dyg:langchange', function() {
  console.log('Langue changée');
});

// Lead capturé (chatbot)
window.DYG_CHAT_ON_LEAD = function(lead) {
  console.log('Nouveau lead:', lead);
};
```

---

## 🐛 Dépannage

### Le chatbot ne s'affiche pas

1. Vérifiez `console.log` : `[DYG Chat] ✅ Chatbot chargé`
2. Vérifiez l'ordre des scripts dans `dyg1.html`
3. Testez avec `test-chatbot.html`

### Le banner cookies ne s'affiche pas

1. Effacez localStorage : `localStorage.removeItem('dyg_cookie_consent')`
2. Rechargez la page
3. Le banner doit apparaître après 0.9 seconde

### Google Analytics ne track pas

1. Vérifiez votre ID GA4 dans `analytics.js`
2. Acceptez les cookies
3. Ouvrez Network tab (F12) : cherchez `collect?v=2`
4. Vérifiez dans GA4 Temps réel (délai 24-48h pour rapports)

### Les traductions ne fonctionnent pas

1. Vérifiez `localStorage.getItem('dyg_lang')`
2. Boutons doivent avoir classe `.lang-btn`
3. Rechargez après changement de langue

---

## 📱 Responsive Breakpoints

```css
/* Mobile */
@media (max-width: 600px) { }

/* Tablet */
@media (max-width: 768px) { }

/* Desktop small */
@media (max-width: 1024px) { }

/* Desktop large */
@media (min-width: 1200px) { }
```

---

## 🔐 Sécurité & Privacy

- ✅ Pas de cookies tiers (sauf GA4 après consentement)
- ✅ localStorage pour préférences (côté client)
- ✅ Anonymisation IP activée (GA4)
- ✅ Consentement explicite avant tracking
- ✅ Option de révocation à tout moment
- ✅ Conformité RGPD (CNIL)

---

## 📞 Support & Maintenance

### Configuration requise

- **Navigateurs** : Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- **Mobile** : iOS 14+, Android 9+
- **Serveur** : Apache/Nginx (fichiers statiques)

### Logs de debug

Ouvrez la console (F12) et cherchez :
- `[DYG Chat]` - Chatbot
- `[DYG Cookies]` - Système de cookies
- `[DYG Analytics]` - Google Analytics

### Mises à jour

1. **Chatbot** : `chatbot.js` (config, textes)
2. **Cookies** : `cookies.js` (textes, types)
3. **Analytics** : `analytics.js` (ID GA4)
4. **Site** : `dyg.js` (traductions), `dyg.css` (styles)

---

## 📄 Licence

© 2024 DYG-BTP — Ingénieurs Conseils. Tous droits réservés.

Site développé avec les technologies premium INGER, adapté pour DYG-BTP.

---

## 🎯 Prochaines étapes recommandées

1. ✅ **Configurer GA4** : Remplacer l'ID dans `analytics.js`
2. ✅ **Configurer WhatsApp** : Remplacer le numéro dans `chatbot.js`
3. ⏳ **Créer page Politique de confidentialité** : Lien dans banner cookies
4. ⏳ **Ajouter vraies photos** : Remplacer placeholder images
5. ⏳ **Configurer email form** : Backend pour formulaire contact
6. ⏳ **Optimiser images** : WebP, compression, lazy loading
7. ⏳ **Tester accessibilité** : WAVE, Lighthouse
8. ⏳ **Déploiement** : Hébergement + domaine + SSL

---

**Besoin d'aide ?** Consultez les README spécifiques :
- 💬 Chatbot : `README-CHATBOT.md`
- 🍪 Analytics : `README-ANALYTICS.md`
