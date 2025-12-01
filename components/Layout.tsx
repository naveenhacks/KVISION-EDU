import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { useLocation } from 'react-router-dom';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();

  // Hide footer on Dashboard (Student/Teacher/Admin Portals) and Login page
  // to remove public school information from the private app experience.
  const isPortalRoute = location.pathname.startsWith('/dashboard') || location.pathname === '/login';

  return (
    <div className="flex flex-col min-h-screen bg-bg text-text font-sans bg-grid-pattern">
      <Navbar />
      <main className="flex-grow relative z-10">
        {children}
      </main>
      {!isPortalRoute && <Footer />}
      {/* Decorative background glow */}
      <div className="fixed bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-primary/10 to-transparent pointer-events-none -z-0"></div>
    </div>
  );
};

export default Layout;