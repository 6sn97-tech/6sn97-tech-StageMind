
import React, { useEffect, useState } from 'react';
import { Brain, Activity, Menu, X, Radio } from 'lucide-react';
import { ViewType } from '../App';

interface HeaderProps {
  onBookDemo: () => void;
  onNavigate: (view: ViewType) => void;
  currentView: ViewType;
}

const Header: React.FC<HeaderProps> = ({ onBookDemo, onNavigate, currentView }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems: { label: string; view: ViewType }[] = [
    { label: 'المنتج', view: 'product' },
    { label: 'الحلول', view: 'solutions' },
    { label: 'الميزات', view: 'features' },
    { label: 'الأسعار', view: 'pricing' },
  ];

  const handleNavClick = (view: ViewType) => {
    onNavigate(view);
    setIsMobileMenuOpen(false);
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-[150] transition-all duration-700 ease-[cubic-bezier(0.2,0,0,1)] border-b ${
        isScrolled 
          ? 'bg-[#0A192F]/80 backdrop-blur-xl border-white/5 py-3 shadow-[0_10px_40px_rgba(0,0,0,0.4)]' 
          : 'bg-transparent border-transparent py-8'
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <button 
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-4 group"
          >
            <div className={`p-3 rounded-[22px] transition-all duration-500 ${isScrolled ? 'bg-indigo-500/10' : 'bg-indigo-500/20'} group-hover:scale-110 group-hover:bg-indigo-500/30 shadow-lg group-hover:shadow-indigo-500/30 border border-white/5 relative overflow-hidden`}>
              <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
              <Brain className="text-indigo-400 w-8 h-8 relative z-10" />
            </div>
            <div className="flex flex-col items-start justify-center">
              <div className="flex items-center gap-3">
                <span className="text-2xl md:text-4xl font-black tracking-tighter text-white font-plex">StageMind</span>
                <div className="relative flex items-center">
                   <div className="absolute -inset-2 bg-indigo-500/20 blur-lg rounded-full opacity-0 group-hover:opacity-100 transition-opacity animate-pulse" />
                   <span className="text-[12px] md:text-[14px] font-black text-indigo-400 px-3 py-1 bg-indigo-500/10 border border-indigo-500/30 rounded-lg shadow-[0_0_25px_rgba(99,102,241,0.2)] transition-all duration-500 group-hover:bg-indigo-500/20 group-hover:scale-110 group-hover:border-indigo-500/50 font-plex flex items-center justify-center tracking-widest">AI</span>
                </div>
              </div>
              <span className={`text-[7px] font-black uppercase tracking-[0.6em] text-gray-500 transition-all duration-700 ${isScrolled ? 'opacity-100 translate-y-0.5' : 'opacity-0 -translate-y-2 h-0 overflow-hidden'}`}>
                Conductor™ OS
              </span>
            </div>
          </button>
          
          <div className={`hidden lg:flex items-center gap-3 px-4 py-1.5 rounded-full transition-all duration-700 ${isScrolled ? 'bg-white/5 border-white/5 opacity-60' : 'bg-green-500/10 border-green-500/20'} border group cursor-help`}>
            <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.5)]" />
            <span className="text-[10px] font-black text-green-500 uppercase tracking-[0.2em] font-plex">Operational Engine</span>
          </div>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-10">
          {navItems.map((item) => (
            <button 
              key={item.view}
              onClick={() => handleNavClick(item.view)}
              className={`text-sm font-bold transition-all relative py-2 px-1 hover:text-white group font-plex ${
                currentView === item.view ? 'text-indigo-400' : 'text-gray-400'
              }`}
            >
              {item.label}
              <span className={`absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-500 rounded-full transition-all duration-500 ${
                currentView === item.view ? 'opacity-100 shadow-[0_0_10px_rgba(99,102,241,0.5)]' : 'opacity-0 scale-x-0 group-hover:opacity-30 group-hover:scale-x-100'
              }`} />
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-6">
          <button 
            onClick={() => handleNavClick('login')}
            className={`hidden sm:block text-sm font-black transition-colors py-2 font-plex ${isScrolled ? 'text-gray-500 hover:text-white' : 'text-gray-400 hover:text-white'}`}
          >
            دخول الأعضاء
          </button>
          <button 
            onClick={onBookDemo}
            className={`relative overflow-hidden px-8 py-3.5 rounded-2xl text-sm font-black transition-all active:scale-95 group font-plex ${
              isScrolled 
                ? 'bg-white/5 text-white border border-white/10 hover:bg-white/10 shadow-lg' 
                : 'bg-gradient-to-r from-indigo-500 to-violet-600 text-white hover:shadow-[0_10px_30px_rgba(99,102,241,0.4)]'
            }`}
          >
            <span className="relative z-10">احجز تجربة حية</span>
            {!isScrolled && <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />}
          </button>
          
          <button 
            className="md:hidden text-gray-300 hover:text-white p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="fixed inset-0 top-[70px] bg-[#0A192F]/98 backdrop-blur-3xl z-[200] md:hidden animate-in fade-in slide-in-from-top-4 duration-500">
           <div className="p-10 flex flex-col gap-8 text-right">
              {navItems.map((item) => (
                <button 
                  key={item.view}
                  onClick={() => handleNavClick(item.view)}
                  className={`text-3xl font-black font-plex ${currentView === item.view ? 'text-indigo-400' : 'text-white'}`}
                >
                  {item.label}
                </button>
              ))}
              <div className="h-px bg-white/5 my-4" />
              <button 
                onClick={() => handleNavClick('login')}
                className="text-xl font-black text-gray-500 font-plex"
              >
                تسجيل الدخول
              </button>
              <button 
                onClick={onBookDemo}
                className="bg-indigo-500 text-white py-6 rounded-[28px] text-xl font-black shadow-2xl shadow-indigo-500/20 font-plex active:scale-95 transition-all"
              >
                احجز عرض تجريبي
              </button>
           </div>
        </div>
      )}
    </header>
  );
};

export default Header;
