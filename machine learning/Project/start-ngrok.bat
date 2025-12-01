@echo off
echo ========================================
echo Starting ML Service with Ngrok
echo ========================================
echo.

REM Check if ngrok is installed
where ngrok >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Ngrok tidak ditemukan!
    echo.
    echo Install ngrok:
    echo 1. Download dari: https://ngrok.com/download
    echo 2. Atau install via npm: npm install -g ngrok
    echo.
    pause
    exit /b 1
)

echo [INFO] Starting ML service...
start "ML Service" cmd /k "cd /d %~dp0 && python ml_api_service.py"

echo [INFO] Waiting for ML service to start...
timeout /t 5 /nobreak >nul

echo [INFO] Starting ngrok tunnel...
echo.
echo ========================================
echo Ngrok URL akan muncul di window baru
echo ========================================
echo.
echo Copy URL dari window "Ngrok" dan update:
echo - VITE_ML_API_BASE_URL di Vercel
echo.
start "Ngrok Tunnel" cmd /k "ngrok http 5000"

echo.
echo ML Service running at: http://localhost:5000
echo Ngrok tunnel starting...
echo.
echo Press any key to stop all services...
pause >nul

REM Kill processes
taskkill /FI "WINDOWTITLE eq ML Service*" /T /F >nul 2>&1
taskkill /FI "WINDOWTITLE eq Ngrok Tunnel*" /T /F >nul 2>&1
taskkill /F /IM python.exe >nul 2>&1
taskkill /F /IM ngrok.exe >nul 2>&1

echo.
echo All services stopped.
pause

