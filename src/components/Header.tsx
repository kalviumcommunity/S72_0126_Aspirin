import { Navigation } from './Navigation';
import { Train } from 'lucide-react';

export const Header = () => {
  return (
    <header className="sticky top-0 z-50 glass-effect border-b border-border/50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl gradient-primary flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow">
              <Train className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="font-display font-bold text-xl text-foreground">BharatRail</h1>
              <p className="text-xs text-muted-foreground font-medium">Indian Railways Smart Companion</p>
            </div>
          </div>
          
          <div className="relative">
            <Navigation />
          </div>
        </div>
      </div>
    </header>
  );
};
