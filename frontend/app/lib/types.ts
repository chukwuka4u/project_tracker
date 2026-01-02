export type UserRole = 'admin' | 'user';

export type ProjectStatus = 'pending' | 'ongoing' | 'completed';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  createdAt: string;
}

export interface Project {
  id: string;
  title: string;
  summary: string;
  status: ProjectStatus;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  updatedBy: string; 
}

export interface ActivityLog {
  id: string;
  projectId: string;
  projectTitle: string;
  action: 'created' | 'updated' ;
  userId: string;
  userName: string;
  timestamp: string;
  details?: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}
