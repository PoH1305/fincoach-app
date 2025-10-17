'use client'
import { motion } from 'framer-motion'
import { Trophy, Star } from 'lucide-react'

const achievements = [
  { id: 'first_save', title: 'First Save', emoji: '🌱', description: 'Made your first expense entry', unlocked: true, xp: 50 },
  { id: 'week_streak', title: '7-Day Streak', emoji: '🔥', description: 'Tracked expenses for 7 days', unlocked: true, xp: 100 },
  { id: 'goal_crusher', title: 'Goal Crusher', emoji: '🏆', description: 'Completed your first savings goal', unlocked: false, xp: 200 },
  { id: 'budget_master', title: 'Budget Master', emoji: '💎', description: 'Stayed under budget for a month', unlocked: false, xp: 300 },
  { id: 'investment_pro', title: 'Investment Pro', emoji: '📈', description: 'Started your first investment', unlocked: false, xp: 250 },
  { id: 'social_saver', title: 'Social Saver', emoji: '👥', description: 'Joined a savings challenge', unlocked: false, xp: 150 }
]

export function AchievementSystem() {
  const unlockedCount = achievements.filter(a => a.unlocked).length
  const totalXP = achievements.filter(a => a.unlocked).reduce((sum, a) => sum + a.xp, 0)
  const level = Math.floor(totalXP / 100) + 1

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card bg-gradient-to-r from-lavender/20 to-mint/20"
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-2xl font-poppins font-bold">Level {level}</h3>
            <p className="text-navy/60">{totalXP} XP • {unlockedCount}/{achievements.length} achievements</p>
          </div>
          <Trophy className="w-10 h-10 text-lavender" />
        </div>
        
        <div className="w-full bg-white/20 rounded-full h-3">
          <motion.div
            className="bg-gradient-to-r from-lavender to-mint h-3 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${((totalXP % 100) / 100) * 100}%` }}
            transition={{ duration: 1, delay: 0.5 }}
          />
        </div>
        <p className="text-xs text-navy/60 mt-2">{100 - (totalXP % 100)} XP to next level</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {achievements.map((achievement, index) => (
          <motion.div
            key={achievement.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className={`card ${achievement.unlocked 
              ? 'bg-gradient-to-br from-mint/20 to-sky/20 border-mint/30' 
              : 'bg-white/10 opacity-60'
            }`}
          >
            <div className="text-center space-y-3">
              <motion.div
                animate={achievement.unlocked ? { rotate: [0, 10, -10, 0] } : {}}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-4xl"
              >
                {achievement.unlocked ? achievement.emoji : '🔒'}
              </motion.div>
              
              <div>
                <h4 className="font-bold">{achievement.title}</h4>
                <p className="text-sm text-navy/60">{achievement.description}</p>
              </div>
              
              <div className="flex items-center justify-center gap-1">
                <Star className="w-4 h-4 text-lavender" />
                <span className="text-sm font-medium">{achievement.xp} XP</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}