/**
 * DYG-BTP — Back-Office Admin
 * Gestion des demandes, messages, contenus
 */
'use strict';

// ============================================================
// NAVIGATION
// ============================================================

function go(page) {
    // Cacher toutes les pages
    document.querySelectorAll('.pg').forEach(p => p.classList.remove('on'));
    document.querySelectorAll('.ni').forEach(n => n.classList.remove('on'));

    // Afficher la page demandée
    const target = document.getElementById('pg-' + page);
    if (target) target.classList.add('on');

    // Activer le lien nav
    const navLink = document.querySelector(`[onclick="go('${page}')"]`);
    if (navLink) navLink.classList.add('on');

    // Logger l'action
    logAction('Navigation vers : ' + page);
}

// ============================================================
// DONNÉES LOCALES (localStorage)
// ============================================================

const DB = {
    get: (key) => JSON.parse(localStorage.getItem('dyg_' + key) || '[]'),
    set: (key, val) => localStorage.setItem('dyg_' + key, JSON.stringify(val)),
    add: (key, item) => {
        const arr = DB.get(key);
        arr.unshift(item);
        DB.set(key, arr);
        return item;
    }
};

// ============================================================
// DASHBOARD — KPIs
// ============================================================

function refresh() {
    const devis = DB.get('devis');
    const messages = DB.get('messages');
    const candidatures = DB.get('candidatures');

    const devisAttente = devis.filter(d => d.statut === 'nouveau').length;
    const msgNonLus = messages.filter(m => !m.lu).length;

    // KPIs
    setNum('kpi-devis', devisAttente);
    setNum('kpi-messages', msgNonLus);
    setNum('kpi-services', 0);
    setNum('kpi-candidatures', candidatures.filter(c => c.statut === 'nouveau').length);
    setNum('kpi-visiteurs', 0);

    // Badges sidebar
    setBadge('badge-devis', devisAttente);
    setBadge('badge-messages', msgNonLus);
    setBadge('badge-candidatures', candidatures.length);

    // Tableaux
    renderDevisTable('tbody-devis', devis.slice(0, 5));
    renderMessagesTable('tbody-messages', messages.slice(0, 5));

    // Date log
    const logDate = document.getElementById('log-date');
    if (logDate) logDate.textContent = new Date().toLocaleString('fr-FR');

    console.log('✅ Dashboard actualisé');
}

function setNum(id, val) {
    const el = document.getElementById(id);
    if (el) el.textContent = val;
}

function setBadge(id, val) {
    const el = document.getElementById(id);
    if (el) el.textContent = val > 0 ? val : '0';
}

// ============================================================
// RENDU TABLEAU DEVIS
// ============================================================

function renderDevisTable(tbodyId, items) {
    const tbody = document.getElementById(tbodyId);
    if (!tbody) return;

    if (!items || items.length === 0) {
        tbody.innerHTML = `
            <tr><td colspan="7" class="empty-state">
                <i class="fas fa-inbox"></i>
                <p>Aucune demande de devis pour le moment</p>
                <small>Les demandes soumises via le formulaire apparaîtront ici</small>
            </td></tr>`;
        return;
    }

    tbody.innerHTML = items.map((d, i) => `
        <tr>
            <td><strong style="color:var(--primary-light)">DV-${String(items.length - i).padStart(3, '0')}</strong></td>
            <td>${esc(d.prenom || '')} ${esc(d.nom || '')}</td>
            <td>
                <div>${esc(d.email || '')}</div>
                <small style="color:var(--text-soft)">${esc(d.telephone || '')}</small>
            </td>
            <td>${esc(d.prestation || '-')}</td>
            <td><small>${formatDate(d.date)}</small></td>
            <td>
                <select onchange="updateStatut('devis', ${i}, this.value)" style="font-size:.75rem;padding:.2rem .4rem;border:1px solid var(--border);border-radius:4px">
                    <option value="nouveau"  ${d.statut==='nouveau'  ? 'selected':''}>Nouveau</option>
                    <option value="en-cours" ${d.statut==='en-cours' ? 'selected':''}>En cours</option>
                    <option value="traite"   ${d.statut==='traite'   ? 'selected':''}>Traité</option>
                    <option value="archive"  ${d.statut==='archive'  ? 'selected':''}>Archivé</option>
                </select>
            </td>
            <td>
                <button class="btn-edit" onclick="showDevisDetail(${i})">
                    <i class="fas fa-eye"></i> Détails
                </button>
                <button class="btn-delete" onclick="deleteDevis(${i})">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        </tr>
    `).join('');
}

