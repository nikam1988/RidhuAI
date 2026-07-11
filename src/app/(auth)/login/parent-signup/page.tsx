"use client"

import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { AnimatedBackground } from "@/features/auth/components/AnimatedBackground"
import { ArrowLeft, Mail, Lock, User, Phone } from "lucide-react"
import { Button } from "@/components/ui/Button"

export default function ParentSignupScreen() {
  const router = useRouter()

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault()
    // Flow logic: After parent signup, create child profile
    router.push('/onboarding/create-profile')
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

      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="card-game p-8 w-full max-w-md mx-auto relative z-10 my-10"
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-heading font-extrabold text-primary-purple mb-2">
            Create Account
          </h1>
          <p className="font-body font-bold text-text-secondary">
            Join the KidSpark adventure!
          </p>
        </div>

        <form onSubmit={handleSignup} className="space-y-4">
          <div className="relative">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={24} />
            <input 
              type="text" 
              placeholder="Full Name" 
              className="w-full h-14 pl-14 pr-4 rounded-[20px] bg-slate-50 border-4 border-border-soft focus:border-secondary-sky focus:bg-white outline-none font-body font-bold text-text-primary transition-all"
              required
            />
          </div>

          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={24} />
            <input 
              type="email" 
              placeholder="Email Address" 
              className="w-full h-14 pl-14 pr-4 rounded-[20px] bg-slate-50 border-4 border-border-soft focus:border-secondary-sky focus:bg-white outline-none font-body font-bold text-text-primary transition-all"
              required
            />
          </div>

          <div className="relative">
            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={24} />
            <input 
              type="tel" 
              placeholder="Phone Number (Optional)" 
              className="w-full h-14 pl-14 pr-4 rounded-[20px] bg-slate-50 border-4 border-border-soft focus:border-secondary-sky focus:bg-white outline-none font-body font-bold text-text-primary transition-all"
            />
          </div>
          
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={24} />
            <input 
              type="password" 
              placeholder="Password" 
              className="w-full h-14 pl-14 pr-4 rounded-[20px] bg-slate-50 border-4 border-border-soft focus:border-secondary-sky focus:bg-white outline-none font-body font-bold text-text-primary transition-all"
              required
            />
          </div>

          <div className="flex items-start gap-3 mt-4 mb-6">
            <input type="checkbox" id="privacy" className="w-6 h-6 mt-1 accent-primary-purple" required />
            <label htmlFor="privacy" className="text-sm font-body font-bold text-text-secondary">
              I accept the Privacy Policy and agree to create a safe learning environment.
            </label>
          </div>

          <Button type="submit" size="lg" className="w-full text-xl mt-6">
            Create Account
          </Button>
        </form>
      </motion.div>
    </AnimatedBackground>
  )
}
