const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const dotenv = require('dotenv');
const { PrismaClient } = require('@prisma/client');
const { currencyService } = require('./services/currencyService');

// Load environment variables
dotenv.config();

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 3001;

// Security middleware
app.use(helmet());

// CORS configuration - Allow both React dev server and simple HTTP server
app.use(cors({
    origin: [
        'http://localhost:3000',  // React dev server
        'http://localhost:8002',  // Simple HTTP server
        process.env.FRONTEND_URL
    ].filter(Boolean),
    credentials: true
}));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({
        status: 'OK',
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || 'development'
    });
});

// Currency endpoint - simplified with basic fallback
app.get('/api/currency/rates', async (req, res) => {
    try {
        // Simple fallback approach - just return current rate
        const currentRate = 7500; // Base rate for PYG/USD

        res.json({
            rate: currentRate,
            lastUpdated: new Date(),
            source: 'static'
        });
    } catch (error) {
        console.error('Error with currency endpoint:', error);
        res.status(500).json({
            error: 'Failed to fetch exchange rate',
            rate: 7500,
            lastUpdated: new Date(),
            source: 'fallback'
        });
    }
});

// Database-powered API endpoints
app.get('/api/properties', async (req, res) => {
    try {
        const properties = await prisma.property.findMany({
            include: {
                units: {
                    select: {
                        id: true,
                        number: true,
                        isOccupied: true,
                        rentPYG: true,
                        rentUSD: true,
                        currency: true
                    }
                },
                _count: {
                    select: { units: true }
                }
            }
        });

        const formattedProperties = properties.map(property => ({
            ...property,
            totalUnits: property._count.units,
            occupiedUnits: property.units.filter(unit => unit.isOccupied).length,
            occupancyRate: property.units.length > 0
                ? (property.units.filter(unit => unit.isOccupied).length / property.units.length * 100).toFixed(1)
                : 0
        }));

        res.json(formattedProperties);
    } catch (error) {
        console.error('Error fetching properties:', error);
        res.status(500).json({ error: 'Failed to fetch properties' });
    }
});

app.get('/api/tenants', async (req, res) => {
    try {
        const tenants = await prisma.tenant.findMany({
            where: {
                isActive: true
            },
            include: {
                leases: {
                    where: { status: 'ACTIVE' },
                    include: {
                        unit: {
                            include: {
                                property: {
                                    select: { name: true, address: true, city: true }
                                }
                            }
                        }
                    }
                }
            },
            orderBy: { createdAt: 'desc' }
        });

        res.json(tenants);
    } catch (error) {
        console.error('Error fetching tenants:', error);
        res.status(500).json({ error: 'Failed to fetch tenants' });
    }
});

app.get('/api/payments', async (req, res) => {
    try {
        const payments = await prisma.payment.findMany({
            include: {
                tenant: {
                    select: { firstName: true, lastName: true, email: true }
                },
                lease: {
                    include: {
                        unit: {
                            include: {
                                property: {
                                    select: { name: true, address: true }
                                }
                            }
                        }
                    }
                }
            },
            orderBy: { dueDate: 'desc' },
            take: 50 // Limit to recent payments
        });

        const formattedPayments = payments.map(payment => ({
            ...payment,
            tenantName: `${payment.tenant.firstName} ${payment.tenant.lastName}`,
            propertyName: payment.lease.unit.property.name,
            unitNumber: payment.lease.unit.number
        }));

        res.json(formattedPayments);
    } catch (error) {
        console.error('Error fetching payments:', error);
        res.status(500).json({ error: 'Failed to fetch payments' });
    }
});

// Dashboard summary endpoint
app.get('/api/dashboard/summary', async (req, res) => {
    try {
        const [
            totalProperties,
            totalUnits,
            occupiedUnits,
            totalTenants,
            pendingPayments,
            monthlyIncome
        ] = await Promise.all([
            prisma.property.count(),
            prisma.unit.count(),
            prisma.unit.count({ where: { isOccupied: true } }),
            prisma.tenant.count(),
            prisma.payment.count({ where: { status: 'PENDING' } }),
            prisma.payment.aggregate({
                where: {
                    status: 'PAID',
                    paidDate: {
                        gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1)
                    }
                },
                _sum: { amount: true }
            })
        ]);

        const occupancyRate = totalUnits > 0 ? (occupiedUnits / totalUnits * 100).toFixed(1) : 0;

        res.json({
            totalProperties,
            totalUnits,
            occupiedUnits,
            occupancyRate,
            totalTenants,
            pendingPayments,
            monthlyIncome: monthlyIncome._sum.amount || 0,
            currency: 'PYG'
        });
    } catch (error) {
        console.error('Error fetching dashboard summary:', error);
        res.status(500).json({ error: 'Failed to fetch dashboard summary' });
    }
});

