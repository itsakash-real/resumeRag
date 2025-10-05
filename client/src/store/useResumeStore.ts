import { create } from 'zustand';

export interface ExtractedSkills {
  technical: string[];
  roles: string[];
  experience: string;
}

export interface JobMatch {
  id: string;
  title: string;
  company: string;
  location: string;
  salary?: string;
  description: string;
  matchScore?: number;
  url?: string;
}

interface ResumeState {
  uploadedFile: File | null;
  extractedSkills: ExtractedSkills | null;
  jobMatches: JobMatch[];
  isExtracting: boolean;
  isMatching: boolean;
  setUploadedFile: (file: File | null) => void;
  setExtractedSkills: (skills: ExtractedSkills | null) => void;
  setJobMatches: (jobs: JobMatch[]) => void;
  setIsExtracting: (isExtracting: boolean) => void;
  setIsMatching: (isMatching: boolean) => void;
  reset: () => void;
}

export const useResumeStore = create<ResumeState>((set) => ({
  uploadedFile: null,
  extractedSkills: null,
  jobMatches: [],
  isExtracting: false,
  isMatching: false,
  setUploadedFile: (file) => set({ uploadedFile: file }),
  setExtractedSkills: (skills) => set({ extractedSkills: skills }),
  setJobMatches: (jobs) => set({ jobMatches: jobs }),
  setIsExtracting: (isExtracting) => set({ isExtracting }),
  setIsMatching: (isMatching) => set({ isMatching }),
  reset: () => set({
    uploadedFile: null,
    extractedSkills: null,
    jobMatches: [],
    isExtracting: false,
    isMatching: false,
  }),
}));
