
import React from 'react';
import { FEATURES } from '../constants';

interface FeaturesProps {
  onExploreProduct?: () => void;
}

const Features: React.FC<FeaturesProps> = ({ onExploreProduct }) => {
  return (
    <section id="features" className="py-24 bg-slate-900/30">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center mb-20">
          <h2 className="text-3xl md:text-5xl font-black mb-6">الميزات الرئيسية (The Big 5)</h2>
          <p className="text-lg text-gray-400">
            وداعاً لمدير التشغيل الذي يحمل اللاسلكي بيد.. وجدول الإكسل باليد الأخرى! 😄
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {FEATURES.map((feature, index) => (
            <div 
              key={index} 
              className="group p-8 bg-[#112240] rounded-3xl border border-slate-800 hover:border-electric-teal/30 transition-all cursor-pointer"
              onClick={onExploreProduct}
            >
              <div className="w-14 h-14 bg-electric-teal/10 rounded-2xl flex items-center justify-center text-electric-teal mb-8 group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white">{feature.name}</h3>
              <p className="text-gray-400 leading-relaxed mb-6">{feature.benefit}</p>
              <div className="w-12 h-1 bg-slate-800 group-hover:w-full transition-all duration-500 group-hover:bg-electric-teal" />
            </div>
          ))}
          
          <div className="p-8 bg-amber-gold/5 rounded-3xl border border-amber-gold/20 flex flex-col justify-center items-center text-center">
            <h3 className="text-xl font-bold text-amber-gold mb-4">هل تحتاج ميزات مخصصة؟</h3>
            <p className="text-gray-400 mb-8">نحن نطور حلولاً مخصصة لكبرى دور الأوبرا والمسارح الحكومية.</p>
            <button 
              onClick={onExploreProduct}
              className="text-amber-gold font-bold border-b-2 border-amber-gold hover:opacity-80 transition-opacity"
            >
              استعرض التفاصيل التقنية
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
