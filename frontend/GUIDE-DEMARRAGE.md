# 🚀 Guide de Démarrage Rapide - Site DYG-BTP

## ⚡ Configuration en 5 minutes

### Étape 1 : Google Analytics (2 min)

**Objectif** : Activer le tracking des visiteurs avec consentement RGPD

1. Allez sur https://analytics.google.com/
2. Créez une propriété GA4
3. Copiez votre ID (format : `G-XXXXXXXXXX`)
4. Ouvrez **`analytics.js`** ligne 12
5. Remplacez :
   ```javascript
   var ID = "G-XXXXXXXXXX"; // ← Collez votre ID ici
   ```

✅ **Test** : Ouvrez `test-analytics.html`, acceptez les cookies, vérifiez les logs

---

### Étape 2 : WhatsApp Chatbot (1 min)

**Objectif** : Permettre aux visiteurs de vous contacter sur WhatsApp

1. Notez votre numéro WhatsApp professionnel
2. Formatez-le : `+228 12 34 56 78` → `22812345678` (sans + ni espaces)
3. Ouvrez **`chatbot.js`** ligne 12
4. Remplacez :
   ```javascript
   wa: "22812345678", // ← Votre numéro ici
   ```

✅ **Test** : Ouvrez `test-chatbot.html`, cliquez "Test WhatsApp"

---

### Étape 3 : Personnalisation de base (2 min)

**Objectif** : Adapter les informations à votre entreprise

Ouvrez **`chatbot.js`** et modifiez la section `CFG` :

```javascript
var CFG = {
  name: "Votre Prénom",              // Ex: "Marie"
  org: "DYG-BTP",                    // Nom de l'entreprise
  wa: "22812345678",                 // ← Déjà fait à l'étape 2
  tel: "+228 12 34 56 78",           // Téléphone d'affichage
  mail: "contact@dyg-btp.com",       // Email de contact
  endpoint: null,                    // API leads (optionnel)
  llmEndpoint: null,                 // IA (optionnel)
  delay: 520                         // Vitesse typing (ms)
};
```

✅ **Test** : Ouvrez `dyg1.html`, testez le chatbot

---

## 🎯 Configuration Complète (15 min)

### Images et Logo

1. Remplacez `logo-dyg-btp.png` par votre logo
2. Remplacez les images placeholder par vos photos :
   - Images d'équipe
   - Photos de projets
   - Images des domaines

### Traductions

Ouvrez **`dyg.js`** et personnalisez :

```javascript
const translations = {
  fr: {
    heroTitle: "Votre titre personnalisé",
    heroSubtitle: "Votre description...",
    // ... continuez pour tous les textes
  },
  en: {
    heroTitle: "Your custom title",
    heroSubtitle: "Your description...",
    // ... English versions
  }
};
```

### FAQ du chatbot

Ouvrez **`chatbot.js`**, section `S.fr.faq` :

```javascript
faq: [
  {
    q: "Votre question ?",
    a: "Votre réponse..."
  },
  // Ajoutez/modifiez les questions
]
```

### Couleurs

Ouvrez **`dyg.css`**, ligne 7 :

```css
:root {
  --primary-color: #1a1a1a;      /* Couleur principale */
  --secondary-color: #2c5f7f;    /* Couleur secondaire */
  --accent-color: #d4af37;       /* Couleur accent */
}
```

---

## 🧪 Tests Recommandés

### 1. Test Complet du Site

**Checklist** :
- [ ] Navigation fonctionne (tous les liens)
- [ ] Changement de langue FR/EN
- [ ] Animations reveal au scroll
- [ ] Formulaire de contact
- [ ] Responsive mobile/tablet/desktop

### 2. Test du Chatbot

Ouvrez **`test-chatbot.html`** :

- [ ] FAB s'affiche en bas à droite
- [ ] Ouverture/fermeture fluide
- [ ] Menu principal (4 options)
- [ ] Parcours devis complet (4 étapes)
- [ ] FAQ (5 questions)
- [ ] WhatsApp (redirection)
- [ ] Changement de langue
- [ ] Leads capturés (localStorage)

### 3. Test des Cookies

Ouvrez **`test-analytics.html`** :

- [ ] Banner s'affiche après 0.9s
- [ ] Bouton "Accepter" fonctionne
- [ ] Bouton "Refuser" fonctionne
- [ ] Bouton "Personnaliser" affiche les switches
- [ ] Choix mémorisé (localStorage)
- [ ] GA4 se charge après acceptation
- [ ] Lien "Gérer les cookies" dans footer

### 4. Test Mobile

Sur mobile (ou DevTools mode responsive) :

- [ ] Menu hamburger (si implémenté)
- [ ] Chatbot plein écran
- [ ] Banner cookies adapté
- [ ] Formulaire utilisable
- [ ] Images responsive

---

## 📦 Déploiement

### Fichiers à uploader

```
dyg-BTP/
├── dyg1.html              ← Page principale
├── dyg.css                ← Styles
├── dyg.js                 ← Scripts site
├── chatbot.js             ← Chatbot
├── cookies.js             ← Gestion cookies
├── analytics.js           ← Google Analytics
├── site.webmanifest       ← PWA
├── logo-dyg-btp.png       ← Logo
└── images/                ← Toutes vos images
```

### Configuration Serveur

**Apache (.htaccess)** :
```apache
# HTTPS redirect
RewriteEngine On
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

# Compression
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/css text/javascript application/javascript
</IfModule>

# Cache
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType image/jpg "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType text/css "access plus 1 month"
  ExpiresByType application/javascript "access plus 1 month"
</IfModule>
```

