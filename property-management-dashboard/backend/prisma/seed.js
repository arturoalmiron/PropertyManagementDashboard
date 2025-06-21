const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
    console.log('🌱 Seeding database with Paraguay-specific data...');

    // Create admin user
    const adminUser = await prisma.user.create({
        data: {
            email: 'admin@propiedadespy.com',
            password: '$2b$10$K7L/VnVp8/FOf68aBVXoe.P/uQOyE.Jbsyp4hxc/fQlgg4Q2LG4W2', // password: admin123
            firstName: 'Carlos',
            lastName: 'Administrador',
            phone: '+595981234567',
            role: 'ADMIN',
            language: 'es',
            timezone: 'America/Asuncion',
        },
    });

    // Create manager user
    const managerUser = await prisma.user.create({
        data: {
            email: 'manager@propiedadespy.com',
            password: '$2b$10$K7L/VnVp8/FOf68aBVXoe.P/uQOyE.Jbsyp4hxc/fQlgg4Q2LG4W2', // password: admin123
            firstName: 'María',
            lastName: 'Gestora',
            phone: '+595987654321',
            role: 'MANAGER',
            language: 'es',
            timezone: 'America/Asuncion',
        },
    });

    // Create properties in different Paraguay departments
    const property1 = await prisma.property.create({
        data: {
            name: 'Edificio Central Plaza',
            address: 'Av. Eusebio Ayala 1234',
            city: 'Asunción',
            department: 'Central',
            neighborhood: 'Centro',
            zipCode: '1209',
            type: 'APARTMENT',
            description: 'Moderno edificio en el centro de Asunción con excelente ubicación',
            totalUnits: 12,
            ownerId: adminUser.id,
        },
    });

    const property2 = await prisma.property.create({
        data: {
            name: 'Casa Lambaré',
            address: 'Calle República Argentina 567',
            city: 'Lambaré',
            department: 'Central',
            neighborhood: 'Centro',
            type: 'HOUSE',
            description: 'Casa familiar en zona residencial tranquila',
            totalUnits: 1,
            ownerId: managerUser.id,
        },
    });

    const property3 = await prisma.property.create({
        data: {
            name: 'Complejo Ciudad del Este',
            address: 'Av. Monseñor Rodríguez 890',
            city: 'Ciudad del Este',
            department: 'Alto Paraná',
            neighborhood: 'Microcentro',
            type: 'COMMERCIAL',
            description: 'Local comercial en zona de alto tráfico',
            totalUnits: 3,
            ownerId: adminUser.id,
        },
    });

    // Create units for properties
    const units = await Promise.all([
        // Edificio Central Plaza units
        prisma.unit.create({
            data: {
                number: '101',
                bedrooms: 2,
                bathrooms: 1.5,
                sqm: 65,
                sqft: 700,
                rentPYG: 2500000, // 2.5M Guaraníes
                rentUSD: 350,
                depositPYG: 2500000,
                depositUSD: 350,
                currency: 'PYG',
                propertyId: property1.id,
            },
        }),
        prisma.unit.create({
            data: {
                number: '102',
                bedrooms: 3,
                bathrooms: 2,
                sqm: 85,
                sqft: 915,
                rentPYG: 3200000, // 3.2M Guaraníes
                rentUSD: 450,
                depositPYG: 3200000,
                depositUSD: 450,
                currency: 'PYG',
                propertyId: property1.id,
            },
        }),
        // Casa Lambaré unit
        prisma.unit.create({
            data: {
                number: '1',
                bedrooms: 3,
                bathrooms: 2,
                sqm: 120,
                sqft: 1290,
                rentPYG: 3000000, // 3M Guaraníes
                rentUSD: 420,
                depositPYG: 3000000,
                depositUSD: 420,
                currency: 'PYG',
                propertyId: property2.id,
            },
        }),
        // Ciudad del Este commercial units
        prisma.unit.create({
            data: {
                number: 'Local A',
                bedrooms: 0,
                bathrooms: 1,
                sqm: 45,
                sqft: 485,
                rentPYG: 4500000, // 4.5M Guaraníes
                rentUSD: 630,
                depositPYG: 9000000, // 2 months deposit
                depositUSD: 1260,
                currency: 'PYG',
                propertyId: property3.id,
            },
        }),
    ]);

    // Create tenants with Paraguay-specific data
    const tenants = await Promise.all([
        prisma.tenant.create({
            data: {
                firstName: 'María',
                lastName: 'González',
                email: 'maria.gonzalez@email.com',
                phone: '+595981234567',
                whatsapp: '+595981234567',
                cedula: '1234567-8',
                dateOfBirth: new Date('1985-03-15'),
                emergencyContact: 'José González - +595987654321',
                nationality: 'PY',
                language: 'es',
                occupation: 'Contadora',
                monthlyIncome: 8000000, // 8M Guaraníes
            },
        }),
        prisma.tenant.create({
            data: {
                firstName: 'Carlos',
                lastName: 'Rodríguez',
                email: 'carlos.rodriguez@email.com',
                phone: '+595987654321',
                whatsapp: '+595987654321',
                cedula: '8765432-1',
                dateOfBirth: new Date('1978-11-22'),
                emergencyContact: 'Ana Rodríguez - +595981111111',
                nationality: 'PY',
                language: 'es',
                occupation: 'Ingeniero',
                monthlyIncome: 12000000, // 12M Guaraníes
            },
        }),
        prisma.tenant.create({
            data: {
                firstName: 'Ana',
                lastName: 'Silva',
                email: 'ana.silva@email.com',
                phone: '+595983333333',
                whatsapp: '+595983333333',
                cedula: '3456789-0',
                dateOfBirth: new Date('1990-07-08'),
                emergencyContact: 'Pedro Silva - +595984444444',
                nationality: 'PY',
                language: 'es',
                occupation: 'Comerciante',
                monthlyIncome: 15000000, // 15M Guaraníes
            },
        }),
    ]);

    // Create leases
    const leases = await Promise.all([
        prisma.lease.create({
            data: {
                startDate: new Date('2024-01-01'),
                endDate: new Date('2024-12-31'),
                rentAmount: 2500000,
                deposit: 2500000,
                currency: 'PYG',
                status: 'ACTIVE',
                terms: 'Contrato de alquiler por 12 meses. Pago mensual hasta el día 5 de cada mes.',
                unitId: units[0].id,
                tenantId: tenants[0].id,
            },
        }),
        prisma.lease.create({
            data: {
                startDate: new Date('2024-02-01'),
                endDate: new Date('2025-01-31'),
                rentAmount: 3000000,
                deposit: 3000000,
                currency: 'PYG',
                status: 'ACTIVE',
                terms: 'Contrato de alquiler por 12 meses. Incluye mantenimiento de jardín.',
                unitId: units[2].id,
                tenantId: tenants[1].id,
            },
        }),
        prisma.lease.create({
            data: {
                startDate: new Date('2024-03-01'),
                endDate: new Date('2025-02-28'),
                rentAmount: 4500000,
                deposit: 9000000,
                currency: 'PYG',
                status: 'ACTIVE',
                terms: 'Contrato comercial por 12 meses. Horario de funcionamiento 8:00-20:00.',
                unitId: units[3].id,
                tenantId: tenants[2].id,
            },
        }),
    ]);

    // Mark units as occupied
    await Promise.all([
        prisma.unit.update({
            where: { id: units[0].id },
            data: { isOccupied: true },
        }),
        prisma.unit.update({
            where: { id: units[2].id },
            data: { isOccupied: true },
        }),
        prisma.unit.update({
            where: { id: units[3].id },
            data: { isOccupied: true },
        }),
    ]);

    // Create payments
    const payments = await Promise.all([
        // María's payments (paid)
        prisma.payment.create({
            data: {
                amount: 2500000,
                currency: 'PYG',
                dueDate: new Date('2024-01-05'),
                paidDate: new Date('2024-01-03'),
                status: 'PAID',
                type: 'RENT',
                method: 'BANK_TRANSFER',
                reference: 'TRF-001-2024',
                leaseId: leases[0].id,
                tenantId: tenants[0].id,
            },
        }),
        prisma.payment.create({
            data: {
                amount: 2500000,
                currency: 'PYG',
                dueDate: new Date('2024-02-05'),
                paidDate: new Date('2024-02-04'),
                status: 'PAID',
                type: 'RENT',
                method: 'CASH',
                leaseId: leases[0].id,
                tenantId: tenants[0].id,
            },
        }),
        // Carlos's payment (pending)
        prisma.payment.create({
            data: {
                amount: 3000000,
                currency: 'PYG',
                dueDate: new Date('2024-03-05'),
                status: 'PENDING',
                type: 'RENT',
                method: 'BANK_TRANSFER',
                leaseId: leases[1].id,
                tenantId: tenants[1].id,
            },
        }),
        // Ana's payment (paid)
        prisma.payment.create({
            data: {
                amount: 4500000,
                currency: 'PYG',
                dueDate: new Date('2024-03-05'),
                paidDate: new Date('2024-03-01'),
                status: 'PAID',
                type: 'RENT',
                method: 'CASH',
                leaseId: leases[2].id,
                tenantId: tenants[2].id,
            },
        }),
    ]);

    // Create maintenance requests
    const maintenanceRequests = await Promise.all([
        prisma.maintenanceRequest.create({
            data: {
                title: 'Reparar grifo de cocina',
                description: 'El grifo de la cocina tiene una fuga y necesita reparación urgente',
                priority: 'HIGH',
                status: 'OPEN',
                cost: 150000, // 150k Guaraníes
                currency: 'PYG',
                propertyId: property1.id,
                unitId: units[0].id,
                createdById: managerUser.id,
            },
        }),
        prisma.maintenanceRequest.create({
            data: {
                title: 'Mantenimiento de jardín',
                description: 'Corte de césped y poda de plantas en el jardín trasero',
                priority: 'LOW',
                status: 'COMPLETED',
                cost: 200000, // 200k Guaraníes
                currency: 'PYG',
                completedAt: new Date('2024-02-15'),
                propertyId: property2.id,
                unitId: units[2].id,
                createdById: managerUser.id,
                assignedToId: adminUser.id,
            },
        }),
        prisma.maintenanceRequest.create({
            data: {
                title: 'Instalación de aire acondicionado',
                description: 'Instalar nuevo equipo de aire acondicionado en local comercial',
                priority: 'MEDIUM',
                status: 'IN_PROGRESS',
                cost: 2500000, // 2.5M Guaraníes
                currency: 'PYG',
                scheduledDate: new Date('2024-03-20'),
                propertyId: property3.id,
                unitId: units[3].id,
                createdById: adminUser.id,
                assignedToId: managerUser.id,
            },
        }),
    ]);

    // Create expenses
    const expenses = await Promise.all([
        prisma.expense.create({
            data: {
                amount: 500000, // 500k Guaraníes
                currency: 'PYG',
                description: 'Pago de ANDE (electricidad) - Enero 2024',
                category: 'UTILITIES',
                date: new Date('2024-01-15'),
                vendor: 'ANDE',
                propertyId: property1.id,
            },
        }),
        prisma.expense.create({
            data: {
                amount: 300000, // 300k Guaraníes
                currency: 'PYG',
                description: 'Limpieza mensual de áreas comunes',
                category: 'CLEANING',
                date: new Date('2024-02-01'),
                vendor: 'Limpieza Total SRL',
                isRecurring: true,
                propertyId: property1.id,
            },
        }),
        prisma.expense.create({
            data: {
                amount: 1200000, // 1.2M Guaraníes
                currency: 'PYG',
                description: 'Seguro de propiedad - Anual',
                category: 'INSURANCE',
                date: new Date('2024-01-01'),
                vendor: 'Seguros Paraguayos SA',
                propertyId: property2.id,
            },
        }),
    ]);

    // Create exchange rates
    const exchangeRates = await Promise.all([
        prisma.exchangeRate.create({
            data: {
                fromCurrency: 'USD',
                toCurrency: 'PYG',
                rate: 7500,
                source: 'bcp.gov.py',
            },
        }),
        prisma.exchangeRate.create({
            data: {
                fromCurrency: 'BRL',
                toCurrency: 'PYG',
                rate: 1500,
                source: 'bcp.gov.py',
            },
        }),
        prisma.exchangeRate.create({
            data: {
                fromCurrency: 'ARS',
                toCurrency: 'PYG',
                rate: 8.5,
                source: 'bcp.gov.py',
            },
        }),
    ]);

    console.log('✅ Database seeded successfully!');
    console.log(`👤 Created ${await prisma.user.count()} users`);
    console.log(`🏢 Created ${await prisma.property.count()} properties`);
    console.log(`🏠 Created ${await prisma.unit.count()} units`);
    console.log(`👥 Created ${await prisma.tenant.count()} tenants`);
    console.log(`📄 Created ${await prisma.lease.count()} leases`);
    console.log(`💰 Created ${await prisma.payment.count()} payments`);
    console.log(`🔧 Created ${await prisma.maintenanceRequest.count()} maintenance requests`);
    console.log(`💸 Created ${await prisma.expense.count()} expenses`);
    console.log(`💱 Created ${await prisma.exchangeRate.count()} exchange rates`);

    console.log('\n🎯 Sample login credentials:');
    console.log('Admin: admin@propiedadespy.com / admin123');
    console.log('Manager: manager@propiedadespy.com / admin123');
}

main()
    .catch((e) => {
        console.error('❌ Error seeding database:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    }); 