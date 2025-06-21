const cron = require('node-cron');
const axios = require('axios');

class CurrencyUpdateService {
    constructor() {
        // Basic initialization without cron for now
        console.log('Currency service initialized');
    }

    async updateExchangeRates() {
        try {
            console.log('Updating exchange rates...');

            // For now, just return a static rate
            const rate = 7500; // Base rate for PYG/USD
            console.log(`Exchange rate: 1 USD = ${rate} PYG`);

            return rate;
        } catch (error) {
            console.error('Failed to update exchange rates:', error);
            return 7500; // Fallback rate
        }
    }

    async getLatestRate(from, to) {
        // Return a mock rate object for now
        return {
            rate: 7500,
            createdAt: new Date(),
            source: 'static'
        };
    }

    convertUSDToPYG(usdAmount, rate) {
        return usdAmount * rate;
    }

    convertPYGToUSD(pygAmount, rate) {
        return pygAmount / rate;
    }

    formatPYG(amount) {
        return new Intl.NumberFormat('es-PY', {
            style: 'currency',
            currency: 'PYG',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(amount);
    }

    formatUSD(amount) {
        return new Intl.NumberFormat('es-PY', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(amount);
    }
}

const currencyService = new CurrencyUpdateService();

module.exports = { currencyService }; 