"use client"

import { motion } from "framer-motion"
import { Play, Clock } from "lucide-react"

export function ContinueLearning({ className = "" }: { className?: string }) {
  return (
    <motion.div 
      whileHover={{ y: -4 }}
      className={`card-game p-6 flex flex-col md:flex-row gap-6 items-center ${className}`}
    >
      <div className="w-full md:w-32 h-32 rounded-[24px] bg-accent-yellow/20 flex flex-col items-center justify-center border-4 border-accent-yellow/30 shrink-0 relative overflow-hidden">
        <span className="text-5xl relative z-10">🦁</span>
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="absolute inset-0 bg-accent-yellow/20 rounded-full blur-xl"
        />
      </div>

      <div className="flex-1 w-full text-center md:text-left">
        <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 mb-2">
          <span className="px-3 py-1 bg-primary-purple/10 text-primary-purple rounded-full text-xs font-bold uppercase tracking-wider">
            Math Kingdom
          </span>
          <span className="px-3 py-1 bg-success-green/10 text-success-green rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1">
            <Clock size={12} /> 10 Mins
          </span>
        </div>
        
        <h2 className="text-2xl font-heading font-extrabold text-text-primary mb-1">
          Addition Adventures
        </h2>
        <p className="text-text-secondary font-body font-bold mb-4">
          Chapter 2: The Magic Numbers
        </p>

        {/* Progress Bar */}
        <div className="w-full h-4 bg-slate-100 rounded-full overflow-hidden mb-4 border-2 border-slate-200">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: "60%" }}
            className="h-full bg-success-green rounded-full relative"
          >
            <div className="absolute inset-0 bg-white/20 w-full h-1"></div>
          </motion.div>
        </div>

        <button className="w-full md:w-auto btn-primary flex items-center justify-center gap-2 px-8 py-3 h-auto">
          <Play fill="currentColor" size={20} /> Resume Journey
        </button>
      </div>
    </motion.div>
  )
}
