# PropiedadesPY Frontend Startup Script
Write-Host "Starting PropiedadesPY Frontend..." -ForegroundColor Green
Write-Host ""

# Get the directory where this script is located
$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
Write-Host "Script location: $ScriptDir" -ForegroundColor Yellow

# Navigate to the frontend directory
$FrontendDir = Join-Path $ScriptDir "frontend"
Write-Host "Frontend directory: $FrontendDir" -ForegroundColor Yellow

if (-not (Test-Path $FrontendDir)) {
    Write-Host "ERROR: Frontend directory not found at $FrontendDir" -ForegroundColor Red
    Read-Host "Press Enter to exit"
    exit 1
}

Set-Location $FrontendDir
Write-Host "Changed to directory: $(Get-Location)" -ForegroundColor Yellow
Write-Host ""

# Check for required files
$RequiredFiles = @("index.html", "app.js", "styles.css")
$MissingFiles = @()

foreach ($file in $RequiredFiles) {
    if (Test-Path $file) {
        Write-Host "✓ $file found" -ForegroundColor Green
    } else {
        Write-Host "✗ $file NOT found" -ForegroundColor Red
        $MissingFiles += $file
    }
}

if ($MissingFiles.Count -gt 0) {
    Write-Host ""
    Write-Host "ERROR: Missing required files:" -ForegroundColor Red
    $MissingFiles | ForEach-Object { Write-Host "  - $_" -ForegroundColor Red }
    Write-Host ""
    Write-Host "Files in current directory:" -ForegroundColor Yellow
    Get-ChildItem | Select-Object Name | Format-Table -AutoSize
    Read-Host "Press Enter to exit"
    exit 1
}

Write-Host ""
Write-Host "Starting HTTP server on port 8002..." -ForegroundColor Green
Write-Host "Frontend URL: http://localhost:8002" -ForegroundColor Cyan
Write-Host "Press Ctrl+C to stop the server" -ForegroundColor Yellow
Write-Host ""

# Open browser
Start-Process "http://localhost:8002"

# Start Python HTTP server
try {
    python -m http.server 8002
} catch {
    Write-Host "ERROR: Failed to start Python HTTP server" -ForegroundColor Red
    Write-Host "Make sure Python is installed and available in PATH" -ForegroundColor Yellow
    Read-Host "Press Enter to exit"
    exit 1
} 