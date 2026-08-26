# 💬 Chatbot Conversationnel Premium - DYG-BTP

## 🎯 Vue d'ensemble

Chatbot intelligent bilingue (FR/EN) pour l'acquisition de leads et le support client automatisé.

### ✅ Fonctionnalités principales

- ✓ **Bilingue FR/EN** : Suit automatiquement la langue du site
- ✓ **Devis guidé** : Parcours conversationnel en 4 étapes (30 secondes)
- ✓ **FAQ intelligente** : Réponses instantanées aux questions fréquentes
- ✓ **Intégration WhatsApp** : Transfert fluide vers WhatsApp avec contexte
- ✓ **Support LLM cloud** : Réponses intelligentes via API externe (optionnel)
- ✓ **RAG local** : Base de connaissances locale (si intégrée)
- ✓ **Hooks contextuels** : Messages adaptés selon la page visitée
- ✓ **Capture de leads** : Stockage local + envoi API (optionnel)
- ✓ **Responsive** : S'adapte mobile/desktop
- ✓ **Animations fluides** : UX premium avec transitions douces

---

## 🚀 Installation rapide (2 étapes)

### Étape 1 : Configurer le numéro WhatsApp

Ouvrez **`chatbot.js`** ligne 12 et remplacez :

```javascript
wa: "1234567890", // TODO: Remplacer par votre vrai numéro WhatsApp
```

Par votre numéro au format international (sans + ni espaces) :

```javascript
wa: "22812345678", // Exemple: +228 12 34 56 78 → 22812345678
```

### Étape 2 : Intégrer dans le HTML

Ajoutez le script **avant la fermeture du `</body>`** dans **`dyg1.html`** :

```html
<!-- Chatbot conversationnel -->
<script src="chatbot.js"></script>
</body>
</html>
```

C'est tout! Le chatbot s'affiche automatiquement avec un FAB en bas à droite.

---

## 📂 Architecture du chatbot

