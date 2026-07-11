"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { AnimatedBackground } from "@/features/auth/components/AnimatedBackground"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/Button"

const AVATARS = [
  "🐼", "🦁", "🐰", "🦊", "🐯", "🐱", 
  "🤖", "👨‍🚀", "🧚‍♀️", "🐉", "🦄", "🐵",
  "🦖", "🦉", "🐸", "🐷", "🐧", "🐨"
]

export default function ChooseAvatarScreen() {
  const router = useRouter()
  const [selected, setSelected] = useState<number | null>(null)

  const handleNext = () => {
    if (selected !== null) {
      router.push('/onboarding/permissions')
    }
  }

  return (
    <AnimatedBackground>
      <div className="absolute top-6 left-6 z-20">
        <button 
          onClick={() => router.back()}
          className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-text-secondary shadow-sm hover:scale-105 active:scale-95 transition-all"
        >
          <ArrowLeft size={24} />
        </button>
      </div>

      {/* Progress */}
      <div className="absolute top-8 w-full max-w-xs mx-auto left-0 right-0 z-20">
        <div className="flex gap-2">
          <div className="flex-1 h-3 bg-success-green rounded-full shadow-inner"></div>
          <div className="flex-1 h-3 bg-success-green rounded-full shadow-inner"></div>
          <div className="flex-1 h-3 bg-slate-200 rounded-full shadow-inner"></div>
        </div>
      </div>

      <motion.div 
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        className="w-full max-w-2xl mx-auto relative z-10 mt-16"
      >
        <div className="text-center mb-8 bg-white/80 p-4 rounded-3xl backdrop-blur-md border-4 border-white">
          <h1 className="text-3xl font-heading font-extrabold text-primary-purple mb-2">
            Choose Your Hero
          </h1>
          <p className="font-body font-bold text-text-secondary">
            Pick a character for your adventure!
          </p>
        </div>

        <div className="grid grid-cols-3 md:grid-cols-6 gap-4 mb-8">
          {AVATARS.map((emoji, idx) => (
            <motion.button
              key={idx}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setSelected(idx)}
              className={`aspect-square rounded-[32px] flex items-center justify-center text-4xl sm:text-5xl border-4 transition-all ${selected === idx ? 'bg-accent-yellow/20 border-accent-yellow shadow-[0_0_20px_rgba(251,191,36,0.5)]' : 'bg-white border-slate-100 shadow-sm'}`}
            >
              {emoji}
            </motion.button>
          ))}
        </div>

        <div className="flex justify-center">
          <Button 
            size="lg" 
            className="w-full max-w-sm text-xl"
            disabled={selected === null}
            onClick={handleNext}
          >
            Looking Good! 
          </Button>
        </div>
      </motion.div>
    </AnimatedBackground>
  )
}
