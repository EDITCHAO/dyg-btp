# 🗄️ Guide Supabase — DYG-BTP Back-Office

## 📋 Pourquoi Supabase ?

Supabase est une base de données **gratuite** en ligne qui permet de :
- Stocker les demandes de devis du site
- Gérer les messages de contact
- Conserver les candidatures
- Accéder aux données depuis le dashboard admin
- **Gratuit jusqu'à 500MB / 2 projets**

---

## 🚀 Étape 1 — Créer un compte Supabase

1. Allez sur **https://supabase.com**
2. Cliquez **"Start your project"**
3. Connectez-vous avec GitHub ou email
4. Cliquez **"New project"**
5. Configurez :
   - **Name** : `dyg-btp`
   - **Database Password** : choisissez un mot de passe fort
   - **Region** : `West EU (Ireland)` (le plus proche de l'Afrique de l'Ouest)
6. Cliquez **"Create new project"** — attendez 2 minutes

---

## 🔑 Étape 2 — Récupérer les clés API

1. Dans votre projet Supabase, allez dans :
   **Settings** (⚙️) → **API**

2. Copiez ces deux valeurs :
   - **Project URL** : `https://xxxxxxxxxxxx.supabase.co`
   - **anon public** key : `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`

---

## ⚙️ Étape 3 — Configurer le projet

Ouvrez le fichier :
```
frontend/public/admin/supabase-config.js
```

Remplacez les lignes 14 et 15 :
```javascript
const SUPABASE_URL = 'https://VOTRE_PROJECT_ID.supabase.co';  // ← Remplacez
const SUPABASE_ANON_KEY = 'VOTRE_ANON_KEY';                    // ← Remplacez
```

Par vos vraies valeurs :
```javascript
const SUPABASE_URL = 'https://abcdefghij.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
```

---

## 🗃️ Étape 4 — Créer les tables

1. Dans Supabase, allez dans **SQL Editor** (icône base de données)
2. Cliquez **"New query"**
3. Copiez-collez tout le contenu du fichier :
   ```
   frontend/public/admin/supabase-setup.sql
   ```
4. Cliquez **"Run"** (▶)
5. Vous devriez voir **"Success. No rows returned"**

### Tables créées :
| Table | Description |
|-------|-------------|
| `devis` | Demandes de devis du formulaire contact |
| `messages` | Messages de contact |
| `candidatures` | Candidatures de la page Carrière |
| `logs` | Journal des actions admin |

---

## ✅ Étape 5 — Vérifier la connexion

1. Ouvrez le dashboard admin : `http://localhost:3000/admin/`
2. Ouvrez la console (F12 → Console)
3. Vous devriez voir : `✅ Supabase connecté`

Si vous voyez `⚠️ Supabase SDK non chargé` :
- Vérifiez que le CDN est bien dans le HTML
- Vérifiez votre connexion internet

---

## 📊 Étape 6 — Migrer les données existantes

Si vous avez déjà des données dans localStorage :

1. Allez sur `http://localhost:3000/admin/`
2. Ouvrez la console (F12)
3. Tapez : `DYG_DB.migrateToSupabase()`
4. Confirmez la migration

---

## 🔄 Fonctionnement en temps réel

Une fois configuré :
- ✅ Les formulaires du site sauvegardent **automatiquement** dans Supabase
- ✅ Le dashboard admin affiche les données **en temps réel**
- ✅ Les mises à jour de statut sont **synchronisées**
- ✅ Toutes les données sont **sauvegardées même si localStorage est vidé**

---

## 📱 Accéder aux données depuis Supabase

Vous pouvez aussi voir vos données directement sur Supabase :
1. Allez dans **Table Editor**
2. Cliquez sur une table (devis, messages, etc.)
3. Vous voyez toutes les entrées

---

## 🔒 Sécurité

- La **anon key** est publique — elle permet uniquement d'insérer des données
- La **service_role key** (secrète) permet de tout modifier — **ne la partagez jamais**
- Les politiques RLS (Row Level Security) protègent vos données

---

## 💰 Coût

**Plan gratuit Supabase inclut :**
- 500 MB de base de données
- 2 GB de bande passante
- 50,000 requêtes/mois
- 2 projets simultanés

**Largement suffisant pour DYG-BTP** 🎉

---

## 📞 Besoin d'aide ?

Si vous avez des problèmes :
1. Vérifiez les clés API
2. Vérifiez que le SQL a bien été exécuté
3. Regardez la console du navigateur (F12)
