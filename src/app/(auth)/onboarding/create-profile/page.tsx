"use client"

import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { AnimatedBackground } from "@/features/auth/components/AnimatedBackground"
import { ArrowLeft, User, Calendar, BookOpen } from "lucide-react"
import { Button } from "@/components/ui/Button"

export default function CreateChildProfileScreen() {
  const router = useRouter()

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault()
    router.push('/onboarding/avatars')
  }

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

      {/* Progress */}
      <div className="absolute top-8 w-full max-w-xs mx-auto left-0 right-0 z-20">
        <div className="flex gap-2">
          <div className="flex-1 h-3 bg-success-green rounded-full shadow-inner"></div>
          <div className="flex-1 h-3 bg-slate-200 rounded-full shadow-inner"></div>
          <div className="flex-1 h-3 bg-slate-200 rounded-full shadow-inner"></div>
        </div>
      </div>

      <motion.div 
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        className="card-game p-8 w-full max-w-md mx-auto relative z-10 mt-12"
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-heading font-extrabold text-primary-purple mb-2">
            Add a Student
          </h1>
          <p className="font-body font-bold text-text-secondary">
            Let's personalize the magic! ✨
          </p>
        </div>

        <form onSubmit={handleNext} className="space-y-6">
          <div className="space-y-4">
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={24} />
              <input 
                type="text" 
                placeholder="Child's First Name" 
                className="w-full h-16 pl-14 pr-4 rounded-[24px] bg-slate-50 border-4 border-border-soft focus:border-secondary-sky focus:bg-white outline-none font-body font-bold text-lg text-text-primary transition-all"
                required
              />
            </div>

            <div className="relative">
              <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={24} />
              <input 
                type="number" 
                placeholder="Age (e.g., 7)" 
                min="5"
                max="12"
                className="w-full h-16 pl-14 pr-4 rounded-[24px] bg-slate-50 border-4 border-border-soft focus:border-secondary-sky focus:bg-white outline-none font-body font-bold text-lg text-text-primary transition-all"
                required
              />
            </div>

            <div className="relative">
              <BookOpen className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={24} />
              <select className="w-full h-16 pl-14 pr-4 rounded-[24px] bg-slate-50 border-4 border-border-soft focus:border-secondary-sky focus:bg-white outline-none font-body font-bold text-lg text-text-primary transition-all appearance-none cursor-pointer">
                <option value="" disabled selected>Select Class</option>
                <option value="1">Class 1</option>
                <option value="2">Class 2 (CBSE)</option>
                <option value="3">Class 3</option>
              </select>
            </div>
          </div>

          <Button type="submit" size="lg" className="w-full text-xl mt-4">
            Continue
          </Button>
        </form>
      </motion.div>
    </AnimatedBackground>
  )
}
