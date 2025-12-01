@echo off
echo ========================================
echo Deploy MycoTrack Frontend ke Vercel
echo ========================================
echo.

cd frontend
if not exist node_modules (
    echo Installing dependencies...
    call npm install
)

echo.
echo Building frontend...
call npm run build

echo.
echo Deploying to Vercel...
call vercel --prod

echo.
echo ========================================
echo Deployment selesai!
echo ========================================
pause

