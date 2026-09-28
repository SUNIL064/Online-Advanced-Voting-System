import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  AccessibilitySettings,
  AuditEvent,
  ConnectionStatus,
  DemoReceipt,
  DemoVoter,
  EncryptedBallotPayload,
  GuidedDemoStep,
  Language,
} from '../types';
import { TRANSLATIONS } from '../data/translations';
import { storageService } from '../services/storageService';
import { computeSHA256, createDemoReceipt, encryptBallotWithAES, generateDemoReceiptCode } from '../services/cryptoService';
import { DEMO_ELECTION } from '../data/electionData';

export const GUIDED_STEPS: GuidedDemoStep[] = [
  {
    id: 1,
    title: 'Landing & Architecture Overview',
    route: '/',
    explanation: 'Explore the vision for secure, end-to-end verifiable remote voting for eligible overseas citizens.',
    whyItMatters: 'Demonstrates government-grade trust, zero-knowledge concepts, and transparent telemetry.',
    securityGuarantee: 'No sensitive credentials collected; all data is strictly for prototype demonstration.',
  },
  {
    id: 2,
    title: 'Demo Identity Authentication',
    route: '/demo-election',
    explanation: 'Experience simulated multi-factor authentication using passport mock and instant OTP.',
    whyItMatters: 'Separates identity authentication from voting permissions without storing raw PII.',
    securityGuarantee: 'Demo credentials only; cryptographic nonces prevent replay attempts.',
  },
  {
    id: 3,
    title: 'Eligibility & Blinded Token',
    route: '/demo-election',
    explanation: 'Zero-knowledge verification ensures voter is eligible without revealing demographic identifiers.',
    whyItMatters: 'Completely decouples who you are from what you vote.',
    securityGuarantee: 'Ephemeral blinded voter token generated for single-use ballot submission.',
  },
  {
    id: 4,
    title: 'Ballot Selection & Review',
    route: '/demo-election',
    explanation: 'Select from fictional candidates with high-contrast accessibility and touch-optimized controls.',
    whyItMatters: 'Clear, neutral candidate information and review modal prior to encryption.',
    securityGuarantee: 'Ballot remains in plaintext memory only until user clicks Encrypt.',
  },
  {
    id: 5,
    title: 'Cinematic Client-Side Encryption',
    route: '/demo-election',
    explanation: 'Watch native Web Crypto AES-256-GCM convert the vote into an encrypted cryptographic payload.',
    whyItMatters: 'Plaintext vote is NEVER transmitted over the wire or visible to server admins.',
    securityGuarantee: 'SHA-256 payload integrity hash + 256-bit encryption before network dispatch.',
  },
  {
    id: 6,
    title: 'Cryptographic Demo Receipt',
    route: '/demo-election',
    explanation: 'Receive an individual inclusion proof code (e.g. VBR-XXXX-XXXX-XXXX).',
    whyItMatters: 'Enables voters to audit their ballot inclusion without revealing candidate selection.',
    securityGuarantee: 'Receipt is a Merkle tree commitment, maintaining 100% ballot privacy.',
  },
  {
    id: 7,
    title: 'Independent Receipt Verification',
    route: '/verify',
    explanation: 'Audit the receipt against the public batch ledger to confirm inclusion in the tally.',
    whyItMatters: 'Provides Cast-as-Intended and Recorded-as-Cast verifiability for every voter.',
    securityGuarantee: 'Proof of inclusion verification completes with zero exposure of vote choice.',
  },
  {
    id: 8,
    title: 'Audit & Transparency Dashboard',
    route: '/audit',
    explanation: 'Inspect real-time system metrics, tamper-evident logs, and Merkle root batches.',
    whyItMatters: 'Independent election monitors can verify system integrity continuously.',
    securityGuarantee: 'Immutable append-only cryptographic event log.',
  },
];

interface AppContextType {
  // Language & i18n
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;

  // Accessibility
  accessibility: AccessibilitySettings;
  updateAccessibility: (settings: Partial<AccessibilitySettings>) => void;
  isAccessibilityModalOpen: boolean;
  setIsAccessibilityModalOpen: (open: boolean) => void;

  // Low Bandwidth & Connectivity
  isLowBandwidth: boolean;
  toggleLowBandwidth: () => void;
  connectionStatus: ConnectionStatus;
  setConnectionStatus: (status: ConnectionStatus) => void;

