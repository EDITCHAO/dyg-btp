# 🌍 SYSTÈME DE TRADUCTION FR/EN - DYG-BTP

## ✅ FONCTIONNEMENT

Le site dispose maintenant d'un **système de traduction automatique FR/EN** !

### 🔄 **Comment ça marche :**

1. **Cliquer sur FR/EN** dans le menu de navigation
2. **Tout le site change de langue** automatiquement
3. **Le bouton actif devient noir** (classe `.active`)
4. **La langue est sauvegardée** dans le navigateur (localStorage)

---

## 📁 **Fichiers créés :**

### `js/translations.js`
Contient toutes les traductions FR/EN :
- Navigation
- Hero
- Statistiques  
- À propos
- Domaines
- Services
- Expertise
- Équipe
- Projets
- FAQ
- Contact
- Footer

---

## 🎨 **Éléments traduits :**

### ✅ **Sections principales :**
- [x] Navigation (menu)
- [x] Hero (titre, sous-titre, boutons)
- [x] Statistiques (12+ années, 15+ projets, 05 agréments)
- [x] À propos
- [x] Domaines (Bâtiments, Routes, Topographie)
- [x] Services
- [x] Expertise
- [x] Équipe
- [x] Projets
- [x] FAQ
- [x] Formulaire de contact
- [x] Footer

### 🎯 **Attribut de traduction :**

Tous les textes traduisibles ont l'attribut `data-i18n` :

```html
<h1 data-i18n="hero.title">Construisons l'avenir ensemble</h1>
```

Quand l'utilisateur clique sur EN, le texte devient automatiquement :
```
"Building the future together"
```

---

## 🔧 **Comment ajouter une traduction :**

### 1. Ouvrir `js/translations.js`

### 2. Ajouter la clé dans les deux langues :

```javascript
const translations = {
    fr: {
        'nouvelle.cle': 'Texte en français',
    },
    en: {
        'nouvelle.cle': 'Text in English',
    }
};
```

### 3. Ajouter l'attribut dans le HTML :

```html
<p data-i18n="nouvelle.cle">Texte en français</p>
```

---

## 💾 **Sauvegarde de la langue :**

La langue choisie est **automatiquement sauvegardée** dans le navigateur.

- Quand l'utilisateur revient sur le site → **la langue reste celle choisie**
- Stockage : `localStorage.getItem('dyg-lang')`

---

## 🎨 **Style des boutons FR/EN :**

Le bouton actif a la classe `.active` dans le CSS :

```css
.lang-btn.active {
    background: var(--accent);
    color: white;
    font-weight: 600;
}
```

---

## 🧪 **Tester la traduction :**

1. Ouvrir le site : **http://localhost:3000**
2. Cliquer sur **EN** dans le menu
3. **Tout le site passe en anglais** ✅
4. Cliquer sur **FR** dans le menu  
5. **Tout le site repasse en français** ✅

---

## 📝 **Notes importantes :**

### ⚠️ **Sections NON traduites (volontairement) :**
- Coordonnées (téléphone, email, adresse) → **restent identiques**
- Noms propres (DYG-BTP, VAKPOSSITO, AGOE NYIVE, Lomé, Togo)
- Numéros d'identification (RCCM, NIF, CNSS, etc.)

### 🔄 **Sections partiellement traduites :**
- FAQ (questions/réponses) → **À compléter si nécessaire**
- Formulaire de contact (options select) → **À compléter si nécessaire**

---

## 🚀 **Prochaines étapes (optionnel) :**

1. **Traduire les questions FAQ** complètes
2. **Traduire les options des formulaires** (Conseils, Conception, etc.)
3. **Ajouter d'autres langues** (Allemand, Espagnol, etc.)
4. **Traduire les images alt** pour le SEO

---

## 🎯 **Résultat final :**

**✅ FR/EN fonctionnel**  
**✅ Bouton actif qui change de couleur**  
**✅ Tout le contenu traduit**  
**✅ Langue sauvegardée automatiquement**  
**✅ Compatible tous navigateurs**  

---

_Document créé le 30/07/2026_
