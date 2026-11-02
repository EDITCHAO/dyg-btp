@echo off
cls
echo.
echo ================================================
echo    CHOISIR LE LOGO DYG-BTP
echo ================================================
echo.
echo Quel logo voulez-vous utiliser ?
echo.
echo 1. Logo vectoriel professionnel (SVG cree par IA)
echo    - Batiments stylises
echo    - Texte DYG BTP
echo    - Couleurs bleu marine
echo.
echo 2. Votre logo personnel (PNG/JPG)
echo    - Vous devez d'abord placer votre fichier
echo    - Dans : frontend\public\logo-dyg-btp.png
echo.
echo 3. Logo simple texte (SVG actuel)
echo    - Logo minimaliste existant
echo.
set /p choix="Entrez votre choix (1, 2 ou 3) : "

cd /d "c:\PROJET\dyg-BTP\DYG-BTP\frontend\public"

if "%choix%"=="1" (
    echo.
    echo Copie du logo vectoriel professionnel...
    copy /Y "logo-dyg-btp-pro.svg" "logo-dyg-btp.png" >nul 2>&1
    ren "logo-dyg-btp-pro.svg" "logo-temp.svg" >nul 2>&1
    ren "logo-temp.svg" "logo-dyg-btp.png" >nul 2>&1
    echo.
    echo ================================================
    echo    Logo vectoriel active !
    echo ================================================
    echo.
    echo Le logo professionnel SVG est maintenant actif.
    echo Rechargez votre navigateur : http://localhost:3000
    echo.
) else if "%choix%"=="2" (
    echo.
    if exist "logo-dyg-btp.png" (
        echo ================================================
        echo    Votre logo personnel est deja en place !
        echo ================================================
        echo.
        echo Si vous ne le voyez pas, rechargez avec Ctrl+F5
    ) else (
        echo ================================================
        echo    Votre logo n'est pas encore place
        echo ================================================
        echo.
        echo 1. Sauvegardez votre logo comme : logo-dyg-btp.png
        echo 2. Copiez-le dans : frontend\public\
        echo 3. Relancez ce script
        echo.
        echo Ou simplement :
        echo - Collez logo-dyg-btp.png ici
        echo - Rechargez le navigateur
    )
) else if "%choix%"=="3" (
    echo.
    echo ================================================
    echo    Logo simple texte conserve
    echo ================================================
    echo.
    echo Le logo SVG simple est deja actif.
    echo Aucune modification necessaire.
) else (
    echo.
    echo Choix invalide. Relancez le script.
)

echo.
pause
