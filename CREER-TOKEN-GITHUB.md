# 🔑 Créer un Token GitHub pour Pousser

## ⚠️ Problème Actuel

Votre token GitHub a expiré ou n'a pas les permissions nécessaires.

**Erreur :**
```
remote: Permission to EDITCHAO/dyg-btp.git denied to EDITCHAO.
fatal: unable to access 'https://github.com/EDITCHAO/dyg-btp.git/': The requested URL returned error: 403
```

---

## 🔧 Solution : Créer un Nouveau Token

### **Étape 1 : Aller sur GitHub**

1. Ouvrez votre navigateur
2. Allez sur : **https://github.com/settings/tokens**
3. Connectez-vous si nécessaire

---

### **Étape 2 : Créer un Token**

1. Cliquez sur : **"Generate new token"**
2. Sélectionnez : **"Generate new token (classic)"**

---

### **Étape 3 : Configuration du Token**

1. **Note (nom du token)** : Tapez `dyg-btp-push`

2. **Expiration** : Choisissez `90 days` ou `No expiration`

3. **Permissions** : Cochez ces cases :
   - ✅ **repo** (toutes les sous-cases)
     - repo:status
     - repo_deployment
     - public_repo
     - repo:invite
     - security_events

4. Descendez en bas de la page

5. Cliquez sur : **"Generate token"** (bouton vert)

---

### **Étape 4 : Copier le Token**

⚠️ **IMPORTANT** : Vous ne verrez le token qu'UNE SEULE FOIS !

1. GitHub affichera un token qui ressemble à :
   ```
   ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
   ```

2. **Copiez-le** (icône 📋 ou Ctrl+C)

3. **Sauvegardez-le** quelque part (Notepad, fichier texte)

---

### **Étape 5 : Utiliser le Token**

#### **Méthode 1 : Script Automatique** ⭐

1. Double-cliquez sur : **`FIX-GITHUB-AUTH.bat`**
2. Quand GitHub demande le mot de passe, **collez votre token**
3. Appuyez sur Entrée

#### **Méthode 2 : Manuel**

Ouvrez PowerShell et tapez :

```powershell
cd c:\PROJET\dyg-BTP\DYG-BTP

# Supprimer l'ancien remote
git remote remove origin

# Ajouter le nouveau remote
git remote add origin https://github.com/EDITCHAO/dyg-btp.git

# Pousser (GitHub demandera vos identifiants)
git push -u origin main
```

Quand GitHub demande :
- **Username** : `EDITCHAO`
- **Password** : Collez votre token (pas votre mot de passe GitHub !)

---

### **Étape 6 : Vérifier**

Après un push réussi, allez sur :
**https://github.com/EDITCHAO/dyg-btp**

Vous devriez voir tous vos fichiers ! ✅

---

## 🔐 Sécurité du Token

### **Ce qu'il faut savoir :**

- ✅ Le token remplace votre mot de passe pour Git
- ✅ Vous pouvez le révoquer à tout moment
- ✅ Il expire après la durée choisie
- ⚠️ Ne le partagez jamais publiquement
- ⚠️ Ne le commitez pas dans votre code

### **Où sauvegarder le token :**

1. Dans un gestionnaire de mots de passe (recommandé)
2. Dans un fichier texte sécurisé sur votre ordinateur
3. Dans votre navigateur (auto-fill)

---

## 💡 Alternative : GitHub Desktop

Si vous préférez ne pas utiliser les tokens :

1. Téléchargez : **GitHub Desktop**
   - https://desktop.github.com/

2. Connectez-vous avec votre compte GitHub

3. Ouvrez votre repository : `EDITCHAO/dyg-btp`

4. Faites "Push origin" avec un clic

C'est plus simple, GitHub Desktop gère l'authentification automatiquement ! 😊

---

## 🆘 Problèmes Fréquents

### **"Token doesn't have the required scopes"**

→ Vous avez oublié de cocher `repo` lors de la création du token.  
→ Créez un nouveau token avec les bonnes permissions.

### **"Token not found"**

→ Vous avez tapé le token incorrectement.  
→ Copiez-collez le token au lieu de le taper.

### **"Authentication failed"**

→ Le token a expiré.  
→ Créez un nouveau token.

---

## ✅ Checklist

- [ ] Aller sur https://github.com/settings/tokens
- [ ] Créer un token avec permissions `repo`
- [ ] Copier le token
- [ ] Lancer `FIX-GITHUB-AUTH.bat`
- [ ] Coller le token quand demandé
- [ ] Vérifier sur https://github.com/EDITCHAO/dyg-btp

---

## 📞 Besoin d'Aide ?

Si ça ne marche toujours pas :

1. Vérifiez que vous êtes bien connecté comme **EDITCHAO** sur GitHub
2. Vérifiez que le repository existe : https://github.com/EDITCHAO/dyg-btp
3. Essayez GitHub Desktop comme alternative

---

**Une fois le token créé, lancez : `FIX-GITHUB-AUTH.bat` ! 🚀**
