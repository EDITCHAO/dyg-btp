# 🚀 Guide de Déploiement Vercel - DYG-BTP

## ✅ Projet Prêt pour Vercel

Le projet DYG-BTP est maintenant structuré professionnellement pour un déploiement Vercel en production.

---

## 📁 Structure Finale

```
frontend/
├── public/                          # ← Fichiers statiques (servis par Vercel)
│   ├── index.html                   # Page principale
│   ├── css/
│   │   └── dyg.css                  # Styles (3800+ lignes)
│   ├── js/
│   │   ├── dyg.js                   # Scripts site
│   │   ├── chatbot.js               # Chatbot IA
│   │   ├── cookies.js               # RGPD
│   │   ├── analytics.js             # GA4
│   │   └── kb-search.js             # Moteur RAG
│   ├── data/
│   │   └── dyg-kb.json              # Base connaissances
│   ├── images/                      # À ajouter vos images
│   │   └── logo-dyg-btp.png
│   ├── favicon.ico                  # À ajouter
│   └── site.webmanifest             # PWA manifest
│
├── vercel.json                      # ✅ Configuration Vercel
├── package.json                     # ✅ Dépendances NPM
├── .gitignore                       # ✅ Fichiers ignorés
├── README.md                        # ✅ Documentation
└── DEPLOIEMENT-VERCEL.md           # ✅ Ce fichier
```

---

## 🎯 Étape 1 : Vérification Avant Déploiement

### Checklist Fichiers

- [x] `frontend/public/index.html` existe
- [x] `frontend/public/css/dyg.css` existe  
- [x] `frontend/public/js/*.js` (5 fichiers) existent
- [x] `frontend/public/data/dyg-kb.json` existe
- [x] `frontend/vercel.json` configuré
- [x] `frontend/package.json` configuré
- [x] `frontend/.gitignore` configuré

### Checklist Configuration

- [ ] **Google Analytics ID** configuré dans `public/js/analytics.js` ligne 12
- [ ] **Numéro WhatsApp** configuré dans `public/js/chatbot.js` ligne 12
- [ ] **Images** ajoutées dans `public/images/`
- [ ] **Logo** `logo-dyg-btp.png` présent

---

## 🚀 Étape 2 : Déploiement sur Vercel

### Méthode A : CLI Vercel (Recommandé)

```bash
# 1. Ouvrir terminal dans le dossier frontend
cd c:\PROJET\dyg-BTP\DYG-BTP\frontend

# 2. Installer Vercel CLI (si pas déjà fait)
npm install -g vercel

# 3. Se connecter à Vercel
vercel login

# 4. Déployer
vercel

# OU directement en production
vercel --prod
```

**Répondre aux questions** :
- Set up and deploy? `Y`
- Which scope? (sélectionner votre compte)
- Link to existing project? `N`
- What's your project's name? `dyg-btp`
- In which directory is your code located? `./`
- Want to override settings? `N`

**Résultat** :
```
✅ Production: https://dyg-btp.vercel.app
```

---

### Méthode B : GitHub + Vercel (Automatique)

#### 1. Initialiser Git

```bash
# Dans le dossier frontend
cd c:\PROJET\dyg-BTP\DYG-BTP\frontend

git init
git add .
git commit -m "Initial commit: DYG-BTP site professionnel"
```

#### 2. Créer Repo GitHub

1. Aller sur https://github.com/new
2. Nom du repo : `dyg-btp`
3. Description : "Site web professionnel DYG-BTP"
4. Public ou Private
5. **NE PAS** initialiser avec README/gitignore
6. Créer le repo

#### 3. Push vers GitHub

```bash
git branch -M main
git remote add origin https://github.com/VOTRE-USERNAME/dyg-btp.git
git push -u origin main
```

#### 4. Connecter Vercel

1. Aller sur https://vercel.com/new
2. Cliquer **"Import Git Repository"**
3. Sélectionner votre repo GitHub `dyg-btp`
4. Configurer :
   - **Framework Preset** : Other
   - **Root Directory** : `./` (laisser vide)
   - **Build Command** : (laisser vide)
   - **Output Directory** : `public`
   - **Install Command** : `npm install`

