"use client"

import { motion } from "framer-motion"
import { Lock, PlayCircle } from "lucide-react"

const WORLDS = [
  {
    id: 1,
    title: "Math Kingdom",
    color: "bg-primary-purple",
    shadow: "shadow-primary-purple/40",
    progress: 40,
    emoji: "🦁",
    unlocked: true,
  },
  {
    id: 2,
    title: "English Forest",
    color: "bg-success-green",
    shadow: "shadow-success-green/40",
    progress: 10,
    emoji: "🧚‍♀️",
    unlocked: true,
  },
  {
    id: 3,
    title: "EVS Jungle",
    color: "bg-accent-yellow",
    shadow: "shadow-accent-yellow/40",
    progress: 0,
    emoji: "🐢",
    unlocked: true,
  },
  {
    id: 4,
    title: "Space GK",
    color: "bg-night-purple",
    shadow: "shadow-night-purple/40",
    progress: 0,
    emoji: "🚀",
    unlocked: false,
  }
]

export function LearningWorlds({ className = "" }: { className?: string }) {
  return (
    <div className={className}>
      <div className="flex justify-between items-end mb-4">
        <h2 className="text-2xl font-heading font-extrabold text-text-primary">
          Explore Worlds
        </h2>
        <button className="text-secondary-sky font-bold hover:underline">
          See All
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {WORLDS.map((world, idx) => (
          <motion.div
            key={world.id}
            whileHover={world.unlocked ? { y: -8, scale: 1.02 } : {}}
            transition={{ type: "spring", stiffness: 300 }}
            className={`relative rounded-[32px] p-4 h-48 flex flex-col items-center justify-center border-4 border-white ${world.unlocked ? world.color : 'bg-slate-200 grayscale'} ${world.unlocked ? `shadow-lg ${world.shadow}` : 'shadow-inner'} cursor-pointer overflow-hidden group`}
          >
            {world.unlocked && (
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            )}

            <div className="text-6xl mb-2 relative z-10 drop-shadow-md">
              {world.emoji}
            </div>

            <h3 className="text-white font-heading font-bold text-center relative z-10 drop-shadow-md leading-tight">
              {world.title}
            </h3>

            {/* Locked Overlay / Progress */}
            {world.unlocked ? (
              <div className="absolute bottom-3 left-4 right-4 h-2 bg-black/20 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-white rounded-full" 
                  style={{ width: `${world.progress}%` }} 
                />
              </div>
            ) : (
              <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-[2px] flex items-center justify-center">
                <div className="bg-white p-3 rounded-full shadow-lg">
                  <Lock className="text-slate-500" />
                </div>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  )
}
