"use client"
import { useState, useEffect } from 'react';
import { TrackerAPI } from '@/lib/requests'
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useProjects } from '@@/app/context/ProjectContext';
import { ProjectStatus } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Shield, LogOut, Plus, Search, FolderKanban, 
  Clock, CheckCircle2, Loader2, Activity 
} from 'lucide-react';
import ProjectCard from '@/components/ProjectCard';
import ProjectDialog from '@/components/ProjectDialog';
import ActivityLogPanel from '@/components/ActivityLogPanel';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Project } from '@/lib/types';
import { signOut, useSession } from 'next-auth/react';

const Dashboard = () => {
  const {data: session} = useSession()
  const user = {role: session?.user!.role, name: session?.user!.name}
  const { projects } = useProjects();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<ProjectStatus | 'all'>('all');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

 useEffect(() => {
  (
    async function () {
      const result = await TrackerAPI.getProject()
      console.log(result)
    }
  )()
 }, []) 
  
  const handleLogout = () => {
    signOut();
    // router.push('/auth/login');
  };

  const filteredProjects = projects.filter((project : Project) => {
    const matchesSearch =
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.summary.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || project.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const statusCounts = {
    all: projects.length,
    pending: projects.filter((p : Project) => p.status === 'pending').length,
    ongoing: projects.filter((p : Project) => p.status === 'ongoing').length,
    completed: projects.filter((p : Project) => p.status === 'completed').length,
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary">
              <Shield className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-lg font-heading font-bold text-foreground">Project Tracker</h1>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted">
              <span className="text-sm text-muted-foreground">Welcome,</span>
              <span className="text-sm font-medium text-foreground">{user?.name}</span>
              {user?.role === 'admin' && (
                <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-accent text-accent-foreground">
                  Admin
                </span>
              )}
            </div>
            <Button variant="ghost" size="icon" onClick={handleLogout}>
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      <main className="container py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <StatCard
            icon={FolderKanban}
            label="Total Projects"
            value={statusCounts.all}
            color="text-foreground"
          />
          <StatCard
            icon={Clock}
            label="Pending"
            value={statusCounts.pending}
            color="text-status-pending"
          />
          <StatCard
            icon={Loader2}
            label="Ongoing"
            value={statusCounts.ongoing}
            color="text-status-ongoing"
          />
          <StatCard
            icon={CheckCircle2}
            label="Completed"
            value={statusCounts.completed}
            color="text-status-completed"
          />
        </div>

        <Tabs defaultValue="projects" className="space-y-6">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <TabsList>
              <TabsTrigger value="projects" className="gap-2">
                <FolderKanban className="h-4 w-4" />
                Projects
              </TabsTrigger>
              <TabsTrigger value="activity" className="gap-2">
                <Activity className="h-4 w-4" />
                Activity Log
              </TabsTrigger>
            </TabsList>

            <Button onClick={() => setIsCreateDialogOpen(true)} className="gap-2">
              <Plus className="h-4 w-4" />
              New Project
            </Button>
          </div>

          <TabsContent value="projects" className="space-y-6">
            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search projects..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex gap-2">
                {(['all', 'pending', 'ongoing', 'completed'] as const).map((status) => (
                  <Button
                    key={status}
                    variant={statusFilter === status ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setStatusFilter(status)}
                    className="capitalize"
                  >
                    {status} ({statusCounts[status]})
                  </Button>
                ))}
              </div>
            </div>

            {/* Projects Grid */}
            {filteredProjects.length > 0 ? (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {filteredProjects.map((project : Project, index : number) => (
                  <div
                    key={project.id}
                    className="animate-fade-in"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <ProjectCard project={project} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <FolderKanban className="h-16 w-16 text-muted-foreground/30 mb-4" />
                <h3 className="text-lg font-medium text-foreground mb-2">No projects found</h3>
                <p className="text-muted-foreground mb-4">
                  {searchQuery || statusFilter !== 'all'
                    ? 'Try adjusting your search or filters'
                    : 'Create your first project to get started'}
                </p>
                {!searchQuery && statusFilter === 'all' && (
                  <Button onClick={() => setIsCreateDialogOpen(true)} className="gap-2">
                    <Plus className="h-4 w-4" />
                    Create Project
                  </Button>
                )}
              </div>
            )}
          </TabsContent>

          <TabsContent value="activity">
            <ActivityLogPanel />
          </TabsContent>
        </Tabs>
      </main>

      <ProjectDialog
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
        mode="create"
      />
    </div>
  );
};

interface StatCardProps {
  icon: React.ElementType;
  label: string;
  value: number;
  color: string;
}

const StatCard = ({ icon: Icon, label, value, color }: StatCardProps) => (
  <div className="p-4 rounded-xl bg-card border border-border shadow-sm">
    <div className="flex items-center gap-3">
      <div className={`p-2 rounded-lg bg-muted ${color}`}>
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <p className="text-2xl font-heading font-bold text-foreground">{value}</p>
        <p className="text-sm text-muted-foreground">{label}</p>
      </div>
    </div>
  </div>
);

export default Dashboard;
