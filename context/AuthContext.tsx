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
    // 1. Check active session
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        await fetchProfile(session.user.id, session.user.email!);
      } else {
        setLoading(false);
      }
    };

    checkSession();

    // 2. Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        await fetchProfile(session.user.id, session.user.email!);
      } else if (event === 'SIGNED_OUT') {
        setUser(null);
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchProfile = async (userId: string, email: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        console.error('Error fetching profile:', error);
        // If profile doesn't exist yet (race condition on signup), retry or wait
        return;
      }

      if (data) {
        setUser({
          id: data.id,
          name: data.name || email.split('@')[0],
          email: data.email || email,
          role: data.role as UserRole,
          avatar: data.avatar || `https://ui-avatars.com/api/?name=${data.name || 'User'}&background=random`,
          phone: data.phone,
          bio: data.bio
        });
      }
    } catch (error) {
      console.error('Profile fetch error:', error);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, pass: string, expectedRole: UserRole) => {
    // 1. Authenticate with Supabase Auth
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password: pass,
    });
    
    if (error) throw error;

    // 2. Check if the user has the correct role in the database
    if (data.user) {
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', data.user.id)
        .single();

      if (profileError) throw profileError;

      // STRICT ROLE ENFORCEMENT
      // If I try to login as Admin but my DB role is Student -> Block access
      if (profile.role !== expectedRole) {
        await supabase.auth.signOut(); // Log them out immediately
        throw new Error(`Access Denied: You are not authorized as a ${expectedRole}`);
      }
    }
  };

  const signUp = async (email: string, pass: string, name: string) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password: pass,
      options: {
        data: {
          full_name: name,
        }
      }
    });
    if (error) throw error;
    
    // Note: The 'handle_new_user' trigger in Supabase SQL will automatically 
    // create the profile row with role = 'STUDENT'.
  };

  const loginWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin,
      }
    });
    if (error) throw error;
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