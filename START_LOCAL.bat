@echo off
echo ========================================
echo Starting All Services Locally
echo ========================================
echo.

echo [1/3] Starting Backend...
start "Backend Server" cmd /k "cd /d %~dp0backend && npm start"

echo [2/3] Waiting 5 seconds...
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
echo ML Service: Run manually with:
echo   cd "machine learning\Project"
echo   python ml_api_service.py
echo.
echo Press any key to close this window...
pause >nul

