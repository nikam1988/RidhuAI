"use client"

import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { AnimatedBackground } from "@/features/auth/components/AnimatedBackground"
import { ArrowLeft, BellRing, Mic, HardDriveDownload } from "lucide-react"
import { Button } from "@/components/ui/Button"

export default function PermissionsScreen() {
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

      {/* Progress */}
      <div className="absolute top-8 w-full max-w-xs mx-auto left-0 right-0 z-20">
        <div className="flex gap-2">
          <div className="flex-1 h-3 bg-success-green rounded-full shadow-inner"></div>
          <div className="flex-1 h-3 bg-success-green rounded-full shadow-inner"></div>
          <div className="flex-1 h-3 bg-success-green rounded-full shadow-inner"></div>
        </div>
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="card-game p-8 w-full max-w-md mx-auto relative z-10 mt-16"
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-heading font-extrabold text-primary-purple mb-2">
            Magic Permissions
          </h1>
          <p className="font-body font-bold text-text-secondary">
            Let&apos;s make sure everything works perfectly!
          </p>
        </div>

        <div className="space-y-4 mb-8">
          <div className="bg-slate-50 border-4 border-slate-100 rounded-[24px] p-4 flex items-center gap-4">
            <div className="w-12 h-12 bg-accent-yellow/20 rounded-full flex items-center justify-center text-accent-yellow shrink-0">
              <BellRing size={24} />
            </div>
            <div>
              <h3 className="font-heading font-bold text-text-primary">Notifications</h3>
              <p className="text-sm font-body font-bold text-text-secondary">For daily streaks and reminders.</p>
            </div>
          </div>

          <div className="bg-slate-50 border-4 border-slate-100 rounded-[24px] p-4 flex items-center gap-4">
            <div className="w-12 h-12 bg-magic-pink/20 rounded-full flex items-center justify-center text-magic-pink shrink-0">
              <Mic size={24} />
            </div>
            <div>
              <h3 className="font-heading font-bold text-text-primary">Microphone</h3>
              <p className="text-sm font-body font-bold text-text-secondary">For voice speaking practice.</p>
            </div>
          </div>

          <div className="bg-slate-50 border-4 border-slate-100 rounded-[24px] p-4 flex items-center gap-4">
            <div className="w-12 h-12 bg-success-green/20 rounded-full flex items-center justify-center text-success-green shrink-0">
              <HardDriveDownload size={24} />
            </div>
            <div>
              <h3 className="font-heading font-bold text-text-primary">Offline Storage</h3>
              <p className="text-sm font-body font-bold text-text-secondary">To learn without internet!</p>
            </div>
          </div>
        </div>

        <Button 
          size="lg" 
          variant="secondary"
          className="w-full text-xl"
          onClick={() => router.push('/onboarding/success')}
        >
          Allow All & Finish
        </Button>
      </motion.div>
    </AnimatedBackground>
  )
}
