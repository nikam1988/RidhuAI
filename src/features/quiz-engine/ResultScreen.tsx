"use client"

import { motion } from "framer-motion"
import { useQuizStore } from "./store/useQuizStore"
import { Trophy, Star, Target, Zap, RotateCcw, ArrowRight } from "lucide-react"

export function ResultScreen({ onContinue }: { onContinue: () => void }) {
  const { xpEarned, coinsEarned, correctAnswers, totalAnswered, maxStreak } = useQuizStore()
  
  const accuracy = totalAnswered > 0 ? Math.round((correctAnswers / totalAnswered) * 100) : 0
  const starsEarned = accuracy >= 90 ? 3 : accuracy >= 60 ? 2 : 1

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
      
      {/* Background Magic Effects */}
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
        className="absolute w-[800px] h-[800px] bg-primary-purple/20 rounded-full blur-[100px]"
      />

      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", bounce: 0.5 }}
        className="relative z-10 w-full max-w-lg bg-white rounded-[40px] p-8 md:p-12 shadow-2xl text-center"
      >
        {/* Animated Trophy / Stars */}
        <div className="relative -mt-24 mb-8">
          <motion.div 
            animate={{ y: [-10, 10, -10] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="w-40 h-40 mx-auto bg-gradient-to-br from-accent-yellow to-orange-400 rounded-full flex items-center justify-center border-8 border-white shadow-2xl"
          >
            <Trophy size={64} className="text-white" />
          </motion.div>
          
          <div className="flex justify-center gap-2 mt-4">
            {[1, 2, 3].map((star) => (
              <motion.div
                key={star}
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: star <= starsEarned ? 1 : 0.8, rotate: 0 }}
                transition={{ delay: star * 0.2, type: "spring" }}
              >
                <Star 
                  size={48} 
                  className={star <= starsEarned ? "text-accent-yellow drop-shadow-lg" : "text-slate-200"} 
                  fill={star <= starsEarned ? "currentColor" : "none"} 
                />
              </motion.div>
            ))}
          </div>
        </div>

        <h1 className="text-4xl font-heading font-extrabold text-slate-800 mb-2">
          {accuracy >= 90 ? "Incredible Job!" : accuracy >= 60 ? "Great Effort!" : "Keep Trying!"}
        </h1>
        <p className="font-body font-bold text-slate-500 mb-8">
          You mastered Carry Over Addition. Spark Panda is proud of you!
        </p>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-primary-purple/10 p-4 rounded-2xl border border-primary-purple/20">
            <div className="flex items-center justify-center gap-2 text-primary-purple mb-1">
              <Star size={18} fill="currentColor" /> <span className="text-xs font-bold uppercase">Total XP</span>
            </div>
            <p className="text-3xl font-heading font-extrabold text-primary-purple">+{xpEarned}</p>
          </div>
          
          <div className="bg-accent-yellow/10 p-4 rounded-2xl border border-accent-yellow/20">
            <div className="flex items-center justify-center gap-2 text-accent-yellow mb-1">
              <span className="text-lg">🪙</span> <span className="text-xs font-bold uppercase">Coins</span>
            </div>
            <p className="text-3xl font-heading font-extrabold text-accent-yellow">+{coinsEarned}</p>
          </div>

          <div className="bg-success-green/10 p-4 rounded-2xl border border-success-green/20">
            <div className="flex items-center justify-center gap-2 text-success-green mb-1">
              <Target size={18} /> <span className="text-xs font-bold uppercase">Accuracy</span>
            </div>
            <p className="text-3xl font-heading font-extrabold text-success-green">{accuracy}%</p>
          </div>

          <div className="bg-orange-50 p-4 rounded-2xl border border-orange-200">
            <div className="flex items-center justify-center gap-2 text-warning-orange mb-1">
              <Zap size={18} fill="currentColor" /> <span className="text-xs font-bold uppercase">Max Streak</span>
            </div>
            <p className="text-3xl font-heading font-extrabold text-warning-orange">{maxStreak}</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4">
          <button 
            onClick={onContinue}
            className="w-full btn-primary bg-primary-purple shadow-[0_6px_0_0_#4C1D95] hover:bg-primary-purple/90 py-5 text-xl flex items-center justify-center gap-2"
          >
            Continue Journey <ArrowRight />
          </button>
          
          <button className="w-full bg-slate-50 text-slate-600 font-bold py-4 rounded-2xl border-2 border-slate-200 hover:bg-slate-100 transition-all flex items-center justify-center gap-2">
            <RotateCcw size={18} /> Practice Again
          </button>
        </div>

      </motion.div>
    </div>
  )
}
