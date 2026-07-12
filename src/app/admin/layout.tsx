"use client"

import { usePathname, useRouter } from "next/navigation"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  LayoutDashboard, BookOpen, Wand2, MessageSquare, 
  Settings, Image as ImageIcon, Users, UserCheck, 
  Gamepad2, LineChart, ChevronDown, ChevronRight,
  Search, Bell, Plus, Activity, Briefcase
} from "lucide-react"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const [expandedMenus, setExpandedMenus] = useState<string[]>(['Curriculum', 'AI Studio'])

  const toggleMenu = (name: string) => {
    setExpandedMenus(prev => 
      prev.includes(name) ? prev.filter(m => m !== name) : [...prev, name]
    )
  }

  const navItems = [
    { name: "Dashboard", icon: LayoutDashboard, path: "/admin" },
    { 
      name: "Curriculum", 
      icon: BookOpen, 
      path: "/admin/curriculum",
      children: [
        { name: "Subjects", path: "/admin/curriculum?tab=subjects" },
        { name: "Chapters", path: "/admin/curriculum?tab=chapters" },
        { name: "Topics", path: "/admin/curriculum?tab=topics" },
        { name: "Learning Outcomes", path: "/admin/curriculum?tab=outcomes" },
      ]
    },
    { 
      name: "AI Studio", 
      icon: Wand2, 
      path: "/admin/ai-generator",
      children: [
        { name: "Lesson Generator", path: "/admin/ai-generator?type=lesson" },
        { name: "Quiz Generator", path: "/admin/ai-generator?type=quiz" },
        { name: "Story Generator", path: "/admin/ai-generator?type=story" },
        { name: "Worksheet Generator", path: "/admin/ai-generator?type=worksheet" },
        { name: "Flashcard Generator", path: "/admin/ai-generator?type=flashcard" },
      ]
    },
    { name: "Question Bank", icon: MessageSquare, path: "/admin/question-bank" },
    { name: "Gamification", icon: Gamepad2, path: "/admin/gamification", children: [
      { name: "Achievements", path: "/admin/gamification/achievements" }
    ]},
    { name: "Students", icon: Users, path: "/admin/students" },
    { name: "Parents", icon: UserCheck, path: "/admin/parents" },
    { name: "Analytics", icon: LineChart, path: "/admin/analytics", children: [
      { name: "Reports", path: "/admin/analytics/reports" }
    ]},
    { name: "Media Library", icon: ImageIcon, path: "/admin/media" },
    { name: "Settings", icon: Settings, path: "/admin/settings" },
  ]

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-slate-900 text-white min-h-screen flex flex-col fixed left-0 top-0 z-50 shadow-xl border-r border-slate-800">
        <div className="p-6">
          <h1 className="text-2xl font-heading font-extrabold text-white flex items-center gap-2">
            <span>🐼</span> Ridhvi AI
            <span className="text-[10px] bg-magic-pink px-2 py-1 rounded-full text-white ml-2 uppercase tracking-wider">CMS</span>
          </h1>
        </div>

        <nav className="flex-1 px-4 space-y-1 mt-2 overflow-y-auto custom-scrollbar pb-6">
          {navItems.map((item) => {
            const isActive = pathname === item.path
            const isExpanded = expandedMenus.includes(item.name)
            const hasChildren = item.children && item.children.length > 0

            return (
              <div key={item.name}>
                <button
                  onClick={() => hasChildren ? toggleMenu(item.name) : router.push(item.path)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all group ${isActive ? 'bg-primary-purple text-white shadow-lg' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
                >
                  <div className="flex items-center gap-3">
                    <item.icon size={18} className={isActive ? "text-white" : "text-slate-400 group-hover:text-white transition-colors"} />
                    <span className="font-bold text-sm tracking-wide">{item.name}</span>
                  </div>
                  
                  {hasChildren && (
                    isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />
                  )}

                  {isActive && !hasChildren && (
                    <motion.div layoutId="sidebar-active" className="absolute left-0 w-1 h-8 bg-magic-pink rounded-r-full" />
                  )}
                </button>

                {/* Sub Menu */}
                <AnimatePresence>
                  {hasChildren && isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="pl-12 pr-4 py-2 space-y-1 relative before:absolute before:left-6 before:top-0 before:bottom-4 before:w-px before:bg-slate-700">
                        {item.children.map(child => (
                          <div key={child.name} className="relative flex items-center">
                            <div className="absolute left-[-24px] w-3 h-px bg-slate-700" />
                            <button
                              onClick={() => router.push(child.path)}
                              className="w-full text-left text-[13px] font-bold text-slate-400 hover:text-white transition-colors py-2"
                            >
                              {child.name}
                            </button>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 ml-64 flex flex-col h-screen overflow-hidden bg-slate-50">
        
        {/* Top Header (SaaS Style) */}
        <header className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between shrink-0 shadow-sm z-40 relative">
          
          {/* Left: Workspace Switcher */}
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-slate-50 border border-transparent hover:border-slate-200 transition-colors">
              <div className="w-6 h-6 bg-primary-purple/10 text-primary-purple rounded flex items-center justify-center">
                <Briefcase size={14} />
              </div>
              <span className="font-bold text-slate-700 text-sm">Primary Workspace</span>
              <ChevronDown size={14} className="text-slate-400" />
            </button>
          </div>

          {/* Center: Global Search */}
          <div className="flex-1 max-w-xl px-8">
            <div className="relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary-purple transition-colors" size={18} />
              <input 
                type="text" 
                placeholder="Search subjects, chapters, questions, students..." 
                className="w-full pl-10 pr-4 py-2 bg-slate-100 hover:bg-slate-200/50 focus:bg-white border border-transparent focus:border-primary-purple rounded-xl outline-none font-bold text-slate-700 text-sm transition-all shadow-sm"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 flex gap-1">
                <kbd className="px-1.5 py-0.5 bg-white border border-slate-200 rounded text-[10px] font-bold text-slate-400 shadow-sm">⌘</kbd>
                <kbd className="px-1.5 py-0.5 bg-white border border-slate-200 rounded text-[10px] font-bold text-slate-400 shadow-sm">K</kbd>
              </div>
            </div>
          </div>

          {/* Right: Actions & Profile */}
          <div className="flex items-center gap-4">
            {/* AI Status */}
            <div className="flex items-center gap-2 px-3 py-1.5 bg-magic-pink/10 border border-magic-pink/20 rounded-full">
              <div className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-magic-pink opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-magic-pink"></span>
              </div>
              <span className="text-[11px] font-bold text-magic-pink uppercase tracking-wider">AI Online</span>
            </div>

            {/* Quick Create */}
            <button className="flex items-center gap-1.5 bg-primary-purple text-white px-3 py-1.5 rounded-lg text-sm font-bold shadow-sm hover:bg-primary-purple/90 transition-colors">
              <Plus size={16} />
              <span>Create</span>
            </button>

            <div className="w-px h-6 bg-slate-200 mx-1"></div>

            {/* Notifications */}
            <button className="relative p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors">
              <Bell size={18} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>

            {/* User Profile */}
            <button className="flex items-center gap-2 pl-2">
              <div className="w-8 h-8 bg-gradient-to-tr from-primary-purple to-magic-pink rounded-full flex items-center justify-center text-white font-bold text-sm shadow-inner shadow-white/20 border border-primary-purple/20">
                A
              </div>
            </button>
          </div>
        </header>

        {/* Scrollable Page Content */}
        <div className="flex-1 overflow-auto p-8 relative">
          {children}
        </div>
      </main>
    </div>
  )
}
