import { Train } from '@/types/train';
import { StatusBadge } from './StatusBadge';
import { CrowdIndicator } from './CrowdIndicator';
import { Train as TrainIcon, ArrowRight, Info } from 'lucide-react';

interface TrainCardProps {
  train: Train;
}

export const TrainCard = ({ train }: TrainCardProps) => {
  return (
    <div className="card-elevated p-4 animate-fade-in">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center">
            <TrainIcon className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">{train.name}</h3>
            <p className="text-xs text-muted-foreground">#{train.number} • {train.line} Line</p>
          </div>
        </div>
        <StatusBadge status={train.status} delayMinutes={train.delayMinutes} />
      </div>

      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
        <span className="font-medium text-foreground">{train.route.start}</span>
        <ArrowRight className="w-4 h-4" />
        <span className="font-medium text-foreground">{train.route.end}</span>
        {train.route.via && train.route.via.length > 0 && (
          <span className="text-xs">(via {train.route.via.join(', ')})</span>
        )}
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <span className="text-sm">
            <span className="text-muted-foreground">Scheduled:</span>{' '}
            <span className="font-medium">{train.scheduledTime}</span>
          </span>
          <CrowdIndicator level={train.crowdLevel} />
        </div>
        
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <Info className="w-3 h-3" />
          <span>{train.isSystemEstimated ? 'System Estimated' : 'User Reported'}</span>
        </div>
      </div>
    </div>
  );
};
