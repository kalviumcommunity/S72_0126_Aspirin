import { TravelSuggestion } from '@/types/train';
import * as Icons from 'lucide-react';

interface SuggestionCardProps {
  suggestion: TravelSuggestion;
}

export const SuggestionCard = ({ suggestion }: SuggestionCardProps) => {
  const getPriorityStyles = () => {
    switch (suggestion.priority) {
      case 'high':
        return 'border-l-4 border-l-status-heavy-delay bg-status-heavy-delay-bg/50';
      case 'medium':
        return 'border-l-4 border-l-accent bg-accent/5';
      case 'low':
        return 'border-l-4 border-l-muted-foreground/30 bg-secondary';
    }
  };

  const getIconColor = () => {
    switch (suggestion.priority) {
      case 'high':
        return 'text-status-heavy-delay';
      case 'medium':
        return 'text-accent';
      case 'low':
        return 'text-muted-foreground';
    }
  };

  const IconComponent = Icons[suggestion.icon as keyof typeof Icons] as React.ComponentType<any> || Icons.AlertTriangle;

  return (
    <div className={`p-4 rounded-lg ${getPriorityStyles()} animate-slide-in`}>
      <div className="flex items-start gap-3">
        <IconComponent className={`w-5 h-5 flex-shrink-0 mt-0.5 ${getIconColor()}`} />
        <p className="text-sm text-foreground">{suggestion.message}</p>
      </div>
    </div>
  );
};
