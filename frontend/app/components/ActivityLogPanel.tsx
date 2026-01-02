import { useProjects } from '@/context/ProjectContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { format, formatDistanceToNow } from 'date-fns';

const actionConfig = {
  created: {
    icon: Plus,
    label: 'Created',
    className: 'bg-status-completed/10 text-status-completed border-status-completed/20',
  },
  updated: {
    icon: Pencil,
    label: 'Updated',
    className: 'bg-status-ongoing/10 text-status-ongoing border-status-ongoing/20',
  },
  deleted: {
    icon: Trash2,
    label: 'Deleted',
    className: 'bg-destructive/10 text-destructive border-destructive/20',
  },
};

const ActivityLogPanel = () => {
  const { activityLogs } = useProjects();

  return (
    <Card className="border-border/50">
      <CardHeader>
        <CardTitle className="font-heading text-xl">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        {activityLogs.length > 0 ? (
          <ScrollArea className="h-[500px] pr-4">
            <div className="space-y-4">
              {activityLogs.map((log, index) => {
                const action = actionConfig[log.action];
                const Icon = action.icon;

                return (
                  <div
                    key={log.id}
                    className="flex gap-4 p-4 rounded-lg bg-muted/30 border border-border/50 animate-fade-in"
                    style={{ animationDelay: `${index * 30}ms` }}
                  >
                    <div className={`flex-shrink-0 p-2 rounded-lg ${action.className}`}>
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p className="font-medium text-foreground">
                            {log.userName}{' '}
                            <span className="text-muted-foreground font-normal">
                              {log.action} project
                            </span>
                          </p>
                          <p className="text-sm font-medium text-primary mt-0.5">
                            {log.projectTitle}
                          </p>
                        </div>
                        <Badge variant="outline" className={action.className}>
                          {action.label}
                        </Badge>
                      </div>
                      {log.details && (
                        <p className="text-sm text-muted-foreground mt-2">{log.details}</p>
                      )}
                      <p className="text-xs text-muted-foreground/70 mt-2">
                        {formatDistanceToNow(new Date(log.timestamp), { addSuffix: true })} •{' '}
                        {format(new Date(log.timestamp), 'MMM d, yyyy h:mm a')}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </ScrollArea>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="p-4 rounded-full bg-muted mb-4">
              <Pencil className="h-8 w-8 text-muted-foreground/50" />
            </div>
            <h3 className="text-lg font-medium text-foreground mb-2">No activity yet</h3>
            <p className="text-muted-foreground">
              Activity will appear here as projects are created, updated, or deleted.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ActivityLogPanel;
