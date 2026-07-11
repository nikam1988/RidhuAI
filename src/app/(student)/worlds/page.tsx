"use client"

import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { Lock, ArrowLeft } from "lucide-react"

const WORLDS = [
  { id: "math", title: "Math Kingdom", theme: "from-primary-purple to-night-purple", emoji: "🏰", icon: "🦁", progress: 40, totalChapters: 12, xp: 500, coins: 100, unlocked: true },
  { id: "english", title: "English Forest", theme: "from-success-green to-emerald-800", emoji: "🌳", icon: "🧚‍♀️", progress: 10, totalChapters: 15, xp: 450, coins: 90, unlocked: true },
  { id: "evs", title: "EVS Jungle", theme: "from-accent-yellow to-warning-orange", emoji: "🐢", icon: "🦋", progress: 0, totalChapters: 10, xp: 300, coins: 50, unlocked: true },
  { id: "space", title: "Space GK", theme: "from-slate-800 to-black", emoji: "🚀", icon: "🪐", progress: 0, totalChapters: 8, xp: 600, coins: 150, unlocked: false },
  { id: "computer", title: "Computer City", theme: "from-secondary-sky to-blue-900", emoji: "💻", icon: "🤖", progress: 0, totalChapters: 5, xp: 200, coins: 40, unlocked: false },
  { id: "art", title: "Art Island", theme: "from-magic-pink to-rose-700", emoji: "🎨", icon: "🖌️", progress: 0, totalChapters: 6, xp: 250, coins: 50, unlocked: false },
  { id: "music", title: "Music Valley", theme: "from-primary-purple to-magic-pink", emoji: "🎹", icon: "🎵", progress: 0, totalChapters: 7, xp: 250, coins: 50, unlocked: false },
  { id: "fitness", title: "Fitness Arena", theme: "from-warning-orange to-red-600", emoji: "🏃", icon: "⚽", progress: 0, totalChapters: 4, xp: 150, coins: 30, unlocked: false },
]

export default function AllWorldsScreen() {
  const router = useRouter()

  return (
    <div className="p-4 md:p-8 min-h-screen">
      <div className="flex items-center gap-4 mb-8">
        <button onClick={() => router.back()} className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-text-secondary shadow-sm hover:scale-105 transition-all">
          <ArrowLeft size={24} />
        </button>
        <div>
          <h1 className="text-3xl md:text-5xl font-heading font-extrabold text-text-primary">
            Choose Your World
          </h1>
          <p className="font-body font-bold text-text-secondary text-lg">
            Where do you want to adventure today?
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {WORLDS.map((world, idx) => (
          <motion.div
            key={world.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            whileHover={world.unlocked ? { y: -10, scale: 1.02 } : {}}
            onClick={() => world.unlocked && router.push(`/worlds/${world.id}`)}
            className={`relative rounded-[32px] h-64 border-4 border-white shadow-xl overflow-hidden cursor-pointer group ${world.unlocked ? `bg-gradient-to-br ${world.theme}` : 'bg-slate-200 grayscale'}`}
          >
            {world.unlocked && (
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                className="absolute -top-20 -right-20 w-48 h-48 bg-white/20 rounded-full blur-2xl"
              />
            )}

            <div className="absolute inset-0 p-6 flex flex-col justify-between z-10">
              <div className="flex justify-between items-start">
                <div className="flex gap-2">
                  <span className="text-5xl drop-shadow-md">{world.emoji}</span>
                  <motion.span 
                    animate={world.unlocked ? { y: [0, -10, 0] } : {}} 
                    transition={{ duration: 2, repeat: Infinity }} 
                    className="text-3xl drop-shadow-md"
                  >
                    {world.icon}
                  </motion.span>
                </div>
                {!world.unlocked && (
                  <div className="bg-slate-900/50 p-3 rounded-full backdrop-blur-sm">
                    <Lock className="text-white" size={24} />
                  </div>
                )}
              </div>

              <div>
                <h3 className="text-white font-heading font-extrabold text-2xl drop-shadow-md mb-2">
                  {world.title}
                </h3>
                
                {world.unlocked ? (
                  <div className="space-y-2">
                    <div className="flex justify-between text-white/90 text-sm font-bold">
                      <span>{world.progress}% Mastered</span>
                      <span>{world.totalChapters} Chapters</span>
                    </div>
                    <div className="h-2 bg-black/20 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${world.progress}%` }}
                        className="h-full bg-white rounded-full"
                      />
                    </div>
                    <div className="flex gap-2 mt-2">
                      <span className="px-2 py-1 bg-white/20 rounded-lg text-xs font-bold text-white backdrop-blur-sm border border-white/30">
                        ⭐ {world.xp} XP
                      </span>
                      <span className="px-2 py-1 bg-accent-yellow/20 rounded-lg text-xs font-bold text-accent-yellow backdrop-blur-sm border border-accent-yellow/30">
                        🪙 {world.coins}
                      </span>
                    </div>
                  </div>
                ) : (
                  <p className="text-slate-600 font-bold text-sm bg-white/80 p-2 rounded-xl backdrop-blur-sm inline-block">
                    Locked. Keep playing to unlock!
                  </p>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
