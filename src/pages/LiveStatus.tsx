import { useState, useEffect } from 'react';
import { Layout } from '@/components/Layout';
import { TrainCard } from '@/components/TrainCard';
import { trainAPI } from '@/services/api';
import { Train as TrainType } from '@/types/train';
import { Train, Filter, RefreshCw } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';

// Fallback trains data
const FALLBACK_TRAINS: TrainType[] = [
  {
    id: '1',
    name: 'Churchgate Fast',
    number: '90101',
    line: 'Western',
    route: { start: 'Virar', end: 'Churchgate' },
    scheduledTime: '08:15',
    delayMinutes: 0,
    crowdLevel: 'medium',
    status: 'on-time',
    isSystemEstimated: true,
  },
  {
    id: '2',
    name: 'Borivali Slow',
    number: '90203',
    line: 'Western',
    route: { start: 'Churchgate', end: 'Borivali' },
    scheduledTime: '08:22',
    delayMinutes: 12,
    crowdLevel: 'high',
    status: 'slight-delay',
    isSystemEstimated: true,
  },
  {
    id: '3',
    name: 'Virar Fast',
    number: '90305',
    line: 'Western',
    route: { start: 'Churchgate', end: 'Virar' },
    scheduledTime: '08:30',
    delayMinutes: 25,
    crowdLevel: 'high',
    status: 'heavy-delay',
    isSystemEstimated: false,
  },
  {
    id: '4',
    name: 'CSMT Fast',
    number: '91101',
    line: 'Central',
    route: { start: 'Kalyan', end: 'CSMT' },
    scheduledTime: '08:18',
    delayMinutes: 5,
    crowdLevel: 'medium',
    status: 'slight-delay',
    isSystemEstimated: true,
  },
  {
    id: '5',
    name: 'Thane Local',
    number: '91203',
    line: 'Central',
    route: { start: 'CSMT', end: 'Thane' },
    scheduledTime: '08:25',
    delayMinutes: 0,
    crowdLevel: 'low',
    status: 'on-time',
    isSystemEstimated: true,
  },
  {
    id: '6',
    name: 'Kalyan Fast',
    number: '91305',
    line: 'Central',
    route: { start: 'CSMT', end: 'Kalyan' },
    scheduledTime: '08:35',
    delayMinutes: 35,
    crowdLevel: 'high',
    status: 'heavy-delay',
    isSystemEstimated: false,
  },
  {
    id: '7',
    name: 'Panvel Local',
    number: '92101',
    line: 'Harbour',
    route: { start: 'CSMT', end: 'Panvel' },
    scheduledTime: '08:20',
    delayMinutes: 8,
    crowdLevel: 'medium',
    status: 'slight-delay',
    isSystemEstimated: true,
  },
  {
    id: '8',
    name: 'Vashi Local',
    number: '92203',
    line: 'Harbour',
    route: { start: 'CSMT', end: 'Vashi' },
    scheduledTime: '08:28',
    delayMinutes: 0,
    crowdLevel: 'low',
    status: 'on-time',
    isSystemEstimated: true,
  },
  {
    id: '9',
    name: 'Andheri Harbour',
    number: '92305',
    line: 'Harbour',
    route: { start: 'Panvel', end: 'Andheri', via: ['Vashi', 'Kurla'] },
    scheduledTime: '08:40',
    delayMinutes: 18,
    crowdLevel: 'medium',
    status: 'slight-delay',
    isSystemEstimated: false,
  },
  {
    id: '10',
    name: 'Dombivli Fast',
    number: '91407',
    line: 'Central',
    route: { start: 'CSMT', end: 'Dombivli' },
    scheduledTime: '08:45',
    delayMinutes: 3,
    crowdLevel: 'low',
    status: 'on-time',
    isSystemEstimated: true,
  },
];

