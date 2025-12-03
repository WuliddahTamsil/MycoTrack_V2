@echo off
echo ========================================
echo   ML Detection Service - YOLOv5_NEW
echo ========================================
echo.

REM Navigate to ML Project folder
cd /d "D:\RPL_Kelompok 4 - NOVA\machine learning\Project"

REM Check if folder exists
if not exist "ml_api_service.py" (
    echo [ERROR] Folder tidak ditemukan!
    echo Pastikan path benar: D:\RPL_Kelompok 4 - NOVA\machine learning\Project
    pause
    exit /b 1
)

echo [OK] Folder ditemukan!
echo.

REM Check Python
python --version >nul 2>&1
if errorlevel 1 (
    echo [ERROR] Python tidak ditemukan!
    echo Silakan install Python 3.8+ terlebih dahulu
    pause
    exit /b 1
)

echo [OK] Python ditemukan
python --version
echo.

REM Check model file
echo [INFO] Memeriksa model yolov5_new...
if exist "yolov5_new\yolov5\runs\train\mushroom_custom\weights\best.pt" (
    echo [OK] Model yolov5_new ditemukan!
    echo       yolov5_new\yolov5\runs\train\mushroom_custom\weights\best.pt
) else (
    echo [WARNING] Model yolov5_new tidak ditemukan!
    echo Pastikan model sudah ada di folder tersebut
)
echo.

echo ========================================
echo   Starting ML Detection Service...
echo ========================================
echo.
echo Service akan berjalan di: http://localhost:5000
echo Health check: http://localhost:5000/health
echo.
echo IMPORTANT: Jangan tutup window ini saat menggunakan dashboard!
echo Tekan CTRL+C untuk menghentikan service
echo.
echo ========================================
echo.

python ml_api_service.py

pause

