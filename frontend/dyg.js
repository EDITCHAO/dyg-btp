// Données de traduction
const translations = {
    fr: {
        // Navigation
        navAccueil: "Accueil",
        navApropos: "À propos",
        navServices: "Services",
        navProjets: "Projets",
        navExpertise: "Expertise",
        navFaq: "FAQ",
        navCarriere: "Carrière",
        navContact: "Contact",
        ctaButton: "Demander un devis",
        
        // Hero
        heroTitle: "Construisons <span>l'avenir</span> ensemble",
        heroSubtitle: "Depuis 2004, DYG-BTP accompagne ses clients dans leurs projets d'infrastructure en Bâtiment, Routes, Topographie et Assainissement.",
        heroBadge1: "Ingénieurs Conseils",
        heroBadge2: "ISO 9001:2015",
        heroBadge3: "Agréé par l'État",
        heroBtnPrimary: "Nos Références",
        heroBtnSecondary: "Discuter d'un projet",
        
        // Stats
        statsLabel1: "Années d'expérience",
        statsLabel2: "Projets réalisés",
        statsLabel3: "Agréments d'État",
        
        // Domaines
        domainesTag: "Nos Domaines",
        domainesTitle: "Trois pôles, une exigence de qualité",
        domainesDesc: "Les grands domaines d'intervention de DYG-BTP",
        domaine1Title: "Bâtiments",
        domaine1Subtitle: "Ingénierie Civile • Architecture",
        domaine1Item1: "Immeubles IGH/ERP — Villas",
        domaine1Item2: "Établissements hôteliers/hospitaliers — Habitats planifiés",
        domaine1Item3: "Pôles industriels — Stades — Centres de jeux/Spectacles",
        domaine1Item4: "Infrastructures universitaire/scolaire/culturelle",
        domaine1Item5: "Terminaux de transport — Équipements",
        domaine2Title: "Infrastructures routières",
        domaine2Subtitle: "Routes • VRD",
        domaine2Item1: "Ponts & Chaussées",
        domaine2Item2: "Ouvrages de drainage/assainissement",
        domaine2Item3: "Ouvrages d'art/de franchissement",
        domaine2Item4: "Ouvrages de protection/signalisation/sécurité",
        domaine2Item5: "Postes de péage/pesage — Équipements",
        domaine3Title: "Topographie",
        domaine3Subtitle: "Relevés • Mesures • Implantations",
        domaine3Item1: "Relevés topographiques",
        domaine3Item2: "Implantations de chantiers",
        domaine3Item3: "Calculs de volumes et cubatures",
        domaine3Item4: "Contrôles de nivellement",
        domaine3Item5: "Levés de plans et bornages",
        
        // Services
        servicesTag: "Nos Services",
        servicesTitle: "Expertise en Génie Civil",
        servicesDesc: "Nous offrons une gamme complète de services pour tous vos projets d'infrastructure",
        service1Title: "Routes & Transport",
        service1Desc: "Conception et supervision de routes, autoroutes, ponts et ouvrages d'art.",
        service2Title: "Bâtiment & Construction",
        service2Desc: "Études structurelles, contrôle technique, supervision de chantiers.",
        service3Title: "Topographie",
        service3Desc: "Relevés, implantations, calculs de volumes et contrôles de nivellement.",
        service4Title: "Études & Conception",
        service4Desc: "Études techniques, plans d'exécution, calculs de structure, BIM.",
        service5Title: "Contrôle & Supervision",
        service5Desc: "Contrôle qualité, suivi de chantier, réception des travaux.",
        service6Title: "Environnement & Durabilité",
        service6Desc: "Études d'impact environnemental, constructions durables.",
        
        // Projects
        projectsTag: "Portfolio",
        projectsTitle: "Projets Réalisés",
        projectsDesc: "Découvrez quelques-uns de nos projets phares",
        project1Category: "Infrastructure",
        project1Title: "Pont Autoroutier",
        project2Category: "Bâtiment",
        project2Title: "Immeuble Commercial",
        project3Category: "Route",
        project3Title: "Autoroute Urbaine",
        
        // About
        aboutTag: "À Propos",
        aboutTitle: "Excellence et Innovation en Génie Civil",
        aboutDesc1: "DYG-BTP est une entreprise leader dans le domaine du génie civil, spécialisée dans les études, le contrôle et la supervision de projets d'infrastructure complexes.",
        aboutDesc2: "Notre équipe d'ingénieurs qualifiés et expérimentés met à votre disposition son expertise pour garantir la réussite de vos projets.",
        certBadge1: "ISO 9001",
        certBadge2: "Agréé État",
        certBadge3: "Garantie Décennale",
        
        // Team
        teamTag: "Notre Équipe",
        teamTitle: "Des experts à votre service",
        teamDesc: "Une équipe d'ingénieurs qualifiés et expérimentés",
        teamSeeMore: "Voir toute l'équipe",
        
        // Expertise Page
        expertiseTag: "L'EXIGENCE COMME RÉFÉRENCE",
        expertiseTitle: "Les domaines <span class='expertise-title-italic'>stratégiques</span>",
        expertiseSubtitle: "<strong>DYG-BTP</strong> est certifié ISO 9001:2015 en Études et Contrôle en Génie Civil.",
        expertiseCard1Number: "N° 02 001",
        expertiseCard1Title: "Bâtiments<br>Immobiliers",
        expertiseCard1Desc: "Études et contrôle d'entretien, d'aménagement, de réhabilitation et de construction de bâtiments.",
        expertiseCard2Number: "N° 04 001",
        expertiseCard2Title: "Hydraulique<br>Assainissement",
        expertiseCard2Desc: "Études et contrôle d'ouvrages hydrauliques, d'assainissement et d'adduction d'eau potable.",
        expertiseCard3Number: "N° 06 001",
        expertiseCard3Title: "Infrastructures<br>routières",
        expertiseCard3Desc: "Études et contrôle de travaux d'infrastructure routière — entretien, construction et aménagement.",
        expertiseCertText: "Arrêté interministériel n° 066 / MEF-MTP-CNEBETP — République Togolaise · 20 décembre 2011",
        expertiseCertLink1: "Notre Politique Qualité →",
        expertiseCertLink2: "Voir notre certificat ↗",
        expertiseCTA: "Besoin d'expertise pour votre projet ?",
        expertiseCTADesc: "Nos ingénieurs certifiés sont à votre disposition",
        
        // Contact CTA
        contactTitle: "Prêt à démarrer votre projet ?",
        contactDesc: "Notre équipe d'experts est à votre disposition pour étudier vos besoins",
        contactBtn: "Contactez-nous",
        
        // Footer
        footerTitle: "DYG-BTP",
        footerDesc: "Ingénieurs Conseils - Études & Contrôle<br>Spécialistes en Génie Civil depuis 2004<br>Votre partenaire de confiance.",
        footerLinks: "Liens Rapides",
        footerDomaines: "Domaines",
        footerContact: "Contact",
        footerItem1: "Accueil",
        footerItem2: "À propos",
        footerItem3: "Services",
        footerItem4: "Projets",
        footerDomaine1: "Bâtiments",
        footerDomaine2: "Infrastructures routières",
        footerDomaine3: "Topographie",
        footerAddress: "Adresse du siège",
        footerPhone: "+123 456 7890",
        footerEmail: "contact@dyg-btp.com",
        footerHours: "Lun - Ven: 8h - 18h",
        footerCopyright: "© 2024 DYG-BTP. Tous droits réservés."
    },
    en: {
        // Navigation
        navAccueil: "Home",
        navApropos: "About",
        navServices: "Services",
        navProjets: "Projects",
        navExpertise: "Expertise",
        navFaq: "FAQ",
        navCarriere: "Career",
        navContact: "Contact",
        ctaButton: "Request Quote",
        
        // Hero
        heroTitle: "Building the <span>future</span> together",
        heroSubtitle: "Since 2004, DYG-BTP accompanies its clients in their infrastructure projects in Building, Roads, Surveying and Sanitation.",
        heroBadge1: "Engineering Consultants",
        heroBadge2: "ISO 9001:2015",
        heroBadge3: "State Accredited",
        heroBtnPrimary: "Our References",
        heroBtnSecondary: "Discuss a Project",
        
        // Stats
        statsLabel1: "Years of Experience",
        statsLabel2: "Projects Completed",
        statsLabel3: "State Accreditations",
        
        // Domaines
        domainesTag: "Our Fields",
        domainesTitle: "Three pillars, one commitment to quality",
        domainesDesc: "The main areas of intervention of DYG-BTP",
        domaine1Title: "Buildings",
        domaine1Subtitle: "Civil Engineering • Architecture",
        domaine1Item1: "IGH/ERP buildings — Villas",
        domaine1Item2: "Hotel/hospital facilities — Planned housing",
        domaine1Item3: "Industrial zones — Stadiums — Games/Spectacle centers",
        domaine1Item4: "University/school/cultural infrastructure",
        domaine1Item5: "Transport terminals — Equipment",
        domaine2Title: "Road Infrastructure",
        domaine2Subtitle: "Roads • VRD",
        domaine2Item1: "Bridges & Roads",
        domaine2Item2: "Drainage/sanitation works",
        domaine2Item3: "Art structures/Farthings",
        domaine2Item4: "Protection/signaling/security works",
        domaine2Item5: "Toll/paying stations — Equipment",
        domaine3Title: "Surveying",
        domaine3Subtitle: "Surveys • Measurements • Siting",
        domaine3Item1: "Topographic surveys",
        domaine3Item2: "Construction siting",
        domaine3Item3: "Volume and cubature calculations",
        domaine3Item4: "Leveling controls",
        domaine3Item5: "Plan surveys and boundary markers",
        
        // Services
        servicesTag: "Our Services",
        servicesTitle: "Civil Engineering Expertise",
        servicesDesc: "We offer a complete range of services for all your infrastructure projects",
        service1Title: "Roads & Transport",
        service1Desc: "Design and supervision of roads, highways, bridges and structures.",
        service2Title: "Building & Construction",
        service2Desc: "Structural studies, technical control, construction supervision.",
        service3Title: "Surveying",
        service3Desc: "Surveys, siting, volume calculations and leveling controls.",
        service4Title: "Studies & Design",
        service4Desc: "Technical studies, execution plans, structural calculations, BIM.",
        service5Title: "Control & Supervision",
        service5Desc: "Quality control, construction monitoring, works reception.",
        service6Title: "Environment & Sustainability",
        service6Desc: "Environmental impact studies, sustainable construction.",
        
        // Projects
        projectsTag: "Portfolio",
        projectsTitle: "Completed Projects",
        projectsDesc: "Discover some of our flagship projects",
        project1Category: "Infrastructure",
        project1Title: "Highway Bridge",
        project2Category: "Building",
        project2Title: "Commercial Building",
        project3Category: "Road",
        project3Title: "Urban Highway",
        
        // About
        aboutTag: "About",
        aboutTitle: "Excellence and Innovation in Civil Engineering",
        aboutDesc1: "DYG-BTP is a leading company in the field of civil engineering, specializing in studies, control and supervision of complex infrastructure projects.",
        aboutDesc2: "Our team of qualified and experienced engineers puts its expertise at your disposal to ensure the success of your projects.",
        certBadge1: "ISO 9001",
        certBadge2: "State Accredited",
        certBadge3: "Decennial Guarantee",
        
        // Team
        teamTag: "Our Team",
        teamTitle: "Experts at your service",
        teamDesc: "A team of qualified and experienced engineers",
        teamSeeMore: "See all team members",
        
        // Expertise Page
        expertiseTag: "EXCELLENCE AS REFERENCE",
        expertiseTitle: "Strategic <span class='expertise-title-italic'>domains</span>",
        expertiseSubtitle: "<strong>DYG-BTP</strong> is certified ISO 9001:2015 in Studies and Control in Civil Engineering.",
        expertiseCard1Number: "N° 02 001",
        expertiseCard1Title: "Buildings<br>Real Estate",
        expertiseCard1Desc: "Studies and control of maintenance, development, rehabilitation and construction of buildings.",
        expertiseCard2Number: "N° 04 001",
        expertiseCard2Title: "Hydraulics<br>Sanitation",
        expertiseCard2Desc: "Studies and control of hydraulic works, sanitation and drinking water supply.",
        expertiseCard3Number: "N° 06 001",
        expertiseCard3Title: "Road<br>Infrastructure",
        expertiseCard3Desc: "Studies and control of road infrastructure works — maintenance, construction and development.",
        expertiseCertText: "Interministerial decree n° 066 / MEF-MTP-CNEBETP — Togolese Republic · December 20, 2011",
        expertiseCertLink1: "Our Quality Policy →",
        expertiseCertLink2: "View our certificate ↗",
        expertiseCTA: "Need expertise for your project?",
        expertiseCTADesc: "Our certified engineers are at your disposal",
        
        // Contact CTA
        contactTitle: "Ready to start your project?",
        contactDesc: "Our team of experts is at your disposal to study your needs",
        contactBtn: "Contact Us",
        
        // Footer
        footerTitle: "DYG-BTP",
        footerDesc: "Engineering Consultants - Studies & Control<br>Specialists in Civil Engineering since 2004<br>Your trusted partner.",
        footerLinks: "Quick Links",
        footerDomaines: "Fields",
        footerContact: "Contact",
        footerItem1: "Home",
        footerItem2: "About",
        footerItem3: "Services",
        footerItem4: "Projects",
        footerDomaine1: "Buildings",
        footerDomaine2: "Road Infrastructure",
        footerDomaine3: "Surveying",
        footerAddress: "Head office address",
        footerPhone: "+123 456 7890",
        footerEmail: "contact@dyg-btp.com",
        footerHours: "Mon - Fri: 8am - 6pm",
        footerCopyright: "© 2024 DYG-BTP. All rights reserved."
    }
};

