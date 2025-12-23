
import React, { useState } from 'react';
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
  PieChart,
  Pie
} from 'recharts';
import { 
  TrendingUp, 
  DollarSign, 
  Activity, 
  Users, 
  CheckCircle2, 
  BarChart3,
  Loader2,
  Zap,
  FileDown,
  ChevronLeft,
  Settings2,
  Info,
  Maximize2,
  MousePointer2,
  Radar
} from 'lucide-react';
import { useToast } from '../App';

type VisMode = 'overview' | 'revenue' | 'crowd';

const overviewData = [
  { name: '10:00', actual: 400, forecast: 450 },
  { name: '12:00', actual: 600, forecast: 580 },
  { name: '14:00', actual: 500, forecast: 520 },
  { name: '16:00', actual: 900, forecast: 850 },
  { name: '18:00', actual: 1200, forecast: 1100 },
  { name: '20:00', actual: 1800, forecast: 1750 },
  { name: '22:00', actual: 1400, forecast: 1500 },
];

const revenueData = [
  { category: 'VIP', amount: 4500, lift: 15 },
  { category: 'ذهبية', amount: 3200, lift: 10 },
  { category: 'فضية', amount: 2100, lift: 8 },
  { category: 'شرفة', amount: 1800, lift: 12 },
  { category: 'عادية', amount: 1200, lift: 5 },
];

const crowdFlowData = [
  { name: 'بوابة 1', flow: 120, capacity: 150 },
  { name: 'بوابة 2', flow: 85, capacity: 100 },
  { name: 'بوابة 3', flow: 40, capacity: 100 },
  { name: 'بوابة 4', flow: 110, capacity: 120 },
];

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
                  {entry.name === 'actual' ? 'الفعلي' : entry.name === 'forecast' ? 'المتوقع' : entry.name === 'flow' ? 'التدفق' : entry.name === 'capacity' ? 'السعة' : entry.payload.category}
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

