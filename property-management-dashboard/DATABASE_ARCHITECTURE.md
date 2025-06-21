# 🏗️ Database Architecture Guide
## Paraguay Property Management System

This document explains the complete database structure for the Paraguay Property Management Dashboard. The system uses **SQLite** with **Prisma ORM** to manage properties, tenants, leases, payments, and maintenance in the Paraguay real estate market.

---

## 🗄️ Database Tables & Relationships

### 1. **Users** Table
**Purpose**: System administrators and property managers

**Fields**:
- `id` - Unique identifier (Primary Key)
- `email` - Login email (Unique)
- `password` - Hashed password
- `firstName`, `lastName` - User names
- `phone` - Contact number
- `role` - ADMIN, MANAGER, ASSISTANT
- `language` - Default: "es" (Spanish)
- `timezone` - Default: "America/Asuncion"

**Relationships**:
- **Owns Properties**: One user → Many properties
- **Creates Maintenance**: Creates and assigns maintenance requests

**Sample Data**:
- Admin: Carlos Administrador (admin@propiedadespy.com)
- Manager: María Gestora (manager@propiedadespy.com)

---

### 2. **Properties** Table
**Purpose**: Real estate properties (buildings, houses, commercial spaces)

**Fields**:
- `id` - Unique identifier (Primary Key)
- `name` - Property name
- `address` - Street address
- `city` - City name
- `department` - Paraguay department (not state)
- `neighborhood` - Neighborhood/barrio
- `type` - APARTMENT, HOUSE, COMMERCIAL, etc.
- `totalUnits` - Number of rentable units
- `ownerId` - Links to Users table

**Relationships**:
- **Belongs to User**: Each property has one owner
- **Has Units**: One property → Many units
- **Has Expenses**: Property costs and bills
- **Has Maintenance**: Maintenance requests
- **Has Documents**: Contracts, photos, certificates

**Sample Data**:
- Edificio Central Plaza (Asunción, Central) - 2 units
- Casa Lambaré (Lambaré, Central) - 1 unit
- Complejo Ciudad del Este (Alto Paraná) - 1 commercial unit

---

### 3. **Units** Table
**Purpose**: Individual rentable spaces within properties

**Fields**:
- `id` - Unique identifier (Primary Key)
- `number` - Unit identifier ("101", "A", "Local 1")
- `bedrooms`, `bathrooms` - Room counts
- `sqm` - Square meters (common in Paraguay)
- `sqft` - Square feet (for international clients)
- `rentPYG` - Rent in Guaraníes
- `rentUSD` - Rent in US Dollars
- `currency` - Default currency (PYG or USD)
- `isOccupied` - Current occupancy status
- `propertyId` - Links to Properties table

**Relationships**:
- **Belongs to Property**: Each unit belongs to one property
- **Has Leases**: Multiple leases over time (one active)
- **Has Maintenance**: Unit-specific maintenance requests

**Sample Data**:
- Unit 101: 2 bed, 1.5 bath, ₲2,500,000/month
- Unit 102: 3 bed, 2 bath, ₲3,200,000/month  
- Local A: Commercial space, ₲4,500,000/month

---

### 4. **Tenants** Table
**Purpose**: People who rent the units

**Fields**:
- `id` - Unique identifier (Primary Key)
- `firstName`, `lastName` - Tenant names
- `email` - Contact email (Unique)
- `phone` - Phone number
- `whatsapp` - WhatsApp number (very common in Paraguay)
- `cedula` - Paraguay national ID (format: 1234567-8)
- `dateOfBirth` - Birth date
- `emergencyContact` - Emergency contact info
- `nationality` - Default: "PY" (Paraguay)
- `occupation` - Job/profession
- `monthlyIncome` - Income in Guaraníes

**Relationships**:
- **Has Leases**: One tenant → Multiple leases (different times/units)
- **Makes Payments**: All payments linked to tenants

**Sample Data**:
- María González (Cédula: 1234567-8, Contadora, ₲8M income)
- Carlos Rodríguez (Cédula: 8765432-1, Ingeniero, ₲12M income)
- Ana Silva (Cédula: 3456789-0, Comerciante, ₲15M income)

---

### 5. **Leases** Table
**Purpose**: Rental agreements between tenants and units

**Fields**:
- `id` - Unique identifier (Primary Key)
- `startDate`, `endDate` - Lease period
- `rentAmount` - Monthly rent amount
- `deposit` - Security deposit
- `currency` - PYG or USD
- `status` - ACTIVE, EXPIRED, TERMINATED
- `terms` - Contract terms (in Spanish)
- `unitId` - Links to Units table
- `tenantId` - Links to Tenants table

