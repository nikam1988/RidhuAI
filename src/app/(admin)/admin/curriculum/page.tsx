"use client"

import { useState } from "react"
import { Search, Plus, Filter, MoreVertical, Edit2, Trash2 } from "lucide-react"

const SUBJECTS = [
  { id: 1, title: "Math Kingdom", chapters: 12, status: "Published", theme: "Purple" },
  { id: 2, title: "English Forest", chapters: 15, status: "Published", theme: "Green" },
  { id: 3, title: "EVS Jungle", chapters: 10, status: "Draft", theme: "Yellow" },
  { id: 4, title: "Space GK", chapters: 8, status: "Draft", theme: "Black" },
]

export default function CurriculumManagement() {
  const [activeTab, setActiveTab] = useState('subjects')

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-heading font-extrabold text-slate-900 mb-2">
            Curriculum Manager
          </h1>
          <p className="text-slate-500 font-bold">Manage Subjects, Chapters, and Topics.</p>
        </div>
        <button className="bg-primary-purple text-white px-6 py-2 rounded-xl font-bold hover:bg-primary-purple/90 flex items-center gap-2">
          <Plus size={18} /> Create New
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 border-b border-slate-200 mb-6">
        {['Subjects', 'Chapters', 'Topics'].map(tab => (
          <button 
            key={tab}
            onClick={() => setActiveTab(tab.toLowerCase())}
            className={`pb-4 px-4 font-bold transition-all ${activeTab === tab.toLowerCase() ? 'border-b-4 border-primary-purple text-primary-purple' : 'text-slate-400 hover:text-slate-600'}`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Filters */}
      <div className="flex gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
          <input 
            type="text" 
            placeholder="Search curriculum..." 
            className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl outline-none focus:border-primary-purple font-bold text-slate-700"
          />
        </div>
        <button className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-slate-600 font-bold flex items-center gap-2 hover:bg-slate-50">
          <Filter size={18} /> Filter
        </button>
      </div>

      {/* Data Table */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200">
              <th className="p-4 font-bold text-slate-500 text-sm">Title</th>
              <th className="p-4 font-bold text-slate-500 text-sm">Content Count</th>
              <th className="p-4 font-bold text-slate-500 text-sm">Status</th>
              <th className="p-4 font-bold text-slate-500 text-sm">Theme</th>
              <th className="p-4 font-bold text-slate-500 text-sm text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {SUBJECTS.map((subject, idx) => (
              <tr key={subject.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                <td className="p-4 font-bold text-slate-800">{subject.title}</td>
                <td className="p-4 font-bold text-slate-500">{subject.chapters} Chapters</td>
                <td className="p-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${subject.status === 'Published' ? 'bg-success-green/10 text-success-green' : 'bg-slate-200 text-slate-600'}`}>
                    {subject.status}
                  </span>
                </td>
                <td className="p-4 font-bold text-slate-500">{subject.theme}</td>
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
  )
}
