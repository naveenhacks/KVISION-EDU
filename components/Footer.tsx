import React from 'react';
import { Mail, Phone, MapPin, Globe, ExternalLink, Heart, Code } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="relative bg-black/40 border-t border-white/5 pt-16 pb-8 backdrop-blur-md overflow-hidden z-20">
      {/* Glow effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-12">
          
          {/* Brand & School Info */}
          <div className="lg:col-span-5 space-y-6">
             <div className="space-y-2">
                <h3 className="text-2xl md:text-3xl font-heading font-bold text-white">केन्द्रीय विद्यालय उन्नाव</h3>
                <h4 className="text-lg text-secondary font-heading font-semibold">Kendriya Vidyalaya Unnao</h4>
                <div className="inline-block px-3 py-1 bg-white/5 rounded-lg border border-white/10 text-xs text-gray-300 font-mono mt-2">
                  केन्द्रीय विद्यालय संगठन, लखनऊ संभाग
                </div>
             </div>
             
             <div className="flex items-start space-x-4 text-gray-400 group p-4 rounded-xl bg-white/5 border border-white/5 hover:border-primary/30 transition-all">
                <div className="mt-1 bg-primary/10 p-2 rounded-lg text-primary">
                  <MapPin size={20} />
                </div>
                <div className="leading-relaxed text-sm">
                  <p className="font-bold text-gray-200">School Address:</p>
                  <p>दही चौकी उन्नाव 209801</p>
                  <p>Dahi Chowki, Unnao, 209801</p>
                  <p className="mt-1 text-accent">राज्य: उत्तर प्रदेश (Uttar Pradesh)</p>
                </div>
             </div>
          </div>

          {/* Contact Links */}
          <div className="lg:col-span-4 space-y-6">
            <h4 className="text-lg font-bold text-white font-heading border-l-4 border-secondary pl-3">Contact Information</h4>
            <ul className="space-y-4">
              <li>
                <a href="tel:05152829306" className="flex items-center space-x-4 text-gray-400 hover:text-white focus:text-white active:text-white visited:text-gray-400 group transition-all p-3 rounded-xl hover:bg-white/5">
                  <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-primary/20 group-hover:text-white group-hover:border-primary/50 transition-all text-secondary">
                    <Phone size={18} />
                  </div>
                  <div>
                    <span className="text-xs block text-gray-500 uppercase tracking-wider group-hover:text-gray-300 transition-colors">Phone</span>
                    <span className="text-sm font-mono font-bold group-hover:text-white transition-colors">0515 282 9306</span>
                  </div>
                </a>
              </li>
              <li>
                <a href="mailto:kvunnao85@gmail.com" className="flex items-center space-x-4 text-gray-400 hover:text-white focus:text-white active:text-white visited:text-gray-400 group transition-all p-3 rounded-xl hover:bg-white/5">
                  <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-primary/20 group-hover:text-white group-hover:border-primary/50 transition-all text-secondary">
                    <Mail size={18} />
                  </div>
                  <div>
                    <span className="text-xs block text-gray-500 uppercase tracking-wider group-hover:text-gray-300 transition-colors">Email</span>
                    <span className="text-sm font-bold group-hover:text-white transition-colors">kvunnao85@gmail.com</span>
                  </div>
                </a>
              </li>
              <li>
                <a href="https://unnao.kvs.ac.in/" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-4 text-gray-400 hover:text-white focus:text-white active:text-white visited:text-gray-400 group transition-all p-3 rounded-xl hover:bg-white/5">
                  <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-primary/20 group-hover:text-white group-hover:border-primary/50 transition-all text-secondary">
                    <Globe size={18} />
                  </div>
                  <div className="flex-1">
                    <span className="text-xs block text-gray-500 uppercase tracking-wider group-hover:text-gray-300 transition-colors">Official Website</span>
                    <span className="text-sm font-bold group-hover:text-white transition-colors">unnao.kvs.ac.in</span>
                  </div>
                  <ExternalLink size={14} className="opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                </a>
              </li>
            </ul>
          </div>

          {/* Developer Credit */}
          <div className="lg:col-span-3 space-y-6">
             <h4 className="text-lg font-bold text-white font-heading border-l-4 border-accent pl-3">Tech Partner</h4>
             <a 
               href="https://naveenrajpoot-portfolio.vercel.app/" 
               target="_blank" 
               rel="noopener noreferrer"
               className="block glass-card p-6 rounded-2xl border border-white/10 hover:border-accent/50 transition-all duration-300 group hover:shadow-[0_0_20px_rgba(255,0,170,0.2)] cursor-pointer"
             >
                <div className="flex items-center justify-between mb-4">
                  <Code size={24} className="text-accent" />
                  <span className="text-[10px] text-gray-500 font-mono uppercase border border-white/10 px-2 py-1 rounded">Dev Profile</span>
                </div>
                <p className="text-xs text-gray-400 font-mono uppercase tracking-widest mb-1">Powered By</p>
                <h5 className="text-xl font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-accent group-hover:to-purple-500 transition-all">
                  Naveen Rajpoot
                </h5>
                <p className="text-xs text-gray-500 mt-2 leading-relaxed">
                  Innovative Educational Solutions & High-Performance UI Design.
                </p>
             </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-500 font-mono text-center md:text-left">
            &copy; {new Date().getFullYear()} Kendriya Vidyalaya Unnao. All rights reserved.
          </p>
          
          <div className="flex items-center space-x-2 text-xs text-gray-500 bg-black/30 px-4 py-2 rounded-full border border-white/5">
            <span>Made with</span>
            <Heart size={10} className="text-red-500 fill-red-500 animate-pulse" />
            <span>by</span>
            <a 
              href="https://naveenrajpoot-portfolio.vercel.app/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-white font-bold hover:text-secondary cursor-pointer transition-colors"
            >
              Naveen Rajpoot
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;