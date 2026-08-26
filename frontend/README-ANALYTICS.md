# 📊 Configuration Google Analytics GA4 + Cookies RGPD Premium pour DYG-BTP

## 🎯 Vue d'ensemble

Le site DYG-BTP intègre **Google Analytics 4 (GA4)** avec une gestion **premium** du consentement **RGPD** (Règlement Général sur la Protection des Données).

### ✅ Fonctionnalités

- ✓ Banner de consentement **avec 3 options** : Accepter / Refuser / Personnaliser
- ✓ **Pas de dark pattern** : choix équitable pour l'utilisateur
- ✓ Chargement conditionnel de GA4 (uniquement après consentement)
- ✓ Anonymisation des IP activée
- ✓ Stockage du consentement dans localStorage (pas de cookies tiers)
- ✓ Lien "Gérer les cookies" dans le footer pour modifier le choix
- ✓ **Bilingue FR/EN** : suit automatiquement la langue du site
- ✓ **Design premium** : animation fluide, icône SVG, interface moderne
- ✓ API JavaScript complète pour contrôle programmatique

---

## 🚀 Configuration rapide (3 étapes)

### Étape 1 : Créer une propriété Google Analytics

1. Allez sur [Google Analytics](https://analytics.google.com/)
2. Créez une nouvelle propriété GA4
3. Copiez votre **ID de mesure** (format : `G-XXXXXXXXXX`)

### Étape 2 : Configurer votre ID dans le code

Ouvrez le fichier **`analytics.js`** et remplacez :

```javascript
var ID = "G-XXXXXXXXXX"; // TODO: Remplacer par votre vrai ID GA4
```

Par votre ID réel, exemple :

```javascript
var ID = "G-ABC123XYZ4"; // Votre ID Google Analytics
```

### Étape 3 : Tester

1. Ouvrez votre site dans un navigateur
2. Le banner de cookies devrait apparaître après 1 seconde
3. Cliquez sur **"✓ Accepter"**
4. Ouvrez la console du navigateur (F12)
5. Vous devriez voir : `[DYG Analytics] ✅ Google Analytics chargé avec succès`

---

## 📂 Fichiers du système

```
dyg-BTP/
├── analytics.js        # Google Analytics GA4 avec consentement
├── cookies.js          # Banner RGPD et gestion du consentement
├── dyg.css            # Styles du banner (à la fin du fichier)
├── dyg.js             # Script principal du site
└── dyg1.html          # Page principale (scripts chargés dans l'ordre)
```

### Ordre de chargement des scripts (important !)

```html
<!-- 1. Gestion des cookies RGPD (doit être chargé en premier) -->
<script src="cookies.js"></script>

<!-- 2. Google Analytics GA4 (chargé si consentement) -->
<script src="analytics.js"></script>

<!-- 3. Script principal du site -->
<script src="dyg.js"></script>
```

---

## 🛠️ API JavaScript

### API Publique disponible

```javascript
// Accepter les cookies analytics (ferme le banner)
window.DYG_COOKIES.accept();

// Refuser les cookies analytics (ferme le banner)
window.DYG_COOKIES.refuse();

// Ouvrir les préférences (mode personnalisation)
window.DYG_openCookiePrefs();
// ou
window.DYG_COOKIES.openPrefs();

// Réinitialiser le consentement (efface le choix, réaffiche le banner au prochain chargement)
window.DYG_COOKIES.reset();

// Obtenir le consentement actuel
var consent = window.DYG_COOKIES.getConsent();
console.log(consent); 
// { necessary: true, analytics: true/false, ts: 1234567890 }
```

### État du consentement global

```javascript
// Vérifier si l'utilisateur a accepté les analytics
if (window.DYG_CONSENT && window.DYG_CONSENT.analytics) {
  console.log('Analytics activé');
}
```

### Écouter les changements de consentement

```javascript
window.addEventListener('dyg:consent', function(e) {
  console.log('Nouveau consentement:', e.detail);
  // e.detail = { analytics: true/false, timestamp: ... }
});
```

---

## 🎨 Personnalisation du banner

### Modifier les textes

Éditez le fichier **`cookies.js`**, section `createBanner()` :

```javascript
banner.innerHTML = `
  <div class="cookie-banner-content">
    <div class="cookie-banner-text">
      <h3>🍪 Votre titre personnalisé</h3>
      <p>Votre message personnalisé...</p>
    </div>
    ...
  </div>
`;
```

### Modifier les couleurs

Éditez le fichier **`dyg.css`**, section `COOKIE BANNER` :

```css
.cookie-banner {
    background: rgba(21, 23, 28, 0.98);  /* Couleur de fond */
    border-top: 2px solid var(--steel);  /* Bordure supérieure */
}

.cookie-btn-accept {
    background: var(--steel);  /* Couleur bouton Accepter */
}
```

---

## 🔒 Conformité RGPD

### Points respectés

✅ **Consentement actif** : L'utilisateur doit cliquer pour accepter
✅ **Option de refus** : Bouton "Refuser" clairement visible
✅ **Anonymisation IP** : Activée par défaut (`anonymize_ip: true`)
✅ **Durée de stockage** : 365 jours (modifiable dans `cookies.js`)
✅ **Révocation** : Lien "Gérer les cookies" dans le footer
✅ **Pas de chargement préalable** : GA4 n'est chargé qu'après consentement

### Cookie stocké

- **Nom** : `dyg_cookie_consent` (localStorage, pas de cookie HTTP)
- **Contenu** : `{"necessary":true,"analytics":true/false,"ts":1234567890}`
- **Durée** : Permanent (localStorage)
- **Type** : localStorage (côté client uniquement)

### 🎨 Parcours utilisateur

#### Option 1 : Accepter tout (1 clic)
```
Banner → [Accepter] → Analytics activé ✅
```

#### Option 2 : Refuser (1 clic)
```
Banner → [Refuser] → Analytics désactivé ❌
```

#### Option 3 : Personnaliser (2+ clics)
```
Banner → [Personnaliser] → 
  ┌─────────────────────────────┐
  │ ☑ Nécessaires (obligatoire) │
  │ ☐ Mesure d'audience         │
  └─────────────────────────────┘
  → [Enregistrer mes choix] → Choix appliqué
```

---

## 🎨 Interface du banner

### Design premium

- **Position** : Bas gauche (desktop), plein bas (mobile)
- **Taille** : 430px max-width, hauteur auto
- **Animations** : Fade-in + slide-up fluide (cubic-bezier ease)
- **Icône** : Cookie SVG personnalisé
- **Couleurs** : Variables CSS du site (--primary-color, --secondary-color)
- **Responsive** : S'adapte automatiquement mobile/desktop

### États

1. **Initial** : 3 boutons (Refuser / Personnaliser / Accepter)
2. **Personnalisation** : Switches pour chaque type de cookie + bouton "Enregistrer"
3. **Fermé** : Disparaît avec animation

---

## 🌐 Support multilingue

Le banner suit automatiquement la langue du site :

```javascript
// Français
localStorage.setItem("dyg_lang", "fr");

// Anglais
localStorage.setItem("dyg_lang", "en");
```

Le banner se met à jour automatiquement quand l'utilisateur change de langue (via les boutons `.lang-btn`).

**Textes traduits :**
- Titre, description, boutons
- Labels des switches (Nécessaires / Mesure d'audience)
- Descriptions détaillées

---

## 🔧 Personnalisation

### Modifier les textes

Éditez **`cookies.js`**, section `var T = {...}` :

```javascript
fr: {
  title: "Votre titre personnalisé",
  text: "Votre description...",
  // ... autres textes
}
```

### Ajouter un type de cookie

Dans **`cookies.js`**, fonction `render()` :

```javascript
// Ajoutez une nouvelle ligne dans .ck-prefs
'<div class="ck-row">' +
  '<span class="ck-tx">' +
    '<span class="ck-n">Marketing</span>' +
    '<span class="ck-d">Publicités personnalisées</span>' +
  '</span>' +
  '<input class="ck-sw" id="ck-marketing" type="checkbox">' +
'</div>'
```

Et dans la fonction `bind()` :

```javascript
el.querySelector(".ck-save").onclick = function() {
  var analytics = el.querySelector("#ck-analytics");
  var marketing = el.querySelector("#ck-marketing");
  save({ 
    analytics: !!(analytics && analytics.checked),
    marketing: !!(marketing && marketing.checked)
  });
};
```

### Modifier les couleurs

Les couleurs utilisent les variables CSS du site. Dans **`dyg.css`** :

```css
:root {
  --primary-color: #1a1a1a;      /* Bouton Accepter */
  --secondary-color: #2c5f7f;    /* Switch actif, liens */
  --paper-2: #fff;               /* Fond du banner */
}
```

---

## 🐛 Dépannage

### Le banner ne s'affiche pas

1. Vérifiez que `cookies.js` est bien chargé en premier
2. Ouvrez la console (F12) et cherchez les logs `[DYG Cookies]`
3. Vérifiez que vous n'avez pas déjà donné votre consentement (supprimez le cookie `dyg_consent` dans DevTools)

### Google Analytics ne se charge pas

1. Vérifiez votre **ID GA4** dans `analytics.js`
2. Ouvrez la console et cherchez `[DYG Analytics]`
3. Vérifiez que vous avez bien accepté les cookies
4. Dans Google Analytics, les données peuvent mettre 24-48h à apparaître

### Tester en mode développement

```javascript
// Dans la console du navigateur
// Réinitialiser le consentement
window.DYG_COOKIES.reset();

// Recharger la page
location.reload();
```

---

## 📊 Vérifier que GA4 fonctionne

### Méthode 1 : Console du navigateur

1. Acceptez les cookies
2. Ouvrez la console (F12)
3. Tapez : `dataLayer`
4. Vous devriez voir un array avec des événements

### Méthode 2 : Extensions navigateur

Installez l'extension **Google Tag Assistant** pour Chrome/Edge :
- [Tag Assistant](https://chrome.google.com/webstore/detail/tag-assistant-legacy-by-g/kejbdjndbnbjgmefkgdddjlbokphdefk)

### Méthode 3 : Google Analytics temps réel

1. Connectez-vous à Google Analytics
2. Allez dans **Rapports > Temps réel**
3. Naviguez sur votre site
4. Vous devriez voir votre visite apparaître en direct

---

## 🌐 Traductions FR/EN

Pour ajouter la version anglaise du banner, modifiez `cookies.js` :

```javascript
var lang = document.documentElement.lang || 'fr';
var texts = {
  fr: {
    title: "🍪 Respect de votre vie privée",
    message: "Nous utilisons des cookies...",
    accept: "✓ Accepter",
    refuse: "✕ Refuser"
  },
  en: {
    title: "🍪 Privacy Respect",
    message: "We use cookies...",
    accept: "✓ Accept",
    refuse: "✕ Decline"
  }
};
```

---

## 📞 Support

Pour toute question concernant Google Analytics ou la conformité RGPD :

- **Documentation GA4** : https://support.google.com/analytics/answer/10089681
- **RGPD (CNIL)** : https://www.cnil.fr/fr/reglement-europeen-protection-donnees
- **Cookies (CNIL)** : https://www.cnil.fr/fr/cookies-et-autres-traceurs

---

## 📄 Licence

Ce système de gestion des cookies est fourni tel quel. Adaptez-le selon vos besoins légaux spécifiques.

**Note** : Consultez toujours un juriste spécialisé en protection des données pour vous assurer de la conformité RGPD complète de votre site.
