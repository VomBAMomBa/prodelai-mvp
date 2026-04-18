import { useState } from 'react'
import Header from '../components/Header.jsx'
import { BookOpen, Search, Plus, FileText, ArrowRight } from 'lucide-react'
import { knowledgeCategories } from '../data/knowledge.js'

export default function KnowledgePage() {
  const [query, setQuery] = useState('')

  const totalArticles = knowledgeCategories.reduce((a, c) => a + c.articles.length, 0)

  const filter = (articles) =>
    articles.filter((a) => a.title.toLowerCase().includes(query.toLowerCase()))

  return (
    <div>
      <Header
        icon={BookOpen}
        title="База знаний"
        subtitle="Храните и структурируйте знания команды"
        badges={[`Статей: ${totalArticles}`, `Категорий: ${knowledgeCategories.length}`]}
      />

      <div className="px-8 py-6 space-y-6">
        <div className="flex items-center gap-3 flex-wrap">
          <div className="relative flex-1 min-w-[240px]">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Поиск статей..."
              className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>
          <button className="flex items-center gap-2 bg-[#6366f1] hover:bg-[#4f46e5] text-white px-4 py-2.5 rounded-lg text-sm font-medium">
            <Plus size={16} /> Добавить статью
          </button>
        </div>

        <div className="space-y-6">
          {knowledgeCategories.map((category) => {
            const articles = filter(category.articles)
            if (articles.length === 0) return null
            return (
              <section key={category.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                  <h2 className="font-semibold text-gray-800">{category.title}</h2>
                  <span className="text-xs text-gray-500">{articles.length} статьи</span>
                </div>
                <div className="divide-y divide-gray-100">
                  {articles.map((a) => (
                    <div key={a.id} className="px-6 py-4 flex items-center gap-4 hover:bg-gray-50">
                      <div className="p-2 rounded-lg bg-indigo-50 text-indigo-600">
                        <FileText size={18} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-gray-800 truncate">{a.title}</div>
                        <div className="text-xs text-gray-500 mt-0.5">
                          Обновлено {a.updated} · {a.author}
                        </div>
                      </div>
                      <button className="flex items-center gap-1 text-sm text-indigo-600 hover:text-indigo-800 font-medium">
                        Открыть <ArrowRight size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              </section>
            )
          })}
        </div>
      </div>
    </div>
  )
}
