import React from 'react';
import { ArrowRight, Users, Cpu, GraduationCap, ShieldCheck, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import { UserRole } from '../types';
import { useContent } from '../context/ContentContext';

const Home: React.FC = () => {
  const { content } = useContent();
  const { hero, stats, modules, announcements } = content;

  return (
    <div className="w-full overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center text-center text-white overflow-hidden py-20">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-bg">
           <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/20 via-bg to-bg opacity-50"></div>
           <div className="absolute -top-40 -right-40 w-96 h-96 bg-secondary/20 rounded-full blur-[100px] animate-pulse-slow"></div>
           <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[120px]"></div>
           
           {/* Grid overlay */}
           <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
        </div>
        
        <div className="relative z-20 max-w-6xl mx-auto px-4 flex flex-col items-center">
          <div className="animate-slide-up space-y-8 w-full">
            <div className="inline-flex items-center space-x-2 py-2 px-4 rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-secondary text-xs font-mono tracking-widest uppercase animate-float">
              <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
              <span>{hero.badge}</span>
            </div>
            
            <h1 className="text-6xl md:text-8xl font-heading font-black leading-none tracking-tighter">
              {hero.titlePrefix} <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary via-white to-accent animate-pulse-glow">{hero.titleHighlight}</span>
            </h1>
            
            <p className="text-xl text-blue-100/70 max-w-3xl mx-auto leading-relaxed font-light mb-12">
              {hero.description}
            </p>
            
            {/* PORTAL BLOCKS */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl mx-auto mt-12 perspective-1000">
              
              {/* Student Block */}
              <Link 
                to="/login" 
                state={{ role: UserRole.STUDENT }}
                className="group relative h-[280px] glass-card rounded-3xl p-1 overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-[0_0_50px_rgba(112,0,255,0.4)] hover:-translate-y-2"
              >
                <div className="absolute inset-0 bg-gradient-to-b from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative h-full bg-black/40 rounded-[22px] p-6 flex flex-col items-center justify-center border border-white/5 group-hover:border-primary/50 transition-colors">
                  <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 shadow-[0_0_20px_rgba(112,0,255,0.2)]">
                    <GraduationCap size={40} className="text-primary group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="text-xl font-bold text-white font-heading mb-1">STUDENT</h3>
                  <p className="text-gray-500 text-xs mb-4">Learning Portal</p>
                  <div className="flex items-center space-x-2 text-primary text-xs font-bold uppercase tracking-wider group-hover:text-white transition-colors">
                    <span>Access</span> <ArrowRight size={14} />
                  </div>
                </div>
              </Link>

              {/* Teacher Block */}
              <Link 
                to="/login" 
                state={{ role: UserRole.TEACHER }}
                className="group relative h-[280px] glass-card rounded-3xl p-1 overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-[0_0_50px_rgba(0,243,255,0.4)] hover:-translate-y-2"
              >
                <div className="absolute inset-0 bg-gradient-to-b from-secondary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative h-full bg-black/40 rounded-[22px] p-6 flex flex-col items-center justify-center border border-white/5 group-hover:border-secondary/50 transition-colors">
                  <div className="w-20 h-20 rounded-full bg-secondary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 shadow-[0_0_20px_rgba(0,243,255,0.2)]">
                    <User size={40} className="text-secondary group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="text-xl font-bold text-white font-heading mb-1">FACULTY</h3>
                  <p className="text-gray-500 text-xs mb-4">Staff Dashboard</p>
                  <div className="flex items-center space-x-2 text-secondary text-xs font-bold uppercase tracking-wider group-hover:text-black transition-colors">
                    <span>Access</span> <ArrowRight size={14} />
                  </div>
                </div>
              </Link>

              {/* Admin Block */}
              <Link 
                to="/login" 
                state={{ role: UserRole.ADMIN }}
                className="group relative h-[280px] glass-card rounded-3xl p-1 overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-[0_0_50px_rgba(255,0,0,0.4)] hover:-translate-y-2"
              >
                <div className="absolute inset-0 bg-gradient-to-b from-red-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative h-full bg-black/40 rounded-[22px] p-6 flex flex-col items-center justify-center border border-white/5 group-hover:border-red-500/50 transition-colors">
                  <div className="w-20 h-20 rounded-full bg-red-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 shadow-[0_0_20px_rgba(255,0,0,0.2)]">
                    <ShieldCheck size={40} className="text-red-500 group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="text-xl font-bold text-white font-heading mb-1">ADMIN</h3>
                  <p className="text-gray-500 text-xs mb-4">System Control</p>
                  <div className="flex items-center space-x-2 text-red-500 text-xs font-bold uppercase tracking-wider group-hover:text-white transition-colors">
                    <span>Access</span> <ArrowRight size={14} />
                  </div>
                </div>
              </Link>
              
            </div>
          </div>
        </div>
        
        {/* Floating Elements (Decorations) */}
        <div className="absolute top-1/3 left-10 hidden xl:block animate-float" style={{ animationDelay: '1s' }}>
           <div className="glass p-4 rounded-2xl border-l-4 border-accent">
              <Cpu size={32} className="text-accent mb-2" />
              <div className="text-xs font-mono text-gray-400">System Status</div>
              <div className="text-sm font-bold text-white">OPTIMAL</div>
           </div>
        </div>
      </section>

      {/* Announcements Ticker */}
      <div className="bg-black/40 border-y border-white/5 backdrop-blur-sm py-4 overflow-hidden relative">
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-bg to-transparent z-10"></div>
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-bg to-transparent z-10"></div>
        <div className="inline-block animate-marquee whitespace-nowrap">
           {announcements.map((ann, i) => (
             <span key={i} className="mx-12 font-mono text-sm tracking-wide text-gray-400">
               <span className="text-accent mr-2">/// NOTICE:</span> 
               <span className="text-white">{ann.title}</span> 
               <span className="mx-2 text-gray-600">-</span> 
               {ann.content}
             </span>
           ))}
        </div>
      </div>

      {/* Stats HUD Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <div key={i} className="glass-card p-6 rounded-2xl text-center group hover:bg-white/5 transition-colors duration-500 border-t border-white/5">
                <div className={`text-5xl md:text-6xl font-mono font-bold mb-2 ${i === 0 ? 'text-secondary' : i === 1 ? 'text-primary' : i === 2 ? 'text-accent' : 'text-white'} neon-text group-hover:scale-110 transition-transform duration-300`}>
                  {stat.val}
                </div>
                <div className="h-0.5 w-12 mx-auto bg-gray-700 mb-4 group-hover:bg-white transition-colors"></div>
                <div className="text-xs tracking-[0.2em] font-bold text-gray-400 group-hover:text-white transition-colors">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-4 max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-white mb-6">
            CORE <span className="text-secondary">MODULES</span>
          </h2>
          <div className="w-px h-16 bg-gradient-to-b from-secondary to-transparent mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {modules.map((item, idx) => (
            <div key={idx} className="group glass-card p-10 rounded-[2rem] hover:border-secondary/50 transition-all duration-500 hover:-translate-y-2 flex flex-col relative overflow-hidden">
               {item.type === 'profile' ? (
                 <>
                   <div className="absolute top-0 right-0 p-32 bg-yellow-400/10 blur-[60px] rounded-full pointer-events-none group-hover:bg-yellow-400/20 transition-all"></div>
                   <div className="w-24 h-24 rounded-full p-1 bg-gradient-to-br from-yellow-400 to-transparent mb-6 self-start group-hover:scale-105 transition-transform duration-500 shadow-[0_0_20px_rgba(250,204,21,0.3)]">
                      <img src={item.image} alt={item.name} className="w-full h-full rounded-full object-cover border-2 border-black" />
                   </div>
                   <h3 className="text-2xl font-bold text-white font-heading">{item.title}</h3>
                   <div className="text-yellow-400 font-mono text-sm tracking-widest uppercase mb-4 mt-1">{item.name}</div>
                   <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors text-sm">{item.desc}</p>
                 </>
               ) : (
                <>
                  <div className={`w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-white/10 transition-colors duration-300 ${idx === 1 ? 'text-primary' : 'text-accent'} shadow-[0_0_20px_rgba(0,0,0,0.2)] group-hover:shadow-[0_0_20px_rgba(255,255,255,0.1)]`}>
                     {/* Map rudimentary icons based on index since we store data as text only */}
                     {idx === 1 ? <Users size={32} /> : <Cpu size={32} />}
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4 font-heading">{item.title}</h3>
                  <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">{item.desc}</p>
                </>
               )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;