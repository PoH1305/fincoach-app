'use client'
import { motion } from 'framer-motion'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts'
import { getGoalMilestones } from '@/lib/ai/goalPredictor'

interface Goal {
  id: string
  title: string
  targetAmount: number
  currentAmount: number
  deadline: string
}

interface GoalTimelineViewProps {
  goal: Goal
  prediction: any
}

export function GoalTimelineView({ goal, prediction }: GoalTimelineViewProps) {
  const milestones = getGoalMilestones(goal, prediction)
  
  const chartData = [
    { month: 0, amount: goal.currentAmount, label: 'Now' },
    ...milestones.map(m => ({ month: m.month, amount: m.amount, label: `M${m.month}` }))
  ]

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="card"
    >
      <h3 className="font-bold mb-4">Goal Timeline</h3>
      
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={chartData}>
          <XAxis dataKey="label" stroke="#94a3b8" fontSize={12} />
          <YAxis stroke="#94a3b8" fontSize={12} />
          <Tooltip 
            formatter={(value: number) => `₹${value.toLocaleString()}`}
            contentStyle={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px' }}
          />
          <ReferenceLine 
            y={goal.targetAmount} 
            stroke="#10B981" 
            strokeDasharray="3 3"
            label={{ value: 'Target', position: 'right', fill: '#10B981' }}
          />
          <Line 
            type="monotone" 
            dataKey="amount" 
            stroke="#3B82F6" 
            strokeWidth={2}
            dot={{ fill: '#3B82F6', r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>

      <div className="mt-4 flex items-center justify-between text-sm">
        <span className="text-navy/60">Current: ₹{goal.currentAmount.toLocaleString()}</span>
        <span className="text-navy/60">Target: ₹{goal.targetAmount.toLocaleString()}</span>
      </div>
    </motion.div>
  )
}
