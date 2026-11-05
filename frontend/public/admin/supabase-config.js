/**
 * DYG-BTP — Configuration Supabase
 * 
 * INSTRUCTIONS DE CONFIGURATION :
 * 1. Créer un projet sur https://supabase.com
 * 2. Aller dans Project Settings > API
 * 3. Copier l'URL du projet et la clé anon/public
 * 4. Remplacer VOTRE_URL_SUPABASE et VOTRE_ANON_KEY ci-dessous
 * 5. Exécuter le fichier supabase-setup.sql dans l'éditeur SQL de Supabase
 * 6. Appeler initSupabase() depuis admin/index.html pour activer la sync
 */

const SUPABASE_URL = 'VOTRE_URL_SUPABASE'; // ex: https://xxxx.supabase.co
const SUPABASE_ANON_KEY = 'VOTRE_ANON_KEY'; // clé anon publique

// Client Supabase (nécessite le CDN ou npm @supabase/supabase-js)
let supabaseClient = null;

/**
 * Initialise le client Supabase.
 * Appeler après avoir configuré SUPABASE_URL et SUPABASE_ANON_KEY.
 */
function initSupabase() {
  if (typeof window.supabase === 'undefined') {
    console.warn('[DYG-BTP Supabase] SDK non chargé. Ajouter dans <head> :\n<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/dist/umd/supabase.min.js"></script>');
    return false;
  }
  if (SUPABASE_URL === 'VOTRE_URL_SUPABASE' || SUPABASE_ANON_KEY === 'VOTRE_ANON_KEY') {
    console.warn('[DYG-BTP Supabase] Configurer SUPABASE_URL et SUPABASE_ANON_KEY dans admin/supabase-config.js');
    return false;
  }
  supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  console.log('[DYG-BTP Supabase] Client initialisé.');
  return true;
}

/**
 * Sauvegarde une demande de devis dans Supabase.
 * @param {Object} data - Données du formulaire devis
 */
async function saveDevis(data) {
  // Toujours sauvegarder en localStorage en premier (fallback)
  const local = JSON.parse(localStorage.getItem('dyg_devis') || '[]');
  const entry = { ...data, date: data.date || new Date().toISOString(), statut: 'nouveau', source: 'formulaire_site' };
  local.push(entry);
  localStorage.setItem('dyg_devis', JSON.stringify(local));

  // Puis tenter Supabase si configuré
  if (!supabaseClient) return { success: false, source: 'localStorage', entry };
  try {
    const { data: row, error } = await supabaseClient.from('devis').insert([entry]).select().single();
    if (error) throw error;
    console.log('[DYG-BTP] Devis sauvegardé dans Supabase :', row.id);
    return { success: true, source: 'supabase', entry: row };
  } catch (err) {
    console.error('[DYG-BTP Supabase] Erreur devis :', err.message);
    return { success: false, source: 'localStorage', entry };
  }
}

/**
 * Sauvegarde un message de contact dans Supabase.
 * @param {Object} data - Données du formulaire de contact
 */
async function saveMessage(data) {
  const local = JSON.parse(localStorage.getItem('dyg_messages') || '[]');
  const entry = { ...data, date: data.date || new Date().toISOString(), statut: 'nouveau', source: 'formulaire_site' };
  local.push(entry);
  localStorage.setItem('dyg_messages', JSON.stringify(local));

  if (!supabaseClient) return { success: false, source: 'localStorage', entry };
  try {
    const { data: row, error } = await supabaseClient.from('messages').insert([entry]).select().single();
    if (error) throw error;
    return { success: true, source: 'supabase', entry: row };
  } catch (err) {
    console.error('[DYG-BTP Supabase] Erreur message :', err.message);
    return { success: false, source: 'localStorage', entry };
  }
}

/**
 * Sauvegarde une candidature dans Supabase.
 * @param {Object} data - Données du formulaire de candidature
 */
async function saveCandidature(data) {
  const local = JSON.parse(localStorage.getItem('dyg_candidatures') || '[]');
  const entry = { ...data, date: data.date || new Date().toISOString(), statut: 'nouveau', source: 'formulaire_site' };
  local.push(entry);
  localStorage.setItem('dyg_candidatures', JSON.stringify(local));

  if (!supabaseClient) return { success: false, source: 'localStorage', entry };
  try {
    const { data: row, error } = await supabaseClient.from('candidatures').insert([entry]).select().single();
    if (error) throw error;
    return { success: true, source: 'supabase', entry: row };
  } catch (err) {
    console.error('[DYG-BTP Supabase] Erreur candidature :', err.message);
    return { success: false, source: 'localStorage', entry };
  }
}

/**
 * Récupère toutes les entrées d'une table Supabase.
 * @param {'devis'|'messages'|'candidatures'|'logs'} table
 * @param {Object} options - { limit, orderBy, filter }
 */
async function getAll(table, options = {}) {
  if (!supabaseClient) {
    const local = JSON.parse(localStorage.getItem('dyg_' + table) || '[]');
    return { success: true, source: 'localStorage', data: local };
  }
  try {
    let query = supabaseClient.from(table).select('*');
    if (options.filter) query = query.match(options.filter);
    if (options.orderBy) query = query.order(options.orderBy, { ascending: false });
    if (options.limit) query = query.limit(options.limit);
    const { data, error } = await query;
    if (error) throw error;
    return { success: true, source: 'supabase', data };
  } catch (err) {
    console.error('[DYG-BTP Supabase] Erreur getAll :', err.message);
    const local = JSON.parse(localStorage.getItem('dyg_' + table) || '[]');
    return { success: false, source: 'localStorage', data: local };
  }
}

/**
 * Migration : copie les données localStorage vers Supabase.
 * À appeler une seule fois après avoir configuré Supabase.
 */
async function migrateLocalStorageToSupabase() {
  if (!supabaseClient) {
    console.warn('[DYG-BTP] Supabase non configuré. Migration impossible.');
    return;
  }
  const tables = ['devis', 'messages', 'candidatures'];
  for (const table of tables) {
    const local = JSON.parse(localStorage.getItem('dyg_' + table) || '[]');
    if (!local.length) continue;
    console.log(`[DYG-BTP] Migration de ${local.length} entrées (${table})...`);
    const { error } = await supabaseClient.from(table).upsert(local, { onConflict: 'id', ignoreDuplicates: true });
    if (error) {
      console.error(`[DYG-BTP] Erreur migration ${table} :`, error.message);
    } else {
      console.log(`[DYG-BTP] ${table} migré avec succès.`);
    }
  }
  console.log('[DYG-BTP] Migration terminée.');
}

// Export pour utilisation modulaire
if (typeof module !== 'undefined') {
  module.exports = { initSupabase, saveDevis, saveMessage, saveCandidature, getAll, migrateLocalStorageToSupabase };
}
