import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../services/supabase';
import { Message, Contact } from '../types';
import { Send, Search, MoreVertical, Circle, ChevronLeft } from 'lucide-react';
import toast from 'react-hot-toast';

const Messenger: React.FC = () => {
  const { user } = useAuth();
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // 1. Fetch Users (Contacts)
  useEffect(() => {
    if (!user) return;
    
    const fetchContacts = async () => {
      // Get everyone except current user
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .neq('id', user.id);

      if (data) {
        // Map profiles to Contact type
        const mappedContacts: Contact[] = data.map(p => ({
          id: p.id,
          name: p.name,
          role: p.role,
          avatar: p.avatar,
          online: false // Supabase Presence could handle this in future
        }));
        setContacts(mappedContacts);
      }
    };

    fetchContacts();
  }, [user]);

  // 2. Fetch Messages & Subscribe to Realtime
  useEffect(() => {
    if (!user || !selectedContact) return;

    // Fetch initial history
    const fetchMessages = async () => {
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .or(`and(sender_id.eq.${user.id},receiver_id.eq.${selectedContact.id}),and(sender_id.eq.${selectedContact.id},receiver_id.eq.${user.id})`)
        .order('created_at', { ascending: true });
        
      if (data) {
        const mapped: Message[] = data.map(m => ({
          id: m.id,
          senderId: m.sender_id,
          receiverId: m.receiver_id,
          content: m.content,
          timestamp: m.created_at,
          read: m.read
        }));
        setMessages(mapped);
      }
    };

    fetchMessages();

    // Realtime Subscription
    const channel = supabase
      .channel('chat_updates')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
          filter: `receiver_id=eq.${user.id}` // Listen for incoming
        },
        (payload) => {
          const newMsg = payload.new;
          if (newMsg.sender_id === selectedContact.id) {
             setMessages(prev => [...prev, {
               id: newMsg.id,
               senderId: newMsg.sender_id,
               receiverId: newMsg.receiver_id,
               content: newMsg.content,
               timestamp: newMsg.created_at,
               read: newMsg.read
             }]);
          } else {
            toast('New message from ' + selectedContact.name, { icon: '💬' });
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [selectedContact, user]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || !user || !selectedContact) return;

    const content = inputValue;
    setInputValue(''); // Optimistic clear

    try {
      const { data, error } = await supabase
        .from('messages')
        .insert({
          sender_id: user.id,
          receiver_id: selectedContact.id,
          content: content
        })
        .select()
        .single();

      if (error) throw error;

      if (data) {
        setMessages(prev => [...prev, {
          id: data.id,
          senderId: data.sender_id,
          receiverId: data.receiver_id,
          content: data.content,
          timestamp: data.created_at,
          read: false
        }]);
      }
    } catch (err) {
      console.error(err);
      toast.error('Failed to send message');
      setInputValue(content); // Restore if failed
    }
  };

  return (
    <div className="h-[calc(100vh-11rem)] md:h-[calc(100vh-10rem)] flex rounded-2xl overflow-hidden glass-card border border-white/5 animate-fade-in shadow-2xl">
      {/* Sidebar - Contact List */}
      <div className={`w-full md:w-80 bg-black/20 border-r border-white/5 flex flex-col ${selectedContact ? 'hidden md:flex' : 'flex'}`}>
        <div className="p-4 border-b border-white/5">
          <h2 className="text-xl font-bold text-white mb-4">Messages</h2>
          <div className="relative">
            <Search className="absolute left-3 top-2.5 text-gray-500" size={16} />
            <input 
              type="text" 
              placeholder="Search..." 
              className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:border-secondary/30 transition-all"
            />
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto">
          {contacts.map(contact => (
            <div 
              key={contact.id}
              onClick={() => setSelectedContact(contact)}
              className={`p-4 flex items-center space-x-4 cursor-pointer hover:bg-white/5 transition-all border-l-2 ${selectedContact?.id === contact.id ? 'bg-white/5 border-secondary' : 'border-transparent'}`}
            >
              <div className="relative flex-shrink-0">
                <img src={contact.avatar} alt={contact.name} className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-baseline mb-1">
                   <h3 className="font-bold text-gray-200 truncate text-sm md:text-base">{contact.name}</h3>
                   <span className="text-[10px] text-gray-500 flex-shrink-0 ml-2 uppercase">{contact.role}</span>
                </div>
              </div>
            </div>
          ))}
          {contacts.length === 0 && (
            <div className="p-8 text-center text-gray-500 text-sm">No other users found.</div>
          )}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className={`flex-1 flex flex-col w-full ${!selectedContact ? 'hidden md:flex' : 'flex'}`}>
        {selectedContact ? (
          <>
            {/* Chat Header */}
            <div className="p-3 md:p-4 border-b border-white/5 flex justify-between items-center bg-black/20 backdrop-blur-sm">
              <div className="flex items-center space-x-3">
                <button onClick={() => setSelectedContact(null)} className="md:hidden text-gray-400 hover:text-white p-1">
                  <ChevronLeft size={24} />
                </button>
                <img src={selectedContact.avatar} alt={selectedContact.name} className="w-8 h-8 md:w-10 md:h-10 rounded-full object-cover" />
                <div className="min-w-0">
                  <h3 className="font-bold text-white text-sm md:text-base truncate max-w-[120px] md:max-w-xs">{selectedContact.name}</h3>
                </div>
              </div>
              <div className="flex items-center space-x-1 md:space-x-3 text-secondary">
                <button className="p-2 hover:bg-white/10 rounded-full transition-colors text-gray-400"><MoreVertical size={18} /></button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-transparent to-black/20">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.senderId === user?.id ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[75%] md:max-w-[70%] p-3 rounded-2xl text-sm ${
                    msg.senderId === user?.id 
                      ? 'bg-secondary/20 text-white rounded-br-none border border-secondary/30' 
                      : 'bg-white/10 text-gray-200 rounded-bl-none border border-white/5'
                  }`}>
                    <p className="break-words">{msg.content}</p>
                    <p className={`text-[10px] mt-1 text-right ${msg.senderId === user?.id ? 'text-secondary/70' : 'text-gray-500'}`}>
                      {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <form onSubmit={handleSend} className="p-3 md:p-4 bg-black/20 border-t border-white/5">
              <div className="flex items-center space-x-2 bg-white/5 border border-white/10 rounded-xl p-1 focus-within:border-secondary/50 transition-all">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1 bg-transparent text-white px-3 md:px-4 py-2 text-sm focus:outline-none placeholder-gray-500 min-w-0"
                />
                <button 
                  type="submit"
                  disabled={!inputValue.trim()}
                  className="p-2 bg-secondary/20 text-secondary rounded-lg hover:bg-secondary hover:text-black transition-all disabled:opacity-50 disabled:hover:bg-secondary/20 disabled:hover:text-secondary flex-shrink-0"
                >
                  <Send size={18} />
                </button>
              </div>
            </form>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-gray-500 p-4 text-center">
             <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-4">
                <Circle size={40} className="text-secondary/50" />
             </div>
             <p>Select a contact to start chatting</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Messenger;