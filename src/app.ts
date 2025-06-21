import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';
import { currencyService } from './services/currencyService';

// Load environment variables
dotenv.config();

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 3001;

// Security middleware
app.use(helmet());

// Rate limiting
const limiter = rateLimit({
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000'), // 15 minutes
    max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100'), // limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again later.'
});
app.use(limiter);

// CORS configuration
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
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
        environment: process.env.NODE_ENV
    });
});

// Currency endpoint
app.get('/api/currency/rates', async (req, res) => {
    try {
        const latestRate = await currencyService.getLatestRate('USD', 'PYG');

        if (!latestRate) {
            // If no rate in database, get current rate
            await currencyService.updateExchangeRates();
            const newRate = await currencyService.getLatestRate('USD', 'PYG');

            return res.json({
                rate: newRate?.rate || 7500,
                lastUpdated: newRate?.createdAt || new Date(),
                source: newRate?.source || 'fallback'
            });
        }

        res.json({
            rate: latestRate.rate,
            lastUpdated: latestRate.createdAt,
            source: latestRate.source
        });
    } catch (error) {
        console.error('Error fetching exchange rate:', error);
        res.status(500).json({
            error: 'Failed to fetch exchange rate',
            rate: 7500, // Fallback rate
            lastUpdated: new Date(),
            source: 'fallback'
        });
    }
});

// API Routes will be added here
// app.use('/api/auth', authRoutes);
// app.use('/api/properties', propertyRoutes);
// app.use('/api/tenants', tenantRoutes);
// app.use('/api/payments', paymentRoutes);
// app.use('/api/maintenance', maintenanceRoutes);

// Error handling middleware
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
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
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📊 Environment: ${process.env.NODE_ENV}`);
    console.log(`🌐 CORS enabled for: ${process.env.FRONTEND_URL}`);

    // Initialize currency service
    console.log('💱 Currency service initialized');
});

export default app; 