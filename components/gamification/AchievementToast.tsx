'use client'
import { motion, AnimatePresence } from 'framer-motion'
import { Trophy } from 'lucide-react'
import { Achievement } from '@/lib/gamification/achievements'

interface AchievementToastProps {
  achievement: Achievement | null
  onClose: () => void
}

export function AchievementToast({ achievement, onClose }: AchievementToastProps) {
  if (!achievement) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -100, scale: 0.8 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -100, scale: 0.8 }}
        className="fixed top-6 left-1/2 -translate-x-1/2 z-50"
      >
        <div className="card bg-gradient-to-r from-yellow-400 to-orange-500 text-white shadow-2xl min-w-[300px]">
          <div className="flex items-center gap-4">
            <div className="text-4xl">{achievement.icon}</div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <Trophy className="w-4 h-4" />
                <span className="font-bold text-sm">Achievement Unlocked!</span>
              </div>
              <h3 className="font-bold text-lg">{achievement.title}</h3>
              <p className="text-sm opacity-90">{achievement.description}</p>
              <p className="text-xs mt-1 font-semibold">+{achievement.xp} XP</p>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
