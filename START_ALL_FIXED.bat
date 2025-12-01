@echo off
echo ========================================
echo Starting All Services - FIXED VERSION
echo ========================================
echo.

echo [1/3] Starting Backend...
start "Backend Server" cmd /k "cd /d %~dp0backend && npm start"

echo [2/3] Waiting 5 seconds for backend to start...
timeout /t 5 /nobreak >nul

echo [3/3] Starting Frontend...
start "Frontend Dev Server" cmd /k "cd /d %~dp0frontend && npm run dev"

echo.
echo ========================================
echo All services starting!
echo ========================================
echo.
echo Backend: http://localhost:3000
echo Frontend: http://localhost:5173
echo.
echo IMPORTANT:
echo 1. Pastikan environment variable VITE_API_BASE_URL TIDAK di-set di Vercel
echo 2. Buka frontend di: http://localhost:5173
echo 3. Clear browser cache: Ctrl + Shift + R
echo 4. Cek console log (F12) - harus menunjukkan localhost
echo.
echo ML Service: Run manually with:
echo   cd "machine learning\Project"
echo   python ml_api_service.py
echo.
echo Test Login:
echo   Email: wuliddahtamsilbarokah19@gmail.com
echo   Password: 12345678
echo.
echo Press any key to close this window...
pause >nul

