import { create } from 'zustand'

interface QuizState {
  // Gameplay State
  currentStreak: number;
  maxStreak: number;
  comboMultiplier: number;
  xpEarned: number;
  coinsEarned: number;
  hintsUsed: number;
  correctAnswers: number;
  totalAnswered: number;
  
  // Actions
  answerCorrectly: (xp: number, coins: number) => void;
  answerIncorrectly: () => void;
  useHint: () => void;
  resetQuiz: () => void;
}

export const useQuizStore = create<QuizState>((set) => ({
  currentStreak: 0,
  maxStreak: 0,
  comboMultiplier: 1,
  xpEarned: 0,
  coinsEarned: 0,
  hintsUsed: 0,
  correctAnswers: 0,
  totalAnswered: 0,

  answerCorrectly: (xp, coins) => set((state) => {
    const newStreak = state.currentStreak + 1;
    // Every 3 correct answers, increase multiplier up to 3x
    const newCombo = Math.min(3, Math.floor(newStreak / 3) + 1);
    
    return {
      currentStreak: newStreak,
      maxStreak: Math.max(state.maxStreak, newStreak),
      comboMultiplier: newCombo,
      xpEarned: state.xpEarned + (xp * newCombo),
      coinsEarned: state.coinsEarned + (coins * newCombo),
      correctAnswers: state.correctAnswers + 1,
      totalAnswered: state.totalAnswered + 1,
    }
  }),

  answerIncorrectly: () => set((state) => ({
    currentStreak: 0,
    comboMultiplier: 1, // Reset combo on mistake
    totalAnswered: state.totalAnswered + 1,
  })),

  useHint: () => set((state) => ({
    hintsUsed: state.hintsUsed + 1,
    coinsEarned: Math.max(0, state.coinsEarned - 5), // Hint costs 5 coins
  })),

  resetQuiz: () => set({
    currentStreak: 0, maxStreak: 0, comboMultiplier: 1, 
    xpEarned: 0, coinsEarned: 0, hintsUsed: 0, 
    correctAnswers: 0, totalAnswered: 0
  })
}))
