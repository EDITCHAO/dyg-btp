# Script de déploiement DYG-BTP
# Exécuter avec : .\deploy.ps1

Write-Host "🚀 Déploiement DYG-BTP sur GitHub et Vercel" -ForegroundColor Cyan
Write-Host "=============================================" -ForegroundColor Cyan
Write-Host ""

# Vérifier que Git est installé
try {
    git --version | Out-Null
    Write-Host "✅ Git est installé" -ForegroundColor Green
} catch {
    Write-Host "❌ Git n'est pas installé. Installez-le depuis https://git-scm.com" -ForegroundColor Red
    exit 1
}

# Initialiser Git si nécessaire
if (-not (Test-Path .git)) {
    Write-Host ""
    Write-Host "📦 Initialisation de Git..." -ForegroundColor Yellow
    git init
    Write-Host "✅ Git initialisé" -ForegroundColor Green
} else {
    Write-Host "✅ Git déjà initialisé" -ForegroundColor Green
}

# Demander le nom d'utilisateur GitHub
Write-Host ""
Write-Host "📝 Configuration GitHub" -ForegroundColor Yellow
$githubUsername = Read-Host "Entrez votre nom d'utilisateur GitHub"

if ([string]::IsNullOrWhiteSpace($githubUsername)) {
    Write-Host "❌ Nom d'utilisateur requis !" -ForegroundColor Red
    exit 1
}

# Ajouter tous les fichiers
Write-Host ""
Write-Host "📁 Ajout des fichiers..." -ForegroundColor Yellow
git add .

# Créer le commit
Write-Host ""
$commitMessage = Read-Host "Message de commit (ou Entrée pour 'Initial commit')"
if ([string]::IsNullOrWhiteSpace($commitMessage)) {
    $commitMessage = "Initial commit - Site DYG-BTP complet"
}

git commit -m "$commitMessage"
Write-Host "✅ Commit créé" -ForegroundColor Green

# Configurer la branche main
Write-Host ""
Write-Host "🔧 Configuration de la branche main..." -ForegroundColor Yellow
git branch -M main
Write-Host "✅ Branche main configurée" -ForegroundColor Green

# Ajouter le remote GitHub
Write-Host ""
Write-Host "🔗 Configuration du dépôt GitHub..." -ForegroundColor Yellow
$repoUrl = "https://github.com/$githubUsername/dyg-btp.git"

try {
    git remote add origin $repoUrl
    Write-Host "✅ Remote GitHub configuré : $repoUrl" -ForegroundColor Green
} catch {
    Write-Host "⚠️  Remote déjà configuré" -ForegroundColor Yellow
    git remote set-url origin $repoUrl
    Write-Host "✅ Remote mis à jour" -ForegroundColor Green
}

# Instructions finales
Write-Host ""
Write-Host "=============================================" -ForegroundColor Cyan
Write-Host "📋 PROCHAINES ÉTAPES :" -ForegroundColor Cyan
Write-Host "=============================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "1️⃣  Créez un repo sur GitHub :" -ForegroundColor Yellow
Write-Host "   → Allez sur : https://github.com/new" -ForegroundColor White
Write-Host "   → Nom du repo : dyg-btp" -ForegroundColor White
Write-Host "   → Laissez toutes les cases décochées" -ForegroundColor White
Write-Host "   → Cliquez sur 'Create repository'" -ForegroundColor White
Write-Host ""
Write-Host "2️⃣  Puis exécutez cette commande pour pusher :" -ForegroundColor Yellow
Write-Host "   git push -u origin main" -ForegroundColor Green
Write-Host ""
Write-Host "3️⃣  Ensuite déployez sur Vercel :" -ForegroundColor Yellow
Write-Host "   → Allez sur : https://vercel.com" -ForegroundColor White
Write-Host "   → Connectez-vous avec GitHub" -ForegroundColor White
Write-Host "   → Cliquez sur 'New Project'" -ForegroundColor White
Write-Host "   → Importez le repo 'dyg-btp'" -ForegroundColor White
Write-Host "   → Output Directory : frontend/public" -ForegroundColor White
Write-Host "   → Cliquez sur 'Deploy'" -ForegroundColor White
Write-Host ""
Write-Host "=============================================" -ForegroundColor Cyan
Write-Host "✅ Préparation terminée !" -ForegroundColor Green
Write-Host "=============================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "📖 Guide complet : Lisez DEPLOIEMENT.md" -ForegroundColor Cyan
