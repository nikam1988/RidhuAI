import { Flame, Coins, Star, Settings, User } from "lucide-react"

export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b-4 border-slate-100 px-4 py-3 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="w-10 h-10 bg-brand-purple rounded-full flex items-center justify-center text-white font-bold text-xl shadow-inner shadow-white/30 border-2 border-brand-purple">
          K
        </div>
        <span className="font-extrabold text-xl text-slate-700 hidden sm:inline-block">KidSpark</span>
      </div>

      <div className="flex items-center gap-3 md:gap-6 bg-slate-100 rounded-full px-4 py-2 border-2 border-slate-200">
        <div className="flex items-center gap-1.5 font-bold text-brand-yellow">
          <Flame fill="currentColor" size={24} className="animate-pulse" />
          <span className="text-lg">12</span>
        </div>
        <div className="w-0.5 h-6 bg-slate-300 rounded-full"></div>
        <div className="flex items-center gap-1.5 font-bold text-brand-blue">
          <Star fill="currentColor" size={24} />
          <span className="text-lg">450</span>
        </div>
        <div className="w-0.5 h-6 bg-slate-300 rounded-full"></div>
        <div className="flex items-center gap-1.5 font-bold text-brand-pink">
          <Coins fill="currentColor" size={24} />
          <span className="text-lg">85</span>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-slate-200 hover:scale-105 transition-all">
          <Settings size={24} />
        </button>
        <button className="w-12 h-12 rounded-full bg-brand-teal flex items-center justify-center text-white shadow-md hover:scale-105 transition-all">
          <User size={24} />
        </button>
      </div>
    </header>
  )
}
