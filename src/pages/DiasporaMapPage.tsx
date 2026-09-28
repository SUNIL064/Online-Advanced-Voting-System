import React, { useState } from 'react';
import {
  Globe2,
  Users,
  Building,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Clock,
  MapPin,
} from 'lucide-react';
import { DIASPORA_REGIONS } from '../data/electionData';
import { DiasporaRegion } from '../types';

export const DiasporaMapPage: React.FC = () => {
  const [selectedRegion, setSelectedRegion] = useState<DiasporaRegion>(DIASPORA_REGIONS[0]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header */}
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-electric-500/10 border border-electric-500/30 text-electric-300 text-xs font-semibold shadow-glow-sm">
          <Globe2 className="w-4 h-4 text-electric-400" />
          <span>Global Civic Participation Map</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white">
          Indian Diaspora Across the World
        </h1>
        <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
          Over 35 million Indian citizens and people of Indian origin reside across 120+ nations. Explore simulated participation models across global consular zones.
        </p>
        <span className="text-[11px] text-saffron-400 bg-saffron-500/10 px-3 py-1 rounded-full border border-saffron-500/30 inline-block font-semibold">
          Illustrative Demonstration Data
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* World Map Visualizer Container */}
        <div className="lg:col-span-8 glass-panel rounded-3xl p-6 sm:p-8 border border-electric-500/30 space-y-6 relative overflow-hidden">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <span className="text-xs font-bold text-slate-200 uppercase tracking-wider">
              Consular Regional Jurisdictions
            </span>
            <span className="text-xs text-electric-400 font-mono">
              Click a zone to view consular data
            </span>
          </div>

          {/* Interactive Simulated Map Canvas */}
          <div className="relative w-full h-80 sm:h-[420px] bg-navy-950 rounded-2xl border border-slate-800 flex items-center justify-center overflow-hidden">
            {/* Ambient cyber grid lines */}
            <div className="absolute inset-0 cyber-grid opacity-30"></div>

            {/* Simulated World Region Hotspots */}
            {DIASPORA_REGIONS.map(reg => {
              const isSelected = selectedRegion.id === reg.id;
              return (
                <button
                  key={reg.id}
                  onClick={() => setSelectedRegion(reg)}
                  style={{ left: `${reg.coordinates.x}%`, top: `${reg.coordinates.y}%` }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 group transition-all"
                >
                  <div className="relative flex items-center justify-center">
                    <span
                      className={`absolute w-8 h-8 rounded-full transition ${
                        isSelected ? 'bg-electric-400/40 animate-ping' : 'bg-electric-500/20 group-hover:bg-electric-400/30'
                      }`}
                    />
                    <div
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-[10px] font-bold shadow-glow-sm transition ${
                        isSelected
                          ? 'bg-electric-500 border-white text-white scale-125'
                          : 'bg-navy-900 border-electric-400 text-electric-300 group-hover:scale-110'
                      }`}
                    >
                      {reg.sharePercentage}%
                    </div>
                  </div>
                  <span className="absolute top-7 left-1/2 -translate-x-1/2 text-[10px] font-bold text-slate-200 bg-navy-900/90 px-2 py-0.5 rounded border border-slate-800 whitespace-nowrap shadow-lg">
                    {reg.name}
                  </span>
                </button>
              );
            })}

            <div className="absolute bottom-4 left-4 text-xs text-slate-500 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>Federated Consensus Mesh Synchronized</span>
            </div>
          </div>

          {/* Bottom quick stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center text-xs">
            <div className="p-3 rounded-xl bg-navy-900/60 border border-slate-800">
              <span className="text-slate-400 block text-[10px]">Total Diaspora</span>
              <span className="font-extrabold text-white text-sm">35,400,000+</span>
            </div>
            <div className="p-3 rounded-xl bg-navy-900/60 border border-slate-800">
              <span className="text-slate-400 block text-[10px]">Consular Missions</span>
              <span className="font-extrabold text-electric-400 text-sm">180+ Worldwide</span>
            </div>
            <div className="p-3 rounded-xl bg-navy-900/60 border border-slate-800">
              <span className="text-slate-400 block text-[10px]">Active Node Hubs</span>
              <span className="font-extrabold text-emerald-400 text-sm">48 Federated</span>
            </div>
            <div className="p-3 rounded-xl bg-navy-900/60 border border-slate-800">
              <span className="text-slate-400 block text-[10px]">Timezone Coverage</span>
              <span className="font-extrabold text-saffron-400 text-sm">24-Hour Rolling</span>
            </div>
          </div>
        </div>

        {/* Selected Region Information Drawer */}
        <div className="lg:col-span-4 glass-panel rounded-3xl p-6 sm:p-7 border border-electric-500/30 space-y-5 shadow-2xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <span className="text-xs font-mono text-electric-400 uppercase font-bold">
              Consular Zone Telemetry
            </span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 font-semibold">
              Status: {selectedRegion.status}
            </span>
          </div>

          <div>
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <MapPin className="w-5 h-5 text-electric-400" />
              {selectedRegion.name}
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Estimated Demographic: {selectedRegion.estimatedVoters}
            </p>
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-3.5 rounded-xl bg-navy-950/80 border border-slate-800 space-y-1">
              <span className="text-slate-400 block text-[11px] font-semibold">Top Concentration Hubs:</span>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {selectedRegion.topCountries.map((c, cIdx) => (
                  <span
                    key={cIdx}
                    className="px-2.5 py-1 rounded-lg bg-navy-900 border border-slate-700 text-slate-200 text-xs font-medium"
                  >
                    {c}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-navy-950/80 border border-slate-800 space-y-1">
              <span className="text-slate-400 block text-[11px] font-semibold">Active Consular Mission Nodes:</span>
              <span className="font-mono text-electric-300 font-bold">
                {selectedRegion.activeConsulates} Verified Mission Endpoints
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-navy-950/80 border border-slate-800 space-y-1">
              <span className="text-slate-400 block text-[11px] font-semibold">Simulated Voter Participation Share:</span>
              <div className="flex items-center justify-between font-mono">
                <span className="text-white font-bold">{selectedRegion.sharePercentage}% Global Total</span>
                <span className="text-emerald-400">High Engagement</span>
              </div>
            </div>
          </div>

          <div className="pt-2">
            <a
              href="/demo-election"
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-electric-600 hover:bg-electric-500 text-white font-bold text-xs shadow-glow-sm transition"
            >
              <span>Vote as Overseas Citizen in this Region</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
