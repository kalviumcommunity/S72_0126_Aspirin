import { Info } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="mt-auto border-t border-border bg-card">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Info className="w-4 h-4" />
            <p>
              This is a simulated system using hardcoded data and community reports for educational purposes.
            </p>
          </div>
          
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span>Decision Support</span>
            <span>•</span>
            <span>Community Powered</span>
            <span>•</span>
            <span>Designed for Daily Commuters</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
