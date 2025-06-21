import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './i18n';

// Layout components
import { MainLayout } from './components/layout/MainLayout';

// Page components
import { Dashboard } from './pages/Dashboard';
import { Properties } from './pages/Properties';
import { Tenants } from './pages/Tenants';
import { Payments } from './pages/Payments';
import { Maintenance } from './pages/Maintenance';
import { Reports } from './pages/Reports';
import { Settings } from './pages/Settings';

function App() {
    const { i18n } = useTranslation();

    return (
        <div className="App">
            <Router>
                <MainLayout>
                    <Routes>
                        <Route path="/" element={<Navigate to="/dashboard" replace />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/properties" element={<Properties />} />
                        <Route path="/tenants" element={<Tenants />} />
                        <Route path="/payments" element={<Payments />} />
                        <Route path="/maintenance" element={<Maintenance />} />
                        <Route path="/reports" element={<Reports />} />
                        <Route path="/settings" element={<Settings />} />
                    </Routes>
                </MainLayout>
            </Router>
        </div>
    );
}

export default App; 