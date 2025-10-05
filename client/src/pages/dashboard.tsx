import { useEffect } from 'react';
import { useLocation } from 'wouter';
import { isAuthenticated } from '@/lib/auth';
import Header from '@/components/Header';
import ResumeUpload from '@/components/dashboard/ResumeUpload';
import SkillExtraction from '@/components/dashboard/SkillExtraction';
import JobMatching from '@/components/dashboard/JobMatching';

export default function Dashboard() {
  const [, setLocation] = useLocation();

  useEffect(() => {
    if (!isAuthenticated()) {
      setLocation('/login');
    }
  }, [setLocation]);

  if (!isAuthenticated()) {
    return null;
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="pt-16">
        <div className="container mx-auto px-4 py-6 max-w-4xl">
          <div className="mb-6 text-center animate-in fade-in slide-in-from-bottom-2 duration-700">
            <h1 className="text-2xl md:text-3xl font-bold mb-2 text-gray-900">
              AI-Powered Job Matching
            </h1>
            <p className="text-sm text-gray-600">
              Upload your CV and let Gemini AI analyze it to find perfect job matches with JSearch
            </p>
          </div>

          <div className="space-y-4">
            <div className="animate-in fade-in slide-in-from-bottom-3 duration-700" style={{ animationDelay: '100ms' }}>
              <ResumeUpload />
            </div>
            
            <div className="animate-in fade-in slide-in-from-bottom-3 duration-700" style={{ animationDelay: '200ms' }}>
              <SkillExtraction />
            </div>
            
            <div className="animate-in fade-in slide-in-from-bottom-3 duration-700" style={{ animationDelay: '300ms' }}>
              <JobMatching />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
