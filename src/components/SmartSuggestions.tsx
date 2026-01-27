import { useEffect, useState } from 'react';
import { suggestionAPI } from '@/services/api';
import { SuggestionCard } from './SuggestionCard';
import { Lightbulb } from 'lucide-react';

const FALLBACK_SUGGESTIONS = [
  {
    id: '1',
    icon: 'AlertTriangle',
    message: 'Your usual train is delayed by 20 mins',
    priority: 'high',
  },
  {
    id: '2',
    icon: 'Train',
    message: 'Next train arrives in 7 mins',
    priority: 'medium',
  },
  {
    id: '3',
    icon: 'Zap',
    message: 'Switching at Dadar may save 10 mins',
    priority: 'medium',
  },
  {
    id: '4',
    icon: 'Users',
    message: 'Less crowded trains available on Central Line',
    priority: 'low',
  },
];

export const SmartSuggestions = () => {
  const [suggestions, setSuggestions] = useState(FALLBACK_SUGGESTIONS);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSuggestions = async () => {
      setIsLoading(true);
      try {
        const data = await suggestionAPI.getAll();
        setSuggestions(data);
      } catch (error) {
        console.error('Failed to fetch suggestions, using fallback:', error);
        // Keep fallback data
      } finally {
        setIsLoading(false);
      }
    };
    fetchSuggestions();
  }, []);

  return (
    <div className="card-elevated p-4">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 rounded-lg gradient-accent flex items-center justify-center">
          <Lightbulb className="w-4 h-4 text-accent-foreground" />
        </div>
        <h3 className="font-semibold text-foreground">Smart Travel Suggestions</h3>
      </div>
      
      <div className="space-y-3">
        {isLoading ? (
          <p className="text-sm text-muted-foreground">Loading suggestions...</p>
        ) : suggestions.length === 0 ? (
          <p className="text-sm text-muted-foreground">No suggestions available</p>
        ) : (
          suggestions.map((suggestion) => (
            <SuggestionCard key={suggestion.id} suggestion={suggestion} />
          ))
        )}
      </div>
    </div>
  );
};
