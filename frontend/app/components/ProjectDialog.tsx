"use client"
import { useState, useEffect } from 'react';
import { Project, ProjectStatus } from '@/lib/types';
import { useProjects } from '@/context/ProjectContext';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

interface ProjectDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode: 'create' | 'edit';
  project?: Project;
}

const ProjectDialog = ({ open, onOpenChange, mode, project }: ProjectDialogProps) => {
  const { createProject, updateProject } = useProjects();
  const { toast } = useToast();

  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [status, setStatus] = useState<ProjectStatus>('pending');

  useEffect(() => {
    if (mode === 'edit' && project) {
        
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setTitle(project.title);
      setSummary(project.summary);
      setStatus(project.status);
    } else {
      setTitle('');
      setSummary('');
      setStatus('pending');
    }
  }, [mode, project, open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !summary.trim()) {
      toast({
        title: 'Validation error',
        description: 'Please fill in all fields.',
        variant: 'destructive',
      });
      return;
    }

    if (mode === 'create') {
      createProject(title.trim(), summary.trim(), status);
      toast({
        title: 'Project created',
        description: `"${title}" has been created successfully.`,
      });
    } else if (project) {
      updateProject(project.id, {
        title: title.trim(),
        summary: summary.trim(),
        status,
      });
      toast({
        title: 'Project updated',
        description: `"${title}" has been updated successfully.`,
      });
    }

    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="font-heading">
            {mode === 'create' ? 'Create New Project' : 'Edit Project'}
          </DialogTitle>
          <DialogDescription>
            {mode === 'create'
              ? 'Add a new project to track within your organization.'
              : 'Update the project details below.'}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="title">Project Title</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter project title"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="summary">Summary</Label>
              <Textarea
                id="summary"
                value={summary}
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                onChange={(e : any) => setSummary(e.target.value)}
                placeholder="Brief description of the project"
                rows={3}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select value={status} onValueChange={(value : string) => setStatus(value as ProjectStatus)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="ongoing">Ongoing</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">
              {mode === 'create' ? 'Create Project' : 'Save Changes'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectDialog;
