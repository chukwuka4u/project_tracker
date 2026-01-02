"use client"
import { useState } from 'react';
import { Project } from '@/lib/types';
// import { useAuth } from '@/context/AuthContext';
import { useProjects } from '@@/app/context/ProjectContext';
import { getUserById } from '@/lib/mockData';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { MoreVertical, Pencil, Trash2, Calendar, User } from 'lucide-react';
import { format } from 'date-fns';
import ProjectDialog from './ProjectDialog';
import { useToast } from '@/hooks/use-toast';

interface ProjectCardProps {
  project: Project;
}

const statusConfig = {
  pending: {
    label: 'Pending',
    className: 'bg-status-pending/10 text-status-pending border-status-pending/20',
  },
  ongoing: {
    label: 'Ongoing',
    className: 'bg-status-ongoing/10 text-status-ongoing border-status-ongoing/20',
  },
  completed: {
    label: 'Completed',
    className: 'bg-status-completed/10 text-status-completed border-status-completed/20',
  },
};

const ProjectCard = ({ project }: ProjectCardProps) => {
  const user = {id: "1", role: "admin", name: "john"} //useAuth();
  const { deleteProject } = useProjects();
  const { toast } = useToast();
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const creator = getUserById(project.createdBy);
  const updater = getUserById(project.updatedBy);
  const status = statusConfig[project.status];

  const canModify = user?.role === 'admin' || project.createdBy === user?.id;

  const handleDelete = () => {
    deleteProject(project.id);
    toast({
      title: 'Project deleted',
      description: `"${project.title}" has been deleted.`,
    });
    setIsDeleteDialogOpen(false);
  };

  return (
    <>
      <Card className="group hover:shadow-md transition-all duration-200 border-border/50">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1 min-w-0">
              <Badge variant="outline" className={status.className}>
                {status.label}
              </Badge>
              <CardTitle className="mt-2 text-lg line-clamp-1">{project.title}</CardTitle>
            </div>
            {canModify && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setIsEditDialogOpen(true)}>
                    <Pencil className="h-4 w-4 mr-2" />
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() => setIsDeleteDialogOpen(true)}
                    className="text-destructive focus:text-destructive"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <CardDescription className="line-clamp-2">{project.summary}</CardDescription>
          
          <div className="flex flex-col gap-2 text-xs text-muted-foreground">
            <div className="flex items-center gap-2">
              <Calendar className="h-3.5 w-3.5" />
              <span>Created {format(new Date(project.createdAt), 'MMM d, yyyy')}</span>
            </div>
            <div className="flex items-center gap-2">
              <User className="h-3.5 w-3.5" />
              <span>By {creator?.name || 'Unknown'}</span>
            </div>
            {project.updatedAt !== project.createdAt && (
              <div className="text-xs text-muted-foreground/70">
                Updated by {updater?.name} on {format(new Date(project.updatedAt), 'MMM d, yyyy')}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <ProjectDialog
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        mode="edit"
        project={project}
      />

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Project</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete &quot;{project.title}&quot;? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default ProjectCard;
