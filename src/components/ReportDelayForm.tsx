import { useState, useEffect } from 'react';
import { trainAPI } from '@/services/api';
import { Train, DelayType } from '@/types/train';
import { AlertCircle, Send, CheckCircle } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

// Fallback trains data
const FALLBACK_TRAINS: Train[] = [
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

interface ReportDelayFormProps {
  onSubmit: (trainId: string, delayType: DelayType, additionalInfo?: string) => void;
}

export const ReportDelayForm = ({ onSubmit }: ReportDelayFormProps) => {
  const [trains, setTrains] = useState<Train[]>(FALLBACK_TRAINS);
  const [selectedTrain, setSelectedTrain] = useState('');
  const [delayType, setDelayType] = useState<DelayType | ''>('');
  const [additionalInfo, setAdditionalInfo] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch trains on component mount
  useEffect(() => {
    const fetchTrains = async () => {
      setIsLoading(true);
      try {
        const data = await trainAPI.getAll();
        setTrains(data);
      } catch (error) {
        console.error('Failed to fetch trains, using fallback:', error);
        // Keep fallback data
      } finally {
        setIsLoading(false);
      }
    };
    fetchTrains();
  }, []);

  const handleSubmit = () => {
    if (!selectedTrain || !delayType) return;
    
    setIsSubmitting(true);
    
    setTimeout(() => {
      onSubmit(selectedTrain, delayType as DelayType, additionalInfo || undefined);
      setIsSubmitting(false);
      setSubmitted(true);
      
      setTimeout(() => {
        setSubmitted(false);
        setSelectedTrain('');
        setDelayType('');
        setAdditionalInfo('');
      }, 2000);
    }, 500);
  };

  if (submitted) {
    return (
      <div className="card-elevated p-6 text-center animate-fade-in">
        <div className="w-16 h-16 rounded-full bg-status-ontime-bg mx-auto mb-4 flex items-center justify-center">
          <CheckCircle className="w-8 h-8 text-status-ontime" />
        </div>
        <h3 className="font-semibold text-lg text-foreground mb-2">Report Submitted!</h3>
        <p className="text-sm text-muted-foreground">
          Thank you for helping fellow commuters stay informed.
        </p>
      </div>
    );
  }

  return (
    <div className="card-elevated p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl gradient-accent flex items-center justify-center">
          <AlertCircle className="w-5 h-5 text-accent-foreground" />
        </div>
        <div>
          <h2 className="font-display font-semibold text-lg text-foreground">Report Delay</h2>
          <p className="text-sm text-muted-foreground">Help fellow commuters with real-time updates</p>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="input-label">Select Train</label>
          <Select value={selectedTrain} onValueChange={setSelectedTrain} disabled={isLoading}>
            <SelectTrigger className="bg-background">
              <SelectValue placeholder={isLoading ? "Loading trains..." : "Choose a train"} />
            </SelectTrigger>
            <SelectContent className="bg-card">
              {trains.map((train) => (
                <SelectItem key={train.id} value={train.id}>
                  {train.name} (#{train.number}) - {train.line}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="input-label">Delay Status</label>
          <Select value={delayType} onValueChange={(val) => setDelayType(val as DelayType)}>
            <SelectTrigger className="bg-background">
              <SelectValue placeholder="Select delay duration" />
            </SelectTrigger>
            <SelectContent className="bg-card">
              <SelectItem value="On Time">On Time</SelectItem>
              <SelectItem value="5-10 min">5-10 minutes delay</SelectItem>
              <SelectItem value="15-30 min">15-30 minutes delay</SelectItem>
              <SelectItem value="More than 30 min">More than 30 minutes</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="input-label">Additional Info (optional)</label>
          <Textarea
            value={additionalInfo}
            onChange={(e) => setAdditionalInfo(e.target.value)}
            placeholder="E.g., Signal failure, overcrowding..."
            className="bg-background resize-none"
            rows={3}
          />
          <p className="helper-text">Share what you see to help others</p>
        </div>

        <Button
          onClick={handleSubmit}
          disabled={!selectedTrain || !delayType || isSubmitting}
          className="w-full h-11 gradient-accent hover:opacity-90 transition-opacity shadow-button"
        >
          {isSubmitting ? (
            <span className="flex items-center gap-2">
              <span className="w-4 h-4 border-2 border-accent-foreground/30 border-t-accent-foreground rounded-full animate-spin" />
              Submitting...
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <Send className="w-4 h-4" />
              Submit Report
            </span>
          )}
        </Button>

        <p className="text-xs text-center text-muted-foreground">
          ℹ️ Reports are shared by commuters and may vary.
        </p>
      </div>
    </div>
  );
};
