
import React, { useState, useEffect } from 'react';
import { 
  Lock, 
  Unlock, 
  RefreshCw, 
  Copy, 
  Check, 
  AlertCircle,
  Cpu,
  Zap
} from 'lucide-react';

interface EncryptionToolProps {
  initialKey?: string;
}

const EncryptionTool: React.FC<EncryptionToolProps> = ({ initialKey }) => {
  const [plaintext, setPlaintext] = useState('');
  const [key, setKey] = useState(initialKey || '');
  const [ciphertext, setCiphertext] = useState('');
  const [decrypted, setDecrypted] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (initialKey) setKey(initialKey);
  }, [initialKey]);

  const generateKey = () => {
    const chars = '0123456789ABCDEF';
    let result = '';
    for (let i = 0; i < 32; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setKey(result);
  };

  const simulateEncryption = () => {
    if (!plaintext || !key) return;
    setIsProcessing(true);
    setTimeout(() => {
      // Simulate post-quantum wrapping
      const encoded = btoa(plaintext + '::PQ::' + key.slice(0, 8));
      setCiphertext(encoded);
      setIsProcessing(false);
    }, 800);
  };

  const simulateDecryption = () => {
    if (!ciphertext || !key) return;
    setIsProcessing(true);
    setTimeout(() => {
      try {
        const decoded = atob(ciphertext).split('::PQ::')[0];
        setDecrypted(decoded);
      } catch (e) {
        setDecrypted('DECRYPTION_FAILED: Protocol Mismatch');
      }
      setIsProcessing(false);
    }, 800);
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center gap-4 mb-8">
        <div className="p-3 rounded-2xl bg-cyan-500/10 border border-cyan-500/20">
          <Cpu className="text-cyan-400 w-8 h-8" />
        </div>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Post-Quantum Symmetrical Encryption</h1>
          <p className="text-slate-400">AES-256 Resistant Protocol Demonstration</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="glass p-6 rounded-2xl border border-slate-800">
            <label className="block text-sm font-semibold mb-3 text-slate-300">Plaintext Input (ข้อความเริ่มแรก)</label>
            <textarea
              value={plaintext}
              onChange={(e) => setPlaintext(e.target.value)}
              placeholder="กรอกข้อความที่ต้องการเข้ารหัส..."
              className="w-full h-32 bg-slate-950 border border-slate-800 rounded-xl p-4 text-slate-200 focus:outline-none focus:border-cyan-500/50 transition-colors resize-none"
            />
          </div>

          <div className="glass p-6 rounded-2xl border border-slate-800">
            <div className="flex justify-between items-center mb-3">
              <label className="text-sm font-semibold text-slate-300">Secret Key (รหัสผ่าน)</label>
              <div className="flex gap-2">
                {initialKey && (
                  <div className="flex items-center gap-1 text-[10px] text-purple-400 font-bold bg-purple-500/10 px-2 py-1 rounded border border-purple-500/20">
                    <Zap size={10} fill="currentColor" /> QUANTUM_INJECTED
                  </div>
                )}
                <button 
                  onClick={generateKey}
                  className="text-xs text-cyan-400 hover:text-cyan-300 flex items-center gap-1 font-mono"
                >
                  <RefreshCw size={12} /> REGENERATE
                </button>
              </div>
            </div>
            <div className="relative">
              <input
                type="text"
                value={key}
                onChange={(e) => setKey(e.target.value)}
                placeholder="256-bit Secret Key..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 pr-12 text-cyan-400 font-mono text-sm focus:outline-none focus:border-cyan-500/50 transition-colors"
              />
              <Lock size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-600" />
            </div>
          </div>

          <button
            onClick={simulateEncryption}
            disabled={!plaintext || !key || isProcessing}
            className="w-full py-4 bg-cyan-500 hover:bg-cyan-400 disabled:opacity-50 text-slate-950 font-bold rounded-2xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-cyan-500/10"
          >
            {isProcessing ? <RefreshCw className="animate-spin" /> : <Lock size={20} />}
            Encrypt with Quantum-Ready Protocol
          </button>
        </div>

        <div className="space-y-6">
          <div className="glass p-6 rounded-2xl border border-slate-800 relative group">
            <div className="flex justify-between items-center mb-3">
              <label className="text-sm font-semibold text-slate-300">Ciphertext (ผลลัพธ์ที่ได้จากการเข้ารหัส)</label>
              <button onClick={() => handleCopy(ciphertext)} className="text-slate-500 hover:text-white transition-colors">
                {copied ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
              </button>
            </div>
            <div className="w-full h-32 bg-slate-900/50 border border-slate-800 rounded-xl p-4 text-purple-400 font-mono text-xs overflow-y-auto break-all">
              {ciphertext || 'Output will appear here...'}
            </div>
          </div>

          <div className="glass p-6 rounded-2xl border border-slate-800">
             <div className="flex justify-between items-center mb-3">
              <label className="text-sm font-semibold text-slate-300">Decryption Algorithm (การถอดรหัส)</label>
              <button 
                onClick={simulateDecryption}
                disabled={!ciphertext || isProcessing}
                className="text-xs px-3 py-1.5 bg-slate-800 hover:bg-slate-700 rounded-lg text-slate-200 border border-slate-700 transition-all flex items-center gap-1"
              >
                <Unlock size={14} /> Run Decoder
              </button>
            </div>
            <div className="w-full h-32 bg-slate-900/50 border border-slate-800 rounded-xl p-4 text-slate-300">
              {decrypted || 'Waiting for decryption command...'}
            </div>
          </div>

          <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-xl flex gap-3">
            <AlertCircle className="text-amber-500 shrink-0" size={20} />
            <p className="text-xs text-amber-200/80 leading-relaxed">
              <strong>Post-Quantum Awareness:</strong> AES-256 remains secure. Even with quantum computers, bit-length effectively halves, leaving 128-bits of security, which is still uncrackable today.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EncryptionTool;
