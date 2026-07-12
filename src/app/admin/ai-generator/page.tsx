"use client"

import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Wand2, BookOpen, HelpCircle, Image as ImageIcon, MessageSquare, FileText } from "lucide-react"

const GENERATORS = [
  { id: "lesson", title: "Lesson Generator", desc: "Create complete structured lessons", icon: BookOpen, color: "text-blue-500", bg: "bg-blue-50", route: "/admin/ai-generator/lesson" },
  { id: "quiz", title: "Quiz Generator", desc: "Generate MCQ, True/False & more", icon: HelpCircle, color: "text-green-500", bg: "bg-green-50", route: "#" },
  { id: "worksheet", title: "Worksheet Generator", desc: "Create printable PDF practice sheets", icon: FileText, color: "text-purple-500", bg: "bg-purple-50", route: "#" },
  { id: "story", title: "Story Generator", desc: "Turn topics into mascot adventures", icon: MessageSquare, color: "text-orange-500", bg: "bg-orange-50", route: "#" },
  { id: "image", title: "Image Prompt Generator", desc: "Write prompts for Midjourney/DALL-E", icon: ImageIcon, color: "text-pink-500", bg: "bg-pink-50", route: "#" },
]

export default function AIGeneratorDashboard() {
  const router = useRouter()

  return (
    <div className="max-w-6xl mx-auto">
      <div className="bg-gradient-to-r from-slate-900 to-primary-purple p-10 rounded-[32px] mb-8 relative overflow-hidden text-white shadow-xl">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="absolute -top-32 -right-32 w-96 h-96 bg-white/10 rounded-full blur-3xl"
        />
        <div className="relative z-10">
          <h1 className="text-4xl font-heading font-extrabold flex items-center gap-3 mb-2">
            <Wand2 size={36} className="text-magic-pink" /> AI Content Studio
          </h1>
          <p className="font-body font-bold text-lg text-white/80 max-w-xl">
            Let our AI co-pilot do the heavy lifting. Generate production-ready educational content in seconds.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {GENERATORS.map((gen, idx) => (
          <motion.div
            key={gen.id}
            whileHover={{ y: -5, scale: 1.02 }}
            onClick={() => gen.route !== "#" && router.push(gen.route)}
            className={`bg-white p-6 rounded-2xl border-2 border-slate-100 shadow-sm cursor-pointer hover:border-primary-purple/30 hover:shadow-md transition-all group`}
          >
            <div className={`w-14 h-14 ${gen.bg} ${gen.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
              <gen.icon size={28} />
            </div>
            <h3 className="font-heading font-extrabold text-xl text-slate-800 mb-1">
              {gen.title}
            </h3>
            <p className="text-sm font-bold text-slate-500">
              {gen.desc}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Recent Generations List */}
      <div className="mt-12">
        <h2 className="text-xl font-heading font-extrabold text-slate-800 mb-4">Recent Drafts Awaiting Review</h2>
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="p-4 text-sm font-bold text-slate-500">Content Title</th>
                <th className="p-4 text-sm font-bold text-slate-500">Type</th>
                <th className="p-4 text-sm font-bold text-slate-500">Generated At</th>
                <th className="p-4 text-sm font-bold text-slate-500 text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-slate-100 hover:bg-slate-50">
                <td className="p-4 font-bold text-slate-800">Introduction to Nouns</td>
                <td className="p-4"><span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-bold">Lesson</span></td>
                <td className="p-4 text-sm text-slate-500">10 mins ago</td>
                <td className="p-4 text-right">
                  <button className="text-primary-purple font-bold text-sm hover:underline">Review & Publish</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
