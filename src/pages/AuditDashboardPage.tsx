import React, { useState } from 'react';
import {
  Server,
  Activity,
  Download,
  Search,
  Filter,
  CheckCircle2,
  Lock,
  FileCheck,
  RefreshCw,
  TrendingUp,
  Globe2,
  AlertTriangle,
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { useApp } from '../context/AppContext';
import { AuditEvent } from '../types';

export const AuditDashboardPage: React.FC = () => {
  const { auditLogs } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('ALL');

  // Chart Data
  const hourlyData = [
    { hour: '08:00', ballots: 120, receipts: 118 },
    { hour: '09:00', ballots: 240, receipts: 236 },
    { hour: '10:00', ballots: 390, receipts: 382 },
    { hour: '11:00', ballots: 620, receipts: 610 },
    { hour: '12:00', ballots: 890, receipts: 880 },
    { hour: '13:00', ballots: 1100, receipts: 1090 },
    { hour: '14:00', ballots: 1284, receipts: 1271 },
  ];

  const regionalData = [
    { name: 'North America', value: 450, color: '#3B82F6' },
    { name: 'Middle East', value: 346, color: '#10B981' },
    { name: 'Europe', value: 231, color: '#8B5CF6' },
    { name: 'Asia Pacific', value: 192, color: '#F59E0B' },
    { name: 'Africa & LatAm', value: 65, color: '#EC4899' },
  ];

  const filteredLogs = auditLogs.filter(log => {
    const matchesSearch =
      log.event.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.hash.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.details.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'ALL' || log.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const exportAuditCsv = () => {
    const headers = ['Timestamp', 'Event', 'Category', 'Hash', 'Status', 'Details'];
    const rows = filteredLogs.map(l => [
      `"${l.timestamp}"`,
      `"${l.event}"`,
      `"${l.category}"`,
      `"${l.hash}"`,
      `"${l.status}"`,
      `"${l.details.replace(/"/g, '""')}"`,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `VBB-Demo-Audit-Logs-${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-electric-500/10 border border-electric-500/30 text-electric-300 text-xs font-semibold mb-2">
            <Server className="w-3.5 h-3.5 text-electric-400" />
            <span>Public Bulletin Board & Verifier</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white">
            Audit Transparency Dashboard
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm mt-1">
            Real-time public cryptographic metrics and immutable event records. (Simulated Demo Data)
          </p>
        </div>

        <button
          onClick={exportAuditCsv}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-navy-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold transition"
        >
          <Download className="w-4 h-4 text-electric-400" />
          <span>Export Demo Audit CSV</span>
        </button>
      </div>

      {/* Top Metrics Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="glass-card rounded-2xl p-4 border border-slate-800 space-y-1">
          <span className="text-[11px] text-slate-400 font-semibold block">Encrypted Ballots</span>
          <div className="text-2xl sm:text-3xl font-black text-white font-mono">1,284</div>
          <span className="text-[10px] text-electric-400 flex items-center gap-1">
            <Lock className="w-3 h-3" /> 100% AES-256-GCM
          </span>
        </div>

        <div className="glass-card rounded-2xl p-4 border border-slate-800 space-y-1">
          <span className="text-[11px] text-slate-400 font-semibold block">Verified Receipts</span>
          <div className="text-2xl sm:text-3xl font-black text-emerald-400 font-mono">1,271</div>
          <span className="text-[10px] text-emerald-400 flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" /> Merkle Inclusion
          </span>
        </div>

        <div className="glass-card rounded-2xl p-4 border border-slate-800 space-y-1">
          <span className="text-[11px] text-slate-400 font-semibold block">Verification Rate</span>
          <div className="text-2xl sm:text-3xl font-black text-saffron-400 font-mono">99.0%</div>
          <span className="text-[10px] text-saffron-400">13 pending batch commit</span>
        </div>

        <div className="glass-card rounded-2xl p-4 border border-slate-800 space-y-1">
          <span className="text-[11px] text-slate-400 font-semibold block">Audit Events</span>
          <div className="text-2xl sm:text-3xl font-black text-purple-400 font-mono">{4862 + auditLogs.length}</div>
          <span className="text-[10px] text-purple-400">Append-only chained</span>
        </div>

        <div className="glass-card rounded-2xl p-4 border border-slate-800 space-y-1 col-span-2 md:col-span-1">
          <span className="text-[11px] text-slate-400 font-semibold block">System Status</span>
          <div className="text-xl sm:text-2xl font-black text-emerald-400 flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse"></span>
            Operational
          </div>
          <span className="text-[10px] text-slate-400">Consensus sync: 0ms lag</span>
        </div>
      </div>

      {/* Analytics Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Hourly Ingestion Rate Area Chart */}
        <div className="lg:col-span-8 glass-panel rounded-3xl p-6 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-electric-400" />
              Ballot Ingestion & Receipt Generation Curve
            </h3>
            <span className="text-[11px] text-slate-400 font-mono">Live Batch Stream</span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={hourlyData}>
                <defs>
                  <linearGradient id="colorBallots" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorReceipts" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="hour" stroke="#64748B" fontSize={11} />
                <YAxis stroke="#64748B" fontSize={11} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0B0F19', borderColor: '#1E293B', borderRadius: '12px', fontSize: '11px' }}
                />
                <Area type="monotone" dataKey="ballots" stroke="#3B82F6" fillOpacity={1} fill="url(#colorBallots)" name="Encrypted Ballots" />
                <Area type="monotone" dataKey="receipts" stroke="#10B981" fillOpacity={1} fill="url(#colorReceipts)" name="Verified Receipts" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right: Regional Participation Breakdown Pie */}
        <div className="lg:col-span-4 glass-panel rounded-3xl p-6 border border-slate-800 space-y-4">
          <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
            <Globe2 className="w-4 h-4 text-saffron-400" />
            Regional Turnout Share
          </h3>

          <div className="h-44 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={regionalData} cx="50%" cy="50%" innerRadius={45} outerRadius={65} paddingAngle={4} dataKey="value">
                  {regionalData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: '#0B0F19', borderColor: '#1E293B', borderRadius: '12px', fontSize: '11px' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-2 gap-2 text-[11px]">
            {regionalData.map(item => (
              <div key={item.name} className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="text-slate-300 truncate">{item.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Searchable Audit Log Table */}
      <div className="glass-panel rounded-3xl p-6 border border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <FileCheck className="w-4 h-4 text-emerald-400" />
              Chained Tamper-Evident Audit Ledger
            </h3>
            <p className="text-xs text-slate-400">
              Deterministic cryptographic commitments published in real time.
            </p>
          </div>

          {/* Search and Filters */}
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <div className="relative flex-grow sm:w-64">
              <Search className="w-3.5 h-3.5 absolute left-3 top-3 text-slate-500" />
              <input
                type="text"
                placeholder="Search event or hash..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-navy-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-electric-400 font-mono"
              />
            </div>

            <select
              value={categoryFilter}
              onChange={e => setCategoryFilter(e.target.value)}
              className="px-3 py-1.5 rounded-xl bg-navy-950 border border-slate-700 text-xs text-slate-300 focus:outline-none"
            >
              <option value="ALL">All Categories</option>
              <option value="BALLOT">Ballot Ingest</option>
              <option value="INTEGRITY">Merkle Integrity</option>
              <option value="AUTHENTICATION">Authentication</option>
              <option value="SECURITY">Security / WAF</option>
              <option value="SYSTEM">Consensus System</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="rounded-2xl bg-navy-950 border border-slate-800 overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-navy-900 border-b border-slate-800 text-slate-400">
              <tr>
                <th className="p-3">Timestamp</th>
                <th className="p-3">Event Type</th>
                <th className="p-3">Category</th>
                <th className="p-3">SHA-256 Hash</th>
                <th className="p-3">Status</th>
                <th className="p-3">Audit Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-850">
              {filteredLogs.map(log => (
                <tr key={log.id} className="hover:bg-navy-900/40 transition">
                  <td className="p-3 text-slate-400 whitespace-nowrap">{log.timestamp}</td>
                  <td className="p-3 font-semibold text-white whitespace-nowrap">{log.event}</td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 rounded bg-navy-850 border border-slate-800 text-[10px] text-electric-300">
                      {log.category}
                    </span>
                  </td>
                  <td className="p-3 text-slate-400 truncate max-w-[140px]" title={log.hash}>
                    {log.hash.slice(0, 16)}...
                  </td>
                  <td className="p-3">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      log.status === 'VERIFIED'
                        ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                        : log.status === 'ENCRYPTED'
                        ? 'bg-electric-500/15 text-electric-400 border border-electric-500/30'
                        : 'bg-slate-800 text-slate-300'
                    }`}>
                      {log.status}
                    </span>
                  </td>
                  <td className="p-3 text-slate-300 font-sans text-xs max-w-xs truncate" title={log.details}>
                    {log.details}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
