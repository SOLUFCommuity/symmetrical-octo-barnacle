
import React, { useState, useRef, useEffect } from 'react';
import { 
  Send, 
  Bot, 
  User, 
  Sparkles, 
  ShieldCheck, 
  ShieldAlert,
  Loader2,
  Trash2,
  Activity,
  Zap,
  ShieldHalf,
  ArrowRight,
  ZapOff
} from 'lucide-react';
import { GoogleGenAI } from '@google/genai';

interface ChatMessage {
  role: 'user' | 'ai';
  content: string;
}

interface SimulationTelemetry {
  qber: number;
  depolarization: number;
  damping: number;
  timestamp: string;
  qubitCount: number;
}

interface AISecurityAuditProps {
  lastSimulationData?: SimulationTelemetry | null;
}

const AISecurityAudit: React.FC<AISecurityAuditProps> = ({ lastSimulationData }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async (overridePrompt?: string) => {
    const userMessage = overridePrompt || input;
    if (!userMessage.trim() || isLoading) return;

    if (!overridePrompt) setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      // Strictly using gemini-flash-lite-latest for ultra-fast response times as required
      const response = await ai.models.generateContent({
        model: 'gemini-flash-lite-latest',
        contents: userMessage,
        config: {
          systemInstruction: `คุณคือหัวหน้าทีมรักษาความปลอดภัยทางไซเบอร์ประจำโครงการ "Symmetrical Octo Barnacle" (APP QUANTUM)

ภารกิจหลัก:
1. วิเคราะห์ Telemetry (QBER/Noise) เพื่อระบุสัญญาณดักฟัง
2. เมื่อ QBER > 11% ให้ประกาศสถานะ CRITICAL RISK ทันที
3. ให้ Actionable Insights ที่รวดเร็วและกระชับ (Lite Core Response Mode)
4. ใช้รูปแบบการตอบ: [Vulnerability] -> [Risk Level] -> [Mitigation Plan]

ข้อมูลระบบ:
${lastSimulationData ? `
- QBER: ${lastSimulationData.qber.toFixed(2)}%
- Noise: ${lastSimulationData.depolarization}/${lastSimulationData.damping}
` : 'รอยืนยันข้อมูล Telemetry'}

จงตอบด้วยภาษาไทยที่เฉียบคม กระชับ และเป็นมืออาชีพ (Low Latency Mode Enabled)`,
          temperature: 0.5,
        }
      });

      const aiText = response.text || 'ไม่สามารถวิเคราะห์ข้อมูลได้ในขณะนี้';
      setMessages(prev => [...prev, { role: 'ai', content: aiText }]);
    } catch (error) {
      console.error('Audit Error:', error);
      setMessages(prev => [...prev, { role: 'ai', content: 'ขออภัย ระบบ Audit Intelligence ขัดข้อง (Fast Mode Error)' }]);
    } finally {
      setIsLoading(false);
    }
  };

  const auditSimulationData = () => {
    if (!lastSimulationData) return;
    const prompt = `ทำการ Audit ข้อมูลจำลอง Telemetry ID ${lastSimulationData.timestamp.slice(-5)} ทันที โดยเน้นความเสี่ยงต่อการถูกดักฟัง (MITM)`;
    handleSend(prompt);
  };

  return (
    <div className="max-w-5xl mx-auto h-[calc(100vh-12rem)] flex flex-col glass rounded-[2.5rem] border border-slate-800 overflow-hidden shadow-2xl">
      {/* Header with Fast-Response Badge */}
      <div className="p-5 border-b border-slate-800 bg-slate-950/80 flex justify-between items-center backdrop-blur-xl">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-2xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 shadow-inner">
            <ShieldHalf size={24} />
          </div>
          <div>
            <h3 className="font-black text-lg tracking-tight flex items-center gap-2">
              Security Audit Intelligence 
              <span className="text-[10px] bg-cyan-500 text-slate-950 px-3 py-1 rounded-full font-black flex items-center gap-1 shadow-lg shadow-cyan-500/20 uppercase">
                <Zap size={10} fill="currentColor" /> Fast AI
              </span>
            </h3>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              <p className="text-[10px] text-slate-500 uppercase font-mono tracking-widest">Low-Latency Lite Core Active</p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
           <button 
            onClick={() => setMessages([])}
            className="p-2.5 hover:bg-slate-800 rounded-xl text-slate-500 hover:text-red-400 transition-all border border-transparent hover:border-red-500/20"
            title="Clear Chat"
          >
            <Trash2 size={20} />
          </button>
        </div>
      </div>

      {/* Audit Log / Chat Feed */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-8 space-y-8 bg-slate-950/20 scroll-smooth"
      >
        {messages.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center text-center max-w-2xl mx-auto">
            <div className="p-8 rounded-[3rem] bg-slate-900 border border-slate-800 mb-8 relative group">
              <Bot className="text-cyan-400 w-16 h-16" />
              <div className="absolute inset-0 bg-cyan-500/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            
            <h2 className="text-3xl font-black mb-4">Immediate Vulnerability Audit</h2>
            <p className="text-slate-400 mb-10 leading-relaxed font-medium">
              วิเคราะห์ความปลอดภัยด้วยความเร็วแสงผ่านโมเดล Gemini Flash Lite ล่าสุด ออกแบบมาเพื่อการตอบสนองที่ฉับไวที่สุด (Instant Telemetry Analysis)
            </p>

            {lastSimulationData ? (
              <div className="w-full glass p-8 rounded-[2rem] border border-cyan-500/30 bg-cyan-500/5 shadow-2xl animate-in slide-in-from-bottom-5 duration-700">
                <div className="flex items-center justify-between mb-8 text-left">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-cyan-500/20 rounded-xl text-cyan-400">
                      <Activity size={24} className="animate-pulse" />
                    </div>
                    <div>
                      <h4 className="text-md font-black text-white uppercase tracking-wider">Live Telemetry Hooked</h4>
                      <p className="text-xs text-slate-500 font-mono">QBER: {lastSimulationData.qber.toFixed(2)}% Detected</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`text-xl font-black font-mono ${lastSimulationData.qber > 11 ? 'text-red-500' : 'text-green-400'}`}>
                      {lastSimulationData.qber.toFixed(2)}%
                    </span>
                    <p className="text-[10px] text-slate-500 font-bold uppercase">Measured</p>
                  </div>
                </div>
                <button 
                  onClick={auditSimulationData}
                  className="w-full py-5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-black rounded-2xl text-md flex items-center justify-center gap-3 transition-all shadow-xl shadow-cyan-500/20 active:scale-95"
                >
                  <Sparkles size={20} /> เริ่มการวิเคราะห์ความเร็วสูง (Audit Now)
                </button>
              </div>
            ) : (
              <div className="p-8 border border-dashed border-slate-800 rounded-3xl opacity-40 flex flex-col items-center gap-4">
                 <ZapOff size={32} className="text-slate-600" />
                 <span className="text-sm font-black uppercase tracking-[0.3em] font-mono">Waiting for Quantum Seed...</span>
              </div>
            )}
          </div>
        )}

        {messages.map((msg, i) => (
          <div 
            key={i} 
            className={`flex gap-6 ${msg.role === 'user' ? 'flex-row-reverse' : ''} animate-in fade-in slide-in-from-bottom-4 duration-500`}
          >
            <div className={`
              shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center shadow-2xl transition-all
              ${msg.role === 'ai' ? 'bg-cyan-500 text-slate-950 scale-110' : 'bg-slate-800 text-slate-400 border border-slate-700'}
            `}>
              {msg.role === 'ai' ? <Bot size={24} /> : <User size={24} />}
            </div>
            <div className={`
              max-w-[80%] p-7 rounded-[2.5rem] text-[15px] leading-relaxed relative shadow-2xl
              ${msg.role === 'ai' 
                ? 'glass border border-slate-800 text-slate-200' 
                : 'bg-cyan-600/90 text-white font-bold'}
            `}>
              {msg.role === 'ai' && (
                <div className="absolute -top-3 -left-3 p-1.5 bg-cyan-500 rounded-xl shadow-lg shadow-cyan-500/40">
                  <Zap size={14} className="text-slate-950" fill="currentColor" />
                </div>
              )}
              <div className="whitespace-pre-wrap font-sans tracking-tight">
                {msg.content}
              </div>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex gap-6 animate-pulse">
            <div className="shrink-0 w-12 h-12 rounded-2xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center">
              <Loader2 size={24} className="animate-spin" />
            </div>
            <div className="glass border border-slate-800 p-6 rounded-[2rem] flex items-center gap-3">
               <div className="w-2 h-2 bg-cyan-500 rounded-full animate-bounce [animation-delay:-0.3s]" />
               <div className="w-2 h-2 bg-cyan-500 rounded-full animate-bounce [animation-delay:-0.15s]" />
               <div className="w-2 h-2 bg-cyan-500 rounded-full animate-bounce" />
            </div>
          </div>
        )}
      </div>

      {/* Interaction Bar */}
      <div className="p-6 bg-slate-950/90 border-t border-slate-800 backdrop-blur-xl">
        <div className="relative max-w-4xl mx-auto flex items-center gap-4">
          <div className="relative flex-1">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              placeholder="สอบถามผู้เชี่ยวชาญด้านความปลอดภัย (Lite Core Active)..."
              className="w-full bg-slate-900/50 border border-slate-800 rounded-3xl py-4 pl-7 pr-16 text-sm focus:outline-none focus:border-cyan-500/50 focus:ring-4 focus:ring-cyan-500/10 transition-all resize-none h-16 overflow-hidden shadow-inner"
              rows={1}
            />
            <button 
              onClick={() => handleSend()}
              disabled={!input.trim() || isLoading}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-3 bg-cyan-500 hover:bg-cyan-400 disabled:opacity-50 disabled:bg-slate-800 text-slate-950 rounded-2xl transition-all shadow-xl shadow-cyan-500/20"
            >
              <Send size={22} />
            </button>
          </div>
        </div>
        <div className="flex justify-center gap-8 mt-5 opacity-40 text-[9px] font-black uppercase tracking-[0.3em] font-mono">
           <span className="flex items-center gap-2"><ShieldCheck size={12} className="text-green-500" /> Proactive Defense</span>
           <span className="flex items-center gap-2"><Zap size={12} className="text-cyan-500" /> Symmetric Response</span>
        </div>
      </div>
    </div>
  );
};

export default AISecurityAudit;
