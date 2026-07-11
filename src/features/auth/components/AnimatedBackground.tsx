"use client"

import { motion } from "framer-motion"
import { Stars, Cloud } from "lucide-react"

export function AnimatedBackground({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-bg-light relative overflow-hidden flex flex-col items-center justify-center selection:bg-primary-purple selection:text-white">
      {/* Animated Clouds */}
      <motion.div 
        animate={{ x: [0, 100, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute top-20 left-10 text-secondary-sky/20"
      >
        <Cloud fill="currentColor" size={120} />
      </motion.div>
      <motion.div 
        animate={{ x: [0, -80, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        className="absolute top-40 right-20 text-secondary-sky/20"
      >
        <Cloud fill="currentColor" size={80} />
      </motion.div>

      {/* Floating Stars */}
      <motion.div 
        animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-32 left-32 text-accent-yellow/40"
      >
        <Stars size={48} />
      </motion.div>
      <motion.div 
        animate={{ y: [0, 20, 0], rotate: [0, -10, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute top-32 right-32 text-magic-pink/40"
      >
        <Stars size={64} />
      </motion.div>

      <div className="z-10 w-full max-w-md mx-auto p-4">
        {children}
      </div>
    </div>
  )
}