const DashboardPreview: React.FC = () => {
  const [visMode, setVisMode] = useState<VisMode>('overview');
  const [isActivating, setIsActivating] = useState(false);
  const [isDynamicActive, setIsDynamicActive] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const { addToast } = useToast();

  const handleActivateDynamic = async () => {
    if (isDynamicActive) {
      setIsDynamicActive(false);
      addToast('تم إيقاف التسعير الديناميكي.', 'info');
      return;
    }
    setIsActivating(true);
    await new Promise(r => setTimeout(r, 1500));
    setIsActivating(false);
    setIsDynamicActive(true);
    addToast('تم تفعيل التسعير الديناميكي. الخوارزمية تراقب الطلب الآن.', 'success');
    setVisMode('revenue');
  };

  return (
    <div className="space-y-12">
      {/* Interactive Mode Switcher */}
      <div className="flex justify-center">
        <div className="bg-white/5 border border-white/10 p-1.5 rounded-[32px] flex gap-2">
          {[
            { id: 'overview', label: 'نظرة عامة', icon: <Activity className="w-4 h-4" /> },
            { id: 'revenue', label: 'استراتيجية الربح', icon: <DollarSign className="w-4 h-4" /> },
            { id: 'crowd', label: 'ديناميكيات الحشود', icon: <Users className="w-4 h-4" /> },
          ].map((mode) => (
            <button
              key={mode.id}
              onClick={() => setVisMode(mode.id as VisMode)}
              className={`px-8 py-3 rounded-[24px] font-black text-xs font-plex flex items-center gap-3 transition-all duration-500 ${
                visMode === mode.id 
                  ? 'bg-electric-teal text-[#0A192F] shadow-[0_10px_30px_rgba(100,255,218,0.2)]' 
                  : 'text-gray-500 hover:text-white hover:bg-white/5'
              }`}
            >
              <span className="font-plex">{mode.label}</span>
              {mode.icon}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        <div className="flex items-center justify-center">
           <button 
            onClick={handleActivateDynamic} 
            disabled={isActivating} 
            className={`group w-full h-full font-black rounded-[56px] text-sm transition-all py-10 flex flex-col items-center justify-center gap-4 shadow-2xl relative overflow-hidden active:scale-[0.97] border border-white/5 ${
              isDynamicActive 
                ? 'bg-green-500/5 border-green-500/20 text-green-500' 
                : 'bg-gradient-to-br from-electric-teal to-blue-600 text-[#0A192F] hover:shadow-[0_20px_60px_rgba(100,255,218,0.3)]'
            }`}
           >
             {isActivating ? <Loader2 className="w-12 h-12 animate-spin" /> : isDynamicActive ? (
               <> 
                <CheckCircle2 className="w-12 h-12 animate-bounce" /> 
                <span className="tracking-[0.2em] font-black uppercase text-[10px] font-plex">AI Dynamic Active</span> 
               </>
             ) : (
               <>
                <Zap className="w-12 h-12 group-hover:scale-125 transition-all duration-700 drop-shadow-2xl" />
                <span className="tracking-[0.1em] font-black text-lg font-plex">تفعيل التسعير الذكي</span>
               </>
             )}
             <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 opacity-10" />
           </button>
        </div>
        {[
          { label: 'تذاكر مباعة', val: '2,840', sub: 'سعة القاعة 3000', color: 'text-white', icon: <Activity className="w-5 h-5" />, details: 'زيادة 15% منذ الأمس' },
          { label: 'عائد اليوم', val: '+$4,210', sub: 'نمو بنسبة 12%', color: 'text-electric-teal', icon: <DollarSign className="w-5 h-5" />, details: 'أعلى عائد للفئة VIP' },
          { label: 'إشغال اللحظة', val: '88%', sub: 'مستقر تقنياً', color: 'text-white', icon: <Users className="w-5 h-5" />, details: 'توزيع متوازن للمقاعد' },
        ].map((stat, i) => (
          <div 
            key={i} 
            onMouseEnter={() => setHoveredCard(i)}
            onMouseLeave={() => setHoveredCard(null)}
            className="glass-card p-12 rounded-[56px] border border-white/5 shadow-2xl group hover:border-electric-teal/10 transition-all duration-700 hover:-translate-y-2 text-right relative overflow-hidden cursor-help"
          >
            {/* Reveal detail on hover */}
            <div className={`absolute inset-0 bg-electric-teal/[0.02] backdrop-blur-sm flex flex-col items-center justify-center p-8 transition-all duration-500 text-center ${hoveredCard === i ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-full'}`}>
               <Info className="w-8 h-8 text-electric-teal mb-4 animate-pulse" />
               <p className="text-white font-black font-plex text-lg">{stat.details}</p>
               <span className="text-[10px] text-gray-500 uppercase tracking-widest mt-2">انقر للمزيد</span>
            </div>

            <div className="flex items-center justify-between mb-8">
              <div className="p-4 bg-white/5 rounded-[22px] text-gray-500 group-hover:text-electric-teal transition-all group-hover:scale-110 border border-white/5 shadow-xl">{stat.icon}</div>
              <p className="text-[11px] text-gray-500 font-black uppercase tracking-[0.4em] font-plex">{stat.label}</p>
            </div>
            <div className="flex items-end gap-4 justify-start flex-row-reverse">
              <span className={`text-6xl font-black ${stat.color} tracking-tighter font-plex`}>{stat.val}</span>
              <span className="text-[10px] text-green-500 font-black mb-3 flex items-center gap-2 flex-row-reverse bg-green-500/10 px-3 py-1 rounded-full font-plex">
                <TrendingUp className="w-4 h-4" />
                {stat.sub}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-12 lg:gap-16">
        {/* Dynamic Chart Left */}
        <div className="glass-card p-14 rounded-[60px] border border-white/5 relative overflow-hidden group/chart shadow-3xl text-right animate-in fade-in slide-in-from-bottom-4 duration-1000">
           <div className="flex items-center justify-between mb-12 flex-row relative z-10">
              <div className="flex gap-4">
                 <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-electric-teal shadow-[0_0_8px_rgba(100,255,218,1)]" /><span className="text-[10px] text-gray-500 font-black font-plex">الحالي</span></div>
                 <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-slate-600 border border-dashed border-white/20" /><span className="text-[10px] text-gray-500 font-black font-plex">المتوقع</span></div>
              </div>
              <div>
                <h5 className="text-[10px] font-black text-gray-500 uppercase tracking-[0.4em] mb-2 opacity-60 font-plex">
                  {visMode === 'overview' ? 'محرك التنبؤ اللحظي' : visMode === 'revenue' ? 'نمذجة تحسين العائد' : 'تحليل حركة البوابات'}
                </h5>
                <h4 className="text-3xl font-black text-white tracking-tight font-plex">
                  {visMode === 'overview' ? 'توقعات الإقبال والطلب' : visMode === 'revenue' ? 'أداء التسعير اللحظي' : 'سرعة التدفق (Gate Velocity)'}
                </h4>
              </div>
           </div>
           <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                {visMode === 'overview' ? (
                  <AreaChart data={overviewData}>
                    <defs><linearGradient id="colorActual" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#64FFDA" stopOpacity={0.4}/><stop offset="95%" stopColor="#64FFDA" stopOpacity={0}/></linearGradient></defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" vertical={false} opacity={0.1} />
                    <XAxis dataKey="name" stroke="#475569" fontSize={11} fontWeight="900" tickLine={false} axisLine={false} dy={20} reversed={true} />
                    <YAxis stroke="#475569" fontSize={11} fontWeight="900" tickLine={false} axisLine={false} orientation="right" dx={20} />
                    <Tooltip content={<CustomTooltip />} />
                    <Area name="actual" type="monotone" dataKey="actual" stroke="#64FFDA" strokeWidth={5} fillOpacity={1} fill="url(#colorActual)" animationDuration={2000} />
                    <Area name="forecast" type="monotone" dataKey="forecast" stroke="#475569" strokeWidth={2} strokeDasharray="10 10" fill="transparent" animationDuration={3000} />
                  </AreaChart>
                ) : visMode === 'revenue' ? (
                  <LineChart data={overviewData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" vertical={false} opacity={0.1} />
                    <XAxis dataKey="name" stroke="#475569" fontSize={11} fontWeight="900" tickLine={false} axisLine={false} dy={20} reversed={true} />
                    <YAxis stroke="#475569" fontSize={11} fontWeight="900" tickLine={false} axisLine={false} orientation="right" dx={20} />
                    <Tooltip content={<CustomTooltip />} />
                    <Line type="stepAfter" dataKey="actual" stroke="#FFB400" strokeWidth={4} dot={{ r: 6, fill: '#FFB400' }} name="العائد" />
                  </LineChart>
                ) : (
                  <BarChart data={crowdFlowData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" vertical={false} opacity={0.1} />
                    <XAxis dataKey="name" stroke="#475569" fontSize={11} fontWeight="900" tickLine={false} axisLine={false} dy={20} reversed={true} />
                    <YAxis stroke="#475569" fontSize={11} fontWeight="900" tickLine={false} axisLine={false} orientation="right" dx={20} />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="flow" fill="#64FFDA" radius={[10, 10, 0, 0]} name="تدفق" />
                    <Bar dataKey="capacity" fill="#1E293B" radius={[10, 10, 0, 0]} name="سعة" />
                  </BarChart>
                )}
              </ResponsiveContainer>
           </div>
        </div>

        {/* Dynamic Insight Right */}
        <div className="glass-card p-14 rounded-[60px] border border-white/5 relative overflow-hidden group/chart shadow-3xl text-right animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-200">
           <div className="flex items-center justify-between mb-12 flex-row relative z-10">
              <div className="bg-amber-gold/5 p-4 rounded-2xl border border-amber-gold/15">
                {visMode === 'overview' ? <BarChart3 className="w-8 h-8 text-amber-gold" /> : visMode === 'revenue' ? <Radar className="w-8 h-8 text-amber-gold animate-spin-slow" /> : <MousePointer2 className="w-8 h-8 text-amber-gold" />}
              </div>
              <div>
                <h5 className="text-[10px] font-black text-gray-500 uppercase tracking-[0.4em] mb-2 opacity-60 font-plex">
                  {visMode === 'overview' ? 'توزيع العوائد اللحظية' : visMode === 'revenue' ? 'مصفوفة ذكاء الأسعار' : 'نقاط التفاعل الساخنة'}
                </h5>
                <h4 className="text-3xl font-black text-white tracking-tight font-plex">
                  {visMode === 'overview' ? 'الإيرادات حسب الفئة' : visMode === 'revenue' ? 'تحليل الرفع الربحي (Lift)' : 'إشغال المناطق (Heatmap)'}
                </h4>
              </div>
           </div>
           <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                {visMode === 'overview' ? (
                  <BarChart data={revenueData} layout="vertical" margin={{ right: 40, left: 40 }}>
                    <XAxis type="number" hide /><YAxis dataKey="category" type="category" stroke="#475569" fontSize={13} fontWeight="900" tickLine={false} axisLine={false} width={100} orientation="right" /><Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(100, 255, 218, 0.03)' }} />
                    <Bar dataKey="amount" radius={[20, 0, 0, 20]} animationDuration={2500}>{revenueData.map((_, idx) => (<Cell key={`cell-${idx}`} fill={idx === 0 ? '#FFB400' : '#64FFDA'} fillOpacity={1 - (idx * 0.15)} />))}</Bar>
                  </BarChart>
                ) : visMode === 'revenue' ? (
                  <BarChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" vertical={false} opacity={0.1} />
                    <XAxis dataKey="category" stroke="#475569" fontSize={11} fontWeight="900" tickLine={false} axisLine={false} dy={20} reversed={true} />
                    <YAxis stroke="#475569" fontSize={11} fontWeight="900" tickLine={false} axisLine={false} orientation="right" dx={20} />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="lift" fill="#FFB400" radius={[15, 15, 0, 0]} name="النمو المتوقع %" />
                  </BarChart>
                ) : (
                  <div className="w-full h-full flex items-center justify-center p-12">
                     <div className="relative w-64 h-64 border-4 border-dashed border-white/5 rounded-full flex items-center justify-center group/radar">
                        <div className="absolute inset-0 bg-electric-teal/5 rounded-full animate-pulse" />
                        <div className="relative z-10 text-center">
                          <Users className="w-12 h-12 text-electric-teal mx-auto mb-4" />
                          <p className="text-white font-black text-xl font-plex">منطقة الاستراحة</p>
                          <p className="text-amber-gold font-bold text-sm">إشغال 92%</p>
                        </div>
                        {/* Interactive floating point */}
                        <div className="absolute top-10 right-10 w-4 h-4 bg-red-500 rounded-full animate-ping" />
                        <div className="absolute bottom-10 left-10 w-3 h-3 bg-electric-teal rounded-full" />
                     </div>
                  </div>
                )}
              </ResponsiveContainer>
           </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-10 items-center justify-between pt-16 border-t border-white/5 opacity-40 hover:opacity-100 transition-opacity duration-1000">
        <div className="flex gap-12 flex-row">
          <button className="text-[11px] font-black text-gray-600 hover:text-white transition-colors font-plex">إدارة أذونات العرض</button>
          <button className="text-[11px] font-black text-electric-teal hover:text-white transition-all flex items-center gap-4 flex-row group font-plex"><FileDown className="w-5 h-5 group-hover:translate-y-[-2px] transition-transform" /><span>تحميل تقرير الحالة اللحظي</span><ChevronLeft className="w-4 h-4 translate-x-[-2px]" /></button>
        </div>
        <div className="flex items-center gap-6 text-[10px] text-gray-500 font-black uppercase tracking-[0.5em] flex-row font-plex"><span>StageMind Mission Control OS • Security Active</span><Settings2 className="w-5 h-5 text-electric-teal" /></div>
      </div>
    </div>
  );
};

export default DashboardPreview;
