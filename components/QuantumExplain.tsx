
import React from 'react';
import { 
  Network, 
  Cpu, 
  ShieldCheck, 
  Layers,
  Key,
  Unlock,
  FileText,
  Users,
  BarChart3
} from 'lucide-react';

const QuantumExplain: React.FC = () => {
  const definitions = [
    {
      title: "Plaintext Input",
      subtitle: "ข้อความเริ่มแรก",
      desc: "หมายถึง ข้อความเริ่มแรกที่ยังไม่ได้เข้ารหัส และมีความต้องการที่จะเข้ารหัส",
      icon: FileText,
      color: "text-blue-400",
      bg: "bg-blue-500/10"
    },
    {
      title: "Encryption Algorithm",
      subtitle: "กระบวนการแปลงข้อความ",
      desc: "เป็นกระบวนการแปลงข้อความ Plaintext ไปเป็นข้อความที่ไม่สามารถอ่านได้",
      icon: Layers,
      color: "text-cyan-400",
      bg: "bg-cyan-500/10"
    },
    {
      title: "Secret Key",
      subtitle: "รหัสที่ต้องป้อน",
      desc: "เป็นรหัสที่ต้องป้อนเข้าไปในกระบวนการเข้ารหัส โดยการแปลงข้อความของอัลกอริทึมในการเข้ารหัส จะขึ้นกับ Secret Key ที่ป้อนเข้าไป",
      icon: Key,
      color: "text-yellow-400",
      bg: "bg-yellow-500/10"
    },
    {
      title: "Ciphertext",
      subtitle: "ผลลัพธ์จากการเข้ารหัส",
      desc: "เป็นผลลัพธ์ที่ได้จากการเข้ารหัส โดยจะขึ้นกับ Plaintext และ Secret Key ที่ป้อนเข้าไป ข้อความที่เหมือนกัน แต่มี Key ที่ต่างกัน จะให้ผลลัพธ์ที่ต่างกันด้วย",
      icon: Network,
      color: "text-purple-400",
      bg: "bg-purple-500/10"
    },
    {
      title: "Decryption Algorithm",
      subtitle: "กระบวนการย้อนกลับ",
      desc: "เป็นกระบวนการย้อนกลับของการเข้ารหัส โดยเมื่อใส่ Ciphertext และ Key ที่ถูกต้องเข้าไป จะต้องได้ข้อความเดิมหรือ Plaintext ออกมา",
      icon: Unlock,
      color: "text-green-400",
      bg: "bg-green-500/10"
    }
  ];

  const features = [
    {
      title: "การตอบสนองต่อเหตุการณ์ที่ขับเคลื่อนด้วยระบบอัจฉริยะ",
      desc: "เพิ่มความแข็งแกร่งให้กับความปลอดภัยของคุณด้วยพอร์ตโครงการแบบครอบคลุมของบริการตอบสนองต่อเหตุการณ์ด้านความปลอดภัยทางไซเบอร์เชิงรุกและตอบสนองต่อเหตุการณ์",
      icon: BarChart3,
      color: "text-cyan-400"
    },
    {
      title: "การปรับขนาดจากส่วนกลาง",
      desc: "ใช้การตอบสนองต่อเหตุการณ์จากส่วนกลางทุกวันตลอดทั้งวันด้วยตัวเลือกสําหรับความช่วยเหลือในสถานที่และระยะไกล",
      icon: Network,
      color: "text-blue-400"
    },
    {
      title: "ความชำนาญ",
      desc: "ใช้ประโยชน์จากความชำนาญเชี่ยวชาญของ Microsoft Threat Intelligence และการเข้าถึงวิศวกรรมผลิตภัณฑ์ที่ไม่เหมือนใคร",
      icon: Cpu,
      color: "text-purple-400"
    },
    {
      title: "การทำงานร่วมกัน",
      desc: "รับประโยชน์จากความร่วมมือของ Microsoft ที่ยาวนานกับหน่วยงานภาครัฐและองค์กรรักษาความปลอดภัยทางไซเบอร์ทั่วโลก",
      icon: Users,
      color: "text-green-400"
    }
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-12 animate-in fade-in duration-1000">
      {/* Hero */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">
          พื้นฐานการเข้ารหัสในยุคควอนตัม
        </h1>
        <p className="text-slate-400 max-w-2xl mx-auto text-lg leading-relaxed">
          เรามุ่งมั่นให้บริการตอบสนองต่อเหตุการณ์ที่ครอบคลุม ซึ่งขับเคลื่อนด้วยความเชี่ยวชาญ และการทำงานร่วมกันระดับโลก เพื่อให้แน่ใจว่าการดำเนินงานของคุณปลอดภัยและยืดหยุ่นอยู่เสมอ (We are committed to providing comprehensive incident response services, driven by expertise and global collaboration, to ensure your operations are always secure and resilient.)
        </p>
      </div>

      {/* Definitions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {definitions.map((item, i) => (
          <div key={i} className="glass p-8 rounded-3xl border border-slate-800 hover:border-slate-700 transition-all group">
            <div className={`w-14 h-14 rounded-2xl ${item.bg} ${item.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
              <item.icon size={28} />
            </div>
            <h3 className="text-xl font-bold">{item.title}</h3>
            <p className="text-xs font-mono text-slate-500 mb-3">{item.subtitle}</p>
            <p className="text-slate-400 leading-relaxed text-sm">
              {item.desc}
            </p>
          </div>
        ))}
      </div>

      {/* Corporate Features */}
      <div className="p-10 rounded-3xl bg-slate-900/50 border border-slate-800 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
          <ShieldCheck className="w-96 h-96 text-cyan-500" />
        </div>
        
        <h2 className="text-3xl font-bold mb-12 text-center underline decoration-cyan-500/30 underline-offset-8">คุณสมบัติหลักของเรา (Our Key Features)</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10 relative z-10">
          {features.map((feature, i) => (
            <div key={i} className="flex gap-5">
              <div className={`w-12 h-12 shrink-0 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-center ${feature.color}`}>
                <feature.icon size={24} />
              </div>
              <div>
                <h4 className="font-bold text-white mb-2 text-lg">{feature.title}</h4>
                <p className="text-sm text-slate-400 leading-relaxed">{feature.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuantumExplain;
