import React from 'react';
import {
  Shield,
  EyeOff,
  Lock,
  FileCheck,
  CheckCircle2,
  XCircle,
  Trash2,
  Key,
  UserX,
  AlertCircle,
} from 'lucide-react';

export const PrivacyPage: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header */}
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-semibold shadow-glow-sm">
          <EyeOff className="w-4 h-4 text-purple-400" />
          <span>Zero-Knowledge Architecture</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white">
          Privacy by Design
        </h1>
        <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
          Voting Beyond Borders enforces strict logical and physical separation between voter identity authentication and ballot content.
        </p>
      </div>

      {/* Comparison: What We Collect vs. What We NEVER Store */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left: What We Process Ephemerally */}
        <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-slate-800 space-y-4">
          <div className="flex items-center gap-2.5 text-emerald-400">
            <CheckCircle2 className="w-6 h-6" />
            <h3 className="text-lg font-bold text-white">What We Process Ephemerally</h3>
          </div>
          <p className="text-xs text-slate-400">
            Data used exclusively for instant cryptographic verification:
          </p>
          <ul className="space-y-2.5 text-xs text-slate-300">
            <li className="flex items-start gap-2">
              <span className="text-emerald-400 font-bold">✓</span>
              <span><strong>Consular Jurisdiction:</strong> To assign the correct virtual constituency ballot format.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-400 font-bold">✓</span>
              <span><strong>Eligibility Proof:</strong> Instant cryptographic signature confirming registration status.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-400 font-bold">✓</span>
              <span><strong>Blinded Nullifier Token:</strong> Single-use anonymous token preventing double-voting.</span>
            </li>
          </ul>
        </div>

        {/* Right: What We NEVER Store or Link */}
        <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-red-500/30 space-y-4">
          <div className="flex items-center gap-2.5 text-red-400">
            <XCircle className="w-6 h-6" />
            <h3 className="text-lg font-bold text-white">What We NEVER Store or Link</h3>
          </div>
          <p className="text-xs text-slate-400">
            Absolute privacy boundaries guaranteed by cryptographic architecture:
          </p>
          <ul className="space-y-2.5 text-xs text-slate-300">
            <li className="flex items-start gap-2">
              <span className="text-red-400 font-bold">✗</span>
              <span><strong>Plaintext Candidate Choice:</strong> Encrypted on your device before network transmission.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-400 font-bold">✗</span>
              <span><strong>Identity-to-Vote Association:</strong> Mathematically disconnected via blind signatures.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-400 font-bold">✗</span>
              <span><strong>Raw Biometric or Sensitive Credentials:</strong> Not stored or requested in this prototype.</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Privacy Principles Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-navy-900/60 border border-slate-800 space-y-2">
          <div className="w-9 h-9 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold">
            <UserX className="w-5 h-5" />
          </div>
          <h4 className="text-sm font-bold text-white">Data Minimization</h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            Only the bare cryptographic minimum required to prove eligibility and record encrypted ciphertext is transmitted.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-navy-900/60 border border-slate-800 space-y-2">
          <div className="w-9 h-9 rounded-xl bg-electric-500/20 text-electric-400 flex items-center justify-center font-bold">
            <Lock className="w-5 h-5" />
          </div>
          <h4 className="text-sm font-bold text-white">Client-Side Sealing</h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            SubtleCrypto API seals ballots locally. No server, ISP, or cloud administrator ever handles unencrypted vote data.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-navy-900/60 border border-slate-800 space-y-2">
          <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
            <Trash2 className="w-5 h-5" />
          </div>
          <h4 className="text-sm font-bold text-white">Ephemeral Sessions</h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            Authentication sessions and decryption keys in memory expire immediately after ballot submission.
          </p>
        </div>
      </div>

      {/* Prototype Notice */}
      <div className="p-4 rounded-2xl bg-navy-900 border border-saffron-500/30 flex items-start gap-3 text-xs text-slate-300">
        <AlertCircle className="w-5 h-5 text-saffron-400 shrink-0 mt-0.5" />
        <div>
          <strong className="text-white block mb-0.5">Hackathon Prototype Notice:</strong>
          This privacy policy describes the architectural guarantees designed for this demonstration. No real government identity databases or legal voter registers are accessed.
        </div>
      </div>
    </div>
  );
};
