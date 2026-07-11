"use client"

import React, { useEffect } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { Trophy, Star, Coins, ArrowRight } from "lucide-react"
import confetti from "canvas-confetti"
import { Button } from "@/components/ui/Button"

export default function ResultPage() {
  const router = useRouter()

  useEffect(() => {
    // Fire confetti on load
    const duration = 3 * 1000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#8B5CF6', '#EC4899', '#F59E0B', '#10B981']
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#8B5CF6', '#EC4899', '#F59E0B', '#10B981']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  }, [])

  return (
    <div className="min-h-screen bg-bg-primary flex flex-col items-center justify-center p-4">
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", bounce: 0.5 }}
        className="card-game w-full max-w-md p-8 flex flex-col items-center text-center bg-white"
      >
        <div className="w-32 h-32 bg-brand-yellow rounded-full flex items-center justify-center mb-6 shadow-[0_0_40px_rgba(245,158,11,0.5)] border-4 border-white relative">
          <Trophy size={64} fill="currentColor" className="text-white drop-shadow-md" />
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
            className="absolute -top-4 -right-4"
          >
            <Star size={32} fill="#F59E0B" className="text-brand-yellow drop-shadow-md" />
          </motion.div>
        </div>

        <h1 className="text-4xl font-extrabold text-brand-purple mb-2">Lesson Complete!</h1>
        <p className="text-lg text-slate-500 font-bold mb-8">You are doing amazing!</p>

        {/* Rewards Row */}
        <div className="flex gap-4 w-full mb-8">
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex-1 bg-brand-blue/10 border-2 border-brand-blue/20 rounded-2xl p-4 flex flex-col items-center"
          >
            <span className="text-brand-blue font-black text-2xl">XP</span>
            <span className="text-xl font-bold text-slate-700 mt-1">+150</span>
          </motion.div>
          
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="flex-1 bg-brand-pink/10 border-2 border-brand-pink/20 rounded-2xl p-4 flex flex-col items-center"
          >
            <Coins size={32} fill="currentColor" className="text-brand-pink" />
            <span className="text-xl font-bold text-slate-700 mt-1">+25</span>
          </motion.div>
        </div>

        <Button 
          size="lg"
          className="w-full text-xl flex items-center justify-center gap-2 group"
          onClick={() => router.push('/dashboard')}
        >
          Back to Dashboard
          <ArrowRight className="group-hover:translate-x-1 transition-transform" />
        </Button>
      </motion.div>
    </div>
  )
}
