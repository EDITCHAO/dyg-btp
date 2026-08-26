@echo off
echo ========================================
echo  PUSH vers GitHub : dyg-btp
echo ========================================
echo.
echo Dossier : c:\PROJET\dyg-BTP\DYG-BTP
echo Repository : https://github.com/EDITCHAO/dyg-btp
echo.
cd /d "c:\PROJET\dyg-BTP\DYG-BTP"
echo.
echo Push en cours...
echo.
git push origin main
echo.
if %errorlevel% equ 0 (
    echo.
    echo ========================================
    echo  SUCCES ! Code pousse sur GitHub !
    echo ========================================
    echo.
    echo Verifiez sur : https://github.com/EDITCHAO/dyg-btp
    echo.
) else (
    echo.
    echo ========================================
    echo  ERREUR lors du push
    echo ========================================
    echo.
    echo Essayez manuellement :
    echo   1. Ouvrez PowerShell
    echo   2. cd c:\PROJET\dyg-BTP\DYG-BTP
    echo   3. git push origin main
    echo.
)
pause
