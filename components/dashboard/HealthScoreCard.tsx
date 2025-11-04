'use client'
import { motion } from 'framer-motion'
import { TrendingUp, TrendingDown, Minus } from 'lucide-react'
import { calculateHealthScore, getScoreColor, getScoreTrend } from '@/lib/ai/healthScore'
import { useBudgetStore } from '@/lib/stores/budgetStore'
import { useEffect, useState } from 'react'

export function HealthScoreCard() {
  const { expenses, totalBalance } = useBudgetStore()
  const [score, setScore] = useState(0)
  const [displayScore, setDisplayScore] = useState(0)

  useEffect(() => {
    const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0)
    const income = 50000 // TODO: Get from user profile
    const savings = totalBalance > 0 ? totalBalance : 0
    
    const result = calculateHealthScore({
      income,
      expenses: totalExpenses,
      savings,
      debt: 0
    })
    
    setScore(result.score)
  }, [expenses, totalBalance])

  useEffect(() => {
    const timer = setInterval(() => {
      setDisplayScore(prev => {
        if (prev < score) return Math.min(prev + 2, score)
        if (prev > score) return Math.max(prev - 2, score)
        return prev
      })
    }, 20)
    return () => clearInterval(timer)
  }, [score])

  const color = getScoreColor(score)
  const circumference = 2 * Math.PI * 45
  const offset = circumference - (displayScore / 100) * circumference

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="card relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-mint/20 to-sky/20 rounded-full blur-3xl" />
      
      <div className="relative">
        <h3 className="text-lg font-semibold mb-4">Financial Health</h3>
        
        <div className="flex items-center justify-between">
          <div className="relative">
            <svg width="120" height="120" className="transform -rotate-90">
              <circle
                cx="60"
                cy="60"
                r="45"
                stroke="#E5E7EB"
                strokeWidth="8"
                fill="none"
              />
              <motion.circle
                cx="60"
                cy="60"
                r="45"
                stroke={color}
                strokeWidth="8"
                fill="none"
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                strokeLinecap="round"
                initial={{ strokeDashoffset: circumference }}
                animate={{ strokeDashoffset: offset }}
                transition={{ duration: 1, ease: 'easeOut' }}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-bold" style={{ color }}>
                {displayScore}
              </span>
              <span className="text-xs text-navy/60">Score</span>
            </div>
          </div>

          <div className="flex-1 ml-6 space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-mint" />
              <span className="text-sm text-navy/70">Savings</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-sky" />
              <span className="text-sm text-navy/70">Debt</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-coral" />
              <span className="text-sm text-navy/70">Emergency</span>
            </div>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-navy/10">
          <p className="text-sm text-navy/70">
            {score >= 80 ? '🎉 Excellent!' : score >= 60 ? '👍 Good progress' : '💪 Keep improving'}
          </p>
        </div>
      </div>
    </motion.div>
  )
}