function renderMessagesTable(tbodyId, items) {
    const tbody = document.getElementById(tbodyId);
    if (!tbody) return;

    if (!items || items.length === 0) {
        tbody.innerHTML = `
            <tr><td colspan="6" class="empty-state">
                <i class="fas fa-envelope-open"></i>
                <p>Aucun message reçu pour le moment</p>
            </td></tr>`;
        return;
    }

    tbody.innerHTML = items.map((m, i) => `
        <tr>
            <td>${esc(m.prenom || '')} ${esc(m.nom || '')}</td>
            <td>${esc(m.email || '')}</td>
            <td>${esc((m.message || '').substring(0, 60))}${m.message && m.message.length > 60 ? '...' : ''}</td>
            <td><small>${formatDate(m.date)}</small></td>
            <td><span class="badge-status ${m.lu ? 'green' : 'orange'}">${m.lu ? 'Lu' : 'Non lu'}</span></td>
            <td>
                <button class="btn-edit" onclick="markAsRead('messages', ${i})">
                    <i class="fas fa-check"></i>
                </button>
                <button class="btn-delete" onclick="deleteMsg('messages', ${i})">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        </tr>
    `).join('');
}

// ============================================================
// ACTIONS
// ============================================================

function updateStatut(key, index, newStatut) {
    const arr = DB.get(key);
    if (arr[index]) {
        arr[index].statut = newStatut;
        DB.set(key, arr);
        refresh();
        logAction(`Statut ${key} mis à jour : ${newStatut}`);
    }
}

function deleteDevis(index) {
    if (!confirm('Supprimer cette demande ?')) return;
    const arr = DB.get('devis');
    arr.splice(index, 1);
    DB.set('devis', arr);
    refresh();
    logAction('Demande de devis supprimée');
}

function deleteMsg(key, index) {
    if (!confirm('Supprimer ce message ?')) return;
    const arr = DB.get(key);
    arr.splice(index, 1);
    DB.set(key, arr);
    refresh();
}

function markAsRead(key, index) {
    const arr = DB.get(key);
    if (arr[index]) {
        arr[index].lu = true;
        DB.set(key, arr);
        refresh();
    }
}

function showDevisDetail(index) {
    const arr = DB.get('devis');
    const d = arr[index];
    if (!d) return;

    document.getElementById('modal-title').textContent = `Demande DV-${String(arr.length - index).padStart(3, '0')}`;
    document.getElementById('modal-statut').value = d.statut || 'nouveau';
    document.getElementById('modal-body').innerHTML = `
        <div class="detail-row"><span class="detail-label">Prénom</span><span class="detail-val">${esc(d.prenom || '-')}</span></div>
        <div class="detail-row"><span class="detail-label">Nom</span><span class="detail-val">${esc(d.nom || '-')}</span></div>
        <div class="detail-row"><span class="detail-label">Organisation</span><span class="detail-val">${esc(d.organisation || '-')}</span></div>
        <div class="detail-row"><span class="detail-label">Email</span><span class="detail-val"><a href="mailto:${esc(d.email || '')}">${esc(d.email || '-')}</a></span></div>
        <div class="detail-row"><span class="detail-label">Téléphone</span><span class="detail-val"><a href="tel:${esc(d.telephone || '')}">${esc(d.telephone || '-')}</a></span></div>
        <div class="detail-row"><span class="detail-label">Prestation</span><span class="detail-val">${esc(d.prestation || '-')}</span></div>
        <div class="detail-row"><span class="detail-label">Domaine</span><span class="detail-val">${esc(d.domaine || '-')}</span></div>
        <div class="detail-row"><span class="detail-label">Date</span><span class="detail-val">${formatDate(d.date)}</span></div>
        <div class="detail-row"><span class="detail-label">Message</span><span class="detail-val">${esc(d.message || '-')}</span></div>
    `;

    document.getElementById('modal-devis').classList.add('open');
    window._currentDevisIndex = index;
}

function saveStatut() {
    const i = window._currentDevisIndex;
    const statut = document.getElementById('modal-statut').value;
    updateStatut('devis', i, statut);
    closeModal();
}

function closeModal() {
    document.querySelectorAll('.modal').forEach(m => m.classList.remove('open'));
}

