'use client'
import { motion } from 'framer-motion'
import { Target, TrendingUp, Calendar, AlertCircle, CheckCircle } from 'lucide-react'
import { predictGoalCompletion, getGoalMilestones } from '@/lib/ai/goalPredictor'
import { useBudgetStore } from '@/lib/stores/budgetStore'

interface Goal {
  id: string
  title: string
  targetAmount: number
  currentAmount: number
  deadline: string
}

interface GoalPredictionCardProps {
  goal: Goal
}

export function GoalPredictionCard({ goal }: GoalPredictionCardProps) {
  const { expenses } = useBudgetStore()
  const prediction = predictGoalCompletion(goal, expenses, 50000)
  const progress = (goal.currentAmount / goal.targetAmount) * 100
  const milestones = getGoalMilestones(goal, prediction)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="card"
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="font-bold text-lg">{goal.title}</h3>
          <p className="text-sm text-navy/60">
            ₹{goal.currentAmount.toLocaleString()} / ₹{goal.targetAmount.toLocaleString()}
          </p>
        </div>
        <Target className="w-6 h-6 text-mint" />
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="h-2 bg-navy/10 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="h-full bg-gradient-to-r from-mint to-sky"
          />
        </div>
        <p className="text-xs text-navy/60 mt-1">{progress.toFixed(0)}% complete</p>
      </div>

      {/* Prediction */}
      <div className="space-y-3 mb-4">
        <div className="flex items-center gap-2">
          {prediction.onTrack ? (
            <CheckCircle className="w-4 h-4 text-mint" />
          ) : (
            <AlertCircle className="w-4 h-4 text-coral" />
          )}
          <span className="text-sm font-medium">
            {prediction.onTrack ? 'On Track' : 'Needs Adjustment'}
          </span>
          <span className="ml-auto text-xs text-navy/60">
            {(prediction.confidence * 100).toFixed(0)}% confidence
          </span>
        </div>

        <div className="flex items-center gap-2 text-sm">
          <Calendar className="w-4 h-4 text-sky" />
          <span className="text-navy/70">
            Expected: {new Date(prediction.completionDate).toLocaleDateString()}
          </span>
        </div>

        <div className="flex items-center gap-2 text-sm">
          <TrendingUp className="w-4 h-4 text-coral" />
          <span className="text-navy/70">
            Save ₹{prediction.requiredMonthly.toLocaleString()}/month
          </span>
        </div>
      </div>

      {/* Recommendation */}
      <div className="p-3 bg-mint/10 rounded-xl">
        <p className="text-sm text-navy/80">💡 {prediction.recommendation}</p>
      </div>

      {/* Milestones */}
      {milestones.length > 0 && (
        <div className="mt-4 pt-4 border-t border-navy/10">
          <p className="text-xs font-medium text-navy/60 mb-2">Next Milestones</p>
          <div className="space-y-2">
            {milestones.slice(0, 3).map((milestone, i) => (
              <div key={i} className="flex justify-between text-xs">
                <span className="text-navy/60">Month {milestone.month}</span>
                <span className="font-medium">₹{milestone.amount.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  )
}
