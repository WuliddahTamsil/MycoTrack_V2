@echo off
echo ==========================================
echo   MycoTrack Database Viewer
echo ==========================================
echo.

cd /d "%~dp0"

echo [1/2] Checking Node.js...
node --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Node.js tidak terinstall!
    echo Silakan install Node.js dari https://nodejs.org/
    pause
    exit /b 1
)
echo OK: Node.js terdeteksi
echo.

echo [2/2] Checking .env file...
if not exist ".env" (
    echo.
    echo WARNING: File .env tidak ditemukan!
    echo.
    echo Membuat file .env dengan default values...
    (
        echo DB_HOST=localhost
        echo DB_PORT=5432
        echo DB_NAME=mycotrack
        echo DB_USER=postgres
        echo DB_PASSWORD=postgres
    ) > .env
    echo.
    echo File .env telah dibuat dengan default values.
    echo SILAKAN EDIT FILE .env DAN GANTI DB_PASSWORD DENGAN PASSWORD POSTGRESQL ANDA!
    echo.
    pause
) else (
    echo OK: File .env ditemukan
)
echo.

echo [3/3] Starting Database Viewer...
echo.
echo ==========================================
echo   Database Viewer akan berjalan di:
echo   http://localhost:3001/db-viewer
echo ==========================================
echo.
echo Buka browser dan akses URL di atas
echo Tekan Ctrl+C untuk menghentikan
echo.

node database/viewer.js

if errorlevel 1 (
    echo.
    echo ERROR: Database Viewer gagal berjalan!
    echo.
    echo Troubleshooting:
    echo 1. Pastikan PostgreSQL sudah terinstall dan berjalan
    echo 2. Pastikan file .env sudah dikonfigurasi dengan benar
    echo 3. Pastikan database sudah dibuat (jalankan SETUP_POSTGRESQL.bat)
    echo.
    pause
    exit /b 1
)

