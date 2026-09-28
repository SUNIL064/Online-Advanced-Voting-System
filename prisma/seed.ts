/**
 * Database Seed Script for Voting Beyond Borders Demo
 */

import { DEMO_ELECTION, INITIAL_AUDIT_LOGS, INITIAL_SECURITY_EVENTS } from '../src/data/electionData';

export async function seedDemoData() {
  console.log('Seeding demo election data for Voting Beyond Borders...');
  console.log('Created election:', DEMO_ELECTION.title);
  console.log('Candidates seeded:', DEMO_ELECTION.candidates.length);
  console.log('Audit events preloaded:', INITIAL_AUDIT_LOGS.length);
  console.log('Security events preloaded:', INITIAL_SECURITY_EVENTS.length);
  console.log('Demo seed completed successfully!');
}

seedDemoData();
