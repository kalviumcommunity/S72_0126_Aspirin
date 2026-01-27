import { DelayStatus } from '@/types/train';
import { CheckCircle, Clock, AlertTriangle } from 'lucide-react';

interface StatusBadgeProps {
  status: DelayStatus;
  delayMinutes?: number;
  showIcon?: boolean;
  size?: 'sm' | 'md';
}

export const StatusBadge = ({ status, delayMinutes, showIcon = true, size = 'md' }: StatusBadgeProps) => {
  const getStatusConfig = () => {
    switch (status) {
      case 'on-time':
        return {
          label: 'On Time',
          className: 'status-ontime',
          icon: CheckCircle,
        };
      case 'slight-delay':
        return {
          label: delayMinutes ? `${delayMinutes} min delay` : 'Slight Delay',
          className: 'status-slight-delay',
          icon: Clock,
        };
      case 'heavy-delay':
        return {
          label: delayMinutes ? `${delayMinutes} min delay` : 'Heavy Delay',
          className: 'status-heavy-delay',
          icon: AlertTriangle,
        };
    }
  };

  const config = getStatusConfig();
  const Icon = config.icon;
  const sizeClasses = size === 'sm' ? 'text-[10px] px-2 py-0.5' : 'text-xs px-2.5 py-1';

  return (
    <span className={`${config.className} ${sizeClasses}`}>
      {showIcon && <Icon className={size === 'sm' ? 'w-3 h-3' : 'w-3.5 h-3.5'} />}
      <span>{config.label}</span>
    </span>
  );
};
