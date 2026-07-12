"use client"

import { 
  Users, BookOpen, BrainCircuit, Activity, Database, HardDrive,
  Trophy, Coins, Target, Plus, UploadCloud, Download, FileText,
  Wand2, Zap, LayoutList, PenTool, Lightbulb, Mic, HelpCircle,
  CheckCircle2, Clock, AlertCircle, Award
} from "lucide-react"
import { useRouter } from "next/navigation"

export default function AdminDashboard() {
  const router = useRouter()

  const metrics = [
    { label: "Today's AI Lessons", value: "24", icon: BrainCircuit, color: "text-primary-purple", bg: "bg-primary-purple/10" },
    { label: "Pending Review", value: "12", icon: Clock, color: "text-accent-yellow-dark", bg: "bg-accent-yellow/10" },
    { label: "Published Today", value: "8", icon: CheckCircle2, color: "text-success-green", bg: "bg-success-green/10" },
    { label: "Students Online", value: "1,204", icon: Users, color: "text-secondary-sky", bg: "bg-secondary-sky/10" },
    { label: "Quiz Attempts", value: "4.5k", icon: Target, color: "text-magic-pink", bg: "bg-magic-pink/10" },
    { label: "Average Accuracy", value: "78%", icon: Activity, color: "text-primary-purple", bg: "bg-primary-purple/10" },
    { label: "XP Earned Today", value: "125k", icon: Trophy, color: "text-accent-yellow-dark", bg: "bg-accent-yellow/10" },
    { label: "Coins Earned Today", value: "45k", icon: Coins, color: "text-accent-yellow-dark", bg: "bg-accent-yellow/10" },
    { label: "Firebase Usage", value: "42%", icon: Database, color: "text-slate-500", bg: "bg-slate-100" },
    { label: "Storage Usage", value: "1.2GB", icon: HardDrive, color: "text-slate-500", bg: "bg-slate-100" },
  ]

  const quickActions = [
    { title: "Create Subject", icon: Plus, path: "/admin/curriculum" },
    { title: "Generate Lesson", icon: BrainCircuit, path: "/admin/ai-generator?type=lesson" },
    { title: "Generate Quiz", icon: HelpCircle, path: "/admin/ai-generator?type=quiz" },
    { title: "Generate Worksheet", icon: FileText, path: "/admin/ai-generator?type=worksheet" },
    { title: "Upload Media", icon: UploadCloud, path: "/admin/media" },
    { title: "Import Curriculum", icon: Download, path: "/admin/curriculum" },
  ]

  const aiWorkspace = [
    { title: "Lesson", icon: BookOpen, desc: "Draft full lessons" },
    { title: "Quiz", icon: HelpCircle, desc: "MCQ & Interactive" },
    { title: "Story", icon: PenTool, desc: "Reading comprehension" },
    { title: "Worksheet", icon: FileText, desc: "Printable PDFs" },
    { title: "Revision Notes", icon: LayoutList, desc: "Summary guides" },
    { title: "Flashcards", icon: Zap, desc: "Spaced repetition" },
    { title: "Voice Script", icon: Mic, desc: "Audio generation" },
  ]

  const timelineActivity = [
    { type: "Published", text: "Fractions Module (Math)", user: "Admin", time: "10 mins ago", icon: CheckCircle2, color: "text-success-green" },
    { type: "Student Completed", text: "Rahul finished Solar System Quiz", user: "System", time: "25 mins ago", icon: Target, color: "text-primary-purple" },
    { type: "Review", text: "Reading Comp: The Lion", user: "Editor", time: "1 hour ago", icon: AlertCircle, color: "text-accent-yellow-dark" },
    { type: "Badge Earned", text: "Sneha earned 'Math Wizard' badge", user: "System", time: "2 hours ago", icon: Award, color: "text-magic-pink" },
    { type: "Draft", text: "Drag & Drop Animals", user: "AI Generator", time: "3 hours ago", icon: PenTool, color: "text-slate-400" },
  ]

  return (
    <div className="max-w-7xl mx-auto pb-12">
      <div className="mb-8">
        <h1 className="text-3xl font-heading font-extrabold text-slate-900 mb-2">
          Platform Overview
        </h1>
        <p className="text-slate-500 font-bold">Ridhvi AI Global Command Center</p>
      </div>

      {/* Analytics Widgets */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
        {metrics.map((stat, idx) => (
          <div key={idx} className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow">
            <div className={`w-12 h-12 ${stat.bg} ${stat.color} rounded-xl flex items-center justify-center shrink-0`}>
              <stat.icon size={24} />
            </div>
            <div>
              <p className="text-slate-500 font-bold text-xs uppercase tracking-wide leading-tight mb-1">{stat.label}</p>
              <p className="text-xl font-heading font-extrabold text-slate-900 leading-none">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions Row */}
      <div className="mb-8">
        <h2 className="text-lg font-heading font-bold text-slate-800 mb-4">Quick Actions</h2>
        <div className="flex flex-wrap gap-3">
          {quickActions.map((action, idx) => (
            <button 
              key={idx}
              onClick={() => router.push(action.path)}
              className="flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-200 rounded-xl font-bold text-slate-700 text-sm hover:bg-slate-50 hover:border-primary-purple hover:text-primary-purple transition-all shadow-sm"
            >
              <action.icon size={16} />
              {action.title}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: AI Content Studio */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-gradient-to-br from-primary-purple to-magic-pink p-[2px] rounded-3xl shadow-md">
            <div className="bg-white p-6 rounded-[22px] h-full">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-primary-purple/10 text-primary-purple rounded-xl flex items-center justify-center">
                  <Wand2 size={24} />
                </div>
                <div>
                  <h2 className="text-xl font-heading font-extrabold text-slate-900">AI Content Studio</h2>
                  <p className="text-sm font-bold text-slate-500">Generate high-quality educational content in seconds.</p>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {aiWorkspace.map((item, idx) => (
                  <button 
                    key={idx}
                    className="p-4 rounded-xl border-2 border-slate-100 bg-slate-50 hover:border-magic-pink hover:bg-magic-pink/5 text-left transition-all group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-white shadow-sm flex items-center justify-center text-primary-purple mb-3 group-hover:scale-110 transition-transform">
                      <item.icon size={16} />
                    </div>
                    <p className="font-bold text-slate-800 text-sm">{item.title}</p>
                    <p className="font-bold text-slate-400 text-xs mt-1">{item.desc}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Activity Timeline */}
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm h-full">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-heading font-extrabold text-slate-900">Activity Timeline</h2>
              <button className="text-sm font-bold text-primary-purple hover:underline">View All</button>
            </div>
            
            <div className="relative pl-3 space-y-6 before:absolute before:inset-y-0 before:left-[23px] before:w-[2px] before:bg-slate-100">
              {timelineActivity.map((activity, i) => (
                <div key={i} className="relative flex items-start gap-4">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border-4 border-white shadow-sm bg-white ${activity.color} z-10`}>
                    <activity.icon size={16} />
                  </div>
                  <div className="pt-1.5">
                    <p className="text-sm font-bold text-slate-800 leading-tight">{activity.text}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className={`text-[10px] font-bold uppercase tracking-wider ${activity.color}`}>{activity.type}</span>
                      <span className="text-[10px] font-bold text-slate-400">• {activity.time} by {activity.user}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