// Gestion de la langue
let currentLang = 'fr';

function setLanguage(lang) {
    currentLang = lang;
    const t = translations[lang];
    
    // Navigation
    document.querySelector('.nav-links a[href="#accueil"]').textContent = t.navAccueil;
    document.querySelector('.nav-links a[href="#apropos"]').textContent = t.navApropos;
    document.querySelector('.nav-links a[href="#services"]').textContent = t.navServices;
    document.querySelector('.nav-links a[href="#projets"]').textContent = t.navProjets;
    document.querySelector('.nav-links a[href="#expertise"]').textContent = t.navExpertise;
    document.querySelector('.nav-links a[href="#faq"]').textContent = t.navFaq;
    document.querySelector('.nav-links a[href="#carriere"]').textContent = t.navCarriere;
    document.querySelector('.nav-links a[href="#contact"]').textContent = t.navContact;
    document.querySelector('.cta-button').textContent = t.ctaButton;
    
    // Hero
    document.querySelector('.hero-content h1').innerHTML = t.heroTitle;
    document.querySelector('.hero-subtitle').textContent = t.heroSubtitle;
    document.querySelector('.hero-badges .badge:nth-child(1) span').textContent = t.heroBadge1;
    document.querySelector('.hero-badges .badge:nth-child(2) span').textContent = t.heroBadge2;
    document.querySelector('.hero-badges .badge:nth-child(3) span').textContent = t.heroBadge3;
    document.querySelector('.hero-buttons .btn-primary i').nextSibling.textContent = ' ' + t.heroBtnPrimary;
    document.querySelector('.hero-buttons .btn-secondary').textContent = t.heroBtnSecondary;
    
    // Stats
    document.querySelectorAll('.stat-label')[0].textContent = t.statsLabel1;
    document.querySelectorAll('.stat-label')[1].textContent = t.statsLabel2;
    document.querySelectorAll('.stat-label')[2].textContent = t.statsLabel3;
    
    // Domaines
    document.querySelector('.domaines .section-tag').textContent = t.domainesTag;
    document.querySelector('.domaines .section-title').textContent = t.domainesTitle;
    document.querySelector('.domaines .section-header p').textContent = t.domainesDesc;
    
    // Domaine Cards
    const domaineCards = document.querySelectorAll('.domaine-card');
    if (domaineCards.length >= 3) {
        domaineCards[0].querySelector('h3').textContent = t.domaine1Title;
        domaineCards[0].querySelector('.domaine-subtitle').textContent = t.domaine1Subtitle;
        domaineCards[0].querySelectorAll('li')[0].textContent = t.domaine1Item1;
        domaineCards[0].querySelectorAll('li')[1].textContent = t.domaine1Item2;
        domaineCards[0].querySelectorAll('li')[2].textContent = t.domaine1Item3;
        domaineCards[0].querySelectorAll('li')[3].textContent = t.domaine1Item4;
        domaineCards[0].querySelectorAll('li')[4].textContent = t.domaine1Item5;
        
        domaineCards[1].querySelector('h3').textContent = t.domaine2Title;
        domaineCards[1].querySelector('.domaine-subtitle').textContent = t.domaine2Subtitle;
        domaineCards[1].querySelectorAll('li')[0].textContent = t.domaine2Item1;
        domaineCards[1].querySelectorAll('li')[1].textContent = t.domaine2Item2;
        domaineCards[1].querySelectorAll('li')[2].textContent = t.domaine2Item3;
        domaineCards[1].querySelectorAll('li')[3].textContent = t.domaine2Item4;
        domaineCards[1].querySelectorAll('li')[4].textContent = t.domaine2Item5;
        
        domaineCards[2].querySelector('h3').textContent = t.domaine3Title;
        domaineCards[2].querySelector('.domaine-subtitle').textContent = t.domaine3Subtitle;
        domaineCards[2].querySelectorAll('li')[0].textContent = t.domaine3Item1;
        domaineCards[2].querySelectorAll('li')[1].textContent = t.domaine3Item2;
        domaineCards[2].querySelectorAll('li')[2].textContent = t.domaine3Item3;
        domaineCards[2].querySelectorAll('li')[3].textContent = t.domaine3Item4;
        domaineCards[2].querySelectorAll('li')[4].textContent = t.domaine3Item5;
    }
    
    // Services
    document.querySelector('.services .section-tag').textContent = t.servicesTag;
    document.querySelector('.services .section-title').textContent = t.servicesTitle;
    document.querySelector('.services .section-header p').textContent = t.servicesDesc;
    
    const serviceCards = document.querySelectorAll('.service-card');
    if (serviceCards.length >= 6) {
        serviceCards[0].querySelector('h3').textContent = t.service1Title;
        serviceCards[0].querySelector('p').textContent = t.service1Desc;
        serviceCards[1].querySelector('h3').textContent = t.service2Title;
        serviceCards[1].querySelector('p').textContent = t.service2Desc;
        serviceCards[2].querySelector('h3').textContent = t.service3Title;
        serviceCards[2].querySelector('p').textContent = t.service3Desc;
        serviceCards[3].querySelector('h3').textContent = t.service4Title;
        serviceCards[3].querySelector('p').textContent = t.service4Desc;
        serviceCards[4].querySelector('h3').textContent = t.service5Title;
        serviceCards[4].querySelector('p').textContent = t.service5Desc;
        serviceCards[5].querySelector('h3').textContent = t.service6Title;
        serviceCards[5].querySelector('p').textContent = t.service6Desc;
    }
    
    // Projects
    document.querySelector('.projects .section-tag').textContent = t.projectsTag;
    document.querySelector('.projects .section-title').textContent = t.projectsTitle;
    document.querySelector('.projects .section-header p').textContent = t.projectsDesc;
    
    const projectCards = document.querySelectorAll('.project-card');
    if (projectCards.length >= 3) {
        projectCards[0].querySelector('.project-category').textContent = t.project1Category;
        projectCards[0].querySelector('.project-title').textContent = t.project1Title;
        projectCards[1].querySelector('.project-category').textContent = t.project2Category;
        projectCards[1].querySelector('.project-title').textContent = t.project2Title;
        projectCards[2].querySelector('.project-category').textContent = t.project3Category;
        projectCards[2].querySelector('.project-title').textContent = t.project3Title;
    }
    
    // About
    document.querySelector('.about .section-tag').textContent = t.aboutTag;
    document.querySelector('.about h2').textContent = t.aboutTitle;
    const aboutPs = document.querySelectorAll('.about-content p');
    if (aboutPs.length >= 2) {
        aboutPs[0].textContent = t.aboutDesc1;
        aboutPs[1].textContent = t.aboutDesc2;
    }
    
    const certBadges = document.querySelectorAll('.cert-badge div');
    if (certBadges.length >= 3) {
        certBadges[0].textContent = t.certBadge1;
        certBadges[1].textContent = t.certBadge2;
        certBadges[2].textContent = t.certBadge3;
    }
    
    // Team Section
    const teamSection = document.querySelector('.team .section-tag');
    if (teamSection) {
        teamSection.textContent = t.teamTag;
        document.querySelector('.team .section-title').textContent = t.teamTitle;
        document.querySelector('.team .section-header p').textContent = t.teamDesc;
        
        const teamSeeMore = document.querySelector('.btn-see-more span');
        if (teamSeeMore) {
            teamSeeMore.textContent = t.teamSeeMore;
        }
    }
    
    // Expertise Page
    const expertiseTag = document.querySelector('.expertise-tag');
    if (expertiseTag) {
        expertiseTag.textContent = t.expertiseTag;
        document.querySelector('.expertise-title').innerHTML = t.expertiseTitle;
        document.querySelector('.expertise-subtitle').innerHTML = t.expertiseSubtitle;
        
        const expertiseCards = document.querySelectorAll('.expertise-card');
        if (expertiseCards.length >= 3) {
            expertiseCards[0].querySelector('.expertise-number').textContent = t.expertiseCard1Number;
            expertiseCards[0].querySelector('.expertise-card-title').innerHTML = t.expertiseCard1Title;
            expertiseCards[0].querySelector('.expertise-card-desc').textContent = t.expertiseCard1Desc;
            
            expertiseCards[1].querySelector('.expertise-number').textContent = t.expertiseCard2Number;
            expertiseCards[1].querySelector('.expertise-card-title').innerHTML = t.expertiseCard2Title;
            expertiseCards[1].querySelector('.expertise-card-desc').textContent = t.expertiseCard2Desc;
            
            expertiseCards[2].querySelector('.expertise-number').textContent = t.expertiseCard3Number;
            expertiseCards[2].querySelector('.expertise-card-title').innerHTML = t.expertiseCard3Title;
            expertiseCards[2].querySelector('.expertise-card-desc').textContent = t.expertiseCard3Desc;
        }
        
        const certText = document.querySelector('.cert-text');
        if (certText) {
            certText.textContent = t.expertiseCertText;
        }
        
        const certLinks = document.querySelectorAll('.cert-link');
        if (certLinks.length >= 2) {
            certLinks[0].textContent = t.expertiseCertLink1;
            certLinks[1].textContent = t.expertiseCertLink2;
        }
    }
    
    // Contact CTA
    document.querySelector('.contact-cta h2').textContent = t.contactTitle;
    document.querySelector('.contact-cta p').textContent = t.contactDesc;
    document.querySelector('.contact-cta .btn-primary').innerHTML = '<i class="fas fa-envelope"></i> ' + t.contactBtn;
    
    // Footer
    document.querySelector('.footer-section:nth-child(1) h3').textContent = t.footerTitle;
    document.querySelector('.footer-section:nth-child(1) p').innerHTML = t.footerDesc;
    document.querySelector('.footer-section:nth-child(2) h3').textContent = t.footerLinks;
    document.querySelector('.footer-section:nth-child(3) h3').textContent = t.footerDomaines;
    document.querySelector('.footer-section:nth-child(4) h3').textContent = t.footerContact;
    
    const footerLinks = document.querySelectorAll('.footer-links li a');
    if (footerLinks.length >= 4) {
        footerLinks[0].textContent = t.footerItem1;
        footerLinks[1].textContent = t.footerItem2;
        footerLinks[2].textContent = t.footerItem3;
        footerLinks[3].textContent = t.footerItem4;
    }
    
    const footerDomaines = document.querySelectorAll('.footer-links li a');
    if (footerDomaines.length >= 7) {
        footerDomaines[4].textContent = t.footerDomaine1;
        footerDomaines[5].textContent = t.footerDomaine2;
        footerDomaines[6].textContent = t.footerDomaine3;
    }
    
    const footerInfo = document.querySelectorAll('.footer-section:last-child .footer-links li');
    if (footerInfo.length >= 4) {
        footerInfo[0].innerHTML = '<i class="fas fa-map-marker-alt"></i> ' + t.footerAddress;
        footerInfo[1].innerHTML = '<i class="fas fa-phone"></i> ' + t.footerPhone;
        footerInfo[2].innerHTML = '<i class="fas fa-envelope"></i> ' + t.footerEmail;
        footerInfo[3].innerHTML = '<i class="fas fa-clock"></i> ' + t.footerHours;
    }
    
    document.querySelector('.footer-bottom p').textContent = t.footerCopyright;
    
    // Update language button active state
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.lang === lang) {
            btn.classList.add('active');
        }
    });
}

