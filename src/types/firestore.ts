import { Timestamp } from "firebase/firestore";

// Types for Content Status
export type ContentStatus = 'draft' | 'review' | 'approved' | 'published' | 'archived';

// Users
export interface UserDocument {
  uid: string;
  role: 'parent' | 'admin' | 'teacher';
  email: string;
  displayName: string;
  createdAt: Timestamp;
  settings: Record<string, unknown>;
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

// ---------------------------------------------------------
// CMS Educational Content Hierarchy
// Subject -> Book -> Unit -> Chapter -> Topic -> SubTopic -> Lesson / Quiz
// ---------------------------------------------------------

export interface SubjectDocument {
  subjectId: string;
  title: string;
  description: string;
  colorTheme: string;
  iconUrl: string;
  status: ContentStatus;
  order: number;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface BookDocument {
  bookId: string;
  subjectId: string;
  title: string;
  description: string;
  coverImageUrl: string;
  status: ContentStatus;
  order: number;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface UnitDocument {
  unitId: string;
  bookId: string;
  title: string;
  description: string;
  status: ContentStatus;
  order: number;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface ChapterDocument {
  chapterId: string;
  unitId: string;
  title: string;
  description: string;
  difficulty: number;
  status: ContentStatus;
  order: number;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface TopicDocument {
  topicId: string;
  chapterId: string;
  title: string;
  description: string;
  estimatedTimeMins: number;
  status: ContentStatus;
  order: number;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface SubTopicDocument {
  subTopicId: string;
  topicId: string;
  title: string;
  content: string; // Rich text or markdown
  status: ContentStatus;
  order: number;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface LearningOutcomeDocument {
  outcomeId: string;
  entityId: string; // ID of Chapter, Topic, or SubTopic
  entityType: 'chapter' | 'topic' | 'subtopic';
  description: string;
  standardCode?: string; // e.g., CBSE standard code
  createdAt: Timestamp;
}

// ---------------------------------------------------------
// Assessment & Question Bank
// ---------------------------------------------------------

export type QuestionType = 
  | 'mcq' 
  | 'true_false' 
  | 'fill_blanks' 
  | 'drag_drop' 
  | 'match' 
  | 'image_based' 
  | 'puzzle' 
  | 'memory' 
  | 'sequence' 
  | 'typing' 
  | 'speaking' 
  | 'listening' 
  | 'drawing';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface QuestionDocument<TOptions = any, TAnswer = any> {
  questionId: string;
  subjectId: string;
  topicId?: string;
  learningOutcomeId?: string;
  type: QuestionType;
  difficulty: 1 | 2 | 3 | 4 | 5; // 1: Very Easy, 5: Very Hard
  prompt: string;
  mediaUrl?: string; // For image, audio, or video based questions
  options: TOptions; // Array of strings or objects depending on type
  correctAnswer: TAnswer; // ID, index, string, or complex object
  explanation: string;
  hints: string[];
  tags: string[];
  status: ContentStatus;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

// ---------------------------------------------------------
// Media Library
// ---------------------------------------------------------

export type MediaType = 'image' | 'audio' | 'video' | 'pdf' | 'svg' | 'lottie';

export interface MediaDocument {
  mediaId: string;
  fileName: string;
  type: MediaType;
  url: string;
  sizeBytes: number;
  uploadedBy: string; // admin uid
  tags: string[];
  createdAt: Timestamp;
}

// ---------------------------------------------------------
// Tracking & Progress
// ---------------------------------------------------------

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

export interface ParentReportDocument {
  reportId: string;
  parentId: string;
  studentId: string;
  weekStarting: Timestamp;
  summary: string; // AI generated summary
  totalTimeMins: number;
  topicsCompleted: string[];
  weakAreas: string[];
  createdAt: Timestamp;
}

// ---------------------------------------------------------
// Gamification
// ---------------------------------------------------------

export interface AchievementDocument {
  achievementId: string;
  title: string;
  description: string;
  criteria: string;
  badgeUrl: string;
  rewardCoins: number;
  rewardXP: number;
  status: ContentStatus;
  createdAt: Timestamp;
}
