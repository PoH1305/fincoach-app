'use client'
import { motion } from 'framer-motion'
import { Crown } from 'lucide-react'

interface PremiumBadgeProps {
  plan: string
  onClick?: () => void
}

export function PremiumBadge({ plan, onClick }: PremiumBadgeProps) {
  if (plan === 'free') {
    return (
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onClick}
        className="px-3 py-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-full text-xs font-bold flex items-center gap-1"
      >
        <Crown className="w-3 h-3" />
        Upgrade
      </motion.button>
    )
  }

  return (
    <div className="px-3 py-1 bg-gradient-to-r from-mint to-sky text-white rounded-full text-xs font-bold flex items-center gap-1">
      <Crown className="w-3 h-3" />
      {plan === 'premium' ? 'Premium' : 'Pro'}
    </div>
  )
}