// ============================================================
// CAPTURER LE FORMULAIRE DU SITE
// ============================================================

function captureFormSubmit() {
    // Écouter les soumissions du formulaire contact sur le site principal
    window.addEventListener('message', (e) => {
        if (e.data && e.data.type === 'DYG_FORM_SUBMIT') {
            const data = e.data.payload;
            data.date = new Date().toISOString();
            data.statut = 'nouveau';
            data.lu = false;

            if (data.formType === 'devis') {
                DB.add('devis', data);
            } else {
                DB.add('messages', data);
            }
            refresh();
        }
    });
}

// ============================================================
// INJECTION DANS LE FORMULAIRE PRINCIPAL
// ============================================================

function injectFormCapture() {
    // Chercher le formulaire dans la page principale via localStorage
    // Le formulaire du site enregistre dans localStorage avec la clé dyg_submissions
    const pending = JSON.parse(localStorage.getItem('dyg_pending_submissions') || '[]');
    if (pending.length > 0) {
        pending.forEach(item => {
            item.statut = item.statut || 'nouveau';
            item.lu = false;
            DB.add(item.type === 'devis' ? 'devis' : 'messages', item);
        });
        localStorage.removeItem('dyg_pending_submissions');
        refresh();
    }
}

// ============================================================
// SYNC DONNÉES
// ============================================================

function syncData() {
    injectFormCapture();
    refresh();
    const btn = document.querySelector('.btn-sync');
    if (btn) {
        btn.innerHTML = '<i class="fas fa-check"></i> Synchronisé !';
        btn.style.background = 'rgba(34,197,94,.2)';
        setTimeout(() => {
            btn.innerHTML = '<i class="fas fa-sync-alt"></i> Sync Données';
            btn.style.background = '';
        }, 2000);
    }
}

// ============================================================
// EXPORT CSV
// ============================================================

function exportData(key) {
    const arr = DB.get(key);
    if (!arr.length) { alert('Aucune donnée à exporter'); return; }

    const headers = Object.keys(arr[0]).join(',');
    const rows = arr.map(r => Object.values(r).map(v => `"${String(v || '').replace(/"/g, '""')}"`).join(','));
    const csv = [headers, ...rows].join('\n');

    const a = document.createElement('a');
    a.href = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csv);
    a.download = `dyg-btp-${key}-${new Date().toISOString().slice(0,10)}.csv`;
    a.click();
    logAction('Export CSV : ' + key);
}

// ============================================================
// JOURNAL
// ============================================================

function logAction(action) {
    const logs = DB.get('logs');
    logs.unshift({ date: new Date().toISOString(), action, user: 'Administrateur' });
    if (logs.length > 100) logs.pop();
    DB.set('logs', logs);
}

// ============================================================
// UTILITAIRES
// ============================================================

function esc(str) {
    return String(str).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}

function formatDate(iso) {
    if (!iso) return '-';
    try {
        return new Date(iso).toLocaleString('fr-FR', {
            day: '2-digit', month: '2-digit', year: 'numeric',
            hour: '2-digit', minute: '2-digit'
        });
    } catch { return iso; }
}

function filterDevis() {
    const statut = document.getElementById('filter-statut')?.value || '';
    const search = (document.getElementById('filter-search')?.value || '').toLowerCase();
    let arr = DB.get('devis');

    if (statut) arr = arr.filter(d => d.statut === statut);
    if (search) arr = arr.filter(d =>
        (d.prenom + d.nom + d.email + d.prestation).toLowerCase().includes(search)
    );
    renderDevisTable('tbody-devis-full', arr);
}

function addProject() { alert('Fonctionnalité : Ajouter un projet réalisation'); }
function addTemoignage() { alert('Fonctionnalité : Ajouter un témoignage'); }

// ============================================================
// INIT
// ============================================================

document.addEventListener('DOMContentLoaded', () => {
    // Date dans journal
    const logDate = document.getElementById('log-date');
    if (logDate) logDate.textContent = new Date().toLocaleString('fr-FR');

    // Sync et refresh
    injectFormCapture();
    refresh();

    // Fermer modal en cliquant dehors
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });
    });

    // Écouter les nouvelles soumissions
    window.addEventListener('storage', (e) => {
        if (e.key === 'dyg_pending_submissions') {
            injectFormCapture();
        }
    });

    console.log('✅ DYG-BTP Back-Office initialisé');
});