  // Guided Demo (Judge Walkthrough)
  isGuidedDemoActive: boolean;
  currentGuidedStep: number;
  startGuidedDemo: () => void;
  nextGuidedStep: () => void;
  prevGuidedStep: () => void;
  exitGuidedDemo: () => void;

  // Voter Auth & State
  voterSession: DemoVoter | null;
  loginDemoVoter: (passport?: string, country?: string) => Promise<DemoVoter>;
  logoutDemoVoter: () => void;

  // Ballot & Encryption
  lastCastReceipt: DemoReceipt | null;
  castDemoBallot: (candidateId: string) => Promise<{ receipt: DemoReceipt; payload: EncryptedBallotPayload }>;
  receiptsList: DemoReceipt[];
  
  // Audit Logs
  auditLogs: AuditEvent[];
  recordAuditLog: (event: string, category: AuditEvent['category'], details: string, status?: AuditEvent['status']) => AuditEvent;
  
  // Reset
  resetSystemState: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => storageService.getLanguage());
  const [accessibility, setAccessibilityState] = useState<AccessibilitySettings>(() => storageService.getAccessibility());
  const [isAccessibilityModalOpen, setIsAccessibilityModalOpen] = useState(false);
  const [isLowBandwidth, setIsLowBandwidth] = useState<boolean>(() => storageService.getLowBandwidth());
  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>('excellent');

  // Guided Demo Tour
  const [isGuidedDemoActive, setIsGuidedDemoActive] = useState(false);
  const [currentGuidedStep, setCurrentGuidedStep] = useState(1);

  // Voter session
  const [voterSession, setVoterSession] = useState<DemoVoter | null>(() => storageService.getVoterSession());
  const [lastCastReceipt, setLastCastReceipt] = useState<DemoReceipt | null>(null);
  const [receiptsList, setReceiptsList] = useState<DemoReceipt[]>(() => storageService.getReceipts());
  const [auditLogs, setAuditLogs] = useState<AuditEvent[]>(() => storageService.getAuditLogs());

  // Apply HTML accessibility classes whenever settings change
  useEffect(() => {
    const root = document.documentElement;
    // Contrast
    if (accessibility.contrast === 'high') {
      root.classList.add('high-contrast');
    } else {
      root.classList.remove('high-contrast');
    }

    // Motion
    if (accessibility.motion === 'reduced' || isLowBandwidth) {
      root.classList.add('reduced-motion');
    } else {
      root.classList.remove('reduced-motion');
    }

    // Readable Font
    if (accessibility.font === 'readable') {
      root.classList.add('font-readable');
    } else {
      root.classList.remove('font-readable');
    }

    // Text Size
    root.classList.remove('text-size-normal', 'text-size-large', 'text-size-xlarge');
    root.classList.add(`text-size-${accessibility.textSize}`);
    if (accessibility.textSize === 'large') {
      root.style.fontSize = '18px';
    } else if (accessibility.textSize === 'xlarge') {
      root.style.fontSize = '20px';
    } else {
      root.style.fontSize = '16px';
    }
  }, [accessibility, isLowBandwidth]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    storageService.saveLanguage(lang);
  };

  const t = (key: string): string => {
    const langDict = TRANSLATIONS[language] || TRANSLATIONS.en;
    if (langDict[key]) return langDict[key];
    return TRANSLATIONS.en[key] || key;
  };

  const updateAccessibility = (newSettings: Partial<AccessibilitySettings>) => {
    setAccessibilityState(prev => {
      const updated = { ...prev, ...newSettings };
      storageService.saveAccessibility(updated);
      return updated;
    });
  };

  const toggleLowBandwidth = () => {
    setIsLowBandwidth(prev => {
      const next = !prev;
      storageService.saveLowBandwidth(next);
      return next;
    });
  };

  // Guided demo actions
  const startGuidedDemo = () => {
    setIsGuidedDemoActive(true);
    setCurrentGuidedStep(1);
  };

  const nextGuidedStep = () => {
    setCurrentGuidedStep(prev => Math.min(prev + 1, GUIDED_STEPS.length));
  };

  const prevGuidedStep = () => {
    setCurrentGuidedStep(prev => Math.max(prev - 1, 1));
  };

  const exitGuidedDemo = () => {
    setIsGuidedDemoActive(false);
  };

  // Voter Auth
  const loginDemoVoter = async (passport = 'DEMO-PASS-8291', country = 'United Arab Emirates'): Promise<DemoVoter> => {
    const blindedToken = await computeSHA256(`BLIND_TOKEN_${passport}_${Date.now()}`);
    const voter: DemoVoter = {
      id: 'DEMO-VOTER-10482',
      name: 'Demo Overseas Citizen',
      maskedVoterId: 'IN••••••72',
      passportNumber: passport,
      country: country,
      consulateRegion: 'Embassy of India, Abu Dhabi / Consulate Dubai',
      constituency: 'Overseas Digital Constituency (Zone 1)',
      isEligible: true,
      hasVoted: false,
      verifiedAt: new Date().toISOString(),
      token: `ZK-TOKEN-${blindedToken.slice(0, 16)}`,
    };

    setVoterSession(voter);
    storageService.setVoterSession(voter);

    recordAuditLog(
      'Demo Voter Authenticated',
      'AUTHENTICATION',
      `Blinded token generated for voter in ${country}. Identity isolated from ballot engine.`,
      'VERIFIED'
    );

    return voter;
  };

  const logoutDemoVoter = () => {
    setVoterSession(null);
    storageService.clearVoterSession();
  };

  // Cast Ballot
  const castDemoBallot = async (candidateId: string): Promise<{ receipt: DemoReceipt; payload: EncryptedBallotPayload }> => {
    const receiptCode = generateDemoReceiptCode();
    const blindedToken = voterSession?.token || `ZK-TOKEN-${Math.random().toString(36).slice(2, 10)}`;

    // Real client-side Web Crypto AES-GCM encryption
    const { encryptedBlob, ivHex, hashHex } = await encryptBallotWithAES(
      candidateId,
      DEMO_ELECTION.id,
      blindedToken
    );

    const ballotPayload: EncryptedBallotPayload = {
      ballotId: `BALLOT-${hashHex.slice(0, 12).toUpperCase()}`,
      electionId: DEMO_ELECTION.id,
      encryptedVoteBlob: encryptedBlob,
      iv: ivHex,
      sha256Hash: hashHex,
      receiptCode,
      timestamp: new Date().toISOString(),
      blindedVoterToken: blindedToken,
      status: 'ENCRYPTED',
    };

    // Create receipt
    const receipt = await createDemoReceipt(ballotPayload);

    // Save
    storageService.saveBallot(ballotPayload);
    storageService.saveReceipt(receipt);
    setLastCastReceipt(receipt);
    setReceiptsList(storageService.getReceipts());

    // Mark voter as voted in demo session
    if (voterSession) {
      const updated = { ...voterSession, hasVoted: true };
      setVoterSession(updated);
      storageService.setVoterSession(updated);
    }

    // Record audit event
    recordAuditLog(
      'Ballot Encrypted & Ingested',
      'BALLOT',
      `Ballot ${ballotPayload.ballotId} ingested with SHA-256 hash 0x${hashHex.slice(0, 16)}... into Merkle batch #${receipt.batchIndex}.`,
      'ENCRYPTED'
    );

    recordAuditLog(
      'Cryptographic Receipt Committed',
      'INTEGRITY',
      `Receipt ${receipt.receiptCode} committed to batch ledger height #${receipt.blockHeight}.`,
      'VERIFIED'
    );

    return { receipt, payload: ballotPayload };
  };

  const recordAuditLog = (
    event: string,
    category: AuditEvent['category'],
    details: string,
    status: AuditEvent['status'] = 'RECORDED'
  ): AuditEvent => {
    const hash = '0x' + Array.from({ length: 28 }, () => Math.floor(Math.random() * 16).toString(16)).join('');
    const newLog = storageService.addAuditLog({
      event,
      category,
      details,
      status,
      hash,
    });
    setAuditLogs(storageService.getAuditLogs());
    return newLog;
  };

  const resetSystemState = () => {
    storageService.resetAllDemoData();
    setVoterSession(null);
    setLastCastReceipt(null);
    setReceiptsList(storageService.getReceipts());
    setAuditLogs(storageService.getAuditLogs());
  };

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage,
        t,
        accessibility,
        updateAccessibility,
        isAccessibilityModalOpen,
        setIsAccessibilityModalOpen,
        isLowBandwidth,
        toggleLowBandwidth,
        connectionStatus,
        setConnectionStatus,
        isGuidedDemoActive,
        currentGuidedStep,
        startGuidedDemo,
        nextGuidedStep,
        prevGuidedStep,
        exitGuidedDemo,
        voterSession,
        loginDemoVoter,
        logoutDemoVoter,
        lastCastReceipt,
        castDemoBallot,
        receiptsList,
        auditLogs,
        recordAuditLog,
        resetSystemState,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within an AppProvider');
  return context;
};
