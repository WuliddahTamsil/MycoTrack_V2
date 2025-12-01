@echo off
echo ========================================
echo Quick Fix Backend Login
echo ========================================
echo.

echo [1] Checking if backend is running...
curl http://localhost:3000/api/health >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Backend tidak berjalan!
    echo.
    echo Jalankan backend dulu:
    echo   cd backend
    echo   npm start
    echo.
    pause
    exit /b 1
)

echo [OK] Backend berjalan di http://localhost:3000
echo.

echo [2] Testing login endpoint...
echo.

echo Test Customer Login:
curl -X POST http://localhost:3000/api/customer/login ^
  -H "Content-Type: application/json" ^
  -d "{\"email\":\"wuliddahtamsilbarokah19@gmail.com\",\"password\":\"12345678\"}"

echo.
echo.

echo Test Admin Login:
curl -X POST http://localhost:3000/api/admin/login ^
  -H "Content-Type: application/json" ^
  -d "{\"email\":\"adminmyc@gmail.com\",\"password\":\"12345678\"}"

echo.
echo.
echo ========================================
echo Jika ada error, cek:
echo 1. Backend terminal untuk error message
echo 2. File data di backend/data/
echo 3. Browser console (F12) untuk error
echo ========================================
echo.
pause

