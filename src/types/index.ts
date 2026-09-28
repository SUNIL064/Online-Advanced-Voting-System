export type Language = 'en' | 'hi' | 'te' | 'ta' | 'bn' | 'mr';

export type TextSize = 'normal' | 'large' | 'xlarge';
export type ContrastMode = 'standard' | 'high';
export type MotionPreference = 'full' | 'reduced';
export type FontPreference = 'default' | 'readable';
export type ConnectionStatus = 'excellent' | 'good' | 'poor' | 'offline';

export interface AccessibilitySettings {
  textSize: TextSize;
  contrast: ContrastMode;
  motion: MotionPreference;
  font: FontPreference;
  keyboardNav: boolean;
  screenReaderFriendly: boolean;
}

export interface DemoVoter {
  id: string;
  name: string;
  maskedVoterId: string;
  passportNumber: string;
  country: string;
  consulateRegion: string;
  constituency: string;
  isEligible: boolean;
  hasVoted: boolean;
  verifiedAt?: string;
  token?: string;
}

export interface Candidate {
  id: string;
  name: string;
  partyName: string;
  partyCode: string;
  symbolEmoji: string;
  manifestoSummary: string;
  keyPillars: string[];
  colorHex: string;
}

export interface Election {
  id: string;
  title: string;
  category: string;
  constituency: string;
  description: string;
  startTime: string;
  endTime: string;
  status: 'UPCOMING' | 'ACTIVE' | 'CONCLUDED';
  candidates: Candidate[];
}

export interface EncryptedBallotPayload {
  ballotId: string;
  electionId: string;
  encryptedVoteBlob: string;
  iv: string;
  sha256Hash: string;
  receiptCode: string;
  timestamp: string;
  blindedVoterToken: string;
  status: 'ENCRYPTED' | 'RECORDED' | 'VERIFIED';
}

export interface DemoReceipt {
  receiptCode: string; // VBR-XXXX-XXXX-XXXX
  transactionId: string; // VB-DEMO-2026-XXXXXX
  timestamp: string;
  ballotStatus: 'Encrypted' | 'Recorded' | 'Tally Verified';
  merkleRootHash: string;
  blockHeight: number;
  batchIndex: number;
  isDemo: true;
}

export interface ReceiptVerificationResult {
  isValid: boolean;
  receiptCode: string;
  transactionId: string;
  timestamp: string;
  status: 'VERIFIED' | 'INVALID' | 'NOT_FOUND';
  merkleProof: string[];
  rootHash: string;
  batchIndex: number;
  privacyGuarantee: string;
  inclusionStatus: string;
}

export interface AuditEvent {
  id: string;
  timestamp: string;
  event: string;
  hash: string;
  status: 'VERIFIED' | 'RECORDED' | 'ENCRYPTED' | 'ALERT';
  category: 'BALLOT' | 'AUTHENTICATION' | 'SECURITY' | 'INTEGRITY' | 'SYSTEM';
  details: string;
}

export interface SecurityEvent {
  id: string;
  timestamp: string;
  type: string;
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'INFO';
  source: string;
  mitigation: string;
  status: 'BLOCKED' | 'MITIGATED' | 'ANALYZED';
}

export interface DiasporaRegion {
  id: string;
  name: string;
  sharePercentage: number;
  estimatedVoters: string;
  activeConsulates: number;
  status: 'ACTIVE' | 'PREPARATION' | 'MONITORED';
  topCountries: string[];
  coordinates: { x: number; y: number };
}

export interface GuidedDemoStep {
  id: number;
  title: string;
  route: string;
  targetElementId?: string;
  explanation: string;
  whyItMatters: string;
  securityGuarantee: string;
}
