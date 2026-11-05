/**
 * DYG-BTP — Back-Office Admin
 * Tous les boutons connectés au site + Supabase
 */
'use strict';

// ============================================================
// DONNÉES SITE — contenu réel synchronisé
// ============================================================

const SITE_DATA = {
    pages: [
        { nom: 'Accueil',              url: '../index.html',                   statut: 'publié' },
        { nom: 'À propos',             url: '../apropos.html',                  statut: 'publié' },
        { nom: 'Carrière',             url: '../carriere.html',                 statut: 'publié' },
        { nom: 'Équipe Administration',url: '../equipe-administration.html',    statut: 'publié' },
        { nom: 'Équipe Travaux',       url: '../equipe-travaux.html',           statut: 'publié' },
        { nom: 'Équipe QHSE',          url: '../equipe-qhse.html',              statut: 'publié' },
    ],
    services: [
        { nom: 'Construction de Bâtiments',  icone: 'fa-building',        desc: 'Infrastructures modernes et durables.' },
        { nom: 'Travaux Publics',             icone: 'fa-road',            desc: 'Routes, ponts, réseaux d'assainissement.' },
        { nom: 'Conception Architecturale',  icone: 'fa-drafting-compass', desc: 'Plans et solutions architecturales.' },
        { nom: 'Études et Réalisation',      icone: 'fa-ruler-combined',  desc: 'Prise en charge complète des projets.' },
        { nom: 'Location d\'Engins',         icone: 'fa-truck-moving',    desc: 'Pelles, bulldozers, compacteurs.' },
        { nom: 'Topographie',                icone: 'fa-map-marked-alt',  desc: 'Relevés topographiques de précision.' },
        { nom: 'Travaux d\'Assainissement',  icone: 'fa-water',           desc: 'Réseaux d\'assainissement et drainage.' },
        { nom: 'Hydraulique',                icone: 'fa-tint',            desc: 'Ouvrages hydrauliques et gestion de l\'eau.' },
    ],
    realisations: [
        { titre: 'Pont Autoroutier',      cat: 'Infrastructure', img: '../images/projet-pont.jfif' },
        { titre: 'Immeuble Commercial',   cat: 'Bâtiment',       img: '../images/projet-immeuble.jfif' },
        { titre: 'Autoroute Urbaine',     cat: 'Route',          img: '../images/projet-autoroute.jfif' },
        { titre: 'Résidence Hôtelière',   cat: 'Bâtiment',       img: '../images/hero-batiment.jfif' },
        { titre: 'Infrastructure Routière', cat: 'Route',         img: '../images/hero-route.jfif' },
        { titre: 'Ouvrage d\'Art',        cat: 'Infrastructure', img: '../images/hero-construction-pont.jfif' },
    ],
    temoignages: [
        { nom: 'Kofi Mensah',    role: 'Promoteur immobilier, Lomé',        note: 5, texte: 'DYG-BTP a réalisé notre immeuble commercial dans les délais et avec une qualité remarquable.',            statut: 'publié' },
        { nom: 'Afi Dossou',     role: 'Responsable Travaux, Mairie d\'Agoe', note: 5, texte: 'Un partenaire de confiance pour la réhabilitation d\'une route communale.',                              statut: 'publié' },
        { nom: 'Yao Koffi',      role: 'Directeur Technique, BTP Invest',   note: 5, texte: 'La prestation de DYG-BTP en topographie a été irréprochable. Précision, réactivité et sens du détail.', statut: 'publié' },
        { nom: 'Aïcha Ouédraogo', role: 'Chef de projet, ONG Eau & Vie',    note: 5, texte: 'Notre réseau d\'assainissement a été conçu avec un soin exceptionnel.',                                   statut: 'publié' },
    ],
    equipes: [
        { nom: 'Administration', desc: 'Gestion et suivi administratif des projets.', img: '../images/equipe-administration.jfif', page: '../equipe-administration.html' },
        { nom: 'Travaux',        desc: 'Expertise technique et rigueur opérationnelle.', img: '../images/equipe-travaux.jpeg',         page: '../equipe-travaux.html' },
        { nom: 'QHSE',           desc: 'Hygiène, Santé, Sécurité et Environnement.',   img: '../images/equipe-qhse.jpg',              page: '../equipe-qhse.html' },
    ],
    medias: [
        '../images/projet-pont.jfif',
        '../images/projet-immeuble.jfif',
        '../images/projet-autoroute.jfif',
        '../images/domaine-batiments.jfif',
        '../images/domaine-routes.jfif',
        '../images/domaine-topographie.jfif',
        '../images/hero-route.jfif',
        '../images/hero-batiment.jfif',
        '../images/hero-construction-pont.jfif',
        '../images/about-equipe.jpeg',
        '../images/about-chantier.jpeg',
        '../images/equipe-administration.jfif',
        '../images/equipe-travaux.jpeg',
        '../images/equipe-qhse.jpg',
    ]
};

// ============================================================
// NAVIGATION
// ============================================================

function go(page) {
    document.querySelectorAll('.pg').forEach(p => p.classList.remove('on'));
    document.querySelectorAll('.ni').forEach(n => n.classList.remove('on'));

    const target = document.getElementById('pg-' + page);
    if (target) target.classList.add('on');

    const btn = document.querySelector(`[onclick="go('${page}')"]`);
    if (btn) btn.classList.add('on');

    // Rendre la page selon son type
    renderPage(page);
    logAction('Navigation : ' + page);
}

function renderPage(page) {
    switch(page) {
        case 'dashboard':    renderDashboard();    break;
        case 'pages':        renderPages();        break;
        case 'realisations': renderRealisations(); break;
        case 'services':     renderServices();     break;
        case 'temoignages':  renderTemoignages();  break;
        case 'equipes':      renderEquipes();      break;
        case 'mediatheque':  renderMediatheque();  break;
        case 'devis':        renderDevis();        break;
        case 'messages':     renderMessages();     break;
        case 'candidatures': renderCandidatures(); break;
        case 'journal':      renderJournal();      break;
        case 'seo':          renderSEO();          break;
    }
}

// ============================================================
// DASHBOARD
// ============================================================

async function renderDashboard() {
    const devis = await getData('devis');
    const msgs  = await getData('messages');
    const cands = await getData('candidatures');

    const devisAttente = devis.filter(d => d.statut === 'nouveau').length;
    const msgNonLus    = msgs.filter(m => !m.lu).length;
    const candNouv     = cands.filter(c => c.statut === 'nouveau').length;

    setTxt('kn-d', devisAttente);
    setTxt('kn-m', msgNonLus);
    setTxt('kn-s', 0);
    setTxt('kn-c', candNouv);
    setTxt('kn-v', '—');

    setBadge('bdg-d', devisAttente);
    setBadge('bdg-m', msgNonLus);
    setBadge('bdg-c', candNouv);

    renderTableDevis('tb-d', devis.slice(0, 5));
    renderTableMessages('tb-m', msgs.slice(0, 5));

    const jd = document.getElementById('jd');
    if (jd) jd.textContent = new Date().toLocaleString('fr-FR');
}

function refresh() { renderDashboard(); }

// ============================================================
// PAGES STATIQUES
// ============================================================

function renderPages() {
    const tbody = document.getElementById('tb-pages');
    if (!tbody) return;
    tbody.innerHTML = SITE_DATA.pages.map(p => `
        <tr>
            <td><i class="fas fa-file-alt" style="color:#2c5f7f;margin-right:.4rem"></i>${esc(p.nom)}</td>
            <td style="color:#888;font-size:.8rem">${esc(p.url.replace('..',''))}</td>
            <td><span class="st gn">Publié</span></td>
            <td>
                <a href="${p.url}" target="_blank" class="btn-ed"><i class="fas fa-eye"></i> Voir</a>
            </td>
        </tr>
    `).join('');
}

// ============================================================
// RÉALISATIONS
// ============================================================

function renderRealisations() {
    const grid = document.getElementById('real-grid');
    if (!grid) return;
    grid.innerHTML = SITE_DATA.realisations.map((r, i) => `
        <div class="cc">
            <img src="${r.img}" alt="${esc(r.titre)}" onerror="this.style.background='#e8edf2';this.src=''">
            <div class="cc-b">
                <span class="tg-ct">${esc(r.cat)}</span>
                <h3>${esc(r.titre)}</h3>
                <div class="acts">
                    <button class="btn-ed" onclick="editRealisation(${i})"><i class="fas fa-edit"></i> Modifier</button>
                    <button class="btn-dl" onclick="deleteItem('realisations',${i})"><i class="fas fa-trash"></i></button>
                </div>
            </div>
        </div>
    `).join('') + `
        <div class="cc-add" onclick="addRealisation()">
            <i class="fas fa-plus" style="font-size:2rem;opacity:.35;margin-bottom:.5rem"></i>
            <p>Ajouter un projet</p>
        </div>
    `;
}

// ============================================================
// SERVICES
// ============================================================

function renderServices() {
    const tbody = document.getElementById('tb-services');
    if (!tbody) return;
    tbody.innerHTML = SITE_DATA.services.map((s, i) => `
        <tr>
            <td>${i + 1}</td>
            <td><i class="fas ${s.icone}" style="color:#2c5f7f"></i></td>
            <td><strong>${esc(s.nom)}</strong></td>
            <td style="color:#666">${esc(s.desc)}</td>
            <td><span class="st gn">Actif</span></td>
            <td><button class="btn-ed" onclick="editService(${i})"><i class="fas fa-edit"></i></button></td>
        </tr>
    `).join('');
}

// ============================================================
// TÉMOIGNAGES
// ============================================================

function renderTemoignages() {
    const tbody = document.getElementById('tb-temo');
    if (!tbody) return;
    const temos = JSON.parse(localStorage.getItem('dyg_temoignages') || JSON.stringify(SITE_DATA.temoignages));
    tbody.innerHTML = temos.map((t, i) => `
        <tr>
            <td><strong>${esc(t.nom)}</strong></td>
            <td style="color:#666;font-size:.82rem">${esc(t.role)}</td>
            <td style="font-size:.82rem">${esc(t.texte.substring(0,80))}...</td>
            <td>${'⭐'.repeat(t.note)}</td>
            <td><span class="st gn">${esc(t.statut || 'publié')}</span></td>
            <td>
                <button class="btn-ed" onclick="editTemoignage(${i})"><i class="fas fa-edit"></i></button>
                <button class="btn-dl" onclick="deleteTemoignage(${i})"><i class="fas fa-trash"></i></button>
            </td>
        </tr>
    `).join('');
}

// ============================================================
// ÉQUIPES
// ============================================================

function renderEquipes() {
    const tbody = document.getElementById('tb-equipes');
    if (!tbody) return;
    tbody.innerHTML = SITE_DATA.equipes.map((e, i) => `
        <tr>
            <td><img src="${e.img}" style="width:50px;height:40px;object-fit:cover;border-radius:6px" onerror="this.style.display='none'"></td>
            <td><strong>${esc(e.nom)}</strong></td>
            <td style="color:#666;font-size:.82rem">${esc(e.desc)}</td>
            <td>
                <a href="${e.page}" target="_blank" class="btn-ed"><i class="fas fa-eye"></i> Voir</a>
            </td>
        </tr>
    `).join('');
}

// ============================================================
// MÉDIATHÈQUE
// ============================================================

function renderMediatheque() {
    const grid = document.getElementById('media-grid');
    if (!grid) return;
    grid.innerHTML = SITE_DATA.medias.map(src => `
        <div class="mi" onclick="previewMedia('${src}')">
            <img src="${src}" alt="" onerror="this.parentElement.style.display='none'">
            <span>${src.split('/').pop()}</span>
        </div>
    `).join('');
}

function previewMedia(src) {
    window.open(src, '_blank');
}

// ============================================================
// DEVIS
// ============================================================

async function renderDevis(items) {
    if (!items) items = await getData('devis');
    const tbody = document.getElementById('tb-d2');
    if (!tbody) return;
    renderTableDevis('tb-d2', items, true);
}

function renderTableDevis(tbodyId, items, full) {
    const tbody = document.getElementById(tbodyId);
    if (!tbody) return;

    if (!items || items.length === 0) {
        tbody.innerHTML = `<tr><td colspan="${full ? 9 : 7}" class="es"><i class="fas fa-inbox"></i><p>Aucune demande pour le moment</p><small>Les soumissions du formulaire apparaîtront ici</small></td></tr>`;
        return;
    }

    tbody.innerHTML = items.map((d, i) => `
        <tr>
            <td><strong style="color:#2c5f7f">DV-${String(i+1).padStart(3,'0')}</strong></td>
            <td>${esc(d.prenom||'')} ${esc(d.nom||'')}</td>
            <td><div>${esc(d.email||'')}</div><small style="color:#888">${esc(d.telephone||'')}</small></td>
            ${full ? `<td>${esc(d.telephone||'-')}</td>` : ''}
            <td>${esc(d.prestation||'-')}</td>
            ${full ? `<td>${esc(d.domaine||'-')}</td>` : ''}
            <td><small>${fmtDate(d.created_at||d.date)}</small></td>
            <td>
                <select onchange="changeStatut('devis','${d.id||d.created_at}',this.value)" style="font-size:.73rem;padding:.2rem .4rem;border:1px solid #e0e5ec;border-radius:4px">
                    <option value="nouveau"  ${(d.statut==='nouveau')?'selected':''}>Nouveau</option>
                    <option value="en-cours" ${(d.statut==='en-cours')?'selected':''}>En cours</option>
                    <option value="traite"   ${(d.statut==='traite')?'selected':''}>Traité</option>
                    <option value="archive"  ${(d.statut==='archive')?'selected':''}>Archivé</option>
                </select>
            </td>
            <td>
                <button class="btn-ed" onclick="showDetail('devis',${i})"><i class="fas fa-eye"></i> Voir</button>
                <button class="btn-dl" onclick="deleteRecord('devis',${i})"><i class="fas fa-trash"></i></button>
            </td>
        </tr>
    `).join('');
}

// ============================================================
// MESSAGES
// ============================================================

async function renderMessages() {
    const items = await getData('messages');
    const tbody = document.getElementById('tb-msg');
    if (!tbody) return;

    if (!items || items.length === 0) {
        tbody.innerHTML = `<tr><td colspan="6" class="es"><i class="fas fa-envelope-open"></i><p>Aucun message</p></td></tr>`;
        return;
    }

    tbody.innerHTML = items.map((m, i) => `
        <tr>
            <td>${esc(m.prenom||'')} ${esc(m.nom||'')}</td>
            <td>${esc(m.email||'-')}</td>
            <td style="max-width:200px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${esc((m.message||'').substring(0,60))}...</td>
            <td><small>${fmtDate(m.created_at||m.date)}</small></td>
            <td><span class="st ${m.lu?'gn':'og'}">${m.lu?'Lu':'Non lu'}</span></td>
            <td>
                <button class="btn-ed" onclick="markRead('messages',${i})"><i class="fas fa-check"></i></button>
                <button class="btn-dl" onclick="deleteRecord('messages',${i})"><i class="fas fa-trash"></i></button>
            </td>
        </tr>
    `).join('');
}

function renderTableMessages(tbodyId, items) {
    const tbody = document.getElementById(tbodyId);
    if (!tbody) return;
    if (!items || items.length === 0) {
        tbody.innerHTML = `<tr><td colspan="6" class="es"><i class="fas fa-envelope-open"></i><p>Aucun message</p></td></tr>`;
        return;
    }
    tbody.innerHTML = items.map((m, i) => `
        <tr>
            <td>${esc(m.prenom||'')} ${esc(m.nom||'')}</td>
            <td>${esc(m.email||'-')}</td>
            <td style="max-width:200px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${esc((m.message||'').substring(0,50))}...</td>
            <td><small>${fmtDate(m.created_at||m.date)}</small></td>
            <td><span class="st ${m.lu?'gn':'og'}">${m.lu?'Lu':'Non lu'}</span></td>
            <td><button class="btn-ed" onclick="markRead('messages',${i})"><i class="fas fa-check"></i></button></td>
        </tr>
    `).join('');
}

// ============================================================
// CANDIDATURES
// ============================================================

async function renderCandidatures() {
    const items = await getData('candidatures');
    const tbody = document.getElementById('tb-cand');
    if (!tbody) return;

    if (!items || items.length === 0) {
        tbody.innerHTML = `<tr><td colspan="6" class="es"><i class="fas fa-user-graduate"></i><p>Aucune candidature</p></td></tr>`;
        return;
    }

    tbody.innerHTML = items.map((c, i) => `
        <tr>
            <td>${esc(c.prenom||'')} ${esc(c.nom||'')}</td>
            <td>${esc(c.email||'-')}</td>
            <td><strong>${esc(c.poste||'-')}</strong></td>
            <td><small>${fmtDate(c.created_at||c.date)}</small></td>
            <td>
                <select onchange="changeStatut('candidatures','${c.id||c.created_at}',this.value)" style="font-size:.73rem;padding:.2rem .4rem;border:1px solid #e0e5ec;border-radius:4px">
                    <option value="nouveau"  ${(c.statut==='nouveau')?'selected':''}>Nouveau</option>
                    <option value="en-cours" ${(c.statut==='en-cours')?'selected':''}>En cours</option>
                    <option value="retenu"   ${(c.statut==='retenu')?'selected':''}>Retenu</option>
                    <option value="refuse"   ${(c.statut==='refuse')?'selected':''}>Refusé</option>
                </select>
            </td>
            <td>
                <button class="btn-ed" onclick="showDetail('candidatures',${i})"><i class="fas fa-eye"></i></button>
                <button class="btn-dl" onclick="deleteRecord('candidatures',${i})"><i class="fas fa-trash"></i></button>
            </td>
        </tr>
    `).join('');
}

// ============================================================
// JOURNAL
// ============================================================

function renderJournal() {
    const tbody = document.getElementById('tb-j');
    if (!tbody) return;
    const logs = JSON.parse(localStorage.getItem('dyg_logs') || '[]');
    if (logs.length === 0) {
        tbody.innerHTML = `<tr><td colspan="3" class="es"><p>Aucune action enregistrée</p></td></tr>`;
        return;
    }
    tbody.innerHTML = logs.map(l => `
        <tr>
            <td><small>${fmtDate(l.created_at)}</small></td>
            <td>${esc(l.action)}</td>
            <td>${esc(l.utilisateur||'Admin')}</td>
        </tr>
    `).join('');
}

// ============================================================
// SEO
// ============================================================

function renderSEO() {
    // Champs déjà pré-remplis dans le HTML
}

function saveSEO() {
    const settings = {
        titre: document.querySelector('[name=titre]')?.value,
        description: document.querySelector('[name=description]')?.value,
        url: document.querySelector('[name=url]')?.value,
        telephone: document.querySelector('[name=telephone]')?.value,
        email: document.querySelector('[name=email_seo]')?.value,
        adresse: document.querySelector('[name=adresse]')?.value,
    };
    localStorage.setItem('dyg_seo', JSON.stringify(settings));
    logAction('SEO mis à jour');
    alert('✅ Paramètres sauvegardés');
}

// ============================================================
// ACTIONS CRUD
// ============================================================

async function changeStatut(table, id, statut) {
    const arr = JSON.parse(localStorage.getItem(`dyg_${table}`) || '[]');
    const idx = arr.findIndex(r => (r.id === id || r.created_at === id));
    if (idx !== -1) { arr[idx].statut = statut; localStorage.setItem(`dyg_${table}`, JSON.stringify(arr)); }
    if (window.DYG_DB) await window.DYG_DB.updateStatutDB(table, id, statut);
    renderDashboard();
    logAction(`Statut ${table} → ${statut}`);
}

async function markRead(table, idx) {
    const arr = JSON.parse(localStorage.getItem(`dyg_${table}`) || '[]');
    if (arr[idx]) { arr[idx].lu = true; localStorage.setItem(`dyg_${table}`, JSON.stringify(arr)); }
    renderMessages();
    renderDashboard();
}

async function deleteRecord(table, idx) {
    if (!confirm('Supprimer cet enregistrement ?')) return;
    const arr = JSON.parse(localStorage.getItem(`dyg_${table}`) || '[]');
    arr.splice(idx, 1);
    localStorage.setItem(`dyg_${table}`, JSON.stringify(arr));
    renderPage(table === 'devis' ? 'devis' : table);
    renderDashboard();
    logAction(`Suppression dans ${table}`);
}

function showDetail(table, idx) {
    const arr = JSON.parse(localStorage.getItem(`dyg_${table}`) || '[]');
    const item = arr[idx];
    if (!item) return;

    const fields = Object.entries(item)
        .filter(([k]) => !['id','created_at','lu'].includes(k))
        .map(([k, v]) => `<div class="dr"><span class="dl">${k}</span><span class="dv">${esc(String(v||'-'))}</span></div>`)
        .join('');

    document.getElementById('m-ttl').textContent = `Détail — ${table}`;
    document.getElementById('m-body').innerHTML = fields;
    document.getElementById('m-st').value = item.statut || 'nouveau';
    window._detail = { table, idx };
    document.getElementById('modal').classList.add('on');
}

function saveStatut() {
    const { table, idx } = window._detail || {};
    if (!table) return;
    const statut = document.getElementById('m-st').value;
    const arr = JSON.parse(localStorage.getItem(`dyg_${table}`) || '[]');
    if (arr[idx]) { arr[idx].statut = statut; localStorage.setItem(`dyg_${table}`, JSON.stringify(arr)); }
    closeModal();
    renderPage(table);
    renderDashboard();
}

function closeModal() { document.querySelectorAll('.modal').forEach(m => m.classList.remove('on')); }

function editRealisation(i) { alert(`Modifier "${SITE_DATA.realisations[i].titre}" — ouvrez ../index.html pour modifier directement le code.`); }
function addRealisation()   { alert('Pour ajouter un projet : ajoutez une image dans le dossier images/ puis modifiez index.html'); }
function editService(i)     { alert(`Service "${SITE_DATA.services[i].nom}" — modifiez la section #services dans index.html`); }
function editTemoignage(i)  { alert(`Témoignage de "${SITE_DATA.temoignages[i].nom}" — modifiez la section #temoignages dans index.html`); }
function deleteTemoignage(i){ if(confirm('Supprimer ?')) { SITE_DATA.temoignages.splice(i,1); renderTemoignages(); } }

// ============================================================
// FILTRAGE DEVIS
// ============================================================

async function filterDevis() {
    const statut = document.getElementById('flt-st')?.value || '';
    const search = (document.getElementById('flt-sr')?.value || '').toLowerCase();
    let arr = await getData('devis');
    if (statut) arr = arr.filter(d => d.statut === statut);
    if (search) arr = arr.filter(d => (d.prenom+d.nom+d.email+d.prestation).toLowerCase().includes(search));
    renderTableDevis('tb-d2', arr, true);
}

// ============================================================
// EXPORT CSV
// ============================================================

async function exportCSV(table) {
    const arr = await getData(table);
    if (!arr.length) { alert('Aucune donnée à exporter'); return; }
    const headers = Object.keys(arr[0]).join(',');
    const rows = arr.map(r => Object.values(r).map(v => `"${String(v||'').replace(/"/g,'""')}"`).join(','));
    const csv = [headers, ...rows].join('\n');
    const a = document.createElement('a');
    a.href = 'data:text/csv;charset=utf-8,\uFEFF' + encodeURIComponent(csv);
    a.download = `dyg-btp-${table}-${new Date().toISOString().slice(0,10)}.csv`;
    a.click();
    logAction(`Export CSV : ${table}`);
}

// ============================================================
// SYNC + SUPABASE
// ============================================================

async function syncData() {
    // Récupérer les soumissions en attente
    const pending = JSON.parse(localStorage.getItem('dyg_pending_submissions') || '[]');
    if (pending.length > 0) {
        pending.forEach(item => {
            const key = `dyg_${item.type === 'devis' ? 'devis' : 'messages'}`;
            const arr = JSON.parse(localStorage.getItem(key) || '[]');
            item.statut = item.statut || 'nouveau';
            item.lu = false;
            arr.unshift(item);
            localStorage.setItem(key, JSON.stringify(arr));
        });
        localStorage.removeItem('dyg_pending_submissions');
    }

    renderDashboard();
    logAction('Sync données');

    const btn = document.querySelector('.btn-sync');
    if (btn) {
        const orig = btn.innerHTML;
        btn.innerHTML = '<i class="fas fa-check"></i> Synchronisé !';
        btn.style.background = 'rgba(34,197,94,.25)';
        setTimeout(() => { btn.innerHTML = orig; btn.style.background = ''; }, 2000);
    }
}

// ============================================================
// DONNÉES (localStorage + Supabase)
// ============================================================

async function getData(table) {
    // Priorité Supabase si disponible
    if (window.DYG_DB) {
        try { return await window.DYG_DB.getAll(table); } catch(e) {}
    }
    return JSON.parse(localStorage.getItem(`dyg_${table}`) || '[]');
}

// ============================================================
// UTILITAIRES
// ============================================================

function setTxt(id, val) { const el = document.getElementById(id); if (el) el.textContent = val; }
function setBadge(id, val) { const el = document.getElementById(id); if (el) el.textContent = val > 0 ? val : '0'; }
function esc(s) { return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }
function fmtDate(iso) {
    if (!iso) return '-';
    try { return new Date(iso).toLocaleString('fr-FR', {day:'2-digit',month:'2-digit',year:'numeric',hour:'2-digit',minute:'2-digit'}); }
    catch { return iso; }
}
function logAction(action) {
    const logs = JSON.parse(localStorage.getItem('dyg_logs') || '[]');
    logs.unshift({ action, utilisateur: 'Administrateur', created_at: new Date().toISOString() });
    if (logs.length > 200) logs.pop();
    localStorage.setItem('dyg_logs', JSON.stringify(logs));
    if (window.DYG_DB) window.DYG_DB.logAction(action).catch(()=>{});
}

// ============================================================
// INIT
// ============================================================

document.addEventListener('DOMContentLoaded', () => {
    // Date journal
    const jd = document.getElementById('jd');
    if (jd) jd.textContent = new Date().toLocaleString('fr-FR');

    // Sync auto au démarrage
    syncData();

    // Écouter nouvelles soumissions localStorage
    window.addEventListener('storage', (e) => {
        if (e.key === 'dyg_pending_submissions' || e.key === 'dyg_devis' || e.key === 'dyg_messages') {
            renderDashboard();
        }
    });

    // Fermer modal
    document.querySelectorAll('.modal').forEach(m => {
        m.addEventListener('click', e => { if (e.target === m) closeModal(); });
    });

    logAction('Connexion au back-office');
    console.log('✅ DYG-BTP Admin initialisé');
});
