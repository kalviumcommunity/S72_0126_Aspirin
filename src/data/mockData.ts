import { Station, Train, CommunityReport, RouteOption, TravelSuggestion } from '@/types/train';

export const stations: Station[] = [
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

export const trains: Train[] = [
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

export const communityReports: CommunityReport[] = [
  {
    id: '1',
    trainId: '3',
    trainName: 'Virar Fast (90305)',
    delayType: '15-30 min',
    additionalInfo: 'Signal failure near Bandra',
    timestamp: new Date(Date.now() - 5 * 60000),
    reportCount: 8,
  },
  {
    id: '2',
    trainId: '6',
    trainName: 'Kalyan Fast (91305)',
    delayType: 'More than 30 min',
    additionalInfo: 'Technical issue at Thane',
    timestamp: new Date(Date.now() - 12 * 60000),
    reportCount: 15,
  },
  {
    id: '3',
    trainId: '2',
    trainName: 'Borivali Slow (90203)',
    delayType: '5-10 min',
    timestamp: new Date(Date.now() - 3 * 60000),
    reportCount: 3,
  },
  {
    id: '4',
    trainId: '9',
    trainName: 'Andheri Harbour (92305)',
    delayType: '15-30 min',
    additionalInfo: 'Overcrowding at Kurla junction',
    timestamp: new Date(Date.now() - 8 * 60000),
    reportCount: 6,
  },
];

export const routeOptions: RouteOption[] = [
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

export const travelSuggestions: TravelSuggestion[] = [
  {
    id: '1',
    icon: '⚠️',
    message: 'Your usual train is delayed by 20 mins',
    priority: 'high',
  },
  {
    id: '2',
    icon: '🚆',
    message: 'Next train arrives in 7 mins',
    priority: 'medium',
  },
  {
    id: '3',
    icon: '💡',
    message: 'Switching at Dadar may save 10 mins',
    priority: 'medium',
  },
  {
    id: '4',
    icon: '👥',
    message: 'Less crowded trains available on Central Line',
    priority: 'low',
  },
];

export const getStationsByLine = (line: string): Station[] => {
  return stations.filter(s => s.lines.includes(line as any));
};

export const getTrainsByLine = (line: string): Train[] => {
  if (line === 'all') return trains;
  return trains.filter(t => t.line === line);
};

export const getTrainsByStatus = (status: string): Train[] => {
  if (status === 'all') return trains;
  return trains.filter(t => t.status === status);
};
