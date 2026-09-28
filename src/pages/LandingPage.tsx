import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Shield,
  ShieldCheck,
  Lock,
  Vote,
  Fingerprint,
  Sparkles,
  ArrowRight,
  Globe2,
  CheckCircle2,
  Server,
  Layers,
  ChevronDown,
  ChevronRight,
  Sliders,
  Cpu,
  RefreshCw,
  ExternalLink,
  EyeOff,
  Users,
  Award,
  AlertCircle,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { InteractiveGlobeCanvas } from '../components/common/InteractiveGlobeCanvas';
import { DEMO_ELECTION, DIASPORA_REGIONS, FAQ_ITEMS, THREAT_MATRIX } from '../data/electionData';

export const LandingPage: React.FC = () => {
  const { t, startGuidedDemo, setIsAccessibilityModalOpen } = useApp();

  // Active step in "How it works" side drawer
  const [selectedStep, setSelectedStep] = useState<number>(1);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0);

  const stepsData = [
    {
      stepNumber: '01',
      title: t('step1Title'),
      icon: Shield,
      summary: t('step1Desc'),
      details: 'Demonstrates secure two-factor identity verification using simulated passport data and time-based OTP. In a future production architecture, this would interface with secure consular identity or zero-knowledge identity providers without storing personal credentials.',
      securityPill: 'Blinded Identity Token',
    },
    {
      stepNumber: '02',
      title: t('step2Title'),
      icon: CheckCircle2,
      summary: t('step2Desc'),
      details: 'Verifies the overseas citizen’s eligibility for their assigned virtual constituency. Generates an anonymous, unlinkable voting permit (cryptographic nullifier) ensuring one-person-one-vote without tying the voter’s real name to the ballot.',
      securityPill: 'Zero-Knowledge Eligibility Check',
    },
    {
      stepNumber: '03',
      title: t('step3Title'),
      icon: Lock,
      summary: t('step3Desc'),
      details: 'Before leaving the voter’s device, the ballot is encrypted using native Web Crypto AES-256-GCM and the public keys of independent tally trustees. Plaintext vote data is never visible to network eavesdroppers or server administrators.',
      securityPill: 'Client-Side AES-256-GCM',
    },
    {
      stepNumber: '04',
      title: t('step4Title'),
      icon: Vote,
      summary: t('step4Desc'),
      details: 'The encrypted ballot payload and integrity hash are submitted over TLS 1.3 to the demonstration ingest server. The server appends the encrypted record to an immutable Merkle tree batch ledger.',
      securityPill: 'Blinded Ingestion Endpoint',
    },
    {
      stepNumber: '05',
      title: t('step5Title'),
      icon: Fingerprint,
      summary: t('step5Desc'),
      details: 'The voter receives a unique cryptographic demo receipt code (e.g., VBR-8F2A-19C4). Using this receipt, anyone can audit that their ballot was included in the final tally without ever revealing which candidate they selected.',
      securityPill: 'Individual Verifiability Proof',
    },
  ];

  return (
    <div className="space-y-24 py-6 md:py-12 overflow-hidden">
      {/* ====================================================
          3. HERO SECTION
          ==================================================== */}
      <section className="relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Glow ambient background lights */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-electric-600/15 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute top-1/3 right-10 w-72 h-72 bg-saffron-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Hero Left Content */}
          <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
            {/* Tagline Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-electric-500/10 border border-electric-500/30 text-electric-300 text-xs font-semibold shadow-glow-sm">
              <Sparkles className="w-4 h-4 text-electric-400" />
              <span>{t('tagline')}</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.1]">
              Your Voice <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-electric-400 via-blue-200 to-saffron-400 bg-clip-text text-transparent">
                Shouldn’t Stop
              </span> <br />
              at the Border.
            </h1>

            {/* Subheadline */}
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl font-normal">
              {t('heroSubheadline')}
            </p>

            {/* Prototype Disclaimer */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-navy-900/80 border border-slate-700/60 text-slate-400 text-xs">
              <AlertCircle className="w-3.5 h-3.5 text-saffron-400 shrink-0" />
              <span>Hackathon Prototype • Demonstration Only • Not an Official Election Portal</span>
            </div>

            {/* Action CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <Link
                to="/demo-election"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-2xl bg-gradient-to-r from-electric-600 via-electric-500 to-blue-600 hover:from-electric-500 hover:to-blue-500 text-white font-bold text-sm tracking-wide shadow-glow-md transition hover:scale-105"
              >
                <Vote className="w-4 h-4" />
                <span>{t('ctaExploreDemo')}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <a
                href="#how-it-works"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-navy-900/80 hover:bg-slate-800 text-slate-200 border border-slate-700 hover:border-slate-600 font-semibold text-sm transition"
              >
                <span>{t('ctaSeeHowItWorks')}</span>
              </a>

              <button
                onClick={startGuidedDemo}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-3.5 rounded-2xl bg-saffron-500/10 hover:bg-saffron-500/20 text-saffron-300 border border-saffron-500/30 text-xs font-semibold transition"
              >
                <Sparkles className="w-4 h-4 text-saffron-400" />
                <span>Judge Mode (3 min)</span>
              </button>
            </div>

            {/* Floating Security Indicators */}
            <div className="pt-4 grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs">
              <div className="p-2.5 rounded-xl bg-navy-900/60 border border-slate-800 text-slate-300 flex items-center justify-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>{t('badgeProtected')}</span>
              </div>
              <div className="p-2.5 rounded-xl bg-navy-900/60 border border-slate-800 text-slate-300 flex items-center justify-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-electric-400 shrink-0" />
                <span>{t('badgeEncrypted')}</span>
              </div>
              <div className="p-2.5 rounded-xl bg-navy-900/60 border border-slate-800 text-slate-300 flex items-center justify-center gap-1.5">
                <Fingerprint className="w-3.5 h-3.5 text-saffron-400 shrink-0" />
                <span>{t('badgeVerifiable')}</span>
              </div>
              <div className="p-2.5 rounded-xl bg-navy-900/60 border border-slate-800 text-slate-300 flex items-center justify-center gap-1.5">
                <EyeOff className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                <span>{t('badgePrivacy')}</span>
              </div>
            </div>
          </div>

          {/* Hero Right: 3D Interactive Cyber Globe */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl p-1 bg-gradient-to-b from-electric-500/20 via-slate-800/40 to-slate-900/20 shadow-2xl backdrop-blur-xl">
              <div className="rounded-[22px] bg-navy-950/80 overflow-hidden relative">
                <InteractiveGlobeCanvas />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================
          4. LIVE-STYLE TRUST DASHBOARD METRICS
          ==================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="glass-card rounded-2xl p-5 border border-slate-800 hover:border-electric-500/40 text-center space-y-1">
            <div className="text-3xl sm:text-4xl font-black text-electric-400 tracking-tight">
              {t('statDiaspora')}
            </div>
            <div className="text-xs sm:text-sm font-semibold text-slate-200">
              {t('statDiasporaLabel')}
            </div>
            <p className="text-[11px] text-slate-500">
              Across 120+ nations worldwide
            </p>
          </div>

          <div className="glass-card rounded-2xl p-5 border border-slate-800 hover:border-saffron-500/40 text-center space-y-1">
            <div className="text-3xl sm:text-4xl font-black text-saffron-400 tracking-tight">
              {t('statE2E')}
            </div>
            <div className="text-xs sm:text-sm font-semibold text-slate-200">
              {t('statE2ELabel')}
            </div>
            <p className="text-[11px] text-slate-500">
              Individual & universal inclusion proof
            </p>
          </div>

          <div className="glass-card rounded-2xl p-5 border border-slate-800 hover:border-emerald-500/40 text-center space-y-1">
            <div className="text-3xl sm:text-4xl font-black text-emerald-400 tracking-tight">
              {t('statEncryption')}
            </div>
            <div className="text-xs sm:text-sm font-semibold text-slate-200">
              {t('statEncryptionLabel')}
            </div>
            <p className="text-[11px] text-slate-500">
              Client-side AES-GCM + SHA-256
            </p>
          </div>

          <div className="glass-card rounded-2xl p-5 border border-slate-800 hover:border-purple-500/40 text-center space-y-1">
            <div className="text-3xl sm:text-4xl font-black text-purple-400 tracking-tight">
              {t('statPrivacy')}
            </div>
            <div className="text-xs sm:text-sm font-semibold text-slate-200">
              {t('statPrivacyLabel')}
            </div>
            <p className="text-[11px] text-slate-500">
              Zero-knowledge token isolation
            </p>
          </div>
        </div>
        <p className="text-center text-xs text-slate-500 mt-3 italic">
          {t('statFootnote')}
        </p>
      </section>

      {/* ====================================================
          5. GLOBAL DIASPORA PARTICIPATION PREVIEW
          ==================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-electric-500/20 relative overflow-hidden">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-electric-500/10 border border-electric-500/30 text-electric-400 text-xs font-semibold mb-2">
                <Globe2 className="w-3.5 h-3.5" /> Global Reach Analysis
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white">
                Connecting India’s Global Diaspora
              </h2>
              <p className="text-slate-400 text-xs sm:text-sm max-w-xl mt-1">
                Overseas citizens contribute billions in economic resilience and global cultural bridges. Here is how simulated participation distributes across key consular hubs.
              </p>
            </div>
            <Link
              to="/diaspora"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-navy-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold transition"
            >
              <span>Explore Interactive Diaspora Map</span>
              <ArrowRight className="w-3.5 h-3.5 text-electric-400" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {DIASPORA_REGIONS.map(region => (
              <div
                key={region.id}
                className="p-4 rounded-2xl bg-navy-900/70 border border-slate-800/80 hover:border-electric-500/30 transition space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-200">{region.name}</span>
                  <span className="text-xs font-mono font-bold text-electric-400">{region.sharePercentage}%</span>
                </div>
                {/* Progress bar */}
                <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-electric-500 to-saffron-400 rounded-full"
                    style={{ width: `${region.sharePercentage}%` }}
                  />
                </div>
                <div className="text-[11px] text-slate-400">
                  {region.estimatedVoters}
                </div>
                <div className="text-[10px] text-slate-500 truncate">
                  {region.topCountries.join(', ')}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====================================================
          6. THE PROBLEM STATEMENT
          ==================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-5 space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-saffron-500/15 border border-saffron-500/30 text-saffron-400 text-xs font-semibold">
              <Users className="w-3.5 h-3.5" /> Civic Disenfranchisement Challenge
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              The Geographical Hurdle in Democratic Participation
            </h2>
            <p className="text-slate-300 text-sm leading-relaxed">
              Currently, under Section 20A of the Representation of the People Act, 1951, overseas Indian citizens must be physically present at their registered constituency polling station in India to cast their vote.
            </p>
            <p className="text-slate-400 text-xs leading-relaxed">
              For 35+ million citizens abroad, taking multi-day international flights, bearing thousands of dollars in travel costs, and taking leaves of absence creates a steep practical barrier to democratic participation.
            </p>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-navy-900/60 border border-slate-800 space-y-2">
              <div className="w-8 h-8 rounded-lg bg-red-500/20 text-red-400 flex items-center justify-center font-bold text-sm">
                ✈️
              </div>
              <h4 className="text-slate-200 font-bold text-sm">Prohibitive Travel Costs</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                International flights cost $1,000–$3,000 per person during election cycles, excluding hundreds of thousands of low-wage migrant workers from exercising their franchise.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-navy-900/60 border border-slate-800 space-y-2">
              <div className="w-8 h-8 rounded-lg bg-saffron-500/20 text-saffron-400 flex items-center justify-center font-bold text-sm">
                ⏱️
              </div>
              <h4 className="text-slate-200 font-bold text-sm">Time & Logistics Constraints</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Students, healthcare workers, and essential personnel cannot easily travel back home for a single election day without disrupting critical commitments.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-navy-900/60 border border-slate-800 space-y-2">
              <div className="w-8 h-8 rounded-lg bg-electric-500/20 text-electric-400 flex items-center justify-center font-bold text-sm">
                🛡️
              </div>
              <h4 className="text-slate-200 font-bold text-sm">Security & Trust Imperative</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Postal ballots risk transit tampering and delay. Any remote solution must provide mathematical end-to-end verifiability and coercion resistance.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-navy-900/60 border border-slate-800 space-y-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-sm">
                💡
              </div>
              <h4 className="text-slate-200 font-bold text-sm">The Cryptographic Solution</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Voting Beyond Borders models client-side AES-256 encryption, zero-knowledge identity separation, and Merkle tree inclusion receipts to bridge this gap securely.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================
          7. “HOW IT WORKS” 5-STEP INTERACTIVE EXPERIENCE
          ==================================================== */}
      <section id="how-it-works" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-electric-500/10 border border-electric-500/30 text-electric-400 text-xs font-semibold">
            <Layers className="w-3.5 h-3.5" /> End-to-End Workflow
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            How It Works in 5 Secure Steps
          </h2>
          <p className="text-slate-400 text-sm">
            Click each step below to inspect the cryptographic safeguards and privacy guarantees executing at each stage of the voting lifecycle.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Steps list */}
          <div className="lg:col-span-7 space-y-3">
            {stepsData.map((item, idx) => {
              const IconComp = item.icon;
              const isSelected = selectedStep === idx + 1;
              return (
                <div
                  key={item.stepNumber}
                  onClick={() => setSelectedStep(idx + 1)}
                  className={`p-4 sm:p-5 rounded-2xl border cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-navy-900/90 border-electric-500/60 shadow-glow-sm'
                      : 'bg-navy-900/40 border-slate-800 hover:border-slate-700 hover:bg-navy-900/60'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm shrink-0 transition ${
                        isSelected
                          ? 'bg-electric-500 text-white shadow-glow-sm'
                          : 'bg-navy-800 text-slate-400 border border-slate-700'
                      }`}
                    >
                      {item.stepNumber}
                    </div>

                    <div className="flex-grow space-y-1">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm sm:text-base font-bold text-slate-100 flex items-center gap-2">
                          <IconComp className="w-4 h-4 text-electric-400" />
                          {item.title}
                        </h4>
                        <span className="text-[11px] px-2 py-0.5 rounded bg-navy-800 border border-slate-700 text-electric-300 font-mono">
                          {item.securityPill}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        {item.summary}
                      </p>
                    </div>

                    <ChevronRight className={`w-5 h-5 transition shrink-0 ${isSelected ? 'text-electric-400 translate-x-1' : 'text-slate-600'}`} />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Animated Detail Panel for Selected Step */}
          <div className="lg:col-span-5 sticky top-28">
            <div className="glass-panel rounded-3xl p-6 sm:p-7 border border-electric-500/30 space-y-5 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-electric-500/10 rounded-full blur-2xl pointer-events-none"></div>

              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <span className="text-xs font-mono font-bold text-electric-400 uppercase tracking-wider">
                  Step {stepsData[selectedStep - 1].stepNumber} Architecture Deep Dive
                </span>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 font-semibold">
                  Zero-Knowledge Verified
                </span>
              </div>

              <div>
                <h3 className="text-xl font-bold text-white mb-2">
                  {stepsData[selectedStep - 1].title}
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {stepsData[selectedStep - 1].details}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-navy-950/80 border border-slate-800 space-y-2">
                <span className="text-[11px] font-bold text-saffron-400 block uppercase tracking-wider">
                  Security Invariant
                </span>
                <p className="text-[11px] text-slate-300 font-mono">
                  {selectedStep === 1 && 'SHA-256(Nonce + AuthSalt) != Identity Record'}
                  {selectedStep === 2 && 'VoterToken ⊥ CandidateChoice (Logical Decoupling)'}
                  {selectedStep === 3 && 'Ciphertext = AES_256_GCM(PlaintextBallot, TrusteeKey)'}
                  {selectedStep === 4 && 'Ledger_Height += 1; MerkleRoot_New = Hash(L || R)'}
                  {selectedStep === 5 && 'VerifyInclusion(Receipt, MerkleRoot) == TRUE'}
                </p>
              </div>

              <div className="pt-2">
                <Link
                  to="/demo-election"
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-electric-600 hover:bg-electric-500 text-white font-bold text-xs shadow-glow-sm transition"
                >
                  <Vote className="w-4 h-4" />
                  <span>Experience Step in Demo Election</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================
          8. SECURITY ARCHITECTURE & THREAT MATRIX
          ==================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-electric-500/20 space-y-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold mb-2">
                <Shield className="w-3.5 h-3.5" /> Threat Model & Mitigations
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white">
                Multi-Layer Defense-in-Depth Architecture
              </h2>
              <p className="text-slate-400 text-xs sm:text-sm max-w-2xl mt-1">
                A serious election technology platform must account for adversarial environments, untrusted devices, network eavesdropping, and server tampering.
              </p>
            </div>
            <Link
              to="/security"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-navy-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold transition"
            >
              <span>View Full Security Center</span>
              <ArrowRight className="w-3.5 h-3.5 text-electric-400" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {THREAT_MATRIX.map((item, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-navy-900/60 border border-slate-800 space-y-2.5 hover:border-electric-500/30 transition"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-100 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    {item.threat}
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-semibold">
                    {item.status}
                  </span>
                </div>
                <div className="text-[11px] text-slate-400">
                  <strong className="text-slate-300">Impact:</strong> {item.impact}
                </div>
                <div className="text-[11px] text-slate-300 bg-navy-950/80 p-2.5 rounded-xl border border-slate-800/80">
                  <strong className="text-electric-400">Mitigation:</strong> {item.protection}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====================================================
          11. DEMO ELECTION TEASER
          ==================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl p-8 sm:p-10 bg-gradient-to-r from-navy-900 via-navy-850 to-electric-950 border border-electric-500/40 shadow-2xl overflow-hidden">
          <div className="absolute -top-24 -right-24 w-80 h-80 bg-electric-500/20 rounded-full blur-3xl pointer-events-none"></div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-saffron-500/20 border border-saffron-500/40 text-saffron-300 text-xs font-semibold">
                <Vote className="w-3.5 h-3.5" /> Interactive Hackathon Voting Module
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-white">
                Experience the Demonstration Election Flow
              </h2>
              <p className="text-slate-300 text-sm leading-relaxed max-w-2xl">
                Test the end-to-end journey with fictional candidates. Witness native browser AES-256 ballot encryption, obtain your demo receipt, and independently audit inclusion on the cryptographic ledger.
              </p>
              <div className="flex flex-wrap items-center gap-3 pt-2 text-xs text-slate-400">
                <span className="flex items-center gap-1 text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Fictional Candidates
                </span>
                <span className="flex items-center gap-1 text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Client WebCrypto API
                </span>
                <span className="flex items-center gap-1 text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Merkle Proof Receipt
                </span>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col gap-3">
              <Link
                to="/demo-election"
                className="w-full inline-flex items-center justify-center gap-2 py-4 rounded-2xl bg-gradient-to-r from-electric-600 via-electric-500 to-blue-600 hover:from-electric-500 hover:to-blue-500 text-white font-bold text-sm shadow-glow-md transition hover:scale-105"
              >
                <Vote className="w-4 h-4" />
                <span>Launch Demo Election</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/verify"
                className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-2xl bg-navy-900 hover:bg-slate-800 text-slate-200 border border-slate-700 font-semibold text-xs transition"
              >
                <Fingerprint className="w-3.5 h-3.5 text-electric-400" />
                <span>Have a Demo Receipt? Verify Here</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================
          12. AUDIT TRANSPARENCY PREVIEW
          ==================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-5 space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-electric-500/10 border border-electric-500/30 text-electric-400 text-xs font-semibold">
              <Server className="w-3.5 h-3.5" /> Public Bulletin Board
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              Verifiable Tamper-Evident Ledger
            </h2>
            <p className="text-slate-300 text-sm leading-relaxed">
              Every ballot submission, batch commit, and security telemetry event is hashed and committed to an append-only ledger.
            </p>
            <p className="text-slate-400 text-xs leading-relaxed">
              Independent civic observers, election trustees, and researchers can download the entire cryptographic event stream and mathematically verify tallies.
            </p>
            <div className="pt-2">
              <Link
                to="/audit"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-navy-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold transition"
              >
                <span>Open Live Audit Dashboard</span>
                <ArrowRight className="w-3.5 h-3.5 text-electric-400" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="rounded-2xl bg-navy-950 border border-slate-800 overflow-hidden shadow-2xl">
              <div className="px-4 py-3 bg-navy-900 border-b border-slate-800 flex items-center justify-between text-xs">
                <span className="font-mono text-slate-300 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  Live Demo Ledger Stream
                </span>
                <span className="text-slate-500 font-mono text-[11px]">Sync: 100% Valid</span>
              </div>
              <div className="divide-y divide-slate-850 text-xs font-mono">
                <div className="p-3 flex items-center justify-between hover:bg-navy-900/40">
                  <span className="text-slate-400">12:05:18 UTC</span>
                  <span className="text-electric-400 font-semibold">Receipt Committed</span>
                  <span className="text-slate-500">0x9ba714...</span>
                  <span className="text-emerald-400">VERIFIED</span>
                </div>
                <div className="p-3 flex items-center justify-between hover:bg-navy-900/40">
                  <span className="text-slate-400">12:04:21 UTC</span>
                  <span className="text-saffron-400 font-semibold">Ballot Encrypted</span>
                  <span className="text-slate-500">0x8af92f...</span>
                  <span className="text-electric-400">ENCRYPTED</span>
                </div>
                <div className="p-3 flex items-center justify-between hover:bg-navy-900/40">
                  <span className="text-slate-400">12:03:45 UTC</span>
                  <span className="text-purple-400 font-semibold">Blinded Token Issued</span>
                  <span className="text-slate-500">0x3c8911...</span>
                  <span className="text-emerald-400">VERIFIED</span>
                </div>
                <div className="p-3 flex items-center justify-between hover:bg-navy-900/40">
                  <span className="text-slate-400">12:01:10 UTC</span>
                  <span className="text-slate-300 font-semibold">Consular Node Sync</span>
                  <span className="text-slate-500">0x7e290f...</span>
                  <span className="text-emerald-400">RECORDED</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================
          15. FAQ ACCORDION SECTION
          ==================================================== */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-electric-500/10 border border-electric-500/30 text-electric-400 text-xs font-semibold">
            Frequently Asked Questions
          </div>
          <h2 className="text-3xl font-extrabold text-white">
            Clarity, Trust & Technical Scope
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm">
            Factual answers distinguishing prototype capabilities from future statutory requirements.
          </p>
        </div>

        <div className="space-y-3">
          {FAQ_ITEMS.map((faq, idx) => {
            const isExpanded = expandedFaq === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl bg-navy-900/60 border border-slate-800 overflow-hidden transition"
              >
                <button
                  onClick={() => setExpandedFaq(isExpanded ? null : idx)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 hover:bg-navy-900/90 transition"
                >
                  <span className="text-sm sm:text-base font-semibold text-slate-100">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 transition-transform ${isExpanded ? 'rotate-180 text-electric-400' : ''}`}
                  />
                </button>
                {isExpanded && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-800/60 bg-navy-950/40">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* ====================================================
          16. FINAL CINEMATIC CTA
          ==================================================== */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 relative">
        <div className="glass-panel rounded-3xl p-8 sm:p-14 border border-electric-500/40 shadow-2xl relative overflow-hidden space-y-6">
          <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-96 h-96 bg-electric-500/15 rounded-full blur-3xl pointer-events-none"></div>

          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-navy-800 to-electric-600 border border-electric-400/40 flex items-center justify-center text-white font-black text-xl mx-auto shadow-glow-md">
            VB
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight max-w-2xl mx-auto leading-tight">
            Technology can cross borders. <br />
            <span className="bg-gradient-to-r from-electric-400 via-blue-200 to-saffron-400 bg-clip-text text-transparent">
              Trust must cross them too.
            </span>
          </h2>

          <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Explore the Voting Beyond Borders prototype and see how client-side encryption, blinded identity separation, and cryptographic receipts create end-to-end verifiability.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link
              to="/demo-election"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-electric-600 to-electric-500 hover:from-electric-500 hover:to-electric-400 text-white font-bold text-sm shadow-glow-md transition hover:scale-105"
            >
              <Vote className="w-4 h-4" />
              <span>Launch Demo Election</span>
            </Link>

            <Link
              to="/security"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-navy-900 hover:bg-slate-800 text-slate-200 border border-slate-700 font-semibold text-sm transition"
            >
              <Shield className="w-4 h-4 text-electric-400" />
              <span>Explore Security Center</span>
            </Link>
          </div>

          <p className="text-[11px] text-slate-500 max-w-md mx-auto italic">
            *Demonstration system built for hackathon presentation. All candidates, votes, receipts, and elections are simulated.
          </p>
        </div>
      </section>
    </div>
  );
};
