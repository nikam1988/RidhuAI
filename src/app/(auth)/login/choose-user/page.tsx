"use client"

import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { AnimatedBackground } from "@/features/auth/components/AnimatedBackground"
import { ArrowLeft } from "lucide-react"

const USERS = [
  {
    id: "student",
    title: "Student",
    desc: "Play and Learn!",
    emoji: "👧",
    color: "bg-accent-yellow",
    shadow: "shadow-accent-yellow/30",
    path: "/auth/student-login"
  },
  {
    id: "parent",
    title: "Parent",
    desc: "Track Progress",
    emoji: "👨👩👧",
    color: "bg-secondary-sky",
    shadow: "shadow-secondary-sky/30",
    path: "/auth/parent-login"
  },
  {
    id: "teacher",
    title: "Teacher",
    desc: "Manage Content",
    emoji: "👩🏫",
    color: "bg-primary-purple",
    shadow: "shadow-primary-purple/30",
    path: "#",
    comingSoon: true
  }
]

export default function ChooseUserScreen() {
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

      <div className="text-center mb-8 relative z-10">
        <h1 className="text-3xl md:text-4xl font-heading font-extrabold text-text-primary mb-2">
          Who is playing?
        </h1>
        <p className="font-body font-bold text-text-secondary text-lg">
          Choose your profile to continue
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 max-w-md w-full relative z-10">
        {USERS.map((user, idx) => (
          <motion.button
            key={user.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            whileHover={!user.comingSoon ? { scale: 1.03, y: -2 } : {}}
            whileTap={!user.comingSoon ? { scale: 0.98 } : {}}
            onClick={() => !user.comingSoon && router.push(user.path)}
            className={`card-game p-4 flex items-center gap-6 text-left ${user.comingSoon ? 'opacity-60 cursor-not-allowed grayscale' : 'cursor-pointer'}`}
          >
            <div className={`w-20 h-20 rounded-3xl ${user.color} flex items-center justify-center text-4xl shadow-lg ${user.shadow}`}>
              {user.emoji}
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-heading font-bold text-text-primary">
                {user.title}
              </h2>
              <p className="font-body font-bold text-text-secondary">
                {user.desc}
              </p>
            </div>
            {user.comingSoon && (
              <div className="bg-slate-200 text-slate-500 text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap">
                Coming Soon
              </div>
            )}
          </motion.button>
        ))}
      </div>
    </AnimatedBackground>
  )
}
