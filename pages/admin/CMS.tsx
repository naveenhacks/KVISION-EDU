import React, { useState } from 'react';
import { useContent } from '../../context/ContentContext';
import { Save, Plus, Trash, RefreshCw, Edit3 } from 'lucide-react';
import toast from 'react-hot-toast';

const CMS: React.FC = () => {
  const { 
    content, 
    updateHero, 
    updateStat, 
    updateModule, 
    updateAbout,
    updateAcademics,
    updateAcademicLevel,
    addAnnouncement, 
    deleteAnnouncement, 
    resetToDefaults 
  } = useContent();
  const [activeTab, setActiveTab] = useState<'hero' | 'stats' | 'modules' | 'about' | 'academics' | 'notices'>('hero');
  
  // Local state for new announcement
  const [newNotice, setNewNotice] = useState({ title: '', content: '', type: 'general' as const });

  const handleHeroUpdate = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    updateHero({ [e.target.name]: e.target.value });
  };

  const handleAboutUpdate = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    updateAbout({ [e.target.name]: e.target.value });
  };
  
  const handleAchievementUpdate = (index: number, value: string) => {
    const newAchievements = [...content.about.achievements];
    newAchievements[index] = value;
    updateAbout({ achievements: newAchievements });
  };

  const handleAcademicsUpdate = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    updateAcademics({ [e.target.name]: e.target.value });
  };

  const handleAddNotice = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNotice.title || !newNotice.content) return;
    addAnnouncement({
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9), // Ensure unique ID
      title: newNotice.title,
      content: newNotice.content,
      type: newNotice.type,
      date: new Date().toISOString().split('T')[0]
    });
    setNewNotice({ title: '', content: '', type: 'general' });
    toast.success('Announcement published successfully');
  };

  return (
    <div className="animate-fade-in space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white font-heading">Site Editor (CMS)</h2>
          <p className="text-gray-400 text-sm">Manage public facing content and announcements.</p>
        </div>
        <button 
          onClick={() => {
            if(window.confirm('Reset all content to original defaults?')) {
              resetToDefaults();
              toast.success('Content reset to defaults');
            }
          }}
          className="flex items-center space-x-2 text-xs text-red-400 hover:text-red-300 border border-red-500/30 px-3 py-2 rounded-lg transition-colors hover:bg-red-500/10"
        >
          <RefreshCw size={14} /> <span>Reset Defaults</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-white/5 p-1 rounded-xl w-full md:w-auto overflow-x-auto custom-scrollbar">
        {['hero', 'stats', 'modules', 'about', 'academics', 'notices'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as any)}
            className={`px-4 py-2 rounded-lg text-sm font-bold capitalize transition-all whitespace-nowrap ${
              activeTab === tab ? 'bg-primary text-white shadow-lg' : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="glass-card p-6 md:p-8 rounded-2xl">
        
        {/* HERO EDITOR */}
        {activeTab === 'hero' && (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-white border-b border-white/5 pb-4">Hero Section Configuration</h3>
            <div className="grid gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase">Top Badge Text</label>
                <input 
                  type="text" 
                  name="badge"
                  value={content.hero.badge}
                  onChange={handleHeroUpdate}
                  className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50"
                />
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                 <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-500 uppercase">Title Prefix</label>
                    <input 
                      type="text" 
                      name="titlePrefix"
                      value={content.hero.titlePrefix}
                      onChange={handleHeroUpdate}
                      className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50"
                    />
                 </div>
                 <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-500 uppercase">Title Highlight (Gradient)</label>
                    <input 
                      type="text" 
                      name="titleHighlight"
                      value={content.hero.titleHighlight}
                      onChange={handleHeroUpdate}
                      className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50"
                    />
                 </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase">Main Description</label>
                <textarea 
                  name="description"
                  rows={4}
                  value={content.hero.description}
                  onChange={handleHeroUpdate}
                  className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50"
                />
              </div>
            </div>
            <div className="flex justify-end pt-4">
                <span className="text-xs text-green-400 flex items-center"><Save size={14} className="mr-1"/> Changes auto-save</span>
            </div>
          </div>
        )}

        {/* STATS EDITOR */}
        {activeTab === 'stats' && (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-white border-b border-white/5 pb-4">Statistics HUD</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {content.stats.map((stat) => (
                <div key={stat.id} className="p-4 bg-white/5 rounded-xl border border-white/5 space-y-3">
                   <div className="flex justify-between items-center mb-2">
                      <span className="text-xs font-mono text-gray-500">Stat Block #{stat.id}</span>
                   </div>
                   <div className="space-y-1">
                      <label className="text-[10px] font-bold text-gray-500 uppercase">Value</label>
                      <input 
                        type="text" 
                        value={stat.val}
                        onChange={(e) => updateStat(stat.id, { val: e.target.value })}
                        className="w-full bg-black/30 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-primary/50"
                      />
                   </div>
                   <div className="space-y-1">
                      <label className="text-[10px] font-bold text-gray-500 uppercase">Label</label>
                      <input 
                        type="text" 
                        value={stat.label}
                        onChange={(e) => updateStat(stat.id, { label: e.target.value })}
                        className="w-full bg-black/30 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-primary/50"
                      />
                   </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* MODULES EDITOR */}
        {activeTab === 'modules' && (
          <div className="space-y-8">
            <h3 className="text-xl font-bold text-white border-b border-white/5 pb-4">Core Modules</h3>
            
            {content.modules.map((module) => (
              <div key={module.id} className="p-6 bg-white/5 rounded-xl border border-white/5 relative group">
                <div className="absolute top-4 right-4 text-xs font-mono text-gray-600 px-2 py-1 bg-black/30 rounded uppercase">{module.type}</div>
                
                <div className="grid gap-6">
                   <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-500 uppercase">Block Title</label>
                      <input 
                        type="text" 
                        value={module.title}
                        onChange={(e) => updateModule(module.id, { title: e.target.value })}
                        className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50 font-bold"
                      />
                   </div>

                   {module.type === 'profile' && (
                     <>
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-gray-500 uppercase">Person Name</label>
                          <input 
                            type="text" 
                            value={module.name || ''}
                            onChange={(e) => updateModule(module.id, { name: e.target.value })}
                            className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-yellow-400 focus:outline-none focus:border-primary/50"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-gray-500 uppercase">Image URL</label>
                          <div className="flex gap-4">
                             <input 
                              type="text" 
                              value={module.image || ''}
                              onChange={(e) => updateModule(module.id, { image: e.target.value })}
                              className="flex-1 bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-gray-300 text-sm focus:outline-none focus:border-primary/50"
                            />
                            {module.image && <img src={module.image} alt="Preview" className="w-12 h-12 rounded-full object-cover border border-white/20" />}
                          </div>
                        </div>
                     </>
                   )}

                   <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-500 uppercase">Description</label>
                      <textarea 
                        rows={3}
                        value={module.desc}
                        onChange={(e) => updateModule(module.id, { desc: e.target.value })}
                        className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-gray-300 focus:outline-none focus:border-primary/50"
                      />
                   </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ABOUT EDITOR */}
        {activeTab === 'about' && (
          <div className="space-y-8">
            <h3 className="text-xl font-bold text-white border-b border-white/5 pb-4">About Page Content</h3>
            
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500 uppercase">History Text</label>
              <textarea 
                name="history"
                rows={6}
                value={content.about.history}
                onChange={handleAboutUpdate}
                className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-gray-300 focus:outline-none focus:border-primary/50"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6 bg-white/5 p-6 rounded-xl">
               <div className="md:col-span-2 text-sm font-bold text-secondary uppercase">Principal's Section</div>
               <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase">Principal Name</label>
                  <input 
                    type="text" 
                    name="principalName"
                    value={content.about.principalName}
                    onChange={handleAboutUpdate}
                    className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50"
                  />
               </div>
               <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase">Image URL</label>
                  <input 
                    type="text" 
                    name="principalImage"
                    value={content.about.principalImage}
                    onChange={handleAboutUpdate}
                    className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50"
                  />
               </div>
               <div className="md:col-span-2 space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase">Message Quote</label>
                  <textarea 
                    name="principalMessage"
                    rows={3}
                    value={content.about.principalMessage}
                    onChange={handleAboutUpdate}
                    className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50 italic"
                  />
               </div>
            </div>

            <div className="space-y-4">
               <label className="text-xs font-bold text-gray-500 uppercase">Achievements List</label>
               {content.about.achievements.map((item, idx) => (
                 <div key={idx} className="flex gap-2">
                    <input 
                      type="text" 
                      value={item}
                      onChange={(e) => handleAchievementUpdate(idx, e.target.value)}
                      className="flex-1 bg-black/30 border border-white/10 rounded-lg px-4 py-2 text-gray-300 focus:outline-none focus:border-primary/50"
                    />
                 </div>
               ))}
            </div>
          </div>
        )}

        {/* ACADEMICS EDITOR */}
        {activeTab === 'academics' && (
          <div className="space-y-8">
            <h3 className="text-xl font-bold text-white border-b border-white/5 pb-4">Academics Page Content</h3>
            
            <div className="grid md:grid-cols-2 gap-6">
               <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase">Main Tagline</label>
                  <input 
                    type="text" 
                    name="tagline"
                    value={content.academics.tagline}
                    onChange={handleAcademicsUpdate}
                    className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50"
                  />
               </div>
               <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase">Sub Tagline</label>
                  <input 
                    type="text" 
                    name="subTagline"
                    value={content.academics.subTagline}
                    onChange={handleAcademicsUpdate}
                    className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50"
                  />
               </div>
            </div>

            <div className="space-y-4">
              <label className="text-xs font-bold text-secondary uppercase">Academic Levels</label>
              {content.academics.levels.map((level) => (
                <div key={level.id} className="p-4 bg-white/5 rounded-xl border border-white/5 grid gap-4">
                   <div className="space-y-1">
                      <label className="text-[10px] font-bold text-gray-500">Title (Level {level.id})</label>
                      <input 
                        type="text" 
                        value={level.title}
                        onChange={(e) => updateAcademicLevel(level.id, { title: e.target.value })}
                        className="w-full bg-black/30 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-primary/50"
                      />
                   </div>
                   <div className="space-y-1">
                      <label className="text-[10px] font-bold text-gray-500">Description</label>
                      <textarea 
                        rows={2}
                        value={level.description}
                        onChange={(e) => updateAcademicLevel(level.id, { description: e.target.value })}
                        className="w-full bg-black/30 border border-white/10 rounded-lg px-3 py-2 text-gray-300 focus:outline-none focus:border-primary/50"
                      />
                   </div>
                </div>
              ))}
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500 uppercase">Evaluation Protocols Text</label>
              <textarea 
                name="evaluationText"
                rows={4}
                value={content.academics.evaluationText}
                onChange={handleAcademicsUpdate}
                className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-gray-300 focus:outline-none focus:border-primary/50"
              />
            </div>
          </div>
        )}

        {/* NOTICES EDITOR */}
        {activeTab === 'notices' && (
           <div className="space-y-8">
             <div className="grid md:grid-cols-3 gap-8">
               
               {/* Create New */}
               <div className="md:col-span-1 space-y-4">
                  <h3 className="text-lg font-bold text-white">Add Notice</h3>
                  <form onSubmit={handleAddNotice} className="space-y-4 bg-white/5 p-5 rounded-xl border border-white/5">
                     <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-500 uppercase">Type</label>
                        <select 
                          value={newNotice.type}
                          onChange={(e) => setNewNotice({...newNotice, type: e.target.value as any})}
                          className="w-full bg-black/30 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none"
                        >
                          <option value="general">General</option>
                          <option value="academic">Academic</option>
                          <option value="event">Event</option>
                        </select>
                     </div>
                     <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-500 uppercase">Headline</label>
                        <input 
                          type="text" 
                          value={newNotice.title}
                          onChange={(e) => setNewNotice({...newNotice, title: e.target.value})}
                          className="w-full bg-black/30 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none"
                          placeholder="Short title..."
                          required
                        />
                     </div>
                     <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-500 uppercase">Content</label>
                        <textarea 
                          value={newNotice.content}
                          onChange={(e) => setNewNotice({...newNotice, content: e.target.value})}
                          className="w-full bg-black/30 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none"
                          placeholder="Details..."
                          rows={3}
                          required
                        />
                     </div>
                     <button type="button" onClick={handleAddNotice} className="w-full bg-primary hover:bg-primary/80 text-white font-bold py-2 rounded-lg flex items-center justify-center space-x-2 transition-all">
                       <Plus size={16} /> <span>Publish Notice</span>
                     </button>
                  </form>
               </div>

               {/* List */}
               <div className="md:col-span-2 space-y-4">
                  <h3 className="text-lg font-bold text-white">Active Feed</h3>
                  <div className="space-y-3 h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                    {content.announcements.map(ann => (
                      <div key={ann.id} className="flex items-start justify-between p-4 bg-white/5 rounded-xl border border-white/5 hover:border-white/10 group transition-all">
                         <div>
                            <div className="flex items-center space-x-2 mb-1">
                               <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded ${ann.type === 'event' ? 'bg-purple-500/20 text-purple-300' : ann.type === 'academic' ? 'bg-blue-500/20 text-blue-300' : 'bg-gray-500/20 text-gray-300'}`}>
                                 {ann.type}
                               </span>
                               <span className="text-xs text-gray-500 font-mono">{ann.date}</span>
                            </div>
                            <h4 className="font-bold text-white text-sm">{ann.title}</h4>
                            <p className="text-xs text-gray-400 mt-1 line-clamp-2">{ann.content}</p>
                         </div>
                         <button 
                          type="button"
                          onClick={(e) => { 
                            e.stopPropagation();
                            deleteAnnouncement(ann.id);
                            toast.success('Announcement removed');
                          }}
                          className="text-gray-500 hover:text-red-500 bg-transparent hover:bg-red-500/10 p-2 ml-2 rounded-lg transition-all z-10 flex-shrink-0"
                          title="Delete Notice"
                         >
                            <Trash size={18} className="pointer-events-none" />
                         </button>
                      </div>
                    ))}
                    {content.announcements.length === 0 && (
                      <div className="flex flex-col items-center justify-center h-48 text-gray-500 border border-dashed border-white/10 rounded-xl">
                        <p className="text-sm">No active announcements.</p>
                        <p className="text-xs mt-1">Add one to get started.</p>
                      </div>
                    )}
                  </div>
               </div>

             </div>
           </div>
        )}

      </div>
    </div>
  );
};

export default CMS;