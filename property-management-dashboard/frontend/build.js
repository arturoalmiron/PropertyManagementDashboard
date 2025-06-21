#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Create build directory
const buildDir = path.join(__dirname, 'build');
if (!fs.existsSync(buildDir)) {
    fs.mkdirSync(buildDir, { recursive: true });
}

console.log('🏗️ Building Property Management Dashboard PWA...');

// Copy essential files to build directory
const filesToCopy = [
    'index.html',
    'styles.css',
    'app.js',
    'public/manifest.json',
    'public/sw.js',
    'public/offline.html',
    'public/favicon.ico',
    'public/logo192.png',
    'public/logo512.png',
    'public/robots.txt'
];

filesToCopy.forEach(file => {
    const srcPath = path.join(__dirname, file);
    const destPath = path.join(buildDir, path.basename(file));

    if (fs.existsSync(srcPath)) {
        fs.copyFileSync(srcPath, destPath);
        console.log(`✅ Copied: ${file}`);
    } else {
        console.warn(`⚠️ File not found: ${file}`);
    }
});

// Update service worker with build timestamp
const swPath = path.join(buildDir, 'sw.js');
if (fs.existsSync(swPath)) {
    let swContent = fs.readFileSync(swPath, 'utf8');
    const timestamp = new Date().toISOString();
    swContent = swContent.replace(
        /const CACHE_NAME = 'property-mgmt-py-v1\.0\.0';/,
        `const CACHE_NAME = 'property-mgmt-py-v${timestamp}';`
    );
    fs.writeFileSync(swPath, swContent);
    console.log('✅ Updated service worker cache version');
}

// Validate PWA files
const requiredFiles = ['manifest.json', 'sw.js', 'index.html'];
const missingFiles = requiredFiles.filter(file => !fs.existsSync(path.join(buildDir, file)));

if (missingFiles.length > 0) {
    console.error('❌ Missing required PWA files:', missingFiles);
    process.exit(1);
}

// Create a simple server file for local testing
const serverCode = `
const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files
app.use(express.static(__dirname));

// Handle PWA routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Service worker
app.get('/sw.js', (req, res) => {
  res.setHeader('Content-Type', 'application/javascript');
  res.sendFile(path.join(__dirname, 'sw.js'));
});

// Manifest
app.get('/manifest.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.sendFile(path.join(__dirname, 'manifest.json'));
});

// Offline fallback
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(\`🚀 PWA Server running at http://localhost:\${PORT}\`);
  console.log('📱 Ready for PWA testing!');
});
`;

fs.writeFileSync(path.join(buildDir, 'server.js'), serverCode.trim());

// Create package.json for the build
const buildPackageJson = {
    name: "property-management-dashboard-pwa",
    version: "1.0.0",
    description: "Property Management Dashboard for Paraguay - PWA Build",
    main: "server.js",
    scripts: {
        "start": "node server.js"
    },
    dependencies: {
        "express": "^4.18.2"
    }
};

fs.writeFileSync(path.join(buildDir, 'package.json'), JSON.stringify(buildPackageJson, null, 2));

console.log('🎉 PWA build completed successfully!');
console.log('📁 Build files are in the ./build directory');
console.log('🚀 To test locally:');
console.log('   1. cd build');
console.log('   2. npm install');
console.log('   3. npm start');
console.log('📱 For GitHub Pages deployment, commit and push your changes'); 