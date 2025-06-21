import React from 'react';
import { useTranslation } from 'react-i18next';

export const Payments: React.FC = () => {
    const { t } = useTranslation();

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-900">{t('payments.title')}</h1>
            </div>

            <div className="card">
                <div className="p-6">
                    <p className="text-gray-600">
                        {t('payments.title')} - Coming Soon
                    </p>
                </div>
            </div>
        </div>
    );
}; 