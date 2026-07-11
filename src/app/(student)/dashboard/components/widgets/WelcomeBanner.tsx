"use client"

import { motion } from "framer-motion"

export function WelcomeBanner({ className = "" }: { className?: string }) {
  return (
    <div className={`relative overflow-hidden rounded-[32px] bg-gradient-to-r from-primary-purple to-magic-pink p-6 md:p-10 shadow-xl border-4 border-white ${className}`}>
      {/* Background Magic Elements */}
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        className="absolute -top-20 -right-20 w-64 h-64 bg-white/10 rounded-full blur-3xl"
      />
      <motion.div 
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-10 right-10 text-white/40 text-4xl"
      >
        ✨
      </motion.div>

      <div className="relative z-10 flex items-center justify-between">
        <div>
          <h1 className="text-3xl md:text-5xl font-heading font-extrabold text-white mb-2 drop-shadow-md">
            Good Morning, Aarohi! 🌞
          </h1>
          <p className="text-white/90 font-body font-bold text-lg md:text-xl">
            Ready for another magical adventure?
          </p>
        </div>

        {/* Mascot */}
        <motion.div 
          animate={{ rotate: [0, 10, -10, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
          className="hidden md:flex text-8xl origin-bottom drop-shadow-xl"
        >
          🐼
        </motion.div>
      </div>
    </div>
  )
}
