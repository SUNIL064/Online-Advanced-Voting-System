import {
  AccessibilitySettings,
  AuditEvent,
  DemoReceipt,
  DemoVoter,
  EncryptedBallotPayload,
  Language,
} from '../types';
import { INITIAL_AUDIT_LOGS } from '../data/electionData';

const KEYS = {
  VOTER_SESSION: 'vbb_voter_session',
  BALLOTS: 'vbb_encrypted_ballots',
  RECEIPTS: 'vbb_demo_receipts',
  AUDIT_LOGS: 'vbb_audit_logs',
  ACCESSIBILITY: 'vbb_accessibility',
  LANGUAGE: 'vbb_language',
  LOW_BANDWIDTH: 'vbb_low_bandwidth',
};

const DEFAULT_ACCESSIBILITY: AccessibilitySettings = {
  textSize: 'normal',
  contrast: 'standard',
  motion: 'full',
  font: 'default',
  keyboardNav: true,
  screenReaderFriendly: true,
};

export const storageService = {
  // Voter Session
  getVoterSession(): DemoVoter | null {
    try {
      const data = localStorage.getItem(KEYS.VOTER_SESSION);
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  },

  setVoterSession(voter: DemoVoter): void {
    try {
      localStorage.setItem(KEYS.VOTER_SESSION, JSON.stringify(voter));
    } catch (e) {
      console.warn('Storage error', e);
    }
  },

  clearVoterSession(): void {
    try {
      localStorage.removeItem(KEYS.VOTER_SESSION);
    } catch (e) {
      console.warn('Storage error', e);
    }
  },

  // Ballots
  getBallots(): EncryptedBallotPayload[] {
    try {
      const data = localStorage.getItem(KEYS.BALLOTS);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },

  saveBallot(ballot: EncryptedBallotPayload): void {
    try {
      const ballots = this.getBallots();
      ballots.unshift(ballot);
      localStorage.setItem(KEYS.BALLOTS, JSON.stringify(ballots.slice(0, 100)));
    } catch (e) {
      console.warn('Storage error', e);
    }
  },

  // Receipts
  getReceipts(): DemoReceipt[] {
    try {
      const data = localStorage.getItem(KEYS.RECEIPTS);
      return data ? JSON.parse(data) : [
        {
          receiptCode: 'VBR-8F2A-19C4',
          transactionId: 'VB-DEMO-2026-8F2A19',
          timestamp: new Date(Date.now() - 3600000).toISOString(),
          ballotStatus: 'Encrypted',
          merkleRootHash: '0x9ba714a82c9e7821bc0841f3d4a88bc391104e7',
          blockHeight: 4892,
          batchIndex: 14,
          isDemo: true,
        },
        {
          receiptCode: 'VBR-7K9P-44M2',
          transactionId: 'VB-DEMO-2026-7K9P44',
          timestamp: new Date(Date.now() - 7200000).toISOString(),
          ballotStatus: 'Tally Verified',
          merkleRootHash: '0x3c8911d4e7a829103cba218902d5fa1082c9e01',
          blockHeight: 4889,
          batchIndex: 13,
          isDemo: true,
        }
      ];
    } catch {
      return [];
    }
  },

  saveReceipt(receipt: DemoReceipt): void {
    try {
      const receipts = this.getReceipts();
      const existingIdx = receipts.findIndex(r => r.receiptCode === receipt.receiptCode);
      if (existingIdx >= 0) {
        receipts[existingIdx] = receipt;
      } else {
        receipts.unshift(receipt);
      }
      localStorage.setItem(KEYS.RECEIPTS, JSON.stringify(receipts.slice(0, 50)));
    } catch (e) {
      console.warn('Storage error', e);
    }
  },

  // Audit Logs
  getAuditLogs(): AuditEvent[] {
    try {
      const data = localStorage.getItem(KEYS.AUDIT_LOGS);
      return data ? JSON.parse(data) : INITIAL_AUDIT_LOGS;
    } catch {
      return INITIAL_AUDIT_LOGS;
    }
  },

  addAuditLog(log: Omit<AuditEvent, 'id' | 'timestamp'>): AuditEvent {
    const newLog: AuditEvent = {
      id: `aud-${Date.now()}`,
      timestamp: new Date().toLocaleTimeString('en-US', { hour12: false }) + ' UTC',
      ...log,
    };
    try {
      const logs = this.getAuditLogs();
      logs.unshift(newLog);
      localStorage.setItem(KEYS.AUDIT_LOGS, JSON.stringify(logs.slice(0, 150)));
    } catch (e) {
      console.warn('Storage error', e);
    }
    return newLog;
  },

  // Accessibility Settings
  getAccessibility(): AccessibilitySettings {
    try {
      const data = localStorage.getItem(KEYS.ACCESSIBILITY);
      return data ? { ...DEFAULT_ACCESSIBILITY, ...JSON.parse(data) } : DEFAULT_ACCESSIBILITY;
    } catch {
      return DEFAULT_ACCESSIBILITY;
    }
  },

  saveAccessibility(settings: AccessibilitySettings): void {
    try {
      localStorage.setItem(KEYS.ACCESSIBILITY, JSON.stringify(settings));
    } catch (e) {
      console.warn('Storage error', e);
    }
  },

  // Language
  getLanguage(): Language {
    try {
      const lang = localStorage.getItem(KEYS.LANGUAGE) as Language;
      return ['en', 'hi', 'te', 'ta', 'bn', 'mr'].includes(lang) ? lang : 'en';
    } catch {
      return 'en';
    }
  },

  saveLanguage(lang: Language): void {
    try {
      localStorage.setItem(KEYS.LANGUAGE, lang);
    } catch (e) {
      console.warn('Storage error', e);
    }
  },

  // Low Bandwidth Mode
  getLowBandwidth(): boolean {
    try {
      return localStorage.getItem(KEYS.LOW_BANDWIDTH) === 'true';
    } catch {
      return false;
    }
  },

  saveLowBandwidth(enabled: boolean): void {
    try {
      localStorage.setItem(KEYS.LOW_BANDWIDTH, String(enabled));
    } catch (e) {
      console.warn('Storage error', e);
    }
  },

  // Reset all demo data to pristine default
  resetAllDemoData(): void {
    try {
      localStorage.removeItem(KEYS.VOTER_SESSION);
      localStorage.removeItem(KEYS.BALLOTS);
      localStorage.removeItem(KEYS.RECEIPTS);
      localStorage.removeItem(KEYS.AUDIT_LOGS);
    } catch (e) {
      console.warn('Storage reset error', e);
    }
  },
};
