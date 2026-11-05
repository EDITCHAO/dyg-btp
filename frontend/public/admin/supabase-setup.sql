-- ============================================================
-- DYG-BTP — Configuration Base de Données Supabase
-- Exécuter dans l'éditeur SQL de Supabase : https://supabase.com
-- Project Settings > SQL Editor > New Query
-- ============================================================

-- ============================================================
-- 1. EXTENSIONS
-- ============================================================
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================
-- 2. TABLE : devis
-- Reçoit les demandes de devis depuis le formulaire du site
-- ============================================================
CREATE TABLE IF NOT EXISTS public.devis (
  id          UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  nom         TEXT,
  email       TEXT,
  tel         TEXT,
  prestation  TEXT,
  domaine     TEXT,
  message     TEXT,
  statut      TEXT NOT NULL DEFAULT 'nouveau' CHECK (statut IN ('nouveau','en_cours','traite','archive')),
  source      TEXT DEFAULT 'formulaire_site',
  date        TIMESTAMPTZ DEFAULT NOW(),
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

COMMENT ON TABLE public.devis IS 'Demandes de devis reçues via le formulaire institutionnel DYG-BTP';

-- ============================================================
-- 3. TABLE : messages
-- Messages du formulaire de contact
-- ============================================================
CREATE TABLE IF NOT EXISTS public.messages (
  id          UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  nom         TEXT,
  email       TEXT,
  message     TEXT,
  statut      TEXT NOT NULL DEFAULT 'nouveau' CHECK (statut IN ('nouveau','lu','archive')),
  source      TEXT DEFAULT 'formulaire_site',
  date        TIMESTAMPTZ DEFAULT NOW(),
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

COMMENT ON TABLE public.messages IS 'Messages de contact reçus depuis le site DYG-BTP';

-- ============================================================
-- 4. TABLE : candidatures
-- Candidatures et dépôts de CV depuis la page Carrière
-- ============================================================
CREATE TABLE IF NOT EXISTS public.candidatures (
  id            UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  nom           TEXT,
  email         TEXT,
  tel           TEXT,
  poste         TEXT,          -- Poste ciblé ou opportunité sélectionnée
  opportunite   TEXT,          -- Opportunité cochée dans le formulaire
  message       TEXT,          -- Lettre de motivation
  cv_filename   TEXT,          -- Nom du fichier CV (stockage local ou URL)
  cv_url        TEXT,          -- URL du CV si stocké dans Supabase Storage
  statut        TEXT NOT NULL DEFAULT 'nouveau' CHECK (statut IN ('nouveau','en_etude','retenu','refuse','archive')),
  source        TEXT DEFAULT 'formulaire_site',
  date          TIMESTAMPTZ DEFAULT NOW(),
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

COMMENT ON TABLE public.candidatures IS 'Candidatures et dépôts de CV depuis la page Carrière DYG-BTP';

-- ============================================================
-- 5. TABLE : logs
-- Journal des actions administratives
-- ============================================================
CREATE TABLE IF NOT EXISTS public.logs (
  id        BIGSERIAL PRIMARY KEY,
  date      TIMESTAMPTZ DEFAULT NOW(),
  action    TEXT NOT NULL,
  "user"    TEXT DEFAULT 'Administrateur',
  ip        TEXT,
  details   JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

COMMENT ON TABLE public.logs IS 'Journal de sécurité et actions administratives DYG-BTP';

-- ============================================================
-- 6. INDEXES (performance)
-- ============================================================
CREATE INDEX IF NOT EXISTS idx_devis_statut    ON public.devis(statut);
CREATE INDEX IF NOT EXISTS idx_devis_date      ON public.devis(date DESC);
CREATE INDEX IF NOT EXISTS idx_devis_email     ON public.devis(email);

CREATE INDEX IF NOT EXISTS idx_messages_statut ON public.messages(statut);
CREATE INDEX IF NOT EXISTS idx_messages_date   ON public.messages(date DESC);

CREATE INDEX IF NOT EXISTS idx_cand_statut     ON public.candidatures(statut);
CREATE INDEX IF NOT EXISTS idx_cand_date       ON public.candidatures(date DESC);

CREATE INDEX IF NOT EXISTS idx_logs_date       ON public.logs(date DESC);

-- ============================================================
-- 7. ROW LEVEL SECURITY (RLS)
-- ============================================================
-- Activer RLS sur toutes les tables
ALTER TABLE public.devis          ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages       ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.candidatures   ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.logs           ENABLE ROW LEVEL SECURITY;

-- Politique INSERT : le public (site web) peut insérer des nouvelles entrées
-- Politique SELECT/UPDATE/DELETE : réservées aux utilisateurs authentifiés (admin)

-- Devis
CREATE POLICY "public_insert_devis"
  ON public.devis FOR INSERT
  WITH CHECK (true);

CREATE POLICY "admin_select_devis"
  ON public.devis FOR SELECT
  USING (auth.role() = 'authenticated');

CREATE POLICY "admin_update_devis"
  ON public.devis FOR UPDATE
  USING (auth.role() = 'authenticated');

CREATE POLICY "admin_delete_devis"
  ON public.devis FOR DELETE
  USING (auth.role() = 'authenticated');

-- Messages
CREATE POLICY "public_insert_messages"
  ON public.messages FOR INSERT
  WITH CHECK (true);

CREATE POLICY "admin_select_messages"
  ON public.messages FOR SELECT
  USING (auth.role() = 'authenticated');

CREATE POLICY "admin_update_messages"
  ON public.messages FOR UPDATE
  USING (auth.role() = 'authenticated');

-- Candidatures
CREATE POLICY "public_insert_candidatures"
  ON public.candidatures FOR INSERT
  WITH CHECK (true);

CREATE POLICY "admin_select_candidatures"
  ON public.candidatures FOR SELECT
  USING (auth.role() = 'authenticated');

CREATE POLICY "admin_update_candidatures"
  ON public.candidatures FOR UPDATE
  USING (auth.role() = 'authenticated');

-- Logs
CREATE POLICY "admin_all_logs"
  ON public.logs FOR ALL
  USING (auth.role() = 'authenticated');

-- ============================================================
-- 8. VUES ADMIN (lecture rapide)
-- ============================================================
CREATE OR REPLACE VIEW public.v_dashboard AS
SELECT
  (SELECT COUNT(*) FROM public.devis WHERE statut = 'nouveau')       AS devis_nouveaux,
  (SELECT COUNT(*) FROM public.devis)                                 AS devis_total,
  (SELECT COUNT(*) FROM public.messages WHERE statut = 'nouveau')    AS messages_nouveaux,
  (SELECT COUNT(*) FROM public.messages)                              AS messages_total,
  (SELECT COUNT(*) FROM public.candidatures WHERE statut = 'nouveau') AS candidatures_nouvelles,
  (SELECT COUNT(*) FROM public.candidatures)                          AS candidatures_total;

COMMENT ON VIEW public.v_dashboard IS 'Vue synthétique pour le tableau de bord admin DYG-BTP';

-- ============================================================
-- 9. DONNÉES DE TEST (optionnel — commenter en production)
-- ============================================================
-- INSERT INTO public.devis (nom, email, tel, prestation, domaine, message) VALUES
--   ('Test Client', 'test@example.com', '+228 90 00 00 00', 'Études et Réalisation', 'Bâtiments', 'Demande de devis de test.');

-- ============================================================
-- FIN DE LA CONFIGURATION
-- ============================================================
SELECT 'DYG-BTP — Base de données configurée avec succès !' AS status;
