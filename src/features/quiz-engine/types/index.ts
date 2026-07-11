export type QuestionDifficulty = 'easy' | 'medium' | 'hard' | 'boss';

export type QuestionType = 'mcq' | 'drag_drop' | 'match_following' | 'true_false' | 'fill_blank';

export interface BaseQuestion<T = any> {
  questionId: string;
  type: QuestionType;
  difficulty: QuestionDifficulty;
  learningObjective: string;
  question: string;
  instructions: string;
  explanation: string;
  hint: string;
  xpReward: number;
  coinReward: number;
  estimatedTimeSec: number;
  data: T;
}

export interface McqData {
  options: string[];
  correctAnswer: string;
  imageUrl?: string;
}

export interface DragDropData {
  draggableItems: string[];
  dropZones: string[];
  correctMapping: Record<string, string>;
}

export interface QuizResultAnalytics {
  studentId: string;
  topicId: string;
  totalXP: number;
  totalCoins: number;
  accuracy: number;
  hintsUsed: number;
  maxStreak: number;
  weakObjectives: string[];
  strongObjectives: string[];
}
