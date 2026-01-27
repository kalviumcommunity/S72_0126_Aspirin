import { CommunityReport } from '@/types/train';
import { User, AlertTriangle } from 'lucide-react';

interface ReportCardProps {
  report: CommunityReport;
}

const getTimeAgo = (dateInput: Date | string): string => {
  const date = typeof dateInput === 'string' ? new Date(dateInput) : dateInput;
  const minutes = Math.floor((Date.now() - date.getTime()) / 60000);
  if (minutes < 1) return 'Just now';
  if (minutes === 1) return '1 minute ago';
  if (minutes < 60) return `${minutes} minutes ago`;
  const hours = Math.floor(minutes / 60);
  if (hours === 1) return '1 hour ago';
  return `${hours} hours ago`;
};

export const ReportCard = ({ report }: ReportCardProps) => {
  const isMultipleReports = report.reportCount > 3;

  return (
    <div className={`card-elevated p-4 animate-fade-in ${isMultipleReports ? 'border-l-4 border-l-accent' : ''}`}>
      {isMultipleReports && (
        <div className="flex items-center gap-2 text-status-heavy-delay text-xs font-medium mb-2">
          <AlertTriangle className="w-3.5 h-3.5" />
          <span>{report.reportCount} users reported delay for this train</span>
        </div>
      )}
      
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
            <User className="w-4 h-4 text-muted-foreground" />
          </div>
          <div>
            <h4 className="font-medium text-foreground text-sm">{report.trainName}</h4>
            <div className="flex items-center gap-2 mt-1">
              <span className="status-badge bg-secondary text-secondary-foreground text-xs">
                {report.delayType}
              </span>
              <span className="text-xs text-muted-foreground">
                {getTimeAgo(report.timestamp)}
              </span>
            </div>
            {report.additionalInfo && (
              <p className="text-xs text-muted-foreground mt-2 italic">
                "{report.additionalInfo}"
              </p>
            )}
          </div>
        </div>
        
        <span className="text-[10px] px-2 py-1 rounded-full bg-accent/10 text-accent font-medium">
          User Reported
        </span>
      </div>
    </div>
  );
};
