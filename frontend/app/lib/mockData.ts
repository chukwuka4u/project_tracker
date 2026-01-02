import { User, Project, ActivityLog } from '@/lib/types';

export const mockUsers: User[] = [
  {
    id: '1',
    email: 'admin@gigasec.com',
    name: 'Sarah Admin',
    role: 'admin',
    createdAt: '2024-01-15T10:00:00Z',
  },
  {
    id: '2',
    email: 'john@gigasec.com',
    name: 'John Developer',
    role: 'user',
    createdAt: '2024-02-20T14:30:00Z',
  },
  {
    id: '3',
    email: 'emily@gigasec.com',
    name: 'Emily Designer',
    role: 'user',
    createdAt: '2024-03-10T09:15:00Z',
  },
];

export const mockProjects: Project[] = [
  {
    id: '1',
    title: 'Security Audit System',
    summary: 'Comprehensive security audit platform for enterprise clients with automated vulnerability scanning and compliance reporting.',
    status: 'ongoing',
    createdAt: '2024-06-01T08:00:00Z',
    updatedAt: '2024-12-20T16:45:00Z',
    createdBy: '1',
    updatedBy: '2',
  },
  {
    id: '2',
    title: 'Client Portal Redesign',
    summary: 'Complete overhaul of the customer-facing portal with improved UX, faster load times, and mobile-first design approach.',
    status: 'completed',
    createdAt: '2024-03-15T11:30:00Z',
    updatedAt: '2024-11-30T14:00:00Z',
    createdBy: '3',
    updatedBy: '3',
  },
  {
    id: '3',
    title: 'API Gateway Implementation',
    summary: 'Deploy centralized API gateway for microservices architecture with rate limiting, authentication, and monitoring capabilities.',
    status: 'pending',
    createdAt: '2024-12-01T09:00:00Z',
    updatedAt: '2024-12-01T09:00:00Z',
    createdBy: '2',
    updatedBy: '2',
  },
  {
    id: '4',
    title: 'Data Analytics Dashboard',
    summary: 'Real-time analytics dashboard for tracking key performance indicators and business metrics with interactive visualizations.',
    status: 'ongoing',
    createdAt: '2024-09-10T13:00:00Z',
    updatedAt: '2024-12-28T10:30:00Z',
    createdBy: '1',
    updatedBy: '1',
  },
  {
    id: '5',
    title: 'Mobile App Development',
    summary: 'Native mobile application for iOS and Android platforms enabling remote access to security monitoring tools.',
    status: 'pending',
    createdAt: '2024-12-15T08:00:00Z',
    updatedAt: '2024-12-15T08:00:00Z',
    createdBy: '2',
    updatedBy: '2',
  },
];

export const mockActivityLogs: ActivityLog[] = [
  {
    id: '1',
    projectId: '1',
    projectTitle: 'Security Audit System',
    action: 'updated',
    userId: '2',
    userName: 'John Developer',
    timestamp: '2024-12-20T16:45:00Z',
    details: 'Updated project status to ongoing',
  },
  {
    id: '2',
    projectId: '2',
    projectTitle: 'Client Portal Redesign',
    action: 'updated',
    userId: '3',
    userName: 'Emily Designer',
    timestamp: '2024-11-30T14:00:00Z',
    details: 'Marked project as completed',
  },
  {
    id: '3',
    projectId: '4',
    projectTitle: 'Data Analytics Dashboard',
    action: 'updated',
    userId: '1',
    userName: 'Sarah Admin',
    timestamp: '2024-12-28T10:30:00Z',
    details: 'Updated project summary',
  },
  {
    id: '4',
    projectId: '5',
    projectTitle: 'Mobile App Development',
    action: 'created',
    userId: '2',
    userName: 'John Developer',
    timestamp: '2024-12-15T08:00:00Z',
  },
  {
    id: '5',
    projectId: '3',
    projectTitle: 'API Gateway Implementation',
    action: 'created',
    userId: '2',
    userName: 'John Developer',
    timestamp: '2024-12-01T09:00:00Z',
  },
];

// Helper to find user by ID
export const getUserById = (id: string): User | undefined => {
  return mockUsers.find((user) => user.id === id);
};

// Credentials for demo login
export const demoCredentials = {
  admin: { email: 'admin@gigasec.com', password: 'admin123' },
  standard: { email: 'john@gigasec.com', password: 'john123' },
};
