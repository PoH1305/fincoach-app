'use client'
import { motion } from 'framer-motion'
import { Sparkles, RefreshCw } from 'lucide-react'
import { useState, useEffect } from 'react'
import { generateAIInsight } from '@/lib/ai/spendingAnalyzer'
import { useBudgetStore } from '@/lib/stores/budgetStore'

export function AIInsightCard() {
  const { expenses } = useBudgetStore()
  const [insight, setInsight] = useState('Loading insights...')
  const [loading, setLoading] = useState(false)

  const loadInsight = async () => {
    setLoading(true)
    const newInsight = await generateAIInsight(expenses, 50000)
    setInsight(newInsight)
    setLoading(false)
  }

  useEffect(() => {
    loadInsight()
  }, [expenses])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="card bg-gradient-to-br from-mint/10 to-sky/10"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-mint" />
          <h3 className="font-semibold">AI Insight</h3>
        </div>
        <button
          onClick={loadInsight}
          disabled={loading}
          className="p-1 hover:bg-white/50 rounded-lg transition-colors"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
        </button>
      </div>
      
      <motion.p
        key={insight}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-sm text-navy/80 leading-relaxed"
      >
        {insight}
      </motion.p>
    </motion.div>
  )
}
