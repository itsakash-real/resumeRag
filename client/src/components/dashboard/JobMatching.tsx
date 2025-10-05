import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Briefcase, Loader2 } from 'lucide-react';
import { useResumeStore, type JobMatch } from '@/store/useResumeStore';
import JobCard from './JobCard';

export default function JobMatching() {
  const { extractedSkills, jobMatches, isMatching, setJobMatches, setIsMatching } = useResumeStore();
  const [error, setError] = useState<string | null>(null);

  const calculateMatchScore = (job: any, skills: string[]): number => {
    const jobText = `${job.title} ${job.description}`.toLowerCase();
    const matchingSkills = skills.filter(skill => 
      jobText.includes(skill.toLowerCase())
    );
    return Math.round((matchingSkills.length / skills.length) * 100);
  };

  const handleFindJobs = async () => {
    if (!extractedSkills) return;

    setIsMatching(true);
    setError(null);

    try {
      const response = await fetch('/api/jobs/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          skills: extractedSkills.technical,
          location: 'india',
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch jobs');
      }

      const data = await response.json();
      
      // Add match scores to jobs
      const jobsWithScores = data.jobs.map((job: any) => ({
        ...job,
        matchScore: calculateMatchScore(job, extractedSkills.technical),
      }));

      // Sort by match score (highest first)
      jobsWithScores.sort((a: JobMatch, b: JobMatch) => 
        (b.matchScore || 0) - (a.matchScore || 0)
      );

      setJobMatches(jobsWithScores);
    } catch (err: any) {
      console.error('Error fetching jobs:', err);
      setError(err.message || 'Failed to fetch job matches. Please try again.');
    } finally {
      setIsMatching(false);
    }
  };

  if (!extractedSkills) {
    return null;
  }

  return (
    <Card className="p-6 shadow-md border border-gray-200 hover:border-gray-300 transition-all duration-300">
      <div className="mb-4 text-center">
        <h2 className="text-lg font-bold text-gray-900">Job Matches</h2>
        <p className="text-xs text-gray-500 mt-1">Find jobs that match your skills</p>
      </div>

      {jobMatches.length === 0 && !isMatching && (
        <div className="text-center py-8 animate-in fade-in duration-500">
          <Briefcase className="w-12 h-12 mx-auto mb-3 text-gray-600" />
          <p className="text-sm text-gray-600 mb-4">
            Find jobs that match your skills
          </p>
          <Button 
            onClick={handleFindJobs} 
            className="h-9 px-6 bg-black hover:bg-gray-800 text-white text-sm font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
            data-testid="button-find-jobs"
          >
            <Briefcase className="w-4 h-4 mr-1.5" />
            Check Job Match
          </Button>
        </div>
      )}

      {isMatching && (
        <div className="text-center py-8 animate-in fade-in duration-300">
          <Loader2 className="w-10 h-10 mx-auto mb-3 text-gray-600 animate-spin" />
          <p className="text-sm text-gray-700 font-medium">
            Finding job matches...
          </p>
        </div>
      )}

      {jobMatches.length > 0 && !isMatching && (
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs">
            <p className="font-semibold text-gray-700" data-testid="text-job-count">
              Found {jobMatches.length} matching jobs
            </p>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleFindJobs} 
              className="h-7 text-xs"
              data-testid="button-refresh-jobs"
            >
              Refresh
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {jobMatches.map((job, idx) => (
              <div
                key={job.id}
                className="animate-in fade-in slide-in-from-bottom-3 duration-500"
                style={{ animationDelay: `${idx * 50}ms` }}
              >
                <JobCard job={job} />
              </div>
            ))}
          </div>
        </div>
      )}

      {error && (
        <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg text-sm text-destructive">
          {error}
        </div>
      )}
    </Card>
  );
}
