export interface LessonContent {
  lessonId: string;
  topicId: string;
  title: string;
  durationMinutes: number;
  difficulty: 1 | 2 | 3;
  learningGoal: string;
  requiredSkills: string[];
  vocabulary: string[];
  nodes: LessonNode[];
}

export type LessonNode = 
  | StoryNode 
  | ExplanationNode 
  | ActivityNode 
  | MiniQuizNode 
  | SummaryNode;

export interface StoryNode {
  id: string;
  type: 'story';
  animationUrl: string; // e.g. Lottie JSON path
  audioUrl?: string; // Voice Narration path
  text: string;
}

export interface ExplanationNode {
  id: string;
  type: 'explanation';
  title: string;
  text: string;
  imageUrl?: string;
  aiPrompt?: string;
}

export interface ActivityNode {
  id: string;
  type: 'activity';
  activityType: 'drag_drop' | 'match' | 'drawing';
  payload: any;
}

export interface MiniQuizNode {
  id: string;
  type: 'mini_quiz';
  question: string;
  options: string[];
  correctAnswerIndex: number;
  commonMistakes: Record<string, string>; // e.g., {"0": "You forgot to carry the 1!"}
  hint: string;
  rewardXp: number;
  rewardCoins: number;
}

export interface SummaryNode {
  id: string;
  type: 'summary';
  text: string;
  funFact: string;
}
