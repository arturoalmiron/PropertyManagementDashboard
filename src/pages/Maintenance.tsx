import React from 'react';
import { useTranslation } from 'react-i18next';

export const Maintenance: React.FC = () => {
    const { t } = useTranslation();

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-900">{t('maintenance.title')}</h1>
                <button className="btn-primary">
                    {t('maintenance.createRequest')}
                </button>
            </div>

            <div className="card">
                <div className="p-6">
                    <p className="text-gray-600">
                        {t('maintenance.title')} - Coming Soon
                    </p>
                </div>
            </div>
        </div>
    );
}; 