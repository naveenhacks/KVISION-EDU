import React, { useState, useRef, useEffect } from 'react';
import { Send, X, Bot, Sparkles, Cpu } from 'lucide-react';
import { generateAIResponse } from '../services/geminiService';
import { useAuth } from '../context/AuthContext';
import { ChatMessage } from '../types';

const AIAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'model',
      text: 'Greetings. I am K-Assistant v2.5. Systems are online. How may I assist your academic operations?',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: inputValue,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const responseText = await generateAIResponse(userMessage.text, user?.role || 'STUDENT');
      
      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: responseText,
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 md:bottom-8 md:right-8 z-40 p-4 md:p-5 rounded-full shadow-[0_0_30px_rgba(112,0,255,0.6)] transition-all duration-300 transform hover:scale-110 hover:rotate-12 ${isOpen ? 'scale-0 opacity-0 pointer-events-none' : 'scale-100 opacity-100'} bg-black border border-primary text-primary group overflow-hidden`}
      >
        <div className="absolute inset-0 bg-primary/20 blur-lg rounded-full"></div>
        <Sparkles size={24} className="relative z-10 animate-pulse md:w-7 md:h-7" />
      </button>

      {/* Holographic Chat Window */}
      <div
        className={`fixed z-50 glass-card rounded-2xl flex flex-col transition-all duration-500 origin-bottom-right border border-primary/30 shadow-[0_0_50px_rgba(0,0,0,0.5)] 
        bottom-4 right-4 left-4 md:left-auto md:bottom-8 md:right-8 md:w-[400px]
        ${isOpen ? 'scale-100 opacity-100 translate-y-0' : 'scale-90 opacity-0 translate-y-10 pointer-events-none'}`}
        style={{ height: '550px', maxHeight: 'calc(100vh - 100px)' }}
      >
        {/* Header */}
        <div className="p-4 bg-gradient-to-r from-primary/20 to-transparent border-b border-primary/20 rounded-t-2xl flex justify-between items-center backdrop-blur-xl shrink-0">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-lg bg-black/40 border border-primary/50 flex items-center justify-center relative overflow-hidden shrink-0">
               <div className="absolute inset-0 bg-primary/20 animate-pulse"></div>
               <Bot size={20} className="text-secondary relative z-10" />
            </div>
            <div className="overflow-hidden">
              <h3 className="font-bold text-sm text-white tracking-wide font-heading truncate">K-ASSISTANT <span className="text-xs text-primary bg-primary/10 px-1 rounded ml-1">AI</span></h3>
              <p className="text-[10px] text-secondary font-mono tracking-wider truncate">ONLINE // v2.5</p>
            </div>
          </div>
          <button onClick={() => setIsOpen(false)} className="hover:bg-white/10 p-2 rounded-full transition-colors text-gray-400 hover:text-white shrink-0">
            <X size={20} />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-black/20 scrollbar-thin scrollbar-thumb-primary/30">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[85%] p-3 md:p-4 rounded-2xl text-sm leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-primary/20 text-white border border-primary/30 rounded-br-none shadow-[0_0_15px_rgba(112,0,255,0.1)]'
                    : 'bg-white/5 text-gray-200 border border-white/10 rounded-bl-none'
                }`}
              >
                {msg.role === 'model' && <Cpu size={14} className="mb-2 text-secondary opacity-70" />}
                {msg.text}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white/5 p-4 rounded-2xl rounded-bl-none border border-white/10 flex space-x-2 items-center">
                <div className="w-2 h-2 bg-secondary rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-2 h-2 bg-secondary rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-2 h-2 bg-secondary rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-3 md:p-4 bg-black/40 border-t border-white/5 rounded-b-2xl backdrop-blur-md shrink-0">
          <div className="flex items-center space-x-2 bg-white/5 border border-white/10 rounded-xl p-1 focus-within:border-secondary/50 focus-within:ring-1 focus-within:ring-secondary/50 transition-all">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Enter query..."
              className="flex-1 bg-transparent text-sm p-2 md:p-3 text-white placeholder-gray-500 focus:outline-none min-w-0"
            />
            <button
              onClick={handleSend}
              disabled={isLoading || !inputValue.trim()}
              className="p-2 md:p-3 bg-secondary/10 text-secondary rounded-lg hover:bg-secondary hover:text-black hover:shadow-[0_0_15px_rgba(0,243,255,0.4)] disabled:opacity-30 disabled:hover:shadow-none disabled:hover:bg-secondary/10 disabled:hover:text-secondary transition-all duration-300 shrink-0"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AIAssistant;