import React from 'react';
import { Routes, Route, Navigate, Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useContent } from '../context/ContentContext'; // NEW
import { UserRole } from '../types';
import { MOCK_ASSIGNMENTS, ACADEMIC_EVENTS } from '../services/mockData';
import { 
  LayoutDashboard, 
  BookOpen, 
  Calendar, 
  Bell, 
  FileText, 
  Users, 
  BarChart, 
  Settings,
  Plus,
  Search,
  Activity,
  UserCircle,
  MessageSquare,
  Edit3 // New Icon
} from 'lucide-react';
import toast from 'react-hot-toast';
import AIAssistant from '../components/AIAssistant';
import Profile from './Profile';
import Messenger from './Messenger';
import Notifications from './Notifications';
import CMS from './admin/CMS'; // NEW

const Dashboard: React.FC = () => {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="flex min-h-screen bg-bg text-gray-200">
      <Sidebar role={user.role} />
      <div className="flex-1 p-4 md:p-10 ml-0 md:ml-72 transition-all overflow-x-hidden">
        {/* Header */}
        <header className="flex flex-col md:flex-row justify-between md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-heading font-bold text-white tracking-tight">Command Center</h1>
            <p className="text-gray-400 mt-1 flex items-center text-sm">
              <span className="w-2 h-2 rounded-full bg-green-500 mr-2 animate-pulse"></span>
              Welcome back, {user.name}
            </p>
          </div>
          <div className="flex items-center space-x-4 md:space-x-6">
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-2.5 text-gray-500" size={18} />
              <input 
                type="text" 
                placeholder="Search database..." 
                className="bg-white/5 border border-white/10 rounded-full pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-secondary/50 focus:bg-white/10 transition-all w-64"
              />
            </div>
            <Link to="/dashboard/messenger" className="relative p-2 bg-white/5 rounded-full hover:bg-white/10 transition-colors cursor-pointer group">
              <MessageSquare className="text-gray-400 group-hover:text-white" size={20} />
              <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-accent rounded-full border-2 border-bg"></span>
            </Link>
            <Link to="/dashboard/notifications" className="relative p-2 bg-white/5 rounded-full hover:bg-white/10 transition-colors cursor-pointer group">
              <Bell className="text-gray-400 group-hover:text-white" size={20} />
              <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-bg animate-pulse"></span>
            </Link>
            <Link to="/dashboard/profile" className="h-10 w-10 rounded-full p-0.5 bg-gradient-to-r from-primary to-secondary cursor-pointer hover:scale-105 transition-transform">
               <img src={user.avatar} alt={Profile} className="w-full h-full rounded-full object-cover border-2 border-bg" />
            </Link>
          </div>
        </header>

        <Routes>
           <Route path="/" element={<DashboardOverview role={user.role} />} />
           <Route path="/assignments" element={<AssignmentsView role={user.role} />} />
           <Route path="/profile" element={<Profile />} />
           <Route path="/messenger" element={<Messenger />} />
           <Route path="/notifications" element={<Notifications />} />
           {/* Admin Only Route */}
           {user.role === UserRole.ADMIN && <Route path="/cms" element={<CMS />} />}
        </Routes>
        
        <AIAssistant />
      </div>
    </div>
  );
};

/* --- SUB COMPONENTS --- */

