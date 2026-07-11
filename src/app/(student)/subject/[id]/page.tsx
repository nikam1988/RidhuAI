"use client"

import React from "react"
import { motion } from "framer-motion"
import { ArrowLeft, Star, Lock, Play, CheckCircle2 } from "lucide-react"
import { useRouter } from "next/navigation"

const CHAPTERS = [
  { id: 1, title: "Getting Started", isUnlocked: true, isCompleted: true, stars: 3 },
  { id: 2, title: "Level Up", isUnlocked: true, isCompleted: false, stars: 0 },
  { id: 3, title: "Super Skills", isUnlocked: false, isCompleted: false, stars: 0 },
  { id: 4, title: "Brain Teasers", isUnlocked: false, isCompleted: false, stars: 0 },
  { id: 5, title: "Master Boss", isUnlocked: false, isCompleted: false, stars: 0 },
]

export default function SubjectPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter()
  // React.use is available in newer React versions used by Next.js App Router
  const resolvedParams = React.use(params)
  const subjectId = resolvedParams.id

  const subjectNames: Record<string, string> = {
    math: "Mathematics",
    english: "English",
    hindi: "Hindi",
    evs: "EVS",
    gk: "General Knowledge",
    computer: "Computer Basics",
    art: "Art & Craft",
    pe: "Physical Education",
    music: "Music"
  }

  const title = subjectNames[subjectId] || "Subject"

  return (
    <div className="min-h-screen bg-bg-secondary flex flex-col items-center">
      {/* Top Header */}
      <header className="w-full sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b-4 border-slate-200 px-4 py-4 flex items-center justify-between max-w-2xl mx-auto shadow-sm">
        <button 
          onClick={() => router.push('/dashboard')}
          className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-slate-200 hover:scale-105 transition-all"
        >
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-2xl font-extrabold text-slate-700 capitalize">{title} Journey</h1>
        <div className="w-12 h-12"></div> {/* Spacer for centering */}
      </header>

      {/* Path Container */}
      <div className="flex-1 w-full max-w-2xl px-4 py-12 flex flex-col items-center relative">
        {/* Background Line */}
        <div className="absolute top-12 bottom-12 left-1/2 w-4 bg-slate-200 rounded-full -translate-x-1/2 z-0"></div>

        {CHAPTERS.map((chapter, index) => {
          // Alternating left and right layout
          const isLeft = index % 2 === 0
          
          let bgColor = "bg-slate-300"
          let textColor = "text-slate-500"
          let icon = <Lock size={32} />
          
          if (chapter.isCompleted) {
            bgColor = "bg-brand-yellow"
            textColor = "text-yellow-700"
            icon = <CheckCircle2 size={36} fill="white" className="text-brand-yellow" />
          } else if (chapter.isUnlocked) {
            bgColor = "bg-brand-purple"
            textColor = "text-purple-700"
            icon = <Play size={36} fill="white" className="text-brand-purple ml-1" />
          }

          return (
            <div key={chapter.id} className={`relative z-10 w-full flex ${isLeft ? 'justify-start' : 'justify-end'} mb-16 px-4 md:px-16`}>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={chapter.isUnlocked ? { scale: 1.05 } : {}}
                whileTap={chapter.isUnlocked ? { scale: 0.95 } : {}}
                className="relative flex flex-col items-center"
              >
                {/* Tooltip Title */}
                <div className={`absolute -top-12 ${isLeft ? 'left-0' : 'right-0'} bg-white px-4 py-2 rounded-2xl shadow-md font-bold text-slate-700 whitespace-nowrap border-2 border-slate-100 z-20`}>
                  {chapter.title}
                  {/* Speech Bubble Arrow */}
                  <div className={`absolute -bottom-2 ${isLeft ? 'left-6' : 'right-6'} w-4 h-4 bg-white border-b-2 border-r-2 border-slate-100 rotate-45`}></div>
                </div>

                {/* Main Node Button */}
                <button 
                  onClick={() => {
                    if (chapter.isUnlocked && !chapter.isCompleted) {
                      router.push('/quiz')
                    }
                  }}
                  className={`w-24 h-24 rounded-full flex items-center justify-center shadow-xl border-[6px] border-white transition-all ${bgColor} ${chapter.isUnlocked && !chapter.isCompleted ? 'cursor-pointer hover:shadow-2xl hover:scale-105 active:scale-95' : chapter.isCompleted ? 'cursor-default' : 'cursor-not-allowed opacity-80'}`}
                >
                  {icon}
                </button>

                {/* Stars Indicator */}
                {chapter.isUnlocked && (
                  <div className="absolute -bottom-4 bg-white rounded-full px-3 py-1 flex items-center gap-1 shadow-md border-2 border-slate-100">
                    {[1, 2, 3].map(star => (
                      <Star 
                        key={star} 
                        size={16} 
                        fill={star <= chapter.stars ? "#F59E0B" : "transparent"} 
                        className={star <= chapter.stars ? "text-brand-yellow" : "text-slate-300"}
                      />
                    ))}
                  </div>
                )}
              </motion.div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
