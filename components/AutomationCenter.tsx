import React, { useState, useEffect } from 'react';
import { 
  Zap, 
  Settings2, 
  Play, 
  Pause, 
  Clock, 
  CheckCircle2, 
  RefreshCcw,
  Cpu,
  Fingerprint,
  BarChart3,
  Lock,
  Unlock,
  Terminal,
  Server,
  Activity,
  Code2,
  FileCode2,
  GitBranch,
  ShieldCheck,
  FileText,
  MessageSquare
} from 'lucide-react';

interface AutomationRule {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'paused' | 'executing';
  lastRun: string;
  type: 'security' | 'optimization' | 'quantum';
}

interface AutomationLog {
  timestamp: string;
  action: string;
  data: string;
  status: 'success' | 'warning' | 'info';
}

const AutomationCenter: React.FC = () => {
  const [isFullyAutonomous, setIsFullyAutonomous] = useState(true);
  const [schedulerActive, setSchedulerActive] = useState(true);
  const [countdown, setCountdown] = useState(10);
  const [logs, setLogs] = useState<AutomationLog[]>([]);
  const [currentTask, setCurrentTask] = useState<string | null>(null);
  const [encryptionVisual, setEncryptionVisual] = useState<{iv: string, cipher: string, plain: string} | null>(null);
  const [activeTab, setActiveTab] = useState<'scheduler' | 'pipelines' | 'scripts' | 'config'>('scheduler');
  const [activePipeline, setActivePipeline] = useState<'createVm' | 'summarizeIssue'>('createVm');

  const [rules, setRules] = useState<AutomationRule[]>([
    { 
      id: '1', 
      name: 'Smart Response: Auto-MITM', 
      description: 'ตรวจจับและสลับ Tunnel การเชื่อมต่ออัตโนมัติเมื่อพบความผิดปกติ พร้อมบล็อก IP ต้องสงสัยทันที', 
      status: 'active', 
      lastRun: '2 mins ago', 
      type: 'security' 
    },
    { 
      id: '2', 
      name: 'Quantum Key Rotation (Global)', 
      description: 'รีเฟรชรหัสผ่าน AES-256 ด้วย Entropy ใหม่จาก Quantum Simulator ทุกชั่วโมงทั่วโลก', 
      status: 'active', 
      lastRun: '15 mins ago', 
      type: 'quantum' 
    },
    { 
      id: '3', 
      name: 'Autonomous Malware Purge', 
      description: 'กักกันและทำลายไฟล์ที่มีความเสี่ยงสูงอัตโนมัติ (Zero-Touch Response)', 
      status: 'active', 
      lastRun: '1 day ago', 
      type: 'security' 
    }
  ]);

  const pythonScript = `import time
from datetime import datetime

def automated_task():
    print("Running automated task at", datetime.now())

while True:
    automated_task()
    time.sleep(10)  # ทำงานทุก 10 วินาที`;

  const pythonAdvancedScript = `import os
from azure.ai.inference import ChatCompletionsClient
from azure.ai.inference.models import SystemMessage, UserMessage
from azure.core.credentials import AzureKeyCredential

endpoint = "https://models.github.ai/inference"
model = "openai/gpt-4.1"
token = os.environ["GITHUB_TOKEN"]

client = ChatCompletionsClient(
    endpoint=endpoint,
    credential=AzureKeyCredential(token),
)

response = client.complete(
    messages=[
        SystemMessage("You are a helpful assistant."),
        UserMessage("What is the capital of France?"),
    ],
    temperature=1.0,
    top_p=1.0,
    model=model
)

print(response.choices[0].message.content)`;

  const githubAction = `on: [push]

name: Create Custom VM Image

jobs:
  build-image:
    runs-on: ubuntu-latest    
    steps:
    - name: Checkout
      uses: actions/checkout@v2    

    - name: Login via Az module
      uses: azure/login@v2
      with:
        client-id: \${{ secrets.AZURE_CLIENT_ID }}
        tenant-id: \${{ secrets.AZURE_TENANT_ID }}
        subscription-id: \${{ secrets.AZURE_SUBSCRIPTION_ID }}

    - name: Setup Java 1.8.x
      uses: actions/setup-java@v1
      with:
        java-version: '1.8.x'
        
    - name: Build Java
      run: mvn --batch-mode --update-snapshots verify

    - run: mkdir staging && cp target/*.jar staging
    - uses: actions/upload-artifact@v2
      with:
        name: Package
        path: staging

    - name: Create App Baked Image
      id: imageBuilder
      uses: azure/build-vm-image@v0
      with:
        location: 'eastus2'
        resource-group-name: '{rgName}'
        managed-identity: '{Identity}' # Managed identity
        source-os-type: 'windows'
        source-image-type: 'platformImage'
        source-image: MicrosoftWindowsServer:WindowsServer:2019-Datacenter:latest 
        dist-type: 'SharedImageGallery'
        dist-resource-id: '/subscriptions/{subID}/resourceGroups/{rg}/galleries/{gal}/images/{img}/versions/0.1.\${{ GITHUB.RUN_ID }}'
        dist-location: 'eastus2'

    - name: CREATE VM
      uses: azure/CLI@v1
      with:
        azcliversion: 2.0.72
        inlineScript: |
        az vm create --resource-group ghactions-vMimage  --name "app-vm-\${{ GITHUB.RUN_NUMBER }}"  --admin-username myuser --admin-password "\${{ secrets.VM_PWD }}" --location  eastus2 \\
            --image "\${{ steps.imageBuilder.outputs.custom-image-uri }}"`;
  
  const issueSummaryAction = `name: Summarize new issues

on:
  issues:
    types: [opened]

jobs:
  summary:
    runs-on: ubuntu-latest
    permissions:
      issues: write
      models: read
      contents: read

    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Run AI inference
        id: inference
        uses: actions/ai-inference@v1
        with:
          prompt: |
            Summarize the following GitHub issue in one paragraph:
            Title: \${{ github.event.issue.title }}
            Body: \${{ github.event.issue.body }}

      - name: Comment with AI summary
        run: |
          gh issue comment $ISSUE_NUMBER --body '\${{ steps.inference.outputs.response }}'
        env:
          GH_TOKEN: \${{ secrets.GITHUB_TOKEN }}
          ISSUE_NUMBER: \${{ github.event.issue.number }}
          RESPONSE: \${{ steps.inference.outputs.response }}`;

  const dependabotConfig = `version: 2
updates:
  - package-ecosystem: "npm" 
    directory: "/" 
    schedule:
      interval: "weekly"`;

  // Scheduler Logic (10s interval)
  useEffect(() => {
    let timer: number;
    if (schedulerActive && isFullyAutonomous) {
      timer = window.setInterval(() => {
        setCountdown(prev => {
          if (prev <= 1) {
            executeSecureAutomation();
            return 10;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [schedulerActive, isFullyAutonomous]);

  const executeSecureAutomation = async () => {
    setCurrentTask("EXECUTING_SECURE_TASK");
    const timestamp = new Date().toLocaleTimeString();
    const rawData = "Global Node Heartbeat (Symmetrical-Octo-Barnacle)";
    
    // Simulate AES-256 Symmetric Encryption
    const mockIv = Array.from({length: 16}, () => Math.floor(Math.random() * 16).toString(16)).join('');
    const mockCipher = btoa(rawData + "::ENCRYPTION_LAYER_01");
    
    setEncryptionVisual({
      iv: mockIv,
      cipher: mockCipher,
      plain: rawData
    });

    addLog({
      timestamp,
      action: "SCHEDULER_TRIGGER",
      data: "Initiating 10s Automated Task Cycle",
      status: 'info'
    });

    await new Promise(r => setTimeout(r, 800));
    addLog({
      timestamp,
      action: "ENCRYPTION_COMPLETE",
      data: `AES-256 Secured (IV: ${mockIv.slice(0, 8)}...)`,
      status: 'success'
    });

    await new Promise(r => setTimeout(r, 1200));
    addLog({
      timestamp,
      action: "TASK_COMPLETED",
      data: `Automation cycle finished: Heartbeat Transmitted`,
      status: 'success'
    });

    setTimeout(() => {
      setCurrentTask(null);
      setEncryptionVisual(null);
    }, 3000);
  };

  const addLog = (log: AutomationLog) => {
    setLogs(prev => [log, ...prev].slice(0, 5));
  };

  const toggleRule = (id: string) => {
    setRules(prev => prev.map(rule => {
      if (rule.id === id) {
        return { ...rule, status: rule.status === 'active' ? 'paused' : 'active' };
      }
      return rule;
    }));
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-500 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black tracking-tight flex items-center gap-3">
            <Zap className="text-cyan-400" fill="currentColor" /> ระบบทำงานอัตโนมัติทั้งหมด
          </h1>
          <p className="text-slate-400 mt-2 font-medium">Full Autonomy & Secure CI/CD Pipelines</p>
        </div>
        <div className="flex gap-3">
           <button 
            onClick={() => setIsFullyAutonomous(!isFullyAutonomous)}
            className={`px-8 py-3 rounded-2xl font-black flex items-center gap-3 transition-all ${
              isFullyAutonomous ? 'bg-cyan-500 text-slate-950 shadow-xl shadow-cyan-500/20' : 'bg-slate-800 text-slate-400 border border-slate-700'
            }`}
          >
            {isFullyAutonomous ? <Activity className="animate-pulse" size={20} /> : <Pause size={20} />}
            {isFullyAutonomous ? 'FULL AUTONOMY ON' : 'MANUAL OVERRIDE'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main Display Area */}
        <div className="lg:col-span-8 space-y-8">
          {/* Tabs */}
          <div className="flex bg-slate-900/50 p-1.5 rounded-2xl border border-slate-800 w-fit overflow-x-auto no-scrollbar">
            <button 
              onClick={() => setActiveTab('scheduler')}
              className={`px-6 py-2 rounded-xl text-xs font-black transition-all whitespace-nowrap ${activeTab === 'scheduler' ? 'bg-slate-800 text-cyan-400 border border-slate-700 shadow-sm' : 'text-slate-500 hover:text-slate-300'}`}
            >
              SCHEDULER
            </button>
            <button 
              onClick={() => setActiveTab('pipelines')}
              className={`px-6 py-2 rounded-xl text-xs font-black transition-all whitespace-nowrap ${activeTab === 'pipelines' ? 'bg-slate-800 text-cyan-400 border border-slate-700 shadow-sm' : 'text-slate-500 hover:text-slate-300'}`}
            >
              CI/CD PIPELINES
            </button>
            <button 
              onClick={() => setActiveTab('scripts')}
              className={`px-6 py-2 rounded-xl text-xs font-black transition-all whitespace-nowrap ${activeTab === 'scripts' ? 'bg-slate-800 text-cyan-400 border border-slate-700 shadow-sm' : 'text-slate-500 hover:text-slate-300'}`}
            >
              AUTOMATED SCRIPTS
            </button>
            <button 
              onClick={() => setActiveTab('config')}
              className={`px-6 py-2 rounded-xl text-xs font-black transition-all whitespace-nowrap ${activeTab === 'config' ? 'bg-slate-800 text-cyan-400 border border-slate-700 shadow-sm' : 'text-slate-500 hover:text-slate-300'}`}
            >
              DEPENDABOT CONFIG
            </button>
          </div>

          <div className="glass p-8 rounded-[2.5rem] border border-slate-800 bg-slate-950/40 relative overflow-hidden min-h-[500px]">
            {activeTab === 'scheduler' && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex justify-between items-start mb-8">
                  <div>
                    <h2 className="text-2xl font-bold flex items-center gap-3 text-white">
                      <Clock className="text-cyan-400" /> Active System Pulse
                    </h2>
                    <p className="text-xs text-slate-500 font-mono mt-1 uppercase tracking-widest">Interval Cycle: 10.0 Seconds</p>
                  </div>
                  <div className="text-right">
                    <div className="text-4xl font-mono font-black text-cyan-400 tabular-nums">
                      00:{countdown.toString().padStart(2, '0')}
                    </div>
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Next Execution</p>
                  </div>
                </div>

                <div className="h-2 bg-slate-900 rounded-full overflow-hidden mb-12 border border-slate-800">
                  <div 
                    className="h-full bg-cyan-500 transition-all duration-1000 ease-linear shadow-[0_0_15px_rgba(34,211,238,0.5)]" 
                    style={{ width: `${(countdown / 10) * 100}%` }}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="glass p-6 rounded-3xl border border-slate-800 bg-black/40">
                    <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                      <Lock size={14} className="text-purple-400" /> Encryption Stream
                    </h3>
                    {encryptionVisual ? (
                      <div className="space-y-4 animate-in fade-in duration-500">
                        <div>
                          <p className="text-[10px] font-bold text-slate-500 uppercase">IV Hash</p>
                          <p className="font-mono text-[10px] text-purple-400 truncate">{encryptionVisual.iv}</p>
                        </div>
                        <div>
                          <p className="text-[10px] font-bold text-slate-500 uppercase">Symmetric Cipher</p>
                          <p className="font-mono text-[10px] text-cyan-400 break-all bg-slate-900/50 p-2 rounded-lg border border-slate-800">
                            {encryptionVisual.cipher}
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="py-8 flex flex-col items-center justify-center opacity-20">
                        <RefreshCcw size={32} className="text-slate-600 mb-2 animate-spin-slow" />
                        <p className="text-xs font-medium">Awaiting next cycle...</p>
                      </div>
                    )}
                  </div>

                  <div className="glass p-6 rounded-3xl border border-slate-800 bg-black/40">
                    <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                      <Terminal size={14} className="text-green-400" /> Logic result
                    </h3>
                    {encryptionVisual ? (
                      <div className="space-y-4 animate-in slide-in-from-right-4 duration-500">
                        <div className="flex items-center gap-3 text-green-400">
                           <Unlock size={16} />
                           <p className="text-xs font-bold">Cycle Processed</p>
                        </div>
                        <div className="p-3 bg-green-500/5 border border-green-500/20 rounded-xl">
                          <p className="text-[10px] text-green-400 font-mono italic">
                            "Resolved: {encryptionVisual.plain}"
                          </p>
                        </div>
                        <div className="flex items-center gap-2 text-[10px] font-bold text-slate-500">
                          <CheckCircle2 size={12} className="text-green-500" /> INTEGRITY_VERIFIED
                        </div>
                      </div>
                    ) : (
                      <div className="py-8 flex flex-col items-center justify-center opacity-20">
                        <Server size={32} className="text-slate-600 mb-2" />
                        <p className="text-xs font-medium">System Idle</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'pipelines' && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 h-full flex flex-col">
                <div className="flex items-center gap-2 mb-4 pb-4 border-b border-slate-800">
                  <button onClick={() => setActivePipeline('createVm')} className={`px-4 py-2 text-xs font-bold rounded-lg flex items-center gap-2 ${activePipeline === 'createVm' ? 'bg-slate-800 text-orange-400' : 'text-slate-500 hover:bg-slate-800/50'}`}>
                    <GitBranch size={14} /> Create VM
                  </button>
                  <button onClick={() => setActivePipeline('summarizeIssue')} className={`px-4 py-2 text-xs font-bold rounded-lg flex items-center gap-2 ${activePipeline === 'summarizeIssue' ? 'bg-slate-800 text-purple-400' : 'text-slate-500 hover:bg-slate-800/50'}`}>
                    <MessageSquare size={14} /> Summarize Issue
                  </button>
                </div>
                
                {activePipeline === 'createVm' && (
                  <div className="flex-1 flex flex-col">
                    <div className="flex justify-between items-center mb-4">
                      <h2 className="text-2xl font-bold flex items-center gap-3 text-white">
                        <GitBranch className="text-orange-400" /> Create Custom VM Image
                      </h2>
                      <div className="px-3 py-1 bg-orange-500/10 rounded-full border border-orange-500/20 text-orange-400 text-[10px] font-black tracking-widest">
                        GITHUB_ACTIONS
                      </div>
                    </div>
                    <div className="flex-1 bg-slate-950 rounded-2xl border border-slate-800 p-6 overflow-y-auto font-mono text-xs text-slate-300 max-h-[400px]">
                      <pre className="whitespace-pre-wrap">{githubAction}</pre>
                    </div>
                  </div>
                )}
                
                {activePipeline === 'summarizeIssue' && (
                  <div className="flex-1 flex flex-col">
                    <div className="flex justify-between items-center mb-4">
                      <h2 className="text-2xl font-bold flex items-center gap-3 text-white">
                        <MessageSquare className="text-purple-400" /> Summarize New Issues
                      </h2>
                      <div className="px-3 py-1 bg-purple-500/10 rounded-full border border-purple-500/20 text-purple-400 text-[10px] font-black tracking-widest">
                        AI_INTEGRATION
                      </div>
                    </div>
                    <div className="flex-1 bg-slate-950 rounded-2xl border border-slate-800 p-6 overflow-y-auto font-mono text-xs text-slate-300 max-h-[400px]">
                      <pre className="whitespace-pre-wrap">{issueSummaryAction}</pre>
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'scripts' && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 h-full flex flex-col space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <h2 className="text-xl font-bold flex items-center gap-3 text-white">
                      <FileCode2 className="text-blue-400" /> Python Task Loop
                    </h2>
                    <div className="px-3 py-1 bg-blue-500/10 rounded-full border border-blue-500/20 text-blue-400 text-[10px] font-black tracking-widest">
                      PYTHON_V3.x
                    </div>
                  </div>
                  <div className="bg-slate-950 rounded-2xl border border-slate-800 p-6 overflow-y-auto font-mono text-xs text-blue-300">
                    <pre className="whitespace-pre-wrap">{pythonScript}</pre>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-3">
                    <h2 className="text-xl font-bold flex items-center gap-3 text-white">
                      <FileCode2 className="text-cyan-400" /> Advanced Inference Script
                    </h2>
                    <div className="px-3 py-1 bg-cyan-500/10 rounded-full border border-cyan-500/20 text-cyan-400 text-[10px] font-black tracking-widest">
                      AZURE_INFERENCE
                    </div>
                  </div>
                  <div className="bg-slate-950 rounded-2xl border border-slate-800 p-6 overflow-y-auto font-mono text-xs text-cyan-300">
                    <pre className="whitespace-pre-wrap">{pythonAdvancedScript}</pre>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'config' && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 h-full flex flex-col">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold flex items-center gap-3 text-white">
                    <FileText className="text-green-400" /> Dependabot Configuration
                  </h2>
                  <div className="px-3 py-1 bg-green-500/10 rounded-full border border-green-500/20 text-green-400 text-[10px] font-black tracking-widest">
                    YAML_V2
                  </div>
                </div>
                <div className="flex-1 bg-slate-950 rounded-2xl border border-slate-800 p-6 overflow-y-auto font-mono text-xs text-green-300">
                  <pre className="whitespace-pre-wrap">{dependabotConfig}</pre>
                </div>
              </div>
            )}
          </div>

          <div className="glass p-6 rounded-3xl border border-slate-800 bg-black/20">
            <h4 className="text-xs font-mono text-slate-500 mb-6 flex items-center justify-between">
              <div className="flex items-center gap-2 tracking-widest"><BarChart3 size={14} /> SYSTEM AUTOMATION LOGS</div>
              <div className="px-2 py-0.5 bg-cyan-500/10 rounded border border-cyan-500/20 text-cyan-400 text-[9px] font-bold">REALTIME_FEED</div>
            </h4>
            <div className="space-y-3 font-mono text-[10px]">
              {logs.length === 0 ? (
                <p className="text-slate-600 italic">No task telemetry available for current epoch.</p>
              ) : logs.map((log, i) => (
                <div key={i} className={`flex gap-4 p-3 rounded-xl border animate-in slide-in-from-left-2 duration-300 ${
                  log.status === 'success' ? 'bg-green-500/5 border-green-500/10 text-green-400' : 
                  log.status === 'warning' ? 'bg-red-500/5 border-red-500/10 text-red-400' : 'bg-cyan-500/5 border-cyan-500/10 text-cyan-400'
                }`}>
                  <span className="opacity-50 shrink-0">[{log.timestamp}]</span>
                  <span className="font-bold uppercase shrink-0">{log.action}:</span>
                  <span className="truncate">{log.data}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-4 space-y-6">
          <div className="glass p-8 rounded-[2.5rem] border border-cyan-500/20 bg-cyan-500/5 relative overflow-hidden group">
            <div className="absolute -right-4 -top-4 opacity-5 group-hover:rotate-12 transition-transform duration-700">
              <Zap size={120} fill="currentColor" />
            </div>
            <h4 className="font-black mb-6 flex items-center gap-3 text-cyan-400 text-xl tracking-tight">
               จุดเด่นของระบบ
            </h4>
            <ul className="space-y-5 relative z-10">
              <li className="flex gap-4">
                <div className="shrink-0 p-3 rounded-2xl bg-cyan-500/10 text-cyan-400 h-fit border border-cyan-500/10">
                   <Clock size={20} />
                </div>
                <div>
                  <p className="text-sm font-black text-slate-100">ดูแลระบบตลอดเวลา 24/7</p>
                  <p className="text-xs text-slate-500 leading-relaxed mt-1">ใช้การตอบสนองต่อเหตุการณ์จากส่วนกลางทุกวันตลอดทั้งวัน (Full Cycle Monitoring)</p>
                </div>
              </li>
              <li className="flex gap-4">
                <div className="shrink-0 p-3 rounded-2xl bg-green-500/10 text-green-400 h-fit border border-green-500/10">
                   <ShieldCheck size={20} />
                </div>
                <div>
                  <p className="text-sm font-black text-slate-100">ระบบอัจฉริยะ (Intelligent)</p>
                  <p className="text-xs text-slate-500 leading-relaxed mt-1">เพิ่มความแข็งแกร่งด้วยบริการตอบสนองเชิงรุกที่ลด Human Error ได้อย่างสมบูรณ์</p>
                </div>
              </li>
              <li className="flex gap-4">
                <div className="shrink-0 p-3 rounded-2xl bg-purple-500/10 text-purple-400 h-fit border border-purple-500/10">
                   <Code2 size={20} />
                </div>
                <div>
                  <p className="text-sm font-black text-slate-100">CI/CD & Scripting</p>
                  <p className="text-xs text-slate-500 leading-relaxed mt-1">บูรณาการกับ GitHub Actions และ Python Scripts เพื่อการปรับขนาดจากส่วนกลาง</p>
                </div>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] px-3">Autonomous Playbooks</h3>
            {rules.map((rule) => (
              <div 
                key={rule.id} 
                className={`glass p-6 rounded-3xl border transition-all duration-300 ${
                  rule.status === 'active' ? 'border-cyan-500/20 bg-cyan-500/5' : 'border-slate-800 opacity-40'
                }`}
              >
                <div className="flex justify-between items-start mb-4">
                  <div className={`p-3 rounded-2xl ${
                    rule.type === 'quantum' ? 'bg-purple-500/20 text-purple-400' :
                    rule.type === 'security' ? 'bg-red-500/20 text-red-400' : 'bg-blue-500/20 text-blue-400'
                  }`}>
                    <Settings2 size={20} />
                  </div>
                  <button 
                    onClick={() => toggleRule(rule.id)}
                    className={`p-2 rounded-xl transition-all ${
                      rule.status === 'active' ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/20' : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {rule.status === 'active' ? <Pause size={16} fill="currentColor" /> : <Play size={16} fill="currentColor" />}
                  </button>
                </div>
                <h4 className="font-bold text-sm mb-2 text-white">{rule.name}</h4>
                <p className="text-[10px] text-slate-500 leading-relaxed mb-4">{rule.description}</p>
                <div className="flex items-center justify-between pt-4 border-t border-slate-800/50 text-[9px] font-mono">
                  <span className="flex items-center gap-1.5 text-slate-500"><Clock size={12} /> Last: {rule.lastRun}</span>
                  <span className={`uppercase font-black tracking-widest ${rule.status === 'active' ? 'text-cyan-400' : 'text-slate-600'}`}>{rule.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AutomationCenter;