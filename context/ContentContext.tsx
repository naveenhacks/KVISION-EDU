import React, { createContext, useContext, useState, useEffect } from 'react';
import { SiteContent, HeroContent, StatItem, ModuleContent, Announcement, AboutContent, AcademicsContent } from '../types';
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
  announcements: [],
  about: {
    history: "Founded in 1998, KVISION Academy started with a simple mission: to provide education that bridges the gap between traditional values and modern technology. From a humble beginning with just 50 students, we have evolved into a premier tech-integrated institution with over 1500 students and next-generation learning facilities.",
    principalMessage: "\"At KVISION, we treat education as an operating system update for the human mind. Our goal is to install critical thinking, compile creativity, and execute success.\"",
    principalName: "- Dr. Robert Anderson, Principal",
    principalImage: "https://picsum.photos/id/64/200/200",
    achievements: [
      "#1 in Regional Robotics",
      "Best Digital Campus 2023",
      "100% University Acceptance",
      "National Coding Champions"
    ]
  },
  academics: {
    tagline: "Academic Architecture",
    subTagline: "Comprehensive learning modules for the 21st century.",
    levels: [
      { id: 1, title: "Level 1: Primary", description: "Foundational literacy, numeracy, and curiosity-driven exploration through gamified learning methods and interactive play." },
      { id: 2, title: "Level 2: Middle", description: "Specialized subject introduction, critical thinking algorithms, and collaborative projects to compile social intelligence." },
      { id: 3, title: "Level 3: High", description: "Advanced placement protocols, career trajectory mapping, and leadership kernel development." }
    ],
    evaluationText: "We've deprecated traditional grading. Our system assesses logic, creativity, and application. Real-time data streams are available to guardians via the dashboard."
  }
};

interface ContentContextType {
  content: SiteContent;
  updateHero: (data: Partial<HeroContent>) => void;
  updateStat: (id: number, data: Partial<StatItem>) => void;
  updateModule: (id: number, data: Partial<ModuleContent>) => void;
  updateAbout: (data: Partial<AboutContent>) => void;
  updateAcademics: (data: Partial<AcademicsContent>) => void;
  updateAcademicLevel: (id: number, data: Partial<{ title: string; description: string }>) => void;
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
        // Merge fetched config with default structure to ensure new fields (like about/academics) exist even if DB has old structure
        setContent(prev => ({ 
          ...INITIAL_CONTENT, 
          ...configData.value, 
          announcements: noticesData || [] 
        }));
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

  const updateAbout = (data: Partial<AboutContent>) => {
    setContent(prev => {
      const updated = { ...prev, about: { ...prev.about, ...data } };
      persistConfig(updated);
      return updated;
    });
  };

  const updateAcademics = (data: Partial<AcademicsContent>) => {
    setContent(prev => {
      const updated = { ...prev, academics: { ...prev.academics, ...data } };
      persistConfig(updated);
      return updated;
    });
  };

  const updateAcademicLevel = (id: number, data: Partial<{ title: string; description: string }>) => {
     setContent(prev => {
      const newLevels = prev.academics.levels.map(l => l.id === id ? { ...l, ...data } : l);
      const updated = { ...prev, academics: { ...prev.academics, levels: newLevels } };
      persistConfig(updated);
      return updated;
    });
  }

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
    <ContentContext.Provider value={{ 
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
    }}>
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