"use client"

import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { AnimatedBackground } from "@/features/auth/components/AnimatedBackground"
import { ArrowLeft, Mail, Lock } from "lucide-react"
import { Button } from "@/components/ui/Button"
import Image from "next/image"

export default function ParentLoginScreen() {
  const router = useRouter()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    router.push('/dashboard')
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
        className="card-game p-8 w-full max-w-md mx-auto relative z-10"
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-heading font-extrabold text-primary-purple mb-2">
            Parent Login
          </h1>
          <p className="font-body font-bold text-text-secondary">
            Welcome back! Let&apos;s check progress.
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-4">
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={24} />
              <input 
                type="email" 
                placeholder="Email Address" 
                className="w-full h-16 pl-14 pr-4 rounded-[24px] bg-slate-50 border-4 border-border-soft focus:border-secondary-sky focus:bg-white outline-none font-body font-bold text-lg text-text-primary transition-all"
                required
              />
            </div>
            
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={24} />
              <input 
                type="password" 
                placeholder="Password" 
                className="w-full h-16 pl-14 pr-4 rounded-[24px] bg-slate-50 border-4 border-border-soft focus:border-secondary-sky focus:bg-white outline-none font-body font-bold text-lg text-text-primary transition-all"
                required
              />
            </div>
          </div>

          <div className="flex justify-end">
            <button type="button" className="text-secondary-sky font-bold hover:underline">
              Forgot Password?
            </button>
          </div>

          <Button type="submit" size="lg" className="w-full text-xl">
            Login
          </Button>
          
          <div className="relative flex items-center py-2">
            <div className="flex-grow border-t-2 border-border-soft"></div>
            <span className="flex-shrink-0 mx-4 text-text-secondary font-bold">OR</span>
            <div className="flex-grow border-t-2 border-border-soft"></div>
          </div>

          <Button 
            type="button"
            variant="outline"
            size="lg"
            className="w-full text-lg flex gap-3"
          >
            <Image src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" width={24} height={24} className="w-6 h-6" />
            Continue with Google
          </Button>

          <div className="text-center mt-6">
            <span className="text-text-secondary font-bold">New to Ridhvi AI? </span>
            <button type="button" onClick={() => router.push('/auth/parent-signup')} className="text-primary-purple font-extrabold hover:underline">
              Create Account
            </button>
          </div>
        </form>
      </motion.div>
    </AnimatedBackground>
  )
}
