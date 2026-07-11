"use client"

import { motion } from "framer-motion"
import { BlockProps, FunFactBlockData } from "../types"
import { Lightbulb } from "lucide-react"

export function FunFactBlock({ data, onComplete, isActive }: BlockProps<FunFactBlockData>) {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: isActive ? 1 : 0.5, scale: isActive ? 1 : 0.95 }}
      className={`card-game p-6 md:p-8 bg-gradient-to-br from-accent-yellow to-orange-400 text-white border-4 border-white shadow-xl transition-all ${!isActive && 'pointer-events-none grayscale'}`}
    >
      <div className="flex items-start gap-4">
        <div className="bg-white/20 p-3 rounded-full shrink-0">
          <Lightbulb size={32} className="text-white" />
        </div>
        <div>
          <h3 className="font-heading font-extrabold text-2xl drop-shadow-md mb-2">
            {data.title || "Did You Know?"}
          </h3>
          <p className="font-body font-bold text-lg text-white/90 drop-shadow-sm mb-6">
            {data.content}
          </p>

          {isActive && (
            <button 
              onClick={onComplete}
              className="btn-primary bg-white text-orange-500 hover:bg-slate-50 border-2 border-white shadow-none px-8"
            >
              Wow! Next
            </button>
          )}
        </div>
      </div>
    </motion.div>
  )
}
