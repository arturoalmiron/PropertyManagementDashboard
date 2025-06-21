# Project Structure

```
property-management-dashboard/
├── README.md                           # Project documentation
├── PROJECT_STRUCTURE.md               # This file
├── package.json                       # Root package.json for workspace management
├── 
├── backend/                           # Node.js/Express backend
│   ├── src/                          # Source code
│   │   ├── app.ts                    # Main Express application
│   │   ├── services/                 # Business logic services
│   │   │   └── currencyService.ts    # Currency exchange rate service
│   │   ├── routes/                   # API route handlers
│   │   ├── controllers/              # Request controllers
│   │   ├── middleware/               # Express middleware
│   │   └── types/                    # TypeScript type definitions
│   ├── prisma/                       # Database configuration
│   │   └── schema.prisma             # Complete database schema
│   ├── package.json                  # Backend dependencies
│   ├── tsconfig.json                 # TypeScript configuration
│   ├── nodemon.json                  # Development server configuration
│   └── env.example                   # Environment variables template
│
├── frontend/                         # React frontend application
│   ├── public/                       # Static assets
│   ├── src/                          # Source code
│   │   ├── components/               # React components
│   │   │   └── layout/               # Layout components
│   │   │       └── MainLayout.tsx    # Main application layout
│   │   ├── pages/                    # Page components
│   │   │   ├── Dashboard.tsx         # Dashboard page
│   │   │   ├── Properties.tsx        # Properties management
│   │   │   ├── Tenants.tsx          # Tenants management
│   │   │   ├── Payments.tsx         # Payments tracking
│   │   │   ├── Maintenance.tsx      # Maintenance requests
│   │   │   ├── Reports.tsx          # Financial reports
│   │   │   └── Settings.tsx         # Application settings
│   │   ├── i18n/                    # Internationalization
│   │   │   ├── index.ts             # i18n configuration
│   │   │   └── locales/             # Translation files
│   │   │       ├── es.json          # Spanish translations
│   │   │       └── en.json          # English translations
│   │   ├── App.tsx                  # Main App component
│   │   ├── index.tsx                # Application entry point
│   │   └── index.css                # Global styles with Tailwind
│   ├── package.json                 # Frontend dependencies
│   ├── tailwind.config.js           # Tailwind CSS configuration
│   ├── postcss.config.js            # PostCSS configuration
│   └── tsconfig.json                # TypeScript configuration
└──
```

## 🗂️ Key Files Description

### Backend Core Files

#### `backend/src/app.ts`
- Main Express application setup
- Middleware configuration (CORS, rate limiting, security)
- API route mounting
- Error handling
- Graceful shutdown handling

#### `backend/prisma/schema.prisma`
- Complete database schema for Paraguay property management
- Multi-currency support (PYG/USD)
- Paraguay-specific fields (departments, cédula, WhatsApp)
- Comprehensive models: Users, Properties, Units, Tenants, Leases, Payments, Maintenance, Expenses
- Exchange rate tracking

#### `backend/src/services/currencyService.ts`
- Real-time exchange rate fetching
- Multiple API fallback system
- Automatic currency conversion
- Scheduled rate updates (hourly)
- Paraguay-specific currency formatting

### Frontend Core Files

#### `frontend/src/App.tsx`
- Main application component
- React Router setup
- Route definitions for all pages
- Internationalization integration

#### `frontend/src/components/layout/MainLayout.tsx`
- Responsive sidebar navigation
- Mobile-first design
- Language toggle functionality
- Currency indicator
- Modern UI with Tailwind CSS

#### `frontend/src/i18n/`
- Complete bilingual support (Spanish/English)
- Paraguay-specific translations
- Department names, currency terms
- Business terminology in both languages

#### `frontend/src/pages/`
- Dashboard: Financial overview with multi-currency display
- Properties: Property and unit management
- Tenants: Tenant profiles with Paraguay-specific fields
- Payments: Multi-currency payment tracking
- Maintenance: Work order management
- Reports: Financial and operational reporting
- Settings: Application configuration

### Configuration Files

#### `package.json` (Root)
- Workspace management
- Unified scripts for development
- Project metadata and keywords

#### `tailwind.config.js`
- Custom color palette
- Form plugin integration
- Inter font family
- Paraguay brand colors

#### `backend/env.example`
- Environment variables template
- Database configuration
- JWT settings
- API keys for currency services
- Rate limiting configuration

## 🏗️ Architecture Overview

### Database Layer
- **PostgreSQL** with Prisma ORM
- Multi-currency support at the schema level
- Paraguay-specific data structures
- Audit trails and timestamps

### Backend API Layer
- **RESTful API** with Express.js
- **TypeScript** for type safety
- **JWT authentication** for security
- **Rate limiting** for API protection
- **Real-time currency updates** via cron jobs

### Frontend Presentation Layer
- **React 18** with modern hooks
- **TypeScript** for component safety
- **Tailwind CSS** for responsive design
- **React Router** for SPA navigation
- **Zustand** for state management
- **React Hook Form** for form handling

### Internationalization Layer
- **react-i18next** for translation management
- **Browser language detection**
- **localStorage persistence**
- **Dynamic language switching**

### Currency Layer
- **Real-time exchange rates** from multiple APIs
- **Automatic fallback** system
- **Historical rate tracking**
- **Multi-currency calculations**

## 🌟 Paraguay-Specific Features

### Database Schema
- Department-based addressing (18 Paraguay departments)
- Cédula (National ID) fields
- WhatsApp contact information
- Guaraní (PYG) as primary currency
- Asunción timezone handling

### User Interface
- Spanish as default language
- Paraguay department dropdown
- Currency formatting for Guaraní and USD
- WhatsApp communication buttons
- Cultural color scheme

### Business Logic
- Paraguay rental law compliance
- Tax calculation for Paraguay
- Holiday calendar integration
- Local payment method support

## 🚀 Ready for Development

The project structure is now complete and ready for:

1. **Database setup** - Run Prisma migrations
2. **Backend development** - Add route handlers and business logic
3. **Frontend development** - Implement CRUD operations and UI
4. **API integration** - Connect frontend to backend
5. **Testing** - Add unit and integration tests
6. **Deployment** - Configure for production

All core infrastructure is in place with Paraguay-specific requirements fully considered. 