import { Layout } from '@/components/Layout';
import { TrainFinder } from '@/components/TrainFinder';
import { SmartSuggestions } from '@/components/SmartSuggestions';
import { Train, Users, Clock, Zap } from 'lucide-react';

const Index = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="font-display font-bold text-4xl md:text-5xl text-foreground mb-4 leading-tight">
            Your Smart Travel Companion
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Make informed decisions when trains are delayed. Real-time insights from fellow commuters, powered by community intelligence.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {[
            { icon: Train, label: 'Live Trains', value: '10+', color: 'primary' },
            { icon: Users, label: 'Active Users', value: '1000+', color: 'accent' },
            { icon: Clock, label: 'Avg Response', value: '< 5 min', color: 'primary' },
            { icon: Zap, label: 'Status', value: 'Active', color: 'accent' },
          ].map((stat, idx) => (
            <div key={idx} className="card-elevated p-6 text-center hover:shadow-lg transition-shadow">
              <div className={`w-12 h-12 rounded-lg mx-auto mb-3 flex items-center justify-center ${stat.color === 'primary' ? 'gradient-primary' : 'bg-accent/10'}`}>
                <stat.icon className={`w-6 h-6 ${stat.color === 'primary' ? 'text-primary-foreground' : 'text-accent'}`} />
              </div>
              <p className="font-bold text-lg text-foreground">{stat.value}</p>
              <p className="text-xs text-muted-foreground font-medium">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <TrainFinder />
          </div>
          <div>
            <SmartSuggestions />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
