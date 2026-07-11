export type BloomLevel = 'Remember' | 'Understand' | 'Apply' | 'Analyze' | 'Evaluate' | 'Create';

export interface LearningOutcome {
  id: string;
  bloomLevel: BloomLevel;
  description: string;
  prerequisiteSkills: string[];
  commonMistakes: string[];
  teachingTips: string[];
}

export interface CBSETopic {
  board: 'CBSE' | 'ICSE' | 'State';
  classLevel: number;
  subject: string;
  chapterName: string;
  topicName: string;
  learningOutcomes: LearningOutcome[];
  ageGroup: string; // e.g., "7-8 years"
}

export interface KnowledgeContext {
  topic: CBSETopic;
  studentProficiency: 'beginner' | 'intermediate' | 'advanced';
  preferredLanguage: string;
  mascotTheme?: string;
}
