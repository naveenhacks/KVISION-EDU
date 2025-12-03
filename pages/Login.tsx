import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { UserRole } from '../types';
import { GraduationCap, ShieldCheck, User, ArrowRight, Lock, Chrome, Smartphone, ChevronLeft, ScanFace, UserPlus, LogIn } from 'lucide-react';
import toast from 'react-hot-toast';
import Logo from '../components/Logo';

const Login: React.FC = () => {
  const location = useLocation();
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(location.state?.role || null);
  
  // State for Form
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState(''); // Only for registration

  const { login, signUp, loginWithGoogle, isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  // Auto-redirect if already logged in
  useEffect(() => {
    if (isAuthenticated && user) {
      navigate('/dashboard', { replace: true });
    }
  }, [isAuthenticated, user, navigate]);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRole) return;
    
    const toastId = toast.loading(isRegistering ? 'Creating Account...' : 'Verifying Credentials...');
    
    try {
      if (isRegistering) {
        // Only Students can self-register
        if (selectedRole !== UserRole.STUDENT) {
            throw new Error("Only students can self-register. Staff must be added by Admin.");
        }
        await signUp(email, password, fullName);
        toast.success('Account Created! Please check your email or login.', { id: toastId });
        setIsRegistering(false); // Switch back to login
      } else {
        // Login Logic
        await login(email, password, selectedRole);
        toast.success('Access Granted', { id: toastId });
        navigate('/dashboard');
      }
    } catch (error: any) {
      console.error(error);
      toast.error(error.message || 'Authentication Failed', { id: toastId });
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle();
      // Google Redirects, so we don't need to navigate manually immediately
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const getRoleColor = (role: UserRole) => {
    switch (role) {
      case UserRole.ADMIN: return 'from-red-500 to-orange-600';
      case UserRole.TEACHER: return 'from-blue-500 to-cyan-500';
      default: return 'from-primary to-accent';
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-full h-1/2 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[100px] animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-[100px]"></div>
      </div>

      <div className="w-full max-w-6xl relative z-10">
        
        {!selectedRole ? (
          // ROLE SELECTION BLOCKS
          <div className="animate-fade-in space-y-12 text-center">
            <div className="flex flex-col items-center justify-center">
               <div className="mb-8 p-4 bg-white/5 rounded-full border border-white/10 shadow-[0_0_50px_rgba(112,0,255,0.2)]">
                  <Logo className="w-24 h-24" animated={true} />
               </div>
               <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4 tracking-tight">IDENTITY <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-white">VERIFICATION</span></h2>
               <p className="text-gray-400 font-mono tracking-widest text-sm">SELECT ACCESS MODULE</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* STUDENT BLOCK */}
              <button 
                onClick={() => setSelectedRole(UserRole.STUDENT)}
                className="group relative h-[400px] glass-card rounded-3xl p-1 overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-[0_0_50px_rgba(112,0,255,0.4)]"
              >
                <div className="absolute inset-0 bg-gradient-to-b from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative h-full bg-black/40 rounded-[22px] p-8 flex flex-col items-center justify-center border border-white/5 group-hover:border-primary/50 transition-colors">
                  <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500 shadow-[0_0_20px_rgba(112,0,255,0.2)]">
                    <GraduationCap size={48} className="text-primary group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="text-2xl font-bold text-white font-heading mb-2">STUDENT</h3>
                  <p className="text-gray-500 text-sm mb-8">Personal Learning Environment</p>
                  <span className="px-6 py-2 rounded-full border border-primary/30 text-primary text-xs font-bold uppercase tracking-wider group-hover:bg-primary group-hover:text-white transition-all">Initialize</span>
                </div>
              </button>

              {/* TEACHER BLOCK */}
              <button 
                onClick={() => setSelectedRole(UserRole.TEACHER)}
                className="group relative h-[400px] glass-card rounded-3xl p-1 overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-[0_0_50px_rgba(0,243,255,0.4)]"
              >
                 <div className="absolute inset-0 bg-gradient-to-b from-secondary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative h-full bg-black/40 rounded-[22px] p-8 flex flex-col items-center justify-center border border-white/5 group-hover:border-secondary/50 transition-colors">
                  <div className="w-24 h-24 rounded-full bg-secondary/10 flex items-center justify-center mb-8 group-hover:scale-105 transition-transform duration-500 shadow-[0_0_20px_rgba(0,243,255,0.2)]">
                    <User size={48} className="text-secondary group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="text-2xl font-bold text-white font-heading mb-2">FACULTY</h3>
                  <p className="text-gray-500 text-sm mb-8">Academic Management System</p>
                  <span className="px-6 py-2 rounded-full border border-secondary/30 text-secondary text-xs font-bold uppercase tracking-wider group-hover:bg-secondary group-hover:text-black transition-all">Initialize</span>
                </div>
              </button>

              {/* ADMIN BLOCK */}
              <button 
                onClick={() => setSelectedRole(UserRole.ADMIN)}
                className="group relative h-[400px] glass-card rounded-3xl p-1 overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-[0_0_50px_rgba(255,0,0,0.4)]"
              >
                 <div className="absolute inset-0 bg-gradient-to-b from-red-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative h-full bg-black/40 rounded-[22px] p-8 flex flex-col items-center justify-center border border-white/5 group-hover:border-red-500/50 transition-colors">
                  <div className="w-24 h-24 rounded-full bg-red-500/10 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500 shadow-[0_0_20px_rgba(255,0,0,0.2)]">
                    <ShieldCheck size={48} className="text-red-500 group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="text-2xl font-bold text-white font-heading mb-2">ADMIN</h3>
                  <p className="text-gray-500 text-sm mb-8">System Configuration & Control</p>
                  <span className="px-6 py-2 rounded-full border border-red-500/30 text-red-500 text-xs font-bold uppercase tracking-wider group-hover:bg-red-500 group-hover:text-white transition-all">Initialize</span>
                </div>
              </button>
            </div>
          </div>
        ) : (
          // LOGIN / REGISTER FORM VIEW
          <div className="animate-slide-up max-w-lg mx-auto">
            <button 
              onClick={() => { setSelectedRole(null); setIsRegistering(false); }}
              className="flex items-center text-gray-400 hover:text-white mb-8 transition-colors group"
            >
              <ChevronLeft className="group-hover:-translate-x-1 transition-transform" />
              <span className="text-sm font-mono uppercase tracking-widest ml-2">Return to Module Selection</span>
            </button>

            <div className="glass-card rounded-3xl p-1 relative overflow-hidden">
               <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${getRoleColor(selectedRole)}`}></div>
               
               <div className="bg-bg/90 backdrop-blur-xl p-8 md:p-12 rounded-[22px]">
                 <div className="text-center mb-10">
                   <div className={`w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br ${getRoleColor(selectedRole)} flex items-center justify-center shadow-lg mb-4`}>
                     {selectedRole === UserRole.STUDENT && <GraduationCap size={32} className="text-white" />}
                     {selectedRole === UserRole.TEACHER && <User size={32} className="text-white" />}
                     {selectedRole === UserRole.ADMIN && <ShieldCheck size={32} className="text-white" />}
                   </div>
                   <h2 className="text-2xl font-bold text-white font-heading">{selectedRole} {isRegistering ? 'REGISTRATION' : 'ACCESS'}</h2>
                   <p className="text-gray-500 text-xs font-mono uppercase mt-2">Secure Connection Established</p>
                 </div>

                 {/* Google / Mobile Options - Only for Students */}
                 {selectedRole === UserRole.STUDENT && (
                  <div className="space-y-4 mb-8">
                    <button 
                      type="button" 
                      onClick={handleGoogleLogin}
                      className="w-full bg-white text-black font-bold py-3.5 rounded-xl flex items-center justify-center space-x-3 hover:bg-gray-100 hover:scale-[1.02] transition-all duration-200 shadow-[0_0_20px_rgba(255,255,255,0.15)]"
                    >
                      <Chrome size={20} className="text-blue-600" />
                      <span>{isRegistering ? 'Sign up with Google' : 'Continue with Google'}</span>
                    </button>
                    
                    {!isRegistering && (
                      <button 
                        type="button" 
                        onClick={() => toast('Mobile OTP System (Demo)', { icon: '📱' })}
                        className="w-full bg-white/5 text-white font-bold py-3.5 rounded-xl flex items-center justify-center space-x-3 hover:bg-white/10 hover:scale-[1.02] hover:border-secondary/50 border border-white/10 transition-all duration-200"
                      >
                        <Smartphone size={20} className="text-secondary" />
                        <span>Continue with Mobile</span>
                      </button>
                    )}

                    <div className="flex items-center gap-4 py-2">
                      <div className="h-px bg-white/10 flex-1"></div>
                      <span className="text-[10px] text-gray-500 font-mono uppercase tracking-widest">Or via Email</span>
                      <div className="h-px bg-white/10 flex-1"></div>
                    </div>
                  </div>
                 )}

                 <form onSubmit={handleAuth} className="space-y-6">
                    {isRegistering && (
                      <div className="space-y-2 animate-fade-in">
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Full Name</label>
                        <div className="relative">
                          <User className="absolute left-4 top-4 text-gray-600" size={20} />
                          <input 
                            type="text" 
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            placeholder="John Doe"
                            className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-black/30 border border-white/10 text-white focus:outline-none focus:border-white/30 focus:bg-black/50 transition-all font-mono placeholder-gray-700"
                            required
                          />
                        </div>
                      </div>
                    )}

                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Email Address</label>
                      <div className="relative">
                        <ScanFace className="absolute left-4 top-4 text-gray-600" size={20} />
                        <input 
                          type="email" 
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="name@kvision.edu"
                          className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-black/30 border border-white/10 text-white focus:outline-none focus:border-white/30 focus:bg-black/50 transition-all font-mono placeholder-gray-700"
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-500 uppercase">Password</label>
                      <div className="relative">
                        <Lock className="absolute left-4 top-4 text-gray-600" size={20} />
                        <input 
                          type="password" 
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="••••••••"
                          className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-black/30 border border-white/10 text-white focus:outline-none focus:border-white/30 focus:bg-black/50 transition-all font-mono placeholder-gray-700"
                          required
                          minLength={6}
                        />
                      </div>
                    </div>

                    {!isRegistering && (
                      <div className="flex justify-between items-center text-xs text-gray-500">
                        <label className="flex items-center space-x-2 cursor-pointer hover:text-gray-300">
                          <input type="checkbox" className="rounded bg-black border-white/20 text-secondary focus:ring-secondary" />
                          <span>Remember</span>
                        </label>
                        <a href="#" className="hover:text-white transition-colors">Help?</a>
                      </div>
                    )}

                    <button 
                      type="submit"
                      className={`w-full bg-gradient-to-r ${getRoleColor(selectedRole)} text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300 flex items-center justify-center group`}
                    >
                      <span>{isRegistering ? 'CREATE ACCOUNT' : 'AUTHENTICATE'}</span>
                      <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                    </button>
                 </form>

                 {/* Toggle Register/Login - Only for Students */}
                 {selectedRole === UserRole.STUDENT && (
                   <div className="mt-6 text-center">
                     <button 
                       onClick={() => setIsRegistering(!isRegistering)}
                       className="text-sm text-gray-400 hover:text-white transition-colors underline decoration-white/30 underline-offset-4 flex items-center justify-center mx-auto"
                     >
                       {isRegistering ? (
                         <> <LogIn size={14} className="mr-2" /> Already have an account? Login </>
                       ) : (
                         <> <UserPlus size={14} className="mr-2" /> Don't have an account? Sign Up </>
                       )}
                     </button>
                   </div>
                 )}

                 {selectedRole !== UserRole.STUDENT && (
                   <div className="mt-6 text-center">
                     <p className="text-xs text-gray-600 font-mono">Restricted Access. Contact System Admin for credentials.</p>
                   </div>
                 )}
               </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;