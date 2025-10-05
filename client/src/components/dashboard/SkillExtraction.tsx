import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sparkles, Loader2 } from 'lucide-react';
import { useResumeStore } from '@/store/useResumeStore';

export default function SkillExtraction() {
  const { uploadedFile, extractedSkills, isExtracting, setExtractedSkills, setIsExtracting } = useResumeStore();
  const [error, setError] = useState<string | null>(null);

  const handleExtractSkills = async () => {
    setIsExtracting(true);
    setError(null);

    // TODO: remove mock functionality - Replace with actual Gemini API call
    setTimeout(() => {
      setExtractedSkills({
        technical: ['React', 'TypeScript', 'Node.js', 'Python', 'AWS', 'Docker', 'PostgreSQL', 'GraphQL'],
        roles: ['Full-Stack Developer', 'Software Engineer', 'Frontend Engineer'],
        experience: '5+ years',
      });
      setIsExtracting(false);
    }, 2000);
  };

  if (!uploadedFile) {
    return null;
  }

  return (
    <Card className="p-6 shadow-md border border-gray-200 hover:border-gray-300 transition-all duration-300">
      <div className="mb-4 text-center">
        <h2 className="text-lg font-bold text-gray-900">Extract Skills</h2>
        <p className="text-xs text-gray-500 mt-1">AI-powered skill extraction from your CV</p>
      </div>

      {!extractedSkills && !isExtracting && (
        <div className="text-center py-8 animate-in fade-in duration-500">
          <Sparkles className="w-12 h-12 mx-auto mb-3 text-purple-600" />
          <p className="text-sm text-gray-600 mb-4">
            Ready to analyze your CV with AI
          </p>
          <Button 
            onClick={handleExtractSkills} 
            className="h-9 px-6 bg-black hover:bg-gray-800 text-white text-sm font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
            data-testid="button-extract-skills"
          >
            <Sparkles className="w-4 h-4 mr-1.5" />
            Extract Skills with AI
          </Button>
        </div>
      )}

      {isExtracting && (
        <div className="text-center py-8 animate-in fade-in duration-300">
          <Loader2 className="w-10 h-10 mx-auto mb-3 text-gray-600 animate-spin" />
          <p className="text-sm text-gray-700 font-medium">
            Analyzing your resume...
          </p>
        </div>
      )}

      {extractedSkills && !isExtracting && (
        <div className="space-y-4 animate-in fade-in slide-in-from-bottom-3 duration-700" data-testid="extracted-skills">
          <div>
            <h3 className="text-xs font-semibold mb-2 text-gray-600">Technical Skills</h3>
            <div className="flex flex-wrap gap-2">
              {extractedSkills.technical.map((skill, idx) => (
                <Badge
                  key={idx}
                  className="px-2.5 py-1 text-xs font-medium bg-green-100 text-green-700 border border-green-300 hover:bg-green-200 transition-all duration-200"
                  data-testid={`badge-skill-${idx}`}
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xs font-semibold mb-2 text-gray-600">Suitable Roles</h3>
            <div className="flex flex-wrap gap-2">
              {extractedSkills.roles.map((role, idx) => (
                <Badge
                  key={idx}
                  className="px-2.5 py-1 text-xs font-medium bg-blue-100 text-blue-700 border border-blue-300 hover:bg-blue-200 transition-all duration-200"
                  data-testid={`badge-role-${idx}`}
                >
                  {role}
                </Badge>
              ))}
            </div>
          </div>

          <div className="pt-2">
            <h3 className="text-xs font-semibold mb-1 text-gray-600">Experience</h3>
            <p className="text-sm font-bold text-gray-900" data-testid="text-experience">
              {extractedSkills.experience}
            </p>
          </div>

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-xs text-red-700 font-medium">
              {error}
            </div>
          )}
        </div>
      )}
    </Card>
  );
}
