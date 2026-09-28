# 🇮🇳 Voting Beyond Borders (VBB)
> **“Secure Digital Voting, Beyond Borders.”**  
> *A Next-Generation NRI Remote Voting Platform & Cryptographic Verifiability Prototype for Hackathon Presentation.*

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Status: Hackathon Prototype](https://img.shields.io/badge/Status-Hackathon%20Prototype-amber.svg)]()
[![Cryptography: AES--256--GCM%20%2B%20SHA--256](https://img.shields.io/badge/Cryptography-AES--256--GCM%20%2B%20SHA--256-emerald.svg)]()
[![Accessibility: WCAG%202.1%20AA](https://img.shields.io/badge/Accessibility-WCAG%202.1%20AA-purple.svg)]()

---

## ⚠️ Important Hackathon Demonstration Disclaimer
**Voting Beyond Borders** is an engineering and product prototype developed strictly for educational, research, and hackathon presentation purposes.
- It is **NOT** an official election portal of the Election Commission of India (ECI).
- It does **NOT** collect real Aadhaar, passport, or biometric credentials.
- All elections, candidate rosters, political parties, voter profiles, and cryptographic receipts are **purely fictional demonstrations**.
- No votes cast on this platform are legally binding.

---

## 🌟 Executive Summary & Problem Vision

Over **35 million Indian citizens and people of Indian origin reside abroad**, contributing over $120+ billion in annual remittances and building cultural diplomacy. Under the *Representation of the People Act, 1951 (Section 20A)*, overseas electors must physically travel to their registered constituency in India to cast their ballot.

**Voting Beyond Borders** is an end-to-end verifiable civic-tech platform that solves the foundational digital voting trilemma:
1. **Zero-Knowledge Identity Verification:** Proves overseas eligibility without linking citizen PII to ballot choices.
2. **Client-Side Cryptographic Ballot Sealing:** Native browser Web Crypto AES-256-GCM encryption ensures plaintext votes never traverse the network.
3. **End-to-End Individual & Universal Verifiability:** Voters receive Merkle tree inclusion receipts (e.g. `VBR-XXXX-XXXX-XXXX`) allowing them to independently audit that their ballot is committed to the public ledger without revealing who they voted for.

---

## 🏛️ System Architecture Topology

```
[ NRI Voter Device (Browser Sandbox) ]
                │
                ▼  (1. Simulated Passport + OTP MFA)
[ Zero-Knowledge Auth Gateway ] ──► Emits Blinded Ephemeral Voter Token
                │
                ▼  (2. Local Client AES-256-GCM Encryption via WebCrypto)
[ Encrypted Ciphertext Payload + SHA-256 Digest ]
                │
                ▼  (3. TLS 1.3 Blinded Ingestion Endpoint)
[ Distributed Ingest Node Cluster (Global Anycast) ]
                │
                ▼  (4. Append-Only Batch Commit)
[ Append-Only Merkle Tree Ledger (PostgreSQL WAL) ]
                │
        ┌───────┴────────────────────────┐
        ▼                                ▼
[ Public Bulletin Board ]    [ Threshold Mixnet & Tally ]
(Audit Receipts & Root Hashes) (k-of-n Secret Sharing Trustees)
```

---

## 🚀 Key Features

### 1. 🗳️ 5-Step Interactive Demo Election Flow (`/demo-election`)
- **Step 1 — Identity Authentication:** Mock passport and instant 6-digit OTP (`123456`) with pre-fill helpers.
- **Step 2 — Eligibility Verification:** Zero-knowledge decoupling separating voter identity from voting permits.
- **Step 3 — Clean Digital Ballot:** Fictional candidates, party manifestos, and pre-encryption review modal.
- **Step 4 — Cinematic Encryption Animation:** Real-time multi-stage visual pipeline showing Plaintext → AES-256 → SHA-256 → Merkle Batch.
- **Step 5 — Confirmation & Demo Receipt:** Issues cryptographic receipt code (`VBR-XXXX-XXXX-XXXX`) and transaction hash.

### 2. 🔍 Independent Receipt Verifier (`/verify`)
- Live 4-phase cryptographic audit pipeline checking Merkle branch paths and root commitments.
- Confirms **"Ballot Inclusion Verified — Choice Remains 100% Secret"**.

### 3. 🛡️ Security Center & Threat Model Matrix (`/security`)
- Defense-in-depth analysis across malware, volumetric DDoS, server tampering, and replay attacks.
- Real-time simulated threat sensor and edge mitigation monitor.

### 4. 📊 Audit Transparency Dashboard (`/audit`)
- Real-time telemetry, Recharts hourly ingestion area charts, regional participation distribution, and downloadable CSV audit ledger.

### 5. 🌍 Global Diaspora Map (`/diaspora`)
- Interactive regional hubs (North America, Middle East, Europe, Asia Pacific) with consular jurisdiction telemetry.

### 6. 🌐 Multilingual System (6 Indian Languages)
- Full localized translations in **English, Hindi (हिन्दी), Telugu (తెలుగు), Tamil (தமிழ்), Bengali (বাংলা), and Marathi (मराठी)**.

### 7. ♿ WCAG 2.1 AA Accessibility Control Center
- Dynamic font size scaling (Normal / Large / Extra Large), High-Contrast Mode (WCAG AAA), Dyslexia-friendly typography, and Reduced Motion.

### 8. 📶 Low-Bandwidth & Offline Mode
- Instant lightweight rendering toggle optimizing payload sizes for remote areas or weak 2G/3G connections.

### 9. 🏆 3-Minute Hackathon Judge Guided Tour
- One-click **"Launch Guided Demo"** walkthrough with explanatory prompts, "Why it matters", and security invariants.

---

## 🛠️ Technology Stack

| Layer | Technologies |
|---|---|
| **Frontend** | React 18, TypeScript, Vite, Tailwind CSS, Framer Motion, Lucide React, Recharts |
| **Cryptography** | Browser Web Crypto API (`SubtleCrypto`), SHA-256, AES-256-GCM, Merkle Proofs |
| **Backend** | Node.js, Express, TypeScript |
| **Database** | PostgreSQL, Prisma ORM |
| **Styling** | Midnight Blue / Deep Navy, Electric Blue, Saffron Warm Gold, Glassmorphism |

---

## 💻 Getting Started (Local Development)

### Prerequisites
- Node.js (v18.0.0 or higher)
- npm or yarn

### 1. Installation
```bash
# Clone the repository
git clone https://github.com/your-username/voting-beyond-borders.git

# Navigate into project directory
cd voting-beyond-borders

# Install dependencies
npm install
```

### 2. Running Frontend Dev Server
```bash
npm run dev
```
The application will be live at `http://localhost:5173`.

### 3. Production Build
```bash
npm run build
npm run preview
```

### 4. Running Backend REST API Server (Optional)
```bash
npm run server
```
The backend REST API will be running on `http://localhost:4000`.

---

## 🧭 Hackathon Demo Walkthrough (For Judges)

1. Open `http://localhost:5173/`.
2. Click **"Judge Mode (3 min)"** or **"Launch Guided Demo"** in the top banner.
3. Follow the guided overlay through:
   - **Landing Page** → View interactive 3D diaspora globe and live telemetry.
   - **Demo Auth** → Click "Auto-Fill Demo Info" and "Authenticate Demo Identity".
   - **Eligibility** → Inspect zero-knowledge separation and blinded voter permit.
   - **Ballot** → Select a fictional candidate and click "Review Selection & Encrypt".
   - **Cinematic Encryption** → Watch client-side AES-256-GCM and SHA-256 hashing.
   - **Receipt** → Copy the generated `VBR-XXXX-XXXX-XXXX` code.
   - **Verification** → Click "Verify My Receipt Now" to view cryptographic Merkle inclusion proofs.
   - **Audit Dashboard** → Review live telemetry and export the tamper-evident CSV audit ledger.

---

## 📄 License
This project is open source under the [MIT License](LICENSE).
