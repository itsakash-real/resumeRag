import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Building2, DollarSign, ExternalLink } from 'lucide-react';
import type { JobMatch } from '@/store/useResumeStore';

interface JobCardProps {
  job: JobMatch;
}

export default function JobCard({ job }: JobCardProps) {
  const handleApply = () => {
    console.log('Apply clicked for job:', job.id);
    if (job.url) {
      window.open(job.url, '_blank');
    }
  };

  return (
    <Card className="p-4 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border border-gray-200 hover:border-gray-300 bg-white" data-testid={`card-job-${job.id}`}>
      <div className="space-y-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-bold mb-1 text-gray-900 line-clamp-2" data-testid={`text-job-title-${job.id}`}>
              {job.title}
            </h3>
            <div className="flex items-center gap-1.5 text-xs text-gray-600">
              <Building2 className="w-3 h-3 flex-shrink-0" />
              <span className="truncate" data-testid={`text-company-${job.id}`}>{job.company}</span>
            </div>
          </div>
          {job.matchScore && (
            <Badge 
              className="px-2 py-0.5 text-xs font-bold bg-black text-white border-0 shrink-0"
              data-testid={`badge-match-${job.id}`}
            >
              {job.matchScore}%
            </Badge>
          )}
        </div>

        <div className="space-y-1 text-xs">
          <div className="flex items-center gap-1.5 text-gray-600">
            <MapPin className="w-3 h-3 flex-shrink-0" />
            <span className="truncate" data-testid={`text-location-${job.id}`}>{job.location}</span>
          </div>
          {job.salary && (
            <div className="flex items-center gap-1.5 text-gray-600">
              <DollarSign className="w-3 h-3 flex-shrink-0" />
              <span className="font-semibold" data-testid={`text-salary-${job.id}`}>{job.salary}</span>
            </div>
          )}
        </div>

        <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed" data-testid={`text-description-${job.id}`}>
          {job.description}
        </p>

        <Button 
          onClick={handleApply} 
          className="w-full h-8 bg-black hover:bg-gray-800 text-white font-medium text-xs rounded-lg shadow-sm hover:shadow-md transition-all duration-300"
          data-testid={`button-apply-${job.id}`}
        >
          <ExternalLink className="w-3 h-3 mr-1.5" />
          View Job
        </Button>
      </div>
    </Card>
  );
}
