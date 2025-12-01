@echo off
echo ==========================================
echo   PostgreSQL Setup untuk MycoTrack
echo ==========================================
echo.

cd /d "%~dp0"

echo [1/5] Checking Node.js...
node --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Node.js tidak terinstall!
    echo Silakan install Node.js dari https://nodejs.org/
    pause
    exit /b 1
)
echo OK: Node.js terdeteksi
echo.

echo [2/5] Checking dependencies...
if not exist "node_modules" (
    echo Installing dependencies...
    call npm install
    if errorlevel 1 (
        echo ERROR: Gagal install dependencies!
        pause
        exit /b 1
    )
) else (
    echo OK: Dependencies sudah terinstall
)
echo.

echo [3/5] Checking .env file...
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

echo [4/5] Creating database...
node database/create-database.js
if errorlevel 1 (
    echo.
    echo ERROR: Gagal membuat database!
    echo.
    echo Troubleshooting:
    echo 1. Pastikan PostgreSQL sudah terinstall dan berjalan
    echo 2. Cek password di file .env sesuai dengan password PostgreSQL
    echo 3. Baca POSTGRESQL_INSTALL_WINDOWS.md untuk panduan install
    echo.
    pause
    exit /b 1
)
echo.

echo [5/5] Setting up database schema...
node database/setup.js
if errorlevel 1 (
    echo.
    echo ERROR: Gagal setup schema!
    echo.
    pause
    exit /b 1
)
echo.

echo ==========================================
echo   Setup selesai!
echo ==========================================
echo.
echo Langkah selanjutnya:
echo 1. Migrasi data dari JSON: node database/migrate.js
echo 2. Test koneksi: node database/test-connection.js
echo.
pause

