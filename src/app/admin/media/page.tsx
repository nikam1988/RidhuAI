"use client"

import { useState } from "react"
import { Search, Plus, Filter, Image as ImageIcon, Music, Video, File, UploadCloud, MoreVertical } from "lucide-react"

const MEDIA = [
  { id: "m1", name: "spark_panda.svg", type: "image", size: "24 KB", date: "Oct 12, 2023", tags: ["mascot", "panda"] },
  { id: "m2", name: "success_chime.mp3", type: "audio", size: "128 KB", date: "Oct 14, 2023", tags: ["sfx", "reward"] },
  { id: "m3", name: "intro_animation.mp4", type: "video", size: "4.2 MB", date: "Oct 15, 2023", tags: ["intro", "chapter1"] },
  { id: "m4", name: "worksheet_math_ch1.pdf", type: "document", size: "1.1 MB", date: "Oct 16, 2023", tags: ["math", "worksheet"] },
  { id: "m5", name: "confetti.json", type: "lottie", size: "56 KB", date: "Oct 18, 2023", tags: ["animation", "celebration"] },
]

const TYPE_ICONS: Record<string, React.ReactNode> = {
  image: <ImageIcon size={24} className="text-primary-purple" />,
  audio: <Music size={24} className="text-secondary-sky" />,
  video: <Video size={24} className="text-magic-pink" />,
  document: <File size={24} className="text-slate-500" />,
  lottie: <ImageIcon size={24} className="text-accent-yellow" />, // using image icon for lottie
}

export default function MediaLibrary() {
  const [activeType, setActiveType] = useState('All Files')

  return (
    <div className="max-w-7xl mx-auto pb-12">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-heading font-extrabold text-slate-900 mb-2">
            Media Library
          </h1>
          <p className="text-slate-500 font-bold">Manage images, audio, video, and Lottie animations.</p>
        </div>
        <button className="bg-primary-purple text-white px-6 py-2 rounded-xl font-bold hover:bg-primary-purple/90 flex items-center gap-2 shadow-sm whitespace-nowrap">
          <UploadCloud size={18} /> Upload Assets
        </button>
      </div>

      <div className="flex gap-4 mb-8 overflow-x-auto no-scrollbar">
        {['All Files', 'Images', 'Audio', 'Videos', 'Documents', 'Lottie'].map(tab => (
          <button 
            key={tab}
            onClick={() => setActiveType(tab)}
            className={`px-6 py-3 rounded-xl font-bold whitespace-nowrap transition-all shadow-sm ${activeType === tab ? 'bg-primary-purple text-white' : 'bg-white text-slate-500 border border-slate-200 hover:bg-slate-50'}`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
          <input 
            type="text" 
            placeholder="Search files by name or tag..." 
            className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl outline-none focus:border-primary-purple font-bold text-slate-700 shadow-sm"
          />
        </div>
        <button className="px-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-600 font-bold flex items-center gap-2 hover:bg-slate-50 shadow-sm">
          <Filter size={18} /> Sort & Filter
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {MEDIA.map((item) => (
          <div key={item.id} className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow overflow-hidden group">
            {/* Preview Area */}
            <div className="h-32 bg-slate-50 border-b border-slate-100 flex items-center justify-center relative">
              {TYPE_ICONS[item.type]}
              
              {/* Overlay Actions */}
              <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <button className="px-3 py-1 bg-white text-slate-800 rounded-lg text-xs font-bold hover:bg-slate-100">View</button>
                <button className="px-3 py-1 bg-white text-slate-800 rounded-lg text-xs font-bold hover:bg-slate-100">Copy URL</button>
              </div>
            </div>
            
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <p className="font-bold text-slate-800 text-sm truncate pr-2" title={item.name}>
                  {item.name}
                </p>
                <button className="text-slate-400 hover:text-slate-600 shrink-0">
                  <MoreVertical size={16} />
                </button>
              </div>
              <div className="flex justify-between items-center text-xs font-bold text-slate-400 mb-3">
                <span className="uppercase tracking-wide">{item.type}</span>
                <span>{item.size}</span>
              </div>
              <div className="flex gap-1 flex-wrap">
                {item.tags.map(tag => (
                  <span key={tag} className="px-2 py-0.5 bg-slate-100 text-slate-500 rounded text-[10px] font-bold uppercase">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}

        {/* Upload Placeholder */}
        <button className="h-full min-h-[220px] rounded-2xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center gap-2 text-slate-400 hover:text-primary-purple hover:border-primary-purple hover:bg-primary-purple/5 transition-all">
          <UploadCloud size={32} />
          <span className="font-bold text-sm">Drag & Drop Files Here</span>
        </button>
      </div>

    </div>
  )
}
