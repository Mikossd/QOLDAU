@echo off
title Qoldau Food - Stopping Server
echo ========================================================
echo        Qoldau Food - Shutting Down Server
echo ========================================================
echo.
echo 1. Stopping Cloudflare tunnel...
taskkill /F /IM cloudflared.exe /T >nul 2>&1

echo 2. Stopping Python web server...
taskkill /F /IM python.exe /T >nul 2>&1

echo 3. Freeing port 8000...
powershell -NoProfile -Command "Get-NetTCPConnection -LocalPort 8000 -ErrorAction SilentlyContinue | ForEach-Object { if ($_.OwningProcess -gt 0) { Stop-Process -Id $_.OwningProcess -Force -ErrorAction SilentlyContinue } }" >nul 2>&1

if exist tunnel_info.json (
    del tunnel_info.json >nul 2>&1
)

echo.
echo ========================================================
echo [SUCCESS] Server and tunnel are completely STOPPED!
echo Port 8000 is now free.
echo ========================================================
echo.
pause
