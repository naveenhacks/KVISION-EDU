import { UserRole, Announcement, Assignment, Contact, Message } from '../types';

export const MOCK_ANNOUNCEMENTS: Announcement[] = [
  {
    id: '1',
    title: 'Science Fair 2024',
    content: 'Registration for the annual Science Fair is now open. Submit your projects by Oct 15th.',
    date: '2023-10-01',
    type: 'event',
  },
  {
    id: '2',
    title: 'Mid-Term Exam Schedule',
    content: 'The mid-term examinations will commence from November 1st. Please check the academics page for details.',
    date: '2023-10-05',
    type: 'academic',
  },
  {
    id: '3',
    title: 'School Closure',
    content: 'School will remain closed on Friday due to maintenance work.',
    date: '2023-10-10',
    type: 'general',
  },
];

export const MOCK_ASSIGNMENTS: Assignment[] = [
  {
    id: '101',
    subject: 'Mathematics',
    title: 'Calculus: Derivatives Problem Set',
    dueDate: '2023-10-20',
    status: 'pending',
  },
  {
    id: '102',
    subject: 'Physics',
    title: 'Lab Report: Pendulum Motion',
    dueDate: '2023-10-18',
    status: 'submitted',
  },
  {
    id: '103',
    subject: 'English Literature',
    title: 'Essay: Themes in Macbeth',
    dueDate: '2023-10-25',
    status: 'pending',
  },
];

export const ACADEMIC_EVENTS = [
  { id: 1, title: 'Math Olympiad', date: 'Nov 12', time: '10:00 AM' },
  { id: 2, title: 'Parent-Teacher Meeting', date: 'Nov 15', time: '09:00 AM' },
  { id: 3, title: 'Winter Break Starts', date: 'Dec 20', time: 'All Day' },
];

export const MOCK_CONTACTS: Contact[] = [
  {
    id: 'teacher-1',
    name: 'Mrs. Sarah Jenkins',
    role: UserRole.TEACHER,
    avatar: 'https://picsum.photos/id/1011/200/200',
    lastMessage: 'Please submit your assignment by tomorrow.',
    lastMessageTime: '10:30 AM',
    online: true,
  },
  {
    id: 'teacher-2',
    name: 'Mr. David Smith',
    role: UserRole.TEACHER,
    avatar: 'https://picsum.photos/id/1025/200/200',
    lastMessage: 'Great work on the project!',
    lastMessageTime: 'Yesterday',
    online: false,
  },
  {
    id: 'student-1',
    name: 'Alex Johnson',
    role: UserRole.STUDENT,
    avatar: 'https://picsum.photos/id/1005/200/200',
    lastMessage: 'I have a question about the homework.',
    lastMessageTime: '10:30 AM',
    online: true,
  },
  {
    id: 'student-2',
    name: 'Emily Davis',
    role: UserRole.STUDENT,
    avatar: 'https://picsum.photos/id/1027/200/200',
    lastMessage: 'Will the lab be open today?',
    lastMessageTime: '9:15 AM',
    online: true,
  }
];

export const MOCK_MESSAGES: Message[] = [
  {
    id: 'm1',
    senderId: 'teacher-1',
    receiverId: 'student-1',
    content: 'Hello Alex, please remember to submit your calculus assignment.',
    timestamp: new Date(Date.now() - 86400000).toISOString(),
    read: true,
  },
  {
    id: 'm2',
    senderId: 'student-1',
    receiverId: 'teacher-1',
    content: 'Yes Mrs. Jenkins, I am almost done with it.',
    timestamp: new Date(Date.now() - 82800000).toISOString(),
    read: true,
  },
  {
    id: 'm3',
    senderId: 'teacher-1',
    receiverId: 'student-1',
    content: 'Great, let me know if you need any help.',
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    read: true,
  },
];