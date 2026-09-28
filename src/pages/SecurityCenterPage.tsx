import React, { useState } from 'react';
import {
  Shield,
  ShieldCheck,
  Lock,
  Key,
  Server,
  Activity,
  AlertTriangle,
  Cpu,
  Layers,
  CheckCircle2,
  Terminal,
  RefreshCw,
  EyeOff,
  UserCheck,
  Flame,
  Radio,
} from 'lucide-react';
import { INITIAL_SECURITY_EVENTS, THREAT_MATRIX } from '../data/electionData';
import { SecurityEvent } from '../types';

export const SecurityCenterPage: React.FC = () => {
  const [securityEvents, setSecurityEvents] = useState<SecurityEvent[]>(INITIAL_SECURITY_EVENTS);
  const [isSimulatingAttack, setIsSimulatingAttack] = useState(false);
  const [selectedThreatIndex, setSelectedThreatIndex] = useState(0);

  const simulateDdosSpike = () => {
    setIsSimulatingAttack(true);
    setTimeout(() => {
      const newEvent: SecurityEvent = {
        id: `sec-${Date.now()}`,
        timestamp: new Date().toLocaleTimeString('en-US', { hour12: false }) + ' UTC',
        type: 'Volumetric SYN Flood Burst',
        severity: 'HIGH',
        source: 'Edge Cloud Armor WAF (Frankfurt Pop)',
        mitigation: 'Adaptive Anycast scrubbing & IP behavioral rate limiting enforced.',
        status: 'BLOCKED',
      };
      setSecurityEvents(prev => [newEvent, ...prev]);
      setIsSimulatingAttack(false);
    }, 1200);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header */}
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold shadow-glow-emerald/20">
          <Shield className="w-4 h-4 text-emerald-400" />
          <span>Government-Grade Trust Architecture</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white">
          Security by Design
        </h1>
        <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
          Voting Beyond Borders applies multi-tier defense-in-depth, client-side Web Crypto AES-256-GCM, zero-knowledge identity decoupling, and threshold cryptography.
        </p>
      </div>

      {/* Security Pillars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="glass-panel rounded-3xl p-6 border border-slate-800 space-y-3 hover:border-electric-500/40 transition">
          <div className="w-10 h-10 rounded-xl bg-electric-500/20 text-electric-400 border border-electric-500/30 flex items-center justify-center">
            <Lock className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-white">End-to-End Verifiability</h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            Voters receive individual cryptographic receipts to verify ballot inclusion, while independent observers can mathematically audit the aggregate tally without decrypting individual ballots.
          </p>
        </div>

        <div className="glass-panel rounded-3xl p-6 border border-slate-800 space-y-3 hover:border-saffron-500/40 transition">
          <div className="w-10 h-10 rounded-xl bg-saffron-500/20 text-saffron-400 border border-saffron-500/30 flex items-center justify-center">
            <Key className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-white">Client-Side Web Crypto</h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            Ballots are encrypted on the voter’s local hardware sandbox via native browser SubtleCrypto before network transmission, preventing plaintext interception.
          </p>
        </div>

        <div className="glass-panel rounded-3xl p-6 border border-slate-800 space-y-3 hover:border-emerald-500/40 transition">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center">
            <Layers className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-white">Tamper-Evident Ledger</h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            All ballot batch commitments and audit records are chained into an append-only Merkle tree structure. Any retroactive record modification invalidates downstream root hashes.
          </p>
        </div>

        <div className="glass-panel rounded-3xl p-6 border border-slate-800 space-y-3 hover:border-purple-500/40 transition">
          <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 border border-purple-500/30 flex items-center justify-center">
            <EyeOff className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-white">Identity Decoupling</h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            Authentication gateways issue ephemeral blinded nullifier tokens. The voting ingest server never receives the voter’s real passport or personal demographic data.
          </p>
        </div>

        <div className="glass-panel rounded-3xl p-6 border border-slate-800 space-y-3 hover:border-blue-500/40 transition">
          <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 border border-blue-500/30 flex items-center justify-center">
            <Activity className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-white">Edge WAF & DDoS Shield</h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            Distributed Anycast CDN edge gateways filter volumetric traffic and automated botnets, ensuring 99.99% system availability during critical election windows.
          </p>
        </div>

        <div className="glass-panel rounded-3xl p-6 border border-slate-800 space-y-3 hover:border-amber-500/40 transition">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-white">Coercion Resistance Concept</h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            Explores deterministic “last-vote-counts” re-voting policies, allowing overseas voters to overwrite forced choices if coerced in an untrusted home environment.
          </p>
        </div>
      </div>

      {/* Interactive Threat Model Matrix */}
      <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-electric-500/30 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <ShieldCheck className="w-6 h-6 text-emerald-400" />
              Interactive Threat Model & Defense Matrix
            </h2>
            <p className="text-xs text-slate-400">
              Select a threat scenario to inspect technical mitigations and security invariants.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Threats list */}
          <div className="lg:col-span-5 space-y-2">
            {THREAT_MATRIX.map((item, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedThreatIndex(idx)}
                className={`w-full p-3.5 rounded-xl text-left border transition text-xs flex items-center justify-between ${
                  selectedThreatIndex === idx
                    ? 'bg-navy-800 border-electric-400 text-white font-semibold shadow-glow-sm'
                    : 'bg-navy-950/60 border-slate-800 text-slate-300 hover:border-slate-700'
                }`}
              >
                <span>{item.threat}</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                  {item.status}
                </span>
              </button>
            ))}
          </div>

          {/* Selected threat deep dive */}
          <div className="lg:col-span-7 p-6 rounded-2xl bg-navy-950 border border-slate-800 space-y-4 text-xs">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="font-bold text-base text-electric-400">
                {THREAT_MATRIX[selectedThreatIndex].threat}
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-[11px] font-bold">
                Mitigation Active
              </span>
            </div>

            <div className="space-y-1">
              <strong className="text-slate-400 text-[11px] uppercase tracking-wider block">
                Potential Impact:
              </strong>
              <p className="text-slate-200">
                {THREAT_MATRIX[selectedThreatIndex].impact}
              </p>
            </div>

            <div className="space-y-1 p-3.5 rounded-xl bg-navy-900 border border-slate-800">
              <strong className="text-emerald-400 text-[11px] uppercase tracking-wider block">
                Engineered Protection:
              </strong>
              <p className="text-slate-300 leading-relaxed">
                {THREAT_MATRIX[selectedThreatIndex].protection}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Live Threat Sensor Telemetry */}
      <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-slate-800 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <Radio className="w-5 h-5 text-electric-400 animate-pulse" />
              Live Security Telemetry Sensor
            </h3>
            <p className="text-xs text-slate-400">
              Edge intrusion detection and cryptographic audit triggers.
            </p>
          </div>

          <button
            onClick={simulateDdosSpike}
            disabled={isSimulatingAttack}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-500/20 hover:bg-red-500/30 text-red-300 border border-red-500/40 text-xs font-semibold transition"
          >
            {isSimulatingAttack ? (
              <>
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                <span>Simulating Threat Pulse...</span>
              </>
            ) : (
              <>
                <Flame className="w-3.5 h-3.5 text-red-400" />
                <span>Simulate Edge Traffic Burst</span>
              </>
            )}
          </button>
        </div>

        <div className="divide-y divide-slate-800 rounded-2xl bg-navy-950 border border-slate-800 overflow-hidden text-xs font-mono">
          {securityEvents.map(evt => (
            <div key={evt.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2 hover:bg-navy-900/40">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <span className="text-slate-400">{evt.timestamp}</span>
                  <span className="font-bold text-white">{evt.type}</span>
                  <span className={`text-[10px] px-2 py-0.5 rounded font-semibold ${
                    evt.severity === 'HIGH' ? 'bg-red-500/20 text-red-400 border border-red-500/30' : 'bg-electric-500/20 text-electric-400'
                  }`}>
                    {evt.severity}
                  </span>
                </div>
                <div className="text-[11px] text-slate-400">
                  Source: {evt.source} • Mitigation: {evt.mitigation}
                </div>
              </div>
              <span className="text-emerald-400 font-bold self-start sm:self-center">
                {evt.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
