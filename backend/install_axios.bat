@echo off
echo ========================================
echo Installing axios and form-data
echo ========================================
echo.

cd /d "%~dp0"

echo [INFO] Installing axios...
npm install axios

echo.
echo [INFO] Installing form-data...
npm install form-data

echo.
echo ========================================
echo Installation completed!
echo ========================================
echo.
echo Now RESTART your backend server:
echo   1. Stop backend (CTRL+C)
echo   2. Start again: npm start
echo.
pause

