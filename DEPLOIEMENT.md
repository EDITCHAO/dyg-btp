# 🚀 Guide de Déploiement - DYG-BTP

## 📋 Prérequis

- [ ] Compte [GitHub](https://github.com) créé
- [ ] Compte [Vercel](https://vercel.com) créé (gratuit)
- [ ] Git installé sur votre PC

---

## 🔧 Étape 1 : Initialiser Git (si pas déjà fait)

Ouvrir le terminal dans le dossier du projet :

```bash
cd c:\PROJET\dyg-BTP\DYG-BTP
```

Initialiser Git :

```bash
git init
git add .
git commit -m "Initial commit - Site DYG-BTP complet"
```

---

## 📤 Étape 2 : Créer un repo GitHub

### **Sur GitHub.com :**

1. Aller sur [github.com/new](https://github.com/new)
2. **Repository name** : `dyg-btp` (ou `dyg-btp-website`)
3. **Description** : `Site web officiel de DYG-BTP - Ingénieurs Conseils`
4. **Visibility** : Public ou Private (votre choix)
5. **NE PAS** cocher "Initialize with README"
6. Cliquer sur **"Create repository"**

### **Dans le terminal :**

Remplacez `VOTRE-USERNAME` par votre nom d'utilisateur GitHub :

```bash
git remote add origin https://github.com/VOTRE-USERNAME/dyg-btp.git
git branch -M main
git push -u origin main
```

✅ **Votre code est maintenant sur GitHub !**

---

## 🌐 Étape 3 : Déployer sur Vercel

### **Méthode 1 : Via l'interface Vercel (Recommandé)**

1. Aller sur [vercel.com](https://vercel.com)
2. **Se connecter** avec GitHub
3. Cliquer sur **"Add New..." → "Project"**
4. Sélectionner le repo `dyg-btp`
5. **Configurer le projet :**

   ```
   Framework Preset: Other
   Root Directory: ./
   Build Command: (laisser vide)
   Output Directory: frontend/public
   Install Command: (laisser vide)
   ```

6. Cliquer sur **"Deploy"**

🎉 **Votre site sera en ligne en 1-2 minutes !**

L'URL sera du type : `https://dyg-btp.vercel.app`

---

### **Méthode 2 : Via Vercel CLI (Avancé)**

Installer Vercel CLI :

```bash
npm install -g vercel
```

Déployer :

```bash
cd c:\PROJET\dyg-BTP\DYG-BTP
vercel
```

Suivre les instructions interactives.

---

## 🔧 Étape 4 : Configuration du domaine personnalisé

### **Si vous avez un domaine (dyg-btp.com) :**

1. Dans Vercel, aller sur **Settings → Domains**
2. Ajouter : `dyg-btp.com` et `www.dyg-btp.com`
3. Vercel vous donnera des enregistrements DNS à ajouter
4. Aller chez votre registrar (OVH, Namecheap, etc.)
5. Ajouter les enregistrements DNS :

   ```
   Type: A
   Name: @
   Value: 76.76.21.21

   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   ```

6. Attendre 1-48h pour la propagation DNS

✅ **Votre site sera accessible sur `dyg-btp.com` !**

---

## 🔄 Étape 5 : Mise à jour du site

### **Pour modifier le site :**

1. Modifier les fichiers localement
2. Tester : `python -m http.server 3000`
3. Commiter et pusher :

```bash
git add .
git commit -m "Description des modifications"
git push
```

4. **Vercel redéploie automatiquement** en ~1 minute

---

## ⚙️ Configuration post-déploiement

### **1. Google Analytics**

Modifier `frontend/public/js/analytics.js` :

```javascript
gtag('config', 'G-VOTRE-ID');
```

### **2. Variables d'environnement (si nécessaire)**

Dans Vercel :
- Aller sur **Settings → Environment Variables**
- Ajouter les variables nécessaires

### **3. Remplacement des images**

1. Remplacer les fichiers dans `frontend/public/images/`
2. Git commit + push
3. Vercel redéploie automatiquement

---

## 📊 Monitoring

### **Logs Vercel**

- Dashboard → Deployments → Logs
- Voir les erreurs en temps réel

### **Analytics**

- Vercel Analytics (gratuit) : Settings → Analytics
- Google Analytics : Tableau de bord GA4

---

## 🐛 Dépannage

### **Site ne se charge pas**

1. Vérifier les logs Vercel
2. Vérifier que `vercel.json` pointe vers `frontend/public`
3. Vérifier que `index.html` existe

### **Images ne s'affichent pas**

1. Vérifier les chemins : `images/nom-fichier.jpg`
2. Vérifier la casse (sensible) : `Image.jpg` ≠ `image.jpg`
3. Redéployer

### **Modifications ne s'affichent pas**

1. Vider le cache : Ctrl + Shift + R
2. Vérifier que le push Git a réussi
3. Vérifier le déploiement dans Vercel

---

## 📞 Support

**Problème de déploiement ?**
- 📧 guillaumeyana91@gmail.com
- 📱 WhatsApp : +228 99 33 96 58

---

## ✅ Checklist finale

- [ ] Code pushé sur GitHub
- [ ] Site déployé sur Vercel
- [ ] URL fonctionne (https://xxx.vercel.app)
- [ ] Traduction FR/EN fonctionne
- [ ] Responsive testé (mobile/tablette)
- [ ] Formulaire de contact fonctionne
- [ ] Réseaux sociaux liés
- [ ] Google Analytics configuré
- [ ] Images remplacées (si nécessaire)
- [ ] Domaine personnalisé configuré (optionnel)

---

🎉 **Félicitations ! Votre site est en ligne !**

**URL Vercel** : `https://dyg-btp.vercel.app`
