import React, { createContext, useContext, useState, useEffect } from 'react';
import { SiteContent, HeroContent, StatItem, ModuleContent, Announcement } from '../types';
import { supabase } from '../services/supabase';
import toast from 'react-hot-toast';

const INITIAL_CONTENT: SiteContent = {
  hero: {
    badge: "Kendriya Vidyalaya Unnao",
    titlePrefix: "WELCOME TO",
    titleHighlight: "KVISION",
    description: "The advanced School Data Management System of Kendriya Vidyalaya Unnao. Bridging the gap between traditional education and future technology to empower students, faculty, and administration."
  },
  stats: [
    { id: 1, val: "25+", label: "YEARS ACTIVE" },
    { id: 2, val: "1.5K", label: "STUDENTS" },
    { id: 3, val: "100%", label: "PLACEMENT" },
    { id: 4, val: "50+", label: "PROGRAMS" },
  ],
  modules: [
    { 
      id: 1,
      type: 'profile',
      image: "https://cdnbbsr.s3waas.gov.in/s3kv0522c404c5dbb6a7656971fac48f76/uploads/2024/07/2024070524.jpg",
      title: "Principal's Desk", 
      name: "Sh. Krishna Prasad Yadav (KP Yadav)",
      desc: "Leading KVISION with a vision for future-ready education. Inspiring students to achieve excellence through technology and traditional values."
    },
    { 
      id: 2,
      type: 'feature',
      title: "Holistic Development", 
      desc: "Fostering intellectual, physical, and emotional growth through a blend of academics, sports, and cultural values."
    },
    { 
      id: 3,
      type: 'feature',
      title: "Smart Innovation", 
      desc: "Cutting-edge digital classrooms and ATAL Tinkering Labs to ignite curiosity and scientific temper in students."
    }
  ],
  announcements: []
};

interface ContentContextType {
  content: SiteContent;
  updateHero: (data: Partial<HeroContent>) => void;
  updateStat: (id: number, data: Partial<StatItem>) => void;
  updateModule: (id: number, data: Partial<ModuleContent>) => void;
  addAnnouncement: (announcement: Announcement) => void;
  deleteAnnouncement: (id: string) => void;
  resetToDefaults: () => void;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export const ContentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [content, setContent] = useState<SiteContent>(INITIAL_CONTENT);

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      // 1. Fetch CMS Config
      const { data: configData } = await supabase
        .from('site_config')
        .select('value')
        .eq('key', 'cms_content')
        .single();
      
      // 2. Fetch Announcements
      const { data: noticesData } = await supabase
        .from('announcements')
        .select('*')
        .order('created_at', { ascending: false });

      if (configData) {
        setContent(prev => ({ ...prev, ...configData.value, announcements: noticesData || [] }));
      } else {
        // Init config if missing
        await persistConfig({ ...INITIAL_CONTENT, announcements: [] });
        setContent(prev => ({ ...prev, announcements: noticesData || [] }));
      }
    } catch (err) {
      console.error('Failed to load content', err);
    }
  };

  const persistConfig = async (newContent: Partial<SiteContent>) => {
    // We strictly exclude announcements from site_config as they have their own table
    const { announcements, ...staticContent } = newContent as SiteContent;
    
    await supabase.from('site_config').upsert({
      key: 'cms_content',
      value: staticContent
    });
  };

  const updateHero = (data: Partial<HeroContent>) => {
    setContent(prev => {
      const updated = { ...prev, hero: { ...prev.hero, ...data } };
      persistConfig(updated);
      return updated;
    });
  };

  const updateStat = (id: number, data: Partial<StatItem>) => {
    setContent(prev => {
      const newStats = prev.stats.map(s => s.id === id ? { ...s, ...data } : s);
      const updated = { ...prev, stats: newStats };
      persistConfig(updated);
      return updated;
    });
  };

  const updateModule = (id: number, data: Partial<ModuleContent>) => {
    setContent(prev => {
      const newModules = prev.modules.map(m => m.id === id ? { ...m, ...data } : m);
      const updated = { ...prev, modules: newModules };
      persistConfig(updated);
      return updated;
    });
  };

  const addAnnouncement = async (announcement: Announcement) => {
    try {
      const { data, error } = await supabase.from('announcements').insert({
        title: announcement.title,
        content: announcement.content,
        type: announcement.type,
        date: announcement.date
      }).select().single();

      if (error) throw error;

      if (data) {
        setContent(prev => ({
          ...prev,
          announcements: [data, ...prev.announcements]
        }));
      }
    } catch (err) {
      console.error(err);
      toast.error('Failed to publish notice');
    }
  };

  const deleteAnnouncement = async (id: string) => {
    try {
      const { error } = await supabase.from('announcements').delete().eq('id', id);
      if (error) throw error;

      setContent(prev => ({
        ...prev,
        announcements: prev.announcements.filter(a => String(a.id) !== String(id))
      }));
    } catch (err) {
      console.error(err);
      toast.error('Failed to delete notice');
    }
  };

  const resetToDefaults = async () => {
    await persistConfig(INITIAL_CONTENT);
    setContent(prev => ({ ...prev, ...INITIAL_CONTENT }));
  };

  return (
    <ContentContext.Provider value={{ content, updateHero, updateStat, updateModule, addAnnouncement, deleteAnnouncement, resetToDefaults }}>
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = () => {
  const context = useContext(ContentContext);
  if (context === undefined) {
    throw new Error('useContent must be used within a ContentProvider');
  }
  return context;
}