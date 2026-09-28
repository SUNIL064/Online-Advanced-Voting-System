import React from 'react';
import { AlertTriangle, ShieldCheck, Sparkles } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const PrototypeBanner: React.FC = () => {
  const { t, startGuidedDemo, isGuidedDemoActive } = useApp();

  return (
    <div className="bg-navy-900/95 border-b border-electric-500/20 px-4 py-2 text-xs md:text-sm text-slate-300 relative z-50 backdrop-blur-md">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
        <div className="flex items-center gap-2 text-center sm:text-left">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-saffron-500/15 border border-saffron-500/40 text-saffron-400 font-semibold text-[11px] tracking-wide uppercase shadow-glow-saffron/20">
            <AlertTriangle className="w-3.5 h-3.5" />
            Hackathon Prototype
          </span>
          <span className="text-slate-300">
            {t('disclaimerBanner')}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {!isGuidedDemoActive && (
            <button
              onClick={startGuidedDemo}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-electric-500/20 hover:bg-electric-500/30 text-electric-400 border border-electric-500/40 font-medium text-xs transition-all hover:scale-105"
            >
              <Sparkles className="w-3.5 h-3.5 text-electric-400" />
              <span>{t('btnLaunchGuided')}</span>
            </button>
          )}
          <span className="hidden lg:inline-flex items-center gap-1 text-[11px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
            <ShieldCheck className="w-3 h-3" />
            Zero-Knowledge Isolated
          </span>
        </div>
      </div>
    </div>
  );
};
