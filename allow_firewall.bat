@echo off
title Qoldau Food - Open Firewall for Phone
echo ========================================================
echo        Qoldau Food - Разрешение доступа для телефона
echo ========================================================
echo.
echo Открытие порта 8000 в Брандмауэре Windows...
echo (В появившемся окне Windows нажмите "Да" / "Разрешить")
echo.

powershell -NoProfile -Command "Start-Process cmd -ArgumentList '/c netsh advfirewall firewall add rule name=\"\"QoldauFood8000\"\" dir=in action=allow protocol=tcp localport=8000 & pause' -Verb RunAs"

echo Запрос отправлен. После подтверждения порт 8000 будет открыт.
pause

