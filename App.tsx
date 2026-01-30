
import React, { useState } from 'react';
import { 
  Shield, 
  Lock, 
  Activity, 
  Cpu, 
  MessageSquareCode, 
  Menu, 
  Zap,
  Globe,
  BarChart3,
  Network,
  Settings2,
  TrendingUp,
  ShieldCheck,
  ZapOff
} from 'lucide-react';
import { AppView } from './types';
import Dashboard from './components/Dashboard';
import EncryptionTool from './components/EncryptionTool';
import IncidentResponse from './components/IncidentResponse';
import QuantumExplain from './components/QuantumExplain';
import AISecurityAudit from './components/AISecurityAudit';
import QuantumSimulator from './components/QuantumSimulator';
import AutomationCenter from './components/AutomationCenter';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>(AppView.DASHBOARD);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [sharedQuantumKey, setSharedQuantumKey] = useState('');
  const [lastSimulationData, setLastSimulationData] = useState<{
    qber: number;
    depolarization: number;
    damping: number;
    timestamp: string;
    qubitCount: number;
  } | null>(null);

  const navigation = [
    { id: AppView.DASHBOARD, label: 'แดชบอร์ด', icon: BarChart3 },
    { id: AppView.QUANTUM_SIMULATOR, label: 'QKD Simulator', icon: Network },
    { id: AppView.AUTOMATION, label: 'ระบบอัตโนมัติ', icon: Settings2 },
    { id: AppView.ENCRYPTION, label: 'เครื่องมือเข้ารหัส', icon: Lock },
    { id: AppView.INCIDENT_RESPONSE, label: 'ตอบสนองเหตุการณ์', icon: Activity },
    { id: AppView.QUANTUM_INFO, label: 'ความรู้ควอนตัม', icon: Cpu },
    { id: AppView.AI_SECURITY, label: 'AI ตรวจสอบความปลอดภัย', icon: MessageSquareCode },
  ];

  return (
    <div className="min-h-screen flex flex-col md:flex-row relative">
      {/* Mobile Menu Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/60 z-40 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar Navigation */}
      <aside className={`
        fixed md:sticky top-0 left-0 h-screen w-72 glass z-50 transition-transform duration-300
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        <div className="p-6 flex flex-col h-full">
          <div className="flex items-center gap-3 mb-12">
            <div className="w-10 h-10 bg-cyan-500/20 flex items-center justify-center rounded-xl border border-cyan-500/30">
              <Shield className="text-cyan-400 w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-white">QUANTUM APP</h1>
              <p className="text-[10px] text-cyan-400 uppercase tracking-[0.2em]">Symmetrical Octo Barnacle</p>
            </div>
          </div>

          <nav className="flex-1 space-y-2 overflow-y-auto">
            {navigation.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setCurrentView(item.id);
                  setIsSidebarOpen(false);
                }}
                className={`
                  w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200
                  ${currentView === item.id 
                    ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20' 
                    : 'text-slate-400 hover:bg-slate-800/50 hover:text-white'}
                `}
              >
                <item.icon size={20} />
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
          </nav>

          <div className="mt-auto pt-6 border-t border-slate-800">
            <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-800">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-xs text-slate-300 font-medium">System Secure</span>
              </div>
              <p className="text-[10px] text-slate-500 leading-relaxed uppercase">
                AES-256 Quantum Resistant Protocol Active
              </p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 bg-[#020617] pb-24">
        {/* Top Header */}
        <header className="h-16 flex items-center justify-between px-6 border-b border-slate-800 sticky top-0 bg-[#020617]/80 backdrop-blur-md z-30">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="md:hidden text-slate-400 hover:text-white"
            >
              <Menu size={24} />
            </button>
            <h2 className="text-lg font-semibold text-white">
              {navigation.find(n => n.id === currentView)?.label}
            </h2>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 text-xs text-slate-400 font-mono bg-slate-900 px-3 py-1.5 rounded-full border border-slate-800">
              <Globe size={14} className="text-cyan-400" />
              <span>GLOBAL_NODE_07</span>
            </div>
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-600 border border-white/10" />
          </div>
        </header>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8">
          {currentView === AppView.DASHBOARD && <Dashboard onNavigate={setCurrentView} />}
          {currentView === AppView.QUANTUM_SIMULATOR && (
            <QuantumSimulator 
              onKeyGenerated={(key) => {
                setSharedQuantumKey(key);
                setCurrentView(AppView.ENCRYPTION);
              }} 
              onSimulationComplete={(data) => {
                setLastSimulationData(data);
              }}
            />
          )}
          {currentView === AppView.AUTOMATION && <AutomationCenter />}
          {currentView === AppView.ENCRYPTION && <EncryptionTool initialKey={sharedQuantumKey} />}
          {currentView === AppView.INCIDENT_RESPONSE && <IncidentResponse />}
          {currentView === AppView.QUANTUM_INFO && <QuantumExplain />}
          {currentView === AppView.AI_SECURITY && <AISecurityAudit lastSimulationData={lastSimulationData} />}
        </div>
      </main>

      {/* Global System Measurement HUD - Persistent Overlay */}
      <div className="fixed bottom-0 left-0 md:left-72 right-0 h-16 glass-heavy border-t border-slate-800 bg-slate-950/90 z-40 flex items-center px-6 backdrop-blur-2xl">
        <div className="flex-1 flex items-center gap-8 overflow-hidden">
          <div className="flex items-center gap-3 shrink-0">
            <div className={`p-2 rounded-lg ${lastSimulationData ? 'bg-cyan-500/10 text-cyan-400' : 'bg-slate-800 text-slate-600'}`}>
              {lastSimulationData ? <Activity size={18} /> : <ZapOff size={18} />}
            </div>
            <div className="hidden sm:block">
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Global Result</p>
              <h4 className="text-xs font-black text-white">{lastSimulationData ? 'SYSTEM_MEASURED' : 'WAITING_TELEMETRY'}</h4>
            </div>
          </div>

          <div className="h-8 w-px bg-slate-800" />

          <div className="flex items-center gap-12 overflow-x-auto no-scrollbar py-2">
            <div className="flex flex-col">
              <span className="text-[9px] text-slate-500 uppercase font-mono">QBER Level</span>
              <span className={`text-sm font-black font-mono ${!lastSimulationData ? 'text-slate-700' : lastSimulationData.qber > 11 ? 'text-red-500' : 'text-cyan-400'}`}>
                {lastSimulationData ? `${lastSimulationData.qber.toFixed(2)}%` : '---'}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-[9px] text-slate-500 uppercase font-mono">Noise Floor</span>
              <span className="text-sm font-black font-mono text-blue-400">
                {lastSimulationData ? `${((lastSimulationData.depolarization + lastSimulationData.damping) * 100).toFixed(1)}%` : '---'}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-[9px] text-slate-500 uppercase font-mono">System Integrity</span>
              <span className={`text-sm font-black font-mono ${!lastSimulationData ? 'text-slate-700' : lastSimulationData.qber < 5 ? 'text-green-400' : 'text-yellow-500'}`}>
                {lastSimulationData ? `${(100 - lastSimulationData.qber).toFixed(1)}%` : '---'}
              </span>
            </div>
            <div className="hidden lg:flex flex-col">
              <span className="text-[9px] text-slate-500 uppercase font-mono">Last Update</span>
              <span className="text-sm font-black font-mono text-slate-400">
                {lastSimulationData ? new Date(lastSimulationData.timestamp).toLocaleTimeString() : 'N/A'}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4 shrink-0">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-green-500/10 border border-green-500/20 rounded-full">
            <ShieldCheck size={14} className="text-green-400" />
            <span className="text-[10px] font-bold text-green-400 uppercase tracking-widest">Secure Core</span>
          </div>
        </div>
      </div>

      <style>{`
        .glass-heavy {
          background: rgba(2, 6, 23, 0.9);
          backdrop-filter: blur(20px);
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default App;
