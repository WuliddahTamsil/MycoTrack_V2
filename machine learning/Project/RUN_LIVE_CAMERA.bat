@echo off
echo ========================================
echo  DETEKSI LIVE CAMERA - JAMUR
echo ========================================
echo.

REM Change to script directory
cd /d "%~dp0"

REM Check if Python is available
python --version >nul 2>&1
if errorlevel 1 (
    echo [ERROR] Python tidak ditemukan!
    echo.
    echo Silakan install Python terlebih dahulu.
    echo Download dari: https://www.python.org/downloads/
    echo.
    pause
    exit /b 1
)

echo [INFO] Python ditemukan!
echo.

REM Check if model file exists
if not exist "yolov5_new\yolov5\runs\train\mushroom_custom\weights\best.pt" (
    echo [WARNING] Model file tidak ditemukan!
    echo.
    echo Path yang dicari:
    echo yolov5_new\yolov5\runs\train\mushroom_custom\weights\best.pt
    echo.
    echo Pastikan model sudah ada sebelum menjalankan program.
    echo.
    pause
    exit /b 1
)

echo [INFO] Model ditemukan!
echo.
echo ========================================
echo  MEMULAI DETEKSI LIVE CAMERA...
echo ========================================
echo.
echo Petunjuk:
echo - Arahkan kamera ke jamur
echo - Program akan mendeteksi secara real-time
echo - Tekan 'q' untuk keluar
echo.
echo ========================================
echo.

REM Run the detection script
python detect_jamur_pc.py

echo.
echo ========================================
echo  PROGRAM SELESAI
echo ========================================
pause