5. Cliquer **"Deploy"**

**Résultat** :
- ✅ Site déployé : `https://dyg-btp-xxxx.vercel.app`
- ✅ Déploiement automatique à chaque push sur `main`
- ✅ Preview automatique pour les Pull Requests

---

### Méthode C : Drag & Drop (Simple)

1. Zipper le dossier `frontend` complet
2. Aller sur https://vercel.com/new
3. Glisser-déposer le fichier zip
4. Attendre le déploiement

**Limitations** :
- Pas de déploiement automatique
- Pas de lien Git

---

## 🔧 Étape 3 : Configuration Post-Déploiement

### 1. Vérifier le Site

Ouvrir l'URL Vercel : `https://dyg-btp-xxxx.vercel.app`

**Checklist** :
- [ ] Page s'affiche correctement
- [ ] CSS chargé (styles visibles)
- [ ] JavaScript fonctionne (console F12 sans erreurs)
- [ ] Chatbot s'ouvre
- [ ] Banner cookies apparaît
- [ ] Navigation fonctionne

### 2. Configurer Domaine Custom (optionnel)

#### Dans Vercel Dashboard

1. Projet → Settings → Domains
2. Add Domain : `www.dyg-btp.com`
3. Suivre instructions Vercel

#### Chez votre Registrar (OVH, Namecheap, etc.)

**Option A : CNAME (recommandé)**
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
TTL: 3600
```

**Option B : A Record**
```
Type: A
Name: @
Value: 76.76.19.19
TTL: 3600
```

**Attendre** : 5 minutes à 48h (propagation DNS)

**HTTPS** : Activé automatiquement par Vercel

### 3. Variables d'Environnement (optionnel)

Si vous souhaitez externaliser les configs :

#### Dans Vercel Dashboard

1. Projet → Settings → Environment Variables
2. Ajouter :
   - `GOOGLE_ANALYTICS_ID` = `G-XXXXXXXXXX`
   - `WHATSAPP_NUMBER` = `22812345678`

#### Utiliser dans le code

Modifier `analytics.js` et `chatbot.js` :

```javascript
// analytics.js
var ID = process.env.GOOGLE_ANALYTICS_ID || "G-XXXXXXXXXX";

// chatbot.js
var CFG = {
  wa: process.env.WHATSAPP_NUMBER || "22812345678",
  // ...
};
```

**Note** : Nécessite un build step (non configuré actuellement)

---

## 📊 Étape 4 : Monitoring & Analytics

### Vercel Analytics (Gratuit)

1. Dashboard → Projet → Analytics
2. Voir :
   - Visiteurs uniques
   - Pages vues
   - Temps de chargement
   - Géolocalisation

### Google Analytics GA4

1. Configurer l'ID dans `public/js/analytics.js`
2. Accepter les cookies sur le site
3. Aller sur https://analytics.google.com/
4. Voir les données en temps réel

### Leads Chatbot

**LocalStorage** (temporaire) :
```javascript
// Console navigateur (F12)
window.DYG_CHAT.getLeads()
```

**API Backend** (recommandé) :
- Configurer endpoint dans `chatbot.js` ligne 13
- Les leads seront envoyés automatiquement

---

## 🔄 Étape 5 : Mises à Jour

### Via Git (si Méthode B)

```bash
# Modifier les fichiers
# ...

# Commit et push
cd frontend
git add .
git commit -m "Update: description des changements"
git push origin main

# Vercel déploie automatiquement
```

### Via CLI Vercel

```bash
cd frontend

# Modifier les fichiers
# ...

# Redéployer
vercel --prod
```

### Via Dashboard Vercel

1. Deployments → trois points → Redeploy
2. Ou modifier via GitHub et push

---

## 🐛 Troubleshooting

### Problème : Site affiche "404"

**Causes** :
- `index.html` pas dans `public/`
- Routes `vercel.json` incorrectes

**Solution** :
```bash
# Vérifier structure
ls frontend/public/index.html

