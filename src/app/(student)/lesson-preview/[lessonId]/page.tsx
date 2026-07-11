"use client"

import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { ArrowLeft, PlayCircle, Star, Sparkles, Brain, CheckCircle2 } from "lucide-react"

export default function LessonPreviewScreen({ params }: { params: { lessonId: string } }) {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-bg-light relative flex flex-col items-center justify-center p-4">
      {/* Absolute Back Button */}
      <div className="absolute top-6 left-6 z-20">
        <button onClick={() => router.back()} className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-text-secondary shadow-sm hover:scale-105 transition-all">
          <ArrowLeft size={24} />
        </button>
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-2xl card-game p-1 md:p-2 overflow-hidden"
      >
        {/* Massive Illustration Banner */}
        <div className="w-full h-64 bg-gradient-to-br from-primary-purple to-magic-pink rounded-[24px] rounded-b-none relative flex flex-col items-center justify-center overflow-hidden">
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="absolute -top-32 -left-32 w-96 h-96 bg-white/20 rounded-full blur-3xl"
          />
          <motion.div 
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="text-8xl drop-shadow-2xl relative z-10"
          >
            🐼
          </motion.div>
          <div className="absolute bottom-4 flex gap-2">
            <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-white text-xs font-bold font-heading shadow-sm">
              Addition Magic
            </span>
            <span className="px-3 py-1 bg-black/20 backdrop-blur-md rounded-full text-white text-xs font-bold font-heading shadow-sm">
              Level 1
            </span>
          </div>
        </div>

        {/* Content Area */}
        <div className="p-8 text-center bg-white rounded-b-[24px]">
          <h1 className="text-3xl font-heading font-extrabold text-text-primary mb-2">
            Adding 2-Digit Numbers
          </h1>
          <p className="font-body font-bold text-text-secondary mb-8 max-w-md mx-auto">
            Spark Panda needs your help counting his giant bamboo collection. Can you add them together?
          </p>

          <div className="grid grid-cols-2 gap-4 mb-10 max-w-md mx-auto">
            <div className="bg-slate-50 p-4 rounded-2xl border-2 border-slate-100 flex flex-col items-center">
              <Brain className="text-primary-purple mb-2" />
              <span className="text-xs font-bold text-text-secondary uppercase">Required Skill</span>
              <span className="font-heading font-bold text-sm text-text-primary">Counting 1-100</span>
            </div>
            <div className="bg-accent-yellow/10 p-4 rounded-2xl border-2 border-accent-yellow/30 flex flex-col items-center">
              <Star className="text-accent-yellow mb-2" fill="currentColor" />
              <span className="text-xs font-bold text-text-secondary uppercase">Reward</span>
              <span className="font-heading font-bold text-sm text-accent-yellow">100 XP</span>
            </div>
          </div>

          {/* Action Button */}
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <button 
              onClick={() => {
                // Future integration to start actual lesson
                alert("Starting Lesson Engine...")
              }}
              className="w-full max-w-sm mx-auto btn-primary flex items-center justify-center gap-3 px-8 py-5 text-xl bg-gradient-to-r from-success-green to-emerald-500 hover:from-emerald-500 hover:to-emerald-600 shadow-[0_6px_0_0_#065f46]"
            >
              <PlayCircle fill="currentColor" size={24} className="text-white" />
              Start Adventure
            </button>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}
