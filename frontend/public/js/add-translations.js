/**
 * Script pour ajouter automatiquement les attributs data-i18n
 * Exécuté une seule fois au chargement
 */

document.addEventListener('DOMContentLoaded', function() {
    // Mapping des sélecteurs CSS vers les clés de traduction
    const translationMap = [
        // About Section
        { selector: '.about .section-tag', key: 'about.tag' },
        { selector: '.about h2', key: 'about.title' },
        { selector: '.about-content p:nth-of-type(1)', key: 'about.desc1', html: true },
        { selector: '.about-content p:nth-of-type(2)', key: 'about.desc2' },
        { selector: '.cert-badge:nth-child(1) div', key: 'about.cert.iso' },
        { selector: '.cert-badge:nth-child(2) div', key: 'about.cert.state' },
        { selector: '.cert-badge:nth-child(3) div', key: 'about.cert.warranty' },
        
        // Domaines Section
        { selector: '.domaines .section-tag', key: 'domains.tag' },
        { selector: '.domaines .section-title', key: 'domains.title' },
        { selector: '.domaines .section-header p', key: 'domains.subtitle' },
        
        // Domaine Cards
        { selector: '.domaine-card:nth-child(1) h3', key: 'domains.building' },
        { selector: '.domaine-card:nth-child(1) .domaine-subtitle', key: 'domains.building.sub' },
        { selector: '.domaine-card:nth-child(1) li:nth-child(1)', key: 'domains.building.item1' },
        { selector: '.domaine-card:nth-child(1) li:nth-child(2)', key: 'domains.building.item2' },
        { selector: '.domaine-card:nth-child(1) li:nth-child(3)', key: 'domains.building.item3' },
        { selector: '.domaine-card:nth-child(1) li:nth-child(4)', key: 'domains.building.item4' },
        { selector: '.domaine-card:nth-child(1) li:nth-child(5)', key: 'domains.building.item5' },
        
        { selector: '.domaine-card:nth-child(2) h3', key: 'domains.roads' },
        { selector: '.domaine-card:nth-child(2) .domaine-subtitle', key: 'domains.roads.sub' },
        { selector: '.domaine-card:nth-child(2) li:nth-child(1)', key: 'domains.roads.item1' },
        { selector: '.domaine-card:nth-child(2) li:nth-child(2)', key: 'domains.roads.item2' },
        { selector: '.domaine-card:nth-child(2) li:nth-child(3)', key: 'domains.roads.item3' },
        { selector: '.domaine-card:nth-child(2) li:nth-child(4)', key: 'domains.roads.item4' },
        { selector: '.domaine-card:nth-child(2) li:nth-child(5)', key: 'domains.roads.item5' },
        
        { selector: '.domaine-card:nth-child(3) h3', key: 'domains.topo' },
        { selector: '.domaine-card:nth-child(3) .domaine-subtitle', key: 'domains.topo.sub' },
        { selector: '.domaine-card:nth-child(3) li:nth-child(1)', key: 'domains.topo.item1' },
        { selector: '.domaine-card:nth-child(3) li:nth-child(2)', key: 'domains.topo.item2' },
        { selector: '.domaine-card:nth-child(3) li:nth-child(3)', key: 'domains.topo.item3' },
        { selector: '.domaine-card:nth-child(3) li:nth-child(4)', key: 'domains.topo.item4' },
        { selector: '.domaine-card:nth-child(3) li:nth-child(5)', key: 'domains.topo.item5' },
        
        // Services Section
        { selector: '.services .section-tag', key: 'services.tag' },
        { selector: '.services .section-title', key: 'services.title' },
        { selector: '.services .section-header p', key: 'services.subtitle' },
        
        { selector: '.service-card:nth-child(1) h3', key: 'services.roads' },
        { selector: '.service-card:nth-child(1) p', key: 'services.roads.desc' },
        { selector: '.service-card:nth-child(2) h3', key: 'services.building' },
        { selector: '.service-card:nth-child(2) p', key: 'services.building.desc' },
        { selector: '.service-card:nth-child(3) h3', key: 'services.topo' },
        { selector: '.service-card:nth-child(3) p', key: 'services.topo.desc' },
        { selector: '.service-card:nth-child(4) h3', key: 'services.studies' },
        { selector: '.service-card:nth-child(4) p', key: 'services.studies.desc' },
        { selector: '.service-card:nth-child(5) h3', key: 'services.control' },
        { selector: '.service-card:nth-child(5) p', key: 'services.control.desc' },
        { selector: '.service-card:nth-child(6) h3', key: 'services.env' },
        { selector: '.service-card:nth-child(6) p', key: 'services.env.desc' },
        
        // Expertise Section
        { selector: '.expertise-tag', key: 'expertise.tag' },
        { selector: '.expertise-title', key: 'expertise.title' },
        { selector: '.expertise-title-italic', key: 'expertise.title.accent' },
        { selector: '.expertise-subtitle', key: 'expertise.subtitle', html: true },
        
        { selector: '.expertise-card:nth-child(1) .expertise-number', key: 'expertise.card1.number' },
        { selector: '.expertise-card:nth-child(1) .expertise-card-title', key: 'expertise.card1.title', html: true },
        { selector: '.expertise-card:nth-child(1) .expertise-card-desc', key: 'expertise.card1.desc' },
        
        { selector: '.expertise-card:nth-child(2) .expertise-number', key: 'expertise.card2.number' },
        { selector: '.expertise-card:nth-child(2) .expertise-card-title', key: 'expertise.card2.title', html: true },
        { selector: '.expertise-card:nth-child(2) .expertise-card-desc', key: 'expertise.card2.desc' },
        
        { selector: '.expertise-card:nth-child(3) .expertise-number', key: 'expertise.card3.number' },
        { selector: '.expertise-card:nth-child(3) .expertise-card-title', key: 'expertise.card3.title', html: true },
        { selector: '.expertise-card:nth-child(3) .expertise-card-desc', key: 'expertise.card3.desc' },
        
        // Team Section
        { selector: '.team .section-tag', key: 'team.tag' },
        { selector: '.team .section-title', key: 'team.title' },
        { selector: '.team .section-header p', key: 'team.subtitle' },
        { selector: '.btn-see-more span', key: 'team.see-more' },
        
        // Projects Section
        { selector: '.projects .section-tag', key: 'projects.tag' },
        { selector: '.projects .section-title', key: 'projects.title' },
        { selector: '.projects .section-header p', key: 'projects.subtitle' },
        
        // FAQ Section
        { selector: '.faq .section-tag', key: 'faq.tag' },
        { selector: '.sec-title', key: 'faq.title' },
        
        // Contact Section
        { selector: '.contact-cta .section-tag', key: 'contact.tag' },
        { selector: '.sec-kicker', key: 'contact.kicker' },
        
        // Career Section
        { selector: '.career-cta .section-tag', key: 'career.tag' },
        { selector: '.career-content strong', key: 'career.btn' },
    ];
    
    // Appliquer les attributs data-i18n
    translationMap.forEach(item => {
        const elements = document.querySelectorAll(item.selector);
        elements.forEach(el => {
            if (el && !el.hasAttribute('data-i18n')) {
                el.setAttribute('data-i18n', item.key);
                if (item.html) {
                    el.setAttribute('data-i18n-html', '');
                }
            }
        });
    });
    
    console.log('✅ Attributs data-i18n ajoutés automatiquement');
    
    // Déclencher la traduction si une langue est déjà sélectionnée
    if (typeof changeLang === 'function') {
        const savedLang = localStorage.getItem('dyg-lang') || 'fr';
        changeLang(savedLang);
    }
});
