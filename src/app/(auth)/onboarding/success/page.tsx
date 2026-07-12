"use client"

import { useEffect } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import confetti from "canvas-confetti"
import { Button } from "@/components/ui/Button"

export default function CongratulationsScreen() {
  const router = useRouter()

  useEffect(() => {
    const duration = 3 * 1000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#8B5CF6', '#FBBF24', '#10B981']
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#8B5CF6', '#FBBF24', '#10B981']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  }, [])

  return (
    <div className="min-h-screen bg-bg-light relative overflow-hidden flex flex-col items-center justify-center p-4">
      <motion.div 
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", bounce: 0.6 }}
        className="card-game p-10 max-w-md w-full text-center flex flex-col items-center"
      >
        <div className="text-8xl mb-6">🏆</div>
        
        <h1 className="text-4xl font-heading font-extrabold text-primary-purple mb-4">
          All Set!
        </h1>
        <p className="text-lg font-body font-bold text-text-secondary mb-8">
          You earned your first rewards!
        </p>

        <div className="flex gap-4 w-full mb-8">
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex-1 bg-accent-yellow/20 border-4 border-accent-yellow/30 rounded-3xl p-4 flex flex-col items-center"
          >
            <span className="text-3xl mb-1">🪙</span>
            <span className="font-heading font-bold text-xl text-accent-yellow">+100</span>
          </motion.div>
          
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="flex-1 bg-secondary-sky/20 border-4 border-secondary-sky/30 rounded-3xl p-4 flex flex-col items-center"
          >
            <span className="text-3xl mb-1">⭐</span>
            <span className="font-heading font-bold text-xl text-secondary-sky">XP +50</span>
          </motion.div>
        </div>

        <Button 
          size="lg" 
          className="w-full text-xl animate-bounce"
          onClick={() => router.push('/dashboard')}
        >
          Let&apos;s Play!
        </Button>
      </motion.div>
    </div>
  )
}
