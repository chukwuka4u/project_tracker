import React, { createContext, useContext, useState, useCallback } from 'react';
import { Project, ActivityLog, ProjectStatus } from '@/lib/types';
import { mockProjects, mockActivityLogs } from '@/lib/mockData';
// import { useAuth } from './AuthContext';

interface ProjectContextType {
  projects: Project[];
  activityLogs: ActivityLog[];
  createProject: (title: string, summary: string, status: ProjectStatus) => void;
  updateProject: (id: string, updates: Partial<Pick<Project, 'title' | 'summary' | 'status'>>) => void;
  deleteProject: (id: string) => void;
  getProjectById: (id: string) => Project | undefined;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export const ProjectProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [projects, setProjects] = useState<Project[]>(mockProjects);
  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>(mockActivityLogs);
  const user = {id: "1", role: "admin", name: "john"} //useAuth();

  const addActivityLog = useCallback((
    projectId: string,
    projectTitle: string,
    action: 'created' | 'updated' ,
    details?: string
  ) => {
    if (!user) return;

    const newLog: ActivityLog = {
      id: String(activityLogs.length + 1),
      projectId,
      projectTitle,
      action,
      userId: user.id,
      userName: user.name,
      timestamp: new Date().toISOString(),
      details,
    };

    setActivityLogs((prev) => [newLog, ...prev]);
  }, [user, activityLogs.length]);

  const createProject = useCallback((title: string, summary: string, status: ProjectStatus) => {
    if (!user) return;

    const newProject: Project = {
      id: String(projects.length + 1),
      title,
      summary,
      status,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      createdBy: user.id,
      updatedBy: user.id,
    };

    setProjects((prev) => [...prev, newProject]);
    addActivityLog(newProject.id, title, 'created');
  }, [user, projects.length, addActivityLog]);

  const updateProject = useCallback((id: string, updates: Partial<Pick<Project, 'title' | 'summary' | 'status'>>) => {
    if (!user) return;

    setProjects((prev) =>
      prev.map((project) => {
        if (project.id === id) {
          const updatedProject = {
            ...project,
            ...updates,
            updatedAt: new Date().toISOString(),
            updatedBy: user.id,
          };
          
          const changeDetails = Object.entries(updates)
            .map(([key, value]) => `Updated ${key} to "${value}"`)
            .join(', ');
          
          addActivityLog(id, updatedProject.title, 'updated', changeDetails);
          
          return updatedProject;
        }
        return project;
      })
    );
  }, [user, addActivityLog]);

  const deleteProject = useCallback((id: string) => {
    const project = projects.find((p) => p.id === id);
    if (!project || !user) return;

    setProjects((prev) => prev.filter((p) => p.id !== id));
  }, [projects, user, addActivityLog]);

  const getProjectById = useCallback((id: string) => {
    return projects.find((p) => p.id === id);
  }, [projects]);

  return (
    <ProjectContext.Provider
      value={{
        projects,
        activityLogs,
        createProject,
        updateProject,
        deleteProject,
        getProjectById,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

export const useProjects = (): ProjectContextType => {
  const context = useContext(ProjectContext);
  if (context === undefined) {
    throw new Error('useProjects must be used within a ProjectProvider');
  }
  return context;
};
