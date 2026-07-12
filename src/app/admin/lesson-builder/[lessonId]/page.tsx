"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Type, Image as ImageIcon, PlayCircle, Puzzle, Award, Save, Settings, Layers, BoxSelect } from "lucide-react"

export default function LessonBuilderScreen({ params }: { params: { lessonId: string } }) {
  const [blocks, setBlocks] = useState([{ id: '1', type: 'text', content: 'Welcome to the Magic Lesson!' }])

  const BLOCKS_TOOLBOX = [
    { icon: Type, label: "Text Block", color: "bg-blue-100 text-blue-600" },
    { icon: ImageIcon, label: "Image/Lottie", color: "bg-purple-100 text-purple-600" },
    { icon: PlayCircle, label: "Audio/Video", color: "bg-green-100 text-green-600" },
    { icon: Puzzle, label: "Activity Node", color: "bg-orange-100 text-orange-600" },
    { icon: Award, label: "Reward Block", color: "bg-yellow-100 text-yellow-600" },
  ]

  return (
    <div className="h-full flex flex-col -m-8">
      {/* Builder Topbar */}
      <div className="h-14 bg-white border-b border-slate-200 flex items-center justify-between px-6 shrink-0">
        <div className="flex items-center gap-4">
          <span className="bg-slate-100 px-2 py-1 rounded text-xs font-bold text-slate-500 uppercase">Draft</span>
          <h1 className="font-heading font-bold text-slate-800">Addition Lesson 1</h1>
        </div>
        <div className="flex items-center gap-3">
          <button className="text-slate-500 font-bold text-sm flex items-center gap-2 hover:text-slate-800">
            <Settings size={16} /> Lesson Settings
          </button>
          <button className="bg-primary-purple text-white px-4 py-1.5 rounded-lg text-sm font-bold flex items-center gap-2 hover:bg-primary-purple/90">
            <Save size={16} /> Save Draft
          </button>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        
        {/* Left Panel: Toolbox */}
        <div className="w-64 bg-slate-50 border-r border-slate-200 flex flex-col">
          <div className="p-4 border-b border-slate-200">
            <h3 className="font-bold text-slate-700 flex items-center gap-2">
              <BoxSelect size={18} /> Building Blocks
            </h3>
          </div>
          <div className="p-4 space-y-3 overflow-y-auto">
            {BLOCKS_TOOLBOX.map((block, idx) => (
              <div 
                key={idx}
                draggable
                className="bg-white p-3 rounded-xl border border-slate-200 flex items-center gap-3 cursor-grab hover:border-primary-purple hover:shadow-md transition-all"
              >
                <div className={`p-2 rounded-lg ${block.color}`}>
                  <block.icon size={18} />
                </div>
                <span className="font-bold text-sm text-slate-700">{block.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Center Panel: Canvas */}
        <div className="flex-1 bg-slate-100 overflow-y-auto p-8 flex justify-center">
          <div className="w-full max-w-2xl min-h-[800px] bg-white rounded-3xl shadow-xl border-4 border-white overflow-hidden flex flex-col">
            {/* Canvas Header App Simulation */}
            <div className="bg-slate-50 h-10 border-b border-slate-100 flex items-center px-4 justify-between shrink-0">
              <span className="text-xs font-bold text-slate-400">App Preview</span>
              <div className="flex gap-1">
                <div className="w-3 h-3 rounded-full bg-red-400"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                <div className="w-3 h-3 rounded-full bg-green-400"></div>
              </div>
            </div>
            
            {/* Dropped Blocks Area */}
            <div className="p-8 space-y-4">
              {blocks.map(b => (
                <motion.div 
                  key={b.id}
                  className="p-4 rounded-2xl border-2 border-primary-purple bg-primary-purple/5 relative group cursor-pointer"
                >
                  <div className="absolute -left-3 -top-3 w-6 h-6 bg-primary-purple text-white rounded-full flex items-center justify-center text-xs font-bold">
                    1
                  </div>
                  <h2 className="text-2xl font-heading font-extrabold text-slate-800 text-center">
                    {b.content}
                  </h2>
                </motion.div>
              ))}
              
              <div className="border-2 border-dashed border-slate-300 rounded-2xl p-8 flex flex-col items-center justify-center text-slate-400 bg-slate-50">
                <p className="font-bold">Drag blocks here</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel: Inspector */}
        <div className="w-80 bg-white border-l border-slate-200 flex flex-col">
          <div className="p-4 border-b border-slate-200">
            <h3 className="font-bold text-slate-700 flex items-center gap-2">
              <Layers size={18} /> Properties Inspector
            </h3>
          </div>
          <div className="p-6">
            <p className="text-sm font-bold text-slate-500 mb-4">Editing: Text Block</p>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1">Text Content</label>
                <textarea 
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 outline-none focus:border-primary-purple text-sm font-bold text-slate-700" 
                  rows={4}
                  defaultValue="Welcome to the Magic Lesson!"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1">Style Type</label>
                <select className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 outline-none focus:border-primary-purple text-sm font-bold text-slate-700">
                  <option>Heading (H1)</option>
                  <option>Paragraph</option>
                  <option>Fun Fact Card</option>
                </select>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