// Initialisation
document.addEventListener('DOMContentLoaded', function() {
    // Gestion du changement de langue
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const lang = this.dataset.lang;
            setLanguage(lang);
        });
    });
    
    // Smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Animation on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.service-card, .project-card, .stat-item, .domaine-card').forEach(el => {
        observer.observe(el);
    });

    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        const nav = document.querySelector('nav');
        if (window.scrollY > 100) {
            nav.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
        } else {
            nav.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
        }
    });
});


// ========== Curseur Custom ==========
(function initCustomCursor() {
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorRing = document.querySelector('.cursor-ring');
    
    if (!cursorDot || !cursorRing) return;
    
    let mouseX = 0;
    let mouseY = 0;
    let dotX = 0;
    let dotY = 0;
    let ringX = 0;
    let ringY = 0;
    
    // Suivre la position de la souris
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    // Animation fluide du curseur (lerp)
    function animateCursor() {
        // Point central suit immédiatement
        dotX = mouseX;
        dotY = mouseY;
        
        // Anneau suit avec un léger délai (effet smooth)
        ringX += (mouseX - ringX) * 0.15;
        ringY += (mouseY - ringY) * 0.15;
        
        cursorDot.style.transform = `translate(${dotX}px, ${dotY}px) translate(-50%, -50%)`;
        cursorRing.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;
        
        requestAnimationFrame(animateCursor);
    }
    
    animateCursor();
    
    // Effet hover sur les éléments cliquables
    const hoverElements = document.querySelectorAll('a, button, .service-card, .project-card, .team-card, .domaine-card, .expertise-card, .nav-links a, .lang-btn, .cta-button, .btn-primary, .btn-secondary, .btn-see-more');
    
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorRing.classList.add('hover');
        });
        
        el.addEventListener('mouseleave', () => {
            cursorRing.classList.remove('hover');
        });
    });
    
    // Cacher le curseur par défaut
    document.body.style.cursor = 'none';
    hoverElements.forEach(el => {
        el.style.cursor = 'none';
    });
})();


