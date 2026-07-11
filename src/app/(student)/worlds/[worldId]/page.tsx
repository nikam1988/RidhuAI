"use client"

import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { ArrowLeft, Play, Star, Trophy, Lock } from "lucide-react"

// Dummy data for chapter nodes
const CHAPTERS = [
  { id: "ch1", title: "The Number Forest", type: "standard", state: "completed", xp: 100, stars: 3 },
  { id: "ch2", title: "Addition Bridge", type: "standard", state: "current", xp: 150, stars: 0 },
  { id: "ch3", title: "Secret Treasure Room", type: "treasure", state: "locked", xp: 500, stars: 0 },
  { id: "ch4", title: "Subtraction Cave", type: "standard", state: "locked", xp: 200, stars: 0 },
  { id: "ch5", title: "Dragon Boss Battle", type: "boss", state: "locked", xp: 1000, stars: 0 },
]

export default function WorldDetailsScreen({ params }: { params: { worldId: string } }) {
  const router = useRouter()

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-slate-50">
      
      {/* Main Map Area (70%) */}
      <div className="flex-1 relative overflow-hidden flex flex-col">
        {/* World Hero Banner */}
        <div className="bg-gradient-to-r from-primary-purple to-night-purple p-8 rounded-b-[40px] shadow-lg relative z-20">
          <button onClick={() => router.back()} className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all mb-4">
            <ArrowLeft size={24} />
          </button>
          
          <div className="flex justify-between items-end">
            <div>
              <h1 className="text-4xl md:text-5xl font-heading font-extrabold text-white drop-shadow-md mb-2">
                Math Kingdom
              </h1>
              <p className="text-white/90 font-body font-bold text-lg max-w-md">
                Help King Leo count his treasures and defeat the number dragons!
              </p>
            </div>
            <motion.div animate={{ y: [-10, 10, -10] }} transition={{ duration: 4, repeat: Infinity }} className="text-8xl drop-shadow-2xl hidden md:block">
              🏰
            </motion.div>
          </div>
        </div>

        {/* The Winding Map Path */}
        <div className="flex-1 relative overflow-y-auto p-10 flex flex-col items-center">
          {/* A simple vertical winding path approximation using alternating flex alignments */}
          <div className="w-full max-w-lg relative flex flex-col gap-12 pb-32">
            
            {/* The SVG Path connecting nodes */}
            <div className="absolute top-10 bottom-10 left-1/2 w-4 bg-slate-200 -ml-2 rounded-full z-0">
              <motion.div 
                initial={{ height: 0 }}
                animate={{ height: "40%" }}
                className="w-full bg-success-green rounded-full"
              />
            </div>

            {CHAPTERS.map((chapter, idx) => {
              const isLeft = idx % 2 === 0
              const isCurrent = chapter.state === "current"
              
              return (
                <div key={chapter.id} className={`w-full flex ${isLeft ? 'justify-start' : 'justify-end'} relative z-10`}>
                  <motion.div 
                    whileHover={chapter.state !== "locked" ? { scale: 1.05 } : {}}
                    onClick={() => chapter.state !== "locked" && router.push(`/worlds/${params.worldId}/chapters/${chapter.id}`)}
                    className={`
                      w-[250px] p-4 rounded-3xl border-4 cursor-pointer relative shadow-xl
                      ${chapter.state === "completed" ? "bg-white border-success-green" : ""}
                      ${chapter.state === "current" ? "bg-white border-primary-purple shadow-primary-purple/30" : ""}
                      ${chapter.state === "locked" ? "bg-slate-100 border-slate-300 grayscale opacity-70" : ""}
                    `}
                  >
                    {isCurrent && (
                      <motion.div 
                        animate={{ scale: [1, 1.1, 1] }} 
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="absolute -top-4 -right-4 w-10 h-10 bg-accent-yellow rounded-full flex items-center justify-center border-2 border-white shadow-lg text-white"
                      >
                        <Star size={20} fill="currentColor" />
                      </motion.div>
                    )}

                    <div className="flex justify-between items-start mb-2">
                      <div className="text-3xl">
                        {chapter.type === "boss" ? "🐉" : chapter.type === "treasure" ? "💎" : "📚"}
                      </div>
                      {chapter.state === "locked" && <Lock className="text-slate-400" />}
                    </div>

                    <h3 className="font-heading font-extrabold text-lg text-text-primary leading-tight mb-2">
                      {chapter.title}
                    </h3>

                    <div className="flex justify-between items-center text-xs font-bold text-text-secondary">
                      <span className="flex items-center gap-1 text-accent-yellow"><Trophy size={14} /> {chapter.xp} XP</span>
                      {chapter.state === "completed" ? (
                        <span className="text-success-green">Completed</span>
                      ) : (
                        <span className="bg-slate-100 px-2 py-1 rounded-md">Chapter {idx + 1}</span>
                      )}
                    </div>
                  </motion.div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Progress Sidebar (30%) */}
      <div className="w-full md:w-80 bg-white border-l-4 border-slate-100 p-6 flex flex-col gap-6">
        <div className="card-game p-6 text-center">
          <div className="w-20 h-20 bg-primary-purple/10 rounded-full mx-auto flex items-center justify-center text-4xl border-4 border-primary-purple mb-4">
            🦁
          </div>
          <h2 className="font-heading font-extrabold text-xl mb-1">Your Progress</h2>
          <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden mt-4">
            <div className="w-[40%] h-full bg-success-green rounded-full" />
          </div>
          <p className="text-sm font-bold text-text-secondary mt-2">40% Mastered</p>
        </div>

        <div className="card-game p-6 bg-accent-yellow/10 border-accent-yellow/30">
          <h3 className="font-heading font-bold text-lg mb-4 flex items-center gap-2">
            <Star className="text-accent-yellow" fill="currentColor" /> Daily Mission
          </h3>
          <p className="text-sm font-bold text-text-secondary mb-4">Complete 2 lessons in Math Kingdom today.</p>
          <button className="w-full btn-primary bg-accent-yellow hover:bg-[#D97706] shadow-[0_4px_0_0_#B45309] active:shadow-none py-2 text-sm">
            Claim 50 Coins
          </button>
        </div>
      </div>
      
    </div>
  )
}
