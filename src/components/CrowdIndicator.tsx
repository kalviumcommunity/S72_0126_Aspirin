import { CrowdLevel } from '@/types/train';
import { Users } from 'lucide-react';

interface CrowdIndicatorProps {
  level: CrowdLevel;
  showLabel?: boolean;
}

export const CrowdIndicator = ({ level, showLabel = true }: CrowdIndicatorProps) => {
  const getConfig = () => {
    switch (level) {
      case 'low':
        return {
          label: 'Low Crowd',
          className: 'crowd-low',
          dots: 1,
        };
      case 'medium':
        return {
          label: 'Medium Crowd',
          className: 'crowd-medium',
          dots: 2,
        };
      case 'high':
        return {
          label: 'High Crowd',
          className: 'crowd-high',
          dots: 3,
        };
    }
  };

  const config = getConfig();

  return (
    <div className={`crowd-indicator ${config.className}`}>
      <Users className="w-3.5 h-3.5" />
      <div className="flex gap-0.5">
        {[1, 2, 3].map((dot) => (
          <span
            key={dot}
            className={`w-1.5 h-1.5 rounded-full ${
              dot <= config.dots ? 'bg-current' : 'bg-current/20'
            }`}
          />
        ))}
      </div>
      {showLabel && <span>{config.label}</span>}
    </div>
  );
};