// ========== FAQ Accordéon ==========
(function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-q');
        
        question.addEventListener('click', () => {
            // Fermer les autres items
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle l'item cliqué
            item.classList.toggle('active');
        });
    });
    
    // Ouvrir le premier item par défaut
    if (faqItems.length > 0) {
        faqItems[0].classList.add('active');
    }
})();


// ========== Formulaire de Contact ==========
(function initContactForm() {
    const form = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');
    
    if (!form) return;
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        // Afficher un message de chargement
        formStatus.textContent = 'Envoi en cours...';
        formStatus.className = 'form-status';
        formStatus.style.display = 'block';
        
        // Simuler l'envoi (à remplacer par votre vraie API)
        setTimeout(() => {
            formStatus.textContent = 'Votre message a été envoyé avec succès ! Nous vous contacterons bientôt.';
            formStatus.className = 'form-status success';
            form.reset();
            
            // Masquer le message après 5 secondes
            setTimeout(() => {
                formStatus.style.display = 'none';
            }, 5000);
        }, 1500);
        
        // Pour intégrer une vraie API, décommenter ceci :
        /*
        try {
            const response = await fetch('VOTRE_URL_API', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });
            
            if (response.ok) {
                formStatus.textContent = 'Votre message a été envoyé avec succès !';
                formStatus.className = 'form-status success';
                form.reset();
            } else {
                throw new Error('Erreur lors de l\'envoi');
            }
        } catch (error) {
            formStatus.textContent = 'Une erreur est survenue. Veuillez réessayer.';
            formStatus.className = 'form-status error';
        }
        */
    });
})();

// ========== Scroll vers le haut ==========
(function initScrollToTop() {
    const toTopBtn = document.querySelector('.to-top');
    
    if (toTopBtn) {
        toTopBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
})();


// ========== Reveal Animations (IntersectionObserver) ==========
(function initRevealAnimations() {
    const revealOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const revealObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in');
                revealObserver.unobserve(entry.target);
            }
        });
    }, revealOptions);
    
    // Observer tous les éléments avec la classe "reveal"
    document.querySelectorAll('.reveal').forEach(el => {
        revealObserver.observe(el);
    });
})();


// ========== [data-cursor] Hover Support ==========
(function initDataCursor() {
    const cursorRing = document.querySelector('.cursor-ring');
    if (!cursorRing) return;
    
    document.querySelectorAll('[data-cursor]').forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorRing.classList.add('hover');
        });
        
        el.addEventListener('mouseleave', () => {
            cursorRing.classList.remove('hover');
        });
        
        // Cacher le curseur par défaut
        el.style.cursor = 'none';
    });
})();
