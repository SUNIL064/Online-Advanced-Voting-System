import React from 'react';
import {
  FileText,
  AlertTriangle,
  Scale,
  ShieldCheck,
  BookOpen,
  CheckCircle2,
  ExternalLink,
} from 'lucide-react';

export const LegalPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-saffron-500/10 border border-saffron-500/30 text-saffron-300 text-xs font-semibold shadow-glow-saffron/20">
          <Scale className="w-4 h-4 text-saffron-400" />
          <span>Statutory Framework & Research Disclaimer</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white">
          Legal Status & Ethical Scope
        </h1>
        <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
          Voting Beyond Borders is a research and technical demonstration. It does not conduct legally binding elections.
        </p>
      </div>

      {/* Prominent Current Legal Status Alert */}
      <div className="p-6 rounded-3xl bg-navy-900 border-2 border-saffron-500/40 space-y-3 shadow-2xl">
        <div className="flex items-center gap-2.5 text-saffron-400">
          <AlertTriangle className="w-6 h-6 shrink-0" />
          <h2 className="text-lg font-bold text-white">Current Legal Status</h2>
        </div>
        <p className="text-sm text-slate-200 leading-relaxed font-medium">
          Remote electronic voting for ordinary overseas Indian citizens is <strong>not currently authorized or available</strong> through this prototype or under current statutory law.
        </p>
        <p className="text-xs text-slate-400 leading-relaxed">
          This project demonstrates an end-to-end verifiable cryptographic architecture that could be evaluated by lawmakers, cybersecurity researchers, and election authorities if an appropriate legal and regulatory framework were established in the future.
        </p>
      </div>

      {/* Structured Legal Sections */}
      <div className="space-y-6 text-xs text-slate-300">
        {/* Section 1: Statutory Framework */}
        <div className="glass-panel rounded-2xl p-6 border border-slate-800 space-y-3">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-electric-400" />
            1. Current Statutory Framework
          </h3>
          <p className="leading-relaxed">
            Under Section 20A of the <em>Representation of the People Act, 1951</em> (inserted via the 2010 amendment), non-resident Indian citizens (NRIs) who have not acquired citizenship of any other country are eligible to be enrolled in the electoral roll of their home constituency.
          </p>
          <p className="leading-relaxed">
            However, under current Conduct of Elections Rules, 1961, overseas electors must physically present themselves at their designated polling station in India, with their original Indian passport, to cast their vote.
          </p>
        </div>

        {/* Section 2: Historical Context & ETPBS */}
        <div className="glass-panel rounded-2xl p-6 border border-slate-800 space-y-3">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <FileText className="w-4 h-4 text-emerald-400" />
            2. Policy Evolution & ETPBS Context
          </h3>
          <p className="leading-relaxed">
            The Election Commission of India has successfully implemented the Electronically Transmitted Postal Ballot System (ETPBS) for eligible service voters (e.g., Armed Forces personnel stationed remotely).
          </p>
          <p className="leading-relaxed">
            Proposals to extend ETPBS or digital proxy voting mechanisms to overseas citizens have been explored and debated in Parliament, highlighting the necessity for robust cryptographic verifiability, ballot secrecy, and threat mitigation against coercion.
          </p>
        </div>

        {/* Section 3: Future Regulatory Roadmap */}
        <div className="glass-panel rounded-2xl p-6 border border-slate-800 space-y-3">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-saffron-400" />
            3. Future Regulatory & Technological Pre-requisites
          </h3>
          <p className="leading-relaxed">
            Before any real-world remote voting platform could be deployed, the following milestones would be required:
          </p>
          <ul className="space-y-2 list-disc list-inside text-slate-400">
            <li>Enactment of parliamentary amendments authorizing remote digital voting methods.</li>
            <li>Formal standardization and certification by national cybersecurity agencies (e.g., CERT-In / STQC).</li>
            <li>Multi-party threshold key management ceremonies involving independent judicial and civic trustees.</li>
            <li>Universal accessibility and multilingual verification tools accessible across all diaspora jurisdictions.</li>
          </ul>
        </div>

        {/* Section 4: Ethical & Civic Principles */}
        <div className="glass-panel rounded-2xl p-6 border border-slate-800 space-y-3">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Scale className="w-4 h-4 text-purple-400" />
            4. Ethical Principles & Neutrality
          </h3>
          <p className="leading-relaxed">
            Voting Beyond Borders is politically neutral and does not endorse or promote any political party, candidate, or legislative agenda. It is an engineering exploration of cybersecurity, cryptography, and human-computer interaction in digital democracy.
          </p>
        </div>
      </div>
    </div>
  );
};
