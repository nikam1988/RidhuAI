"use client"

import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/Button"
import { AnimatedBackground } from "@/features/auth/components/AnimatedBackground"
import { Moon, Languages } from "lucide-react"

export default function WelcomeScreen() {
  const router = useRouter()

  return (
    <AnimatedBackground>
      {/* Top Controls */}
      <div className="absolute top-6 right-6 flex gap-3 z-20">
        <button className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-text-secondary shadow-sm hover:scale-105 active:scale-95 transition-all">
          <Languages size={24} />
        </button>
        <button className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-night-purple shadow-sm hover:scale-105 active:scale-95 transition-all">
          <Moon size={24} />
        </button>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="card-game p-8 flex flex-col items-center text-center max-w-sm mx-auto w-full"
      >
        <div className="w-32 h-32 bg-primary-purple/10 rounded-full flex items-center justify-center mb-6">
          <span className="text-6xl">🚀</span>
        </div>

        <h1 className="text-3xl font-heading font-extrabold text-primary-purple mb-2">
          Welcome to Ridhvi AI
        </h1>
        <p className="text-lg font-body font-bold text-text-secondary mb-8">
          Learn while you play!
        </p>

        <div className="w-full space-y-4">
          <Button 
            size="lg" 
            className="w-full text-xl"
            onClick={() => router.push('/auth/choose-user')}
          >
            Get Started
          </Button>
          
          <Button 
            variant="ghost" 
            className="w-full font-bold text-slate-500"
            onClick={() => router.push('/auth/choose-user')}
          >
            Already have an account?
          </Button>
        </div>
      </motion.div>
    </AnimatedBackground>
  )
}
