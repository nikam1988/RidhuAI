"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useRouter } from "next/navigation"
import { X, Heart, CheckCircle, XCircle } from "lucide-react"
import { Button } from "@/components/ui/Button"

// Mock Quiz Data
const QUIZ_QUESTIONS = [
  {
    id: 1,
    question: "Which of these is a Fruit?",
    options: ["Apple 🍎", "Carrot 🥕", "Potato 🥔", "Broccoli 🥦"],
    correctAnswer: 0
  },
  {
    id: 2,
    question: "What is 5 + 3?",
    options: ["6", "7", "8", "9"],
    correctAnswer: 2
  },
  {
    id: 3,
    question: "Which animal says 'Meow'?",
    options: ["Dog 🐶", "Cat 🐱", "Cow 🐮", "Pig 🐷"],
    correctAnswer: 1
  }
]

export default function QuizPage() {
  const router = useRouter()
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0)
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const [isAnswered, setIsAnswered] = useState(false)
  const [lives, setLives] = useState(3)
  
  const question = QUIZ_QUESTIONS[currentQuestionIdx]
  const progress = ((currentQuestionIdx) / QUIZ_QUESTIONS.length) * 100

  const handleSelect = (index: number) => {
    if (isAnswered) return
    setSelectedOption(index)
  }

  const handleCheck = () => {
    if (selectedOption === null) return
    setIsAnswered(true)
    
    if (selectedOption !== question.correctAnswer) {
      setLives(prev => prev - 1)
    }
  }

  const handleNext = () => {
    if (currentQuestionIdx < QUIZ_QUESTIONS.length - 1) {
      setCurrentQuestionIdx(prev => prev + 1)
      setSelectedOption(null)
      setIsAnswered(false)
    } else {
      // Quiz Finished!
      router.push('/result')
    }
  }

  return (
    <div className="min-h-screen bg-bg-primary flex flex-col">
      {/* Quiz Header */}
      <header className="w-full max-w-3xl mx-auto px-4 py-6 flex items-center justify-between gap-4">
        <button 
          onClick={() => router.push('/dashboard')}
          className="text-slate-400 hover:text-slate-600 transition-colors"
        >
          <X size={32} />
        </button>
        
        {/* Progress Bar */}
        <div className="flex-1 h-5 bg-slate-200 rounded-full overflow-hidden relative">
          <motion.div 
            initial={{ width: `${((currentQuestionIdx - 1) / QUIZ_QUESTIONS.length) * 100}%` }}
            animate={{ width: `${progress}%` }}
            className="h-full bg-brand-green rounded-full relative"
          >
            <div className="absolute top-1 left-2 right-2 bottom-1 bg-white/20 rounded-full"></div>
          </motion.div>
        </div>

        {/* Lives */}
        <div className="flex items-center gap-1 font-bold text-brand-pink text-xl">
          <Heart fill="currentColor" size={28} className={lives < 3 ? "animate-pulse" : ""} />
          <span>{lives}</span>
        </div>
      </header>

      {/* Quiz Content */}
      <main className="flex-1 flex flex-col items-center max-w-3xl w-full mx-auto px-4 mt-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestionIdx}
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -50, opacity: 0 }}
            className="w-full flex flex-col items-center"
          >
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-700 text-center mb-10 leading-snug">
              {question.question}
            </h2>

            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
              {question.options.map((option, idx) => {
                let borderClass = "border-slate-200 hover:border-brand-blue/50 hover:bg-brand-blue/5"
                if (selectedOption === idx) {
                  borderClass = "border-brand-blue bg-brand-blue/10"
                }
                
                // Show correctness if answered
                if (isAnswered) {
                  if (idx === question.correctAnswer) {
                    borderClass = "border-brand-green bg-brand-green/20"
                  } else if (selectedOption === idx) {
                    borderClass = "border-brand-pink bg-brand-pink/20"
                  } else {
                    borderClass = "border-slate-200 opacity-50"
                  }
                }

                return (
                  <button
                    key={idx}
                    onClick={() => handleSelect(idx)}
                    disabled={isAnswered}
                    className={`p-6 rounded-2xl border-4 text-left text-xl font-bold text-slate-700 transition-all ${borderClass} shadow-sm active:scale-95`}
                  >
                    {option}
                  </button>
                )
              })}
            </div>
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer / Feedback Action Bar */}
      <div className={`w-full mt-auto border-t-2 transition-colors duration-300 ${isAnswered ? (selectedOption === question.correctAnswer ? 'bg-green-100 border-brand-green' : 'bg-red-100 border-brand-pink') : 'bg-white border-slate-100'}`}>
        <div className="max-w-3xl mx-auto p-4 md:p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          
          {/* Feedback Message */}
          <div className="flex-1 flex items-center">
            {isAnswered && (
              <motion.div 
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className={`flex items-center gap-3 font-bold text-2xl ${selectedOption === question.correctAnswer ? 'text-brand-green' : 'text-brand-pink'}`}
              >
                {selectedOption === question.correctAnswer ? (
                  <>
                    <div className="bg-white rounded-full"><CheckCircle size={40} fill="currentColor" className="text-brand-green" /></div>
                    Awesome Job!
                  </>
                ) : (
                  <>
                    <div className="bg-white rounded-full"><XCircle size={40} fill="currentColor" className="text-brand-pink" /></div>
                    Oops! Try again next time.
                  </>
                )}
              </motion.div>
            )}
          </div>

          {/* Action Button */}
          <div className="w-full sm:w-auto">
            {!isAnswered ? (
              <Button 
                size="lg"
                variant={selectedOption !== null ? "success" : "default"}
                onClick={handleCheck}
                disabled={selectedOption === null}
                className="w-full sm:w-48 text-xl"
              >
                Check
              </Button>
            ) : (
              <Button 
                size="lg"
                variant={selectedOption === question.correctAnswer ? "success" : "danger"}
                onClick={handleNext}
                className="w-full sm:w-48 text-xl"
              >
                Continue
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
