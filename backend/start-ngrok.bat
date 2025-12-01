@echo off
echo ========================================
echo Starting Backend with Ngrok
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

echo [INFO] Starting backend server...
start "Backend Server" cmd /k "cd /d %~dp0 && npm start"

echo [INFO] Waiting for backend to start...
timeout /t 5 /nobreak >nul

echo [INFO] Starting ngrok tunnel...
echo.
echo ========================================
echo Ngrok URL akan muncul di window baru
echo ========================================
echo.
echo Copy URL dari window "Ngrok" dan update:
echo - VITE_API_BASE_URL di Vercel
echo.
start "Ngrok Tunnel" cmd /k "ngrok http 3000"

echo.
echo Backend running at: http://localhost:3000
echo Ngrok tunnel starting...
echo.
echo Press any key to stop all services...
pause >nul

REM Kill processes
taskkill /FI "WINDOWTITLE eq Backend Server*" /T /F >nul 2>&1
taskkill /FI "WINDOWTITLE eq Ngrok Tunnel*" /T /F >nul 2>&1
taskkill /F /IM node.exe >nul 2>&1
taskkill /F /IM ngrok.exe >nul 2>&1

echo.
echo All services stopped.
pause

