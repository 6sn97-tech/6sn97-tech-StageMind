
import React, { useState, useMemo, useEffect, useRef } from 'react';
import { 
  LayoutDashboard, 
  Ticket, 
  Users, 
  TrendingUp, 
  Settings, 
  LogOut, 
  Bell, 
  Search,
  Zap,
  ChevronDown,
  ChevronLeft,
  CreditCard,
  Target,
  ShieldCheck,
  FileDown,
  Plus,
  MoreVertical,
  X,
  Loader2,
  Globe,
  Command,
  HelpCircle,
  BrainCircuit,
  Radio,
  GripVertical,
  Wallet,
  CheckCircle2,
  Download,
  Maximize2,
  Activity,
  Cpu,
  Layout,
  Menu,
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
  Clock,
  Filter,
  Eye,
  Edit3,
  Trash2,
  Sparkle,
  Layers,
  Map as MapIcon,
  Navigation,
  Focus,
  DollarSign,
  PieChart,
  ArrowUp,
  History,
  PlusCircle,
  ShieldAlert,
  FileText,
  Lock,
  Monitor,
  Video,
  Play,
  Share2,
  AlertTriangle,
  Heart,
  Smartphone,
  EyeOff,
  Scan,
  Gauge,
  Timer,
  User,
  Tags,
  BarChart3,
  Rocket,
  Wand2,
  LineChart as LineChartIcon,
  MousePointer2,
  Settings2,
  Radar,
  Info,
  Layers3,
  Camera,
  SmartphoneNfc,
  Globe2,
  QrCode,
  ArrowRightLeft,
  RotateCcw,
  Ban,
  MonitorPlay,
  Flame,
  ZapOff,
  Database,
  RefreshCw,
  Waves,
  Mic2,
  Volume2
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
  LineChart,
  Line,
  PieChart as RePieChart,
  Pie,
  ScatterChart,
  Scatter,
  ZAxis
} from 'recharts';
import DashboardPreview from './DashboardPreview';
import { useToast } from '../App';

interface DashboardPageProps {
  onLogout: () => void;
}

interface ExternalDataItem {
  id: string | number;
  name: string;
  value: string | number;
  status: string;
  lastUpdated: string;
}

// SparkBar Component for mini visualizations
const SparkBar: React.FC<{ values: number[], colors: string[] }> = ({ values, colors }) => {
  return (
    <div className="flex gap-1 h-3 w-24 items-end">
      {values.map((v, i) => (
        <div 
          key={i} 
          className={`rounded-t-sm transition-all duration-1000 ${colors[i]}`} 
          style={{ height: `${v}%`, width: '100%' }}
        />
      ))}
    </div>
  );
};

// Custom Tooltip for Dashboard Charts
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#0F172A]/95 border border-white/10 p-6 rounded-[32px] shadow-2xl backdrop-blur-3xl text-right min-w-[200px]">
        <p className="text-[10px] font-black text-gray-500 mb-4 uppercase tracking-[0.3em] font-plex">{label}</p>
        <div className="space-y-3">
          {payload.map((entry: any, index: number) => (
            <div key={index} className="flex items-center justify-between gap-8 flex-row-reverse">
              <div className="flex items-center gap-3 flex-row-reverse">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color || entry.fill }} />
                <span className="text-xs font-black text-gray-300 font-plex">
                  {entry.name === 'actual' ? 'الفعلي' : entry.name === 'forecast' ? 'المتوقع' : entry.payload.category || entry.name}
                </span>
              </div>
              <span className="text-sm font-black text-white tracking-tight font-plex">
                {entry.dataKey === 'amount' ? `$${entry.value}` : entry.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }
  return null;
};

// Operational Modal Component
const OperationalModal: React.FC<{ 
  isOpen: boolean; 
  onClose: () => void; 
  title: string; 
  subtitle?: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}> = ({ isOpen, onClose, title, subtitle, icon, children }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8">
      <div className="absolute inset-0 bg-[#0A192F]/95 backdrop-blur-2xl animate-in fade-in duration-500" onClick={onClose} />
      <div className="relative w-full max-w-4xl bg-[#0F172A]/80 border border-white/10 rounded-[56px] shadow-[0_60px_120px_rgba(0,0,0,0.9)] overflow-hidden animate-in zoom-in-95 duration-500 flex flex-col max-h-[92vh]">
        <div className="absolute top-0 right-0 w-full h-1.5 bg-gradient-to-l from-electric-teal via-blue-500 to-transparent opacity-50" />
        <div className="p-10 border-b border-white/5 flex items-center justify-between bg-white/[0.02] flex-row-reverse">
          <div className="flex items-center gap-6 flex-row-reverse">
            <div className="w-16 h-16 bg-electric-teal/10 rounded-[24px] flex items-center justify-center text-electric-teal border border-electric-teal/20 shadow-[0_0_30px_rgba(100,255,218,0.1)]">{icon}</div>
            <div className="text-right">
              <h3 className="text-3xl font-black text-white font-plex tracking-tight">{title}</h3>
              {subtitle && <p className="text-gray-500 text-xs font-bold font-plex mt-1 uppercase tracking-widest">{subtitle}</p>}
            </div>
          </div>
          <button onClick={onClose} className="p-4 hover:bg-white/5 rounded-2xl text-gray-500 hover:text-white transition-all border border-white/5 group"><X className="w-6 h-6 group-hover:rotate-90 transition-transform duration-500" /></button>
        </div>
        <div className="flex-1 overflow-y-auto custom-scrollbar p-10 md:p-16">
          {children}
        </div>
      </div>
    </div>
  );
};