const LiveStatus = () => {
  const [allTrains, setAllTrains] = useState<TrainType[]>(FALLBACK_TRAINS);
  const [lineFilter, setLineFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch all trains on component mount
  useEffect(() => {
    fetchTrains();
  }, []);

  const fetchTrains = async () => {
    setIsLoading(true);
    try {
      const data = await trainAPI.getAll();
      setAllTrains(data);
    } catch (error) {
      console.error('Failed to fetch trains, using fallback:', error);
      // Keep fallback data
    } finally {
      setIsLoading(false);
    }
  };

  const getFilteredTrains = (): TrainType[] => {
    let filtered = allTrains;
    
    if (lineFilter !== 'all') {
      filtered = filtered.filter(t => t.line === lineFilter);
    }
    
    if (statusFilter !== 'all') {
      filtered = filtered.filter(t => t.status === statusFilter);
    }
    
    return filtered;
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await fetchTrains();
    setTimeout(() => setIsRefreshing(false), 500);
  };

  const filteredTrains = getFilteredTrains();

  const statusCounts = {
    all: allTrains.length,
    'on-time': allTrains.filter(t => t.status === 'on-time').length,
    'slight-delay': allTrains.filter(t => t.status === 'slight-delay').length,
    'heavy-delay': allTrains.filter(t => t.status === 'heavy-delay').length,
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl gradient-primary flex items-center justify-center shadow-lg">
              <Train className="w-7 h-7 text-primary-foreground" />
            </div>
            <div>
              <h1 className="font-display font-bold text-3xl text-foreground">Live Status</h1>
              <p className="text-sm text-muted-foreground font-medium">Real-time train information</p>
            </div>
          </div>

          <Button
            onClick={handleRefresh}
            variant="outline"
            className="flex items-center gap-2"
          >
            <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>

        {/* Status Summary */}
        <div className="grid grid-cols-4 gap-2 md:gap-4 mb-6">
          {[
            { key: 'all', label: 'All', count: statusCounts.all },
            { key: 'on-time', label: 'On Time', count: statusCounts['on-time'], className: 'text-status-ontime' },
            { key: 'slight-delay', label: 'Slight Delay', count: statusCounts['slight-delay'], className: 'text-status-slight-delay' },
            { key: 'heavy-delay', label: 'Heavy Delay', count: statusCounts['heavy-delay'], className: 'text-status-heavy-delay' },
          ].map((item) => (
            <button
              key={item.key}
              onClick={() => setStatusFilter(item.key)}
              className={`card-elevated p-3 text-center transition-all ${
                statusFilter === item.key ? 'ring-2 ring-primary' : ''
              }`}
            >
              <p className={`font-bold text-xl ${item.className || 'text-foreground'}`}>
                {item.count}
              </p>
              <p className="text-xs text-muted-foreground">{item.label}</p>
            </button>
          ))}
        </div>

        {/* Filters */}
        <div className="card-elevated p-4 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm font-medium text-foreground">Filters</span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="input-label">Train Line</label>
              <Select value={lineFilter} onValueChange={setLineFilter}>
                <SelectTrigger className="bg-background">
                  <SelectValue placeholder="All Lines" />
                </SelectTrigger>
                <SelectContent className="bg-card">
                  <SelectItem value="all">All Lines</SelectItem>
                  <SelectItem value="Western">Western Line</SelectItem>
                  <SelectItem value="Central">Central Line</SelectItem>
                  <SelectItem value="Harbour">Harbour Line</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="input-label">Delay Status</label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="bg-background">
                  <SelectValue placeholder="All Status" />
                </SelectTrigger>
                <SelectContent className="bg-card">
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="on-time">On Time</SelectItem>
                  <SelectItem value="slight-delay">Slight Delay</SelectItem>
                  <SelectItem value="heavy-delay">Heavy Delay</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Train List */}
        <div className="grid md:grid-cols-2 gap-4">
          {filteredTrains.map((train) => (
            <TrainCard key={train.id} train={train} />
          ))}
        </div>

        {filteredTrains.length === 0 && (
          <div className="card-elevated p-12 text-center">
            <Train className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
            <h3 className="font-semibold text-lg text-foreground mb-2">No trains found</h3>
            <p className="text-sm text-muted-foreground">
              Try adjusting your filters to see more trains
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default LiveStatus;
