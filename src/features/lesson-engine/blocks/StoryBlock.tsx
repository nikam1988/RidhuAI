"use client"

import { motion } from "framer-motion"
import { BlockProps, StoryBlockData } from "../types"

export function StoryBlock({ data, onComplete, isActive }: BlockProps<StoryBlockData>) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: isActive ? 1 : 0.5, y: 0, scale: isActive ? 1 : 0.98 }}
      className={`card-game p-6 md:p-10 bg-white border-2 border-primary-purple transition-all ${!isActive && 'pointer-events-none'}`}
    >
      <div className="flex flex-col md:flex-row gap-8 items-center">
        <motion.div 
          animate={isActive ? { y: [0, -10, 0] } : {}}
          transition={{ duration: 3, repeat: Infinity }}
          className="w-32 h-32 md:w-48 md:h-48 bg-primary-purple/10 rounded-full flex items-center justify-center text-6xl md:text-8xl shrink-0 shadow-inner"
        >
          {data.character.includes('Panda') ? '🐼' : data.character.includes('Lion') ? '🦁' : '🦉'}
        </motion.div>
        
        <div className="flex-1 text-center md:text-left">
          <h3 className="font-heading font-extrabold text-2xl text-primary-purple mb-4">
            {data.character} says:
          </h3>
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 relative">
            <div className="absolute -left-3 top-8 w-6 h-6 bg-slate-50 border-l border-b border-slate-100 rotate-45 hidden md:block"></div>
            <p className="font-body font-bold text-lg md:text-xl text-slate-700 leading-relaxed">
              "{data.dialogue}"
            </p>
          </div>

          {isActive && (
            <button 
              onClick={onComplete}
              className="mt-8 btn-primary bg-primary-purple shadow-[0_4px_0_0_#4C1D95] hover:bg-primary-purple/90 w-full md:w-auto px-8"
            >
              Continue
            </button>
          )}
        </div>
      </div>
    </motion.div>
  )
}
