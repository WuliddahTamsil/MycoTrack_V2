@echo off
echo ========================================
echo Starting ML Service
echo ========================================
echo.

REM Kill existing Python processes
echo [1/3] Stopping existing ML services...
taskkill /F /IM python.exe >nul 2>&1
timeout /t 2 /nobreak >nul

echo [2/3] Starting ML service...
cd /d "%~dp0machine learning\Project"

echo.
echo ========================================
echo ML Service akan berjalan di:
echo   http://localhost:5000
echo   http://localhost:5000/health
echo ========================================
echo.
echo Pastikan model weights/best.pt ada!
echo.
echo Tekan CTRL+C untuk stop service
echo ========================================
echo.

python ml_api_service.py

pause