**Relationships**:
- **Connects Unit to Tenant**: The bridge between units and tenants
- **Has Payments**: All rent payments linked to leases

**Sample Data**:
- María rents Unit 101 (₲2,500,000/month, 12 months)
- Carlos rents Casa Lambaré (₲3,000,000/month, 12 months)
- Ana rents Commercial Local A (₲4,500,000/month, 12 months)

---

### 6. **Payments** Table
**Purpose**: Rent payments and related transactions

**Fields**:
- `id` - Unique identifier (Primary Key)
- `amount` - Payment amount
- `currency` - PYG or USD
- `dueDate` - When payment is due
- `paidDate` - When actually paid (NULL if unpaid)
- `status` - PENDING, PAID, LATE, PARTIAL
- `type` - RENT, DEPOSIT, LATE_FEE, UTILITY
- `method` - CASH, BANK_TRANSFER, CHECK, CARD
- `reference` - Bank reference or receipt number
- `leaseId` - Links to Leases table
- `tenantId` - Links to Tenants table

**Relationships**:
- **Belongs to Lease**: Each payment for specific lease
- **Made by Tenant**: Each payment by specific tenant

**Sample Data**:
- María: ₲2,500,000 (PAID, January rent)
- Carlos: ₲3,000,000 (PENDING, March rent)
- Ana: ₲4,500,000 (PAID, March rent)

---

### 7. **MaintenanceRequests** Table
**Purpose**: Property and unit maintenance tracking

**Fields**:
- `id` - Unique identifier (Primary Key)
- `title` - Brief description
- `description` - Detailed description
- `priority` - LOW, MEDIUM, HIGH, URGENT
- `status` - OPEN, IN_PROGRESS, COMPLETED, CANCELLED
- `cost` - Repair/maintenance cost
- `scheduledDate` - When work is scheduled
- `completedAt` - When work was completed
- `propertyId` - Links to Properties table
- `unitId` - Links to Units table (optional)
- `createdById` - Who reported the issue
- `assignedToId` - Who is fixing it

**Relationships**:
- **Belongs to Property**: Every request for specific property
- **May belong to Unit**: Some requests are unit-specific
- **Created by User**: Tracks who reported issue
- **Assigned to User**: Tracks who is responsible

**Sample Data**:
- Kitchen faucet leak (HIGH priority, OPEN)
- Garden maintenance (LOW priority, COMPLETED)
- A/C installation (MEDIUM priority, IN_PROGRESS)

---

### 8. **Expenses** Table
**Purpose**: Property-related costs and expenses

**Fields**:
- `id` - Unique identifier (Primary Key)
- `amount` - Expense amount
- `currency` - PYG or USD
- `description` - What the expense was for
- `category` - MAINTENANCE, UTILITIES, INSURANCE, TAXES
- `date` - When expense occurred
- `vendor` - Who was paid
- `isRecurring` - If it's a monthly/recurring expense
- `propertyId` - Links to Properties table

**Relationships**:
- **Belongs to Property**: Each expense for specific property

**Sample Data**:
- ANDE electricity bill: ₲500,000
- Cleaning service: ₲300,000 (recurring monthly)
- Property insurance: ₲1,200,000 (annual)

---

### 9. **ExchangeRates** Table
**Purpose**: Currency conversion rates for multi-currency support

**Fields**:
- `id` - Unique identifier (Primary Key)
- `fromCurrency` - Source currency (USD)
- `toCurrency` - Target currency (PYG)
- `rate` - Exchange rate
- `source` - API source
- `createdAt` - When rate was recorded

**Sample Data**:
- USD to PYG: 7,500 (1 USD = 7,500 Guaraníes)
- BRL to PYG: 1,500 (for Brazilian border regions)
- ARS to PYG: 8.5 (for Argentine border regions)

---

## 🔗 Key Relationships Explained

### **Property → Unit → Lease → Tenant Flow**
```
Property (Edificio Central Plaza)
    ↓
Unit (Apartment 101)
    ↓
Lease (12-month contract)
    ↓
Tenant (María González)
    ↓
Payments (Monthly ₲2,500,000)
```

### **User Management Flow**
```
User (Property Manager)
    ↓
Owns Properties (3 buildings)
    ↓
Creates Maintenance Requests
    ↓
Assigns to Other Users
```

