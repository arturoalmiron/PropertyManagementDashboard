@echo off
echo Starting PropiedadesPY Frontend...
echo.
echo Batch file location: %~dp0
cd /d "%~dp0"
echo Current directory after cd: %CD%
cd frontend
echo Frontend directory: %CD%
echo.
echo Checking for index.html...
if exist index.html (
    echo ✓ index.html found
) else (
    echo ✗ index.html NOT found
    echo Files in current directory:
    dir /b
    pause
    exit /b 1
)
echo.
echo Starting HTTP server on port 8002...
echo Opening: http://localhost:8002
start http://localhost:8002
python -m http.server 8002
pause