# Script PowerShell pour convertir les fichiers JFIF en JPG
# Utilisation : Clic droit -> Exécuter avec PowerShell

Write-Host "========================================" -ForegroundColor Cyan
Write-Host " CONVERSION JFIF → JPG" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

$dossier = $PSScriptRoot
$fichiersJfif = Get-ChildItem -Path $dossier -Filter "*.jfif"

if ($fichiersJfif.Count -eq 0) {
    Write-Host "✓ Aucun fichier JFIF à convertir" -ForegroundColor Green
    Write-Host ""
    Write-Host "Appuyez sur une touche pour fermer..."
    $null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
    exit
}

Write-Host "Fichiers JFIF trouvés : $($fichiersJfif.Count)" -ForegroundColor Yellow
Write-Host ""

foreach ($fichier in $fichiersJfif) {
    $nomSansExtension = [System.IO.Path]::GetFileNameWithoutExtension($fichier.Name)
    $nouveauNom = "$nomSansExtension.jpg"
    $cheminSource = $fichier.FullName
    $cheminDestination = Join-Path $dossier $nouveauNom
    
    Write-Host "→ Conversion : $($fichier.Name) → $nouveauNom" -ForegroundColor Cyan
    
    try {
        # Simple copie et renommage (JFIF est essentiellement du JPG)
        Copy-Item -Path $cheminSource -Destination $cheminDestination -Force
        Write-Host "  ✓ Converti avec succès" -ForegroundColor Green
    }
    catch {
        Write-Host "  ✗ Erreur : $_" -ForegroundColor Red
    }
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host " CONVERSION TERMINÉE" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Les fichiers .jpg ont été créés." -ForegroundColor Green
Write-Host "Les fichiers .jfif originaux sont conservés." -ForegroundColor Yellow
Write-Host ""
Write-Host "Appuyez sur une touche pour fermer..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
