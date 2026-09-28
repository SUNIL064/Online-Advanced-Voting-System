import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  Fingerprint,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  Search,
  RefreshCw,
  Lock,
  EyeOff,
  FileCheck,
  Award,
  AlertTriangle,
  ArrowRight,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { verifyReceiptCodeCryptographically } from '../services/cryptoService';
import { ReceiptVerificationResult } from '../types';

export const VerificationPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const { receiptsList, recordAuditLog } = useApp();

  const [receiptCodeInput, setReceiptCodeInput] = useState(
    searchParams.get('code') || 'VBR-8F2A-19C4'
  );
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationStage, setVerificationStage] = useState(0);
  const [verificationResult, setVerificationResult] = useState<ReceiptVerificationResult | null>(null);

  const runVerification = async (codeToVerify: string) => {
    setIsVerifying(true);
    setVerificationResult(null);
    setVerificationStage(1);

    setTimeout(() => {
      setVerificationStage(2);
    }, 500);

    setTimeout(() => {
      setVerificationStage(3);
    }, 1100);

    setTimeout(async () => {
      setVerificationStage(4);
      const res = await verifyReceiptCodeCryptographically(codeToVerify, receiptsList);
      setVerificationResult(res);
      setIsVerifying(false);

      if (res.isValid) {
        recordAuditLog(
          'Receipt Audit Verification Executed',
          'INTEGRITY',
          `Receipt ${res.receiptCode} cryptographic proof verified by external client auditor.`,
          'VERIFIED'
        );
      }
    }, 1700);
  };

  useEffect(() => {
    const codeParam = searchParams.get('code');
    if (codeParam) {
      setReceiptCodeInput(codeParam);
      runVerification(codeParam);
    }
  }, [searchParams]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!receiptCodeInput.trim()) return;
    runVerification(receiptCodeInput.trim());
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Title Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-electric-500/10 border border-electric-500/30 text-electric-300 text-xs font-semibold shadow-glow-sm">
          <Fingerprint className="w-4 h-4 text-electric-400" />
          <span>Independent Cryptographic Auditor</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-white">
          Verify Your Demo Vote Inclusion
        </h1>
        <p className="text-slate-300 text-sm max-w-xl mx-auto leading-relaxed">
          Enter your demo cryptographic receipt code to audit that your encrypted ballot has been recorded and committed to the public demonstration tally.
        </p>
      </div>

      {/* Verification Input Card */}
      <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-electric-500/30 shadow-2xl">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300 flex items-center justify-between">
              <span>Enter Demo Receipt Code:</span>
              <span className="text-[11px] text-slate-500">Format: VBR-XXXX-XXXX-XXXX</span>
            </label>

            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                value={receiptCodeInput}
                onChange={e => setReceiptCodeInput(e.target.value.toUpperCase())}
                placeholder="e.g. VBR-8F2A-19C4"
                className="flex-grow px-4 py-3 rounded-xl bg-navy-950 border border-slate-700 text-white font-mono text-sm tracking-wider focus:border-electric-400 focus:outline-none uppercase"
              />

              <button
                type="submit"
                disabled={isVerifying || !receiptCodeInput.trim()}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-electric-600 to-electric-500 hover:from-electric-500 text-white font-bold text-xs shadow-glow-sm disabled:opacity-40 transition"
              >
                {isVerifying ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Verifying Proof...</span>
                  </>
                ) : (
                  <>
                    <Search className="w-4 h-4" />
                    <span>Verify Receipt</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Quick Demo Pre-fills */}
          <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
            <span className="text-slate-500 text-[11px]">Sample demo codes:</span>
            {['VBR-8F2A-19C4', 'VBR-7K9P-44M2'].map(code => (
              <button
                key={code}
                type="button"
                onClick={() => {
                  setReceiptCodeInput(code);
                  runVerification(code);
                }}
                className="px-2.5 py-1 rounded-lg bg-navy-900 border border-slate-800 text-electric-300 hover:border-electric-500/40 font-mono text-[11px]"
              >
                {code}
              </button>
            ))}
          </div>
        </form>

        {/* 4-Stage Verification Animation Progress */}
        {isVerifying && (
          <div className="mt-8 p-6 rounded-2xl bg-navy-950 border border-slate-800 space-y-4 animate-in fade-in">
            <div className="text-xs font-mono text-electric-400 font-semibold flex items-center gap-2">
              <RefreshCw className="w-4 h-4 animate-spin" />
              Executing 4-Phase Cryptographic Audit Pipeline...
            </div>

            <div className="space-y-2.5 text-xs font-mono">
              <div className={`flex items-center gap-2 ${verificationStage >= 1 ? 'text-electric-300' : 'text-slate-600'}`}>
                <span className={`w-2 h-2 rounded-full ${verificationStage >= 1 ? 'bg-electric-400 animate-pulse' : 'bg-slate-700'}`}></span>
                1. Searching encrypted batch ledger for leaf commitment...
              </div>
              <div className={`flex items-center gap-2 ${verificationStage >= 2 ? 'text-electric-300' : 'text-slate-600'}`}>
                <span className={`w-2 h-2 rounded-full ${verificationStage >= 2 ? 'bg-electric-400 animate-pulse' : 'bg-slate-700'}`}></span>
                2. Checking SHA-256 receipt integrity hash signature...
              </div>
              <div className={`flex items-center gap-2 ${verificationStage >= 3 ? 'text-electric-300' : 'text-slate-600'}`}>
                <span className={`w-2 h-2 rounded-full ${verificationStage >= 3 ? 'bg-electric-400 animate-pulse' : 'bg-slate-700'}`}></span>
                3. Rebuilding Merkle branch paths & computing root hash...
              </div>
              <div className={`flex items-center gap-2 ${verificationStage >= 4 ? 'text-emerald-400' : 'text-slate-600'}`}>
                <span className={`w-2 h-2 rounded-full ${verificationStage >= 4 ? 'bg-emerald-400' : 'bg-slate-700'}`}></span>
                4. Cryptographic inclusion proof verified!
              </div>
            </div>
          </div>
        )}

        {/* Verification Result Card */}
        {verificationResult && (
          <div className="mt-8 space-y-6 animate-in zoom-in-95">
            {verificationResult.isValid ? (
              <div className="p-6 rounded-2xl bg-emerald-950/40 border-2 border-emerald-500/50 space-y-5 shadow-glow-emerald/20">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-400 text-emerald-400 flex items-center justify-center shadow-glow-sm">
                      <CheckCircle2 className="w-7 h-7" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white">
                        Receipt Cryptographically Valid
                      </h3>
                      <p className="text-xs text-emerald-300">
                        {verificationResult.inclusionStatus}
                      </p>
                    </div>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 font-bold text-xs">
                    INCLUDED
                  </span>
                </div>

                {/* Privacy Badge Guarantee */}
                <div className="p-3.5 rounded-xl bg-navy-900/90 border border-emerald-500/30 text-xs text-slate-200 flex items-center gap-3">
                  <EyeOff className="w-5 h-5 text-purple-400 shrink-0" />
                  <div>
                    <strong className="text-white block">Absolute Ballot Secrecy Maintained:</strong>
                    <span>{verificationResult.privacyGuarantee}</span>
                  </div>
                </div>

                {/* Proof Details Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded-xl bg-navy-950/80 border border-slate-800 space-y-1">
                    <span className="text-slate-400 text-[11px]">Audit Timestamp:</span>
                    <div className="font-mono text-slate-200 font-semibold">{verificationResult.timestamp}</div>
                  </div>
                  <div className="p-3 rounded-xl bg-navy-950/80 border border-slate-800 space-y-1">
                    <span className="text-slate-400 text-[11px]">Merkle Batch Index:</span>
                    <div className="font-mono text-slate-200 font-semibold">Batch #{verificationResult.batchIndex}</div>
                  </div>
                </div>

                {/* Merkle Proof Tree Trace */}
                <div className="p-4 rounded-xl bg-navy-950 border border-slate-800 space-y-2">
                  <div className="text-[11px] font-bold text-electric-400 uppercase tracking-wider flex items-center gap-1.5">
                    <FileCheck className="w-3.5 h-3.5" />
                    Merkle Tree Cryptographic Inclusion Path:
                  </div>
                  <div className="font-mono text-[11px] text-slate-300 space-y-1">
                    {verificationResult.merkleProof.map((proof, pIdx) => (
                      <div key={pIdx} className="text-emerald-300">
                        ↳ {proof}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-6 rounded-2xl bg-red-950/40 border-2 border-red-500/40 space-y-4 text-center">
                <div className="w-12 h-12 rounded-xl bg-red-500/20 border border-red-400 text-red-400 flex items-center justify-center mx-auto">
                  <XCircle className="w-7 h-7" />
                </div>
                <h3 className="text-lg font-bold text-white">
                  Verification Failed / Invalid Receipt Code
                </h3>
                <p className="text-xs text-slate-300 max-w-md mx-auto">
                  The receipt code could not be found in the current demonstration batch ledger. Make sure to enter a valid code in the format <code>VBR-XXXX-XXXX-XXXX</code>.
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Informational Guidance Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
        <div className="p-4 rounded-2xl bg-navy-900/60 border border-slate-800 space-y-2">
          <h4 className="font-bold text-slate-200 flex items-center gap-1.5">
            <Lock className="w-4 h-4 text-electric-400" /> Cast-as-Intended
          </h4>
          <p className="text-slate-400 leading-relaxed text-[11px]">
            Your client device computes a deterministic hash of the encrypted payload before sending.
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-navy-900/60 border border-slate-800 space-y-2">
          <h4 className="font-bold text-slate-200 flex items-center gap-1.5">
            <FileCheck className="w-4 h-4 text-saffron-400" /> Recorded-as-Cast
          </h4>
          <p className="text-slate-400 leading-relaxed text-[11px]">
            The receipt proves the ballot was committed to the append-only Merkle ledger without alteration.
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-navy-900/60 border border-slate-800 space-y-2">
          <h4 className="font-bold text-slate-200 flex items-center gap-1.5">
            <Award className="w-4 h-4 text-emerald-400" /> Tallied-as-Recorded
          </h4>
          <p className="text-slate-400 leading-relaxed text-[11px]">
            Public bulletin board proofs allow independent observers to verify all valid batches are summed.
          </p>
        </div>
      </div>
    </div>
  );
};
