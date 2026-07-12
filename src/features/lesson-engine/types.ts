// src/features/lesson-engine/types.ts

export type BlockType = 'story' | 'fun_fact' | 'mini_quiz' | 'text_explanation' | 'reward';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface BaseLessonBlock<T = any> {
  id: string;
  type: BlockType;
  data: T;
}

export interface StoryBlockData {
  character: string;
  dialogue: string;
  imagePrompt?: string;
}

export interface FunFactBlockData {
  title: string;
  content: string;
}

export interface MiniQuizBlockData {
  questionType: 'mcq' | 'true_false';
  question: string;
  options: string[];
  correctAnswer: string;
  xpReward: number;
}

export interface LessonJSON {
  lessonId: string;
  title: string;
  blocks: BaseLessonBlock[];
}

export interface BlockProps<T> {
  data: T;
  onComplete: () => void;
  isActive: boolean;
}