**Nginx** :
```nginx
location / {
  try_files $uri $uri/ /dyg1.html;
}

# Compression
gzip on;
gzip_types text/css application/javascript text/html;

# Cache
location ~* \.(jpg|png|css|js)$ {
  expires 30d;
  add_header Cache-Control "public, immutable";
}
```

### Checklist Pré-déploiement

- [ ] ID Google Analytics configuré
- [ ] Numéro WhatsApp configuré
- [ ] Toutes les images uploadées
- [ ] Logo personnalisé
- [ ] Email de contact correct
- [ ] Politique de confidentialité créée
- [ ] Test sur serveur de staging
- [ ] Certificat SSL actif (HTTPS)
- [ ] Domaine pointé correctement

---

## 🔍 Vérifications Post-déploiement

### SEO

1. **Google Search Console**
   - Soumettre le sitemap
   - Vérifier l'indexation
   - Surveiller les erreurs

2. **Test SEO**
   - Lighthouse (Chrome DevTools)
   - Score > 90 recommandé

### Performance

1. **PageSpeed Insights**
   - https://pagespeed.web.dev/
   - Score > 85 recommandé

2. **GTmetrix**
   - https://gtmetrix.com/
   - Grade A recommandé

### Accessibilité

1. **WAVE**
   - https://wave.webaim.org/
   - 0 erreur recommandé

2. **Axe DevTools**
   - Extension Chrome/Firefox
   - Vérifier contraste, ARIA

### Analytics

1. **Google Analytics Temps Réel**
   - Visitez le site
   - Vérifiez que votre visite apparaît
   - Testez les événements

2. **Leads Chatbot**
   - Testez un parcours complet
   - Vérifiez localStorage : `dyg_leads`

---

## 🐛 Problèmes Fréquents

### Le site ne s'affiche pas correctement

**Solution** : Vérifiez les chemins des fichiers
```html
<!-- Chemins relatifs corrects -->
<link rel="stylesheet" href="dyg.css">
<script src="dyg.js"></script>
```

### Le chatbot ne fonctionne pas

**Solution** : Vérifiez l'ordre des scripts
```html
<!-- Ordre important ! -->
<script src="cookies.js"></script>      <!-- 1. Cookies -->
<script src="analytics.js"></script>    <!-- 2. Analytics -->
<script src="chatbot.js"></script>      <!-- 3. Chatbot -->
<script src="dyg.js"></script>          <!-- 4. Site -->
```

### Google Analytics ne track pas

**Solutions** :
1. Vérifiez votre ID GA4 dans `analytics.js`
2. Acceptez les cookies (banner)
3. Attendez 24-48h pour voir les données
4. Testez en mode Temps Réel

### Les images ne s'affichent pas

**Solutions** :
1. Vérifiez les chemins : `images/nom-fichier.jpg`
2. Vérifiez les extensions (jpg vs JPG)
3. Vérifiez les permissions serveur
4. Testez les URLs directement dans le navigateur

### Le formulaire ne s'envoie pas

**Solution** : Implémentez un backend
```javascript
// Dans dyg.js, fonction initContactForm()
// Remplacez le setTimeout par un vrai fetch
fetch('votre-api.php', {
  method: 'POST',
  body: JSON.stringify(data)
})
```

---

## 📞 Support

### Documentation

- **README.md** : Vue d'ensemble complète
- **README-CHATBOT.md** : Documentation chatbot
- **README-ANALYTICS.md** : Documentation analytics

### Logs de Debug

Ouvrez la console (F12) :
```
[DYG Chat] ✅ Chatbot chargé avec succès
[DYG Cookies] ✅ Système de cookies premium chargé
[DYG Analytics] ✅ Google Analytics chargé avec succès
```

### Contacts

- **Email** : contact@dyg-btp.com
- **WhatsApp** : Configuré dans le chatbot

---

## ✅ Checklist Finale

Avant de considérer le site "terminé" :

### Fonctionnel
- [ ] Tous les liens fonctionnent
- [ ] Formulaire envoie les emails
- [ ] Chatbot capture les leads
- [ ] Google Analytics track
- [ ] Banner cookies fonctionne
- [ ] Responsive OK sur mobile/tablet

### Contenu
- [ ] Tous les textes personnalisés
- [ ] Toutes les images remplacées
- [ ] Logo personnalisé
- [ ] FAQ complète et à jour
- [ ] Coordonnées correctes

### SEO & Performance
- [ ] Meta tags remplis
- [ ] Images optimisées (WebP, compression)
- [ ] Lighthouse score > 90
- [ ] Sitemap généré
- [ ] robots.txt configuré

### Légal
- [ ] Politique de confidentialité créée
- [ ] Mentions légales rédigées
- [ ] CGU/CGV (si e-commerce)
- [ ] Conformité RGPD vérifiée

### Sécurité
- [ ] HTTPS actif (SSL)
- [ ] Headers de sécurité configurés
- [ ] Formulaire protégé (CSRF, validation)
- [ ] Sauvegardes automatiques activées

---

## 🎉 Félicitations !

Votre site DYG-BTP est maintenant prêt à générer des leads et impressionner vos clients ! 🚀

**Prochaines étapes recommandées** :
1. Marketing : SEO, Google Ads, réseaux sociaux
2. Optimisation : A/B testing du chatbot
3. Amélioration continue : Analyser les leads, améliorer les conversions

**Besoin d'aide ?** Consultez les README détaillés ou contactez le support technique.
