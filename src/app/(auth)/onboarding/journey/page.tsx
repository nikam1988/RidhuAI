"use client"

import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { AnimatedBackground } from "@/features/auth/components/AnimatedBackground"
import { ArrowLeft, ArrowRight } from "lucide-react"

const WORLDS = [
  { id: 1, title: "English Forest", color: "bg-success-green" },
  { id: 2, title: "Math Kingdom", color: "bg-primary-purple" },
  { id: 3, title: "EVS Jungle", color: "bg-accent-yellow" },
  { id: 4, title: "Space GK", color: "bg-night-purple" }
]

export default function LearningJourneyPreviewScreen() {
  const router = useRouter()

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

      <div className="text-center mb-10 relative z-10">
        <h1 className="text-3xl md:text-4xl font-heading font-extrabold text-primary-purple mb-2">
          Your Magical Worlds!
        </h1>
        <p className="font-body font-bold text-text-secondary text-lg">
          Unlock new worlds as you learn
        </p>
      </div>

      <div className="relative z-10 w-full max-w-md mx-auto grid grid-cols-2 gap-4">
        {WORLDS.map((world, index) => (
          <motion.div
            key={world.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className={`card-game aspect-square flex flex-col items-center justify-center p-4 text-center ${world.color} border-white shadow-xl`}
          >
            <h3 className="text-white font-heading font-bold text-xl drop-shadow-md">
              {world.title}
            </h3>
          </motion.div>
        ))}
      </div>

      <motion.div 
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-12 flex justify-center relative z-10"
      >
        <button 
          onClick={() => router.push('/dashboard')}
          className="bg-white px-8 py-4 rounded-full font-heading font-bold text-primary-purple text-xl shadow-lg flex items-center gap-3 hover:scale-105 active:scale-95 transition-all"
        >
          Enter KidSpark <ArrowRight />
        </button>
      </motion.div>
    </AnimatedBackground>
  )
}
