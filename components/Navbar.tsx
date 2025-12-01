import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Logo from './Logo';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuth();

  const isDashboard = location.pathname.startsWith('/dashboard');
  const toggleMenu = () => setIsOpen(!isOpen);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="sticky top-0 z-50 w-full glass border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="transition-transform duration-300 group-hover:scale-110 group-hover:rotate-180">
              <Logo className="w-12 h-12" animated={true} />
            </div>
            <div className="flex flex-col">
              <span className="font-heading font-bold text-2xl tracking-tight text-white group-hover:text-secondary transition-colors">
                KVISION
              </span>
              <span className="text-[10px] tracking-widest uppercase text-secondary font-mono">Academy v2.0</span>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-1">
            {!isDashboard && (
              <div className="flex items-center bg-white/5 rounded-full p-1 border border-white/5 mr-6 backdrop-blur-sm">
                {[
                  { path: '/', label: 'Home' },
                  { path: '/about', label: 'About' },
                  { path: '/academics', label: 'Academics' }
                ].map((link) => (
                  <Link 
                    key={link.path}
                    to={link.path} 
                    className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                      location.pathname === link.path 
                        ? 'bg-white/10 text-secondary shadow-[0_0_10px_rgba(0,243,255,0.2)]' 
                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            )}

            {isAuthenticated ? (
              <div className="flex items-center space-x-4 pl-6 border-l border-white/10">
                <div className="text-right hidden lg:block">
                  <div className="text-sm font-bold text-white">{user?.name}</div>
                  <div className="text-xs text-secondary font-mono uppercase">{user?.role} Access</div>
                </div>
                {!isDashboard && (
                   <Link 
                   to="/dashboard"
                   className="px-5 py-2.5 rounded-lg font-bold transition-all duration-300 bg-secondary/10 text-secondary border border-secondary/50 hover:bg-secondary hover:text-black hover:shadow-[0_0_20px_rgba(0,243,255,0.6)]"
                 >
                   Dashboard
                 </Link>
                )}
                <button 
                  onClick={handleLogout}
                  className="px-5 py-2.5 rounded-lg font-bold border border-red-500/30 text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all duration-300"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link 
                to="/login"
                className="group relative px-8 py-2.5 rounded-lg font-bold text-white overflow-hidden transition-all duration-300"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary via-accent to-primary opacity-80 group-hover:opacity-100 transition-opacity"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                <span className="relative z-10 flex items-center gap-2">
                  <Sparkles size={16} /> Login Portal
                </span>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button onClick={toggleMenu} className="focus:outline-none text-white p-2 hover:bg-white/10 rounded-lg transition-colors">
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden absolute w-full bg-bg/95 backdrop-blur-xl border-t border-white/5 shadow-2xl animate-fade-in z-50">
          <div className="px-4 pt-4 pb-8 space-y-3">
            <Link to="/" onClick={toggleMenu} className="block px-4 py-3 rounded-lg hover:bg-white/5 text-gray-300 hover:text-secondary border border-transparent hover:border-white/10">Home</Link>
            <Link to="/about" onClick={toggleMenu} className="block px-4 py-3 rounded-lg hover:bg-white/5 text-gray-300 hover:text-secondary border border-transparent hover:border-white/10">About</Link>
            <Link to="/academics" onClick={toggleMenu} className="block px-4 py-3 rounded-lg hover:bg-white/5 text-gray-300 hover:text-secondary border border-transparent hover:border-white/10">Academics</Link>
            {isAuthenticated ? (
               <div className="pt-4 border-t border-white/10 mt-4 space-y-3">
                <div className="px-4 text-xs text-gray-500 uppercase font-mono">Signed in as {user?.name}</div>
                <Link to="/dashboard" onClick={toggleMenu} className="block px-4 py-3 rounded-lg bg-primary/20 text-secondary border border-primary/30 font-bold text-center">Open Dashboard</Link>
                <button onClick={() => { handleLogout(); toggleMenu(); }} className="block w-full text-center px-4 py-3 rounded-lg text-red-400 hover:bg-white/5 border border-transparent hover:border-red-500/20">Sign Out</button>
               </div>
            ) : (
              <Link to="/login" onClick={toggleMenu} className="block px-4 py-3 mt-6 text-center bg-gradient-to-r from-primary to-accent rounded-lg text-white font-bold shadow-lg">Access Portal</Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;