# Phase 2: Database Setup Guide

## 🗄️ Database Architecture for Paraguay Real Estate

### Overview
This database is specifically designed for the Paraguay real estate market with:
- **Guaraní (PYG)** as primary currency
- **Paraguay departments** instead of states
- **Cédula** national ID system
- **WhatsApp** integration fields
- **Multi-currency** support (PYG, USD, BRL, ARS)

## 📋 Prerequisites

### 1. Install PostgreSQL

#### Windows:
```bash
# Download from: https://www.postgresql.org/download/windows/
# Or use Chocolatey:
choco install postgresql

# Or use Scoop:
scoop install postgresql
```

#### macOS:
```bash
# Using Homebrew:
brew install postgresql
brew services start postgresql
```

#### Linux (Ubuntu/Debian):
```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql
sudo systemctl enable postgresql
```

### 2. Create Database User and Database

```sql
-- Connect to PostgreSQL as superuser
sudo -u postgres psql

-- Create user
CREATE USER property_manager WITH PASSWORD 'secure_password_123';

-- Create database
CREATE DATABASE property_management_py OWNER property_manager;

-- Grant privileges
GRANT ALL PRIVILEGES ON DATABASE property_management_py TO property_manager;

-- Exit
\q
```

## 🚀 Setup Steps

### Step 1: Environment Configuration

Create `.env` file in backend directory:

```bash
cd property-management-dashboard/backend
cp env.example .env
```

Edit `.env` with your database credentials:
```env
DATABASE_URL="postgresql://property_manager:secure_password_123@localhost:5432/property_management_py"
PORT=3001
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
DEFAULT_CURRENCY=PYG
DEFAULT_LANGUAGE=es
DEFAULT_TIMEZONE=America/Asuncion
```

### Step 2: Install Database Dependencies

```bash
cd property-management-dashboard/backend
pnpm install @prisma/client prisma
```

### Step 3: Generate Prisma Client

```bash
npx prisma generate
```

### Step 4: Run Database Migration

```bash
npx prisma db push
```

### Step 5: Seed Database with Paraguay Data

```bash
npx prisma db seed
```

## 📊 Database Structure

### Core Tables

#### 1. **Users** - System Users
- Property managers, assistants, admins
- Spanish language default
- Paraguay timezone (America/Asuncion)

#### 2. **Properties** - Real Estate Properties
- **Department field** (not state) - Paraguay's 18 departments
- Property types: Apartment, House, Commercial, etc.
- Multi-unit support

#### 3. **Units** - Individual Rental Units
- **Dual currency** (PYG/USD rent amounts)
- **Square meters** (sqm) - standard in Paraguay
- Square feet (sqft) for international clients

#### 4. **Tenants** - Renters
- **Cédula field** - Paraguay national ID
- **WhatsApp field** - primary communication
- **+595 phone format** - Paraguay country code
- Spanish language default

#### 5. **Leases** - Rental Agreements
- **Guaraní currency** default
- Active/Expired/Terminated status
- Terms and conditions storage

#### 6. **Payments** - Rent & Fee Tracking
- **Multiple payment methods** (Cash very common in Paraguay)
- **Exchange rate tracking** for USD payments
- Late fee support

#### 7. **Maintenance Requests** - Property Maintenance
- Priority levels (Low to Urgent)
- Assignment to users
- Cost tracking in PYG/USD

#### 8. **Expenses** - Property Expenses
- **Categories** relevant to Paraguay market
- **Vendor tracking**
- Receipt storage

#### 9. **Exchange Rates** - Currency Conversion
- **USD/PYG rates** (primary)
- **BRL/ARS rates** (border regions)
- Historical rate tracking

#### 10. **Documents** - File Management
- Lease contracts, property deeds
- Insurance policies, tax documents
- Photos and floor plans

### Paraguay-Specific Features

#### **Departments (18 total)**
```
Central, Asunción, Alto Paraná, Itapúa, Caaguazú, 
Caazapá, Canindeyú, Concepción, Cordillera, Guairá, 
Misiones, Ñeembucú, Paraguarí, Presidente Hayes, 
San Pedro, Amambay, Boquerón, Alto Paraguay
```

#### **Currency Support**
- **PYG** (Guaraní) - Primary
- **USD** (US Dollar) - Secondary
- **BRL** (Brazilian Real) - Border regions
- **ARS** (Argentine Peso) - Border regions

#### **Payment Methods**
- **Cash** - Very common in Paraguay
- Bank Transfer, Check, Credit/Debit Cards
- Mobile payments

## 🔧 Database Operations

### View Database
```bash
npx prisma studio
```
Opens web interface at http://localhost:5555

### Reset Database
```bash
npx prisma db push --force-reset
```

### Generate Migration
```bash
npx prisma migrate dev --name init
```

### Check Database Status
```bash
npx prisma db pull
```

## 📈 Sample Data Structure

### Properties Example
```json
{
  "name": "Edificio Central",
  "address": "Av. Eusebio Ayala 1234",
  "city": "Asunción",
  "department": "Central",
  "type": "APARTMENT",
  "totalUnits": 12
}
```

### Tenants Example
```json
{
  "firstName": "María",
  "lastName": "González",
  "email": "maria.gonzalez@email.com",
  "phone": "+595981234567",
  "whatsapp": "+595981234567",
  "cedula": "1234567-8",
  "nationality": "PY",
  "language": "es"
}
```

### Payments Example
```json
{
  "amount": 2500000,
  "currency": "PYG",
  "method": "CASH",
  "status": "PAID",
  "type": "RENT"
}
```

## 🚀 Next Steps After Setup

### 1. Update Backend API
- Replace sample data with real database queries
- Add CRUD operations for all entities
- Implement proper error handling

### 2. Add Authentication
- JWT-based user authentication
- Role-based access control
- Session management

### 3. Add Validation
- Input validation on all forms
- Business rule validation
- Data integrity checks

### 4. Add File Upload
- Property photos
- Document storage
- Receipt management

## 🔒 Security Considerations

### Database Security
- Use strong passwords
- Enable SSL connections
- Regular backups
- Access control

### Application Security
- Input sanitization
- SQL injection prevention
- Authentication required
- Rate limiting

## 📊 Performance Optimization

### Indexing Strategy
- Primary keys (automatic)
- Foreign keys (automatic)
- Email uniqueness
- Cédula uniqueness
- Property-Unit combinations

### Query Optimization
- Use Prisma's query optimization
- Implement pagination
- Add database connection pooling
- Monitor slow queries

## 🎯 Success Metrics

After setup, you should have:
- ✅ PostgreSQL database running
- ✅ All tables created with proper relationships
- ✅ Sample Paraguay data loaded
- ✅ Prisma Studio accessible
- ✅ Backend connected to database
- ✅ Ready for CRUD operations

## 🆘 Troubleshooting

### Common Issues

#### Connection Error
```bash
# Check PostgreSQL is running
sudo systemctl status postgresql

# Check connection
psql -h localhost -U property_manager -d property_management_py
```

#### Permission Error
```sql
-- Grant additional permissions
GRANT ALL ON SCHEMA public TO property_manager;
GRANT ALL ON ALL TABLES IN SCHEMA public TO property_manager;
```

#### Migration Error
```bash
# Reset and retry
npx prisma db push --force-reset
npx prisma generate
```

## 🎉 Ready for Phase 2!

Once setup is complete, you'll have a production-ready database specifically designed for Paraguay's real estate market with all the cultural and business adaptations needed for success! 🏢🇵🇾 