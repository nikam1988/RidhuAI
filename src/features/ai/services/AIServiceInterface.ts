export interface AIGenerationRequest {
  classLevel: string;
  subject: string;
  chapter: string;
  topic: string;
  difficulty: 'easy' | 'medium' | 'hard';
  language: string;
  lessonLengthMins: number;
}

export interface GeneratedLessonSection {
  type: 'title' | 'paragraph' | 'fun_fact' | 'example' | 'summary';
  content: string;
}

export interface GeneratedLesson {
  title: string;
  learningObjectives: string[];
  sections: GeneratedLessonSection[];
  suggestedTags: string[];
}

export interface GeneratedQuestion {
  type: 'mcq' | 'true_false' | 'fill_blank';
  prompt: string;
  options?: string[];
  correctAnswer: string;
  explanation: string;
  hint: string;
}

export interface AIService {
  /** Generate a complete lesson structure */
  generateLesson(req: AIGenerationRequest): Promise<GeneratedLesson>;
  
  /** Generate a batch of quiz questions */
  generateQuiz(req: AIGenerationRequest, count: number): Promise<GeneratedQuestion[]>;
  
  /** Generate a story-based lesson featuring a mascot */
  generateStory(req: AIGenerationRequest, mascotName: string): Promise<string>;
  
  /** Generate a prompt suitable for DALL-E or Midjourney */
  generateImagePrompt(req: AIGenerationRequest, style: string): Promise<string>;
}
