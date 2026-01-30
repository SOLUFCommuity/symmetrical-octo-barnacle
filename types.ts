
export enum AppView {
  DASHBOARD = 'DASHBOARD',
  QUANTUM_SIMULATOR = 'QUANTUM_SIMULATOR',
  ENCRYPTION = 'ENCRYPTION',
  INCIDENT_RESPONSE = 'INCIDENT_RESPONSE',
  QUANTUM_INFO = 'QUANTUM_INFO',
  AI_SECURITY = 'AI_SECURITY',
  AUTOMATION = 'AUTOMATION'
}

export interface Incident {
  id: string;
  type: 'MALWARE' | 'PHISHING' | 'QUANTUM_ATTEMPT' | 'MITM';
  severity: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
  timestamp: string;
  description: string;
  status: 'MITIGATED' | 'INVESTIGATING' | 'NEW';
}

export interface EncryptionState {
  plaintext: string;
  secretKey: string;
  ciphertext: string;
  decryptedText: string;
  isProcessing: boolean;
}
