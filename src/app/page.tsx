"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useRouter } from "next/navigation"
import { ShieldCheck, Cloud, Stars } from "lucide-react"

const EDUCATIONAL_TIPS = [
  "Did you know? Octopuses have 3 hearts! 🐙",
  "Learning something new grows your brain! 🧠",
  "Space is completely silent! 🌌",
  "Honey never spoils! 🍯",
]

export default function SplashScreen() {
  const router = useRouter()
  const [progress, setProgress] = useState(0)
  const [tipIndex, setTipIndex] = useState(0)

  useEffect(() => {
    // Simulate loading progress
    const timer = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          clearInterval(timer)
          setTimeout(() => router.push('/welcome'), 500)
          return 100
        }
        return p + Math.floor(Math.random() * 15) + 5
      })
    }, 400)

    // Cycle tips
    const tipTimer = setInterval(() => {
      setTipIndex(i => (i + 1) % EDUCATIONAL_TIPS.length)
    }, 2000)

    return () => {
      clearInterval(timer)
      clearInterval(tipTimer)
    }
  }, [router])

  return (
    <div className="min-h-screen bg-bg-light relative overflow-hidden flex flex-col items-center justify-center">
      {/* Background Elements */}
      <motion.div animate={{ x: [0, 50, 0] }} transition={{ duration: 15, repeat: Infinity }} className="absolute top-20 left-10 text-secondary-sky/20">
        <Cloud fill="currentColor" size={100} />
      </motion.div>
      <motion.div animate={{ x: [0, -50, 0] }} transition={{ duration: 12, repeat: Infinity }} className="absolute bottom-40 right-10 text-secondary-sky/20">
        <Cloud fill="currentColor" size={80} />
      </motion.div>
      <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 3, repeat: Infinity }} className="absolute top-1/4 right-1/4 text-accent-yellow/30">
        <Stars size={40} />
      </motion.div>

      {/* Main Logo & Mascot */}
      <motion.div 
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", bounce: 0.5 }}
        className="flex flex-col items-center z-10"
      >
        <div className="relative mb-6">
          <h1 className="text-6xl font-heading font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary-purple to-magic-pink drop-shadow-sm pb-2">
            Ridhvi AI
          </h1>
          {/* Mock Mascot Waving */}
          <motion.div 
            animate={{ rotate: [0, 15, -15, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
            className="absolute -top-10 -right-10 text-5xl origin-bottom-right"
          >
            🐼
          </motion.div>
        </div>

        {/* Loading Bar */}
        <div className="w-64 h-6 bg-slate-200 rounded-full overflow-hidden border-4 border-white shadow-sm mb-6">
          <motion.div 
            className="h-full bg-success-green"
            animate={{ width: `${progress}%` }}
            transition={{ ease: "linear", duration: 0.4 }}
          />
        </div>

        {/* Dynamic Tips */}
        <div className="h-12 flex items-center justify-center overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.p
              key={tipIndex}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              className="text-text-secondary font-body font-bold text-center"
            >
              {EDUCATIONAL_TIPS[tipIndex]}
            </motion.p>
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Badges Footer */}
      <div className="absolute bottom-8 flex gap-4 text-xs font-bold text-slate-400">
        <div className="flex items-center gap-1 bg-white px-3 py-1.5 rounded-full shadow-sm">
          <ShieldCheck size={16} className="text-success-green" /> Safe For Kids
        </div>
        <div className="flex items-center gap-1 bg-white px-3 py-1.5 rounded-full shadow-sm">
          🚫 No Ads
        </div>
        <div className="flex items-center gap-1 bg-white px-3 py-1.5 rounded-full shadow-sm">
          📱 Offline Ready
        </div>
      </div>
      <div className="absolute bottom-2 right-4 text-[10px] text-slate-300">v1.0.0</div>
    </div>
  )
}
