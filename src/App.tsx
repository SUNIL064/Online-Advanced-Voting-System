import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { AppLayout } from './components/layout/AppLayout';
import { LandingPage } from './pages/LandingPage';
import { DemoElectionPage } from './pages/DemoElectionPage';
import { VerificationPage } from './pages/VerificationPage';
import { SecurityCenterPage } from './pages/SecurityCenterPage';
import { ArchitecturePage } from './pages/ArchitecturePage';
import { AuditDashboardPage } from './pages/AuditDashboardPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import { DiasporaMapPage } from './pages/DiasporaMapPage';
import { PrivacyPage } from './pages/PrivacyPage';
import { LegalPage } from './pages/LegalPage';
import { AboutPage } from './pages/AboutPage';

export const App: React.FC = () => {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<LandingPage />} />
            <Route path="demo-election" element={<DemoElectionPage />} />
            <Route path="verify" element={<VerificationPage />} />
            <Route path="security" element={<SecurityCenterPage />} />
            <Route path="architecture" element={<ArchitecturePage />} />
            <Route path="audit" element={<AuditDashboardPage />} />
            <Route path="admin" element={<AdminDashboardPage />} />
            <Route path="diaspora" element={<DiasporaMapPage />} />
            <Route path="privacy" element={<PrivacyPage />} />
            <Route path="legal" element={<LegalPage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
};

export default App;
