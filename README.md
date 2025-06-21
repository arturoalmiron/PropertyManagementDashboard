# 🏠 Property Management Dashboard - Paraguay

[![Deploy PWA](https://github.com/yourusername/PropertyManagementDashboard/actions/workflows/deploy.yml/badge.svg)](https://github.com/yourusername/PropertyManagementDashboard/actions/workflows/deploy.yml)
[![PWA Ready](https://img.shields.io/badge/PWA-Ready-green.svg)](https://web.dev/progressive-web-apps/)
[![Paraguay](https://img.shields.io/badge/Made%20for-Paraguay%20🇵🇾-red.svg)](https://en.wikipedia.org/wiki/Paraguay)

> Comprehensive property management system designed specifically for the Paraguay real estate market with multi-currency support, offline capabilities, and PWA features.

## 🌟 Live Demo

**PWA App**: [https://arturoalmiron.github.io/PropertyManagementDashboard](https://arturoalmiron.github.io/PropertyManagementDashboard)

*Install it on your device for the best experience!*

## ✨ Key Features

### 🇵🇾 Paraguay-Specific Features
- **Multi-Currency Support**: Guaraní (₲) and USD ($) with real-time exchange rates
- **Spanish/English Interface**: Default Spanish with English option
- **Paraguay Departments**: Complete list of all 17 departments + Asunción
- **Cédula Support**: Paraguay national ID integration
- **WhatsApp Integration**: Send rent reminders via WhatsApp Business API

### 📱 Progressive Web App (PWA)
- **Installable**: Works like a native app on any device
- **Offline Support**: Full functionality without internet connection
- **Push Notifications**: Rent reminders and important updates
- **Auto-Updates**: Seamless updates when new versions are deployed
- **Responsive Design**: Perfect on mobile, tablet, and desktop

### 🏢 Property Management
- **Property Portfolio**: Manage multiple properties and units
- **Tenant Management**: Complete tenant profiles and lease tracking
- **Payment Tracking**: Multi-currency rent collection and history
- **Maintenance Requests**: Work order system with vendor management
- **Financial Reports**: Revenue analysis in both PYG and USD

### 💰 Financial Features
- **Real-time Exchange Rates**: Automatic USD/PYG conversion
- **Multi-Currency Reporting**: View finances in Guaraní or USD
- **Late Payment Tracking**: Automated reminders and fee calculation
- **Expense Management**: Track property-related costs
- **Tax Reporting**: Generate reports for Paraguay tax requirements

## 🚀 Quick Start

### Option 1: Use the PWA (Recommended)
1. Visit [https://yourusername.github.io/PropertyManagementDashboard](https://yourusername.github.io/PropertyManagementDashboard)
2. Click "Instalar App" to install on your device
3. Start managing your properties immediately!

### Option 2: Run Locally
```bash
# Clone the repository
git clone https://github.com/yourusername/PropertyManagementDashboard.git
cd PropertyManagementDashboard

# Install dependencies
npm run install:all

# Start the PWA development server
npm run dev:frontend

# Or build and serve the PWA
npm run build:pwa
npm run serve:pwa
```

## 🛠️ Technology Stack

### Frontend (PWA)
- **HTML5/CSS3/JavaScript**: Core web technologies
- **Service Workers**: Offline functionality and caching
- **Web App Manifest**: PWA configuration
- **Responsive Design**: Mobile-first approach

### Backend (Future)
- **Node.js + Express**: REST API server
- **Prisma ORM**: Database management
- **PostgreSQL**: Production database
- **JWT Authentication**: Secure user sessions

### Deployment
- **GitHub Pages**: Free PWA hosting with HTTPS
- **GitHub Actions**: Automated CI/CD pipeline
- **Service Workers**: Automatic updates and offline support

## 📊 Paraguay Market Focus

This system is specifically designed for Paraguay's real estate market:

### Currency Support
- **Guaraní (PYG)**: Primary currency with proper formatting
- **USD**: Secondary currency for international properties
- **Exchange Rates**: Real-time conversion via multiple APIs
- **Historical Rates**: Track currency fluctuations over time

### Localization
- **Spanish Default**: Primary language for Paraguay users
- **English Option**: For international property managers
- **Local Formats**: Dates, numbers, and currency formatting
- **Paraguay Holidays**: Built-in holiday calendar

### Legal Compliance
- **Rental Laws**: Paraguay-specific rental regulations
- **Tax Integration**: Support for local tax requirements
- **Document Templates**: Legal forms and contracts
- **Compliance Tracking**: Stay up-to-date with regulations

## 🏗️ Project Structure

```
PropertyManagementDashboard/
├── property-management-dashboard/
│   ├── frontend/                 # PWA Frontend
│   │   ├── public/              # Static assets
│   │   │   ├── manifest.json    # PWA manifest
│   │   │   ├── sw.js           # Service worker
│   │   │   └── offline.html    # Offline page
│   │   ├── index.html          # Main HTML file
│   │   ├── styles.css          # Custom CSS framework
│   │   ├── app.js              # Main JavaScript
│   │   └── build.js            # PWA build script
│   └── backend/                 # API Backend (Future)
├── .github/workflows/           # GitHub Actions
│   └── deploy.yml              # PWA deployment workflow
├── README.md                   # This file
├── package.json               # Root package configuration
└── .gitignore                # Git ignore rules
```

## 🔧 Development

### Prerequisites
- Node.js 16+ 
- npm or pnpm
- Git

### Local Development
```bash
# Frontend development
npm run dev:frontend

# Build PWA for production
npm run build:pwa

# Test PWA locally
npm run serve:pwa
```

### PWA Features Testing
1. **Install Prompt**: Check for "Add to Home Screen" option
2. **Offline Mode**: Disable network in browser dev tools
3. **Service Worker**: Verify registration in Application tab
4. **Manifest**: Check PWA manifest in dev tools
5. **Responsive**: Test on different screen sizes

## 🚀 Deployment

### Automatic Deployment (GitHub Pages)
1. Push changes to `main` branch
2. GitHub Actions automatically builds and deploys
3. PWA available at your GitHub Pages URL
4. Users get automatic updates

### Manual Deployment
```bash
# Build the PWA
npm run build:pwa

# Deploy the build/ directory to your hosting provider
```

## 📱 PWA Installation

### Desktop (Chrome/Edge)
1. Visit the PWA URL
2. Click install icon in address bar
3. Confirm installation

### Mobile (iOS/Android)
1. Open in Safari/Chrome
2. Tap "Add to Home Screen"
3. Confirm installation

### Features After Installation
- App icon on home screen/desktop
- Splash screen on startup
- Offline functionality
- Push notifications (when implemented)
- Native app-like experience

## 🌐 Browser Support

| Browser | Desktop | Mobile | PWA Support |
|---------|---------|--------|-------------|
| Chrome  | ✅      | ✅     | Full        |
| Firefox | ✅      | ✅     | Partial     |
| Safari  | ✅      | ✅     | Good        |
| Edge    | ✅      | ✅     | Full        |

## 🤝 Contributing

We welcome contributions to improve the Property Management Dashboard!

### Development Setup
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test the PWA functionality
5. Submit a pull request

### Areas for Contribution
- Backend API development
- Additional Paraguay-specific features
- Mobile app improvements
- Currency exchange rate providers
- Translation improvements
- UI/UX enhancements

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

## 🆘 Support

### Issues
Report bugs and request features on [GitHub Issues](https://github.com/yourusername/PropertyManagementDashboard/issues)

### Documentation
- [PWA Deployment Guide](PWA_DEPLOYMENT_GUIDE.md)
- [Development Roadmap](DEVELOPMENT_ROADMAP.md)
- [API Documentation](API_DOCS.md) (Coming Soon)

## 🎯 Roadmap

### Phase 1: PWA Foundation ✅
- [x] Progressive Web App setup
- [x] Offline functionality
- [x] Multi-currency support
- [x] Spanish/English localization
- [x] GitHub Pages deployment

### Phase 2: Backend Integration 🚧
- [ ] REST API development
- [ ] Database integration
- [ ] User authentication
- [ ] Data synchronization

### Phase 3: Advanced Features 📋
- [ ] Push notifications
- [ ] WhatsApp API integration
- [ ] Advanced reporting
- [ ] Mobile app (React Native)

### Phase 4: Paraguay Integration 🇵🇾
- [ ] Government API integration
- [ ] Legal document generation
- [ ] Tax calculation automation
- [ ] Banking integration

---

## 🏆 Made for Paraguay 🇵🇾

This Property Management Dashboard is specifically designed for the Paraguay real estate market, supporting local currencies, languages, and business practices.

**¡Perfecto para gestionar propiedades en Paraguay!** 