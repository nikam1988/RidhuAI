"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { AnimatedBackground } from "@/features/auth/components/AnimatedBackground"
import { ArrowLeft, Delete } from "lucide-react"

const PIN_SYMBOLS = ["🍎", "🚗", "🐶", "🌟", "🎈", "🚀"]

export default function StudentLoginScreen() {
  const router = useRouter()
  const [pin, setPin] = useState<string[]>([])

  const handlePinClick = (symbol: string) => {
    if (pin.length < 4) {
      setPin([...pin, symbol])
      // In a real app, we check if pin.length === 3 and then verify
      if (pin.length === 3) {
        setTimeout(() => router.push('/onboarding/journey'), 500)
      }
    }
  }

  const handleBackspace = () => {
    setPin(pin.slice(0, -1))
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

      <div className="flex flex-col items-center justify-center z-10 relative">
        <motion.div 
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="text-8xl mb-4"
        >
          🐼
        </motion.div>
        
        <h1 className="text-3xl md:text-4xl font-heading font-extrabold text-text-primary mb-2 text-center">
          Hello again!
        </h1>
        <p className="font-body font-bold text-text-secondary text-lg text-center mb-8">
          Enter your secret picture code
        </p>

        {/* PIN Display */}
        <div className="flex gap-4 mb-10">
          {[0, 1, 2, 3].map((index) => (
            <div 
              key={index} 
              className={`w-16 h-16 md:w-20 md:h-20 rounded-2xl flex items-center justify-center text-4xl shadow-inner border-4 transition-all ${pin[index] ? 'bg-white border-primary-purple scale-110' : 'bg-slate-100 border-slate-200'}`}
            >
              {pin[index] || ""}
            </div>
          ))}
        </div>

        {/* Visual PIN Pad */}
        <div className="grid grid-cols-3 gap-4 md:gap-6">
          {PIN_SYMBOLS.map((symbol) => (
            <motion.button
              key={symbol}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => handlePinClick(symbol)}
              className="w-20 h-20 md:w-24 md:h-24 bg-white rounded-[32px] text-4xl shadow-[0_6px_0_0_#E2E8F0] active:shadow-none active:translate-y-[6px] transition-all flex items-center justify-center"
            >
              {symbol}
            </motion.button>
          ))}
          <div className="col-span-3 flex justify-center mt-4">
            <button 
              onClick={handleBackspace}
              disabled={pin.length === 0}
              className="px-6 py-4 rounded-2xl text-slate-500 font-bold flex items-center gap-2 hover:bg-slate-100 disabled:opacity-50"
            >
              <Delete size={24} /> Clear
            </button>
          </div>
        </div>
      </div>
    </AnimatedBackground>
  )
}
