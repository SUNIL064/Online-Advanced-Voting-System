/**
 * Voting Beyond Borders — Backend REST API Server (Node.js & Express)
 * Provides clean endpoints for authentication, ballot ingestion, receipt verification, and public audit telemetry.
 */

import express, { Request, Response } from 'express';
import { DEMO_ELECTION, INITIAL_AUDIT_LOGS, INITIAL_SECURITY_EVENTS } from '../src/data/electionData';

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());

// In-Memory Storage for Demo Data
const storedBallots: any[] = [];
const storedReceipts: any[] = [
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
];
const storedAuditLogs: any[] = [...INITIAL_AUDIT_LOGS];

// Health Check
app.get('/api/health', (req: Request, res: Response) => {
  res.json({
    status: 'OPERATIONAL',
    system: 'Voting Beyond Borders Demo Backend',
    timestamp: new Date().toISOString(),
    consensusLagMs: 0,
    disclaimer: 'Hackathon Prototype Demonstration Only',
  });
});

// GET /api/election
app.get('/api/election', (req: Request, res: Response) => {
  res.json({
    success: true,
    election: DEMO_ELECTION,
  });
});

// GET /api/election/:id/ballot
app.get('/api/election/:id/ballot', (req: Request, res: Response) => {
  res.json({
    success: true,
    candidates: DEMO_ELECTION.candidates,
  });
});

// POST /api/auth/demo
app.post('/api/auth/demo', (req: Request, res: Response) => {
  const { passportNumber, country } = req.body;
  res.json({
    success: true,
    message: 'Simulated OTP dispatched to registered contact',
    demoOtp: '123456',
    voterProfile: {
      name: 'Demo Overseas Citizen',
      maskedVoterId: 'IN••••••72',
      country: country || 'United Arab Emirates',
      isEligible: true,
    },
  });
});

// POST /api/auth/verify-otp
app.post('/api/auth/verify-otp', (req: Request, res: Response) => {
  const { otp, passportNumber } = req.body;
  if (otp === '123456' || otp?.length === 6) {
    const blindedToken = `ZK-TOKEN-${Math.random().toString(36).slice(2, 12).toUpperCase()}`;
    return res.json({
      success: true,
      verified: true,
      blindedToken,
      message: 'Zero-Knowledge blinded authorization token issued',
    });
  }
  return res.status(400).json({ success: false, error: 'Invalid OTP code' });
});

// POST /api/ballot/submit
app.post('/api/ballot/submit', (req: Request, res: Response) => {
  const { ballotPayload, receipt } = req.body;
  if (!ballotPayload || !receipt) {
    return res.status(400).json({ success: false, error: 'Missing ballot payload or receipt' });
  }

  storedBallots.push(ballotPayload);
  storedReceipts.push(receipt);

  storedAuditLogs.unshift({
    id: `aud-${Date.now()}`,
    timestamp: new Date().toLocaleTimeString('en-US', { hour12: false }) + ' UTC',
    event: 'Encrypted Ballot Ingested',
    hash: ballotPayload.sha256Hash || '0x' + Math.random().toString(16).slice(2, 18),
    status: 'ENCRYPTED',
    category: 'BALLOT',
    details: `Ballot payload received and committed to batch #${receipt.batchIndex}.`,
  });

  res.json({
    success: true,
    message: 'Encrypted ballot committed to ledger batch',
    receiptCode: receipt.receiptCode,
    transactionId: receipt.transactionId,
  });
});

// GET /api/receipt/:code/verify
app.get('/api/receipt/:code/verify', (req: Request, res: Response) => {
  const code = String(req.params.code || '').toUpperCase();
  const found = storedReceipts.find(r => String(r.receiptCode).toUpperCase() === code);

  if (!found) {
    return res.status(404).json({
      success: false,
      isValid: false,
      receiptCode: code,
      error: 'Receipt not found in current batch ledger',
    });
  }

  res.json({
    success: true,
    isValid: true,
    receiptCode: found.receiptCode,
    transactionId: found.transactionId,
    timestamp: found.timestamp,
    merkleRoot: found.merkleRootHash,
    batchIndex: found.batchIndex,
    privacyGuarantee: 'Zero-knowledge cryptographic inclusion confirmed. Choice remains secret.',
  });
});

// GET /api/audit
app.get('/api/audit', (req: Request, res: Response) => {
  res.json({
    success: true,
    totalBallots: 1284 + storedBallots.length,
    verifiedReceipts: 1271 + storedReceipts.length,
    verificationRate: '99.0%',
    auditLogs: storedAuditLogs,
  });
});

// GET /api/security/events
app.get('/api/security/events', (req: Request, res: Response) => {
  res.json({
    success: true,
    securityEvents: INITIAL_SECURITY_EVENTS,
  });
});

// GET /api/dashboard/stats
app.get('/api/dashboard/stats', (req: Request, res: Response) => {
  res.json({
    success: true,
    stats: {
      diasporaCount: '35M+',
      e2eVerifiability: 'Active',
      encryptionStandard: 'AES-256-GCM',
      privacyRate: '100%',
      activeConsulates: 48,
    },
  });
});

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Voting Beyond Borders API server running on port ${PORT}`);
  });
}

export default app;
