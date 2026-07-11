"use client"

import { usePathname, useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { LayoutDashboard, BookOpen, PenTool, Image as ImageIcon, Wand2, Settings, MessageSquare, Puzzle } from "lucide-react"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()

  const navItems = [
    { name: "Dashboard", icon: LayoutDashboard, path: "/admin" },
    { name: "Curriculum", icon: BookOpen, path: "/admin/curriculum" },
    { name: "Lesson Builder", icon: PenTool, path: "/admin/lesson-builder/draft-1" },
    { name: "Story Builder", icon: MessageSquare, path: "/admin/story-builder" },
    { name: "Activities", icon: Puzzle, path: "/admin/activities" },
    { name: "Media Library", icon: ImageIcon, path: "/admin/media" },
    { name: "AI Generator", icon: Wand2, path: "/admin/ai-generator" },
    { name: "Settings", icon: Settings, path: "/admin/settings" },
  ]

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-slate-900 text-white min-h-screen flex flex-col fixed left-0 top-0">
        <div className="p-6">
          <h1 className="text-2xl font-heading font-extrabold text-white flex items-center gap-2">
            <span>🐼</span> KidSpark
            <span className="text-xs bg-magic-pink px-2 py-1 rounded-full text-white ml-2 uppercase">Admin</span>
          </h1>
        </div>

        <nav className="flex-1 px-4 space-y-2 mt-4">
          {navItems.map((item) => {
            const isActive = pathname === item.path || (pathname.includes('/admin/lesson-builder') && item.name === 'Lesson Builder')
            return (
              <button
                key={item.name}
                onClick={() => router.push(item.path)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${isActive ? 'bg-primary-purple text-white shadow-lg' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
              >
                <item.icon size={20} />
                <span className="font-bold text-sm">{item.name}</span>
                {isActive && (
                  <motion.div layoutId="sidebar-active" className="absolute left-0 w-1 h-8 bg-magic-pink rounded-r-full" />
                )}
              </button>
            )
          })}
        </nav>

        <div className="p-4 border-t border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center font-bold">
              AM
            </div>
            <div className="text-left">
              <p className="text-sm font-bold">Admin Master</p>
              <p className="text-xs text-slate-400">admin@kidspark.ai</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 ml-64 flex flex-col h-screen overflow-hidden">
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-slate-200 px-8 flex items-center justify-between shrink-0">
          <h2 className="font-heading font-extrabold text-slate-800">Workspace</h2>
          <div className="flex items-center gap-4">
            <button className="bg-success-green/10 text-success-green px-4 py-1.5 rounded-full text-sm font-bold border border-success-green/20">
              System Online
            </button>
          </div>
        </header>

        {/* Scrollable Page Content */}
        <div className="flex-1 overflow-auto p-8">
          {children}
        </div>
      </main>
    </div>
  )
}
