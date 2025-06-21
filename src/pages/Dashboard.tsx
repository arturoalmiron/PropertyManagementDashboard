import React from 'react';
import { useTranslation } from 'react-i18next';

export const Dashboard: React.FC = () => {
    const { t } = useTranslation();

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-900">{t('dashboard.title')}</h1>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="stat-card">
                    <div className="p-5">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <div className="w-8 h-8 bg-primary-500 rounded-md flex items-center justify-center">
                                    <span className="text-white text-sm font-bold">12</span>
                                </div>
                            </div>
                            <div className="ml-5 w-0 flex-1">
                                <dl>
                                    <dt className="stat-label">{t('dashboard.totalProperties')}</dt>
                                    <dd className="stat-number">12</dd>
                                </dl>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="p-5">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <div className="w-8 h-8 bg-green-500 rounded-md flex items-center justify-center">
                                    <span className="text-white text-sm font-bold">89%</span>
                                </div>
                            </div>
                            <div className="ml-5 w-0 flex-1">
                                <dl>
                                    <dt className="stat-label">{t('dashboard.occupancyRate')}</dt>
                                    <dd className="stat-number">89%</dd>
                                </dl>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="p-5">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <div className="w-8 h-8 bg-secondary-500 rounded-md flex items-center justify-center">
                                    <span className="text-white text-sm font-bold">₲</span>
                                </div>
                            </div>
                            <div className="ml-5 w-0 flex-1">
                                <dl>
                                    <dt className="stat-label">{t('dashboard.monthlyIncome')}</dt>
                                    <dd className="stat-number">₲ 45,000,000</dd>
                                </dl>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="p-5">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <div className="w-8 h-8 bg-red-500 rounded-md flex items-center justify-center">
                                    <span className="text-white text-sm font-bold">3</span>
                                </div>
                            </div>
                            <div className="ml-5 w-0 flex-1">
                                <dl>
                                    <dt className="stat-label">{t('dashboard.pendingPayments')}</dt>
                                    <dd className="stat-number">3</dd>
                                </dl>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Activity */}
                <div className="card">
                    <div className="p-6">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">
                            {t('dashboard.recentActivity')}
                        </h3>
                        <div className="space-y-4">
                            <div className="flex items-center space-x-3">
                                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                <p className="text-sm text-gray-600">
                                    Pago recibido de Juan Pérez - ₲ 3,500,000
                                </p>
                            </div>
                            <div className="flex items-center space-x-3">
                                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                <p className="text-sm text-gray-600">
                                    Nueva solicitud de mantenimiento en Edificio Centro
                                </p>
                            </div>
                            <div className="flex items-center space-x-3">
                                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                                <p className="text-sm text-gray-600">
                                    Contrato próximo a vencer - Maria López
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Financial Summary */}
                <div className="card">
                    <div className="p-6">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">
                            {t('dashboard.financialSummary')}
                        </h3>
                        <div className="space-y-4">
                            <div className="flex justify-between">
                                <span className="text-sm text-gray-600">{t('dashboard.monthlyIncome')}</span>
                                <span className="text-sm font-medium text-green-600">₲ 45,000,000</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-sm text-gray-600">{t('dashboard.totalExpenses')}</span>
                                <span className="text-sm font-medium text-red-600">₲ 8,500,000</span>
                            </div>
                            <div className="border-t pt-4 flex justify-between">
                                <span className="text-sm font-medium text-gray-900">{t('dashboard.netProfit')}</span>
                                <span className="text-sm font-bold text-primary-600">₲ 36,500,000</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Exchange Rate Info */}
            <div className="card">
                <div className="p-6">
                    <div className="flex justify-between items-center">
                        <h3 className="text-lg font-medium text-gray-900">
                            {t('currency.exchangeRate')}
                        </h3>
                        <div className="text-sm text-gray-500">
                            {t('currency.lastUpdated')}: {new Date().toLocaleDateString('es-PY')}
                        </div>
                    </div>
                    <div className="mt-4 flex items-center space-x-4">
                        <div className="text-2xl font-bold text-primary-600">
                            1 USD = ₲ 7,350
                        </div>
                        <div className="text-sm text-gray-500">
                            {/* Exchange rate trend indicator */}
                            <span className="text-green-600">↗ +0.2%</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}; 