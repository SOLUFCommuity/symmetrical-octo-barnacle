
import React, { useState, useEffect } from 'react';
import { 
  Cpu, 
  RefreshCw, 
  Zap, 
  Play, 
  RotateCcw, 
  Network, 
  Activity,
  Sparkles,
  ShieldCheck,
  ShieldAlert,
  Settings,
  TrendingUp,
  BarChart3,
  MousePointer2,
  Orbit,
  ArrowRight,
  Fingerprint
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer
} from 'recharts';
import { GoogleGenAI } from '@google/genai';

interface Qubit {
  bit: number;
  basis: number; // 0: Computational (Z), 1: Hadamard (X)
  measured?: number;
  noiseEffect?: 'none' | 'depolarized' | 'damped';
  isError?: boolean;
}

interface HistoryEntry {
  id: number;
  qber: number;
  depolarization: number;
  damping: number;
  timestamp: string;
}

interface QuantumSimulatorProps {
  onKeyGenerated: (key: string) => void;
  onSimulationComplete?: (data: {
    qber: number;
    depolarization: number;
    damping: number;
    timestamp: string;
    qubitCount: number;
  }) => void;
}

const QuantumSimulator: React.FC<QuantumSimulatorProps> = ({ onKeyGenerated, onSimulationComplete }) => {
  const [isSimulating, setIsSimulating] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisReport, setAnalysisReport] = useState<string | null>(null);
  const [logs, setLogs] = useState<string[]>([]);
  const [qubits, setQubits] = useState<Qubit[]>([]);
  const [finalKey, setFinalKey] = useState('');
  const [qberValue, setQberValue] = useState<number | null>(null);
  const [isAutoAudit, setIsAutoAudit] = useState(true);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  
  const [depolarizationRate, setDepolarizationRate] = useState(0.08);
  const [amplitudeDamping, setAmplitudeDamping] = useState(0.04);
  const [showNoiseConfig, setShowNoiseConfig] = useState(false);

  useEffect(() => {
    resetQubits();
  }, []);

  const resetQubits = () => {
    const nBits = 16;
    const initial = Array.from({ length: nBits }, () => ({
      bit: Math.round(Math.random()),
      basis: Math.round(Math.random()),
      noiseEffect: 'none' as const,
      isError: false
    }));
    setQubits(initial);
    setFinalKey('');
    setQberValue(null);
    setAnalysisReport(null);
    addLog("System reset. Qubits initialized in vacuum state.");
  };

  const toggleBasis = (index: number) => {
    if (isSimulating || qubits[index].measured !== undefined) return;
    
    setQubits(prev => {
      const updated = [...prev];
      updated[index] = {
        ...updated[index],
        basis: updated[index].basis === 0 ? 1 : 0
      };
      return updated;
    });
    addLog(`Qubit ${index} basis manually set to ${qubits[index].basis === 0 ? 'X-Hadamard' : 'Z-Computational'}`);
  };

  const addLog = (msg: string) => {
    setLogs(prev => [`[${new Date().toLocaleTimeString()}] ${msg}`, ...prev].slice(0, 10));
  };

  const applyNoiseModels = (qubit: Qubit): Qubit => {
    let currentBit = qubit.bit;
    let effect: Qubit['noiseEffect'] = 'none';
    let isError = false;

    if (currentBit === 1 && Math.random() < amplitudeDamping) {
      currentBit = 0;
      effect = 'damped';
      isError = true;
    }

    if (Math.random() < depolarizationRate) {
      const oldBit = currentBit;
      currentBit = Math.round(Math.random());
      effect = 'depolarized';
      if (oldBit !== currentBit) isError = true;
    }

    return { ...qubit, bit: currentBit, noiseEffect: effect, isError };
  };

  const analyzeWithAI = async (qber: number, depol: number, damp: number) => {
    setIsAnalyzing(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      // Using gemini-flash-lite-latest for high-speed low-latency diagnostics
      const response = await ai.models.generateContent({
        model: 'gemini-flash-lite-latest',
        contents: `วิเคราะห์ข้อมูลความปลอดภัยทางควอนตัม (ผลสรุปด่วน):
        - QBER ปัจจุบัน: ${qber.toFixed(2)}%
        - ระดับ Noise: ${depol} (Depol) / ${damp} (Damp)
        
        สรุปความเสถียรภาพและการดักฟังที่อาจเกิดขึ้นอย่างรวดเร็ว (Low Latency Response mode)`,
        config: {
          temperature: 0.1,
          systemInstruction: "คุณคือระบบวิเคราะห์ความปลอดภัยควอนตัมความเร็วสูง (Low-Latency mode) ตอบสั้น กระชับ เป็นภาษาไทย โดยเน้นความเสี่ยง Man-in-the-Middle (MITM)"
        }
      });
      setAnalysisReport(response.text);
    } catch (error) {
      console.error("Fast Audit Failed:", error);
      setAnalysisReport("ไม่สามารถทำการวิเคราะห์ความเร็วสูงได้ในขณะนี้");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const runSimulation = async () => {
    setIsSimulating(true);
    setFinalKey('');
    setQberValue(null);
    setAnalysisReport(null);
    addLog("Applying selected bases and collapsing wavefunction...");
    
    await new Promise(r => setTimeout(r, 800));
    const noisyQubits = qubits.map(applyNoiseModels);
    
    addLog("Executing projection measurements...");
    await new Promise(r => setTimeout(r, 400));

    const measuredQubits = noisyQubits.map(q => ({ ...q, measured: q.bit }));
    setQubits(measuredQubits);

    const errors = measuredQubits.filter(q => q.isError).length;
    const currentQber = (errors / 16) * 100;
    setQberValue(currentQber);

    const hexKey = Array.from({ length: 32 }, (_, i) => 
      (measuredQubits[i % 16].measured! * 8 + Math.floor(Math.random() * 8)).toString(16)
    ).join('').toUpperCase();

    const timestamp = new Date().toLocaleTimeString();
    const newEntry = {
      id: Date.now(),
      qber: currentQber,
      depolarization: depolarizationRate * 100,
      damping: amplitudeDamping * 100,
      timestamp
    };

    setHistory(prev => [...prev, newEntry].slice(-20));
    setFinalKey(hexKey);
    setIsSimulating(false);

    if (onSimulationComplete) {
      onSimulationComplete({
        qber: currentQber,
        depolarization: depolarizationRate,
        damping: amplitudeDamping,
        timestamp: new Date().toISOString(),
        qubitCount: 16
      });
    }

    if (isAutoAudit) {
      analyzeWithAI(currentQber, depolarizationRate, amplitudeDamping);
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500 pb-20">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* LEFT: Simulation Control & Interactive Qubit Grid */}
        <div className="flex-1 space-y-6">
          <div className="glass p-8 rounded-[2.5rem] border border-slate-800 bg-slate-950/40 relative overflow-hidden shadow-2xl">
            <div className="flex justify-between items-start mb-8">
              <div>
                <h2 className="text-3xl font-black flex items-center gap-3 text-white tracking-tight">
                  <Orbit className="text-cyan-400" /> Quantum State Prep
                </h2>
                <p className="text-slate-500 text-sm mt-1 uppercase font-mono tracking-widest">Interactive Basis Selection Mode</p>
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={() => setShowNoiseConfig(!showNoiseConfig)}
                  className={`p-3 rounded-2xl border transition-all ${showNoiseConfig ? 'bg-cyan-500 text-slate-950 border-cyan-400' : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-cyan-400'}`}
                  title="Configure Noise Parameters"
                >
                  <Settings size={20} />
                </button>
                <button onClick={resetQubits} className="p-3 bg-slate-900 border border-slate-800 rounded-2xl text-slate-400 hover:text-cyan-400 transition-all" title="Reset State">
                  <RotateCcw size={20} />
                </button>
              </div>
            </div>

            <div className="p-5 bg-cyan-500/5 border border-cyan-500/20 rounded-2xl mb-10 flex flex-col gap-3 shadow-inner">
              <div className="flex items-center gap-5">
                <div className="p-3 bg-cyan-500/10 rounded-xl text-cyan-400 shrink-0">
                  <MousePointer2 size={24} className="animate-bounce" />
                </div>
                <p className="text-sm text-slate-300">
                  <span className="font-bold text-cyan-400">Interactive Setup:</span> คลิกที่ Qubits เพื่อสลับ <span className="underline underline-offset-4 decoration-cyan-500/50">Basis</span> ก่อนทำการวัดค่าระบบ
                </p>
              </div>
              <div className="flex flex-wrap gap-x-4 gap-y-1 pl-4 md:pl-20 text-[10px] text-slate-500 font-bold">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-sm bg-cyan-500/40 border border-cyan-500/50" /> Z_BASIS
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-sm bg-purple-500/40 border border-purple-500/50" /> X_BASIS
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-sm bg-yellow-500/40 border border-yellow-500/50 shadow-[0_0_4px_rgba(234,179,8,0.5)]" /> DEPOLARIZED
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-sm bg-blue-500/40 border border-blue-500/50 shadow-[0_0_4px_rgba(59,130,246,0.5)]" /> DAMPED
                </div>
              </div>
            </div>

            {showNoiseConfig && (
              <div className="mb-8 p-6 rounded-3xl bg-slate-900/80 border border-slate-800 animate-in slide-in-from-top-4 duration-300">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <label className="text-xs font-bold text-slate-400 uppercase">Depolarization Noise</label>
                      <span className="text-xs font-mono text-cyan-400">{(depolarizationRate * 100).toFixed(1)}%</span>
                    </div>
                    <input type="range" min="0" max="0.5" step="0.01" value={depolarizationRate} onChange={(e) => setDepolarizationRate(parseFloat(e.target.value))} className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-500" />
                  </div>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <label className="text-xs font-bold text-slate-400 uppercase">Amplitude Damping</label>
                      <span className="text-xs font-mono text-blue-400">{(amplitudeDamping * 100).toFixed(1)}%</span>
                    </div>
                    <input type="range" min="0" max="0.3" step="0.01" value={amplitudeDamping} onChange={(e) => setAmplitudeDamping(parseFloat(e.target.value))} className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500" />
                  </div>
                </div>
              </div>
            )}

            {/* Qubit UI Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-8 mb-12">
              {qubits.map((q, i) => (
                <div 
                  key={i} 
                  onClick={() => toggleBasis(i)}
                  className={`flex flex-col items-center gap-3 group relative cursor-pointer ${isSimulating || q.measured !== undefined ? 'pointer-events-none' : 'hover:scale-110 active:scale-95'} transition-all duration-300`}
                >
                  <div className={`absolute -top-3 left-1/2 -translate-x-1/2 z-20 px-1.5 py-0.5 rounded-full border text-[8px] font-black tracking-tighter transition-all duration-500
                    ${q.basis === 0 ? 'bg-cyan-500/20 text-cyan-400 border-cyan-500/40' : 'bg-purple-500/20 text-purple-400 border-purple-500/40'}
                    ${q.measured !== undefined ? 'opacity-0 scale-50' : 'opacity-100 scale-100'}
                  `}>
                    {q.basis === 0 ? 'Z_BASIS' : 'X_BASIS'}
                  </div>

                  <div className={`
                    w-16 h-16 rounded-full border-2 flex items-center justify-center relative overflow-hidden transition-all duration-300 shadow-xl
                    ${q.measured !== undefined
                      ? q.isError
                        ? 'border-red-500 bg-red-500/10 shadow-red-500/30'
                        : q.measured === 1
                          ? 'border-cyan-400 bg-cyan-500/20 shadow-[0_0_25px_rgba(34,211,238,0.5)]'
                          : 'border-cyan-600 bg-cyan-500/10 shadow-cyan-500/20'
                      : `border-slate-800 ${q.bit === 1 ? 'bg-slate-900/60' : 'bg-slate-950/60'} ${q.basis === 0 ? 'group-hover:shadow-[0_0_20px_rgba(34,211,238,0.5)]' : 'group-hover:shadow-[0_0_20px_rgba(168,85,247,0.5)]'}`
                    }
                  `}>
                    {q.measured !== undefined && q.noiseEffect !== 'none' && (
                      <div className={`absolute inset-0.5 rounded-full animate-pulse
                        ${q.noiseEffect === 'depolarized' ? 'bg-yellow-500/20 shadow-[inset_0_0_10px_rgba(234,179,8,0.7)] border border-yellow-500/50' : ''}
                        ${q.noiseEffect === 'damped' ? 'bg-blue-500/20 shadow-[inset_0_0_10px_rgba(59,130,246,0.7)] border border-blue-500/50' : ''}
                      `} />
                    )}
                    <div className={`
                      absolute w-1 h-12 transition-all duration-500 group-hover:scale-110
                      ${q.basis === 1 
                        ? 'rotate-45 bg-purple-500/80 shadow-[0_0_15px_rgba(168,85,247,0.7)]' 
                        : 'rotate-0 bg-cyan-500/60 shadow-[0_0_15px_rgba(34,211,238,0.5)]'
                      }
                      ${q.measured !== undefined ? 'opacity-0 scale-0' : 'opacity-100 scale-100'}
                    `} />
                    
                    <span className={`
                      relative z-10 font-mono text-3xl font-black transition-all duration-500
                      ${q.measured !== undefined
                        ? (q.isError ? 'text-red-400' : 'text-cyan-300 scale-125')
                        : (q.bit === 1 ? 'text-slate-200' : 'text-slate-600')
                      }
                    `}>
                      {q.measured !== undefined ? q.measured : q.bit}
                    </span>
                    
                    <div className={`absolute inset-0 border-2 rounded-full border-white/10 opacity-0 group-hover:opacity-100 transition-opacity`} />
                  </div>
                  
                  <div className={`text-[9px] font-mono font-bold uppercase tracking-widest transition-colors ${q.basis === 1 ? 'text-purple-400' : 'text-slate-500'}`}>
                    {q.basis === 1 ? 'HADAMARD' : `QB_${i}`}
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={runSimulation}
              disabled={isSimulating}
              className="w-full py-6 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 disabled:opacity-50 text-slate-950 font-black text-xl rounded-3xl flex items-center justify-center gap-3 transition-all shadow-2xl shadow-cyan-500/20 active:scale-95"
            >
              {isSimulating ? <RefreshCw className="animate-spin" /> : <Play size={28} fill="currentColor" />}
              {isSimulating ? "MEASURING SYSTEM..." : "RUN QUANTUM MEASUREMENT"}
            </button>
          </div>

          {/* AI DIAGNOSTICS - LITE CORE FAST RESPONSES */}
          <div className="glass p-8 rounded-[2.5rem] border border-slate-800 bg-black/40 relative shadow-xl">
            <h3 className="text-lg font-bold mb-6 flex items-center gap-3">
              <Sparkles className="text-cyan-400" /> Low-Latency AI Insights 
              <span className="text-[10px] bg-cyan-500 text-slate-950 px-3 py-1 rounded-full uppercase ml-auto font-black shadow-lg shadow-cyan-500/20 flex items-center gap-1">
                <Zap size={10} fill="currentColor" /> Flash Lite v2.5
              </span>
            </h3>
            {isAnalyzing ? (
              <div className="py-8 space-y-4">
                <div className="h-4 bg-slate-800 rounded-full w-3/4 animate-pulse" />
                <div className="h-4 bg-slate-800 rounded-full w-1/2 animate-pulse" />
                <div className="h-4 bg-slate-800 rounded-full w-2/3 animate-pulse" />
              </div>
            ) : analysisReport ? (
              <div className="text-sm text-slate-300 leading-relaxed italic p-6 rounded-2xl bg-cyan-500/5 border border-cyan-500/10 font-sans shadow-inner animate-in fade-in duration-300">
                {analysisReport}
              </div>
            ) : (
              <div className="py-8 flex flex-col items-center opacity-30">
                <ShieldAlert size={48} className="text-slate-600 mb-4" />
                <p className="text-xs font-medium uppercase tracking-[0.2em]">Waiting for telemetry from measurement cycle...</p>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT: Real-time Analytics Visualizer */}
        <div className="w-full lg:w-[450px] space-y-6">
          {/* QBER TREND */}
          <div className="glass p-6 rounded-3xl border border-slate-800 bg-slate-900/40 shadow-xl">
            <div className="flex items-center justify-between mb-6">
              <h4 className="text-sm font-black flex items-center gap-2 text-red-400 uppercase tracking-widest">
                <TrendingUp size={16} /> QBER Trend Line
              </h4>
              <div className="text-[10px] text-slate-500 font-mono tracking-tighter">{(qberValue || 0).toFixed(2)}% OFFSET</div>
            </div>
            <div className="h-48 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={history}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                  <XAxis dataKey="timestamp" hide />
                  <YAxis domain={[0, 100]} stroke="#64748b" fontSize={10} />
                  <Tooltip contentStyle={{ backgroundColor: '#020617', border: '1px solid #1e293b', borderRadius: '12px' }} />
                  <Line type="monotone" dataKey="qber" stroke="#ef4444" strokeWidth={3} dot={{ fill: '#ef4444', r: 4 }} activeDot={{ r: 6, stroke: '#fff' }} animationDuration={600} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* NOISE VISUALIZATION */}
          <div className="glass p-6 rounded-3xl border border-slate-800 bg-slate-900/40 shadow-xl">
            <h4 className="text-sm font-black flex items-center gap-2 text-cyan-400 uppercase tracking-widest mb-6">
              <BarChart3 size={16} /> Noise Profiles
            </h4>
            <div className="h-48 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={history}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                  <XAxis dataKey="timestamp" hide />
                  <YAxis domain={[0, 50]} hide />
                  <Tooltip contentStyle={{ backgroundColor: '#020617', border: '1px solid #1e293b', borderRadius: '12px' }} />
                  <Area type="monotone" dataKey="depolarization" stroke="#22d3ee" fill="#22d3ee" fillOpacity={0.1} stackId="1" animationDuration={800} />
                  <Area type="monotone" dataKey="damping" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.1} stackId="1" animationDuration={1000} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 flex gap-6">
              <div className="flex items-center gap-2 text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.5)]" /> Depolarization
              </div>
              <div className="flex items-center gap-2 text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                <div className="w-2.5 h-2.5 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]" /> Damping
              </div>
            </div>
          </div>

          {/* SIMULATION SUMMARY HUD */}
          <div className="glass p-6 rounded-3xl border border-cyan-500/20 bg-cyan-500/5 shadow-2xl shadow-cyan-500/5">
             <h4 className="font-black text-slate-100 mb-5 flex items-center gap-2 text-sm uppercase tracking-[0.2em]">
               <ShieldCheck size={18} className="text-green-400" /> System Integrity Result
             </h4>
             <div className="grid grid-cols-2 gap-4">
               <div className="p-4 bg-slate-950/60 rounded-2xl border border-slate-800 shadow-inner">
                 <p className="text-[9px] text-slate-500 uppercase font-mono mb-1 font-bold">Health Score</p>
                 <p className={`text-xl font-black ${qberValue === null ? 'text-slate-700' : (100 - qberValue) > 90 ? 'text-green-400' : 'text-yellow-500'}`}>
                   {qberValue === null ? '---' : `${(100 - qberValue).toFixed(1)}%`}
                 </p>
               </div>
               <div className="p-4 bg-slate-950/60 rounded-2xl border border-slate-800 shadow-inner">
                 <p className="text-[9px] text-slate-500 uppercase font-mono mb-1 font-bold">Security Status</p>
                 <p className={`text-xl font-black ${qberValue === null ? 'text-slate-700' : qberValue < 11 ? 'text-cyan-400' : 'text-red-500'}`}>
                   {qberValue === null ? 'IDLE' : qberValue < 11 ? 'SAFE' : 'RISKY'}
                 </p>
               </div>
             </div>
             {finalKey && (
               <div className="mt-6 space-y-4 animate-in slide-in-from-bottom-2 duration-500">
                 <div className="flex justify-between items-center">
                   <p className="text-[10px] text-slate-500 font-black uppercase tracking-[0.2em]">Symmetric Key Generated</p>
                   <button 
                    onClick={() => onKeyGenerated(finalKey)} 
                    className="flex items-center gap-1.5 text-cyan-400 hover:text-cyan-200 text-[10px] font-black uppercase group transition-all"
                   >
                     Inject Key <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                   </button>
                 </div>
                 <div className="p-4 bg-slate-950 rounded-xl border border-cyan-500/30 font-mono text-xs text-cyan-400 break-all leading-relaxed shadow-lg flex items-center gap-3">
                   <Fingerprint size={16} className="shrink-0 text-cyan-500/50" />
                   {finalKey}
                 </div>
               </div>
             )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuantumSimulator;
