import React from 'react';

export enum UserRole {
  STUDENT = 'STUDENT',
  TEACHER = 'TEACHER',
  ADMIN = 'ADMIN',
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  phone?: string;
  bio?: string;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  date: string;
  type: 'general' | 'academic' | 'event';
}

export interface Assignment {
  id: string;
  subject: string;
  title: string;
  dueDate: string;
  status: 'pending' | 'submitted' | 'graded';
}

export interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: string;
  color?: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: string; // ISO string
  read: boolean;
}

export interface Contact {
  id: string;
  name: string;
  role: UserRole;
  avatar: string;
  lastMessage?: string;
  lastMessageTime?: string;
  online?: boolean;
}

// --- CMS TYPES ---

export interface HeroContent {
  badge: string;
  titlePrefix: string;
  titleHighlight: string;
  description: string;
}

export interface StatItem {
  id: number;
  val: string;
  label: string;
}

export interface ModuleContent {
  id: number;
  type: 'profile' | 'feature';
  title: string;
  desc: string;
  image?: string; // For principal/profile
  name?: string;  // For principal/profile
  iconName?: string; // To map back to Lucide icons if needed
}

export interface AboutContent {
  history: string;
  principalMessage: string;
  principalName: string;
  principalImage: string;
  achievements: string[];
}

export interface AcademicLevel {
  id: number;
  title: string;
  description: string;
}

export interface AcademicsContent {
  tagline: string;
  subTagline: string;
  levels: AcademicLevel[];
  evaluationText: string;
}

export interface SiteContent {
  hero: HeroContent;
  stats: StatItem[];
  modules: ModuleContent[];
  announcements: Announcement[];
  about: AboutContent;
  academics: AcademicsContent;
}