// Maintenance requests endpoint
app.get('/api/maintenance', async (req, res) => {
    try {
        const maintenanceRequests = await prisma.maintenanceRequest.findMany({
            include: {
                property: {
                    select: { name: true, address: true }
                },
                unit: {
                    select: { number: true }
                }
            },
            orderBy: [
                { priority: 'desc' },
                { createdAt: 'desc' }
            ]
        });

        res.json(maintenanceRequests);
    } catch (error) {
        console.error('Error fetching maintenance requests:', error);
        res.status(500).json({ error: 'Failed to fetch maintenance requests' });
    }
});

// POST Endpoints for Creating Records

// Create new tenant
app.post('/api/tenants', async (req, res) => {
    try {
        const { firstName, lastName, email, phone, whatsapp, cedula } = req.body;

        // Validate required fields
        if (!firstName || !lastName || !email || !phone) {
            return res.status(400).json({
                error: 'Missing required fields: firstName, lastName, email, phone'
            });
        }

        // Check if email already exists
        const existingTenant = await prisma.tenant.findUnique({
            where: { email }
        });

        if (existingTenant) {
            return res.status(400).json({
                error: 'Ya existe un inquilino con este email'
            });
        }

        const newTenant = await prisma.tenant.create({
            data: {
                firstName: firstName.trim(),
                lastName: lastName.trim(),
                email: email.trim().toLowerCase(),
                phone: phone.trim(),
                whatsapp: whatsapp?.trim() || null,
                cedula: cedula?.trim() || null,
                nationality: 'PY',
                language: 'es'
            }
        });

        res.status(201).json(newTenant);
    } catch (error) {
        console.error('Error creating tenant:', error);
        res.status(500).json({ error: 'Failed to create tenant' });
    }
});

// Create new property
app.post('/api/properties', async (req, res) => {
    try {
        const { name, address, city, department, type, description } = req.body;

        // Validate required fields
        if (!name || !address || !city || !department || !type) {
            return res.status(400).json({
                error: 'Missing required fields: name, address, city, department, type'
            });
        }

        // Validate property type
        const validTypes = ['APARTMENT', 'HOUSE', 'COMMERCIAL', 'LAND', 'DUPLEX', 'PENTHOUSE'];
        if (!validTypes.includes(type)) {
            return res.status(400).json({
                error: 'Invalid property type'
            });
        }

        // For now, we'll use a default owner ID (you'll need to implement user authentication)
        // Get the first user as the owner
        const defaultOwner = await prisma.user.findFirst();
        if (!defaultOwner) {
            return res.status(400).json({
                error: 'No owner found. Please create a user first.'
            });
        }

        const newProperty = await prisma.property.create({
            data: {
                name: name.trim(),
                address: address.trim(),
                city: city.trim(),
                department: department.trim(),
                type,
                description: description?.trim() || null,
                ownerId: defaultOwner.id
            }
        });

        res.status(201).json(newProperty);
    } catch (error) {
        console.error('Error creating property:', error);
        res.status(500).json({ error: 'Failed to create property' });
    }
});

// Create new payment
app.post('/api/payments', async (req, res) => {
    try {
        const { tenantId, amount, currency, dueDate, status, type, notes } = req.body;

        // Validate required fields
        if (!tenantId || !amount || !currency || !dueDate || !status || !type) {
            return res.status(400).json({
                error: 'Missing required fields: tenantId, amount, currency, dueDate, status, type'
            });
        }

        // Validate tenant exists
        const tenant = await prisma.tenant.findUnique({
            where: { id: tenantId },
            include: {
                leases: {
                    where: { status: 'ACTIVE' },
                    take: 1
                }
            }
        });

        if (!tenant) {
            return res.status(400).json({
                error: 'Inquilino no encontrado'
            });
        }

        // For now, if tenant has an active lease, use it. Otherwise, create payment without lease
        const leaseId = tenant.leases.length > 0 ? tenant.leases[0].id : null;

        const newPayment = await prisma.payment.create({
            data: {
                amount: parseFloat(amount),
                currency,
                dueDate: new Date(dueDate),
                paidDate: status === 'PAID' ? new Date() : null,
                status,
                type,
                notes: notes?.trim() || null,
                tenantId,
                leaseId
            },
            include: {
                tenant: {
                    select: { firstName: true, lastName: true, email: true }
                }
            }
        });

        res.status(201).json(newPayment);
    } catch (error) {
        console.error('Error creating payment:', error);
        res.status(500).json({ error: 'Failed to create payment' });
    }
});

