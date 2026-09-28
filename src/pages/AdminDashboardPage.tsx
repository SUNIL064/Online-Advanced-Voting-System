import React, { useState } from 'react';
import {
  Sliders,
  Server,
  Activity,
  Shield,
  RefreshCw,
  Play,
  Pause,
  AlertTriangle,
  Cpu,
  Database,
  Lock,
  Flame,
  CheckCircle2,
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const AdminDashboardPage: React.FC = () => {
  const { recordAuditLog } = useApp();
  const [electionStatus, setElectionStatus] = useState<'ACTIVE' | 'PAUSED'>('ACTIVE');
  const [healthScore, setHealthScore] = useState(99.9);
  const [activeTab, setActiveTab] = useState<'overview' | 'nodes' | 'ledger' | 'security'>('overview');

  const handleToggleElection = () => {
    const nextStatus = electionStatus === 'ACTIVE' ? 'PAUSED' : 'ACTIVE';
    setElectionStatus(nextStatus);
    recordAuditLog(
      `Demo Election Status Changed: ${nextStatus}`,
      'SYSTEM',
      `Administrator toggled demo election window state to ${nextStatus}.`,
      'RECORDED'
    );
  };

  const handleTriggerIntegrityAudit = () => {
    recordAuditLog(
      'Manual Cryptographic Ledger Audit',
      'INTEGRITY',
      'Merkle tree root #4892 consistency verification completed across all federated consular nodes.',
      'VERIFIED'
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Disclaimer Pill */}
      <div className="p-3 rounded-2xl bg-navy-900/90 border border-saffron-500/30 flex items-center justify-between text-xs text-slate-300">
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-saffron-400" />
          <span>
            <strong>Demo Election Operations Control Room:</strong> All metrics, node controls, and election window triggers operate exclusively on mock hackathon data.
          </span>
        </div>
        <span className="px-2.5 py-0.5 rounded bg-saffron-500/20 text-saffron-300 border border-saffron-500/40 text-[10px] font-bold">
          ADMIN SANDBOX
        </span>
      </div>

      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-white flex items-center gap-2.5">
            <Sliders className="w-7 h-7 text-electric-400" />
            Election Operations Dashboard
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Real-time consensus telemetry, node cluster status, and cryptographic ledger health.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleToggleElection}
            className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition ${
              electionStatus === 'ACTIVE'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 hover:bg-amber-500/30'
                : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-500/30'
            }`}
          >
            {electionStatus === 'ACTIVE' ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            <span>{electionStatus === 'ACTIVE' ? 'Pause Demo Voting' : 'Resume Demo Voting'}</span>
          </button>

          <button
            onClick={handleTriggerIntegrityAudit}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-electric-600 hover:bg-electric-500 text-white text-xs font-bold shadow-glow-sm transition"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Trigger Integrity Check</span>
          </button>
        </div>
      </div>

      {/* Operations Telemetry Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-card rounded-2xl p-5 border border-slate-800 space-y-2">
          <span className="text-xs text-slate-400 font-semibold">Voting Window</span>
          <div className="text-2xl font-black text-white flex items-center gap-2">
            <span className={`w-3 h-3 rounded-full ${electionStatus === 'ACTIVE' ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`}></span>
            {electionStatus}
          </div>
          <p className="text-[11px] text-slate-500">Scheduled: Ends in 14d 06h</p>
        </div>

        <div className="glass-card rounded-2xl p-5 border border-slate-800 space-y-2">
          <span className="text-xs text-slate-400 font-semibold">Consensus Health</span>
          <div className="text-2xl font-black text-emerald-400 font-mono">
            {healthScore}%
          </div>
          <p className="text-[11px] text-slate-500">48 Federated Consular Nodes Sync</p>
        </div>

        <div className="glass-card rounded-2xl p-5 border border-slate-800 space-y-2">
          <span className="text-xs text-slate-400 font-semibold">Ingestion Ingress Load</span>
          <div className="text-2xl font-black text-electric-400 font-mono">
            184 req/s
          </div>
          <p className="text-[11px] text-slate-500">Peak Capacity: 25,000 req/s</p>
        </div>

        <div className="glass-card rounded-2xl p-5 border border-slate-800 space-y-2">
          <span className="text-xs text-slate-400 font-semibold">Pending Merkle Commit</span>
          <div className="text-2xl font-black text-saffron-400 font-mono">
            13 Ballots
          </div>
          <p className="text-[11px] text-slate-500">Next batch block in 42s</p>
        </div>
      </div>

      {/* Node Clusters & Health */}
      <div className="glass-panel rounded-3xl p-6 border border-slate-800 space-y-4">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <Server className="w-4 h-4 text-electric-400" />
          Consular Node Cluster Topologies (Simulated)
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-mono">
          <div className="p-4 rounded-2xl bg-navy-950 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-white">Node UAE-DXB-01</span>
              <span className="text-emerald-400 font-bold">ONLINE</span>
            </div>
            <div className="text-[11px] text-slate-400">Latency: 14ms • Sync: 100%</div>
            <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
              <div className="bg-emerald-400 h-full w-[99%]" />
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-navy-950 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-white">Node UK-LON-04</span>
              <span className="text-emerald-400 font-bold">ONLINE</span>
            </div>
            <div className="text-[11px] text-slate-400">Latency: 22ms • Sync: 100%</div>
            <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
              <div className="bg-emerald-400 h-full w-[99%]" />
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-navy-950 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-white">Node USA-NYC-02</span>
              <span className="text-emerald-400 font-bold">ONLINE</span>
            </div>
            <div className="text-[11px] text-slate-400">Latency: 38ms • Sync: 100%</div>
            <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
              <div className="bg-emerald-400 h-full w-[98%]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
