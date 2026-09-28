import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Shield,
  ShieldCheck,
  Lock,
  Vote,
  Fingerprint,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Key,
  Copy,
  Download,
  Check,
  RefreshCw,
  Eye,
  Info,
  Layers,
  Cpu,
  Server,
  FileCheck,
  ShieldAlert,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { DEMO_ELECTION } from '../data/electionData';
import { Candidate, DemoReceipt } from '../types';

export const DemoElectionPage: React.FC = () => {
  const navigate = useNavigate();
  const {
    voterSession,
    loginDemoVoter,
    logoutDemoVoter,
    castDemoBallot,
    lastCastReceipt,
    resetSystemState,
  } = useApp();

  // Step state: 1: Auth, 2: Eligibility, 3: Ballot, 4: Encrypting, 5: Confirmation
  const [currentStep, setCurrentStep] = useState<number>(() => {
    if (lastCastReceipt) return 5;
    if (voterSession?.isEligible) return 3;
    return 1;
  });

  // Auth Inputs
  const [passportNumber, setPassportNumber] = useState('DEMO-PASS-8291');
  const [dob, setDob] = useState('1990-05-15');
  const [country, setCountry] = useState('United Arab Emirates');
  const [otp, setOtp] = useState('123456');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  // Ballot Selection
  const [selectedCandidateId, setSelectedCandidateId] = useState<string>('cand-1');
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [activeCandidateBio, setActiveCandidateBio] = useState<Candidate | null>(null);

  // Encryption Animation Stage (1 to 4)
  const [encryptionStage, setEncryptionStage] = useState<number>(1);
  const [encryptionLog, setEncryptionLog] = useState<string[]>([]);
  const [copiedReceipt, setCopiedReceipt] = useState(false);

  // Handle Send OTP
  const handleSendOtp = () => {
    setIsOtpSent(true);
  };

  // Auto fill mock credentials
  const handleAutoFill = () => {
    setPassportNumber('DEMO-PASS-8291');
    setDob('1992-08-15');
    setCountry('United Arab Emirates');
    setIsOtpSent(true);
    setOtp('123456');
  };

  // Handle Verify Identity
  const handleVerifyAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsAuthenticating(true);
    setTimeout(async () => {
      await loginDemoVoter(passportNumber, country);
      setIsAuthenticating(false);
      setCurrentStep(2);
    }, 900);
  };

  // Handle Proceed from Eligibility to Ballot
  const handleProceedToBallot = () => {
    setCurrentStep(3);
  };

  // Handle Start Encryption & Submission
  const handleStartEncryption = async () => {
    setIsReviewModalOpen(false);
    setCurrentStep(4);
    setEncryptionStage(1);
    setEncryptionLog(['[0ms] Initializing client WebCrypto SubtleCrypto subsystem...']);

    setTimeout(() => {
      setEncryptionStage(2);
      setEncryptionLog(prev => [
        ...prev,
        '[350ms] Generating 256-bit ephemeral AES-GCM encryption key & 96-bit IV...',
        '[500ms] Encrypting candidate selection payload in browser sandbox...',
      ]);
    }, 700);

    setTimeout(() => {
      setEncryptionStage(3);
      setEncryptionLog(prev => [
        ...prev,
        '[950ms] Computing SHA-256 payload integrity digest...',
        '[1200ms] Binding zero-knowledge blinded voter authorization token...',
      ]);
    }, 1500);

    setTimeout(async () => {
      setEncryptionStage(4);
      setEncryptionLog(prev => [
        ...prev,
        '[1800ms] Dispatching encrypted ciphertext over TLS 1.3 to ingestion node...',
        '[2100ms] Merkle tree inclusion commitment generated. Demo receipt finalized!',
      ]);

      const result = await castDemoBallot(selectedCandidateId);
      setTimeout(() => {
        setCurrentStep(5);
      }, 800);
    }, 2400);
  };

  const handleCopyReceipt = () => {
    if (!lastCastReceipt) return;
    navigator.clipboard.writeText(lastCastReceipt.receiptCode);
    setCopiedReceipt(true);
    setTimeout(() => setCopiedReceipt(false), 2000);
  };

  const handleDownloadReceipt = () => {
    if (!lastCastReceipt) return;
    const receiptText = `=========================================
VOTING BEYOND BORDERS — DEMO RECEIPT
(Hackathon Prototype Demonstration Only)
=========================================
Transaction ID : ${lastCastReceipt.transactionId}
Receipt Code   : ${lastCastReceipt.receiptCode}
Timestamp      : ${lastCastReceipt.timestamp}
Ballot Status  : ${lastCastReceipt.ballotStatus}
Batch Index    : #${lastCastReceipt.batchIndex}
Merkle Root    : ${lastCastReceipt.merkleRootHash}
Block Height   : #${lastCastReceipt.blockHeight}
-----------------------------------------
PRIVACY GUARANTEE:
This receipt proves cryptographic inclusion of your encrypted ballot
without revealing your candidate selection to anyone.
Verify online at: /verify
=========================================`;

    const blob = new Blob([receiptText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `VBB-Demo-Receipt-${lastCastReceipt.receiptCode}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const selectedCandidate = DEMO_ELECTION.candidates.find(c => c.id === selectedCandidateId) || DEMO_ELECTION.candidates[0];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Disclaimer Badge */}
      <div className="p-3.5 rounded-2xl bg-navy-900/90 border border-saffron-500/30 flex items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 text-slate-300">
          <AlertTriangle className="w-4 h-4 text-saffron-400 shrink-0" />
          <span>
            <strong>Demo Election Sandbox:</strong> All candidates, party names, voter profiles, and cryptographic receipts are simulated for this hackathon demonstration.
          </span>
        </div>
        <button
          onClick={() => {
            resetSystemState();
            setCurrentStep(1);
          }}
          title="Restart demo election flow"
          className="shrink-0 flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px]"
        >
          <RefreshCw className="w-3 h-3" />
          <span>Reset Demo</span>
        </button>
      </div>

      {/* 5-Step Progress Header */}
      <div className="glass-panel rounded-2xl p-4 sm:p-6 border border-electric-500/20">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-white">
              {DEMO_ELECTION.title}
            </h1>
            <p className="text-xs text-slate-400">
              {DEMO_ELECTION.constituency} • {DEMO_ELECTION.category}
            </p>
          </div>
          <span className="px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/40 text-emerald-400 font-bold text-xs uppercase tracking-wider">
            Live Demo Active
          </span>
        </div>

        {/* Step Indicator */}
        <div className="grid grid-cols-5 gap-2 pt-2 text-center text-xs">
          {[
            { num: 1, label: 'Identity Auth' },
            { num: 2, label: 'Eligibility' },
            { num: 3, label: 'Ballot Selection' },
            { num: 4, label: 'AES Encryption' },
            { num: 5, label: 'Confirmation' },
          ].map(step => (
            <div key={step.num} className="space-y-1">
              <div
                className={`h-2 rounded-full transition-all ${
                  currentStep === step.num
                    ? 'bg-electric-400 shadow-glow-sm'
                    : currentStep > step.num
                    ? 'bg-emerald-500'
                    : 'bg-slate-800'
                }`}
              />
              <span
                className={`text-[11px] font-semibold block truncate ${
                  currentStep === step.num
                    ? 'text-electric-400'
                    : currentStep > step.num
                    ? 'text-slate-300'
                    : 'text-slate-500'
                }`}
              >
                {step.num}. {step.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ====================================================
          STEP 1: DEMO AUTHENTICATION
          ==================================================== */}
      {currentStep === 1 && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7 glass-panel rounded-3xl p-6 sm:p-8 border border-electric-500/30 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-electric-400" />
                  Verify Overseas Citizen Identity
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Simulated multi-factor authentication with instant OTP
                </p>
              </div>
              <button
                type="button"
                onClick={handleAutoFill}
                className="px-3 py-1.5 rounded-xl bg-saffron-500/15 border border-saffron-500/30 text-saffron-300 text-xs font-semibold hover:bg-saffron-500/25 transition"
              >
                Auto-Fill Demo Info
              </button>
            </div>

            <form onSubmit={handleVerifyAuth} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="font-semibold text-slate-300">
                    Demo Passport Number
                  </label>
                  <input
                    type="text"
                    value={passportNumber}
                    onChange={e => setPassportNumber(e.target.value)}
                    required
                    placeholder="DEMO-PASS-8291"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-navy-950 border border-slate-700 text-slate-100 focus:border-electric-400 focus:outline-none font-mono"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-semibold text-slate-300">
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    value={dob}
                    onChange={e => setDob(e.target.value)}
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl bg-navy-950 border border-slate-700 text-slate-100 focus:border-electric-400 focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold text-slate-300">
                  Overseas Residence Country
                </label>
                <select
                  value={country}
                  onChange={e => setCountry(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-navy-950 border border-slate-700 text-slate-100 focus:border-electric-400 focus:outline-none"
                >
                  <option value="United Arab Emirates">United Arab Emirates (UAE)</option>
                  <option value="United States of America">United States of America (USA)</option>
                  <option value="United Kingdom">United Kingdom (UK)</option>
                  <option value="Canada">Canada</option>
                  <option value="Singapore">Singapore</option>
                  <option value="Australia">Australia</option>
                  <option value="Germany">Germany</option>
                  <option value="Saudi Arabia">Saudi Arabia</option>
                </select>
              </div>

              {/* OTP Section */}
              <div className="p-4 rounded-2xl bg-navy-950/80 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-slate-200">
                    Two-Factor Authentication (OTP)
                  </span>
                  {!isOtpSent ? (
                    <button
                      type="button"
                      onClick={handleSendOtp}
                      className="px-3 py-1 rounded-lg bg-electric-600 hover:bg-electric-500 text-white font-semibold text-xs transition"
                    >
                      Send Demo OTP
                    </button>
                  ) : (
                    <span className="text-[11px] text-emerald-400 font-mono">
                      OTP Sent to Registered Contact (123456)
                    </span>
                  )}
                </div>

                {isOtpSent && (
                  <div className="space-y-1.5">
                    <label className="text-slate-400">Enter 6-Digit Demo OTP</label>
                    <input
                      type="text"
                      maxLength={6}
                      value={otp}
                      onChange={e => setOtp(e.target.value)}
                      placeholder="123456"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-navy-900 border border-electric-500/40 text-center text-base tracking-widest font-mono text-white focus:border-electric-400 focus:outline-none"
                    />
                  </div>
                )}
              </div>

              <div className="p-3 rounded-xl bg-saffron-500/10 border border-saffron-500/20 text-[11px] text-saffron-300">
                <strong>Demo Mode Warning:</strong> Never enter real passport, Aadhaar, or biometric credentials. This sandbox simulates the zero-knowledge handshake purely for hackathon review.
              </div>

              <button
                type="submit"
                disabled={isAuthenticating || !isOtpSent}
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-gradient-to-r from-electric-600 to-electric-500 hover:from-electric-500 hover:to-electric-400 text-white font-bold text-sm shadow-glow-sm disabled:opacity-40 transition hover:scale-105"
              >
                {isAuthenticating ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Verifying Identity Handshake...</span>
                  </>
                ) : (
                  <>
                    <ShieldCheck className="w-4 h-4" />
                    <span>Authenticate Demo Identity</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Right Security Guarantee Panel */}
          <div className="lg:col-span-5 space-y-4">
            <div className="glass-panel rounded-3xl p-6 border border-slate-800 space-y-4 text-xs">
              <h3 className="font-bold text-slate-100 text-sm flex items-center gap-2">
                <Lock className="w-4 h-4 text-electric-400" />
                Security & Isolation Guarantees
              </h3>

              <div className="space-y-2.5">
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-navy-900/60 border border-slate-800">
                  <span className="text-slate-300">Identity Data:</span>
                  <span className="font-bold text-emerald-400">PROTECTED</span>
                </div>
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-navy-900/60 border border-slate-800">
                  <span className="text-slate-300">Browser Session:</span>
                  <span className="font-bold text-emerald-400">ENCRYPTED</span>
                </div>
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-navy-900/60 border border-slate-800">
                  <span className="text-slate-300">Ingestion Protocol:</span>
                  <span className="font-bold text-electric-400">TLS 1.3 / E2EE</span>
                </div>
              </div>

              <p className="text-slate-400 text-[11px] leading-relaxed">
                In this architecture, authentication creates a single-use anonymous cryptographic token. Once authenticated, your identity credentials are never linked to the ballot.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ====================================================
          STEP 2: ELIGIBILITY VERIFICATION
          ==================================================== */}
      {currentStep === 2 && (
        <div className="max-w-2xl mx-auto glass-panel rounded-3xl p-6 sm:p-8 border border-emerald-500/30 space-y-6">
          <div className="text-center space-y-2">
            <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto shadow-glow-emerald/30">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-black text-white">
              Eligibility Verified
            </h2>
            <p className="text-xs text-slate-400">
              Zero-Knowledge Token Generated • Single-Use Ballot Permit Active
            </p>
          </div>

          {/* Fictional Voter Card */}
          <div className="p-5 rounded-2xl bg-navy-900/90 border border-slate-800 space-y-3 text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <span className="text-slate-400">Voter Profile:</span>
              <span className="font-bold text-white">{voterSession?.name}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Masked Voter ID:</span>
              <span className="font-mono text-electric-400 font-bold">{voterSession?.maskedVoterId}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Jurisdiction / Country:</span>
              <span className="text-slate-200">{voterSession?.country}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Consular District:</span>
              <span className="text-slate-200">{voterSession?.consulateRegion}</span>
            </div>
            <div className="flex items-center justify-between pt-2 border-t border-slate-800">
              <span className="text-slate-400">Blinded Voting Permit:</span>
              <span className="font-mono text-[11px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
                {voterSession?.token?.slice(0, 20)}...
              </span>
            </div>
          </div>

          {/* Animated Verification Checks */}
          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-navy-950/60 border border-slate-800">
              <span className="flex items-center gap-2 text-slate-300">
                <Check className="w-4 h-4 text-emerald-400" /> Identity Authentication Check
              </span>
              <span className="text-emerald-400 font-bold">PASSED</span>
            </div>
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-navy-950/60 border border-slate-800">
              <span className="flex items-center gap-2 text-slate-300">
                <Check className="w-4 h-4 text-emerald-400" /> Virtual Constituency Eligibility
              </span>
              <span className="text-emerald-400 font-bold">VERIFIED</span>
            </div>
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-navy-950/60 border border-slate-800">
              <span className="flex items-center gap-2 text-slate-300">
                <Check className="w-4 h-4 text-emerald-400" /> Anti-Duplicate Voting Nullifier
              </span>
              <span className="text-emerald-400 font-bold">ACTIVE (0 Prior Votes)</span>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-electric-500/10 border border-electric-500/20 text-xs text-electric-300 leading-relaxed">
            <strong>Privacy Guarantee:</strong> We logically and cryptographically separate your identity verification from the ballot content. The server only sees your blinded single-use voting permit.
          </div>

          <button
            onClick={handleProceedToBallot}
            className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-gradient-to-r from-electric-600 to-electric-500 hover:from-electric-500 hover:to-electric-400 text-white font-bold text-sm shadow-glow-sm transition hover:scale-105"
          >
            <span>Continue to Digital Ballot</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* ====================================================
          STEP 3: BALLOT PAGE
          ==================================================== */}
      {currentStep === 3 && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-2xl font-black text-white">
                Select Your Candidate
              </h2>
              <p className="text-xs text-slate-400">
                Touch a card to select. Review your choice before triggering client-side encryption.
              </p>
            </div>
            <span className="text-xs px-3 py-1 rounded-full bg-saffron-500/15 text-saffron-300 border border-saffron-500/30 font-semibold">
              Fictional Candidates Only
            </span>
          </div>

          {/* Candidate Radio Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {DEMO_ELECTION.candidates.map(candidate => {
              const isSelected = selectedCandidateId === candidate.id;
              return (
                <div
                  key={candidate.id}
                  onClick={() => setSelectedCandidateId(candidate.id)}
                  className={`p-5 rounded-2xl border cursor-pointer transition-all relative ${
                    isSelected
                      ? 'bg-navy-900 border-electric-400 shadow-glow-md ring-2 ring-electric-500/30'
                      : 'bg-navy-900/50 border-slate-800 hover:border-slate-700 hover:bg-navy-900/70'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-navy-800 border border-slate-700 flex items-center justify-center text-2xl shadow-inner">
                        {candidate.symbolEmoji}
                      </div>
                      <div>
                        <h3 className="text-base font-bold text-white">
                          {candidate.name}
                        </h3>
                        <span className="text-xs font-semibold text-electric-400">
                          {candidate.partyName}
                        </span>
                      </div>
                    </div>

                    <div
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition ${
                        isSelected
                          ? 'border-electric-400 bg-electric-500 text-white'
                          : 'border-slate-600 bg-navy-950'
                      }`}
                    >
                      {isSelected && <Check className="w-3.5 h-3.5" />}
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 line-clamp-2 my-2 leading-relaxed">
                    {candidate.manifestoSummary}
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-2 border-t border-slate-800/80">
                    {candidate.keyPillars.map((pillar, pIdx) => (
                      <span
                        key={pIdx}
                        className="text-[10px] px-2 py-0.5 rounded-full bg-navy-950 border border-slate-800 text-slate-400"
                      >
                        {pillar}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Action Bar */}
          <div className="flex items-center justify-between p-4 rounded-2xl bg-navy-900/80 border border-slate-800">
            <button
              onClick={() => setCurrentStep(2)}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white text-xs font-semibold"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Eligibility
            </button>

            <button
              onClick={() => setIsReviewModalOpen(true)}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-electric-600 to-electric-500 hover:from-electric-500 hover:to-electric-400 text-white font-bold text-xs shadow-glow-sm transition hover:scale-105"
            >
              <span>Review Selection & Encrypt</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Review Modal */}
          {isReviewModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/80 backdrop-blur-md animate-in fade-in">
              <div className="w-full max-w-md bg-navy-900 border border-electric-500/40 rounded-3xl p-6 space-y-5 shadow-2xl">
                <div className="text-center space-y-2">
                  <div className="w-12 h-12 rounded-2xl bg-electric-500/20 text-electric-400 border border-electric-500/30 flex items-center justify-center mx-auto shadow-glow-sm">
                    <Lock className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-white">
                    Review Selection Before Encryption
                  </h3>
                  <p className="text-xs text-slate-400">
                    Your choice will be encrypted on your device prior to transmission.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-navy-950 border border-electric-500/20 space-y-2 text-xs">
                  <div className="text-slate-400">Selected Candidate:</div>
                  <div className="text-base font-bold text-white flex items-center gap-2">
                    <span>{selectedCandidate.symbolEmoji}</span>
                    <span>{selectedCandidate.name}</span>
                  </div>
                  <div className="text-xs text-electric-400 font-semibold">
                    {selectedCandidate.partyName}
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-navy-950/80 border border-slate-800 text-[11px] text-slate-300 space-y-1">
                  <div className="font-semibold text-emerald-400 flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" /> Client-Side Encryption Protocol:
                  </div>
                  <p>
                    Native Web Crypto AES-256-GCM turns your selection into ciphertext. Plaintext is never transmitted to the demonstration server.
                  </p>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => setIsReviewModalOpen(false)}
                    className="w-1/2 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs"
                  >
                    Change Selection
                  </button>
                  <button
                    onClick={handleStartEncryption}
                    className="w-1/2 py-2.5 rounded-xl bg-gradient-to-r from-electric-600 to-electric-500 hover:from-electric-500 text-white font-bold text-xs shadow-glow-sm"
                  >
                    Encrypt & Submit Vote
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ====================================================
          STEP 4: CINEMATIC ENCRYPTION ANIMATION
          ==================================================== */}
      {currentStep === 4 && (
        <div className="max-w-2xl mx-auto glass-panel rounded-3xl p-8 sm:p-10 border border-electric-500/40 text-center space-y-8 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-electric-500/20 rounded-full blur-3xl pointer-events-none"></div>

          {/* Animated Lock Node */}
          <div className="relative w-24 h-24 mx-auto flex items-center justify-center">
            <div className="absolute inset-0 rounded-full border-2 border-electric-400/40 border-dashed animate-spin-slow"></div>
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-navy-900 to-electric-600 border border-electric-400 flex items-center justify-center text-white shadow-glow-md animate-pulse">
              <Lock className="w-10 h-10 text-white" />
            </div>
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-black text-white">
              {encryptionStage === 1 && 'Initializing Web Crypto API...'}
              {encryptionStage === 2 && 'Encrypting Ballot with AES-256-GCM...'}
              {encryptionStage === 3 && 'Computing SHA-256 Integrity Hash...'}
              {encryptionStage === 4 && 'Committing to Encrypted Ballot Box...'}
            </h2>
            <p className="text-xs text-slate-400">
              Plaintext candidate selection is sealed inside your browser sandbox.
            </p>
          </div>

          {/* Encryption Pipeline Visualizer */}
          <div className="grid grid-cols-4 gap-2 text-center text-xs">
            <div
              className={`p-3 rounded-xl border transition ${
                encryptionStage >= 1
                  ? 'bg-electric-500/20 border-electric-400 text-electric-300'
                  : 'bg-navy-950 border-slate-800 text-slate-600'
              }`}
            >
              <div className="font-bold">BALLOT</div>
              <div className="text-[10px]">Plaintext</div>
            </div>
            <div
              className={`p-3 rounded-xl border transition ${
                encryptionStage >= 2
                  ? 'bg-electric-500/20 border-electric-400 text-electric-300'
                  : 'bg-navy-950 border-slate-800 text-slate-600'
              }`}
            >
              <div className="font-bold">AES-256</div>
              <div className="text-[10px]">GCM Mode</div>
            </div>
            <div
              className={`p-3 rounded-xl border transition ${
                encryptionStage >= 3
                  ? 'bg-saffron-500/20 border-saffron-400 text-saffron-300'
                  : 'bg-navy-950 border-slate-800 text-slate-600'
              }`}
            >
              <div className="font-bold">SHA-256</div>
              <div className="text-[10px]">Digest</div>
            </div>
            <div
              className={`p-3 rounded-xl border transition ${
                encryptionStage >= 4
                  ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300'
                  : 'bg-navy-950 border-slate-800 text-slate-600'
              }`}
            >
              <div className="font-bold">SEALED</div>
              <div className="text-[10px]">Merkle Batch</div>
            </div>
          </div>

          {/* Real-time Crypto Terminal Log */}
          <div className="p-4 rounded-2xl bg-navy-950 border border-slate-800 text-left font-mono text-[11px] text-electric-300 space-y-1 max-h-36 overflow-y-auto">
            {encryptionLog.map((log, lIdx) => (
              <div key={lIdx} className="leading-tight">
                {log}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ====================================================
          STEP 5: CONFIRMATION & DEMO RECEIPT
          ==================================================== */}
      {currentStep === 5 && lastCastReceipt && (
        <div className="max-w-2xl mx-auto glass-panel rounded-3xl p-6 sm:p-8 border border-emerald-500/40 space-y-6 shadow-2xl animate-in zoom-in-95">
          <div className="text-center space-y-2">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-400 text-emerald-400 flex items-center justify-center mx-auto shadow-glow-emerald">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              Demo Vote Successfully Recorded
            </h2>
            <p className="text-xs text-slate-300">
              Your encrypted ballot payload is committed to the demonstration batch ledger.
            </p>
          </div>

          {/* Demo Cryptographic Receipt Box */}
          <div className="p-6 rounded-2xl bg-navy-900 border border-electric-500/30 space-y-4 relative overflow-hidden">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <span className="text-xs font-mono text-electric-400 font-bold uppercase tracking-wider">
                Demo Cryptographic Receipt
              </span>
              <span className="text-[11px] px-2 py-0.5 rounded bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 font-semibold">
                Status: {lastCastReceipt.ballotStatus}
              </span>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <span className="text-slate-400 block text-[11px]">Demo Receipt Code (For Independent Verification):</span>
                <div className="flex items-center justify-between mt-1 p-2.5 rounded-xl bg-navy-950 border border-electric-500/30">
                  <span className="font-mono text-base font-extrabold text-electric-300 tracking-wider">
                    {lastCastReceipt.receiptCode}
                  </span>
                  <button
                    onClick={handleCopyReceipt}
                    className="p-1.5 rounded-lg bg-navy-800 hover:bg-slate-700 text-slate-300 text-xs flex items-center gap-1"
                  >
                    {copiedReceipt ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedReceipt ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="p-2.5 rounded-xl bg-navy-950/60 border border-slate-800">
                  <span className="text-slate-500 text-[10px] block">Transaction ID:</span>
                  <span className="font-mono text-slate-200 font-semibold">{lastCastReceipt.transactionId}</span>
                </div>
                <div className="p-2.5 rounded-xl bg-navy-950/60 border border-slate-800">
                  <span className="text-slate-500 text-[10px] block">Merkle Batch / Height:</span>
                  <span className="font-mono text-slate-200 font-semibold">
                    Batch #{lastCastReceipt.batchIndex} (Block #{lastCastReceipt.blockHeight})
                  </span>
                </div>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-navy-950/80 border border-slate-800/80 text-[11px] text-slate-400 leading-relaxed">
              <strong>Individual Verifiability:</strong> You can enter this code in the Verifier to confirm your encrypted ballot was included in the batch tally. The receipt code never reveals your vote choice.
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <Link
              to={`/verify?code=${lastCastReceipt.receiptCode}`}
              className="sm:col-span-2 flex items-center justify-center gap-2 py-3.5 rounded-xl bg-gradient-to-r from-electric-600 to-electric-500 hover:from-electric-500 hover:to-electric-400 text-white font-bold text-xs shadow-glow-sm transition hover:scale-105"
            >
              <Fingerprint className="w-4 h-4" />
              <span>Verify My Receipt Now</span>
            </Link>

            <button
              onClick={handleDownloadReceipt}
              className="flex items-center justify-center gap-1.5 py-3.5 rounded-xl bg-navy-900 hover:bg-slate-800 border border-slate-700 text-slate-200 font-semibold text-xs transition"
            >
              <Download className="w-4 h-4" />
              <span>Download TXT</span>
            </button>
          </div>

          <div className="text-center pt-2">
            <Link
              to="/audit"
              className="text-xs text-slate-400 hover:text-electric-400 underline underline-offset-4"
            >
              View Public Audit Bulletin Board →
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};
