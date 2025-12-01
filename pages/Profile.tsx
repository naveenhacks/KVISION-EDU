import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { User, Save, Camera, Mail, Phone, FileText } from 'lucide-react';
import toast from 'react-hot-toast';

const Profile: React.FC = () => {
  const { user, updateProfile } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    bio: '',
    avatar: ''
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        email: user.email,
        phone: user.phone || '',
        bio: user.bio || '',
        avatar: user.avatar || ''
      });
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile(formData);
    setIsEditing(false);
    toast.success('Profile updated successfully!');
  };

  return (
    <div className="animate-fade-in max-w-4xl mx-auto">
      <div className="glass-card rounded-[2rem] overflow-hidden relative">
        {/* Banner */}
        <div className="h-48 bg-gradient-to-r from-primary via-secondary to-accent opacity-30"></div>
        
        <div className="px-8 pb-8">
          <div className="relative flex justify-between items-end -mt-16 mb-8">
            <div className="relative group">
              <div className="w-32 h-32 rounded-full p-1 bg-gradient-to-br from-white to-gray-500 shadow-2xl">
                <img 
                  src={formData.avatar || 'https://via.placeholder.com/150'} 
                  alt="Profile" 
                  className="w-full h-full rounded-full object-cover border-4 border-bg bg-black" 
                />
              </div>
              {isEditing && (
                <button className="absolute bottom-0 right-0 p-2 bg-primary text-white rounded-full hover:bg-primary/80 transition-colors shadow-lg border border-bg">
                  <Camera size={16} />
                </button>
              )}
            </div>
            
            {!isEditing ? (
              <button 
                onClick={() => setIsEditing(true)}
                className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-6 py-2.5 rounded-xl font-bold transition-all flex items-center gap-2"
              >
                <span>Edit Profile</span>
              </button>
            ) : (
               <div className="flex gap-3">
                 <button 
                  onClick={() => setIsEditing(false)}
                  className="bg-transparent hover:bg-white/5 text-gray-400 border border-transparent px-4 py-2.5 rounded-xl font-bold transition-all"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleSubmit}
                  className="bg-primary hover:bg-primary/80 text-white border border-primary/50 px-6 py-2.5 rounded-xl font-bold transition-all flex items-center gap-2 shadow-[0_0_15px_rgba(112,0,255,0.4)]"
                >
                  <Save size={18} />
                  <span>Save Changes</span>
                </button>
               </div>
            )}
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-2">
                  <User size={14} /> Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-secondary/50 focus:bg-white/10 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-2">
                  <Mail size={14} /> Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={true} // Email usually immutable
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-gray-400 focus:outline-none cursor-not-allowed"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-2">
                  <Phone size={14} /> Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  disabled={!isEditing}
                  placeholder="+91 ..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-secondary/50 focus:bg-white/10 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-2">
                  <User size={14} /> Role
                </label>
                <input
                  type="text"
                  value={user?.role}
                  disabled
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-secondary font-mono focus:outline-none cursor-not-allowed"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-2">
                <FileText size={14} /> Bio / Academic Goals
              </label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                disabled={!isEditing}
                rows={4}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-secondary/50 focus:bg-white/10 transition-all disabled:opacity-50 disabled:cursor-not-allowed resize-none"
                placeholder="Write a short bio..."
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;