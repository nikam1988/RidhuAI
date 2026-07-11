"use client"

import { motion } from "framer-motion"

export function TreasureChest({ className = "" }: { className?: string }) {
  return (
    <div className={`card-game p-6 flex flex-col items-center justify-center text-center border-4 border-accent-yellow/30 bg-gradient-to-b from-white to-accent-yellow/5 ${className}`}>
      <motion.div
        animate={{ rotate: [-2, 2, -2, 2, 0] }}
        transition={{ duration: 1, repeat: Infinity, repeatDelay: 5 }}
        className="text-7xl mb-4 drop-shadow-xl cursor-pointer"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        🎁
      </motion.div>
      <h3 className="font-heading font-extrabold text-xl text-text-primary mb-1">
        Daily Gift Ready!
      </h3>
      <p className="text-sm font-body font-bold text-text-secondary mb-4">
        Tap to open your surprise.
      </p>
      <button className="btn-primary bg-accent-yellow hover:bg-[#D97706] shadow-[0_4px_0_0_#B45309] active:shadow-none w-full py-2">
        Open Now
      </button>
    </div>
  )
}
