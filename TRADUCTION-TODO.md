# 🌍 Ajout des attributs data-i18n pour la traduction complète

## ✅ Déjà fait
- Navigation (nav.home, nav.about, etc.)
- Stats (stats.years, stats.projects, stats.approvals)

## 📝 À ajouter

### Hero Section
```html
<div class="badge"><span data-i18n="hero.badge.engineers">Ingénieurs Conseils</span></div>
<div class="badge"><span data-i18n="hero.badge.iso">ISO 9001:2015</span></div>
<div class="badge"><span data-i18n="hero.badge.certified">Agréé par l'État</span></div>
<h1><span data-i18n="hero.title">Construisons</span> <span data-i18n="hero.title.accent">l'avenir</span> <span data-i18n="hero.title.end">ensemble</span></h1>
<p class="hero-subtitle" data-i18n="hero.subtitle">Depuis 2004...</p>
<span data-i18n="hero.btn.references">Nos Références</span>
<span data-i18n="hero.btn.contact">Discuter d'un projet</span>
```

### About Section
```html
<div class="section-tag" data-i18n="about.tag">À Propos</div>
<h2 data-i18n="about.title">Excellence et Innovation...</h2>
<p data-i18n-html="about.desc1">DYG-BTP est...</p>
<p data-i18n="about.desc2">Notre équipe...</p>
<div data-i18n="about.cert.iso">ISO 9001</div>
<div data-i18n="about.cert.state">Agréé État</div>
<div data-i18n="about.cert.warranty">Garantie Décennale</div>
```

### Domaines Section
```html
<div class="section-tag" data-i18n="domains.tag">Nos Domaines</div>
<h2 class="section-title" data-i18n="domains.title">Trois pôles...</h2>
<p data-i18n="domains.subtitle">Les grands domaines...</p>

<!-- Card 1 -->
<h3 data-i18n="domains.building">Bâtiments</h3>
<div class="domaine-subtitle" data-i18n="domains.building.sub">Ingénierie Civile...</div>
<li data-i18n="domains.building.item1">Immeubles IGH...</li>
<!-- etc pour item2, item3, item4, item5 -->

<!-- Card 2 -->
<h3 data-i18n="domains.roads">Infrastructures routières</h3>
<!-- etc -->

<!-- Card 3 -->
<h3 data-i18n="domains.topo">Topographie</h3>
<!-- etc -->
```

### Services Section
```html
<div class="section-tag" data-i18n="services.tag">Nos Services</div>
<h2 class="section-title" data-i18n="services.title">Expertise...</h2>
<p data-i18n="services.subtitle">Nous offrons...</p>

<h3 data-i18n="services.roads">Routes & Transport</h3>
<p data-i18n="services.roads.desc">Conception...</p>

<h3 data-i18n="services.building">Bâtiment & Construction</h3>
<p data-i18n="services.building.desc">Études...</p>

<h3 data-i18n="services.topo">Topographie</h3>
<p data-i18n="services.topo.desc">Relevés...</p>

<h3 data-i18n="services.studies">Études & Conception</h3>
<p data-i18n="services.studies.desc">Études techniques...</p>

<h3 data-i18n="services.control">Contrôle & Supervision</h3>
<p data-i18n="services.control.desc">Contrôle qualité...</p>

<h3 data-i18n="services.env">Environnement & Durabilité</h3>
<p data-i18n="services.env.desc">Études d'impact...</p>
```

### Expertise Section
```html
<div class="expertise-tag" data-i18n="expertise.tag">L'EXIGENCE...</div>
<h2 class="expertise-title">
    <span data-i18n="expertise.title">Les domaines</span>
    <span class="expertise-title-italic" data-i18n="expertise.title.accent">stratégiques</span>
</h2>
<p class="expertise-subtitle" data-i18n-html="expertise.subtitle">DYG-BTP est certifié...</p>

<!-- Card 1 -->
<div class="expertise-number" data-i18n="expertise.card1.number">N° 02 001</div>
<h3 class="expertise-card-title" data-i18n-html="expertise.card1.title">Bâtiments<br>Immobiliers</h3>
<p class="expertise-card-desc" data-i18n="expertise.card1.desc">Études...</p>

<!-- Card 2 -->
<div class="expertise-number" data-i18n="expertise.card2.number">N° 04 001</div>
<h3 class="expertise-card-title" data-i18n-html="expertise.card2.title">Topographie<br>& Métrés</h3>
<p class="expertise-card-desc" data-i18n="expertise.card2.desc">Relevés...</p>

<!-- Card 3 -->
<div class="expertise-number" data-i18n="expertise.card3.number">N° 06 001</div>
<h3 class="expertise-card-title" data-i18n-html="expertise.card3.title">Infrastructures<br>routières</h3>
<p class="expertise-card-desc" data-i18n="expertise.card3.desc">Études...</p>
```

