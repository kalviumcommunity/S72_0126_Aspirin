import { useState, useEffect } from 'react';
import { Layout } from '@/components/Layout';
import { ReportDelayForm } from '@/components/ReportDelayForm';
import { ReportCard } from '@/components/ReportCard';
import { reportAPI } from '@/services/api';
import { CommunityReport, DelayType } from '@/types/train';
import { MessageSquare, TrendingUp, Clock } from 'lucide-react';

// Fallback reports data
const FALLBACK_REPORTS: CommunityReport[] = [
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

const CommunityReports = () => {
  const [reports, setReports] = useState<CommunityReport[]>(FALLBACK_REPORTS);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch reports on component mount
  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    setIsLoading(true);
    try {
      const data = await reportAPI.getAll();
      setReports(data);
    } catch (error) {
      console.error('Failed to fetch reports, using fallback:', error);
      // Keep fallback data
    } finally {
      setIsLoading(false);
    }
  };

  const handleNewReport = async (trainId: string, delayType: DelayType, additionalInfo?: string) => {
    try {
      const newReport = await reportAPI.create(trainId, delayType, additionalInfo);
      setReports([newReport, ...reports]);
    } catch (error) {
      console.error('Failed to create report:', error);
    }
  };

  const recentReports = reports.slice(0, 10);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <div className="w-14 h-14 rounded-xl gradient-accent flex items-center justify-center shadow-lg">
            <MessageSquare className="w-7 h-7 text-accent-foreground" />
          </div>
          <div>
            <h1 className="font-display font-bold text-3xl text-foreground">Community Reports</h1>
            <p className="text-sm text-muted-foreground font-medium">Real-time updates from fellow commuters</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="card-elevated p-6 text-center">
            <div className="w-12 h-12 rounded-lg gradient-primary flex items-center justify-center mx-auto mb-3">
              <TrendingUp className="w-6 h-6 text-primary-foreground" />
            </div>
            <p className="font-bold text-2xl text-foreground">{reports.length}</p>
            <p className="text-xs text-muted-foreground font-medium">Total Reports</p>
          </div>
          <div className="card-elevated p-6 text-center">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-3">
              <Clock className="w-6 h-6 text-primary" />
            </div>
            <p className="font-bold text-2xl text-foreground">&lt; 5 min</p>
            <p className="text-xs text-muted-foreground font-medium">Latest Update</p>
          </div>
          <div className="card-elevated p-6 text-center">
            <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mx-auto mb-3">
              <MessageSquare className="w-6 h-6 text-accent" />
            </div>
            <p className="font-bold text-2xl text-foreground">{reports.filter(r => r.reportCount > 3).length}</p>
            <p className="text-xs text-muted-foreground font-medium">Verified Delays</p>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-5 gap-6">
          {/* Report Form */}
          <div className="lg:col-span-2">
            <ReportDelayForm onSubmit={handleNewReport} />
          </div>

          {/* Reports Feed */}
          <div className="lg:col-span-3">
            <div className="card-elevated p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="section-header mb-0">Live Community Reports</h2>
                <span className="text-xs text-muted-foreground px-2 py-1 rounded-full bg-secondary">
                  {recentReports.length} recent
                </span>
              </div>
              
              <div className="space-y-3">
                {recentReports.map((report) => (
                  <ReportCard key={report.id} report={report} />
                ))}
              </div>

              {recentReports.length === 0 && (
                <div className="text-center py-8">
                  <MessageSquare className="w-10 h-10 mx-auto mb-3 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">
                    No reports yet. Be the first to share an update!
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CommunityReports;
