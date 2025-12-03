import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole } from '../types';
import { supabase } from '../services/supabase';
import toast from 'react-hot-toast';

interface AuthContextType {
  user: User | null;
  login: (email: string, pass: string, expectedRole: UserRole) => Promise<void>;
  signUp: (email: string, pass: string, name: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (data: Partial<User>) => Promise<void>;
  isAuthenticated: boolean;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    // SAFETY NET: Force loading to false after 6 seconds max
    // This prevents the "Blue Screen of Death" if Supabase hangs
    const safetyTimeout = setTimeout(() => {
      if (mounted && loading) {
        console.warn('Auth loading timed out - forcing app render');
        setLoading(false);
      }
    }, 6000);

    const initAuth = async () => {
      try {
        // 1. Get initial session
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session?.user) {
          await fetchProfile(session.user);
        } else {
          if (mounted) setLoading(false);
        }
      } catch (err) {
        console.error("Auth init failed", err);
        if (mounted) setLoading(false);
      }
    };

    initAuth();

    // 2. Listen for auth changes (Google Redirects come here)
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session?.user) {
        // Only fetch if we don't have a user (prevents double fetch)
        if (!user) {
          await fetchProfile(session.user);
        }
      } else if (event === 'SIGNED_OUT') {
        setUser(null);
        setLoading(false);
      }
    });

    return () => {
      mounted = false;
      clearTimeout(safetyTimeout);
      subscription.unsubscribe();
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const fetchProfile = async (sessionUser: any, retries = 0) => {
    try {
      // 1. Try to get profile from DB
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', sessionUser.id)
        .single();

      if (data) {
        // SUCCESS: Profile found in DB
        setUser({
          id: data.id,
          name: data.name || sessionUser.email?.split('@')[0],
          email: data.email || sessionUser.email,
          role: data.role as UserRole,
          avatar: data.avatar || sessionUser.user_metadata?.avatar_url,
          phone: data.phone,
          bio: data.bio
        });
        setLoading(false);
        return;
      }

      // 2. If not found, it might be a race condition with the Trigger
      if (retries < 3) {
        console.log(`Profile missing, retrying... (${retries + 1}/3)`);
        setTimeout(() => fetchProfile(sessionUser, retries + 1), 1000);
        return;
      }

      // 3. FALLBACK: If DB fetch fails after retries, use Google Session Data
      // This ensures the user gets IN even if the DB is slow.
      console.warn('Using Session Fallback for Profile');
      setUser({
        id: sessionUser.id,
        name: sessionUser.user_metadata?.full_name || sessionUser.email?.split('@')[0] || 'User',
        email: sessionUser.email || '',
        role: UserRole.STUDENT, // Default to Student for safety
        avatar: sessionUser.user_metadata?.avatar_url || `https://ui-avatars.com/api/?name=${sessionUser.email}`,
      });
      setLoading(false);

    } catch (error) {
      console.error('Profile fetch error:', error);
      setLoading(false);
    }
  };

  const login = async (email: string, pass: string, expectedRole: UserRole) => {
    // We do NOT set global loading(true) here because that unmounts the Login form 
    // and can interrupt the process. We let the UI component handle the loading state.
    
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password: pass,
    });
    
    if (error) throw error;

    if (data.user) {
      // Check role strictly for manual logins
      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', data.user.id)
        .single();

      if (profile && profile.role !== expectedRole) {
        await supabase.auth.signOut();
        throw new Error(`Access Denied: You are not authorized as a ${expectedRole}`);
      }
      
      // Explicitly wait for profile fetch before resolving
      // This ensures the user object exists before the page redirects
      await fetchProfile(data.user);
    }
  };

  const signUp = async (email: string, pass: string, name: string) => {
    // We do NOT set global loading(true) here.
    const { error } = await supabase.auth.signUp({
      email,
      password: pass,
      options: {
        data: {
          full_name: name,
        }
      }
    });
    if (error) throw error;
    // Auth state change will handle the rest
  };

  const loginWithGoogle = async () => {
    // For Google, we DO need loading because it redirects away
    setLoading(true);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin,
      }
    });
    if (error) {
      setLoading(false);
      throw error;
    }
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  const updateProfile = async (data: Partial<User>) => {
    if (!user) return;
    
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          name: data.name,
          phone: data.phone,
          bio: data.bio,
          avatar: data.avatar
        })
        .eq('id', user.id);

      if (error) throw error;

      setUser({ ...user, ...data });
    } catch (error) {
      console.error('Update failed:', error);
      toast.error('Failed to update profile');
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, signUp, loginWithGoogle, logout, updateProfile, isAuthenticated: !!user, loading }}>
      {!loading && children}
      {loading && (
        <div className="fixed inset-0 bg-[#030014] flex flex-col items-center justify-center z-50">
           <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
           <p className="text-secondary mt-4 font-mono text-sm animate-pulse">Establishing Secure Connection...</p>
        </div>
      )}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};