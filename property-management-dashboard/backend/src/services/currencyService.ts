import cron from 'node-cron';
import axios from 'axios';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class CurrencyUpdateService {
    constructor() {
        // Update exchange rates every hour
        cron.schedule('0 * * * *', this.updateExchangeRates.bind(this));
    }

    async updateExchangeRates() {
        try {
            console.log('Updating exchange rates...');

            // Get USD to PYG rate
            const response = await axios.get(
                'https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/usd/pyg.json'
            );

            const rate = response.data.pyg;

            // Save to database
            await prisma.exchangeRate.create({
                data: {
                    fromCurrency: 'USD',
                    toCurrency: 'PYG',
                    rate: rate,
                    source: 'currency-api'
                }
            });

            console.log(`Exchange rate updated: 1 USD = ${rate} PYG`);
        } catch (error) {
            console.error('Failed to update exchange rates:', error);

            // Try fallback API
            try {
                const fallbackResponse = await axios.get('https://api.exchangerate-api.com/v4/latest/USD');
                const fallbackRate = fallbackResponse.data.rates.PYG || 7500; // Fallback to approximate rate

                await prisma.exchangeRate.create({
                    data: {
                        fromCurrency: 'USD',
                        toCurrency: 'PYG',
                        rate: fallbackRate,
                        source: 'exchangerate-api-fallback'
                    }
                });

                console.log(`Fallback exchange rate updated: 1 USD = ${fallbackRate} PYG`);
            } catch (fallbackError) {
                console.error('Fallback currency API also failed:', fallbackError);
            }
        }
    }

    async getLatestRate(from: string, to: string) {
        return await prisma.exchangeRate.findFirst({
            where: {
                fromCurrency: from,
                toCurrency: to
            },
            orderBy: {
                createdAt: 'desc'
            }
        });
    }

    convertUSDToPYG(usdAmount: number, rate: number): number {
        return usdAmount * rate;
    }

    convertPYGToUSD(pygAmount: number, rate: number): number {
        return pygAmount / rate;
    }

    formatPYG(amount: number): string {
        return new Intl.NumberFormat('es-PY', {
            style: 'currency',
            currency: 'PYG',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(amount);
    }

    formatUSD(amount: number): string {
        return new Intl.NumberFormat('es-PY', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(amount);
    }
}

export const currencyService = new CurrencyUpdateService(); 