```
chatbot.js
├── Configuration (CFG)
│   ├── name: "Euloge"          # Nom de l'assistant
│   ├── org: "DYG-BTP"           # Nom de l'organisation
│   ├── wa: "1234567890"         # Numéro WhatsApp
│   ├── tel/mail                 # Coordonnées
│   └── endpoints                # API externes (optionnel)
│
├── Textes bilingues (S.fr / S.en)
│   ├── Messages de salutation
│   ├── FAQ (5 questions)
│   ├── Parcours devis (4 étapes)
│   └── Hooks contextuels (6 sections)
│
├── Interface (DOM + CSS injecté)
│   ├── FAB (bouton flottant)
│   ├── Panel (fenêtre de chat)
│   ├── Nudge (bulle contextuelle)
│   └── Messages (bot + utilisateur)
│
├── Scénarios conversationnels
│   ├── menu() - Menu principal
│   ├── services() - Découverte des domaines
│   ├── devisStart() - Demande de devis guidée
│   ├── faqMenu() - Questions fréquentes
│   └── openWA() - Transfert WhatsApp
│
└── Intelligence (optionnel)
    ├── RAG local (window.DYG_KB)
    ├── LLM cloud (CFG.llmEndpoint)
    └── Intent recognition (regex simple)

---

## 🎨 Personnalisation

### 1. Modifier les informations de base

Dans **`chatbot.js`**, section `CFG` :

```javascript
var CFG = {
  name: "Votre Prénom",        // Nom de l'assistant
  org: "Votre Entreprise",     // Nom de l'organisation
  wa: "22812345678",           // Numéro WhatsApp (format international)
  tel: "+228 12 34 56 78",     // Téléphone d'affichage
  mail: "contact@votresite.com",
  endpoint: null,              // URL API pour leads (optionnel)
  llmEndpoint: null,           // URL API LLM (optionnel)
  delay: 520                   // Délai typing animation (ms)
};
```

### 2. Personnaliser les textes

Éditez la section **`var S = { fr: {...}, en: {...} }`** :

**Français (S.fr) :**
```javascript
fr: {
  g1: "Bonjour 👋 Je suis <b>Votre Nom</b>...",
  gGen: "Votre description d'entreprise...",
  // ... autres textes
}
```

**Anglais (S.en) :**
```javascript
en: {
  g1: "Hello 👋 I'm <b>Your Name</b>...",
  gGen: "Your company description...",
  // ... autres textes
}
```

### 3. Ajouter/modifier la FAQ

Dans **`S.fr.faq`** et **`S.en.faq`** :

```javascript
faq: [
  {
    q: "Votre question ?",
    a: "Votre réponse détaillée..."
  },
  {
    q: "Autre question ?",
    a: "Autre réponse..."
  }
  // Ajoutez autant de questions que nécessaire
]
```

### 4. Personnaliser les domaines/services

Dans **`S.fr.svc`** et **`S.en.svc`** :

```javascript
svc: {
  domaine1: {
    name: "Nom du domaine",
    desc: "Description détaillée du domaine d'expertise..."
  },
  domaine2: {
    name: "Autre domaine",
    desc: "Description..."
  }
}
```

**Important :** Mettez à jour aussi la fonction **`services()`** :

```javascript
function services() { 
  var T = t(); 
  me(T.mServices);
  bot(T.svcIntro, function() { 
    chips([
      {label: T.svc.domaine1.name, act: function() { svc("domaine1"); }},
      {label: T.svc.domaine2.name, act: function() { svc("domaine2"); }},
      // Ajoutez vos domaines ici
    ]); 
  });
}
```

### 5. Modifier les couleurs (CSS)

Le chatbot utilise les variables CSS du site. Dans **`dyg.css`** :

```css
:root {
  --primary-color: #1a1a1a;      /* Couleur principale (header, bouton envoyer) */
  --secondary-color: #2c5f7f;    /* Couleur secondaire (messages utilisateur) */
  --white: #ffffff;              /* Blanc */
  --paper: #f5f5f5;              /* Fond clair */
}
```

---

## 🔧 Fonctionnalités avancées

### 1. Capture de leads

Les leads sont automatiquement :
- ✅ **Stockés dans localStorage** : `dyg_leads` (array JSON)
- ✅ **Envoyés à une API** : Si `CFG.endpoint` est configuré
- ✅ **Accessibles via callback** : Hook `window.DYG_CHAT_ON_LEAD`

**Configurer l'envoi API :**

```javascript
var CFG = {
  // ...
  endpoint: "https://votre-api.com/leads", // URL de votre API
};
```

**Écouter les leads en temps réel :**

```javascript
window.DYG_CHAT_ON_LEAD = function(lead) {
  console.log("Nouveau lead :", lead);
  // lead = { type, besoin, nom, contact, ts, page, lang }
};
```

**Récupérer tous les leads :**

```javascript
var allLeads = window.DYG_CHAT.getLeads();
console.log("Tous les leads :", allLeads);
```

### 2. Intégration LLM (Intelligence artificielle)

Pour des réponses intelligentes via un modèle de langage :

```javascript
var CFG = {
  // ...
  llmEndpoint: "https://votre-worker.workers.dev/chat",
};
```

Le chatbot enverra :
```json
{
  "query": "Question de l'utilisateur",
  "context": "Contexte de la base de connaissances (si disponible)",
  "lang": "fr",
  "history": []
}
```

Et attend :
```json
{
  "answer": "Réponse générée par l'IA"
}
```

### 3. Base de connaissances locale (RAG)

Si vous avez une base de connaissances **`window.DYG_KB`** :

```javascript
window.DYG_KB = {
  isReady: function() { return true; },
  search: function(query, options) {
    // Retourne [{doc: {title, text}, score: 2.5}, ...]
  },
  getContext: function(query, maxChars) {
    // Retourne le contexte pour le LLM
  }
};
```

Le chatbot l'utilisera automatiquement.

### 4. Hooks contextuels (messages adaptés)

Les **hooks** affichent des messages différents selon la page visitée :

```javascript
hooks: {
  domaines: "Message quand l'utilisateur est sur #domaines",
  projects: "Message pour la section projets",
  expertise: "Message pour la page expertise",
  // ...
}
```

**Sections détectées :**
- `contact`
- `faq`
- `expertise`
- `projects`
- `portfolio`
- `domaines`

Pour ajouter une section, modifiez **`currentSection()`** :

```javascript
function currentSection() { 
  var ids = ["contact", "faq", "votre-section", ...];
  // ...
}
```

---

## 📱 API JavaScript publique

```javascript
// Ouvrir le chatbot
window.DYG_CHAT.open();

// Fermer le chatbot
window.DYG_CHAT.close();

// Envoyer un message programmatiquement
window.DYG_CHAT.sendMessage("Bonjour, j'ai une question");

// Récupérer tous les leads capturés
var leads = window.DYG_CHAT.getLeads();
```

**Exemple d'utilisation :**

```html
<!-- Bouton personnalisé pour ouvrir le chat -->
<button onclick="window.DYG_CHAT.open()">
  Parler à un conseiller
</button>

<!-- Ouvrir avec un message pré-rempli -->
<button onclick="window.DYG_CHAT.sendMessage('Je veux un devis pour un bâtiment')">
  Demander un devis bâtiment