const Sidebar: React.FC<{ role: UserRole }> = ({ role }) => {
  const location = useLocation();
  
  const links = [
    { name: 'Overview', path: '/dashboard', icon: <LayoutDashboard size={20} /> },
    { name: 'Profile', path: '/dashboard/profile', icon: <UserCircle size={20} /> },
    { name: 'Messages', path: '/dashboard/messenger', icon: <MessageSquare size={20} /> },
    { name: 'Assignments', path: '/dashboard/assignments', icon: <BookOpen size={20} /> },
    { name: 'Schedule', path: '/dashboard/schedule', icon: <Calendar size={20} /> },
  ];

  if (role === UserRole.TEACHER) {
    links.push({ name: 'Students', path: '/dashboard/students', icon: <Users size={20} /> });
    links.push({ name: 'Analytics', path: '/dashboard/reports', icon: <BarChart size={20} /> });
  } else if (role === UserRole.ADMIN) {
    links.push({ name: 'Site Editor', path: '/dashboard/cms', icon: <Edit3 size={20} /> }); // NEW LINK
    links.push({ name: 'User Management', path: '/dashboard/users', icon: <Users size={20} /> });
    links.push({ name: 'Broadcasts', path: '/dashboard/announcements', icon: <Bell size={20} /> });
    links.push({ name: 'System Health', path: '/dashboard/analytics', icon: <Activity size={20} /> });
  }

  return (
    <div className="hidden md:flex flex-col w-72 h-full fixed top-0 left-0 pt-24 pb-6 px-4 bg-bg border-r border-white/5 z-20">
      <div className="space-y-1 mt-4">
        {links.map((link) => {
          const isActive = location.pathname === link.path;
          return (
            <Link
              key={link.name}
              to={link.path}
              className={`flex items-center space-x-3 px-4 py-3.5 rounded-xl font-medium transition-all duration-300 group ${
                isActive 
                  ? 'bg-gradient-to-r from-primary/20 to-transparent border-l-2 border-primary text-white' 
                  : 'text-gray-500 hover:text-white hover:bg-white/5'
              }`}
            >
              <div className={`${isActive ? 'text-primary' : 'text-gray-500 group-hover:text-white'}`}>
                {link.icon}
              </div>
              <span className="tracking-wide text-sm">{link.name}</span>
            </Link>
          );
        })}
      </div>
      <div className="mt-auto pt-6 border-t border-white/5">
        <Link to="/dashboard/settings" className="flex items-center space-x-3 px-4 py-3 text-gray-500 hover:text-white transition-colors">
          <Settings size={20} />
          <span className="text-sm">System Settings</span>
        </Link>
      </div>
    </div>
  );
};

