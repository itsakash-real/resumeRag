import JobCard from '../dashboard/JobCard';
import type { JobMatch } from '@/store/useResumeStore';

export default function JobCardExample() {
  const mockJob: JobMatch = {
    id: '1',
    title: 'Senior Full-Stack Developer',
    company: 'Tech Innovators Inc.',
    location: 'Bangalore, India',
    salary: '₹25-35 LPA',
    description: 'Looking for an experienced full-stack developer with React and Node.js expertise to join our growing team.',
    matchScore: 95,
    url: '#',
  };

  return (
    <div className="p-6">
      <JobCard job={mockJob} />
    </div>
  );
}
