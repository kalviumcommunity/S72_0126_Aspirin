export type TrainLine = 'Western' | 'Central' | 'Harbour';

export type DelayStatus = 'on-time' | 'slight-delay' | 'heavy-delay';

export type CrowdLevel = 'low' | 'medium' | 'high';

export type DelayType = 'On Time' | '5-10 min' | '15-30 min' | 'More than 30 min';

export interface Station {
  id: string;
  name: string;
  code: string;
  lines: TrainLine[];
}

export interface Train {
  id: string;
  name: string;
  number: string;
  line: TrainLine;
  route: {
    start: string;
    end: string;
    via?: string[];
  };
  scheduledTime: string;
  delayMinutes: number;
  crowdLevel: CrowdLevel;
  status: DelayStatus;
  isSystemEstimated: boolean;
}

export interface CommunityReport {
  id: string;
  trainId: string;
  trainName: string;
  delayType: DelayType;
  additionalInfo?: string;
  timestamp: Date;
  reportCount: number;
}

export interface RouteOption {
  id: string;
  type: 'Direct' | 'Via Junction';
  trains: string[];
  estimatedDelay: number;
  crowdLevel: CrowdLevel;
  recommendation: 'best' | 'acceptable' | 'avoid';
  totalTime: number;
  junctionStation?: string;
}

export interface TravelSuggestion {
  id: string;
  icon: string;
  message: string;
  priority: 'high' | 'medium' | 'low';
}

export interface SearchParams {
  currentStation: string;
  destination: string;
  line: TrainLine;
  travelTime: 'now' | '15min' | '30min';
}

export interface SearchResult {
  recommendedTrain: Train;
  expectedDelay: number;
  crowdLevel: CrowdLevel;
  status: DelayStatus;
  suggestedAction: string;
  alternativeRoutes: RouteOption[];
}