const DashboardOverview: React.FC<{ role: UserRole }> = ({ role }) => {
  const { content } = useContent(); // Use dynamic content for announcements
  const navigate = useNavigate();

  const handleCreate = () => {
    if (role === UserRole.ADMIN) {
      navigate('/dashboard/cms');
      toast('Opening Site Editor', { icon: '📝' });
    } else {
      navigate('/dashboard/assignments');
      toast('Opening Assignments Manager', { icon: '📂' });
    }
  };

  const handleAlert = () => {
    if (role === UserRole.ADMIN) {
      navigate('/dashboard/cms');
      toast('Redirecting to Announcement Center', { icon: '📢' });
    } else {
      toast('Alert Sent: Administration notified of class status.', { icon: '🚨', duration: 3000 });
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {role === UserRole.STUDENT && (
          <>
            <StatCard title="Pending Tasks" value="3" icon={<FileText />} color="text-orange-400" bg="bg-orange-400/10" border="border-orange-400/20" />
            <StatCard title="Attendance Rate" value="95%" icon={<Activity />} color="text-green-400" bg="bg-green-400/10" border="border-green-400/20" />
            <StatCard title="Next Exam" value="2 Days" icon={<BookOpen />} color="text-secondary" bg="bg-secondary/10" border="border-secondary/20" />
          </>
        )}
        {role === UserRole.TEACHER && (
          <>
            <StatCard title="Active Classes" value="5" icon={<Users />} color="text-secondary" bg="bg-secondary/10" border="border-secondary/20" />
            <StatCard title="To Grade" value="12" icon={<FileText />} color="text-accent" bg="bg-accent/10" border="border-accent/20" />
            <StatCard title="Performance" value="+12%" icon={<BarChart />} color="text-green-400" bg="bg-green-400/10" border="border-green-400/20" />
          </>
        )}
        {role === UserRole.ADMIN && (
          <>
            <StatCard title="Total Users" value="1,540" icon={<Users />} color="text-primary" bg="bg-primary/10" border="border-primary/20" />
            <StatCard title="System Load" value="34%" icon={<Activity />} color="text-secondary" bg="bg-secondary/10" border="border-secondary/20" />
            <StatCard title="Active Events" value={content.announcements.length.toString()} icon={<Calendar />} color="text-accent" bg="bg-accent/10" border="border-accent/20" />
          </>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content Area */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Announcements */}
          <div className="glass-card rounded-2xl p-6">
             <div className="flex justify-between items-center mb-6 border-b border-white/5 pb-4">
               <h3 className="font-bold text-lg text-white font-heading">Live Feed</h3>
               {role === UserRole.ADMIN && (
                 <Link to="/dashboard/cms" className="text-xs bg-primary hover:bg-primary/80 text-white px-3 py-1.5 rounded-md transition-colors">+ Manage</Link>
               )}
             </div>
             <div className="space-y-4">
               {content.announcements.slice(0, 3).map(ann => (
                 <div key={ann.id} className="p-4 bg-white/5 rounded-xl border-l-2 border-accent hover:bg-white/10 transition-colors group">
                   <div className="flex justify-between mb-2">
                     <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${ann.type === 'event' ? 'bg-purple-500/20 text-purple-300' : 'bg-blue-500/20 text-blue-300'}`}>{ann.type}</span>
                     <span className="text-xs text-gray-500 font-mono">{ann.date}</span>
                   </div>
                   <h4 className="font-bold text-gray-200 group-hover:text-white transition-colors">{ann.title}</h4>
                   <p className="text-sm text-gray-400 mt-1">{ann.content}</p>
                 </div>
               ))}
               {content.announcements.length === 0 && <p className="text-gray-500 italic text-sm">No new announcements.</p>}
             </div>
          </div>

          {/* Assignments Preview */}
          <div className="glass-card rounded-2xl p-6">
             <div className="flex justify-between items-center mb-6 border-b border-white/5 pb-4">
               <h3 className="font-bold text-lg text-white font-heading">{role === UserRole.TEACHER ? 'Recent Submissions' : 'Active Assignments'}</h3>
               <Link to="/dashboard/assignments" className="text-sm text-secondary hover:text-white transition-colors">View Database &rarr;</Link>
             </div>
             <div className="overflow-x-auto">
               <table className="w-full text-sm text-left">
                 <thead className="text-xs text-gray-500 uppercase font-mono bg-white/5">
                   <tr>
                     <th className="px-4 py-3 rounded-l-lg">Subject</th>
                     <th className="px-4 py-3">Task</th>
                     <th className="px-4 py-3">Due</th>
                     <th className="px-4 py-3 rounded-r-lg">State</th>
                   </tr>
                 </thead>
                 <tbody className="divide-y divide-white/5">
                   {MOCK_ASSIGNMENTS.map(ass => (
                     <tr key={ass.id} className="hover:bg-white/5 transition-colors">
                       <td className="px-4 py-4 font-bold text-gray-300">{ass.subject}</td>
                       <td className="px-4 py-4 text-gray-400">{ass.title}</td>
                       <td className="px-4 py-4 text-gray-500 font-mono text-xs">{ass.dueDate}</td>
                       <td className="px-4 py-4">
                         <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider border ${
                           ass.status === 'submitted' ? 'bg-green-500/10 text-green-400 border-green-500/20' : 'bg-orange-500/10 text-orange-400 border-orange-500/20'
                         }`}>
                           {ass.status}
                         </span>
                       </td>
                     </tr>
                   ))}
                 </tbody>
               </table>
             </div>
          </div>
        </div>

        {/* Right Sidebar Widget */}
        <div className="space-y-8">
           {/* Calendar / Events */}
           <div className="glass-card rounded-2xl p-6">
              <h3 className="font-bold text-lg text-white mb-6 font-heading">Schedule</h3>
              <div className="space-y-4">
                 {ACADEMIC_EVENTS.map(evt => (
                   <div key={evt.id} className="flex items-center space-x-4 p-3 rounded-xl hover:bg-white/5 transition-colors cursor-pointer border border-transparent hover:border-white/5">
                     <div className="flex-shrink-0 w-12 h-12 bg-white/5 rounded-xl flex flex-col items-center justify-center text-gray-300 border border-white/10">
                       <span className="text-[10px] font-bold uppercase text-secondary">{evt.date.split(' ')[0]}</span>
                       <span className="text-lg font-bold leading-none">{evt.date.split(' ')[1]}</span>
                     </div>
                     <div>
                       <h5 className="font-bold text-gray-200 text-sm">{evt.title}</h5>
                       <span className="text-xs text-gray-500 font-mono">{evt.time}</span>
                     </div>
                   </div>
                 ))}
              </div>
           </div>
           
           {/* Quick Actions */}
           {(role === UserRole.TEACHER || role === UserRole.ADMIN) && (
             <div className="relative rounded-2xl p-6 overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-primary to-accent opacity-80"></div>
                <div className="relative z-10">
                  <h3 className="font-bold text-lg text-white mb-4">Command Actions</h3>
                  <div className="grid grid-cols-2 gap-3">
                    <button 
                      onClick={handleCreate}
                      className="bg-black/30 hover:bg-black/50 backdrop-blur-sm p-4 rounded-xl flex flex-col items-center justify-center transition-all border border-white/10 hover:border-white/30"
                    >
                      <Plus size={24} className="mb-2 text-white" />
                      <span className="text-xs font-bold text-white uppercase tracking-wider">Create</span>
                    </button>
                    <button 
                      onClick={handleAlert}
                      className="bg-black/30 hover:bg-black/50 backdrop-blur-sm p-4 rounded-xl flex flex-col items-center justify-center transition-all border border-white/10 hover:border-white/30"
                    >
                      <Bell size={24} className="mb-2 text-white" />
                      <span className="text-xs font-bold text-white uppercase tracking-wider">Alert</span>
                    </button>
                  </div>
                </div>
             </div>
           )}
        </div>
      </div>
    </div>
  );
};

const AssignmentsView: React.FC<{ role: UserRole }> = ({ role }) => {
  return (
    <div className="glass-card rounded-2xl p-8 animate-fade-in">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-xl font-bold text-white font-heading">Assignment Database</h2>
        {role === UserRole.TEACHER && (
           <button className="bg-primary text-white px-4 py-2 rounded-lg flex items-center space-x-2 text-sm hover:bg-primary/80 hover:shadow-[0_0_15px_rgba(112,0,255,0.4)] transition-all">
             <Plus size={16} />
             <span>New Entry</span>
           </button>
        )}
      </div>
      <div className="grid gap-4">
        {MOCK_ASSIGNMENTS.map((assignment, index) => (
          <div key={index} className="flex flex-col md:flex-row justify-between items-start md:items-center p-5 bg-white/5 rounded-xl border border-white/5 hover:border-secondary/30 hover:bg-white/10 transition-all duration-300">
             <div>
                <span className="text-[10px] font-bold text-secondary uppercase tracking-wider">{assignment.subject}</span>
                <h3 className="font-bold text-lg text-white mt-1">{assignment.title}</h3>
                <p className="text-sm text-gray-500 font-mono mt-1">Due: {assignment.dueDate}</p>
             </div>
             <div className="mt-4 md:mt-0 flex items-center space-x-4">
                <span className={`px-3 py-1 rounded-full text-xs font-bold border ${
                   assignment.status === 'submitted' 
                   ? 'bg-green-500/10 text-green-400 border-green-500/30' 
                   : 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30'
                }`}>
                  {assignment.status.toUpperCase()}
                </span>
                <button className="text-sm border border-white/10 text-gray-300 px-4 py-2 rounded-lg hover:bg-white/10 hover:text-white transition-colors">
                  Details
                </button>
             </div>
          </div>
        ))}
      </div>
    </div>
  );
};

/* Helper Components */
const StatCard: React.FC<{ title: string; value: string; icon: any; color: string; bg: string; border: string }> = ({ title, value, icon, color, bg, border }) => (
  <div className={`p-6 rounded-2xl flex items-center space-x-4 hover:-translate-y-1 transition-transform duration-300 border ${border} ${bg} backdrop-blur-sm`}>
    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${color} bg-black/20`}>
      {icon}
    </div>
    <div>
      <p className="text-gray-400 text-xs font-bold uppercase tracking-wider">{title}</p>
      <h4 className="text-2xl font-bold text-white font-mono mt-1">{value}</h4>
    </div>
  </div>
);

export default Dashboard;