"use client"

import { motion } from "framer-motion"
import { Target } from "lucide-react"

export function DailyGoals({ className = "" }: { className?: string }) {
  const progress = 75; // 75% complete

  return (
    <div className={`card-game p-6 ${className}`}>
      <div className="flex items-center gap-2 mb-6">
        <Target className="text-primary-purple" />
        <h2 className="text-xl font-heading font-extrabold text-text-primary">
          Daily Goal
        </h2>
      </div>

      <div className="flex flex-col items-center justify-center">
        {/* Simple Progress Circle SVG */}
        <div className="relative w-32 h-32 mb-4">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            <circle
              className="text-slate-100 stroke-current"
              strokeWidth="10"
              cx="50"
              cy="50"
              r="40"
              fill="transparent"
            ></circle>
            <motion.circle
              className="text-success-green stroke-current"
              strokeWidth="10"
              strokeLinecap="round"
              cx="50"
              cy="50"
              r="40"
              fill="transparent"
              initial={{ strokeDasharray: "251.2", strokeDashoffset: "251.2" }}
              animate={{ strokeDashoffset: 251.2 - (251.2 * progress) / 100 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            ></motion.circle>
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-3xl font-heading font-extrabold text-text-primary">15</span>
            <span className="text-xs font-body font-bold text-text-secondary uppercase">Mins</span>
          </div>
        </div>

        <div className="w-full space-y-2">
          <div className="flex justify-between text-sm font-bold">
            <span className="text-text-secondary">Lessons</span>
            <span className="text-success-green">2/3</span>
          </div>
          <div className="flex justify-between text-sm font-bold">
            <span className="text-text-secondary">Coins</span>
            <span className="text-accent-yellow">45/100</span>
          </div>
        </div>
      </div>
    </div>
  )
}
