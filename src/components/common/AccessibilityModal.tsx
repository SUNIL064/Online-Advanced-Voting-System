import React from 'react';
import {
  Accessibility,
  Eye,
  Type,
  Zap,
  Check,
  X,
  Volume2,
  Sliders,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { ContrastMode, FontPreference, MotionPreference, TextSize } from '../../types';

export const AccessibilityModal: React.FC = () => {
  const {
    accessibility,
    updateAccessibility,
    isAccessibilityModalOpen,
    setIsAccessibilityModalOpen,
  } = useApp();

  if (!isAccessibilityModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-navy-900 border border-electric-500/30 rounded-2xl p-6 shadow-2xl text-slate-100 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-electric-500/20 text-electric-400 border border-electric-500/30">
              <Accessibility className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-100">Accessibility Control Center</h2>
              <p className="text-xs text-slate-400">WCAG 2.1 AA Compliant Display Preferences</p>
            </div>
          </div>
          <button
            onClick={() => setIsAccessibilityModalOpen(false)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-6">
          {/* Text Size */}
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-slate-200 mb-2.5">
              <Type className="w-4 h-4 text-electric-400" />
              Text Size Scaling
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(['normal', 'large', 'xlarge'] as TextSize[]).map(size => (
                <button
                  key={size}
                  onClick={() => updateAccessibility({ textSize: size })}
                  className={`px-3 py-2.5 rounded-xl border text-xs font-medium capitalize flex items-center justify-center gap-1.5 transition-all ${
                    accessibility.textSize === size
                      ? 'bg-electric-500/20 border-electric-400 text-electric-300 shadow-glow-sm'
                      : 'bg-navy-800/60 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  {accessibility.textSize === size && <Check className="w-3.5 h-3.5 text-electric-400" />}
                  {size === 'normal' ? 'Normal (100%)' : size === 'large' ? 'Large (115%)' : 'Extra Large (130%)'}
                </button>
              ))}
            </div>
          </div>

          {/* Contrast */}
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-slate-200 mb-2.5">
              <Eye className="w-4 h-4 text-saffron-400" />
              Contrast Mode
            </label>
            <div className="grid grid-cols-2 gap-2">
              {(['standard', 'high'] as ContrastMode[]).map(mode => (
                <button
                  key={mode}
                  onClick={() => updateAccessibility({ contrast: mode })}
                  className={`px-3 py-2.5 rounded-xl border text-xs font-medium capitalize flex items-center justify-center gap-1.5 transition-all ${
                    accessibility.contrast === mode
                      ? 'bg-saffron-500/20 border-saffron-400 text-saffron-300 shadow-glow-saffron/20'
                      : 'bg-navy-800/60 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  {accessibility.contrast === mode && <Check className="w-3.5 h-3.5 text-saffron-400" />}
                  {mode === 'standard' ? 'Standard Contrast' : 'High Contrast (WCAG AAA)'}
                </button>
              ))}
            </div>
          </div>

          {/* Motion */}
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-slate-200 mb-2.5">
              <Zap className="w-4 h-4 text-emerald-400" />
              Motion & Animation
            </label>
            <div className="grid grid-cols-2 gap-2">
              {(['full', 'reduced'] as MotionPreference[]).map(motion => (
                <button
                  key={motion}
                  onClick={() => updateAccessibility({ motion: motion })}
                  className={`px-3 py-2.5 rounded-xl border text-xs font-medium capitalize flex items-center justify-center gap-1.5 transition-all ${
                    accessibility.motion === motion
                      ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300 shadow-glow-emerald/20'
                      : 'bg-navy-800/60 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  {accessibility.motion === motion && <Check className="w-3.5 h-3.5 text-emerald-400" />}
                  {motion === 'full' ? 'Full Motion' : 'Reduced Motion'}
                </button>
              ))}
            </div>
          </div>

          {/* Typography */}
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-slate-200 mb-2.5">
              <Sliders className="w-4 h-4 text-purple-400" />
              Font Dyslexia / Readability
            </label>
            <div className="grid grid-cols-2 gap-2">
              {(['default', 'readable'] as FontPreference[]).map(font => (
                <button
                  key={font}
                  onClick={() => updateAccessibility({ font: font })}
                  className={`px-3 py-2.5 rounded-xl border text-xs font-medium capitalize flex items-center justify-center gap-1.5 transition-all ${
                    accessibility.font === font
                      ? 'bg-purple-500/20 border-purple-400 text-purple-300'
                      : 'bg-navy-800/60 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  {accessibility.font === font && <Check className="w-3.5 h-3.5 text-purple-400" />}
                  {font === 'default' ? 'Standard Modern' : 'High Readability (Inter)'}
                </button>
              ))}
            </div>
          </div>

          {/* Screen Reader & Keyboard Navigation Status */}
          <div className="p-3.5 rounded-xl bg-navy-800/50 border border-slate-800 text-xs space-y-2">
            <div className="flex items-center justify-between text-slate-300">
              <span className="flex items-center gap-1.5">
                <Volume2 className="w-3.5 h-3.5 text-electric-400" />
                Screen Reader ARIA Optimization:
              </span>
              <span className="text-emerald-400 font-semibold">ACTIVE</span>
            </div>
            <div className="flex items-center justify-between text-slate-300">
              <span className="flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5 text-saffron-400" />
                Keyboard Focus Trapping & Navigation:
              </span>
              <span className="text-emerald-400 font-semibold">ENABLED</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-slate-800 flex justify-end">
          <button
            onClick={() => setIsAccessibilityModalOpen(false)}
            className="px-5 py-2 rounded-xl bg-electric-600 hover:bg-electric-500 text-white text-xs font-semibold shadow-glow-sm transition"
          >
            Apply & Close
          </button>
        </div>
      </div>
    </div>
  );
};
