'use client'
import { motion } from 'framer-motion'
import { Star } from 'lucide-react'
import { calculateLevel } from '@/lib/gamification/achievements'

interface XPBarProps {
  xp: number
}

export function XPBar({ xp }: XPBarProps) {
  const { level, xpForNext, progress } = calculateLevel(xp)

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="card bg-gradient-to-r from-purple-500/10 to-pink-500/10"
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <Star className="w-5 h-5 text-yellow-500" />
          <span className="font-bold">Level {level}</span>
        </div>
        <span className="text-sm text-navy/60">{xp} XP</span>
      </div>
      
      <div className="h-2 bg-navy/10 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
        />
      </div>
      
      <p className="text-xs text-navy/60 mt-1">
        {Math.round(progress)}% to Level {level + 1}
      </p>
    </motion.div>
  )
}
