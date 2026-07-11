import { Timestamp } from "firebase/firestore";

// Users
export interface UserDocument {
  uid: string;
  role: 'parent' | 'admin' | 'teacher';
  email: string;
  displayName: string;
  createdAt: Timestamp;
  settings: Record<string, any>;
}

export interface StudentDocument {
  studentId: string;
  parentId: string;
  name: string;
  age: number;
  class: string;
  avatarId: string;
  stats: {
    xp: number;
    coins: number;
    stars: number;
    level: number;
    streak: number;
  };
}

// Educational Content (CMS Managed)
export interface SubjectDocument {
  subjectId: string;
  title: string;
  description: string;
  colorTheme: string;
  iconUrl: string;
  isPublished: boolean;
  order: number;
}

export interface ChapterDocument {
  chapterId: string;
  subjectId: string;
  title: string;
  description: string;
  difficulty: number;
  order: number;
  isPublished: boolean;
}

export interface TopicDocument {
  topicId: string;
  chapterId: string;
  title: string;
  learningObjectives: string[];
  estimatedTimeMins: number;
  isPublished: boolean;
}

// Assessment & Tracking
export interface QuestionDocument {
  questionId: string;
  subjectId: string;
  topicId: string;
  type: 'mcq' | 'drag_drop' | 'voice' | 'match';
  difficulty: 1 | 2 | 3;
  prompt: string;
  options: any[];
  correctAnswer: any;
  explanation: string;
  hints: string[];
  tags: string[];
}

export interface ProgressDocument {
  progressId: string;
  studentId: string;
  entityId: string; // lessonId or quizId
  status: 'started' | 'completed' | 'revision_needed';
  score?: number;
  timeSpentMs: number;
  attempts: number;
  completedAt?: Timestamp;
}

// Gamification
export interface AchievementDocument {
  achievementId: string;
  title: string;
  criteria: string;
  badgeUrl: string;
  rewardCoins: number;
}
