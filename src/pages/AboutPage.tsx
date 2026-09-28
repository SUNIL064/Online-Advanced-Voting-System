import React from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  Shield,
  Layers,
  Award,
  Vote,
  Globe2,
  Lock,
  Code2,
  Users,
  ArrowRight,
  Github,
} from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header */}
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-electric-500/10 border border-electric-500/30 text-electric-300 text-xs font-semibold shadow-glow-sm">
          <Award className="w-4 h-4 text-electric-400" />
          <span>Hackathon Submission • Civic Tech & Cybersecurity</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white">
          About Voting Beyond Borders
        </h1>
        <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
          Exploring secure, verifiable voting beyond borders for 35+ million global overseas citizens.
        </p>
      </div>

      {/* Narrative Cards */}
      <div className="space-y-6">
        {/* The Problem */}
        <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-slate-800 space-y-3">
          <div className="flex items-center gap-2 text-saffron-400 font-bold text-base">
            <Globe2 className="w-5 h-5" />
            <h3>The Problem: Global Diaspora Disenfranchisement</h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Over 35 million overseas Indian citizens contribute immensely to the nation through annual remittances of over $120+ billion, cultural diplomacy, and global innovation. However, the requirement to physically cast votes at their home polling station in India effectively prevents the vast majority from exercising their constitutional franchise.
          </p>
        </div>

        {/* The Solution */}
        <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-electric-500/30 space-y-3">
          <div className="flex items-center gap-2 text-electric-400 font-bold text-base">
            <Lock className="w-5 h-5" />
            <h3>The Solution: Cryptographic Verifiability & Privacy</h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Voting Beyond Borders demonstrates an end-to-end verifiable remote voting prototype. By utilizing native client-side AES-256-GCM encryption, zero-knowledge identity decoupling, and Merkle tree inclusion receipts, the platform solves the foundational trifecta of digital voting: <strong>Eligibility verification</strong>, <strong>100% ballot secrecy</strong>, and <strong>individual verifiability</strong>.
          </p>
        </div>

        {/* Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-5 rounded-2xl bg-navy-900/60 border border-slate-800 space-y-2">
            <h4 className="font-bold text-white flex items-center gap-1.5">
              <Shield className="w-4 h-4 text-emerald-400" /> Defense-in-Depth
            </h4>
            <p className="text-slate-400 leading-relaxed text-[11px]">
              Multi-tier protection from client sandbox and Anycast DDoS filters to append-only Merkle tree ledgers.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-navy-900/60 border border-slate-800 space-y-2">
            <h4 className="font-bold text-white flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-electric-400" /> Scalable Topology
            </h4>
            <p className="text-slate-400 leading-relaxed text-[11px]">
              Engineered with React, TypeScript, Node.js, and Prisma ORM to scale to millions of concurrent ballots.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-navy-900/60 border border-slate-800 space-y-2">
            <h4 className="font-bold text-white flex items-center gap-1.5">
              <Users className="w-4 h-4 text-purple-400" /> Universal Access
            </h4>
            <p className="text-slate-400 leading-relaxed text-[11px]">
              Supports 6 languages, WCAG 2.1 AA accessibility controls, and low-bandwidth/offline progressive web capabilities.
            </p>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="p-8 rounded-3xl bg-navy-900 border border-electric-500/30 text-center space-y-4">
        <h3 className="text-2xl font-bold text-white">Experience the Demo Election</h3>
        <p className="text-xs text-slate-300 max-w-lg mx-auto">
          Test the voting journey from authentication and client-side encryption to receipt generation and independent verification.
        </p>
        <div className="flex justify-center gap-3 pt-2">
          <Link
            to="/demo-election"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-electric-600 to-electric-500 hover:from-electric-500 text-white font-bold text-xs shadow-glow-sm transition hover:scale-105"
          >
            <Vote className="w-4 h-4" />
            <span>Launch Demo Election</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};
