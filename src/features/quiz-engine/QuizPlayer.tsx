"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useQuizStore } from "./store/useQuizStore"
import { Flame, Heart, Lightbulb, Star } from "lucide-react"

// Mock Question for demonstration
const MOCK_QUESTION = {
  questionId: "q_1",
  type: "mcq",
  question: "If Spark Panda has 15 bamboo shoots and finds 18 more, how many does he have?",
  options: ["23", "33", "43"],
  correctAnswer: "33",
  hint: "Add the ones place first (5+8=13).",
  xpReward: 100,
  coinReward: 10,
}

export function QuizPlayer({ onFinish }: { onFinish: () => void }) {
  const { currentStreak, comboMultiplier, xpEarned, useHint: applyHint, answerCorrectly, answerIncorrectly } = useQuizStore()
  const [showHint, setShowHint] = useState(false)
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const [isEvaluating, setIsEvaluating] = useState(false)
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)

  const handleSelect = (option: string) => {
    if (isEvaluating) return
    setSelectedOption(option)
  }

  const handleSubmit = () => {
    if (!selectedOption) return
    setIsEvaluating(true)
    
    const correct = selectedOption === MOCK_QUESTION.correctAnswer
    setIsCorrect(correct)

    if (correct) {
      answerCorrectly(MOCK_QUESTION.xpReward, MOCK_QUESTION.coinReward)
      setTimeout(() => {
        onFinish() // Move to result screen for demo purposes
      }, 2000)
    } else {
      answerIncorrectly()
      setTimeout(() => {
        setIsEvaluating(false)
        setSelectedOption(null)
        setIsCorrect(null)
      }, 2000)
    }
  }

  return (
    <div className="max-w-2xl mx-auto flex flex-col h-[calc(100vh-80px)]">
      
      {/* Top Bar (HUD) */}
      <div className="flex items-center justify-between bg-white p-4 rounded-[24px] shadow-sm mb-6 border border-slate-100">
        <div className="flex gap-4">
          <div className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-full border border-slate-100">
            <Heart className="text-magic-pink" fill="currentColor" size={20} />
            <span className="font-heading font-extrabold text-slate-700">3</span>
          </div>
          <motion.div 
            animate={currentStreak >= 3 ? { scale: [1, 1.1, 1] } : {}}
            transition={{ repeat: Infinity, duration: 1 }}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full border ${currentStreak >= 3 ? 'bg-orange-50 border-orange-200 text-warning-orange' : 'bg-slate-50 border-slate-100 text-slate-400'}`}
          >
            <Flame fill="currentColor" size={20} />
            <span className="font-heading font-extrabold">{currentStreak} Streak</span>
          </motion.div>
        </div>

        <div className="flex items-center gap-2 bg-accent-yellow/10 px-4 py-1.5 rounded-full border border-accent-yellow/30 text-accent-yellow">
          <Star fill="currentColor" size={20} />
          <span className="font-heading font-extrabold">{xpEarned} XP</span>
          {comboMultiplier > 1 && (
            <span className="text-xs bg-accent-yellow text-white px-2 rounded-full ml-2">x{comboMultiplier}</span>
          )}
        </div>
      </div>

      {/* Main Canvas */}
      <div className="flex-1 bg-white rounded-[32px] p-8 md:p-12 shadow-xl border-4 border-slate-50 flex flex-col items-center justify-center relative overflow-hidden">
        
        {/* Animated Feedback Overlay */}
        <AnimatePresence>
          {isEvaluating && isCorrect !== null && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.5 }}
              className={`absolute inset-0 z-50 flex flex-col items-center justify-center bg-white/90 backdrop-blur-sm ${isCorrect ? 'text-success-green' : 'text-magic-pink'}`}
            >
              <div className="text-8xl mb-4">{isCorrect ? '🎉' : '🤔'}</div>
              <h2 className="font-heading font-extrabold text-4xl">
                {isCorrect ? 'Awesome!' : 'Oops, try again!'}
              </h2>
            </motion.div>
          )}
        </AnimatePresence>

        <h2 className="font-heading font-extrabold text-3xl text-slate-800 text-center mb-8">
          {MOCK_QUESTION.question}
        </h2>

        {/* MCQ Component */}
        <div className="w-full space-y-4">
          {MOCK_QUESTION.options.map((opt) => (
            <button
              key={opt}
              onClick={() => handleSelect(opt)}
              className={`w-full p-5 rounded-2xl border-4 font-body font-bold text-xl transition-all text-left ${
                selectedOption === opt 
                  ? 'border-primary-purple bg-primary-purple/10 text-primary-purple scale-[1.02]' 
                  : 'border-slate-100 bg-slate-50 text-slate-600 hover:border-slate-300'
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-6 flex justify-between items-center gap-4">
        <button 
          onClick={() => { setShowHint(true); applyHint() }}
          disabled={showHint || isEvaluating}
          className="flex items-center gap-2 px-6 py-4 rounded-2xl bg-white border border-slate-200 text-slate-500 font-bold hover:bg-slate-50 shadow-sm disabled:opacity-50"
        >
          <Lightbulb size={20} className={showHint ? "text-accent-yellow" : ""} />
          {showHint ? "Hint Used" : "Use Hint (5 🪙)"}
        </button>

        <button 
          onClick={handleSubmit}
          disabled={!selectedOption || isEvaluating}
          className="flex-1 btn-primary bg-primary-purple shadow-[0_6px_0_0_#4C1D95] hover:bg-primary-purple/90 py-4 text-xl disabled:opacity-50 disabled:shadow-none disabled:translate-y-[6px]"
        >
          Check Answer
        </button>
      </div>

      {/* Hint Tooltip */}
      <AnimatePresence>
        {showHint && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute bottom-28 left-1/2 -translate-x-1/2 bg-slate-800 text-white p-4 rounded-xl shadow-2xl font-bold border border-slate-700"
          >
            💡 {MOCK_QUESTION.hint}
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  )
}
