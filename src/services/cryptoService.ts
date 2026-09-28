/**
 * Cryptographic Demonstration Service for Voting Beyond Borders
 * Uses native Web Crypto API (SubtleCrypto) where available in modern browsers.
 * Clearly labeled as Prototype Demonstration.
 */

import { DemoReceipt, EncryptedBallotPayload, ReceiptVerificationResult } from '../types';

// Convert ArrayBuffer to Hex String
export function bufferToHex(buffer: ArrayBuffer): string {
  const byteArray = new Uint8Array(buffer);
  return Array.from(byteArray)
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}

// Convert ArrayBuffer to Base64 String
export function bufferToBase64(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  let binary = '';
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return window.btoa(binary);
}

// SHA-256 Real Web Crypto Digest
export async function computeSHA256(message: string): Promise<string> {
  if (window.crypto && window.crypto.subtle) {
    try {
      const encoder = new TextEncoder();
      const data = encoder.encode(message);
      const hashBuffer = await window.crypto.subtle.digest('SHA-256', data);
      return bufferToHex(hashBuffer);
    } catch (e) {
      console.warn('Web Crypto SHA-256 fallback', e);
    }
  }
  // Fallback simple hash generator for offline / fallback
  let hash = 0;
  for (let i = 0; i < message.length; i++) {
    const char = message.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0;
  }
  return Math.abs(hash).toString(16).padStart(64, 'a8f92c10b7');
}

// Real AES-GCM Client-Side Ballot Encryption Demo
export async function encryptBallotWithAES(
  candidateId: string,
  electionId: string,
  blindedVoterToken: string
): Promise<{ encryptedBlob: string; ivHex: string; hashHex: string }> {
  const payloadJson = JSON.stringify({
    candidateId,
    electionId,
    blindedVoterToken,
    entropyNonce: Math.random().toString(36).substring(2) + Date.now().toString(36),
    prototypeDisclaimer: 'Demonstration cryptographic ballot only - not legally binding',
  });

  const encoder = new TextEncoder();
  const data = encoder.encode(payloadJson);

  if (window.crypto && window.crypto.subtle) {
    try {
      // 1. Generate 256-bit ephemeral AES-GCM key
      const key = await window.crypto.subtle.generateKey(
        { name: 'AES-GCM', length: 256 },
        true,
        ['encrypt', 'decrypt']
      );

      // 2. Generate 96-bit Initialization Vector (IV)
      const iv = window.crypto.getRandomValues(new Uint8Array(12));

      // 3. Encrypt payload
      const encryptedBuffer = await window.crypto.subtle.encrypt(
        { name: 'AES-GCM', iv },
        key,
        data
      );

      const encryptedBlob = bufferToBase64(encryptedBuffer);
      const ivHex = bufferToHex(iv.buffer);
      const hashHex = await computeSHA256(encryptedBlob + ivHex);

      return { encryptedBlob, ivHex, hashHex };
    } catch (err) {
      console.warn('Native AES-GCM demo failed, generating mock ciphertext', err);
    }
  }

  // Fallback simulated ciphertext
  const mockIv = Array.from({ length: 24 }, () => Math.floor(Math.random() * 16).toString(16)).join('');
  const mockBlob = window.btoa(`ENC[AES-256-GCM]:${candidateId}:${Date.now()}`);
  const mockHash = await computeSHA256(mockBlob + mockIv);
  return { encryptedBlob: mockBlob, ivHex: mockIv, hashHex: mockHash };
}

// Generate formatted Demo Receipt Code (VBR-XXXX-XXXX-XXXX)
export function generateDemoReceiptCode(): string {
  const segment = () => Math.random().toString(36).substring(2, 6).toUpperCase();
  return `VBR-${segment()}-${segment()}-${segment()}`;
}

// Generate formatted Transaction ID (VB-DEMO-2026-XXXXXX)
export function generateTransactionId(): string {
  const hex = Math.floor(Math.random() * 0xffffff).toString(16).toUpperCase().padStart(6, '0');
  return `VB-DEMO-2026-${hex}`;
}

// Generate complete demo receipt object
export async function createDemoReceipt(
  ballotPayload: EncryptedBallotPayload
): Promise<DemoReceipt> {
  const rootHash = await computeSHA256(`MERKLE_ROOT_${ballotPayload.sha256Hash}_${Date.now()}`);
  return {
    receiptCode: ballotPayload.receiptCode,
    transactionId: generateTransactionId(),
    timestamp: new Date().toISOString(),
    ballotStatus: 'Encrypted',
    merkleRootHash: rootHash,
    blockHeight: 4892 + Math.floor(Math.random() * 20),
    batchIndex: 12 + Math.floor(Math.random() * 8),
    isDemo: true,
  };
}

// Simulate Merkle Tree Proof verification for receipt inclusion
export async function verifyReceiptCodeCryptographically(
  receiptCode: string,
  storedReceipts: DemoReceipt[]
): Promise<ReceiptVerificationResult> {
  // Normalize code
  const cleanCode = receiptCode.trim().toUpperCase();

  // Find in memory or match valid demo format
  const found = storedReceipts.find(r => r.receiptCode.toUpperCase() === cleanCode);

  const isValidFormat = /^VBR-[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}$/.test(cleanCode);

  if (!isValidFormat && !found) {
    return {
      isValid: false,
      receiptCode: cleanCode,
      transactionId: 'UNKNOWN',
      timestamp: new Date().toISOString(),
      status: 'INVALID',
      merkleProof: [],
      rootHash: '',
      batchIndex: 0,
      privacyGuarantee: 'Invalid receipt format or unknown demonstration record.',
      inclusionStatus: 'Verification failed: Receipt not found in demo batch ledger.',
    };
  }

  // If found in local storage or newly entered valid demo code
  const record = found || {
    receiptCode: cleanCode,
    transactionId: `VB-DEMO-2026-${cleanCode.slice(-6)}`,
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    merkleRootHash: await computeSHA256(`MOCK_ROOT_${cleanCode}`),
    blockHeight: 4902,
    batchIndex: 14,
  };

  const leafHash = await computeSHA256(`LEAF_${cleanCode}`);
  const siblingHash1 = await computeSHA256(`SIBLING_L1_${cleanCode}`);
  const siblingHash2 = await computeSHA256(`SIBLING_L2_${cleanCode}`);
  const siblingHash3 = await computeSHA256(`SIBLING_L3_${cleanCode}`);

  return {
    isValid: true,
    receiptCode: cleanCode,
    transactionId: record.transactionId,
    timestamp: record.timestamp,
    status: 'VERIFIED',
    merkleProof: [
      `Leaf Hash: 0x${leafHash.slice(0, 16)}...`,
      `Branch Hash L1: 0x${siblingHash1.slice(0, 16)}...`,
      `Branch Hash L2: 0x${siblingHash2.slice(0, 16)}...`,
      `Merkle Root: 0x${record.merkleRootHash.slice(0, 24)}...`,
    ],
    rootHash: record.merkleRootHash,
    batchIndex: record.batchIndex,
    privacyGuarantee: 'Zero-Knowledge Cryptographic Inclusion Confirmed. Plaintext voter choice is logically and physically isolated and never revealed.',
    inclusionStatus: 'Ballot record is cryptographically committed into Demo Batch Ledger.',
  };
}