// Create new maintenance request
app.post('/api/maintenance', async (req, res) => {
    try {
        const { propertyId, title, description, priority, status } = req.body;

        // Validate required fields
        if (!propertyId || !title || !description || !priority || !status) {
            return res.status(400).json({
                error: 'Missing required fields: propertyId, title, description, priority, status'
            });
        }

        // Validate property exists
        const property = await prisma.property.findUnique({
            where: { id: propertyId }
        });

        if (!property) {
            return res.status(400).json({
                error: 'Propiedad no encontrada'
            });
        }

        // Validate priority and status
        const validPriorities = ['LOW', 'MEDIUM', 'HIGH', 'URGENT'];
        const validStatuses = ['OPEN', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED'];

        if (!validPriorities.includes(priority)) {
            return res.status(400).json({ error: 'Invalid priority' });
        }

        if (!validStatuses.includes(status)) {
            return res.status(400).json({ error: 'Invalid status' });
        }

        const newMaintenanceRequest = await prisma.maintenanceRequest.create({
            data: {
                title: title.trim(),
                description: description.trim(),
                priority,
                status,
                propertyId,
                completedAt: status === 'COMPLETED' ? new Date() : null
            },
            include: {
                property: {
                    select: { name: true, address: true }
                }
            }
        });

        res.status(201).json(newMaintenanceRequest);
    } catch (error) {
        console.error('Error creating maintenance request:', error);
        res.status(500).json({ error: 'Failed to create maintenance request' });
    }
});

// Additional Tenant Endpoints

// Get single tenant by ID
app.get('/api/tenants/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const tenant = await prisma.tenant.findUnique({
            where: { id },
            include: {
                leases: {
                    include: {
                        unit: {
                            include: {
                                property: {
                                    select: { name: true, address: true }
                                }
                            }
                        }
                    }
                },
                payments: {
                    take: 10,
                    orderBy: { createdAt: 'desc' }
                }
            }
        });

        if (!tenant) {
            return res.status(404).json({ error: 'Inquilino no encontrado' });
        }

        res.json(tenant);
    } catch (error) {
        console.error('Error fetching tenant:', error);
        res.status(500).json({ error: 'Failed to fetch tenant' });
    }
});

// Update tenant
app.put('/api/tenants/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { firstName, lastName, email, phone, whatsapp, cedula } = req.body;

        // Validate required fields
        if (!firstName || !lastName || !email || !phone) {
            return res.status(400).json({
                error: 'Missing required fields: firstName, lastName, email, phone'
            });
        }

        // Check if tenant exists
        const existingTenant = await prisma.tenant.findUnique({
            where: { id }
        });

        if (!existingTenant) {
            return res.status(404).json({ error: 'Inquilino no encontrado' });
        }

        // Check if email is already taken by another tenant
        if (email !== existingTenant.email) {
            const emailTaken = await prisma.tenant.findUnique({
                where: { email }
            });

            if (emailTaken) {
                return res.status(400).json({
                    error: 'Ya existe un inquilino con este email'
                });
            }
        }

        const updatedTenant = await prisma.tenant.update({
            where: { id },
            data: {
                firstName: firstName.trim(),
                lastName: lastName.trim(),
                email: email.trim().toLowerCase(),
                phone: phone.trim(),
                whatsapp: whatsapp?.trim() || null,
                cedula: cedula?.trim() || null,
            }
        });

        res.json(updatedTenant);
    } catch (error) {
        console.error('Error updating tenant:', error);
        res.status(500).json({ error: 'Failed to update tenant' });
    }
});

// Delete tenant
app.delete('/api/tenants/:id', async (req, res) => {
    try {
        const { id } = req.params;

        // Check if tenant exists
        const existingTenant = await prisma.tenant.findUnique({
            where: { id },
            include: {
                leases: true,
                payments: true
            }
        });

        if (!existingTenant) {
            return res.status(404).json({ error: 'Inquilino no encontrado' });
        }

        // Check if tenant has active leases
        const activeLeases = existingTenant.leases.filter(lease => lease.status === 'ACTIVE');
        if (activeLeases.length > 0) {
            return res.status(400).json({
                error: 'No se puede eliminar un inquilino con contratos activos'
            });
        }

        // For now, we'll soft delete by setting isActive to false
        // In a real application, you might want to keep the tenant for historical records
        const deletedTenant = await prisma.tenant.update({
            where: { id },
            data: {
                isActive: false,
                email: `deleted_${Date.now()}_${existingTenant.email}` // Prevent email conflicts
            }
        });

        res.json({ message: 'Inquilino eliminado exitosamente' });
    } catch (error) {
        console.error('Error deleting tenant:', error);
        res.status(500).json({ error: 'Failed to delete tenant' });
    }
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        error: 'Something went wrong!',
        ...(process.env.NODE_ENV === 'development' && { details: err.message })
    });
});

// 404 handler
app.use('*', (req, res) => {
    res.status(404).json({ error: 'Route not found' });
});

// Graceful shutdown
process.on('SIGINT', async () => {
    console.log('Shutting down gracefully...');
    await prisma.$disconnect();
    process.exit(0);
});

process.on('SIGTERM', async () => {
    console.log('Shutting down gracefully...');
    await prisma.$disconnect();
    process.exit(0);
});

// Start server
app.listen(PORT, async () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`🌐 CORS enabled for: http://localhost:3000, http://localhost:8002`);

    // Test database connection
    try {
        await prisma.$connect();
        console.log('💾 Database connected successfully');

        // Show some stats
        const propertyCount = await prisma.property.count();
        const tenantCount = await prisma.tenant.count();
        const paymentCount = await prisma.payment.count();

        console.log(`📊 Database contains: ${propertyCount} properties, ${tenantCount} tenants, ${paymentCount} payments`);
    } catch (error) {
        console.error('❌ Database connection failed:', error.message);
    }
});

module.exports = app; 