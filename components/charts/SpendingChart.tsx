'use client'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { explainChartWithAI } from '@/lib/ai/chartExplainer'

const COLORS = ['#10B981', '#3B82F6', '#F59E0B', '#EF4444', '#8B5CF6']

interface SpendingChartProps {
  data: { category: string; amount: number }[]
}

export function SpendingChart({ data }: SpendingChartProps) {
  const [aiInsight, setAiInsight] = useState<string>('')
  const [loading, setLoading] = useState(false)

  const chartData = data.map(d => ({ name: d.category, value: d.amount }))

  const getAIExplanation = async () => {
    setLoading(true)
    const insight = await explainChartWithAI(
      {
        labels: data.map(d => d.category),
        values: data.map(d => d.amount),
        type: 'pie'
      },
      process.env.NEXT_PUBLIC_GEMINI_API_KEY || ''
    )
    setAiInsight(insight)
    setLoading(false)
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="card"
    >
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold">Spending by Category</h3>
        <button
          onClick={getAIExplanation}
          disabled={loading}
          className="btn-primary text-sm"
        >
          {loading ? '🤔 Analyzing...' : '🤖 AI Explain'}
        </button>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(value: number) => `₹${value}`} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>

      {aiInsight && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 p-4 bg-mint/10 rounded-xl"
        >
          <p className="text-sm text-navy/80">💡 {aiInsight}</p>
        </motion.div>
      )}
    </motion.div>
  )
}
