import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
    HomeIcon,
    BuildingOfficeIcon,
    UsersIcon,
    CreditCardIcon,
    WrenchScrewdriverIcon,
    DocumentChartBarIcon,
    Cog6ToothIcon,
    Bars3Icon,
    XMarkIcon,
    GlobeAltIcon,
    CurrencyDollarIcon
} from '@heroicons/react/24/outline';

interface MainLayoutProps {
    children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const location = useLocation();
    const { t, i18n } = useTranslation();

    const navigation = [
        { name: t('navigation.dashboard'), href: '/dashboard', icon: HomeIcon },
        { name: t('navigation.properties'), href: '/properties', icon: BuildingOfficeIcon },
        { name: t('navigation.tenants'), href: '/tenants', icon: UsersIcon },
        { name: t('navigation.payments'), href: '/payments', icon: CreditCardIcon },
        { name: t('navigation.maintenance'), href: '/maintenance', icon: WrenchScrewdriverIcon },
        { name: t('navigation.reports'), href: '/reports', icon: DocumentChartBarIcon },
        { name: t('navigation.settings'), href: '/settings', icon: Cog6ToothIcon },
    ];

    const toggleLanguage = () => {
        const newLang = i18n.language === 'es' ? 'en' : 'es';
        i18n.changeLanguage(newLang);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Mobile sidebar */}
            <div className={`fixed inset-0 z-40 md:hidden ${sidebarOpen ? '' : 'hidden'}`}>
                <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setSidebarOpen(false)} />
                <div className="relative flex w-full max-w-xs flex-1 flex-col bg-white">
                    <div className="absolute top-0 right-0 -mr-12 pt-2">
                        <button
                            type="button"
                            className="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                            onClick={() => setSidebarOpen(false)}
                        >
                            <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true" />
                        </button>
                    </div>
                    <div className="h-0 flex-1 overflow-y-auto pt-5 pb-4">
                        <div className="flex flex-shrink-0 items-center px-4">
                            <h1 className="text-xl font-bold text-primary-600">PropertyPY</h1>
                        </div>
                        <nav className="mt-5 space-y-1 px-2">
                            {navigation.map((item) => (
                                <Link
                                    key={item.name}
                                    to={item.href}
                                    className={`${location.pathname === item.href
                                            ? 'nav-link nav-link-active'
                                            : 'nav-link nav-link-inactive'
                                        }`}
                                    onClick={() => setSidebarOpen(false)}
                                >
                                    <item.icon className="mr-3 h-6 w-6 flex-shrink-0" aria-hidden="true" />
                                    {item.name}
                                </Link>
                            ))}
                        </nav>
                    </div>
                </div>
            </div>

            {/* Desktop sidebar */}
            <div className="hidden md:fixed md:inset-y-0 md:flex md:w-64 md:flex-col">
                <div className="flex min-h-0 flex-1 flex-col bg-white border-r border-gray-200">
                    <div className="flex flex-1 flex-col overflow-y-auto pt-5 pb-4">
                        <div className="flex flex-shrink-0 items-center px-4">
                            <BuildingOfficeIcon className="h-8 w-8 text-primary-600 mr-2" />
                            <h1 className="text-xl font-bold text-primary-600">PropertyPY</h1>
                        </div>
                        <nav className="mt-5 flex-1 space-y-1 px-2">
                            {navigation.map((item) => (
                                <Link
                                    key={item.name}
                                    to={item.href}
                                    className={`${location.pathname === item.href
                                            ? 'nav-link nav-link-active'
                                            : 'nav-link nav-link-inactive'
                                        }`}
                                >
                                    <item.icon className="mr-3 h-6 w-6 flex-shrink-0" aria-hidden="true" />
                                    {item.name}
                                </Link>
                            ))}
                        </nav>
                    </div>
                </div>
            </div>

            {/* Main content */}
            <div className="flex flex-1 flex-col md:pl-64">
                {/* Top header */}
                <div className="sticky top-0 z-10 bg-white pl-1 pt-1 sm:pl-3 sm:pt-3 md:hidden">
                    <button
                        type="button"
                        className="-ml-0.5 -mt-0.5 inline-flex h-12 w-12 items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
                        onClick={() => setSidebarOpen(true)}
                    >
                        <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                    </button>
                </div>

                {/* Header */}
                <header className="bg-white shadow-sm border-b border-gray-200">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="flex h-16 justify-between items-center">
                            <div className="flex items-center">
                                <h2 className="text-lg font-semibold text-gray-900">
                                    {navigation.find(nav => nav.href === location.pathname)?.name || t('dashboard.title')}
                                </h2>
                            </div>

                            <div className="flex items-center space-x-4">
                                {/* Currency indicator */}
                                <div className="flex items-center text-sm text-gray-500">
                                    <CurrencyDollarIcon className="h-4 w-4 mr-1" />
                                    <span>{t('currency.pyg')} / {t('currency.usd')}</span>
                                </div>

                                {/* Language toggle */}
                                <button
                                    onClick={toggleLanguage}
                                    className="flex items-center space-x-1 text-sm text-gray-500 hover:text-gray-700 transition-colors"
                                >
                                    <GlobeAltIcon className="h-4 w-4" />
                                    <span className="uppercase font-medium">{i18n.language}</span>
                                </button>

                                {/* User profile placeholder */}
                                <div className="flex items-center">
                                    <div className="h-8 w-8 rounded-full bg-primary-600 flex items-center justify-center">
                                        <span className="text-sm font-medium text-white">U</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Main content area */}
                <main className="flex-1">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}; 