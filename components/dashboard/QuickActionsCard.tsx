'use client'
import { motion } from 'framer-motion'
import { Plus, Mic, Camera, TrendingUp } from 'lucide-react'

interface QuickActionsCardProps {
  onAction: (action: string) => void
}

export function QuickActionsCard({ onAction }: QuickActionsCardProps) {
  const actions = [
    { id: 'expense', icon: Plus, label: 'Add Expense', color: 'mint' },
    { id: 'voice', icon: Mic, label: 'Voice Input', color: 'sky' },
    { id: 'scan', icon: Camera, label: 'Scan Receipt', color: 'coral' },
    { id: 'insights', icon: TrendingUp, label: 'View Insights', color: 'lavender' },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="card"
    >
      <h3 className="font-semibold mb-4">Quick Actions</h3>
      
      <div className="grid grid-cols-2 gap-3">
        {actions.map((action, i) => (
          <motion.button
            key={action.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            onClick={() => onAction(action.id)}
            className={`p-4 rounded-xl bg-${action.color}/10 hover:bg-${action.color}/20 transition-colors flex flex-col items-center gap-2`}
          >
            <action.icon className={`w-5 h-5 text-${action.color}`} />
            <span className="text-xs font-medium text-navy/80">{action.label}</span>
          </motion.button>
        ))}
      </div>
    </motion.div>
  )
}
