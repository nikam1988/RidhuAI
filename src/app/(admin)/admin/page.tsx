"use client"

import { Users, BookOpen, Award, FileText } from "lucide-react"

export default function AdminDashboard() {
  const stats = [
    { label: "Active Students", value: "2,405", icon: Users, color: "text-primary-purple", bg: "bg-primary-purple/10" },
    { label: "Published Lessons", value: "154", icon: BookOpen, color: "text-success-green", bg: "bg-success-green/10" },
    { label: "Quizzes Taken", value: "12,890", icon: FileText, color: "text-secondary-sky", bg: "bg-secondary-sky/10" },
    { label: "Badges Awarded", value: "5,670", icon: Award, color: "text-accent-yellow", bg: "bg-accent-yellow/10" },
  ]

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-heading font-extrabold text-slate-900 mb-8">
        CMS Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
            <div className={`w-14 h-14 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center shrink-0`}>
              <stat.icon size={28} />
            </div>
            <div>
              <p className="text-slate-500 font-bold text-sm">{stat.label}</p>
              <p className="text-2xl font-heading font-extrabold text-slate-900">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h2 className="text-xl font-heading font-bold text-slate-900 mb-4">Quick Actions</h2>
          <div className="space-y-3">
            <button className="w-full text-left p-4 rounded-xl border border-slate-200 hover:border-primary-purple hover:bg-primary-purple/5 transition-all font-bold text-slate-700 flex justify-between">
              Create New Lesson <span>+</span>
            </button>
            <button className="w-full text-left p-4 rounded-xl border border-slate-200 hover:border-magic-pink hover:bg-magic-pink/5 transition-all font-bold text-slate-700 flex justify-between">
              Generate AI Worksheet <span>🤖</span>
            </button>
            <button className="w-full text-left p-4 rounded-xl border border-slate-200 hover:border-success-green hover:bg-success-green/5 transition-all font-bold text-slate-700 flex justify-between">
              Upload Media Assets <span>📁</span>
            </button>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h2 className="text-xl font-heading font-bold text-slate-900 mb-4">Recent Content Activity</h2>
          <div className="space-y-4">
            {[1,2,3].map(i => (
              <div key={i} className="flex items-center gap-3 border-b border-slate-100 pb-4 last:border-0 last:pb-0">
                <div className="w-2 h-2 rounded-full bg-success-green"></div>
                <div>
                  <p className="text-sm font-bold text-slate-800">Addition Lesson Level {i} Published</p>
                  <p className="text-xs text-slate-500">2 hours ago by Teacher Neha</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
