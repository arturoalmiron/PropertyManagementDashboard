# Simple Property Management Dashboard Setup

## Overview
This is a simplified version of the Property Management Dashboard that prioritizes **functionality over complexity**. We've removed TypeScript and React to eliminate build issues and focus on core features.

## What's Included

### ✅ Working Features
- **Backend API** (JavaScript/Node.js with Express)
- **Simple HTML Frontend** (Vanilla JavaScript)
- **Paraguay-specific data** (departments, currency, WhatsApp integration)
- **Multi-language support** (Spanish/English toggle)
- **Sample data** for testing (no database required)
- **Real-time API communication**

### 🚀 Quick Start

1. **Install Dependencies**
   ```bash
   cd property-management-dashboard
   pnpm install:all
   ```

2. **Start Backend** (Terminal 1)
   ```bash
   cd backend
   node src/app.js
   ```
   Backend will run on: http://localhost:3001

3. **Start Frontend** (Terminal 2)
   ```bash
   cd simple-frontend
   npx serve . -p 3000
   ```
   Frontend will run on: http://localhost:3000

## API Endpoints

### Health Check
```
GET http://localhost:3001/api/health
```

### Properties
```
GET http://localhost:3001/api/properties
```
Returns sample properties in Paraguay (Asunción, Lambaré)

### Tenants
```
GET http://localhost:3001/api/tenants
```
Returns sample tenants with Paraguay-specific fields (cédula, WhatsApp)

### Payments
```
GET http://localhost:3001/api/payments
```
Returns sample payments in Guaraní (PYG)

### Currency Rates
```
GET http://localhost:3001/api/currency/rates
```
Returns USD/PYG exchange rate

## Frontend Features

### 🏠 Dashboard
- Financial summary cards
- Exchange rate display (USD/PYG)
- Recent activity feed
- Paraguay-specific formatting

### 🏢 Properties Section
- List of properties with Paraguay addresses
- Department field (instead of states)
- Property types common in Paraguay

### 👥 Tenants Section
- Tenant information with cédula (national ID)
- WhatsApp integration buttons
- Paraguay phone number formats

### 💰 Payments Section
- Payments in Guaraní (₲)
- Payment status tracking
- Due date management

### 🌐 Language Toggle
- Switch between Spanish (default) and English
- Paraguay-specific translations

## Paraguay-Specific Features

### 🇵🇾 Localization
- **Currency**: Guaraní (₲) and USD ($)
- **Language**: Spanish default, English option
- **Address**: Paraguay departments (not states)
- **ID**: Cédula format (1234567-8)
- **Communication**: WhatsApp integration

### 📱 WhatsApp Integration
- Direct WhatsApp links for tenant communication
- Paraguay phone number format (+595)
- Rent reminder templates

## File Structure
```
property-management-dashboard/
├── backend/
│   ├── src/
│   │   ├── app.js                 # Main Express server
│   │   └── services/
│   │       └── currencyService.js # Currency handling
│   └── package.json
├── simple-frontend/
│   └── index.html                 # Complete frontend app
├── package.json                   # Root package.json
└── pnpm-workspace.yaml           # Workspace config
```

## Advantages of This Approach

### ✅ Pros
- **No build process** - just run and go
- **No TypeScript errors** - pure JavaScript
- **No React complexity** - vanilla HTML/CSS/JS
- **Fast development** - immediate changes
- **Easy deployment** - static files + Node.js
- **Full functionality** - all core features work

### 🔧 Easy Customization
- Edit `simple-frontend/index.html` for UI changes
- Edit `backend/src/app.js` for API changes
- Add new endpoints easily
- Modify styling directly in HTML

## Next Steps

### Phase 1: Current (Working)
- ✅ Basic UI with navigation
- ✅ API endpoints with sample data
- ✅ Paraguay-specific features
- ✅ Multi-language support

### Phase 2: Database Integration
- Add PostgreSQL database
- Implement Prisma ORM
- Real CRUD operations
- User authentication

### Phase 3: Advanced Features
- File uploads
- Email notifications
- Advanced reporting
- Mobile responsiveness

## Troubleshooting

### Backend Issues
```bash
# Check if backend is running
curl http://localhost:3001/api/health

# Restart backend
cd backend
node src/app.js
```

### Frontend Issues
```bash
# Restart frontend server
cd simple-frontend
npx serve . -p 3000
```

### Port Conflicts
- Backend: Change PORT in `backend/src/app.js`
- Frontend: Use different port with `npx serve . -p 3001`

## Success! 🎉

You now have a fully functional Property Management Dashboard specifically designed for the Paraguay real estate market, without the complexity of TypeScript or React build processes.

**Backend**: http://localhost:3001
**Frontend**: http://localhost:3000

The system includes Paraguay-specific features like Guaraní currency, department-based addresses, cédula ID format, and WhatsApp integration - all working out of the box! 