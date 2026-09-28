import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ChevronLeft,
  ChevronRight,
  Sparkles,
  X,
  Shield,
  HelpCircle,
  RotateCcw,
} from 'lucide-react';
import { GUIDED_STEPS, useApp } from '../../context/AppContext';

export const GuidedDemoOverlay: React.FC = () => {
  const navigate = useNavigate();
  const {
    isGuidedDemoActive,
    currentGuidedStep,
    nextGuidedStep,
    prevGuidedStep,
    exitGuidedDemo,
    loginDemoVoter,
    resetSystemState,
  } = useApp();

  if (!isGuidedDemoActive) return null;

  const currentStepData = GUIDED_STEPS[currentGuidedStep - 1] || GUIDED_STEPS[0];

  const handleNext = () => {
    if (currentGuidedStep === 1) {
      navigate('/demo-election');
    } else if (currentGuidedStep === 2) {
      loginDemoVoter();
      navigate('/demo-election');
    } else if (currentGuidedStep === 6) {
      navigate('/verify');
    } else if (currentGuidedStep === 7) {
      navigate('/audit');
    }
    nextGuidedStep();
  };

  const handlePrev = () => {
    prevGuidedStep();
  };

  const handleJump = (stepId: number, route: string) => {
    navigate(route);
  };

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-11/12 max-w-3xl bg-navy-900/95 border-2 border-electric-500/50 rounded-2xl p-4 shadow-2xl backdrop-blur-xl animate-in slide-in-from-bottom-5">
      {/* Header bar */}
      <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800 text-xs">
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-electric-500/20 text-electric-300 font-bold border border-electric-500/40 uppercase tracking-wider text-[10px]">
            <Sparkles className="w-3 h-3 text-electric-400" />
            Judge Guided Tour ({currentGuidedStep}/{GUIDED_STEPS.length})
          </span>
          <span className="font-semibold text-slate-200 hidden sm:inline">
            {currentStepData.title}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              resetSystemState();
              navigate('/');
            }}
            title="Reset demo data"
            className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-slate-200 px-2 py-1 rounded hover:bg-slate-800"
          >
            <RotateCcw className="w-3 h-3" />
            <span className="hidden md:inline">Reset Demo</span>
          </button>
          <button
            onClick={exitGuidedDemo}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800"
            title="Close guided mode"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Body info cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs mb-3">
        <div className="p-2.5 rounded-xl bg-navy-800/60 border border-slate-800">
          <div className="font-semibold text-electric-400 mb-1 flex items-center gap-1">
            <HelpCircle className="w-3.5 h-3.5" /> What Is Happening
          </div>
          <p className="text-slate-300 leading-relaxed text-[11px]">
            {currentStepData.explanation}
          </p>
        </div>

        <div className="p-2.5 rounded-xl bg-navy-800/60 border border-slate-800">
          <div className="font-semibold text-saffron-400 mb-1 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5" /> Why It Matters
          </div>
          <p className="text-slate-300 leading-relaxed text-[11px]">
            {currentStepData.whyItMatters}
          </p>
        </div>

        <div className="p-2.5 rounded-xl bg-navy-800/60 border border-slate-800">
          <div className="font-semibold text-emerald-400 mb-1 flex items-center gap-1">
            <Shield className="w-3.5 h-3.5" /> Security Guarantee
          </div>
          <p className="text-slate-300 leading-relaxed text-[11px]">
            {currentStepData.securityGuarantee}
          </p>
        </div>
      </div>

      {/* Progress Dots and Action Buttons */}
      <div className="flex items-center justify-between pt-1">
        <div className="flex items-center gap-1.5">
          {GUIDED_STEPS.map(step => (
            <button
              key={step.id}
              onClick={() => handleJump(step.id, step.route)}
              className={`h-2 rounded-full transition-all ${
                currentGuidedStep === step.id
                  ? 'w-6 bg-electric-400 shadow-glow-sm'
                  : currentGuidedStep > step.id
                  ? 'w-2 bg-emerald-500'
                  : 'w-2 bg-slate-700 hover:bg-slate-600'
              }`}
              title={`Step ${step.id}: ${step.title}`}
            />
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handlePrev}
            disabled={currentGuidedStep === 1}
            className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-navy-800 border border-slate-700 text-xs font-semibold text-slate-300 disabled:opacity-40 hover:bg-slate-800"
          >
            <ChevronLeft className="w-3.5 h-3.5" /> Prev
          </button>
          <button
            onClick={handleNext}
            className="flex items-center gap-1 px-4 py-1.5 rounded-xl bg-gradient-to-r from-electric-600 to-electric-500 hover:from-electric-500 hover:to-electric-400 text-white text-xs font-bold shadow-glow-sm transition hover:scale-105"
          >
            {currentGuidedStep === GUIDED_STEPS.length ? 'Finish Tour' : 'Next Step'}{' '}
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
