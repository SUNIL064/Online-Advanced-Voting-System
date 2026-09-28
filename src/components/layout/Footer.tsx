import React from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldCheck,
  Github,
  Lock,
  FileText,
  Accessibility,
  CheckCircle,
  ExternalLink,
  Code,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const Footer: React.FC = () => {
  const { t, setIsAccessibilityModalOpen } = useApp();
  const githubUrl = import.meta.env.VITE_GITHUB_URL || 'https://github.com';

  return (
    <footer className="bg-navy-950 border-t border-slate-800/80 text-slate-400 text-xs relative overflow-hidden">
      {/* Ambient gradient */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-gradient-to-b from-electric-900/10 to-transparent pointer-events-none blur-3xl"></div>

      {/* Transparency / Open Source Callout */}
      <div className="border-b border-slate-850 bg-navy-900/40 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="p-2.5 rounded-xl bg-electric-500/10 border border-electric-500/30 text-electric-400">
              <Code className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-slate-100 font-bold text-sm">Built for Transparency & Public Auditability</h4>
              <p className="text-slate-400 text-xs">
                Open technical designs and audit-oriented cryptographic architecture help independent security experts verify the system.
              </p>
            </div>
          </div>
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-navy-800 hover:bg-navy-700 text-slate-200 border border-slate-700 hover:border-slate-600 font-medium text-xs transition"
          >
            <Github className="w-4 h-4" />
            <span>View Project Repository</span>
            <ExternalLink className="w-3 h-3 text-slate-400" />
          </a>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Col 1: Brand & Identity */}
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-electric-600 border border-electric-400 flex items-center justify-center text-white font-bold text-xs">
                VB
              </div>
              <span className="font-extrabold text-sm text-slate-100">Voting Beyond Borders</span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed">
              Secure digital remote voting prototype exploring end-to-end verifiable civic technology for overseas Indian citizens.
            </p>
            <div className="flex items-center gap-2 text-[11px] text-emerald-400">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Secure • Private • Verifiable</span>
            </div>
          </div>

          {/* Col 2: Architecture & Security */}
          <div className="space-y-2">
            <h5 className="font-semibold text-slate-200 text-xs uppercase tracking-wider">Architecture</h5>
            <ul className="space-y-1.5 text-xs">
              <li>
                <Link to="/#how-it-works" className="hover:text-electric-400 transition">How It Works</Link>
              </li>
              <li>
                <Link to="/security" className="hover:text-electric-400 transition">Security by Design</Link>
              </li>
              <li>
                <Link to="/architecture" className="hover:text-electric-400 transition">System Topology</Link>
              </li>
              <li>
                <Link to="/audit" className="hover:text-electric-400 transition">Audit Transparency Log</Link>
              </li>
              <li>
                <Link to="/diaspora" className="hover:text-electric-400 transition">Global Diaspora Map</Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Experience & Verification */}
          <div className="space-y-2">
            <h5 className="font-semibold text-slate-200 text-xs uppercase tracking-wider">Demo Experience</h5>
            <ul className="space-y-1.5 text-xs">
              <li>
                <Link to="/demo-election" className="hover:text-electric-400 transition">Interactive Demo Election</Link>
              </li>
              <li>
                <Link to="/verify" className="hover:text-electric-400 transition">Cryptographic Receipt Verifier</Link>
              </li>
              <li>
                <Link to="/admin" className="hover:text-electric-400 transition">Operations Dashboard</Link>
              </li>
              <li>
                <button
                  onClick={() => setIsAccessibilityModalOpen(true)}
                  className="hover:text-electric-400 transition text-left"
                >
                  Accessibility Control Center
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Trust & Legal Disclaimers */}
          <div className="space-y-2">
            <h5 className="font-semibold text-slate-200 text-xs uppercase tracking-wider">Trust & Ethics</h5>
            <ul className="space-y-1.5 text-xs">
              <li>
                <Link to="/privacy" className="hover:text-electric-400 transition">Privacy by Design</Link>
              </li>
              <li>
                <Link to="/legal" className="hover:text-electric-400 transition">Legal & Statutory Status</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-electric-400 transition">About Project & Team</Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar / Hackathon Disclaimers */}
        <div className="pt-6 border-t border-slate-900 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <p className="max-w-2xl leading-relaxed text-center md:text-left">
            <strong>Hackathon Prototype Disclaimer:</strong> Voting Beyond Borders is an educational and technical prototype demonstrating end-to-end verifiable remote voting concepts. It does not provide legally binding voting and is not an official service of the Election Commission of India.
          </p>
          <div className="flex items-center gap-4">
            <span>© 2026 Voting Beyond Borders</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
