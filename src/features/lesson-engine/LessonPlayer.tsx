"use client"

import { useState, useRef, useEffect } from "react"
import { LessonJSON } from "./types"
import { getLessonComponent } from "./registry"
import { motion, AnimatePresence } from "framer-motion"

export function LessonPlayer({ lessonData }: { lessonData: LessonJSON }) {
  const [activeBlockIndex, setActiveBlockIndex] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleBlockComplete = (index: number) => {
    if (index < lessonData.blocks.length - 1) {
      setActiveBlockIndex(index + 1)
      // Save progress to DB here
    } else {
      alert("Lesson Complete! Trigger Reward Animation!")
    }
  }

  // Auto-scroll to the active block
  useEffect(() => {
    if (containerRef.current) {
      const activeElement = containerRef.current.children[activeBlockIndex] as HTMLElement
      if (activeElement) {
        activeElement.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }
    }
  }, [activeBlockIndex])

  return (
    <div className="max-w-3xl mx-auto space-y-8 pb-32" ref={containerRef}>
      
      {/* Lesson Header */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm text-center mb-12">
        <h1 className="text-3xl font-heading font-extrabold text-slate-800">
          {lessonData.title}
        </h1>
        <div className="flex justify-center mt-4">
          <div className="h-2 w-full max-w-md bg-slate-100 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-success-green"
              initial={{ width: 0 }}
              animate={{ width: `${((activeBlockIndex + 1) / lessonData.blocks.length) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Render Dynamic Blocks */}
      <AnimatePresence>
        {lessonData.blocks.map((block, index) => {
          // Only render blocks up to the active index
          if (index > activeBlockIndex) return null

          const Component = getLessonComponent(block.type)
          const isActive = index === activeBlockIndex

          return (
            <div key={block.id} className="relative">
              {/* Connection line between blocks */}
              {index > 0 && (
                <div className="absolute -top-8 left-1/2 -ml-1 w-2 h-8 bg-slate-200" />
              )}
              
              <Component 
                data={block.data} 
                isActive={isActive} 
                onComplete={() => handleBlockComplete(index)} 
              />
            </div>
          )
        })}
      </AnimatePresence>
    </div>
  )
}
