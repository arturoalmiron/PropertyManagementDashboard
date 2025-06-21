@echo off
echo Starting PropiedadesPY Backend...
cd /d "%~dp0backend"
echo Starting API server on http://localhost:3001
node src/app.js
pause