export type EducationLevel = 'class10' | 'class12';

export interface StreamOption {
  id: string;
  title: string;
  tagline: string;
  category: 'science' | 'commerce' | 'arts' | 'vocational' | 'polytechnic';
  primarySubjects: string[];
  optionalSubjects: string[];
  bestSuitedFor: string[];
  pros: string[];
  cons: string[];
  commonMisconceptions: string[];
  careerTrajectories: string[];
  difficultyLevel: 'Moderate' | 'High' | 'Very High';
  mathematicsRequired: boolean;
  detailedOverview: string;
}

export interface CareerPath {
  id: string;
  title: string;
  streamRequired: string;
  category: 'tech' | 'medical' | 'business' | 'law' | 'design' | 'defense' | 'research' | 'arts';
  typicalDegrees: string[];
  topEntranceExams: string[];
  durationYears: string;
  entrySalaryRange: string;
  midCareerOutlook: string;
  topCollegesIndia: string[];
  workDaySummary: string;
  skillsNeeded: string[];
  roadmapSteps: { stage: string; action: string; duration: string }[];
}

export interface EntranceExam {
  id: string;
  name: string;
  fullName: string;
  conductingBody: string;
  targetCourses: string[];
  streamCategory: 'engineering' | 'medical' | 'law' | 'management' | 'design' | 'defense' | 'central_uni' | 'pure_science';
  eligibility: string;
  frequency: string;
  typicalMonth: string;
  format: string;
  totalSeatsEstimate: string;
  officialWebsite: string;
  keyPreparationTips: string[];
  competitionLevel: 'National High' | 'National Ultra-Competitive' | 'Moderate';
}

export interface InstituteInfo {
  id: string;
  name: string;
  type: 'IIT' | 'NIT' | 'AIIMS' | 'IIM' | 'NLU' | 'Central University' | 'Premier Private' | 'Research';
  location: string;
  nirfTier: string;
  flagshipPrograms: string[];
  admissionVia: string[];
  approxFeePerYear: string;
  highlight: string;
}

export interface ScholarshipInfo {
  id: string;
  title: string;
  offeredBy: string;
  eligibility: string;
  financialBenefit: string;
  targetGroup: string;
  applicationPeriod: string;
  portalLink: string;
}

export interface AssessmentQuestion {
  id: number;
  question: string;
  scenario: string;
  options: {
    text: string;
    description: string;
    scores: {
      analytical: number;
      empirical: number;
      business: number;
      creative: number;
      linguistic: number;
      social: number;
    };
  }[];
}

export interface AssessmentResult {
  topStream: string;
  secondaryStream: string;
  recommendedCareers: string[];
  suggestedSubjectCombo: string[];
  personalitySummary: string;
  recommendedExams: string[];
  cautionAdvice: string;
  scores: {
    analytical: number;
    empirical: number;
    business: number;
    creative: number;
    linguistic: number;
    social: number;
  };
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'counselor';
  text: string;
  timestamp: string;
  source?: 'gemini' | 'counselor-knowledge-base';
}
