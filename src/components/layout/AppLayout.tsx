import React from 'react';
import { Outlet } from 'react-router-dom';
import { PrototypeBanner } from './PrototypeBanner';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { AccessibilityModal } from '../common/AccessibilityModal';
import { GuidedDemoOverlay } from '../common/GuidedDemoOverlay';

export const AppLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-navy-950 text-slate-100 relative">
      <PrototypeBanner />
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
      <AccessibilityModal />
      <GuidedDemoOverlay />
    </div>
  );
};
