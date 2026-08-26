#!/usr/bin/env pwsh
# Script pour pousser le projet DYG-BTP vers GitHub

Write-Host "========================================" -ForegroundColor Cyan
Write-Host " PUSH vers GitHub : dyg-btp" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Aller dans le dossier du projet
Set-Location "c:\PROJET\dyg-BTP\DYG-BTP"

Write-Host "📍 Dossier actuel : $(Get-Location)" -ForegroundColor Yellow
Write-Host ""

# Vérifier le statut Git
Write-Host "📊 Vérification du statut Git..." -ForegroundColor Cyan
git status --short

Write-Host ""
Write-Host "🚀 Push vers GitHub en cours..." -ForegroundColor Cyan
Write-Host ""

# Pousser vers GitHub
try {
    git push origin main
    Write-Host ""
    Write-Host "✅ Push réussi !" -ForegroundColor Green
    Write-Host ""
    Write-Host "🌐 Votre code est maintenant sur GitHub :" -ForegroundColor Green
    Write-Host "   https://github.com/EDITCHAO/dyg-btp" -ForegroundColor Cyan
} catch {
    Write-Host ""
    Write-Host "❌ Erreur lors du push :" -ForegroundColor Red
    Write-Host $_.Exception.Message -ForegroundColor Red
    Write-Host ""
    Write-Host "💡 Essayez manuellement avec :" -ForegroundColor Yellow
    Write-Host "   cd c:\PROJET\dyg-BTP\DYG-BTP" -ForegroundColor White
    Write-Host "   git push origin main" -ForegroundColor White
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Appuyez sur une touche pour fermer..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
