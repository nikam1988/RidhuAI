"use client"

import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { useTutorStore } from "../../../features/tutor/store/useTutorStore"
import { MessageCircle, BrainCircuit, Target, Sparkles, BookOpen } from "lucide-react"

export default function AITutorDashboard() {
  const router = useRouter()
  const { studentName, weakTopics, preferredMascot } = useTutorStore()

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 min-h-screen">
      
      {/* Hero Greeting */}
      <div className="bg-gradient-to-r from-primary-purple to-magic-pink rounded-[32px] p-8 md:p-12 text-white shadow-xl relative overflow-hidden mb-8">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
          className="absolute -top-32 -right-32 w-96 h-96 bg-white/10 rounded-full blur-3xl"
        />
        
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
          <motion.div 
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="w-32 h-32 bg-white/20 rounded-full flex items-center justify-center text-7xl shrink-0 backdrop-blur-md border-4 border-white/30"
          >
            {preferredMascot.includes('Panda') ? '🐼' : '🦁'}
          </motion.div>
          
          <div className="text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-heading font-extrabold mb-2">
              Hi {studentName}! 👋
            </h1>
            <p className="font-body font-bold text-lg md:text-xl text-white/90 mb-6 max-w-lg">
              I noticed you did a great job yesterday. Ready for today's magical mission?
            </p>
            <button 
              onClick={() => router.push('/tutor/chat')}
              className="bg-white text-primary-purple px-8 py-4 rounded-full font-heading font-extrabold text-xl flex items-center justify-center gap-3 hover:scale-105 active:scale-95 transition-all shadow-lg w-full md:w-auto"
            >
              <MessageCircle fill="currentColor" /> Chat with Me
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Daily Study Plan */}
        <div className="bg-white rounded-3xl p-8 border-2 border-slate-100 shadow-sm">
          <h2 className="font-heading font-extrabold text-2xl text-slate-800 mb-6 flex items-center gap-2">
            <Target className="text-accent-yellow" /> Today's Mission
          </h2>
          <div className="space-y-4">
            <div className="flex items-start gap-4 p-4 rounded-2xl bg-success-green/10 border border-success-green/20">
              <div className="bg-white p-2 rounded-full shadow-sm text-success-green"><Sparkles size={20} /></div>
              <div>
                <h3 className="font-bold text-slate-800">1. Master Addition</h3>
                <p className="text-sm font-bold text-slate-500">Play the Carry Over mini-game.</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100 opacity-70">
              <div className="bg-white p-2 rounded-full shadow-sm text-slate-400"><BookOpen size={20} /></div>
              <div>
                <h3 className="font-bold text-slate-800">2. Read a Story</h3>
                <p className="text-sm font-bold text-slate-500">Read "The Magic Bamboo".</p>
              </div>
            </div>
          </div>
        </div>

        {/* AI Recommendations */}
        <div className="bg-gradient-to-br from-secondary-sky to-blue-600 rounded-3xl p-8 text-white shadow-sm">
          <h2 className="font-heading font-extrabold text-2xl mb-6 flex items-center gap-2">
            <BrainCircuit /> AI Suggestion
          </h2>
          <p className="font-body font-bold text-lg mb-6 leading-relaxed">
            I see you found <span className="bg-white/20 px-2 rounded-md font-extrabold">{weakTopics[0]}</span> a little tricky yesterday. Don't worry! I have a fun puzzle that will make it super easy.
          </p>
          <button className="w-full bg-white text-blue-600 font-heading font-extrabold py-3 rounded-xl hover:bg-slate-50 transition-colors">
            Start Puzzle
          </button>
        </div>

      </div>
    </div>
  )
}
