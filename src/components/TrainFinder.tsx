import { useState, useEffect } from 'react';
import { SearchResult, TrainLine, Station } from '@/types/train';
import { trainAPI, stationAPI, routeAPI } from '@/services/api';
import { StatusBadge } from './StatusBadge';
import { CrowdIndicator } from './CrowdIndicator';
import { RouteCard } from './RouteCard';
import { Search, MapPin, Train, Clock, ArrowRight, Sparkles } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';

// Fallback data for when API is not available
const FALLBACK_STATIONS: Station[] = [
  { id: '1', name: 'Churchgate', code: 'CCG', lines: ['Western'] },
  { id: '2', name: 'Mumbai Central', code: 'BCT', lines: ['Western'] },
  { id: '3', name: 'Dadar', code: 'DR', lines: ['Western', 'Central', 'Harbour'] },
  { id: '4', name: 'Bandra', code: 'BA', lines: ['Western', 'Harbour'] },
  { id: '5', name: 'Andheri', code: 'ADH', lines: ['Western', 'Harbour'] },
  { id: '6', name: 'Borivali', code: 'BVI', lines: ['Western'] },
  { id: '7', name: 'Virar', code: 'VR', lines: ['Western'] },
  { id: '8', name: 'CSMT', code: 'CSMT', lines: ['Central', 'Harbour'] },
  { id: '9', name: 'Kurla', code: 'KLA', lines: ['Central', 'Harbour'] },
  { id: '10', name: 'Thane', code: 'TNA', lines: ['Central'] },
  { id: '11', name: 'Dombivli', code: 'DI', lines: ['Central'] },
  { id: '12', name: 'Kalyan', code: 'KYN', lines: ['Central'] },
  { id: '13', name: 'Panvel', code: 'PNVL', lines: ['Harbour'] },
  { id: '14', name: 'Vashi', code: 'VASI', lines: ['Harbour'] },
  { id: '15', name: 'Nerul', code: 'NRL', lines: ['Harbour'] },
];

const FALLBACK_ROUTES = [
  {
    id: '1',
    type: 'Direct',
    trains: ['Churchgate Fast'],
    estimatedDelay: 0,
    crowdLevel: 'medium',
    recommendation: 'best',
    totalTime: 45,
  },
  {
    id: '2',
    type: 'Via Junction',
    trains: ['Dadar Local', 'Central Line'],
    estimatedDelay: 8,
    crowdLevel: 'low',
    recommendation: 'acceptable',
    totalTime: 55,
    junctionStation: 'Dadar',
  },
  {
    id: '3',
    type: 'Via Junction',
    trains: ['Andheri Slow', 'Harbour Line'],
    estimatedDelay: 22,
    crowdLevel: 'high',
    recommendation: 'avoid',
    totalTime: 70,
    junctionStation: 'Andheri',
  },
];