### Team Section
```html
<div class="section-tag" data-i18n="team.tag">Notre Équipe</div>
<h2 class="section-title" data-i18n="team.title">Des experts...</h2>
<p data-i18n="team.subtitle">Une équipe...</p>
<span data-i18n="team.see-more">Voir toute l'équipe</span>
```

### Projects Section
```html
<div class="section-tag" data-i18n="projects.tag">Portfolio</div>
<h2 class="section-title" data-i18n="projects.title">Réalisations</h2>
<p data-i18n="projects.subtitle">Découvrez...</p>
```

### FAQ Section
```html
<span class="sec-idx">07 / <span data-i18n="faq.tag">FAQ</span></span>
<h2 class="sec-title">
    <span data-i18n="faq.title">Questions</span>
    <em data-i18n="faq.title.accent">fréquentes</em>
</h2>
<p data-i18n-html="faq.subtitle">Vous avez un projet...</p>
<a href="#contact" data-i18n-html="faq.contact">Contacter DYG-BTP...</a>
```

### Contact Section
```html
<span class="section-tag" data-i18n="contact.tag">Contact</span>
<span class="sec-kicker" data-i18n="contact.kicker">Parlons-en</span>
<h2 class="section-title">
    <span data-i18n="contact.title">Donnons vie à votre</span>
    <em data-i18n="contact.title.accent">projet</em>
</h2>

<div class="ci-label" data-i18n="contact.address">Adresse</div>
<div class="ci-label" data-i18n="contact.phone">Téléphone & WhatsApp</div>
<div class="ci-label" data-i18n="contact.email">Email</div>
<div class="ci-label" data-i18n="contact.web">Site web & itinéraire</div>

<!-- Formulaire -->
<h3 data-i18n="contact.form.title">Soumettre une demande</h3>
<p class="form-subtitle" data-i18n="contact.form.subtitle">Décrivez...</p>

<label for="cf-prenom" data-i18n="contact.form.firstname">Prénom</label>
<input id="cf-prenom" type="text" data-i18n="contact.form.placeholder.firstname" placeholder="Votre prénom">

<!-- etc pour tous les champs -->

<span data-i18n="contact.form.privacy">En soumettant...</span>
<span data-i18n="contact.form.submit">Envoyer la demande</span>
```

### Career Section
```html
<span class="section-tag" data-i18n="career.tag">Carrière · DYG-BTP</span>
<h2>
    <span data-i18n="career.title">Construire l'avenir,</span>
    <em data-i18n="career.title.accent">avec vous</em>
</h2>
<p data-i18n-html="career.subtitle">Ingénieurs, techniciens...</p>
<span data-i18n="career.btn">Découvrir nos opportunités</span>
```

### Footer
```html
<h5 data-i18n="footer.domains">Nos Domaines</h5>
<h5 data-i18n="footer.company">L'Entreprise</h5>
<h5 data-i18n="footer.services">Nos Services</h5>
<h5 data-i18n="footer.contact">Contactez-nous</h5>

<p data-i18n-html="footer.desc">Ingénieurs Conseils...</p>
<div class="footer-copy" data-i18n-html="footer.copyright">© 2025 DYG-BTP...</div>

<a href="#mentions" data-i18n="footer.legal">Mentions légales</a>
<a href="#confidentialite" data-i18n="footer.privacy">Politique de confidentialité</a>
```

## 🚀 Commande pour tester
Après ajout, rafraîchir avec **Ctrl + Shift + R** et cliquer sur FR/EN !
