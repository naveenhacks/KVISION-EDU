import React from 'react';

const About: React.FC = () => {
  return (
    <div className="min-h-screen pt-20 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-heading font-bold text-white mb-6">About <span className="text-secondary">KVISION</span></h1>
          <p className="text-lg text-gray-400 font-mono tracking-wide">EST. 1998 // UPGRADED FOR 2025</p>
        </div>

        <div className="glass-card p-8 md:p-12 rounded-[2rem] border-white/10 shadow-2xl space-y-12">
          
          <section>
            <h2 className="text-2xl font-bold text-white mb-4 border-l-4 border-primary pl-4">Our History</h2>
            <p className="text-gray-300 leading-relaxed">
              Founded in 1998, KVISION Academy started with a simple mission: to provide education that bridges the gap between traditional values and modern technology. 
              From a humble beginning with just 50 students, we have evolved into a premier tech-integrated institution with over 1500 students and next-generation learning facilities.
            </p>
          </section>

          <section className="bg-white/5 rounded-2xl p-8 border border-white/5">
            <h2 className="text-2xl font-bold text-white mb-6">Principal's Message</h2>
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="relative">
                 <div className="absolute inset-0 bg-secondary blur-lg opacity-20 rounded-full"></div>
                 <img src="https://picsum.photos/id/64/200/200" alt="Principal" className="w-32 h-32 rounded-full object-cover shadow-lg border-2 border-secondary relative z-10" />
              </div>
              <blockquote className="italic text-gray-400 border-l-2 border-white/10 pl-6">
                "At KVISION, we treat education as an operating system update for the human mind. Our goal is to install critical thinking, compile creativity, and execute success."
                <footer className="text-sm font-bold text-secondary mt-4 not-italic font-mono uppercase">- Dr. Robert Anderson, Principal</footer>
              </blockquote>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-6 border-l-4 border-accent pl-4">System Achievements</h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <li className="flex items-center space-x-3 bg-black/20 p-4 rounded-xl border border-white/5">
                <span className="w-2 h-2 bg-accent rounded-full animate-pulse"></span>
                <span className="text-gray-300 text-sm">#1 in Regional Robotics</span>
              </li>
              <li className="flex items-center space-x-3 bg-black/20 p-4 rounded-xl border border-white/5">
                <span className="w-2 h-2 bg-accent rounded-full animate-pulse"></span>
                <span className="text-gray-300 text-sm">Best Digital Campus 2023</span>
              </li>
              <li className="flex items-center space-x-3 bg-black/20 p-4 rounded-xl border border-white/5">
                <span className="w-2 h-2 bg-accent rounded-full animate-pulse"></span>
                <span className="text-gray-300 text-sm">100% University Acceptance</span>
              </li>
              <li className="flex items-center space-x-3 bg-black/20 p-4 rounded-xl border border-white/5">
                <span className="w-2 h-2 bg-accent rounded-full animate-pulse"></span>
                <span className="text-gray-300 text-sm">National Coding Champions</span>
              </li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
};

export default About;