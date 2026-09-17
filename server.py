#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Qoldau Food - Unified Web Server & Cloudflare HTTPS Tunnel
Launches local web server, creates secure HTTPS tunnel for mobile cameras,
and provides live dynamic connection info to the web UI.
"""

import os
import sys
import json
import time
import socket
import re
import signal
import webbrowser
import subprocess
import threading
from http.server import SimpleHTTPRequestHandler, HTTPServer

# Safe encoding for Windows consoles
if sys.platform == "win32":
    try:
        if hasattr(sys.stdout, "reconfigure"):
            sys.stdout.reconfigure(encoding="utf-8", errors="replace")
        if hasattr(sys.stderr, "reconfigure"):
            sys.stderr.reconfigure(encoding="utf-8", errors="replace")
    except Exception:
        pass

PORT = 8069
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
TUNNEL_INFO_FILE = os.path.join(BASE_DIR, "tunnel_info.json")
CLOUDFLARED_EXE = os.path.join(BASE_DIR, "cloudflared.exe")

tunnel_proc = None
server_instance = None


def get_local_ip():
    """Retrieve the primary local network IP address."""
    try:
        s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        s.connect(("8.8.8.8", 80))
        ip = s.getsockname()[0]
        s.close()
        return ip
    except Exception:
        return "127.0.0.1"


class CustomHTTPRequestHandler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=BASE_DIR, **kwargs)

    def end_headers(self):
        # Disable caching so mobile phones always get the latest code instantly
        if self.path.endswith((".js", ".css", ".html", ".json", "/")) or "?" in self.path:
            self.send_header("Cache-Control", "no-cache, no-store, must-revalidate, max-age=0")
            self.send_header("Pragma", "no-cache")
            self.send_header("Expires", "0")
        self.send_header("Access-Control-Allow-Origin", "*")
        super().end_headers()

    def log_message(self, format, *args):
        # Suppress routine GET request spam in the console
        if len(args) > 0:
            if "tunnel_info.json" in str(args[0]):
                return
            if any(str(args[0]).startswith(f'"{verb}') for verb in ['GET', 'POST', 'HEAD']):
                return
        super().log_message(format, *args)


def write_tunnel_info(data):
    try:
        with open(TUNNEL_INFO_FILE, "w", encoding="utf-8") as f:
            json.dump(data, f, indent=2, ensure_ascii=False)
    except Exception as e:
        print(f"[!] Error writing tunnel_info.json: {e}")


def cleanup():
    global tunnel_proc, server_instance
    print("\n\n[...] Завершение работы сервера Qoldau Food...")
    if tunnel_proc:
        try:
            tunnel_proc.terminate()
            tunnel_proc.wait(timeout=2)
        except Exception:
            try:
                tunnel_proc.kill()
            except Exception:
                pass
    write_tunnel_info({
        "active": False,
        "tunnel_url": None,
        "status": "stopped"
    })
    print("[OK] Сервер и туннель остановлены.")


def main():
    global tunnel_proc, server_instance

    local_only = "--local-only" in sys.argv
    local_ip = get_local_ip()

    # Initial state
    write_tunnel_info({
        "active": False,
        "tunnel_url": None,
        "local_ip": f"http://{local_ip}:{PORT}",
        "port": PORT,
        "status": "starting"
    })

    print("=======================================================================")
    print("                     QOLDAU FOOD - СЕРВЕР И ТУННЕЛЬ                    ")
    print("=======================================================================")
    print(f"[*] Локальный веб-сервер запускается на порту {PORT}...")

    # Start HTTP server
    try:
        server_instance = HTTPServer(("0.0.0.0", PORT), CustomHTTPRequestHandler)
    except OSError:
        print(f"\n[!] Ошибка: Порт {PORT} уже занят!")
        print("    Запустите stop.bat для освобождения порта и повторите запуск.")
        sys.exit(1)

    server_thread = threading.Thread(target=server_instance.serve_forever, daemon=True)
    server_thread.start()
    print(f"[OK] Локальный сервер запущен: http://localhost:{PORT}")
    print(f"[OK] Локальная сеть:            http://{local_ip}:{PORT}")

    tunnel_url = None

    if local_only:
        print("\n[i] Режим 'только локально' (--local-only).")
        print(f"    Откройте: http://localhost:{PORT}")
        write_tunnel_info({
            "active": False,
            "tunnel_url": None,
            "local_ip": f"http://{local_ip}:{PORT}",
            "port": PORT,
            "status": "local_only"
        })
    elif not os.path.exists(CLOUDFLARED_EXE):
        print(f"\n[!] cloudflared.exe не найден в {BASE_DIR}.")
        print("    Мобильный HTTPS-туннель недоступен.")
    else:
        print("\n[*] Запуск защищенного HTTPS-туннеля для смартфонов...")
        print("[*] Пожалуйста, подождите 5-7 секунд для получения ссылки...")

        try:
            tunnel_proc = subprocess.Popen(
                [CLOUDFLARED_EXE, "tunnel", "--url", f"http://localhost:{PORT}"],
                stdout=subprocess.PIPE,
                stderr=subprocess.STDOUT,
                text=True,
                encoding="utf-8",
                errors="replace",
                bufsize=1
            )

            # Look for the URL in output
            start_time = time.time()
            while time.time() - start_time < 20:
                line = tunnel_proc.stdout.readline()
                if not line:
                    time.sleep(0.1)
                    continue

                match = re.search(r'https://[a-zA-Z0-9-]+\.trycloudflare\.com', line)
                if match:
                    tunnel_url = match.group(0)
                    break

            if tunnel_url:
                write_tunnel_info({
                    "active": True,
                    "tunnel_url": tunnel_url,
                    "local_ip": f"http://{local_ip}:{PORT}",
                    "port": PORT,
                    "status": "ready"
                })
            else:
                print("[!] Не удалось автоматически перехватить ссылку туннеля.")
        except Exception as e:
            print(f"[!] Ошибка запуска cloudflared: {e}")

    # Output dashboard
    print("\n" + "=" * 71)
    print("                      ГОТОВО К ИСПОЛЬЗОВАНИЮ                           ")
    print("=" * 71)
    print(f"  [ПК] НА КОМПЬЮТЕРЕ (Браузер на ПК):")
    print(f"       http://localhost:{PORT}")
    print()
    if tunnel_url:
        print(f"  [ТЕЛЕФОН] НА СМАРТФОНЕ (iPhone / Android с рабочей камерой и автофокусом):")
        print(f"       {tunnel_url}")
        print()
        print("  СОВЕТ:")
        print("  Откройте сайт на ПК и нажмите синюю кнопку «На телефон» в шапке.")
        print("  На экране ПК появится активный QR-код. Отсканируйте его камерой телефона!")
    else:
        print(f"  [ТЕЛЕФОН] По локальной сети Wi-Fi:")
        print(f"       http://{local_ip}:{PORT}")
    print("=" * 71)
    print("  Для остановки сервера нажмите Ctrl + C или запустите stop.bat")
    print("=" * 71 + "\n")

    # Automatically open local site in PC browser
    try:
        webbrowser.open(f"http://localhost:{PORT}")
    except Exception:
        pass

    # Keep alive
    try:
        while True:
            time.sleep(1)
            # Monitor tunnel proc if running
            if tunnel_proc and tunnel_proc.poll() is not None:
                print("[!] Cloudflare tunnel был закрыт.")
                break
    except KeyboardInterrupt:
        pass
    finally:
        cleanup()


if __name__ == "__main__":
    main()

