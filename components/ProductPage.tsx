
import React from 'react';
import { 
  ArrowRight, 
  Cpu, 
  Database, 
  Zap, 
  Layers,
  Sparkles,
  TrendingUp,
  Users,
  Map,
  Target,
  ShieldCheck,
  MousePointer2,
  BarChart3
} from 'lucide-react';

interface ProductPageProps {
  onBack: () => void;
  onBookDemo: () => void;
}

const ProductPage: React.FC<ProductPageProps> = ({ onBack, onBookDemo }) => {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000 bg-[#0A192F] min-h-screen">
      {/* Back Button */}
      <section className="pt-12 pb-8">
        <div className="container mx-auto px-6">
          <button 
            onClick={onBack}
            className="group flex items-center gap-3 text-gray-500 hover:text-electric-teal transition-all duration-300"
          >
            <div className="w-10 h-10 rounded-full border border-slate-800 flex items-center justify-center group-hover:border-electric-teal group-hover:bg-electric-teal/10 transition-all">
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </div>
            <span className="text-sm font-black uppercase tracking-widest font-plex">العودة للمنصة الرئيسية</span>
          </button>
        </div>
      </section>

      {/* Hero Section: How it Works */}
      <section className="py-24 relative overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl text-right mb-24">
            <h1 className="text-5xl md:text-8xl font-black mb-10 leading-[1.1] text-white font-plex">
              كيف يعمل <br />
              <span className="text-electric-teal">StageMind Conductor؟</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-400 leading-relaxed max-w-3xl">
              نحن لا نستبدل مدير المسرح، بل نمنحه "حواس خوارزمية" خارقة. نظامنا يعمل كطبقة ذكية فوق بنيتك التحتية الحالية ليحول البيانات الخام إلى قرارات تشغيلية ذهبية.
            </p>
          </div>

          {/* Step by Step Visual */}
          <div className="grid md:grid-cols-4 gap-8 relative">
            <div className="absolute top-1/2 left-0 right-0 h-px bg-slate-800 hidden md:block z-0" />
            {[
              { t: "الربط الرقمي", d: "مزامنة لحظية مع بوابات التذاكر وأنظمة الدخول.", i: <Database /> },
              { t: "المعالجة السحابية", d: "تحليل الأنماط التاريخية والطلب الآني.", i: <Cpu /> },
              { t: "التوليد الذكي", d: "توليد توصيات التسعير وخطط التدفق.", i: <Sparkles /> },
              { t: "التنفيذ الميداني", d: "إرسال التنبيهات لفريق التشغيل والمنظمين.", i: <MousePointer2 /> }
            ].map((step, i) => (
              <div key={i} className="relative z-10 bg-[#0F172A] p-10 rounded-[40px] border border-slate-800 text-right group hover:border-electric-teal/40 transition-all">
                <div className="w-14 h-14 bg-electric-teal/10 rounded-2xl flex items-center justify-center text-electric-teal mb-8 group-hover:scale-110 transition-transform">
                  {step.i}
                </div>
                <h3 className="text-xl font-black text-white mb-4 font-plex">{step.t}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{step.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Deep Dive Sections */}
      <section className="py-32 space-y-32">
        {/* Dynamic Pricing */}
        <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-20 items-center">
          <div className="text-right space-y-8 order-2 lg:order-1">
            <div className="inline-flex items-center gap-3 px-4 py-2 bg-amber-gold/10 rounded-full border border-amber-gold/20">
              <TrendingUp className="w-4 h-4 text-amber-gold" />
              <span className="text-[10px] font-black text-amber-gold uppercase tracking-widest font-plex">التسعير الديناميكي</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-white leading-tight font-plex">لا تترك مقعداً <br /> <span className="text-amber-gold">فارغاً أبداً.</span></h2>
            <p className="text-xl text-gray-400 leading-relaxed">
              خوارزمية StageMind تراقب سرعة البيع والطلب المتبقي لتقوم بتعديل الأسعار لحظياً. ارفع السعر في أوقات الذروة لتعظيم العائد، وقدم خصومات "اللحظة الأخيرة" الذكية لضمان الإشغال الكامل.
            </p>
            <ul className="space-y-4">
              {["تحليل سرعة الحجز (Velocity Analytics)", "خرائط حرارية للطلب على المقاعد", "تغيير آلي للأسعار بناءً على القواعد"].map((item, i) => (
                <li key={i} className="flex items-center gap-3 justify-end text-gray-300 font-bold">
                  <span>{item}</span>
                  <div className="w-2 h-2 rounded-full bg-amber-gold" />
                </li>
              ))}
            </ul>
          </div>
          <div className="glass-card p-10 rounded-[56px] border border-white/5 order-1 lg:order-2 bg-gradient-to-br from-amber-gold/5 to-transparent">
             <div className="aspect-video bg-black/40 rounded-[32px] flex items-center justify-center overflow-hidden border border-white/5 relative">
                <div className="absolute inset-0 flex flex-col items-center justify-center p-12 text-center">
                  <BarChart3 className="w-20 h-20 text-amber-gold/20 mb-6" />
                  <p className="text-gray-500 font-plex font-bold">معاينه خوارزمية الربحية اللحظية</p>
                </div>
             </div>
          </div>
        </div>

        {/* Audience Forecasting */}
        <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-20 items-center">
          <div className="glass-card p-10 rounded-[56px] border border-white/5 bg-gradient-to-br from-purple-500/5 to-transparent">
             <div className="aspect-video bg-black/40 rounded-[32px] flex items-center justify-center overflow-hidden border border-white/5">
                <Target className="w-20 h-20 text-purple-400/20" />
             </div>
          </div>
          <div className="text-right space-y-8">
            <div className="inline-flex items-center gap-3 px-4 py-2 bg-purple-500/10 rounded-full border border-purple-500/20">
              <Users className="w-4 h-4 text-purple-400" />
              <span className="text-[10px] font-black text-purple-400 uppercase tracking-widest font-plex">توقعات الجمهور</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-white leading-tight font-plex">اعرف حجم جمهورك <br /> <span className="text-purple-400">قبل أسبوع من العرض.</span></h2>
            <p className="text-xl text-gray-400 leading-relaxed">
              نستخدم التعلم الآلي للتنبؤ بنسبة الإشغال بناءً على نوع العرض، التاريخ، وحالة الطقس، وحتى الفعاليات المنافسة في المدينة. جهز فريقك اللوجستي بناءً على أرقام حقيقية، لا تخمينات.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/5 p-6 rounded-3xl border border-white/5">
                <p className="text-2xl font-black text-white font-plex">96.4%</p>
                <p className="text-[10px] text-gray-500 font-bold font-plex">دقة التنبؤ القياسية</p>
              </div>
              <div className="bg-white/5 p-6 rounded-3xl border border-white/5">
                <p className="text-2xl font-black text-white font-plex">7 أيام</p>
                <p className="text-[10px] text-gray-500 font-bold font-plex">نافذة التوقع الاستباقي</p>
              </div>
            </div>
          </div>
        </div>

        {/* Crowd Management */}
        <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-20 items-center">
          <div className="text-right space-y-8 order-2 lg:order-1">
            <div className="inline-flex items-center gap-3 px-4 py-2 bg-electric-teal/10 rounded-full border border-electric-teal/20">
              <Map className="w-4 h-4 text-electric-teal" />
              <span className="text-[10px] font-black text-electric-teal uppercase tracking-widest font-plex">إدارة الحشود</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-white leading-tight font-plex">انسيابية كاملة <br /> <span className="text-electric-teal">بلا اختناقات.</span></h2>
            <p className="text-xl text-gray-400 leading-relaxed">
              راقب تدفق الجمهور عند البوابات والردهات لحظة بلحظة. يقوم النظام بتنبيه المنظمين فوراً عند توقع أي تكدس، ويقترح فتح مسارات بديلة لضمان تجربة دخول مريحة تليق بمؤسستك الثقافية.
            </p>
            <button onClick={onBookDemo} className="bg-white text-[#0A192F] px-10 py-4 rounded-2xl font-black text-sm hover:scale-105 transition-all font-plex">استعراض نظام التدفق</button>
          </div>
          <div className="glass-card p-10 rounded-[56px] border border-white/5 bg-gradient-to-br from-electric-teal/5 to-transparent order-1 lg:order-2">
             <div className="aspect-video bg-black/40 rounded-[32px] flex items-center justify-center overflow-hidden border border-white/5">
                <ShieldCheck className="w-20 h-20 text-electric-teal/20" />
             </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-40">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-7xl font-black text-white mb-10 font-plex">جاهز لتحويل مسرحك؟</h2>
          <button 
            onClick={onBookDemo}
            className="bg-electric-teal text-[#0A192F] px-16 py-7 rounded-[28px] font-black text-xl hover:shadow-[0_0_60px_rgba(100,255,218,0.4)] transition-all font-plex"
          >
            احجز عرضاً تجريبياً حياً الآن
          </button>
        </div>
      </section>
    </div>
  );
};

export default ProductPage;
