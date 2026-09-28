import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Globe,
  Accessibility,
  Menu,
  X,
  Vote,
  Sparkles,
  Wifi,
  WifiOff,
  ChevronDown,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Language } from '../../types';

export const Navbar: React.FC = () => {
  const {
    language,
    setLanguage,
    t,
    setIsAccessibilityModalOpen,
    isLowBandwidth,
    toggleLowBandwidth,
    voterSession,
  } = useApp();

  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsLangDropdownOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { label: t('navHome'), path: '/' },
    { label: t('navHowItWorks'), path: '/#how-it-works' },
    { label: t('navSecurity'), path: '/security' },
    { label: t('navVerification'), path: '/verify' },
    { label: t('navDemoElection'), path: '/demo-election' },
    { label: t('navAudit'), path: '/audit' },
    { label: t('navDiaspora'), path: '/diaspora' },
    { label: t('navArchitecture'), path: '/architecture' },
    { label: t('navAbout'), path: '/about' },
  ];

  const languages: { code: Language; label: string; nativeName: string }[] = [
    { code: 'en', label: 'English', nativeName: 'English' },
    { code: 'hi', label: 'Hindi', nativeName: 'हिन्दी' },
    { code: 'te', label: 'Telugu', nativeName: 'తెలుగు' },
    { code: 'ta', label: 'Tamil', nativeName: 'தமிழ்' },
    { code: 'bn', label: 'Bengali', nativeName: 'বাংলা' },
    { code: 'mr', label: 'Marathi', nativeName: 'मराठी' },
  ];

  const isActive = (path: string) => {
    if (path.startsWith('/#')) return false;
    return location.pathname === path;
  };

  return (
    <nav
      className={`sticky top-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-navy-950/90 backdrop-blur-xl border-b border-electric-500/20 py-2.5 shadow-2xl'
          : 'bg-navy-950/60 backdrop-blur-md border-b border-white/5 py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Left: Brand Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-navy-800 to-electric-600 border border-electric-400/40 flex items-center justify-center text-white font-black text-sm tracking-wider shadow-glow-sm group-hover:scale-105 transition">
            VB
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-base tracking-tight text-white flex items-center gap-1.5">
              Voting Beyond Borders
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-electric-500/20 text-electric-400 border border-electric-500/30 font-semibold uppercase">
                Demo
              </span>
            </span>
            <span className="text-[10px] text-slate-400 font-medium tracking-wide hidden sm:inline">
              {t('tagline')}
            </span>
          </div>
        </Link>

        {/* Center: Desktop Navigation */}
        <div className="hidden xl:flex items-center gap-1">
          {navLinks.map(link => {
            if (link.path.startsWith('/#')) {
              return (
                <a
                  key={link.path}
                  href={link.path}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-800/60 transition"
                >
                  {link.label}
                </a>
              );
            }
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                  isActive(link.path)
                    ? 'bg-electric-500/20 text-electric-400 border border-electric-500/30 font-semibold shadow-glow-sm/20'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* Right Controls */}
        <div className="hidden sm:flex items-center gap-2">
          {/* Low Bandwidth Toggle */}
          <button
            onClick={toggleLowBandwidth}
            title={isLowBandwidth ? 'Low-Bandwidth Mode Active (Click to disable)' : 'Enable Low-Bandwidth Mode'}
            className={`p-2 rounded-xl border text-xs font-medium flex items-center gap-1.5 transition ${
              isLowBandwidth
                ? 'bg-saffron-500/20 text-saffron-300 border-saffron-500/40'
                : 'bg-navy-900/60 text-slate-400 border-slate-800 hover:text-slate-200 hover:border-slate-700'
            }`}
          >
            {isLowBandwidth ? <WifiOff className="w-3.5 h-3.5 text-saffron-400" /> : <Wifi className="w-3.5 h-3.5" />}
            <span className="text-[11px] hidden md:inline">{isLowBandwidth ? 'Lite' : 'Fast'}</span>
          </button>

          {/* Accessibility Modal Toggle */}
          <button
            onClick={() => setIsAccessibilityModalOpen(true)}
            title="Accessibility Settings"
            className="p-2 rounded-xl bg-navy-900/60 border border-slate-800 text-slate-300 hover:text-white hover:border-electric-500/40 transition"
            aria-label="Open accessibility options"
          >
            <Accessibility className="w-4 h-4 text-electric-400" />
          </button>

          {/* Language Selector Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsLangDropdownOpen(prev => !prev)}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-navy-900/60 border border-slate-800 text-xs text-slate-300 hover:text-white hover:border-slate-700 transition"
            >
              <Globe className="w-3.5 h-3.5 text-electric-400" />
              <span className="uppercase font-semibold text-[11px]">{language}</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            {isLangDropdownOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-navy-900 border border-electric-500/30 rounded-xl shadow-2xl py-1 z-50 text-xs animate-in fade-in zoom-in-95">
                {languages.map(item => (
                  <button
                    key={item.code}
                    onClick={() => {
                      setLanguage(item.code);
                      setIsLangDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-1.5 flex items-center justify-between hover:bg-slate-800 transition ${
                      language === item.code ? 'text-electric-400 font-bold bg-electric-500/10' : 'text-slate-300'
                    }`}
                  >
                    <span>{item.label}</span>
                    <span className="text-[10px] text-slate-500">{item.nativeName}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Enter Demo Button */}
          <Link
            to="/demo-election"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-electric-600 to-electric-500 hover:from-electric-500 hover:to-electric-400 text-white font-semibold text-xs tracking-wide shadow-glow-sm transition hover:scale-105"
          >
            <Vote className="w-3.5 h-3.5" />
            <span>{voterSession?.hasVoted ? 'View Demo Ballot' : t('btnEnterDemo')}</span>
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex xl:hidden items-center gap-2">
          <button
            onClick={() => setIsAccessibilityModalOpen(true)}
            className="p-2 rounded-xl bg-navy-900/60 border border-slate-800 text-electric-400"
            aria-label="Accessibility"
          >
            <Accessibility className="w-4 h-4" />
          </button>
          <button
            onClick={() => setIsMobileMenuOpen(prev => !prev)}
            className="p-2 rounded-xl bg-navy-900/60 border border-slate-800 text-slate-300 hover:text-white"
            aria-label="Toggle Navigation Menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="xl:hidden bg-navy-950/95 border-b border-electric-500/30 px-4 pt-3 pb-6 space-y-3 backdrop-blur-2xl animate-in slide-in-from-top-4">
          <div className="grid grid-cols-2 gap-2">
            {navLinks.map(link => (
              <Link
                key={link.path}
                to={link.path}
                className={`p-2.5 rounded-xl text-xs font-medium transition ${
                  isActive(link.path)
                    ? 'bg-electric-500/20 text-electric-400 border border-electric-500/30'
                    : 'bg-navy-900/60 border border-slate-800 text-slate-300 hover:bg-slate-800'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Mobile Language Bar */}
          <div className="pt-2 border-t border-slate-800">
            <span className="text-[11px] text-slate-400 font-semibold block mb-2">Select Language</span>
            <div className="grid grid-cols-3 gap-1.5">
              {languages.map(item => (
                <button
                  key={item.code}
                  onClick={() => setLanguage(item.code)}
                  className={`py-1.5 px-2 rounded-lg text-xs font-medium text-center border ${
                    language === item.code
                      ? 'bg-electric-500/20 text-electric-300 border-electric-500/40'
                      : 'bg-navy-900/40 border-slate-800 text-slate-400'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-2">
            <Link
              to="/demo-election"
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-electric-600 to-electric-500 text-white font-bold text-xs shadow-glow-sm"
            >
              <Vote className="w-4 h-4" />
              <span>{t('btnEnterDemo')}</span>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};
