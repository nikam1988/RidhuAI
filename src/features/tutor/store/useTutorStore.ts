import { create } from 'zustand'

interface TutorState {
  studentName: string;
  preferredMascot: string;
  learningSpeed: 'fast' | 'moderate' | 'slow';
  weakTopics: string[];
  strongTopics: string[];
  currentMood: 'happy' | 'struggling' | 'bored';
  
  // Voice State
  isListening: boolean;
  isSpeaking: boolean;
  
  // Actions
  setListening: (listening: boolean) => void;
  setSpeaking: (speaking: boolean) => void;
  updateWeakTopic: (topic: string) => void;
  setMood: (mood: 'happy' | 'struggling' | 'bored') => void;
}

export const useTutorStore = create<TutorState>((set) => ({
  // Mock initial personalization data
  studentName: "Aarohi",
  preferredMascot: "Spark Panda",
  learningSpeed: "moderate",
  weakTopics: ["Carry Over Addition"],
  strongTopics: ["Noun Identification", "Single Digit Math"],
  currentMood: "happy",
  
  isListening: false,
  isSpeaking: false,

  setListening: (listening) => set({ isListening: listening }),
  setSpeaking: (speaking) => set({ isSpeaking: speaking }),
  
  updateWeakTopic: (topic) => set((state) => ({
    weakTopics: state.weakTopics.includes(topic) 
      ? state.weakTopics 
      : [...state.weakTopics, topic]
  })),

  setMood: (mood) => set({ currentMood: mood })
}))
