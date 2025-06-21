import React from 'react';
import { useTranslation } from 'react-i18next';

export const Settings: React.FC = () => {
    const { t } = useTranslation();

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-900">{t('navigation.settings')}</h1>
            </div>

            <div className="card">
                <div className="p-6">
                    <p className="text-gray-600">
                        {t('navigation.settings')} - Coming Soon
                    </p>
                </div>
            </div>
        </div>
    );
}; 