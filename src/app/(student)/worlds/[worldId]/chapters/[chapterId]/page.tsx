"use client"

import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { ArrowLeft, Play, Clock, BookOpen, Star } from "lucide-react"

const TOPICS = [
  { id: "t1", title: "Adding 1-Digit Numbers", obj: "Count and add up to 9", time: "10 Mins", practiceCount: 2, quizCount: 1, reward: 50, state: "completed" },
  { id: "t2", title: "Adding 2-Digit Numbers", obj: "Add tens and ones without carry", time: "15 Mins", practiceCount: 3, quizCount: 1, reward: 100, state: "current" },
  { id: "t3", title: "Carry Over Magic", obj: "Add 2-digit numbers with carry over", time: "20 Mins", practiceCount: 3, quizCount: 2, reward: 200, state: "locked" },
  { id: "t4", title: "Word Problems", obj: "Solve real-life addition stories", time: "15 Mins", practiceCount: 2, quizCount: 1, reward: 150, state: "locked" }
]

export default function TopicSelectionScreen({ params }: { params: { worldId: string, chapterId: string } }) {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-bg-light p-4 md:p-8">
      
      <div className="flex items-center gap-4 mb-8">
        <button onClick={() => router.back()} className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-text-secondary shadow-sm hover:scale-105 transition-all border-2 border-slate-100">
          <ArrowLeft size={24} />
        </button>
        <div>
          <h1 className="text-3xl md:text-4xl font-heading font-extrabold text-text-primary">
            Addition Bridge
          </h1>
          <p className="font-body font-bold text-text-secondary">
            Chapter 2 • 4 Topics
          </p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        
        {/* Main Topic List */}
        <div className="flex-1 space-y-4">
          {TOPICS.map((topic) => (
            <motion.div
              key={topic.id}
              whileHover={topic.state !== "locked" ? { y: -4 } : {}}
              className={`
                card-game p-6 flex flex-col md:flex-row gap-6 items-center
                ${topic.state === "completed" ? "border-success-green/50 bg-success-green/5" : ""}
                ${topic.state === "current" ? "border-primary-purple bg-primary-purple/5 shadow-primary-purple/20" : ""}
                ${topic.state === "locked" ? "bg-slate-100 border-slate-300 grayscale opacity-70" : ""}
              `}
            >
              <div className="w-20 h-20 rounded-[20px] bg-white flex items-center justify-center text-3xl border-4 border-slate-100 shadow-inner shrink-0">
                {topic.state === "completed" ? "✅" : topic.state === "locked" ? "🔒" : "✏️"}
              </div>

              <div className="flex-1 w-full text-center md:text-left">
                <h3 className="font-heading font-extrabold text-xl text-text-primary mb-1">
                  {topic.title}
                </h3>
                <p className="text-text-secondary font-bold text-sm mb-3">
                  {topic.obj}
                </p>

                <div className="flex flex-wrap justify-center md:justify-start gap-3">
                  <span className="flex items-center gap-1 text-xs font-bold text-slate-500 bg-white px-2 py-1 rounded-md shadow-sm">
                    <Clock size={12} /> {topic.time}
                  </span>
                  <span className="flex items-center gap-1 text-xs font-bold text-secondary-sky bg-white px-2 py-1 rounded-md shadow-sm">
                    <BookOpen size={12} /> {topic.practiceCount} Practice
                  </span>
                  <span className="flex items-center gap-1 text-xs font-bold text-accent-yellow bg-white px-2 py-1 rounded-md shadow-sm">
                    <Star size={12} /> {topic.reward} XP
                  </span>
                </div>
              </div>

              <button 
                disabled={topic.state === "locked"}
                onClick={() => router.push(`/lesson-preview/${topic.id}`)}
                className={`
                  btn-primary px-8 py-3 w-full md:w-auto h-auto
                  ${topic.state === "completed" ? "bg-white text-success-green border-2 border-success-green shadow-none hover:bg-success-green hover:text-white" : ""}
                `}
              >
                {topic.state === "completed" ? "Review" : "Start"}
              </button>
            </motion.div>
          ))}
        </div>

        {/* Recommended Learning Sidebar */}
        <div className="w-full md:w-80">
          <div className="card-game p-6 bg-gradient-to-br from-secondary-sky to-blue-500 border-secondary-sky/50 text-white">
            <h3 className="font-heading font-extrabold text-xl mb-2 flex items-center gap-2">
              🤖 AI Suggestion
            </h3>
            <p className="text-sm font-bold text-white/90 mb-4 leading-relaxed">
              Before learning Carry Over, let's quickly revise the ones place addition to make you super fast!
            </p>
            <button className="w-full bg-white text-secondary-sky font-heading font-bold text-lg py-3 rounded-full hover:scale-105 active:scale-95 transition-all shadow-lg">
              Start 3-Min Quiz
            </button>
          </div>
        </div>

      </div>
    </div>
  )
}
