'use client'
import { motion } from 'framer-motion'
import { TrendingUp, TrendingDown, CheckCircle } from 'lucide-react'

interface Recommendation {
  category: string
  recommended: number
  current: number
  status: 'good' | 'warning' | 'critical'
  tip: string
}

interface BudgetRecommendationCardProps {
  recommendations: Recommendation[]
}

export function BudgetRecommendationCard({ recommendations }: BudgetRecommendationCardProps) {
  const statusConfig = {
    good: { color: 'mint', icon: CheckCircle, bg: 'bg-mint/10' },
    warning: { color: 'coral', icon: TrendingUp, bg: 'bg-coral/10' },
    critical: { color: 'red-500', icon: TrendingDown, bg: 'bg-red-50' },
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="card"
    >
      <h3 className="text-xl font-bold mb-4">💡 Budget Recommendations</h3>
      
      <div className="space-y-4">
        {recommendations.map((rec, index) => {
          const config = statusConfig[rec.status]
          const Icon = config.icon
          const diff = rec.current - rec.recommended
          
          return (
            <motion.div
              key={rec.category}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`p-4 rounded-xl ${config.bg}`}
            >
              <div className="flex items-start gap-3">
                <Icon className={`w-5 h-5 text-${config.color} mt-1`} />
                <div className="flex-1">
                  <h4 className="font-semibold mb-1">{rec.category}</h4>
                  <div className="flex gap-4 text-sm mb-2">
                    <span>Current: ₹{rec.current.toLocaleString()}</span>
                    <span className="text-navy/60">Target: ₹{rec.recommended.toLocaleString()}</span>
                  </div>
                  <p className="text-sm text-navy/70">{rec.tip}</p>
                  
                  {diff !== 0 && (
                    <div className="mt-2 text-xs font-medium">
                      {diff > 0 ? (
                        <span className="text-red-600">Over by ₹{Math.abs(diff).toLocaleString()}</span>
                      ) : (
                        <span className="text-green-600">Under by ₹{Math.abs(diff).toLocaleString()}</span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>
    </motion.div>
  )
}
