@echo off
cls
echo.
echo ================================================
echo    CONFIGURATION GITHUB - DYG-BTP
echo ================================================
echo.
echo Le token GitHub a expire ou n'a pas les permissions.
echo.
echo ================================================
echo    ETAPE 1 : SUPPRIMER L'ANCIEN REMOTE
echo ================================================
echo.
cd /d "c:\PROJET\dyg-BTP\DYG-BTP"
git remote remove origin
echo Remote supprime.
echo.
echo ================================================
echo    ETAPE 2 : AJOUTER LE NOUVEAU REMOTE
echo ================================================
echo.
git remote add origin https://github.com/EDITCHAO/dyg-btp.git
echo Nouveau remote ajoute.
echo.
echo ================================================
echo    ETAPE 3 : VERIFIER
echo ================================================
echo.
git remote -v
echo.
echo ================================================
echo    ETAPE 4 : POUSSER VERS GITHUB
echo ================================================
echo.
echo GitHub va vous demander vos identifiants.
echo Utilisez votre nom d'utilisateur et votre token comme mot de passe.
echo.
echo Appuyez sur une touche pour continuer...
pause > nul
echo.
git push -u origin main
echo.
if %errorlevel% equ 0 (
    echo.
    echo ================================================
    echo    SUCCES !
    echo ================================================
    echo.
    echo Verifiez : https://github.com/EDITCHAO/dyg-btp
) else (
    echo.
    echo ================================================
    echo    BESOIN D'UN NOUVEAU TOKEN
    echo ================================================
    echo.
    echo 1. Allez sur : https://github.com/settings/tokens
    echo 2. Cliquez sur "Generate new token" ^(classic^)
    echo 3. Cochez : repo ^(toutes les cases^)
    echo 4. Generez le token
    echo 5. Copiez-le
    echo 6. Reessayez ce script
)
echo.
pause
