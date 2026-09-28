import React, { useState } from 'react';
import {
  Layers,
  Cpu,
  Server,
  Lock,
  ShieldCheck,
  Key,
  Globe2,
  FileCheck,
  CheckCircle2,
  ArrowRight,
  Database,
  Terminal,
} from 'lucide-react';

interface ArchNode {
  id: string;
  stepNumber: string;
  name: string;
  layer: string;
  icon: any;
  techStack: string[];
  description: string;
  securityGuarantee: string;
  protocols: string[];
}

export const ArchitecturePage: React.FC = () => {
  const [selectedNodeId, setSelectedNodeId] = useState<string>('node-1');

  const nodes: ArchNode[] = [
    {
      id: 'node-1',
      stepNumber: '01',
      name: 'Client Voter Device',
      layer: 'Edge Client Tier',
      icon: Cpu,
      techStack: ['React', 'TypeScript', 'Web Crypto API', 'SubtleCrypto', 'PWA Offline Cache'],
      description: 'The voter interacts via a sandboxed progressive web client. Ballot choices are captured locally and encrypted with AES-256-GCM before any network transmission occurs.',
      securityGuarantee: 'Plaintext candidate choices exist only in ephemeral browser memory and are destroyed immediately upon encryption.',
      protocols: ['AES-256-GCM', 'SHA-256', 'ServiceWorker API'],
    },
    {
      id: 'node-2',
      stepNumber: '02',
      name: 'Edge WAF & DDoS Shield',
      layer: 'Global Traffic Perimeter',
      icon: Globe2,
      techStack: ['Anycast CDN', 'Cloud Armor WAF', 'Rate Limiter', 'mTLS Termination'],
      description: 'Filters malicious robotic traffic, volumetric UDP/SYN bursts, and geographic anomalies across globally distributed points of presence.',
      securityGuarantee: 'Guarantees 99.99% voting system uptime and mitigates denial-of-service disruptions during high-concurrency election hours.',
      protocols: ['TLS 1.3', 'HTTP/3 (QUIC)', 'IP Rate Limiting'],
    },
    {
      id: 'node-3',
      stepNumber: '03',
      name: 'Zero-Knowledge Auth Gateway',
      layer: 'Identity Decoupling Layer',
      icon: Key,
      techStack: ['Node.js', 'Express', 'JWT Blind Signature', 'Passkey WebAuthn'],
      description: 'Authenticates overseas passport credentials and MFA tokens. Emits an anonymous, blinded cryptographic nullifier token without recording ballot intent.',
      securityGuarantee: 'Mathematical separation between who authenticated and the ballot ciphertext payload.',
      protocols: ['Zero-Knowledge Blind Signatures', 'RFC 9162 Transcripts'],
    },
    {
      id: 'node-4',
      stepNumber: '04',
      name: 'Blinded Ingest Node',
      layer: 'Anonymous Ingestion Layer',
      icon: Server,
      techStack: ['Node.js API', 'Express Router', 'TLS 1.3 Blind Endpoint'],
      description: 'Accepts encrypted ballot blobs accompanied only by blinded authorization tokens. Rejects duplicate nullifiers and passes payload to queue.',
      securityGuarantee: 'The ingest server has zero knowledge of voter identity and zero knowledge of plaintext votes.',
      protocols: ['REST API', 'JSON Schema Validation'],
    },
    {
      id: 'node-5',
      stepNumber: '05',
      name: 'Append-Only Merkle Ledger',
      layer: 'Immutable Storage Tier',
      icon: Database,
      techStack: ['PostgreSQL', 'Prisma ORM', 'Merkle Tree Engine', 'SHA-256 Batch Hashes'],
      description: 'Persists encrypted payloads into cryptographically linked batches. Publishes deterministic Merkle root hashes for public receipt verification.',
      securityGuarantee: 'Any retroactive tampering with previous ballot records alters downstream Merkle roots, alerting public auditors immediately.',
      protocols: ['Merkle Tree Inclusion Proofs', 'PostgreSQL WAL'],
    },
    {
      id: 'node-6',
      stepNumber: '06',
      name: 'Threshold Trustee Mixnet & Tally',
      layer: 'Homomorphic Tallying Tier',
      icon: Lock,
      techStack: ['Multi-Party Computation (MPC)', 'Shamir Secret Sharing (k-of-n)', 'ElGamal Homomorphic Crypto'],
      description: 'At the close of the election window, independent election trustees combine their cryptographic key shards to jointly tally encrypted votes without decrypting individual voter records.',
      securityGuarantee: 'No single administrator or government body possesses the master decryption key.',
      protocols: ['k-of-n Threshold Cryptography', 'Verifiable Shuffle Proofs'],
    },
    {
      id: 'node-7',
      stepNumber: '07',
      name: 'Public Bulletin Board',
      layer: 'Universal Verifiability Tier',
      icon: FileCheck,
      techStack: ['Public Audit API', 'Open Data Export', 'Client-Side Merkle Verifier'],
      description: 'Provides open cryptographic proofs enabling voters, international observers, and civic tech researchers to mathematically verify election integrity.',
      securityGuarantee: 'Universal verifiability: everyone can verify the election math is 100% correct.',
      protocols: ['Open REST / JSON Ledger API', 'CSV / JSON Export'],
    },
  ];

  const activeNode = nodes.find(n => n.id === selectedNodeId) || nodes[0];
  const IconComp = activeNode.icon;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header */}
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-electric-500/10 border border-electric-500/30 text-electric-300 text-xs font-semibold shadow-glow-sm">
          <Layers className="w-4 h-4 text-electric-400" />
          <span>Complete System Blueprint</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white">
          System Topology & Architecture
        </h1>
        <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
          Interactive node diagram illustrating how data moves securely from overseas voter hardware through zero-knowledge authentication, blinded ingestion, and Merkle tree ledger verification.
        </p>
      </div>

      {/* Interactive Topology Graph */}
      <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-electric-500/30 space-y-8">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <span className="text-xs font-bold text-slate-200 uppercase tracking-wider">
            Interactive Architecture Flow (Click any node to inspect)
          </span>
          <span className="text-xs text-electric-400 font-mono">
            7 Tiers • Defense-in-Depth
          </span>
        </div>

        {/* Nodes Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {nodes.map(node => {
            const NodeIcon = node.icon;
            const isSelected = selectedNodeId === node.id;
            return (
              <div
                key={node.id}
                onClick={() => setSelectedNodeId(node.id)}
                className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                  isSelected
                    ? 'bg-navy-800/90 border-electric-400 shadow-glow-sm ring-1 ring-electric-500/40 scale-[1.02]'
                    : 'bg-navy-950/60 border-slate-800 hover:border-slate-700 hover:bg-navy-900/60'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs ${
                    isSelected ? 'bg-electric-500 text-white' : 'bg-navy-800 text-slate-400'
                  }`}>
                    {node.stepNumber}
                  </div>
                  <span className="text-[10px] text-slate-500 font-mono uppercase">{node.layer}</span>
                </div>
                <h4 className="text-sm font-bold text-slate-100 flex items-center gap-1.5 mb-1">
                  <NodeIcon className="w-3.5 h-3.5 text-electric-400" />
                  {node.name}
                </h4>
                <p className="text-[11px] text-slate-400 line-clamp-2">
                  {node.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Selected Node Detailed Specification Panel */}
        <div className="p-6 sm:p-8 rounded-2xl bg-navy-950 border border-electric-500/30 space-y-5 animate-in fade-in">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-electric-500/20 text-electric-400 border border-electric-500/30 flex items-center justify-center shadow-glow-sm">
                <IconComp className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-mono text-electric-400 uppercase">
                  Tier {activeNode.stepNumber} • {activeNode.layer}
                </span>
                <h3 className="text-xl font-bold text-white">{activeNode.name}</h3>
              </div>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {activeNode.techStack.map((tech, tIdx) => (
                <span
                  key={tIdx}
                  className="text-[11px] px-2.5 py-1 rounded-lg bg-navy-900 border border-slate-700 text-slate-300 font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 text-xs">
            <div className="lg:col-span-6 space-y-2">
              <strong className="text-slate-300 block text-xs">Functional Description:</strong>
              <p className="text-slate-400 leading-relaxed text-xs">
                {activeNode.description}
              </p>
            </div>

            <div className="lg:col-span-6 space-y-3">
              <div className="p-3.5 rounded-xl bg-navy-900 border border-emerald-500/30">
                <strong className="text-emerald-400 block text-xs mb-1">
                  Cryptographic & Security Invariant:
                </strong>
                <p className="text-slate-300 text-[11px] leading-relaxed">
                  {activeNode.securityGuarantee}
                </p>
              </div>

              <div className="flex items-center gap-2 text-slate-400">
                <span className="font-semibold text-slate-300">Active Protocols:</span>
                <div className="flex flex-wrap gap-1 font-mono text-[10px]">
                  {activeNode.protocols.map((p, pIdx) => (
                    <span key={pIdx} className="px-2 py-0.5 rounded bg-navy-850 text-electric-300 border border-slate-800">
                      {p}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
