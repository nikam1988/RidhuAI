"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Wand2, ArrowLeft, Settings, Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"

export default function AILessonGenerator() {
  const router = useRouter()
  const [isGenerating, setIsGenerating] = useState(false)

  const handleGenerate = () => {
    setIsGenerating(true)
    // Simulate generation time
    setTimeout(() => {
      setIsGenerating(false)
      alert("Lesson JSON Generated! Forwarding to Lesson Builder Draft.")
      router.push("/admin/lesson-builder/draft-new")
    }, 3000)
  }

  return (
    <div className="max-w-4xl mx-auto pb-12">
      <button onClick={() => router.back()} className="flex items-center gap-2 text-slate-500 font-bold hover:text-slate-800 mb-6">
        <ArrowLeft size={18} /> Back to Studio
      </button>

      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-heading font-extrabold text-slate-900 mb-2 flex items-center gap-2">
            AI Lesson Generator <span className="bg-magic-pink text-white text-xs px-2 py-1 rounded-md uppercase tracking-wider">Beta</span>
          </h1>
          <p className="text-slate-500 font-bold">Configure parameters to generate a full interactive lesson.</p>
        </div>
      </div>

      <div className="bg-white rounded-[32px] p-8 border border-slate-200 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          
          {/* Taxonomy Config */}
          <div className="space-y-4">
            <h3 className="font-heading font-extrabold text-lg flex items-center gap-2 border-b border-slate-100 pb-2">
              <Settings size={18} className="text-slate-400" /> Taxonomy
            </h3>
            
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">Class & Board</label>
              <select className="w-full bg-slate-50 border border-slate-200 p-3 rounded-xl font-bold text-slate-600 outline-none focus:border-primary-purple">
                <option>Class 2 (CBSE)</option>
                <option>Class 1 (CBSE)</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">Subject</label>
              <select className="w-full bg-slate-50 border border-slate-200 p-3 rounded-xl font-bold text-slate-600 outline-none focus:border-primary-purple">
                <option>Mathematics</option>
                <option>English</option>
                <option>EVS</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">Topic Name</label>
              <input 
                type="text" 
                placeholder="e.g. Carry Over Addition" 
                className="w-full bg-white border border-slate-200 p-3 rounded-xl font-bold text-slate-800 outline-none focus:border-primary-purple"
              />
            </div>
          </div>

          {/* AI Parameters */}
          <div className="space-y-4">
            <h3 className="font-heading font-extrabold text-lg flex items-center gap-2 border-b border-slate-100 pb-2">
              <Wand2 size={18} className="text-magic-pink" /> AI Parameters
            </h3>
            
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">Difficulty</label>
              <div className="flex gap-2">
                {['Easy', 'Medium', 'Hard'].map(diff => (
                  <button key={diff} className={`flex-1 py-2 rounded-lg font-bold border ${diff === 'Medium' ? 'bg-primary-purple/10 border-primary-purple text-primary-purple' : 'bg-slate-50 border-slate-200 text-slate-500'}`}>
                    {diff}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">Lesson Length</label>
              <input type="range" min="5" max="30" defaultValue="15" className="w-full accent-primary-purple" />
              <div className="flex justify-between text-xs font-bold text-slate-400 mt-1">
                <span>5 Mins</span>
                <span>15 Mins</span>
                <span>30 Mins</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">Mascot Focus</label>
              <select className="w-full bg-slate-50 border border-slate-200 p-3 rounded-xl font-bold text-slate-600 outline-none focus:border-primary-purple">
                <option>Spark Panda 🐼</option>
                <option>Leo Lion 🦁</option>
                <option>Byte Bot 🤖</option>
              </select>
            </div>
          </div>
        </div>

        {/* Generate Button */}
        <div className="flex justify-end border-t border-slate-100 pt-6">
          <button 
            onClick={handleGenerate}
            disabled={isGenerating}
            className={`bg-primary-purple text-white px-8 py-4 rounded-xl font-heading font-extrabold text-lg flex items-center gap-3 transition-all ${isGenerating ? 'opacity-80 cursor-wait' : 'hover:scale-105 active:scale-95 shadow-[0_4px_0_0_#4C1D95]'}`}
          >
            {isGenerating ? (
              <>
                <Loader2 className="animate-spin" /> Generating Magic...
              </>
            ) : (
              <>
                <Wand2 /> Generate Lesson
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
