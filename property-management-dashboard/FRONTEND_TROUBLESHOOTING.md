# 🔧 Frontend Troubleshooting Guide

## 🚨 Problem: Directory Listing Instead of Website

### Symptoms:
- Browser shows file/folder listing instead of the website
- You see files like: `.cursor/`, `CURRENT_TESTING_GUIDE.md`, `property-management-dashboard/`
- Python server seems to be running but serving wrong directory

### Root Cause:
The Python HTTP server is running from the wrong directory (parent directory instead of frontend directory).

## ✅ Solutions (Try in Order)

### Solution 1: Manual Directory Navigation (Most Reliable)
```powershell
# Navigate to the correct directory
cd D:\GitHub\PropertyManagementDashboard\property-management-dashboard\frontend

# Verify you're in the right place
dir *.html
# You should see: index.html

# Verify all required files exist
dir app.js, styles.css, index.html
# All three should be listed

# Start the server
python -m http.server 8002
```

### Solution 2: Use the Fixed Batch File
```cmd
# From the project root directory
cd D:\GitHub\PropertyManagementDashboard\property-management-dashboard
.\start-frontend.bat
```

The fixed batch file now includes:
- ✅ Proper directory navigation
- ✅ File existence verification
- ✅ Error messages if files are missing
- ✅ Debug information showing current directory

### Solution 3: Use the PowerShell Script (Recommended)
```powershell
# From the project root directory
cd D:\GitHub\PropertyManagementDashboard\property-management-dashboard
.\start-frontend.ps1
```

The PowerShell script provides:
- ✅ Comprehensive error checking
- ✅ Colored output for easy reading
- ✅ Automatic browser opening
- ✅ Detailed error messages

## 🔍 Diagnostic Commands

### Check Current Directory:
```powershell
pwd
# Should show: D:\GitHub\PropertyManagementDashboard\property-management-dashboard\frontend
```

### Verify Files Exist:
```powershell
ls *.html, *.js, *.css
# Should show: index.html, app.js, styles.css
```

### Check File Sizes:
```powershell
ls -la index.html, app.js, styles.css
# index.html should be ~8KB
# app.js should be ~12KB  
# styles.css should be ~9KB
```

## 🎯 Expected Output When Working

### Batch File Success Output:
```
Starting PropiedadesPY Frontend...

Batch file location: D:\GitHub\PropertyManagementDashboard\property-management-dashboard\
Current directory after cd: D:\GitHub\PropertyManagementDashboard\property-management-dashboard
Frontend directory: D:\GitHub\PropertyManagementDashboard\property-management-dashboard\frontend

Checking for index.html...
✓ index.html found

Starting HTTP server on port 8002...
Opening: http://localhost:8002
Serving HTTP on :: port 8002 (http://[::]:8002/) ...
```

### PowerShell Script Success Output:
```
Starting PropiedadesPY Frontend...

Script location: D:\GitHub\PropertyManagementDashboard\property-management-dashboard
Frontend directory: D:\GitHub\PropertyManagementDashboard\property-management-dashboard\frontend
Changed to directory: D:\GitHub\PropertyManagementDashboard\property-management-dashboard\frontend

✓ index.html found
✓ app.js found
✓ styles.css found

Starting HTTP server on port 8002...
Frontend URL: http://localhost:8002
Press Ctrl+C to stop the server

Serving HTTP on :: port 8002 (http://[::]:8002/) ...
```

## 🚫 Common Mistakes to Avoid

### ❌ Wrong Directory:
```powershell
# DON'T run from here:
cd D:\GitHub\PropertyManagementDashboard
python -m http.server 8002
# This serves the parent directory!
```

### ❌ Missing Files:
If you see this error in the batch file:
```
✗ index.html NOT found
Files in current directory:
backend/
frontend/
package.json
```
This means you're in the wrong directory.

### ❌ Port Conflicts:
If you get "Address already in use" error:
```powershell
# Kill any existing Python servers
taskkill /f /im python.exe
# Or use a different port
python -m http.server 8003
```

## 🎉 Success Indicators

You know it's working when:
1. **No directory listing** - you see the actual website
2. **Blue header** with "PropiedadesPY" logo
3. **Sidebar navigation** with Dashboard, Propiedades, etc.
4. **Dashboard cards** showing real data (not empty)
5. **Browser console** shows no 404 errors

## 📞 Quick Help Commands

### Emergency Reset:
```powershell
# Kill all Python processes
taskkill /f /im python.exe

# Navigate to correct directory
cd D:\GitHub\PropertyManagementDashboard\property-management-dashboard\frontend

# Verify files
dir index.html

# Start fresh
python -m http.server 8002
```

### File Recovery (if files are missing):
```powershell
# Check if files exist in the project
cd D:\GitHub\PropertyManagementDashboard\property-management-dashboard
dir /s index.html
# This will search for index.html in all subdirectories
```

## 🔧 Advanced Troubleshooting

### If Python is not found:
```powershell
# Check Python installation
python --version
# Should show: Python 3.x.x

# If not found, use full path:
C:\Python39\python.exe -m http.server 8002
```

### If port 8002 is busy:
```powershell
# Check what's using the port
netstat -ano | findstr :8002

# Use a different port
python -m http.server 8003
```

### File Permissions Issues:
```powershell
# Run PowerShell as Administrator if needed
# Right-click PowerShell → "Run as administrator"
```

## ✅ Final Verification Checklist

Before asking for help, verify:
- [ ] You're in the `frontend/` directory
- [ ] `index.html` exists and is ~8KB
- [ ] `app.js` exists and is ~12KB
- [ ] `styles.css` exists and is ~9KB
- [ ] Python is installed and working
- [ ] Port 8002 is not in use by another process
- [ ] Browser is pointing to `http://localhost:8002`

If all checkboxes are ✅ and it still doesn't work, then we have a different issue to investigate. 