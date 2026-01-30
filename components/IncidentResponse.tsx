
import React from 'react';
import { 
  AlertTriangle, 
  ShieldX, 
  Search, 
  Filter, 
  MoreVertical,
  ChevronRight,
  ShieldCheck,
  Zap,
  Clock
} from 'lucide-react';
import { Incident } from '../types';

const mockIncidents: Incident[] = [
  {
    id: 'INC-2024-001',
    type: 'QUANTUM_ATTEMPT',
    severity: 'CRITICAL',
    timestamp: '2024-10-24 14:22:10',
    description: 'Detected high-entropy decryption attempt bypassing standard RSA protocols.',
    status: 'INVESTIGATING',
  },
  {
    id: 'INC-2024-002',
    type: 'MITM',
    severity: 'HIGH',
    timestamp: '2024-10-24 13:45:00',
    description: 'Man-in-the-Middle anomaly detected on Singapore node. Redirecting to backup tunnel.',
    status: 'MITIGATED',
  },
  {
    id: 'INC-2024-003',
    type: 'MALWARE',
    severity: 'MEDIUM',
    timestamp: '2024-10-24 12:10:55',
    description: 'Unrecognized file hash identified in central storage. Quarantined for analysis.',
    status: 'NEW',
  },
  {
    id: 'INC-2024-004',
    type: 'PHISHING',
    severity: 'LOW',
    timestamp: '2024-10-24 09:30:12',
    description: 'Mass spam email block from suspected botnet origins.',
    status: 'MITIGATED',
  },
];

const IncidentResponse: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Threat & Incident Management</h1>
          <p className="text-slate-400">Real-time monitoring and proactive mitigation</p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-slate-900 border border-slate-800 rounded-xl text-sm font-medium hover:bg-slate-800 transition-colors flex items-center gap-2">
            <Filter size={16} /> Filters
          </button>
          <button className="px-4 py-2 bg-red-500 hover:bg-red-400 text-white rounded-xl text-sm font-bold shadow-lg shadow-red-500/20 flex items-center gap-2 transition-all">
            <ShieldX size={16} /> Declare Emergency
          </button>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="glass p-5 rounded-2xl border border-slate-800 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center text-red-500">
            <AlertTriangle size={24} />
          </div>
          <div>
            <p className="text-xs font-mono text-slate-500">OPEN_INCIDENTS</p>
            <h3 className="text-2xl font-bold">12</h3>
          </div>
        </div>
        <div className="glass p-5 rounded-2xl border border-slate-800 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center text-green-500">
            <ShieldCheck size={24} />
          </div>
          <div>
            <p className="text-xs font-mono text-slate-500">SYSTEM_RECOVERY</p>
            <h3 className="text-2xl font-bold">98.2%</h3>
          </div>
        </div>
        <div className="glass p-5 rounded-2xl border border-slate-800 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-500">
            <Clock size={24} />
          </div>
          <div>
            <p className="text-xs font-mono text-slate-500">AVG_MITIGATION_TIME</p>
            <h3 className="text-2xl font-bold">4.2m</h3>
          </div>
        </div>
      </div>

      {/* Incident List */}
      <div className="glass rounded-2xl border border-slate-800 overflow-hidden">
        <div className="p-4 border-b border-slate-800 flex items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
            <input 
              type="text" 
              placeholder="Search incidents, IPs, or threat types..."
              className="w-full bg-slate-900/50 border border-slate-800 rounded-lg py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-cyan-500/50"
            />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-900/50 text-slate-400 text-xs font-mono uppercase tracking-wider">
                <th className="px-6 py-4 font-medium">Incident ID</th>
                <th className="px-6 py-4 font-medium">Threat Type</th>
                <th className="px-6 py-4 font-medium">Severity</th>
                <th className="px-6 py-4 font-medium">Time Detected</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {mockIncidents.map((incident) => (
                <tr key={incident.id} className="hover:bg-slate-800/30 transition-colors group cursor-pointer">
                  <td className="px-6 py-4">
                    <span className="text-sm font-mono text-cyan-400">{incident.id}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {incident.type === 'QUANTUM_ATTEMPT' && <Zap size={14} className="text-purple-400" />}
                      <span className="text-sm font-medium">{incident.type}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`
                      text-[10px] px-2 py-0.5 rounded-full font-bold uppercase
                      ${incident.severity === 'CRITICAL' ? 'bg-red-500/20 text-red-500 border border-red-500/20' : ''}
                      ${incident.severity === 'HIGH' ? 'bg-orange-500/20 text-orange-400 border border-orange-500/20' : ''}
                      ${incident.severity === 'MEDIUM' ? 'bg-yellow-500/20 text-yellow-500 border border-yellow-500/20' : ''}
                      ${incident.severity === 'LOW' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/20' : ''}
                    `}>
                      {incident.severity}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-xs text-slate-500 font-mono">
                    {incident.timestamp}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`
                      flex items-center gap-1.5 text-xs font-medium
                      ${incident.status === 'MITIGATED' ? 'text-green-400' : ''}
                      ${incident.status === 'INVESTIGATING' ? 'text-cyan-400' : ''}
                      ${incident.status === 'NEW' ? 'text-red-400 animate-pulse' : ''}
                    `}>
                      <div className={`w-1.5 h-1.5 rounded-full ${
                        incident.status === 'MITIGATED' ? 'bg-green-400' : 
                        incident.status === 'INVESTIGATING' ? 'bg-cyan-400' : 'bg-red-400'
                      }`} />
                      {incident.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-1.5 hover:bg-slate-700 rounded-lg text-slate-500 hover:text-white transition-all">
                      <ChevronRight size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default IncidentResponse;
