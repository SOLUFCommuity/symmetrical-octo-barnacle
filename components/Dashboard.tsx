
import React, { useState } from 'react';
import { 
  Zap, 
  ShieldAlert, 
  ArrowUpRight, 
  Network, 
  ShieldCheck,
  Activity,
  Globe,
  Settings2
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { AppView } from '../types';

const data = [
  { time: '00:00', threat: 40, defense: 85 },
  { time: '04:00', threat: 30, defense: 90 },
  { time: '08:00', threat: 65, defense: 82 },
  { time: '12:00', threat: 50, defense: 88 },
  { time: '16:00', threat: 85, defense: 95 },
  { time: '20:00', threat: 45, defense: 92 },
  { time: '23:59', threat: 35, defense: 98 },
];

interface DashboardProps {
  onNavigate: (view: AppView) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onNavigate }) => {
  const [isFullAuto, setIsFullAuto] = useState(true);

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Hero Section */}
      <div className="relative overflow-hidden p-8 md:p-12 rounded-[2.5rem] bg-gradient-to-br from-blue-600/20 via-cyan-600/10 to-transparent border border-white/5">
        <div className="absolute top-0 right-0 p-8 opacity-20">
          <Network className="w-64 h-64 text-cyan-500" />
        </div>
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-[10px] font-bold text-cyan-400 mb-6 tracking-widest uppercase">
            <Zap size={12} fill="currentColor" /> Protect Your Business with Intelligent Solutions
          </div>
          <h1 className="text-4xl md:text-5xl font-black mb-6 tracking-tight leading-tight">
            ปกป้องธุรกิจของคุณด้วย <br /><span className="text-cyan-400">โซลูชันอัจฉริยะ</span>
          </h1>
          <p className="text-slate-400 text-lg leading-relaxed mb-8 font-medium">
            เรามุ่งมั่นที่จะให้บริการตอบสนองต่อเหตุการณ์ที่ครอบคลุม ซึ่งขับเคลื่อนด้วยความเชี่ยวชาญ และการทำงานร่วมกันระดับโลก เพื่อให้แน่ใจว่าการดำเนินงานของคุณปลอดภัยและยืดหยุ่นอยู่เสมอ
          </p>
          <div className="flex flex-wrap gap-4">
            <button 
              onClick={() => onNavigate(AppView.AUTOMATION)}
              className="px-8 py-4 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black rounded-2xl flex items-center gap-2 transition-all shadow-xl shadow-cyan-500/30"
            >
              ตั้งค่าระบบอัตโนมัติ <Settings2 size={18} />
            </button>
            <button 
              onClick={() => onNavigate(AppView.INCIDENT_RESPONSE)}
              className="px-8 py-4 bg-slate-800/80 hover:bg-slate-700 text-white font-black rounded-2xl border border-slate-700 transition-all backdrop-blur-sm"
            >
              ดู Threat Monitoring
            </button>
          </div>
        </div>
      </div>

      {/* Main Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass p-8 rounded-3xl border border-cyan-500/20 bg-cyan-500/5 relative overflow-hidden group">
          <div className="flex items-start justify-between mb-6">
            <div className="p-4 bg-cyan-500/10 rounded-2xl text-cyan-400 border border-cyan-500/20">
              <Zap size={28} />
            </div>
            <div className={`px-3 py-1 rounded-full text-[10px] font-black ${isFullAuto ? 'bg-green-500/20 text-green-400 border border-green-500/20' : 'bg-slate-800 text-slate-400'}`}>
              {isFullAuto ? 'AUTONOMOUS_ACTIVE' : 'MANUAL_OVERRIDE'}
            </div>
          </div>
          <h3 className="text-2xl font-black mb-3 text-white">การตอบสนองอัจฉริยะ</h3>
          <p className="text-slate-400 text-sm leading-relaxed mb-6">
            เพิ่มความแข็งแกร่งให้กับความปลอดภัยของคุณด้วยพอร์ตโครงการแบบครอบคลุมของบริการตอบสนองต่อเหตุการณ์ด้านความปลอดภัยทางไซเบอร์เชิงรุกและตอบสนองต่อเหตุการณ์
          </p>
          <div className="flex items-center gap-4">
             <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" checked={isFullAuto} onChange={() => setIsFullAuto(!isFullAuto)} />
              <div className="w-12 h-6 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-500 shadow-inner"></div>
              <span className="ms-3 text-sm font-black text-slate-300">ทำงานอัตโนมัติทั้งหมด</span>
            </label>
          </div>
        </div>

        <div className="glass p-8 rounded-3xl border border-blue-500/20 bg-blue-500/5 relative overflow-hidden group">
          <div className="flex items-start justify-between mb-6">
            <div className="p-4 bg-blue-500/10 rounded-2xl text-blue-400 border border-blue-500/20">
              <Globe size={28} />
            </div>
            <div className="flex -space-x-2">
              <div className="w-7 h-7 rounded-full bg-cyan-500 border-2 border-[#020617] shadow-lg" />
              <div className="w-7 h-7 rounded-full bg-blue-500 border-2 border-[#020617] shadow-lg" />
              <div className="w-7 h-7 rounded-full bg-purple-500 border-2 border-[#020617] shadow-lg" />
            </div>
          </div>
          <h3 className="text-2xl font-black mb-3 text-white">การปรับขนาดจากส่วนกลาง</h3>
          <p className="text-slate-400 text-sm leading-relaxed mb-6">
            ใช้การตอบสนองต่อเหตุการณ์จากส่วนกลางทุกวันตลอดทั้งวันด้วยตัวเลือกสําหรับความช่วยเหลือในสถานที่และระยะไกล
          </p>
          <div className="flex items-center gap-8">
            <div className="flex flex-col">
              <span className="text-[10px] text-slate-500 font-black uppercase tracking-widest">Active Nodes</span>
              <span className="text-xl font-black text-blue-400">128/128</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] text-slate-500 font-black uppercase tracking-widest">Global Latency</span>
              <span className="text-xl font-black text-cyan-400">14ms</span>
            </div>
          </div>
        </div>
      </div>

      {/* Threat Monitoring Section */}
      <div className="glass p-8 rounded-[2rem] border border-slate-800 bg-slate-900/20">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
          <div>
            <h3 className="text-xl font-black flex items-center gap-3 text-white">
              <ShieldAlert size={24} className="text-red-500" /> Threat & Incident Activity
            </h3>
            <p className="text-sm text-slate-500 mt-1">Real-time monitoring across global project ports</p>
          </div>
          <div className="flex gap-2">
             <span className="px-4 py-1.5 bg-red-500/10 text-red-500 rounded-full text-[10px] font-black border border-red-500/20 animate-pulse tracking-widest">LIVE RADAR ACTIVE</span>
          </div>
        </div>

        <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorThreat" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="time" stroke="#64748b" fontSize={10} axisLine={false} tickLine={false} />
                <YAxis stroke="#64748b" fontSize={10} axisLine={false} tickLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#020617', border: '1px solid #1e293b', borderRadius: '16px', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.5)' }}
                />
                <Area type="monotone" dataKey="threat" stroke="#ef4444" fillOpacity={1} fill="url(#colorThreat)" strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {[
          { label: 'Active Defenses', value: '1,248', icon: ShieldCheck, color: 'text-green-400' },
          { label: 'Threats Blocked', value: '85,492', icon: ShieldAlert, color: 'text-red-400' },
          { label: 'System Uptime', value: '99.99%', icon: Zap, color: 'text-yellow-400' },
          { label: 'Quantum Entropy', value: '256-bit', icon: Network, color: 'text-cyan-400' },
        ].map((stat, i) => (
          <div key={i} className="glass p-6 rounded-3xl border border-slate-800 hover:border-slate-700 transition-all group hover:scale-[1.02] shadow-sm">
            <div className="flex justify-between items-start mb-6">
              <div className={`p-3 rounded-2xl bg-slate-900 border border-slate-800 ${stat.color} shadow-inner`}>
                <stat.icon size={20} />
              </div>
              <ArrowUpRight size={16} className="text-slate-600 group-hover:text-cyan-400 transition-colors" />
            </div>
            <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em]">{stat.label}</p>
            <h3 className="text-2xl font-black mt-2 text-white">{stat.value}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
