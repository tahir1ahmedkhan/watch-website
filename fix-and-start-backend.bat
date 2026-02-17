@echo off
echo ========================================
echo  Fixing Admin Login Issue
echo ========================================
echo.

echo Step 1: Killing processes on port 5000...
for /f "tokens=5" %%a in ('netstat -aon ^| find ":5000" ^| find "LISTENING"') do (
    echo Killing PID %%a
    taskkill /F /PID %%a 2>nul
)
timeout /t 2 /nobreak >nul

echo.
echo Step 2: Resetting admin password...
cd Backend
call npx ts-node src/scripts/resetAdminPassword.ts

echo.
echo Step 3: Starting backend server...
echo Server will start in a new window...
start cmd /k "npm run dev"

echo.
echo ========================================
echo  Done!
echo ========================================
echo.
echo Admin Credentials:
echo   Email: admin@watchstore.com
echo   Password: admin123
echo.
echo Admin Login URL:
echo   http://localhost:3000/admin/login
echo.
pause