const KPICard: React.FC<{ 
  label: string; 
  val: string; 
  target: string;
  change: string; 
  icon: React.ReactNode; 
  themeColor: 'teal' | 'gold' | 'blue' | 'purple';
  data: { v: number }[];
  highlight?: boolean;
}> = ({ label, val, target, change, icon, themeColor, data, highlight }) => {
  const themes = {
    teal: { text: 'text-electric-teal', bg: 'bg-electric-teal/10', border: 'border-electric-teal/20', accent: '#64FFDA' },
    gold: { text: 'text-amber-gold', bg: 'bg-amber-gold/10', border: 'border-amber-gold/20', accent: '#FFB400' },
    blue: { text: 'text-blue-400', bg: 'bg-blue-400/10', border: 'border-blue-400/20', accent: '#60A5FA' },
    purple: { text: 'text-purple-400', bg: 'bg-purple-400/10', border: 'border-purple-400/20', accent: '#A78BFA' }
  };
  const theme = themes[themeColor];
  const isUp = change.includes('+');

  return (
    <div className={`glass-card p-8 rounded-[48px] border flex flex-col group hover:border-white/10 transition-all duration-700 shadow-3xl relative overflow-hidden h-full cursor-default text-right ${highlight ? 'border-amber-gold/30 shadow-[0_0_40px_rgba(255,180,0,0.1)]' : 'border-white/5'}`}>
      <div className="absolute inset-x-0 bottom-0 h-32 opacity-10 group-hover:opacity-20 transition-opacity pointer-events-none">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <Area type="monotone" dataKey="v" stroke={theme.accent} strokeWidth={4} fill={theme.accent} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div className="flex items-start justify-between mb-8 flex-row-reverse relative z-10">
        <div className={`w-14 h-14 rounded-[22px] flex items-center justify-center transition-all group-hover:scale-110 border shadow-2xl ${theme.bg} ${theme.text} ${theme.border}`}>{icon}</div>
        <div className={`px-3 py-1 rounded-full border border-white/5 font-black text-[10px] font-plex flex items-center gap-2 ${isUp ? 'text-green-400 bg-green-500/5' : 'text-blue-400 bg-blue-500/5'}`}>{isUp ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}{change}</div>
      </div>
      <div className="relative z-10 mb-6">
        <p className="text-gray-500 font-black text-[10px] uppercase tracking-[0.3em] mb-2 font-plex">{label}</p>
        <h3 className={`text-3xl md:text-5xl font-black tracking-tighter font-plex group-hover:scale-105 transition-all duration-500 origin-right whitespace-nowrap ${highlight ? 'text-amber-gold animate-pulse' : 'text-white'}`}>{val}</h3>
      </div>
      <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between flex-row-reverse relative z-10">
        <div className="text-right">
          <p className="text-[9px] text-slate-400 font-bold font-plex uppercase tracking-widest">المستهدف اليومي</p>
          <p className="text-sm font-black text-white/80 font-plex">{target}</p>
        </div>
        {highlight && (
          <div className="flex items-center gap-2 bg-amber-gold/10 px-2 py-0.5 rounded-full border border-amber-gold/20">
             <Sparkle className="w-2.5 h-2.5 text-amber-gold" />
             <span className="text-[8px] font-black text-amber-gold font-plex uppercase">AI Optimized</span>
          </div>
        )}
        {!highlight && <div className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" /><span className="text-[9px] font-black text-gray-600 font-plex">LIVE</span></div>}
      </div>
    </div>
  );
};

interface TheatreZone {
  id: string;
  name: string;
  occupancy: number;
  revenue: string;
  heat: number; // 0 to 1
  capacity: number;
  seats: { id: string; heat: number; occupied: boolean }[];
}

const DashboardPage: React.FC<DashboardPageProps> = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState('الرئيسية');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [exportProgress, setExportProgress] = useState(0);
  const [selectedZone, setSelectedZone] = useState<TheatreZone | null>(null);

  // Dynamic Pricing State
  const [isDynamicPricingActive, setIsDynamicPricingActive] = useState(false);
  const [isActivatingPricing, setIsActivatingPricing] = useState(false);

  // External Data State
  const [externalData, setExternalData] = useState<ExternalDataItem[]>([]);
  const [isFetchingExternal, setIsFetchingExternal] = useState(false);

  // Tickets State
  const [selectedTickets, setSelectedTickets] = useState<string[]>([]);
  const ticketsData = [
    { id: "#TK-9284", user: "سارة محمود", show: "أوبرا عايدة", type: "Royal VIP", price: "$450", status: "نشطة", date: "22/05/2024", c: "text-green-400" },
    { id: "#TK-9285", user: "علي القحطاني", show: "أوبرا عايدة", type: "Golden Circle", price: "$220", status: "تم الدخول", date: "22/05/2024", c: "text-blue-400" },
    { id: "#TK-9286", user: "ليلى حسن", show: "ليلة البيانو", type: "Standard", price: "$90", status: "ملغاة", date: "21/05/2024", c: "text-red-400" },
    { id: "#TK-9287", user: "فهد الحربي", show: "أوبرا عايدة", type: "Royal VIP", price: "$450", status: "نشطة", date: "21/05/2024", c: "text-green-400" }
  ];

  // Modals state
  const [isAddShowOpen, setIsAddShowOpen] = useState(false);
  const [isAddTicketOpen, setIsAddTicketOpen] = useState(false);
  const [isAddCustomerOpen, setIsAddCustomerOpen] = useState(false);
  const [isShiftSummaryOpen, setIsShiftSummaryOpen] = useState(false);
  const [isScheduleOpen, setIsScheduleOpen] = useState(false);

  const { addToast } = useToast();

  const sparklineData = Array.from({ length: 10 }).map(() => ({ v: 30 + Math.random() * 40 }));
  const forecastData = [
    { day: 'الاثنين', score: 85, trend: 80 },
    { day: 'الثلاثاء', score: 60, trend: 65 },
    { day: 'الأربعاء', score: 92, trend: 88 },
    { day: 'الخميس', score: 98, trend: 95 },
    { day: 'الجمعة', score: 100, trend: 98 },
    { day: 'السبت', score: 95, trend: 92 },
    { day: 'الأحد', score: 88, trend: 85 },
  ];

  const engagementTrendData = Array.from({ length: 24 }).map((_, i) => ({
    time: `${19}:${i * 2 + 10}`,
    intensity: 40 + Math.random() * 55,
    sentiment: 60 + Math.random() * 30
  }));

  const menuItems = [
    { label: 'الرئيسية', icon: <Monitor className="w-5 h-5" /> },
    { label: 'تفاعل الجمهور', icon: <Activity className="w-5 h-5" /> },
    { label: 'إدارة العروض', icon: <Ticket className="w-5 h-5" /> },
    { label: 'إدارة التذاكر', icon: <Tags className="w-5 h-5" /> },
    { label: 'تكامل البيانات', icon: <Database className="w-5 h-5" /> },
    { label: 'الجمهور', icon: <Users className="w-5 h-5" /> },
    { label: 'العملاء', icon: <User className="w-5 h-5" /> },
    { label: 'التنبؤ بالإقبال', icon: <Target className="w-5 h-5" /> },
    { label: 'التسعير الديناميكي', icon: <Rocket className="w-5 h-5" /> },
    { label: 'الرصد المرئي', icon: <Video className="w-5 h-5" /> },
    { label: 'مركز الأرباح', icon: <TrendingUp className="w-5 h-5" /> },
    { label: 'التقارير وقياس الأداء', icon: <PieChart className="w-5 h-5" /> },
    { label: 'المحفظة', icon: <Wallet className="w-5 h-5" /> },
    { label: 'الإعدادات', icon: <Settings className="w-5 h-5" /> },
  ];

  // Helper to generate fake seat data
  const generateSeats = (count: number, baseHeat: number) => {
    return Array.from({ length: count }).map((_, i) => ({
      id: `s-${i}`,
      heat: Math.min(1, baseHeat + (Math.random() * 0.4 - 0.2)),
      occupied: Math.random() < baseHeat
    }));
  };

  const theatreZones: TheatreZone[] = [
    { id: 'v1', name: 'جناح ملكي - يمين', occupancy: 100, revenue: '$12,400', heat: 0.95, capacity: 12, seats: generateSeats(12, 0.95) },
    { id: 'v2', name: 'جناح ملكي - يسار', occupancy: 92, revenue: '$11,200', heat: 0.88, capacity: 12, seats: generateSeats(12, 0.92) },
    { id: 'o1', name: 'الأوركسترا - مقدمة', occupancy: 98, revenue: '$45,000', heat: 0.98, capacity: 64, seats: generateSeats(64, 0.98) },
    { id: 'o2', name: 'الأوركسترا - وسط', occupancy: 84, revenue: '$38,500', heat: 0.72, capacity: 96, seats: generateSeats(96, 0.84) },
    { id: 'o3', name: 'الأوركسترا - خلفية', occupancy: 70, revenue: '$22,000', heat: 0.55, capacity: 120, seats: generateSeats(120, 0.70) },
    { id: 'b1', name: 'الشرفة الأولى', occupancy: 88, revenue: '$28,400', heat: 0.82, capacity: 80, seats: generateSeats(80, 0.88) },
    { id: 'b2', name: 'الشرفة الثانية', occupancy: 62, revenue: '$12,500', heat: 0.40, capacity: 100, seats: generateSeats(100, 0.62) },
  ];

  const handleExport = async () => {
    setIsExporting(true);
    setExportProgress(0);
    addToast('جاري تجميع البيانات الاستراتيجية...', 'info');
    for(let i=0; i<=100; i+=10) {
      setExportProgress(i);
      await new Promise(r => setTimeout(r, 200));
    }
    setIsExporting(false);
    addToast('تم توليد التقرير السحابي بنجاح.', 'success');
  };

  const handleToggleDynamicPricing = async () => {
    if (isDynamicPricingActive) {
      setIsDynamicPricingActive(false);
      addToast('تم إيقاف التسعير الديناميكي للمسرح.', 'info');
      return;
    }
    setIsActivatingPricing(true);
    await new Promise(r => setTimeout(r, 2000));
    setIsActivatingPricing(false);
    setIsDynamicPricingActive(true);
    addToast('تم تفعيل التسعير الديناميكي. النظام يقوم الآن بتحسين العوائد لكل مقعد.', 'success');
  };

  const handleFetchExternalData = async () => {
    setIsFetchingExternal(true);
    addToast('جاري مزامنة البيانات من الأنظمة الخارجية...', 'info');
    
    try {
      const response = await fetch('/api/data');
      if (!response.ok) throw new Error('API request failed');
      const data = await response.json();
      setExternalData(data);
      addToast('تم تحديث البيانات بنجاح.', 'success');
    } catch (error) {
      console.warn('API /api/data not available, using mock sync data');
      await new Promise(r => setTimeout(r, 1500));
      setExternalData([
        { id: 1, name: 'مزامنة مبيعات البوابة أ', value: '1,240 تذكرة', status: 'مكتمل', lastUpdated: 'منذ دقيقة' },
        { id: 2, name: 'ربط حساسات الردهة', value: 'نشط', status: 'متصل', lastUpdated: 'لحظياً' },
        { id: 3, name: 'تحديث مخزون المأكولات', value: '92%', status: 'مستقر', lastUpdated: 'منذ 5 دقائق' },
        { id: 4, name: 'نظام التحكم بالإضاءة الذكي', value: 'الوضع المسرحي', status: 'نشط', lastUpdated: 'منذ 10 دقائق' },
      ]);
      addToast('فشل الاتصال المباشر. تم استخدام نسخة البيانات الاحتياطية.', 'info');
    } finally {
      setIsFetchingExternal(false);
    }
  };

  const toggleTicketSelection = (id: string) => {
    setSelectedTickets(prev => 
      prev.includes(id) ? prev.filter(tid => tid !== id) : [...prev, id]
    );
  };

  const toggleAllTickets = () => {
    if (selectedTickets.length === ticketsData.length) {
      setSelectedTickets([]);
    } else {
      setSelectedTickets(ticketsData.map(t => t.id));
    }
  };

  const handleBulkAction = (action: 'cancel' | 'refund') => {
    const actionLabel = action === 'cancel' ? 'إلغاء' : 'استرجاع';
    addToast(`جاري تنفيذ عملية ${actionLabel} لـ ${selectedTickets.length} تذكرة مختارة...`, 'info');
    setTimeout(() => {
      addToast(`تم ${actionLabel} التذاكر بنجاح.`, 'success');
      setSelectedTickets([]);
    }, 1500);
  };

  // Views Implementation
  const renderEngagementView = () => (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-700 text-right">
      {/* Real-time Counter Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div className="glass-card p-10 rounded-[56px] border border-white/5 relative overflow-hidden group">
          <div className="flex items-center justify-between mb-6 flex-row-reverse">
             <div className="p-4 bg-red-500/10 rounded-2xl text-red-500 border border-red-500/20"><Users className="w-6 h-6" /></div>
             <div className="flex items-center gap-2 bg-red-500/10 px-3 py-1 rounded-full border border-red-500/20">
                <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
                <span className="text-[9px] font-black text-red-500 uppercase tracking-widest font-plex">LIVE NOW</span>
             </div>
          </div>
          <p className="text-[11px] text-gray-500 font-black uppercase tracking-widest mb-2 font-plex">إجمالي الحضور المتفاعل</p>
          <h3 className="text-6xl font-black text-white tracking-tighter font-plex group-hover:scale-105 transition-transform duration-500 origin-right">2,842</h3>
          <div className="mt-8 flex items-center gap-3 justify-end">
             <span className="text-xs font-bold text-green-500 flex items-center gap-1"><ArrowUpRight className="w-3 h-3" /> +12.5%</span>
             <span className="text-[10px] text-gray-600 font-bold uppercase tracking-tighter">vs Last Show</span>
          </div>
        </div>

        <div className="glass-card p-10 rounded-[56px] border border-white/5 relative overflow-hidden group">
          <div className="flex items-center justify-between mb-6 flex-row-reverse">
             <div className="p-4 bg-electric-teal/10 rounded-2xl text-electric-teal border border-electric-teal/20"><Waves className="w-6 h-6" /></div>
             <div className="text-[9px] font-black text-gray-600 uppercase tracking-widest">Intensity</div>
          </div>
          <p className="text-[11px] text-gray-500 font-black uppercase tracking-widest mb-2 font-plex">كثافة التركيز (Focus)</p>
          <h3 className="text-6xl font-black text-white tracking-tighter font-plex group-hover:scale-105 transition-transform duration-500 origin-right">92%</h3>
          <div className="mt-8 h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
             <div className="h-full bg-electric-teal shadow-[0_0_15px_rgba(100,255,218,0.5)] animate-pulse" style={{ width: '92%' }} />
          </div>
        </div>

        <div className="glass-card p-10 rounded-[56px] border border-white/5 relative overflow-hidden group">
          <div className="flex items-center justify-between mb-6 flex-row-reverse">
             <div className="p-4 bg-amber-gold/10 rounded-2xl text-amber-gold border border-amber-gold/20"><Mic2 className="w-6 h-6" /></div>
             <div className="text-[9px] font-black text-gray-600 uppercase tracking-widest">Acoustics</div>
          </div>
          <p className="text-[11px] text-gray-500 font-black uppercase tracking-widest mb-2 font-plex">ردود الفعل الصوتية</p>
          <h3 className="text-6xl font-black text-white tracking-tighter font-plex">84 <span className="text-xl text-gray-500 font-black">dB</span></h3>
          <p className="mt-6 text-[11px] text-amber-gold font-black italic">"تصفيق مستمر - المشهد الثالث"</p>
        </div>

        <div className="glass-card p-10 rounded-[56px] border border-white/5 relative overflow-hidden group">
          <div className="flex items-center justify-between mb-6 flex-row-reverse">
             <div className="p-4 bg-blue-500/10 rounded-2xl text-blue-400 border border-blue-500/20"><Flame className="w-6 h-6" /></div>
             <div className="text-[9px] font-black text-gray-600 uppercase tracking-widest">Energy</div>
          </div>
          <p className="text-[11px] text-gray-500 font-black uppercase tracking-widest mb-2 font-plex">مؤشر الحيوية اللحظي</p>
          <div className="flex items-end gap-2 h-16 flex-row-reverse">
             {[40, 65, 30, 85, 45, 90, 70].map((h, i) => (
               <div key={i} className="flex-1 bg-blue-500/10 rounded-full relative overflow-hidden">
                  <div className="absolute bottom-0 inset-x-0 bg-blue-500/40 animate-pulse" style={{ height: `${h}%`, animationDelay: `${i * 100}ms` }} />
               </div>
             ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Engagement Trend Chart */}
        <div className="lg:col-span-8 glass-card p-12 rounded-[64px] border border-white/5 shadow-3xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-1 bg-electric-teal/20" />
          <div className="flex items-center justify-between mb-12 flex-row-reverse">
             <div className="text-right">
                <h3 className="text-3xl font-black text-white font-plex">مخطط تفاعل العرض (Timeline)</h3>
                <p className="text-gray-500 text-xs font-bold font-plex mt-1 uppercase tracking-widest">Real-time Attention & Sentiment Matrix</p>
             </div>
             <div className="flex gap-4">
                <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-electric-teal" /><span className="text-[10px] text-gray-400 font-black uppercase font-plex">Intensity</span></div>
                <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-blue-500" /><span className="text-[10px] text-gray-400 font-black uppercase font-plex">Sentiment</span></div>
             </div>
          </div>
          <div className="h-[400px]">
             <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={engagementTrendData}>
                  <defs>
                    <linearGradient id="engGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#64FFDA" stopOpacity={0.3}/><stop offset="95%" stopColor="#64FFDA" stopOpacity={0}/></linearGradient>
                    <linearGradient id="sentGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#3B82F6" stopOpacity={0.2}/><stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/></linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" vertical={false} opacity={0.1} />
                  <XAxis dataKey="time" stroke="#475569" fontSize={11} fontWeight="900" tickLine={false} axisLine={false} dy={20} reversed={true} />
                  <YAxis stroke="#475569" fontSize={11} fontWeight="900" tickLine={false} axisLine={false} orientation="right" dx={20} />
                  <Tooltip content={<CustomTooltip />} />
                  <Area type="monotone" dataKey="intensity" stroke="#64FFDA" strokeWidth={4} fillOpacity={1} fill="url(#engGrad)" name="شدة التفاعل" />
                  <Area type="monotone" dataKey="sentiment" stroke="#3B82F6" strokeWidth={2} strokeDasharray="5 5" fillOpacity={1} fill="url(#sentGrad)" name="المزاج العام" />
                </AreaChart>
             </ResponsiveContainer>
          </div>
        </div>

        {/* Popular Show Segments */}
        <div className="lg:col-span-4 glass-card p-12 rounded-[64px] border border-white/5 shadow-3xl text-right">
           <div className="flex items-center justify-between mb-10 flex-row-reverse">
              <h4 className="text-xl font-black text-white font-plex">شعبية الفصول</h4>
              <BarChart3 className="w-6 h-6 text-amber-gold" />
           </div>
           <div className="space-y-8">
              {[
                { label: 'الفصل الأول: البداية', eng: 95, color: 'bg-indigo-500', time: 'مكتمل' },
                { label: 'المشهد الثاني: الحوار الملحمي', eng: 82, color: 'bg-electric-teal', time: 'مكتمل' },
                { label: 'الفصل الثالث: المواجهة', eng: 98, color: 'bg-red-500', time: 'الآن', active: true },
                { label: 'المشهد الرابع: الانفراجة', eng: 64, color: 'bg-slate-700', time: 'متوقع' },
              ].map((seg, i) => (
                <div key={i} className={`p-6 rounded-3xl transition-all border ${seg.active ? 'bg-white/5 border-red-500/20 shadow-2xl' : 'bg-transparent border-transparent opacity-60'}`}>
                   <div className="flex justify-between items-center flex-row-reverse mb-4">
                      <div className="text-right">
                        <p className="text-sm font-black text-white font-plex">{seg.label}</p>
                        <p className={`text-[9px] font-black uppercase tracking-widest mt-1 ${seg.active ? 'text-red-500 animate-pulse' : 'text-gray-500'}`}>{seg.time}</p>
                      </div>
                      <span className="text-base font-black text-white">{seg.eng}%</span>
                   </div>
                   <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                      <div className={`h-full ${seg.color} transition-all duration-1000`} style={{ width: `${seg.eng}%` }} />
                   </div>
                </div>
              ))}
           </div>
           <button onClick={() => addToast('تحميل تقرير التفاعل المفصل للفصول...', 'info')} className="w-full mt-10 py-4 bg-white/5 text-white border border-white/10 rounded-2xl font-black text-xs hover:bg-white/10 transition-all flex items-center justify-center gap-3">
              <Download className="w-4 h-4" />
              <span>تصدير تقرير الشعبية</span>
           </button>
        </div>
      </div>
    </div>
  );

  const renderDataIntegrationView = () => (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-700 text-right">
       <div className="flex items-center justify-between mb-8 flex-row-reverse">
        <div className="text-right">
          <h3 className="text-3xl font-black text-white font-plex">مركز تكامل البيانات</h3>
          <p className="text-gray-500 text-xs font-bold font-plex mt-1 uppercase tracking-widest">Connect external API streams and sensors</p>
        </div>
        <button 
          onClick={handleFetchExternalData}
          disabled={isFetchingExternal}
          className="flex items-center gap-3 bg-electric-teal text-[#0A192F] px-8 py-4 rounded-[24px] font-black text-sm font-plex hover:shadow-[0_0_40px_rgba(100,255,218,0.3)] transition-all active:scale-95 disabled:opacity-50"
        >
          <span>{isFetchingExternal ? 'جاري المزامنة...' : 'مزامنة البيانات الآن'}</span>
          {isFetchingExternal ? <Loader2 className="w-5 h-5 animate-spin" /> : <RefreshCw className="w-5 h-5" />}
        </button>
      </div>

      <div className="glass-card rounded-[44px] border border-white/5 overflow-hidden shadow-3xl">
        <div className="overflow-x-auto font-plex">
          <table className="w-full text-right border-collapse">
            <thead>
              <tr className="bg-white/[0.02] border-b border-white/5 text-[10px] text-gray-500 uppercase tracking-widest">
                <th className="p-8 font-black">المعرف</th>
                <th className="p-8 font-black">مصدر البيانات</th>
                <th className="p-8 font-black">القيمة الحالية</th>
                <th className="p-8 font-black">الحالة التشغيلية</th>
                <th className="p-8 font-black">آخر تحديث</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {externalData.length > 0 ? (
                externalData.map((item) => (
                  <tr key={item.id} className="hover:bg-white/[0.01] transition-colors group">
                    <td className="p-8 text-gray-500 font-black">#{item.id}</td>
                    <td className="p-8 font-black text-white group-hover:text-electric-teal transition-colors">{item.name}</td>
                    <td className="p-8 font-bold text-gray-300">{item.value}</td>
                    <td className="p-8">
                       <div className="flex items-center gap-2 justify-end">
                          <span className="text-[10px] font-black px-2 py-0.5 rounded-md bg-white/5 border border-white/5 text-green-400">{item.status}</span>
                          <div className="w-1 h-1 rounded-full bg-green-500 animate-pulse" />
                       </div>
                    </td>
                    <td className="p-8 text-xs font-bold text-gray-500 italic">{item.lastUpdated}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="p-20 text-center text-gray-600 font-plex italic">
                    لا توجد بيانات حالية. اضغط على "مزامنة البيانات" للاتصال بالأنظمة الخارجية.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderShowsView = () => (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-700 text-right">
      <div className="flex items-center justify-between mb-8 flex-row-reverse">
        <h3 className="text-3xl font-black text-white font-plex">إدارة العروض المسرحية</h3>
        <button 
          onClick={() => setIsAddShowOpen(true)}
          className="flex items-center gap-3 bg-electric-teal text-[#0A192F] px-8 py-4 rounded-[24px] font-black text-sm font-plex hover:shadow-[0_0_40px_rgba(100,255,218,0.3)] transition-all active:scale-95"
        >
          <span>إضافة عرض جديد</span>
          <Plus className="w-5 h-5" />
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {[
          { title: "أوبرا عايدة", date: "24 مايو 2024", status: "Active", occupancy: "92%", img: "1503095396549-807a89010046" },
          { title: "ليلة البيانو", date: "28 مايو 2024", status: "Booking", occupancy: "64%", img: "1520523839897-bd0b52f945a0" },
          { title: "هاملت: رؤية معاصرة", date: "02 يونيو 2024", status: "Booking", occupancy: "41%", img: "1507676184212-d03ab07a01bf" }
        ].map((show, i) => (
          <div key={i} className="glass-card group rounded-[40px] border border-white/5 overflow-hidden transition-all hover:border-white/20">
            <div className="h-48 relative overflow-hidden">
              <img src={`https://images.unsplash.com/photo-${show.img}?q=80&w=400`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" alt={show.title} />
              <div className="absolute top-4 right-4 bg-[#0A192F]/80 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-black text-electric-teal font-plex border border-electric-teal/20">{show.status}</div>
            </div>
            <div className="p-8">
              <h4 className="text-xl font-black text-white mb-2 font-plex">{show.title}</h4>
              <p className="text-gray-500 text-sm font-bold mb-6 font-plex">{show.date}</p>
              <div className="flex items-center justify-between flex-row-reverse border-t border-white/5 pt-6">
                <div className="text-right">
                  <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-1 font-plex">نسبة الإشغال</p>
                  <p className="text-lg font-black text-electric-teal font-plex">{show.occupancy}</p>
                </div>
                <div className="flex gap-2">
                   <button className="p-3 bg-white/5 text-gray-500 hover:text-white rounded-xl border border-white/5"><Edit3 className="w-4 h-4" /></button>
                   <button className="p-3 bg-white/5 text-gray-500 hover:text-white rounded-xl border border-white/5"><Eye className="w-4 h-4" /></button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderTicketsView = () => (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-700 text-right">
      {/* Tickets Header & Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <div className="glass-card p-8 rounded-[40px] border border-white/5 flex flex-col items-center justify-center text-center group hover:border-amber-gold/20 transition-all cursor-pointer" onClick={() => setIsAddTicketOpen(true)}>
          <div className="w-14 h-14 bg-amber-gold/10 rounded-2xl flex items-center justify-center text-amber-gold mb-4 group-hover:scale-110 transition-transform">
            <Plus className="w-6 h-6" />
          </div>
          <h4 className="text-sm font-black text-white font-plex">إصدار تذكرة جديدة</h4>
          <p className="text-[10px] text-gray-500 mt-1">إضافة فئة أو تذاكر يدوية</p>
        </div>
        {[
          { label: "إجمالي المبيعات", val: "4,240", icon: <CreditCard className="w-4 h-4" />, color: "text-electric-teal" },
          { label: "عائد التذاكر", val: "$124,500", icon: <DollarSign className="w-4 h-4" />, color: "text-amber-gold" },
          { label: "تذاكر قيد الحجز", val: "152", icon: <Clock className="w-4 h-4" />, color: "text-blue-400" },
        ].map((item, i) => (
          <div key={i} className="glass-card p-8 rounded-[40px] border border-white/5 text-right relative overflow-hidden">
             <div className="flex items-center gap-3 justify-end mb-4">
                <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest font-plex">{item.label}</span>
                <div className={`p-2 rounded-lg bg-white/5 ${item.color}`}>{item.icon}</div>
             </div>
             <p className={`text-3xl font-black ${item.color} font-plex`}>{item.val}</p>
             <div className="absolute bottom-0 right-0 left-0 h-1 bg-white/5 overflow-hidden">
                <div className={`h-full ${item.color.replace('text', 'bg')} opacity-20`} style={{ width: '65%' }} />
             </div>
          </div>
        ))}
      </div>

      <div className="glass-card rounded-[40px] border border-white/5 overflow-hidden">
         <table className="w-full text-right border-collapse">
            <thead>
               <tr className="bg-white/[0.02] border-b border-white/5 text-[10px] text-gray-500 uppercase tracking-widest font-plex">
                  <th className="p-6 w-12">
                    <button onClick={toggleAllTickets} className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all ${selectedTickets.length === ticketsData.length ? 'bg-electric-teal border-electric-teal' : 'border-white/20 hover:border-electric-teal'}`}>
                      {selectedTickets.length === ticketsData.length && <CheckCircle2 className="w-3 h-3 text-[#0A192F]" />}
                    </button>
                  </th>
                  <th className="p-6 font-black">رقم التذكرة</th>
                  <th className="p-6 font-black">العميل / العرض</th>
                  <th className="p-6 font-black">الفئة / السعر</th>
                  <th className="p-6 font-black">الحالة</th>
                  <th className="p-6 font-black">تاريخ الشراء</th>
                  <th className="p-6 font-black text-center">إجراءات</th>
               </tr>
            </thead>
            <tbody className="divide-y divide-white/5 font-plex">
               {ticketsData.map((ticket, i) => (
                 <tr key={i} className={`hover:bg-white/[0.01] transition-colors group ${selectedTickets.includes(ticket.id) ? 'bg-electric-teal/5' : ''}`}>
                    <td className="p-6">
                      <button onClick={() => toggleTicketSelection(ticket.id)} className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all ${selectedTickets.includes(ticket.id) ? 'bg-electric-teal border-electric-teal' : 'border-white/10 hover:border-electric-teal group-hover:border-electric-teal/50'}`}>
                        {selectedTickets.includes(ticket.id) && <CheckCircle2 className="w-3 h-3 text-[#0A192F]" />}
                      </button>
                    </td>
                    <td className="p-6 font-black text-gray-500 group-hover:text-white transition-colors">{ticket.id}</td>
                    <td className="p-6">
                       <p className="font-black text-white text-sm">{ticket.user}</p>
                       <p className="text-[10px] text-gray-600 font-bold">{ticket.show}</p>
                    </td>
                    <td className="p-6">
                       <p className="font-black text-white text-sm">{ticket.type}</p>
                       <p className="text-[10px] text-amber-gold font-bold">{ticket.price}</p>
                    </td>
                    <td className="p-6">
                       <div className="flex items-center gap-2 justify-end">
                          <span className={`text-[10px] font-black px-2 py-0.5 rounded-md bg-white/5 border border-white/5 ${ticket.c}`}>{ticket.status}</span>
                          <div className={`w-1 h-1 rounded-full ${ticket.c.replace('text', 'bg')} animate-pulse`} />
                       </div>
                    </td>
                    <td className="p-6 text-xs font-bold text-gray-500">{ticket.date}</td>
                    <td className="p-6">
                       <div className="flex gap-2 justify-center">
                          <button className="p-3 bg-white/5 text-gray-500 hover:text-electric-teal rounded-xl border border-white/5 transition-all"><QrCode className="w-4 h-4" /></button>
                          <button className="p-3 bg-white/5 text-gray-500 hover:text-amber-gold rounded-xl border border-white/5 transition-all"><ArrowRightLeft className="w-4 h-4" /></button>
                          <button className="p-3 bg-white/5 text-gray-500 hover:text-white rounded-xl border border-white/5 transition-all"><MoreVertical className="w-4 h-4" /></button>
                       </div>
                    </td>
                 </tr>
               ))}
            </tbody>
         </table>
      </div>
    </div>
  );

  const SeatGrid: React.FC<{ seats: { id: string; heat: number; occupied: boolean }[]; cols: number }> = ({ seats, cols }) => {
    return (
      <div className="grid gap-1.5 p-2" style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}>
        {seats.map((seat) => {
          const intensity = Math.floor(seat.heat * 10) * 10;
          let colorClass = "bg-slate-300";
          if (seat.occupied) {
            if (intensity >= 90) colorClass = "bg-red-600 shadow-[0_0_8px_rgba(220,38,38,0.6)]";
            else if (intensity >= 70) colorClass = "bg-orange-500 shadow-[0_0_6px_rgba(249,115,22,0.4)]";
            else if (intensity >= 40) colorClass = "bg-amber-400";
            else colorClass = "bg-emerald-400";
          }
          return (
            <div key={seat.id} className={`w-2 h-2 rounded-full transition-all duration-700 ${colorClass} hover:scale-150 cursor-pointer`} title={`Heat: ${Math.round(seat.heat * 100)}%`} />
          );
        })}
      </div>
    );
  };

  const renderAudienceView = () => (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-700 text-right">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-9 glass-card p-8 md:p-12 rounded-[56px] border border-white/5 relative overflow-hidden group">
           <div className="flex items-center justify-between mb-12 flex-row-reverse relative z-10">
              <div className="text-right">
                <h3 className="text-3xl font-black text-white font-plex">خريطة الإشغال التفاعلية</h3>
                <p className="text-gray-500 text-xs font-bold font-plex mt-1 uppercase tracking-widest">Real-time Seat Heatmap & Control</p>
              </div>
              <div className="flex items-center gap-6">
                 <div className="flex items-center gap-3 bg-white/5 px-4 py-2 rounded-full border border-white/10">
                    <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest font-plex">Live Sensors</span>
                 </div>
                 <div className="hidden sm:flex items-center gap-4 bg-black/20 px-6 py-2 rounded-full border border-white/5">
                    <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-red-600" /><span className="text-[9px] font-bold text-gray-500 font-plex">ذروة</span></div>
                    <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-orange-500" /><span className="text-[9px] font-bold text-gray-500 font-plex">عالٍ</span></div>
                    <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-slate-300" /><span className="text-[9px] font-bold text-gray-500 font-plex">شواغر</span></div>
                 </div>
              </div>
           </div>

           <div className="relative bg-slate-200 rounded-[48px] border border-slate-300 p-8 md:p-16 aspect-[16/10] flex flex-col items-center justify-start overflow-hidden shadow-inner custom-scrollbar overflow-y-auto">
              <div className="w-3/4 h-10 bg-gradient-to-b from-slate-400/40 to-transparent rounded-b-[60px] mb-12 relative flex items-center justify-center border-t border-slate-400/30 flex-shrink-0">
                 <div className="absolute top-0 w-full h-px bg-slate-500/60 blur-sm shadow-[0_0_20px_rgba(71,85,105,0.3)]" />
                 <span className="text-[11px] font-black text-slate-800 uppercase tracking-[0.8em] font-plex">THE STAGE / الخشبة</span>
              </div>
              <div className="flex-1 w-full space-y-12">
                 <div className="flex justify-between px-12">
                    {theatreZones.slice(0, 2).map((zone) => (
                      <div key={zone.id} onClick={() => setSelectedZone(zone)} className={`p-4 rounded-3xl border-2 cursor-pointer transition-all duration-500 hover:scale-105 flex flex-col items-center gap-2 ${selectedZone?.id === zone.id ? 'border-amber-gold bg-white shadow-xl ring-4 ring-amber-gold/10' : 'border-amber-gold/30 bg-white/80'}`}>
                         <span className="text-[9px] font-black text-amber-gold font-plex uppercase tracking-widest">{zone.name}</span>
                         <SeatGrid seats={zone.seats} cols={4} />
                      </div>
                    ))}
                 </div>
                 <div className="flex flex-col items-center gap-8">
                    <div className="flex gap-4 w-full">
                       {theatreZones.slice(2, 5).map((zone) => (
                         <div key={zone.id} onClick={() => setSelectedZone(zone)} className={`flex-1 rounded-[40px] border-2 cursor-pointer transition-all duration-500 hover:-translate-y-2 flex flex-col items-center p-4 relative overflow-hidden ${selectedZone?.id === zone.id ? 'border-electric-teal bg-white shadow-2xl scale-105 z-20' : 'border-slate-300 bg-white/50 hover:bg-white hover:border-slate-400'}`}>
                            <span className="text-[10px] font-black text-slate-500 font-plex text-center mb-4">{zone.name}</span>
                            <SeatGrid seats={zone.seats} cols={zone.id === 'o1' ? 8 : zone.id === 'o2' ? 12 : 15} />
                         </div>
                       ))}
                    </div>
                 </div>
              </div>
           </div>
        </div>

        <div className="lg:col-span-3 space-y-8">
           <div className="p-10 bg-purple-500/5 border border-purple-500/10 rounded-[44px]">
              <h4 className="text-xl font-black text-white font-plex mb-10">التركيبة الديموغرافية</h4>
              <div className="h-[240px]">
                 <ResponsiveContainer width="100%" height="100%">
                    <RePieChart>
                       <Pie data={[{v:45, name: 'شباب'},{v:30, name: 'عائلات'},{v:25, name: 'سياح'}]} dataKey="v" innerRadius={70} outerRadius={90} paddingAngle={8}>
                          <Cell fill="#64FFDA" /><Cell fill="#A78BFA" /><Cell fill="#FFB400" />
                       </Pie>
                       <Tooltip content={<CustomTooltip />} />
                    </RePieChart>
                 </ResponsiveContainer>
              </div>
           </div>
           <div className="p-10 bg-white/5 border border-white/5 rounded-[44px] group hover:border-electric-teal/20 transition-all cursor-default">
              <h4 className="text-[10px] font-black text-gray-600 uppercase tracking-widest mb-4 font-plex">معدل الاحتفاظ بالجمهور</h4>
              <p className="text-5xl font-black text-white font-plex group-hover:text-electric-teal transition-colors">72.4%</p>
           </div>
        </div>
      </div>
    </div>
  );

  const renderLiveMonitoringView = () => (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-8 duration-700 text-right">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { name: 'البوابة الرئيسية - أ', people: '42 p/m', img: '1514306191717-452ec28c7814' },
              { name: 'البوابة الفرعية - ب', people: '12 p/m', img: '1511578314322-379afb476865' },
              { name: 'الردهة الشمالية', people: '85 p/m', img: '1506157786151-b8491531f063' },
              { name: 'منطقة VIP', people: '5 p/m', img: '1503095396549-807a89010046' },
            ].map((feed, i) => (
              <div key={i} className="aspect-video bg-black rounded-[32px] border border-white/10 relative overflow-hidden group shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
                <img src={`https://images.unsplash.com/photo-${feed.img}?q=80&w=800&auto=format&fit=crop`} className="w-full h-full object-cover opacity-40 group-hover:scale-105 transition-transform duration-1000" alt={feed.name} />
                <div className="absolute top-6 right-6 flex items-center gap-2 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                  <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
                  <span className="text-[8px] font-black text-white uppercase tracking-widest font-plex">LIVE • HDR</span>
                </div>
                <div className="absolute bottom-6 right-6 text-right">
                  <h4 className="text-white font-black text-sm font-plex mb-1">{feed.name}</h4>
                  <p className="text-electric-teal text-[10px] font-bold font-plex uppercase">{feed.people}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="lg:col-span-4">
           <div className="p-10 bg-[#0F172A] border border-white/5 rounded-[44px] text-right flex flex-col h-full shadow-2xl">
              <div className="flex items-center justify-between mb-8 flex-row-reverse">
                 <h4 className="text-xl font-black text-white font-plex tracking-tight">سجل الرصد الذكي</h4>
                 <Radar className="w-6 h-6 text-electric-teal animate-spin duration-[4000ms]" />
              </div>
              <div className="space-y-6 flex-1 overflow-y-auto custom-scrollbar pr-2 max-h-[500px]">
                 {[
                   { t: '18:42:01', m: 'زيادة تدفق في الردهة الشمالية', i: <Users className="w-4 h-4" />, c: 'text-amber-gold' },
                   { t: '18:40:15', m: 'نظام التعرف: دخول 5 أعضاء VIP', i: <CheckCircle2 className="w-4 h-4" />, c: 'text-electric-teal' },
                   { t: '18:32:10', m: 'تنبيه: تجمع غير معتاد - مخرج 2', i: <AlertTriangle className="w-4 h-4" />, c: 'text-red-400' },
                 ].map((log, i) => (
                   <div key={i} className="flex gap-4 items-start flex-row-reverse group border-b border-white/5 pb-4 last:border-0 text-right">
                      <div className={`p-2 rounded-xl bg-white/5 ${log.c} group-hover:scale-110 transition-transform`}>{log.i}</div>
                      <div className="flex-1"><p className="text-[12px] text-white font-black font-plex mb-1">{log.m}</p><p className="text-[9px] text-gray-600 font-bold uppercase tracking-widest">{log.t}</p></div>
                   </div>
                 ))}
              </div>
           </div>
        </div>
      </div>
    </div>
  );

  const getSectionIcon = (tab: string) => {
    switch (tab) {
      case 'إدارة العروض': return <Ticket className="w-28 h-28 text-blue-400 animate-pulse" />;
      case 'إدارة التذاكر': return <Tags className="w-28 h-28 text-amber-gold animate-pulse" />;
      case 'تكامل البيانات': return <Database className="w-28 h-28 text-electric-teal animate-pulse" />;
      case 'تفاعل الجمهور': return <Activity className="w-28 h-28 text-red-500 animate-ping" />;
      case 'الجمهور': return <Users className="w-28 h-28 text-electric-teal animate-pulse" />;
      case 'العملاء': return <User className="w-28 h-28 text-purple-400 animate-pulse" />;
      case 'التنبؤ بالإقبال': return <Target className="w-28 h-28 text-electric-teal animate-pulse" />;
      case 'التسعير الديناميكي': return <Rocket className="w-28 h-28 text-amber-gold animate-bounce" />;
      case 'مركز الأرباح': return <TrendingUp className="w-28 h-28 text-emerald-400 animate-bounce" />;
      case 'التقارير وقياس الأداء': return <PieChart className="w-28 h-28 text-blue-400 animate-pulse" />;
      case 'الرصد المرئي': return <Video className="w-28 h-28 text-gray-400 animate-pulse" />;
      default: return <Loader2 className="w-28 h-28 text-electric-teal animate-spin" />;
    }
  };

  return (
    <div className="min-h-screen bg-[#0A192F] flex flex-row overflow-hidden font-cairo selection:bg-electric-teal/30">
      {isSidebarOpen && <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[45] lg:hidden" onClick={() => setIsSidebarOpen(false)} />}
      <aside className={`fixed lg:relative inset-y-0 right-0 w-72 md:w-80 bg-[#070D17] border-l border-white/5 flex flex-col z-50 transition-all duration-500 shadow-[-60px_0_120px_rgba(0,0,0,0.8)] lg:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_0%_0%,rgba(100,255,218,0.02),transparent)] pointer-events-none" />
        <div className="p-8 md:p-12 flex items-center gap-4 md:gap-5 border-b border-white/5 mb-6 md:mb-10 justify-end group cursor-pointer transition-all relative z-10 text-right">
          <div>
             <span className="text-xl md:text-2xl font-black text-white tracking-tighter group-hover:text-electric-teal transition-colors font-plex">StageMind <span className="text-electric-teal">AI</span></span>
             <p className="text-[8px] md:text-[9px] text-gray-500 font-black uppercase tracking-[0.4em] md:tracking-[0.5em] mt-1 md:mt-1.5 opacity-40 font-plex">ENTERPRISE OS 3.1</p>
          </div>
          <div className="bg-electric-teal/5 p-2 md:p-3 rounded-xl md:rounded-2xl border border-electric-teal/10 group-hover:bg-electric-teal group-hover:text-[#0A192F] transition-all duration-700 shadow-2xl"><Zap className="w-5 h-5 md:w-6 md:h-6 fill-current relative z-10" /></div>
        </div>
        <nav className="flex-1 px-4 md:px-8 space-y-2 relative z-10 overflow-y-auto custom-scrollbar scroll-smooth">
          {menuItems.map((item, i) => (
            <button key={i} onClick={() => { setActiveTab(item.label); if (window.innerWidth < 1024) setIsSidebarOpen(false); }} className={`w-full flex items-center justify-start gap-4 md:gap-5 px-4 md:px-6 py-4 rounded-2xl transition-all duration-500 relative group overflow-hidden flex-row-reverse text-right active:scale-95 ${activeTab === item.label ? 'bg-white/5 text-electric-teal font-black shadow-inner border border-white/5' : 'text-gray-500 hover:bg-white/5 hover:text-white font-bold opacity-60 hover:opacity-100'}`}>
              <span className="text-sm md:text-base tracking-wide font-plex flex-1">{item.label}</span>
              <div className={`transition-all duration-500 ${activeTab === item.label ? 'scale-125 text-electric-teal drop-shadow-[0_0_10px_rgba(100,255,218,0.5)]' : 'group-hover:scale-110 group-hover:text-white opacity-40 group-hover:opacity-100'}`}>{item.icon}</div>
              {activeTab === item.label && <div className="absolute right-0 top-3 bottom-3 w-1 bg-electric-teal rounded-full animate-pulse shadow-[0_0_15px_rgba(100,255,218,0.8)]" />}
            </button>
          ))}
        </nav>
        <div className="p-6 md:p-10 space-y-4 md:space-y-6 border-t border-white/5 bg-black/30 relative z-10">
           <button onClick={onLogout} className="w-full flex items-center justify-center gap-3 md:gap-4 py-3 md:py-5 rounded-xl md:rounded-[22px] text-gray-500 hover:text-red-400 hover:bg-red-400/5 transition-all font-black text-[10px] md:text-xs border border-transparent hover:border-red-400/20 font-plex group shadow-inner">إنهاء الجلسة الآمنة<LogOut className="w-3 md:w-4 h-3 md:h-4 group-hover:translate-x-[-5px] transition-transform" /></button>
        </div>
      </aside>

      <main className="flex-1 flex flex-col overflow-hidden bg-[radial-gradient(circle_at_50%_0%,#0F223D_0%,#0A192F_100%)] relative">
        <header className="h-20 md:h-28 bg-[#0A192F]/40 backdrop-blur-3xl border-b border-white/5 flex items-center justify-between px-6 md:px-16 z-40 relative shadow-2xl">
          <div className="flex items-center gap-4 md:gap-8 relative z-10">
            <button onClick={() => setIsSidebarOpen(true)} className="lg:hidden p-3 text-gray-400 hover:text-white transition-all bg-white/5 border border-white/10 rounded-xl active:scale-95"><Menu className="w-5 h-5" /></button>
            <div className="flex items-center gap-2 md:gap-4 px-4 md:px-6 py-2 md:py-3 bg-[#22c55e]/5 rounded-xl md:rounded-2xl border border-[#22c55e]/10 backdrop-blur-3xl shadow-inner group cursor-help">
              <span className="text-[8px] md:text-[11px] text-green-500 font-black uppercase tracking-[0.2em] md:tracking-[0.4em] font-plex">Engine Live</span>
              <div className="w-2 md:w-2.5 h-2 md:h-2.5 bg-green-500 rounded-full animate-pulse shadow-[0_0_15px_rgba(34,197,94,1)]" />
            </div>
          </div>
          <div className="flex items-center gap-4 md:gap-10 flex-row relative z-10">
            <div className="flex items-center gap-3 md:gap-5 group cursor-pointer bg-white/5 pl-3 md:pl-4 pr-4 md:pr-6 py-2 md:py-3 rounded-[16px] md:rounded-[24px] border border-white/5 hover:bg-white/10 transition-all shadow-2xl group/user">
              <div className="text-right hidden sm:block">
                <p className="text-xs md:text-[14px] font-black text-white group-hover:text-electric-teal transition-colors font-plex">محمد آل علي</p>
                <p className="text-[8px] md:text-[10px] text-gray-500 font-bold uppercase tracking-[0.1em] opacity-40 font-plex">Ops Conductor</p>
              </div>
              <div className="w-8 h-8 md:w-12 md:h-12 rounded-xl md:rounded-[20px] bg-gradient-to-br from-electric-teal to-blue-600 flex items-center justify-center font-black text-[#0A192F] shadow-2xl text-[10px] md:sm border border-white/10 font-plex relative overflow-hidden">MA</div>
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto custom-scrollbar p-6 md:p-12 xl:p-16 space-y-12 relative z-10">
          <div className="flex flex-col lg:flex-row items-center lg:items-end justify-between gap-8 border-b border-white/5 pb-12">
             <div className="flex gap-4 md:gap-5 relative z-10 w-full lg:w-auto justify-center lg:justify-start">
               <button onClick={handleExport} disabled={isExporting} className="relative bg-white text-[#0A192F] px-8 py-4 rounded-[20px] font-black text-sm md:text-base hover:shadow-[0_20px_50px_rgba(255,255,255,0.2)] transition-all flex items-center gap-3 overflow-hidden active:scale-95">
                 {isExporting && <div className="absolute bottom-0 right-0 left-0 h-1 bg-electric-teal/30 z-0" style={{ width: `${exportProgress}%` }} />}
                 <span className="relative z-10 flex items-center gap-3">{isExporting ? <Loader2 className="w-5 h-5 animate-spin" /> : <FileDown className="w-5 h-5" />} {isExporting ? `جاري التصدير (${exportProgress}%)` : 'تصدير التقارير الاستراتيجية'}</span>
               </button>
             </div>
             <div className="text-right space-y-3 md:space-y-4 relative z-10 w-full lg:w-auto">
               <div className="flex items-center gap-3 md:gap-4 justify-end text-gray-500 font-black text-[9px] md:text-[11px] uppercase tracking-[0.2em] md:tracking-[0.3em] mb-2 md:mb-4 opacity-50 font-plex">
                  <span className="text-electric-teal bg-electric-teal/5 px-3 md:px-4 py-1 md:py-1.5 rounded-full border border-electric-teal/10">{activeTab}</span>
                  <ChevronLeft className="w-3 md:w-4 h-3 md:h-4 translate-x-1" />
                  <span>مركز التحكم التشغيلي</span>
               </div>
               <h1 className="text-3xl md:text-5xl xl:text-6xl font-black text-white tracking-tighter flex items-center gap-4 md:gap-8 justify-end font-plex drop-shadow-2xl">{activeTab === 'الرئيسية' ? 'غرفة العمليات المركزية' : activeTab}</h1>
               <p className="text-gray-400 text-sm md:text-lg font-medium max-w-3xl leading-relaxed opacity-80 font-plex">نظام الحوسبة اللحظية يقوم الآن بمعالجة البيانات الضخمة لهذا القسم لضمان أفضل تجربة ممكنة.</p>
             </div>
          </div>

          <div className="animate-in fade-in slide-in-from-bottom-12 duration-1000">
            {activeTab === 'الرئيسية' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
                <div className="md:col-span-2 xl:col-span-4 h-full">
                   <div className="flex flex-col md:flex-row-reverse p-10 lg:p-14 items-center justify-between gap-8 md:gap-10 bg-[#112240]/40 rounded-[56px] border border-white/5 relative overflow-hidden group h-full shadow-2xl transition-all duration-700 hover:border-electric-teal/20">
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_100%_50%,rgba(100,255,218,0.08),transparent)] pointer-events-none" />
                      <div className="flex items-center gap-8 flex-row relative z-10 flex-col md:flex-row">
                        <div className="relative"><div className="w-24 h-24 md:w-28 md:h-28 bg-electric-teal rounded-[36px] flex items-center justify-center text-[#0A192F] shadow-[0_0_80px_rgba(100,255,218,0.4)] transition-transform group-hover:scale-110 duration-700 relative overflow-hidden"><BrainCircuit className="w-12 h-12 md:w-14 md:h-14" /></div></div>
                        <div className="text-right">
                          <h2 className="text-3xl md:text-5xl font-black text-white tracking-tighter font-plex drop-shadow-2xl">StageMind Conductor™</h2>
                          <p className="text-gray-400 text-sm md:text-xl lg:text-2xl font-medium leading-relaxed max-w-xl font-plex italic">"أهلاً بك يا محمد. القاعة جاهزة للعرض القادم، يمكنك الآن تفعيل التسعير الذكي لرفع كفاءة العوائد."</p>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-6 relative z-10 flex-row-reverse justify-center">
                        <button onClick={handleToggleDynamicPricing} className={`px-10 py-5 rounded-[24px] text-sm font-black transition-all flex items-center gap-4 font-plex shadow-xl relative overflow-hidden group/pricing active:scale-95 border ${isDynamicPricingActive ? 'bg-amber-gold text-[#0A192F] border-amber-gold/50' : 'bg-white/5 border-white/10 text-white hover:bg-white/10'}`}>
                           {isDynamicPricingActive ? <Zap className="w-5 h-5 fill-current animate-pulse" /> : <Zap className="w-5 h-5 text-amber-gold group-hover:scale-125 transition-transform" />}
                           <span className="relative z-10">{isDynamicPricingActive ? 'التسعير الديناميكي نشط' : 'تفعيل التسعير الذكي'}</span>
                        </button>
                      </div>
                   </div>
                </div>
                <div className="md:col-span-1 xl:col-span-1 h-full"><KPICard label="صافي العائد لكل مقعد" val="$242" target="$210" change="+14.2%" icon={<TrendingUp className="w-7 h-7" />} themeColor="gold" data={sparklineData} /></div>
                <div className="md:col-span-1 xl:col-span-1 h-full"><KPICard label="معدل الإشغال اللحظي" val="88.4%" target="85.0%" change="+5.1%" icon={<Users className="w-7 h-7" />} themeColor="teal" data={sparklineData} /></div>
                <div className="md:col-span-1 xl:col-span-1 h-full"><KPICard label="دقة التنبؤ اللحظي" val="96.4%" target="94.0%" change="مستقر" icon={<Target className="w-7 h-7" />} themeColor="purple" data={sparklineData} /></div>
                <div className="md:col-span-1 xl:col-span-1 h-full"><KPICard label="حالة أمان النظام" val="محصن" target="Secure" change="Active" icon={<ShieldCheck className="w-7 h-7" />} themeColor="blue" data={sparklineData} /></div>
                <div className="md:col-span-2 xl:col-span-4 glass-card p-10 md:p-14 rounded-[56px] border border-white/5 shadow-3xl text-right relative overflow-hidden">
                   <div className="flex items-center justify-between mb-12 flex-row relative z-10">
                      <div className="bg-electric-teal/10 px-4 py-2 rounded-xl border border-electric-teal/20 text-electric-teal flex items-center gap-2"><div className="w-2 h-2 bg-electric-teal rounded-full animate-pulse shadow-[0_0_8px_rgba(100,255,218,0.5)]" /><span className="text-[10px] font-black uppercase tracking-widest font-plex">AI Monitoring Live</span></div>
                      <h3 className="text-2xl md:text-3xl font-black text-white font-plex tracking-tight">لوحة المؤشرات التشغيلية</h3>
                   </div>
                   <DashboardPreview />
                </div>
              </div>
            ) : activeTab === 'تفاعل الجمهور' ? (
              renderEngagementView()
            ) : activeTab === 'تكامل البيانات' ? (
              renderDataIntegrationView()
            ) : activeTab === 'الجمهور' ? (
              renderAudienceView()
            ) : activeTab === 'الرصد المرئي' ? (
              renderLiveMonitoringView()
            ) : activeTab === 'إدارة العروض' ? (
              renderShowsView()
            ) : activeTab === 'إدارة التذاكر' ? (
              renderTicketsView()
            ) : (
              <div className="flex flex-col items-center justify-center min-h-[500px] text-center space-y-12 animate-in fade-in zoom-in duration-1000">
                <div className="relative p-16 bg-[#112240]/40 rounded-[64px] border border-white/10 backdrop-blur-3xl shadow-3xl group cursor-help">{getSectionIcon(activeTab)}</div>
                <div className="space-y-6 relative z-10">
                  <h2 className="text-5xl font-black text-white tracking-tight font-plex">{activeTab}</h2>
                  <p className="text-gray-400 max-w-2xl text-xl font-medium leading-relaxed opacity-70 font-plex">نظام الحوسبة اللحظية يقوم الآن بمعالجة البيانات الضخمة لهذا القسم. <br /><span className="text-electric-teal/60 text-sm font-bold tracking-widest uppercase mt-4 block">Analyzing Operational Nodes...</span></p>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
