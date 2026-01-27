import { RouteOption } from '@/types/train';
import { CrowdIndicator } from './CrowdIndicator';
import { Clock, ArrowRight, CheckCircle, AlertTriangle, XCircle } from 'lucide-react';

interface RouteCardProps {
  route: RouteOption;
}

export const RouteCard = ({ route }: RouteCardProps) => {
  const getRecommendationConfig = () => {
    switch (route.recommendation) {
      case 'best':
        return {
          label: 'Best Option',
          className: 'bg-status-ontime-bg text-status-ontime',
          icon: CheckCircle,
        };
      case 'acceptable':
        return {
          label: 'Acceptable',
          className: 'bg-status-slight-delay-bg text-status-slight-delay',
          icon: AlertTriangle,
        };
      case 'avoid':
        return {
          label: 'Avoid',
          className: 'bg-status-heavy-delay-bg text-status-heavy-delay',
          icon: XCircle,
        };
    }
  };

  const config = getRecommendationConfig();
  const Icon = config.icon;

  return (
    <div className={`card-elevated p-4 animate-fade-in ${route.recommendation === 'best' ? 'ring-2 ring-status-ontime/30' : ''}`}>
      <div className="flex items-start justify-between mb-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="font-semibold text-foreground">{route.type}</span>
            {route.junctionStation && (
              <span className="text-xs text-muted-foreground">
                via {route.junctionStation}
              </span>
            )}
          </div>
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
            {route.trains.map((train, idx) => (
              <span key={train} className="flex items-center gap-1.5">
                <span>{train}</span>
                {idx < route.trains.length - 1 && <ArrowRight className="w-3 h-3" />}
              </span>
            ))}
          </div>
        </div>
        
        <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${config.className}`}>
          <Icon className="w-3 h-3" />
          {config.label}
        </span>
      </div>

      <div className="flex items-center gap-4 text-sm">
        <div className="flex items-center gap-1.5 text-muted-foreground">
          <Clock className="w-4 h-4" />
          <span>{route.totalTime} min</span>
          {route.estimatedDelay > 0 && (
            <span className="text-status-slight-delay">(+{route.estimatedDelay} delay)</span>
          )}
        </div>
        <CrowdIndicator level={route.crowdLevel} />
      </div>
    </div>
  );
};
