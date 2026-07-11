"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useRouter } from "next/navigation"
import { useTutorStore } from "../../../../features/tutor/store/useTutorStore"
import { ArrowLeft, Mic, Send, Volume2, Square } from "lucide-react"

export default function AIChatScreen() {
  const router = useRouter()
  const { studentName, preferredMascot, isListening, setListening, isSpeaking, setSpeaking } = useTutorStore()
  
  const [messages, setMessages] = useState([
    { id: 1, sender: 'ai', text: `Hi ${studentName}! I'm so excited to learn with you today. What do you want to explore?` }
  ])
  const [inputText, setInputText] = useState("")

  const handleSend = () => {
    if (!inputText.trim()) return
    const newMsg = { id: Date.now(), sender: 'user', text: inputText }
    setMessages([...messages, newMsg])
    setInputText("")
    
    // Mock AI response
    setTimeout(() => {
      setSpeaking(true)
      setMessages(prev => [...prev, { 
        id: Date.now()+1, 
        sender: 'ai', 
        text: "That sounds like a magical adventure! Let's start with a quick fun fact. Did you know pandas eat for 14 hours a day? 🐼" 
      }])
      setTimeout(() => setSpeaking(false), 4000)
    }, 1000)
  }

  const toggleVoice = () => {
    setListening(!isListening)
  }

  return (
    <div className="max-w-3xl mx-auto h-[calc(100vh-80px)] flex flex-col bg-slate-50 rounded-[32px] overflow-hidden shadow-2xl border-4 border-white">
      
      {/* Header */}
      <div className="bg-white px-6 py-4 border-b border-slate-100 flex items-center justify-between shrink-0 z-10 shadow-sm">
        <div className="flex items-center gap-4">
          <button onClick={() => router.back()} className="text-slate-400 hover:text-slate-700">
            <ArrowLeft size={24} />
          </button>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-primary-purple/10 rounded-full flex items-center justify-center text-2xl border-2 border-primary-purple/20">
              {preferredMascot.includes('Panda') ? '🐼' : '🦁'}
            </div>
            <div>
              <h2 className="font-heading font-extrabold text-slate-800">{preferredMascot}</h2>
              <p className="text-xs font-bold text-success-green flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-success-green"></span> Online
              </p>
            </div>
          </div>
        </div>

        {/* Voice Wave Animation (shows when AI is speaking) */}
        <AnimatePresence>
          {isSpeaking && (
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="flex items-center gap-1"
            >
              {[1,2,3,4].map(i => (
                <motion.div key={i} animate={{ height: [8, 20, 8] }} transition={{ repeat: Infinity, duration: 0.5, delay: i * 0.1 }} className="w-1.5 bg-primary-purple rounded-full" />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {messages.map(msg => (
          <motion.div 
            key={msg.id}
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-[80%] p-5 rounded-3xl font-body font-bold text-lg relative ${
              msg.sender === 'user' 
                ? 'bg-success-green text-white rounded-tr-sm shadow-[0_4px_0_0_#065F46]' 
                : 'bg-white text-slate-700 rounded-tl-sm shadow-sm border-2 border-slate-100'
            }`}>
              {msg.text}
              
              {/* TTS Button for AI messages */}
              {msg.sender === 'ai' && (
                <button className="absolute -right-4 -bottom-4 bg-white border-2 border-slate-200 text-slate-400 p-2 rounded-full hover:text-primary-purple hover:border-primary-purple shadow-sm">
                  <Volume2 size={16} />
                </button>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="px-6 py-2 flex gap-2 overflow-x-auto no-scrollbar">
        {['Explain Again', 'Give me a Hint', 'Play a Game'].map(chip => (
          <button key={chip} onClick={() => setInputText(chip)} className="whitespace-nowrap px-4 py-2 bg-white border border-slate-200 rounded-full text-sm font-bold text-slate-600 hover:border-primary-purple hover:text-primary-purple transition-colors shrink-0 shadow-sm">
            {chip}
          </button>
        ))}
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white border-t border-slate-100 flex items-end gap-2 shrink-0 relative z-20">
        <div className="flex-1 bg-slate-50 border border-slate-200 rounded-3xl p-2 flex items-center focus-within:border-primary-purple transition-colors">
          <input 
            type="text" 
            value={inputText}
            onChange={e => setInputText(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSend()}
            placeholder="Type your answer here..."
            className="flex-1 bg-transparent px-4 py-2 outline-none font-bold text-slate-700"
          />
        </div>
        
        {inputText.trim() ? (
          <button onClick={handleSend} className="w-14 h-14 bg-primary-purple text-white rounded-full flex items-center justify-center shadow-[0_4px_0_0_#4C1D95] hover:translate-y-1 hover:shadow-none transition-all shrink-0">
            <Send size={24} />
          </button>
        ) : (
          <button 
            onClick={toggleVoice} 
            className={`w-14 h-14 rounded-full flex items-center justify-center shrink-0 transition-all ${
              isListening ? 'bg-magic-pink text-white shadow-inner scale-95' : 'bg-slate-100 text-slate-600 hover:bg-slate-200 border-2 border-slate-200'
            }`}
          >
            {isListening ? <Square size={20} fill="currentColor" /> : <Mic size={24} />}
          </button>
        )}
      </div>

    </div>
  )
}
