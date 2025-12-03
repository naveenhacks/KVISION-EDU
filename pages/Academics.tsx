import React from 'react';
import { Book, Clock, Award, Star, Zap, Activity } from 'lucide-react';
import { useContent } from '../context/ContentContext';

const Academics: React.FC = () => {
  const { content } = useContent();
  const { academics } = content;

  return (
    <div className="min-h-screen pt-12 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-white tracking-tight">
             {academics.tagline.split(' ')[0]} <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-primary">{academics.tagline.split(' ').slice(1).join(' ')}</span>
          </h1>
          <p className="mt-4 text-xl text-gray-400 font-light">{academics.subTagline}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {academics.levels.map((level, idx) => {
            // Map icons based on index
            const Icon = idx === 0 ? Star : idx === 1 ? Zap : Award;
            const borderColor = idx === 0 ? 'border-primary' : idx === 1 ? 'border-secondary' : 'border-accent';
            const iconColor = idx === 0 ? 'text-primary' : idx === 1 ? 'text-secondary' : 'text-accent';
            const iconBg = idx === 0 ? 'bg-primary/20' : idx === 1 ? 'bg-secondary/20' : 'bg-accent/20';
            const shadowColor = idx === 0 ? 'rgba(112,0,255,0.3)' : idx === 1 ? 'rgba(0,243,255,0.3)' : 'rgba(255,0,170,0.3)';

            return (
              <div key={level.id} className={`glass-card p-8 rounded-3xl hover:-translate-y-2 transition-transform duration-500 border-t-2 ${borderColor} group`}>
                <div className={`w-14 h-14 ${iconBg} rounded-2xl flex items-center justify-center mb-6 ${iconColor} border border-white/5 group-hover:shadow-[0_0_20px_${shadowColor}] transition-all`}>
                  <Icon size={28} />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white">{level.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {level.description}
                </p>
              </div>
            );
          })}
        </div>

        <div className="glass-card rounded-[2rem] overflow-hidden flex flex-col md:flex-row border border-white/5">
            <div className="md:w-1/2 p-10 md:p-14 flex flex-col justify-center">
                <h3 className="text-3xl font-bold text-white mb-6">Evaluation Protocols</h3>
                <p className="text-gray-400 mb-8 leading-relaxed whitespace-pre-wrap">
                    {academics.evaluationText}
                </p>
                <div className="space-y-4">
                    <div className="flex items-center text-sm text-gray-300 p-3 rounded-xl bg-white/5 border border-white/5">
                        <Activity className="text-secondary mr-3" size={18} />
                        Continuous Comprehensive Evaluation (CCE)
                    </div>
                    <div className="flex items-center text-sm text-gray-300 p-3 rounded-xl bg-white/5 border border-white/5">
                        <Book className="text-primary mr-3" size={18} />
                        Project-Based Learning (PBL) v2.0
                    </div>
                    <div className="flex items-center text-sm text-gray-300 p-3 rounded-xl bg-white/5 border border-white/5">
                        <Clock className="text-accent mr-3" size={18} />
                        Synchronous Feedback Loops
                    </div>
                </div>
            </div>
            <div className="md:w-1/2 relative min-h-[400px]">
                <img src="https://picsum.photos/800/600?random=10&grayscale" alt="Classroom" className="w-full h-full object-cover absolute inset-0 mix-blend-overlay opacity-60" />
                <div className="absolute inset-0 bg-gradient-to-l from-bg to-transparent"></div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Academics;