export const TrainFinder = () => {
  const [currentStation, setCurrentStation] = useState('');
  const [destination, setDestination] = useState('');
  const [line, setLine] = useState<TrainLine | ''>('');
  const [travelTime, setTravelTime] = useState('now');
  const [result, setResult] = useState<SearchResult | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [stations, setStations] = useState<Station[]>(FALLBACK_STATIONS);
  const [alternativeRoutes, setAlternativeRoutes] = useState(FALLBACK_ROUTES);

  // Fetch all stations on component mount
  useEffect(() => {
    const fetchStations = async () => {
      try {
        const data = await stationAPI.getAll();
        setStations(data);
      } catch (error) {
        console.error('Failed to fetch stations, using fallback data:', error);
        // Keep fallback data if API fails
      }
    };
    fetchStations();
  }, []);

  // Fetch route options
  useEffect(() => {
    const fetchRoutes = async () => {
      try {
        const data = await routeAPI.getAll();
        setAlternativeRoutes(data);
      } catch (error) {
        console.error('Failed to fetch routes, using fallback data:', error);
        // Keep fallback data if API fails
      }
    };
    fetchRoutes();
  }, []);

  const handleSearch = async () => {
    if (!currentStation || !destination || !line) return;
    
    setIsSearching(true);
    
    try {
      const lineTrains = await trainAPI.getAll(line as string);
      const recommendedTrain = lineTrains[Math.floor(Math.random() * lineTrains.length)] || lineTrains[0];
      
      const actions = [
        'Wait for this train - best option for your route',
        'Switch to next train for faster arrival',
        'Change route via Dadar for quicker journey',
      ];

      setResult({
        recommendedTrain,
        expectedDelay: recommendedTrain.delayMinutes,
        crowdLevel: recommendedTrain.crowdLevel,
        status: recommendedTrain.status,
        suggestedAction: actions[recommendedTrain.status === 'on-time' ? 0 : recommendedTrain.status === 'slight-delay' ? 1 : 2],
        alternativeRoutes: alternativeRoutes,
      });
    } catch (error) {
      console.error('Search failed:', error);
    } finally {
      setIsSearching(false);
    }
  };

  const filteredStations = line 
    ? stations.filter(s => s.lines.includes(line as TrainLine))
    : stations;

  return (
    <div className="space-y-6">
      {/* Search Form */}
      <div className="card-elevated p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
            <Search className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h2 className="font-display font-semibold text-lg text-foreground">What should I do now?</h2>
            <p className="text-sm text-muted-foreground">Find the best train for your journey</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="input-label">
              <MapPin className="w-3.5 h-3.5 inline mr-1" />
              Train Line
            </label>
            <Select value={line} onValueChange={(val) => { setLine(val as TrainLine); setCurrentStation(''); setDestination(''); }}>
              <SelectTrigger className="bg-background">
                <SelectValue placeholder="Select line" />
              </SelectTrigger>
              <SelectContent className="bg-card">
                <SelectItem value="Western">Western Line</SelectItem>
                <SelectItem value="Central">Central Line</SelectItem>
                <SelectItem value="Harbour">Harbour Line</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="input-label">
              <Clock className="w-3.5 h-3.5 inline mr-1" />
              Travel Time
            </label>
            <Select value={travelTime} onValueChange={setTravelTime}>
              <SelectTrigger className="bg-background">
                <SelectValue placeholder="When to travel" />
              </SelectTrigger>
              <SelectContent className="bg-card">
                <SelectItem value="now">Now</SelectItem>
                <SelectItem value="15min">In 15 minutes</SelectItem>
                <SelectItem value="30min">In 30 minutes</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="input-label">
              <Train className="w-3.5 h-3.5 inline mr-1" />
              Current Station
            </label>
            <Select value={currentStation} onValueChange={setCurrentStation} disabled={!line}>
              <SelectTrigger className="bg-background">
                <SelectValue placeholder={line ? "Select station" : "Select line first"} />
              </SelectTrigger>
              <SelectContent className="bg-card">
                {filteredStations.map((station) => (
                  <SelectItem key={station.id} value={station.id}>
                    {station.name} ({station.code})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="input-label">
              <MapPin className="w-3.5 h-3.5 inline mr-1" />
              Destination
            </label>
            <Select value={destination} onValueChange={setDestination} disabled={!line}>
              <SelectTrigger className="bg-background">
                <SelectValue placeholder={line ? "Select destination" : "Select line first"} />
              </SelectTrigger>
              <SelectContent className="bg-card">
                {filteredStations.filter(s => s.id !== currentStation).map((station) => (
                  <SelectItem key={station.id} value={station.id}>
                    {station.name} ({station.code})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <Button
          onClick={handleSearch}
          disabled={!currentStation || !destination || !line || isSearching}
          className="w-full mt-6 h-12 text-base font-semibold gradient-primary hover:opacity-90 transition-opacity shadow-button"
        >
          {isSearching ? (
            <span className="flex items-center gap-2">
              <span className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
              Finding best option...
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <Search className="w-5 h-5" />
              Find Best Option
            </span>
          )}
        </Button>
      </div>

      {/* Result */}
      {result && (
        <div className="space-y-4 animate-fade-in">
          {/* Main Recommendation */}
          <div className="card-elevated p-6 border-l-4 border-l-primary">
            <div className="flex items-center gap-2 text-primary text-sm font-medium mb-4">
              <Sparkles className="w-4 h-4" />
              <span>Recommended Train</span>
            </div>

            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-display font-bold text-xl text-foreground">
                  {result.recommendedTrain.name}
                </h3>
                <p className="text-sm text-muted-foreground">
                  #{result.recommendedTrain.number} • {result.recommendedTrain.line} Line
                </p>
              </div>
              <StatusBadge status={result.status} delayMinutes={result.expectedDelay} />
            </div>

            <div className="flex items-center gap-2 text-sm mb-4 p-3 rounded-lg bg-secondary">
              <span className="font-medium">{result.recommendedTrain.route.start}</span>
              <ArrowRight className="w-4 h-4 text-muted-foreground" />
              <span className="font-medium">{result.recommendedTrain.route.end}</span>
            </div>

            <div className="flex items-center justify-between mb-4">
              <CrowdIndicator level={result.crowdLevel} />
              <span className="text-sm text-muted-foreground">
                Scheduled: <span className="font-medium text-foreground">{result.recommendedTrain.scheduledTime}</span>
              </span>
            </div>

            <div className={`p-4 rounded-lg ${
              result.status === 'on-time' 
                ? 'bg-status-ontime-bg' 
                : result.status === 'slight-delay' 
                  ? 'bg-status-slight-delay-bg' 
                  : 'bg-status-heavy-delay-bg'
            }`}>
              <p className={`text-sm font-medium ${
                result.status === 'on-time' 
                  ? 'text-status-ontime' 
                  : result.status === 'slight-delay' 
                    ? 'text-status-slight-delay' 
                    : 'text-status-heavy-delay'
              }`}>
                💡 {result.suggestedAction}
              </p>
            </div>
          </div>

          {/* Route Comparison */}
          <div className="card-elevated p-6">
            <h3 className="section-header">Route Comparison</h3>
            <div className="space-y-3">
              {result.alternativeRoutes.map((route) => (
                <RouteCard key={route.id} route={route} />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