### **Financial Tracking Flow**
```
Lease (₲2,500,000/month rent)
    ↓
Generates Monthly Payments
    ↓
Property has Expenses (ANDE ₲500,000)
    ↓
Net Income = Rent - Expenses
```

---

## 🇵🇾 Paraguay-Specific Features

### **Address System**
- **Departments**: Central, Alto Paraná (not states like US)
- **Cities**: Asunción (capital), Lambaré, Ciudad del Este
- **Neighborhoods**: Centro, Microcentro, Villa Morra

### **Identification**
- **Cédula**: Paraguay national ID format (1234567-8)
- **Phone Numbers**: +595 country code
- **WhatsApp**: Primary communication method in Paraguay

### **Currency**
- **Primary**: PYG (Guaraníes) - ₲2,500,000
- **Secondary**: USD for international clients
- **Exchange Rates**: Stored for historical tracking
- **Format**: ₲ symbol for Guaraníes, $ for USD

### **Language & Culture**
- **Default**: Spanish ("es")
- **Fallback**: English ("en")
- **Timezone**: America/Asuncion
- **Business**: Cash payments very common

---

## 📊 Business Logic Examples

### **Current Occupancy Rate**
Our database shows:
- **Total Units**: 4
- **Occupied Units**: 3
- **Occupancy Rate**: 75%

### **Monthly Income (March 2024)**
- María: ₲2,500,000 (PAID)
- Ana: ₲4,500,000 (PAID)
- Carlos: ₲3,000,000 (PENDING)
- **Total Collected**: ₲7,000,000
- **Total Expected**: ₲10,000,000

### **Property Performance**
- **Edificio Central Plaza**: 50% occupied (1/2 units)
- **Casa Lambaré**: 100% occupied (1/1 units)
- **Complejo Ciudad del Este**: 100% occupied (1/1 units)

---

## 🛠️ Common Database Operations

### **Adding a New Property**
1. Create record in `properties` table
2. Add units in `units` table
3. Upload photos to `documents` table

### **Renting to a New Tenant**
1. Create tenant in `tenants` table
2. Create lease in `leases` table
3. Update unit `isOccupied = true`
4. Generate first payment record

### **Processing Rent Payment**
1. Find payment record by tenant/lease
2. Update `paidDate` and `status = 'PAID'`
3. Add payment method and reference
4. Generate next month's payment record

### **Maintenance Workflow**
1. Create request in `maintenance_requests`
2. Assign to user (`assignedToId`)
3. Update status as work progresses
4. Record final cost and completion date

---

## 🔍 Data Integrity Rules

### **Business Rules**
- Each unit can only have **one ACTIVE lease** at a time
- Tenants must have **unique email and cédula**
- Payments must reference **valid lease and tenant**
- Exchange rates are **timestamped** for accuracy

### **Soft Deletes**
- Properties: Set `isActive = false` (don't actually delete)
- Tenants: Set `isActive = false` (preserve payment history)
- Units: Set `isActive = false` (preserve lease history)

---

## 🚀 How to Use the Database

### **View Database in Browser**
```bash
cd backend
npx prisma studio
# Opens at http://localhost:5555
```

### **Reset Database with Fresh Data**
```bash
cd backend
npx prisma db push --force-reset
node prisma/seed.js
```

### **Backup Database**
```bash
# SQLite file is at: backend/dev.db
cp backend/dev.db ../backup/dev-backup-2024-06-19.db
```

### **API Endpoints to Test**
- Health: http://localhost:3001/api/health
- Dashboard: http://localhost:3001/api/dashboard/summary
- Properties: http://localhost:3001/api/properties
- Tenants: http://localhost:3001/api/tenants
- Payments: http://localhost:3001/api/payments

---

## 📈 Current Database Status

### **Live Data Summary**
- **2 Users**: Admin and Manager accounts
- **3 Properties**: In different Paraguay departments
- **4 Units**: Mix of residential and commercial
- **3 Tenants**: With authentic Paraguay details
- **3 Active Leases**: All in Guaraníes
- **4 Payments**: Mix of paid and pending
- **3 Maintenance Requests**: Different priorities
- **3 Expenses**: Real Paraguay business costs

### **Sample Login Credentials**
- **Admin**: admin@propiedadespy.com / admin123
- **Manager**: manager@propiedadespy.com / admin123

---

This database provides a solid foundation for managing Paraguay real estate with proper relationships, data integrity, and cultural adaptations! 🏢🇵🇾

**Quick Reference**: Use Prisma Studio (http://localhost:5555) to browse and edit data visually! 