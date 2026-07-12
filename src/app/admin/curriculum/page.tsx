"use client"

import { useState } from "react"
import { Search, Plus, Filter, Edit2, Trash2, ChevronRight, ChevronDown, Book, Folder, FileText, Layers, Bookmark } from "lucide-react"

// Mock Hierarchical Data
const CURRICULUM = [
  { 
    id: "sub_1", type: "Subject", title: "Mathematics", status: "Published", children: [
      { id: "bk_1", type: "Book", title: "Class 2 Math Magic", status: "Published", children: [
        { id: "un_1", type: "Unit", title: "Unit 1: Numbers", status: "Published", children: [
          { id: "ch_1", type: "Chapter", title: "Chapter 1: Looking Back", status: "Published", children: [
            { id: "tp_1", type: "Topic", title: "Counting 1 to 100", status: "Published" },
            { id: "tp_2", type: "Topic", title: "Number Names", status: "Review" }
          ]},
          { id: "ch_2", type: "Chapter", title: "Chapter 2: Addition", status: "Draft", children: [] }
        ]}
      ]}
    ]
  },
  { 
    id: "sub_2", type: "Subject", title: "English", status: "Review", children: [] 
  }
]

const TYPE_ICONS: Record<string, React.ReactNode> = {
  Subject: <Book size={16} className="text-primary-purple" />,
  Book: <Bookmark size={16} className="text-secondary-sky" />,
  Unit: <Layers size={16} className="text-accent-yellow" />,
  Chapter: <Folder size={16} className="text-magic-pink" />,
  Topic: <FileText size={16} className="text-success-green" />,
}

function CurriculumRow({ node, level = 0 }: { node: any, level?: number }) {
  const [expanded, setExpanded] = useState(level < 2)
  const hasChildren = node.children && node.children.length > 0

  return (
    <>
      <tr className="border-b border-slate-100 hover:bg-slate-50 transition-colors group">
        <td className="p-4 flex items-center" style={{ paddingLeft: `${(level * 2) + 1}rem` }}>
          <button 
            onClick={() => setExpanded(!expanded)} 
            className={`w-6 h-6 flex items-center justify-center mr-2 text-slate-400 hover:text-slate-700 ${!hasChildren && 'invisible'}`}
          >
            {expanded ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
          </button>
          <div className="flex items-center gap-2">
            {TYPE_ICONS[node.type]}
            <span className={`font-bold ${level === 0 ? 'text-slate-900 text-lg' : 'text-slate-700'}`}>
              {node.title}
            </span>
            <span className="text-xs font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded uppercase tracking-wider ml-2 hidden md:inline-block">
              {node.type}
            </span>
          </div>
        </td>
        <td className="p-4 hidden md:table-cell">
          {hasChildren ? <span className="text-sm font-bold text-slate-500">{node.children.length} items</span> : <span className="text-sm text-slate-400">-</span>}
        </td>
        <td className="p-4">
          <span className={`px-3 py-1 rounded-full text-xs font-bold ${node.status === 'Published' ? 'bg-success-green/10 text-success-green' : node.status === 'Draft' ? 'bg-slate-200 text-slate-600' : 'bg-accent-yellow/10 text-accent-yellow-dark'}`}>
            {node.status}
          </span>
        </td>
        <td className="p-4 text-right">
          <div className="flex justify-end gap-2 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity">
            <button className="p-2 hover:text-primary-purple hover:bg-primary-purple/10 rounded-lg transition-colors" title="Add Child"><Plus size={16} /></button>
            <button className="p-2 hover:text-secondary-sky hover:bg-secondary-sky/10 rounded-lg transition-colors" title="Edit"><Edit2 size={16} /></button>
            <button className="p-2 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors" title="Delete"><Trash2 size={16} /></button>
          </div>
        </td>
      </tr>
      {expanded && hasChildren && node.children.map((child: any) => (
        <CurriculumRow key={child.id} node={child} level={level + 1} />
      ))}
    </>
  )
}

export default function CurriculumManagement() {
  return (
    <div className="max-w-6xl mx-auto pb-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-heading font-extrabold text-slate-900 mb-2">
            Curriculum Manager
          </h1>
          <p className="text-slate-500 font-bold">Manage Subjects, Books, Units, Chapters, and Topics.</p>
        </div>
        <button className="bg-primary-purple text-white px-6 py-2 rounded-xl font-bold hover:bg-primary-purple/90 flex items-center gap-2 shadow-sm whitespace-nowrap">
          <Plus size={18} /> Create Subject
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
          <input 
            type="text" 
            placeholder="Search curriculum..." 
            className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl outline-none focus:border-primary-purple font-bold text-slate-700 shadow-sm"
          />
        </div>
        <div className="flex gap-2">
          <select className="px-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-600 font-bold outline-none focus:border-primary-purple shadow-sm">
            <option>All Types</option>
            <option>Subject</option>
            <option>Book</option>
            <option>Chapter</option>
          </select>
          <button className="px-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-600 font-bold flex items-center gap-2 hover:bg-slate-50 shadow-sm">
            <Filter size={18} /> Filter
          </button>
        </div>
      </div>

      {/* Hierarchical Data Table */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[600px]">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="p-4 font-bold text-slate-500 text-sm w-1/2">Title</th>
                <th className="p-4 font-bold text-slate-500 text-sm hidden md:table-cell">Contents</th>
                <th className="p-4 font-bold text-slate-500 text-sm">Status</th>
                <th className="p-4 font-bold text-slate-500 text-sm text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {CURRICULUM.map((node) => (
                <CurriculumRow key={node.id} node={node} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
