"use client"

import { useState } from "react"
import { Search, Plus, Filter, Edit2, Trash2, HelpCircle } from "lucide-react"

// Mock Question Data
const QUESTIONS = [
  { id: "q1", prompt: "Identify the animal in the image.", type: "MCQ", subject: "EVS", difficulty: 1, status: "Published" },
  { id: "q2", prompt: "2 + 3 = ?", type: "Fill in Blanks", subject: "Math", difficulty: 2, status: "Published" },
  { id: "q3", prompt: "Match the following numbers to their names.", type: "Match", subject: "Math", difficulty: 3, status: "Review" },
  { id: "q4", prompt: "Drag the planets to their correct orbit.", type: "Drag & Drop", subject: "EVS", difficulty: 4, status: "Draft" },
  { id: "q5", prompt: "Read the sentence aloud.", type: "Speaking", subject: "English", difficulty: 3, status: "Published" },
]

export default function QuestionBank() {
  const [activeTab, setActiveTab] = useState('All Questions')

  return (
    <div className="max-w-7xl mx-auto pb-12">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-heading font-extrabold text-slate-900 mb-2">
            Question Bank
          </h1>
          <p className="text-slate-500 font-bold">Manage questions across all subjects and difficulty levels.</p>
        </div>
        <button className="bg-primary-purple text-white px-6 py-2 rounded-xl font-bold hover:bg-primary-purple/90 flex items-center gap-2 shadow-sm whitespace-nowrap">
          <Plus size={18} /> Create Question
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 border-b border-slate-200 mb-6 overflow-x-auto no-scrollbar">
        {['All Questions', 'Math', 'English', 'EVS', 'Needs Review'].map(tab => (
          <button 
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-4 px-4 font-bold whitespace-nowrap transition-all ${activeTab === tab ? 'border-b-4 border-primary-purple text-primary-purple' : 'text-slate-400 hover:text-slate-600'}`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
          <input 
            type="text" 
            placeholder="Search questions by prompt..." 
            className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl outline-none focus:border-primary-purple font-bold text-slate-700 shadow-sm"
          />
        </div>
        <div className="flex gap-2">
          <select className="px-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-600 font-bold outline-none focus:border-primary-purple shadow-sm">
            <option>All Types</option>
            <option>MCQ</option>
            <option>Match</option>
            <option>Drag & Drop</option>
          </select>
          <select className="px-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-600 font-bold outline-none focus:border-primary-purple shadow-sm">
            <option>Any Difficulty</option>
            <option>Level 1 (Easy)</option>
            <option>Level 3 (Medium)</option>
          </select>
          <button className="px-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-600 font-bold flex items-center gap-2 hover:bg-slate-50 shadow-sm">
            <Filter size={18} /> Filter
          </button>
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="p-4 font-bold text-slate-500 text-sm">Question Prompt</th>
                <th className="p-4 font-bold text-slate-500 text-sm">Type</th>
                <th className="p-4 font-bold text-slate-500 text-sm">Subject</th>
                <th className="p-4 font-bold text-slate-500 text-sm">Difficulty</th>
                <th className="p-4 font-bold text-slate-500 text-sm">Status</th>
                <th className="p-4 font-bold text-slate-500 text-sm text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {QUESTIONS.map((q) => (
                <tr key={q.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                  <td className="p-4 font-bold text-slate-800 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 shrink-0">
                      <HelpCircle size={16} />
                    </div>
                    <span className="truncate max-w-xs">{q.prompt}</span>
                  </td>
                  <td className="p-4 text-sm font-bold text-slate-500">{q.type}</td>
                  <td className="p-4 text-sm font-bold text-slate-500">{q.subject}</td>
                  <td className="p-4 text-sm font-bold text-slate-500">
                    <div className="flex gap-1">
                      {Array.from({length: 5}).map((_, i) => (
                        <div key={i} className={`w-2 h-2 rounded-full ${i < q.difficulty ? 'bg-accent-yellow' : 'bg-slate-200'}`}></div>
                      ))}
                    </div>
                  </td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${q.status === 'Published' ? 'bg-success-green/10 text-success-green' : q.status === 'Draft' ? 'bg-slate-200 text-slate-600' : 'bg-accent-yellow/10 text-accent-yellow-dark'}`}>
                      {q.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex justify-end gap-2 text-slate-400">
                      <button className="p-2 hover:text-primary-purple hover:bg-primary-purple/10 rounded-lg transition-colors"><Edit2 size={16} /></button>
                      <button className="p-2 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"><Trash2 size={16} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