# Vérifier vercel.json
cat frontend/vercel.json
```

### Problème : CSS/JS non chargés

**Causes** :
- Chemins incorrects dans `index.html`
- Fichiers pas dans les bons dossiers

**Solution** :
1. Vérifier chemins dans `index.html` :
   ```html
   <link rel="stylesheet" href="css/dyg.css">
   <script src="js/dyg.js"></script>
   ```

2. Vérifier fichiers existent :
   ```bash
   ls frontend/public/css/dyg.css
   ls frontend/public/js/dyg.js
   ```

### Problème : Erreurs Console

**Ouvrir** : F12 → Console

**Erreurs fréquentes** :
- `404 on dyg-kb.json` → Vérifier `public/data/dyg-kb.json`
- `Undefined window.DYG_CHAT` → Vérifier ordre scripts
- `CORS error` → Vérifier URLs externes (fonts, images)

### Problème : Déploiement échoue

**Vérifier** :
1. `package.json` valide (JSON valide)
2. `vercel.json` valide
3. Pas de fichiers > 50MB
4. Logs : Dashboard → Deployments → View Function Logs

---

## 📈 Optimisations Post-Déploiement

### 1. Images

**Optimiser** :
```bash
# Installer outil
npm install -g sharp-cli

# Convertir en WebP
npx sharp -i public/images/*.jpg -o public/images/ -f webp
```

**Utiliser** :
```html
<picture>
  <source srcset="image.webp" type="image/webp">
  <img src="image.jpg" alt="...">
</picture>
```

### 2. Cache

Déjà configuré dans `vercel.json` :
- CSS/JS : 1 an
- Images : 1 an
- HTML : Pas de cache

### 3. Compression

Vercel active automatiquement :
- Gzip
- Brotli

### 4. SEO

**Sitemap** : Créer `public/sitemap.xml`
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://www.dyg-btp.com/</loc>
    <priority>1.0</priority>
  </url>
</urlset>
```

**robots.txt** : Créer `public/robots.txt`
```
User-agent: *
Allow: /
Sitemap: https://www.dyg-btp.com/sitemap.xml
```

---

## ✅ Checklist Finale Déploiement

### Avant Déploiement
- [ ] Google Analytics ID configuré
- [ ] Numéro WhatsApp configuré
- [ ] Images optimisées et uploadées
- [ ] Logo présent
- [ ] Tests locaux OK (`npm run dev`)

### Après Déploiement
- [ ] Site accessible via URL Vercel
- [ ] HTTPS actif (🔒 vert)
- [ ] Toutes les pages fonctionnent
- [ ] Console sans erreurs (F12)
- [ ] Chatbot fonctionne
- [ ] Banner cookies fonctionne
- [ ] Formulaire contact fonctionne
- [ ] Responsive mobile testé
- [ ] Google Analytics track (temps réel)
- [ ] Lighthouse score > 85

### Optionnel
- [ ] Domaine custom configuré
- [ ] Sitemap.xml créé
- [ ] robots.txt créé
- [ ] Images WebP converties
- [ ] Backend leads configuré

---

## 🎉 Félicitations !

Votre site DYG-BTP est maintenant **en production sur Vercel** ! 🚀

### URLs Utiles

- **Site** : https://dyg-btp-xxxx.vercel.app
- **Dashboard** : https://vercel.com/dashboard
- **Analytics** : https://analytics.google.com/
- **Docs Vercel** : https://vercel.com/docs

### Prochaines Étapes

1. **Marketing** : SEO, Google Ads, réseaux sociaux
2. **Contenu** : Ajouter vraies images, textes, projets
3. **Backend** : API pour persistence leads
4. **Monitoring** : Surveiller analytics, leads, performance

---

**Besoin d'aide ?** Consultez les README dans le projet ou la documentation Vercel.

**Développé pour DYG-BTP** | Production Ready | Juillet 2026