</button>
```

---

## 🎯 Parcours utilisateur

### 1. Menu principal (4 options)

```
┌─────────────────────────────────┐
│ 👋 Bonjour, je suis Euloge      │
│ Comment puis-je vous aider ?    │
├─────────────────────────────────┤
│ [Découvrir nos services]        │
│ [Demander un devis]             │
│ [Questions fréquentes]          │
│ [Parler sur WhatsApp]           │
└─────────────────────────────────┘
```

### 2. Découverte des services

```
┌─────────────────────────────────┐
│ Nous intervenons sur 3 domaines │
├─────────────────────────────────┤
│ [Bâtiments & Construction]      │
│ [Infrastructures routières]     │
│ [Topographie]                   │
└─────────────────────────────────┘
```

### 3. Devis guidé (4 étapes - 30 secondes)

**Étape 1 - Type de projet :**
```
Quel est le type de projet ?
[Bâtiment] [Route] [Topographie] [Autre]
```

**Étape 2 - Besoin :**
```
Et votre besoin principal ?
[Étude] [Contrôle] [Conseil] [Je ne sais pas]
```

**Étape 3 - Nom :**
```
À quel nom dois-je préparer la demande ?
> [Saisie libre]
```

**Étape 4 - Contact :**
```
Laissez-moi votre e-mail ou téléphone
> [Saisie libre avec validation]
```

**Confirmation :**
```
C'est noté ✅ Votre demande est transmise
[Ouvrir WhatsApp] [Envoyer un e-mail] [Terminer]
```

### 4. FAQ

```
┌─────────────────────────────────┐
│ Questions fréquentes :          │
├─────────────────────────────────┤
│ [Quels types de projets ?]      │
│ [Vos qualifications ?]          │
│ [Intervenez-vous hors région ?] │
│ [Comment obtenir un devis ?]    │
│ [Parler à un humain]            │
└─────────────────────────────────┘
```

---

## 📊 Données collectées (leads)

Format du lead stocké :

```json
{
  "type": "Bâtiment",
  "besoin": "Étude",
  "nom": "Jean Dupont",
  "contact": "jean@example.com",
  "ts": 1704067200000,
  "page": "/index.html#domaines",
  "lang": "fr"
}
```

**Accès aux données :**

```javascript
// Dans la console du navigateur
localStorage.getItem("dyg_leads");

// Ou via l'API
window.DYG_CHAT.getLeads();
```

---

## 🐛 Dépannage

### Le chatbot ne s'affiche pas

1. Vérifiez que **`chatbot.js`** est bien chargé
2. Ouvrez la console (F12) et cherchez `[DYG Chat] ✅ Chatbot chargé`
3. Vérifiez qu'il n'y a pas de conflits CSS avec d'autres éléments

### WhatsApp ne s'ouvre pas

1. Vérifiez le numéro dans `CFG.wa` (format international sans + ni espaces)
2. Format correct : `22812345678` (pas `+228 12 34 56 78`)
3. Testez le lien manuellement : `https://wa.me/22812345678`

### Le chatbot ne suit pas la langue

1. Vérifiez que vos boutons de langue ont la classe `.lang-btn`
2. Le chatbot écoute les clics sur ces boutons
3. La langue est stockée dans `localStorage` sous `dyg_lang`

### Les leads ne sont pas envoyés à l'API

1. Vérifiez que `CFG.endpoint` est bien configuré
2. Ouvrez la console Network (F12) pour voir les requêtes
3. Vérifiez que votre API accepte les requêtes POST avec JSON

---

## 🌐 Intégration multi-langue

Le chatbot suit automatiquement la langue du site. Pour forcer une langue :

```javascript
// Français
localStorage.setItem("dyg_lang", "fr");

// Anglais
localStorage.setItem("dyg_lang", "en");

// Recharger le chatbot
location.reload();
```

**Émettre un événement de changement de langue :**

```javascript
// Dans votre fonction de changement de langue
function setLanguage(lang) {
  localStorage.setItem("dyg_lang", lang);
  
  // Notifier le chatbot
  window.dispatchEvent(new Event("dyg:langchange"));
}
```

---

## 🎨 Design responsive

### Desktop (> 600px)
- FAB : 58x58px, en bas à droite
- Panel : 380x600px, animé
- Nudge : max-width 248px

### Mobile (≤ 600px)
- FAB : 52x52px, position ajustée (safe-area)
- Panel : Plein écran (88vh), border-radius en haut seulement
- Nudge : Adapté à la largeur

---

## 📞 Support & contribution

Pour toute question ou amélioration :

- **Email** : contact@dyg-btp.com
- **WhatsApp** : Configuré dans le chatbot

---

## 📄 Licence

Ce chatbot est fourni tel quel pour DYG-BTP. Adaptez-le selon vos besoins.

**Crédits :** Basé sur le système conversationnel INGER, adapté pour DYG-BTP.
