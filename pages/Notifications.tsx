import React from 'react';
import { MOCK_ANNOUNCEMENTS } from '../services/mockData';
import { Bell, Calendar, BookOpen, AlertCircle, CheckCircle } from 'lucide-react';

const Notifications: React.FC = () => {
  return (
    <div className="animate-fade-in max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-white font-heading">Notifications</h2>
          <p className="text-gray-400 text-sm mt-1">Stay updated with the latest alerts</p>
        </div>
        <button className="text-xs text-primary hover:text-white transition-colors">
          Mark all as read
        </button>
      </div>

      <div className="space-y-4">
        {/* System Alert Mock */}
        <div className="glass-card p-5 rounded-xl border-l-4 border-red-500 flex items-start space-x-4">
           <div className="p-2 bg-red-500/10 rounded-lg text-red-500">
             <AlertCircle size={24} />
           </div>
           <div className="flex-1">
             <div className="flex justify-between items-start">
               <h3 className="font-bold text-white">System Maintenance</h3>
               <span className="text-[10px] text-gray-500 font-mono">Just Now</span>
             </div>
             <p className="text-gray-400 text-sm mt-1">
               The portal will undergo scheduled maintenance tonight from 11:00 PM to 2:00 AM.
             </p>
           </div>
        </div>

        {MOCK_ANNOUNCEMENTS.map((ann) => (
          <div key={ann.id} className="glass-card p-5 rounded-xl border-l-4 border-secondary flex items-start space-x-4 hover:bg-white/5 transition-colors">
             <div className={`p-2 rounded-lg ${ann.type === 'academic' ? 'bg-blue-500/10 text-blue-400' : 'bg-purple-500/10 text-purple-400'}`}>
               {ann.type === 'academic' ? <BookOpen size={24} /> : <Calendar size={24} />}
             </div>
             <div className="flex-1">
               <div className="flex justify-between items-start">
                 <h3 className="font-bold text-white">{ann.title}</h3>
                 <span className="text-[10px] text-gray-500 font-mono">{ann.date}</span>
               </div>
               <p className="text-gray-400 text-sm mt-1">{ann.content}</p>
             </div>
          </div>
        ))}

        {/* Success Mock */}
        <div className="glass-card p-5 rounded-xl border-l-4 border-green-500 flex items-start space-x-4 opacity-75">
           <div className="p-2 bg-green-500/10 rounded-lg text-green-500">
             <CheckCircle size={24} />
           </div>
           <div className="flex-1">
             <div className="flex justify-between items-start">
               <h3 className="font-bold text-gray-300">Assignment Submitted</h3>
               <span className="text-[10px] text-gray-500 font-mono">2 Days ago</span>
             </div>
             <p className="text-gray-500 text-sm mt-1">
               Your submission for "Physics Lab Report" was successful.
             </p>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Notifications;