# 🚀 Phase 2 Quick Start Guide

## Ready to Add Database? Let's Go! 

### ⚡ Super Quick Setup (5 minutes)

#### 1. Install PostgreSQL
```bash
# Windows (using Chocolatey)
choco install postgresql

# macOS (using Homebrew)
brew install postgresql
brew services start postgresql

# Linux (Ubuntu/Debian)
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql
```

#### 2. Create Database
```bash
# Connect to PostgreSQL
sudo -u postgres psql

# Run these commands:
CREATE USER property_manager WITH PASSWORD 'secure123';
CREATE DATABASE property_management_py OWNER property_manager;
GRANT ALL PRIVILEGES ON DATABASE property_management_py TO property_manager;
\q
```

#### 3. Configure Environment
```bash
cd property-management-dashboard/backend
cp env.example .env
```

Edit `.env` file:
```env
DATABASE_URL="postgresql://property_manager:secure123@localhost:5432/property_management_py"
```

#### 4. Install & Setup Database
```bash
# Install Prisma
pnpm install @prisma/client prisma

# Generate Prisma client
npx prisma generate

# Create tables
npx prisma db push

# Add sample Paraguay data
npx prisma db seed
```

#### 5. View Your Database
```bash
npx prisma studio
```
Opens at http://localhost:5555

### 🎯 What You Get

#### **Real Paraguay Data**
- **3 Properties** in Asunción, Lambaré, Ciudad del Este
- **4 Units** with PYG/USD pricing
- **3 Tenants** with cédulas and WhatsApp
- **3 Active leases** in Guaraníes
- **4 Payments** (some paid, some pending)
- **3 Maintenance requests** with priorities
- **3 Expenses** (ANDE, cleaning, insurance)
- **Exchange rates** (USD/PYG, BRL/PYG, ARS/PYG)

#### **Sample Login Accounts**
- **Admin**: admin@propiedadespy.com / admin123
- **Manager**: manager@propiedadespy.com / admin123

### 🔧 Next: Update Your Backend

Replace sample data with real database queries:

#### Properties API (example)
```javascript
// Replace in src/app.js
app.get('/api/properties', async (req, res) => {
    try {
        const properties = await prisma.property.findMany({
            include: {
                units: true,
                _count: {
                    select: { units: true }
                }
            }
        });
        res.json(properties);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch properties' });
    }
});
```

#### Tenants API (example)
```javascript
app.get('/api/tenants', async (req, res) => {
    try {
        const tenants = await prisma.tenant.findMany({
            where: { isActive: true },
            include: {
                leases: {
                    where: { status: 'ACTIVE' },
                    include: { unit: { include: { property: true } } }
                }
            }
        });
        res.json(tenants);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch tenants' });
    }
});
```

### 🎉 Success!

You now have:
- ✅ **Real database** with Paraguay-specific structure
- ✅ **Sample data** ready for testing
- ✅ **Prisma ORM** for easy database operations
- ✅ **Admin interface** (Prisma Studio)
- ✅ **Production-ready** schema

### 🔄 Development Workflow

```bash
# Start backend with database
cd backend
node src/app.js

# Start frontend
cd ../simple-frontend
npx serve . -p 3000

# View database
npx prisma studio
```

### 📊 Database Features

#### **Paraguay-Optimized**
- 18 Paraguay departments
- Guaraní (PYG) primary currency
- Cédula national ID format
- WhatsApp communication fields
- Spanish language defaults

#### **Multi-Currency**
- PYG (Guaraní) - Primary
- USD (Dollar) - Secondary  
- BRL (Real) - Border regions
- ARS (Peso) - Border regions

#### **Business Logic**
- Property → Units → Leases → Payments
- Maintenance requests with priorities
- Expense tracking by category
- Exchange rate history
- Document management ready

### 🚀 Ready for Production!

Your database is now ready for:
- Real property management
- Multi-tenant operations
- Financial tracking
- Maintenance management
- Reporting and analytics

**Time to build the future of Paraguay real estate! 🏢🇵🇾** 