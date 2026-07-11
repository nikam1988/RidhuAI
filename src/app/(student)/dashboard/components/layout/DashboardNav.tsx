"use client"

import { motion } from "framer-motion"
import { Home, PlayCircle, Star, Trophy, User } from "lucide-react"
import { usePathname } from "next/navigation"

export function TopStatsBar() {
  return (
    <div className="sticky top-0 z-50 bg-surface/80 backdrop-blur-xl border-b-4 border-border-soft px-4 py-3 flex items-center justify-between shadow-sm">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 bg-accent-yellow rounded-full flex items-center justify-center text-2xl border-2 border-white shadow-sm cursor-pointer">
          🐼
        </div>
        <div className="hidden md:block">
          <h2 className="font-heading font-extrabold text-text-primary leading-tight">Aarohi</h2>
          <p className="text-xs font-body font-bold text-text-secondary">Level 12 Explorer</p>
        </div>
      </div>

      <div className="flex items-center gap-2 md:gap-4 overflow-x-auto no-scrollbar">
        <div className="flex items-center gap-1.5 bg-secondary-sky/10 px-3 py-1.5 rounded-2xl border-2 border-secondary-sky/20">
          <span className="text-xl">⭐</span>
          <span className="font-heading font-extrabold text-secondary-sky">1.2k</span>
        </div>
        <div className="flex items-center gap-1.5 bg-accent-yellow/10 px-3 py-1.5 rounded-2xl border-2 border-accent-yellow/20">
          <span className="text-xl">🪙</span>
          <span className="font-heading font-extrabold text-accent-yellow">450</span>
        </div>
        <div className="flex items-center gap-1.5 bg-warning-orange/10 px-3 py-1.5 rounded-2xl border-2 border-warning-orange/20">
          <span className="text-xl">🔥</span>
          <span className="font-heading font-extrabold text-warning-orange">5</span>
        </div>
      </div>
    </div>
  )
}

export function BottomNavBar() {
  const pathname = usePathname()
  
  const navItems = [
    { icon: Home, label: "Home", path: "/dashboard" },
    { icon: PlayCircle, label: "Learn", path: "/learn" },
    { icon: Trophy, label: "Rewards", path: "/rewards" },
    { icon: User, label: "Profile", path: "/profile" },
  ]

  return (
    <div className="fixed bottom-0 w-full z-50 bg-surface border-t-4 border-border-soft pb-safe pt-2 px-4 shadow-[0_-10px_40px_rgba(0,0,0,0.05)] md:hidden">
      <div className="flex justify-around items-center h-16">
        {navItems.map((item) => {
          const isActive = pathname === item.path
          return (
            <button 
              key={item.label}
              className="flex flex-col items-center gap-1 relative w-16"
            >
              {isActive && (
                <motion.div 
                  layoutId="nav-pill"
                  className="absolute inset-0 bg-primary-purple/10 rounded-2xl -z-10"
                />
              )}
              <item.icon 
                size={24} 
                className={isActive ? "text-primary-purple" : "text-text-secondary"} 
                fill={isActive ? "currentColor" : "none"}
                strokeWidth={isActive ? 2 : 2.5}
              />
              <span className={`text-[10px] font-bold ${isActive ? "text-primary-purple" : "text-text-secondary"}`}>
                {item.label}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
