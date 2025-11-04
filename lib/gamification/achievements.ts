export interface Achievement {
  id: string
  title: string
  description: string
  icon: string
  xp: number
  unlocked: boolean
  progress?: number
  target?: number
}

export const ACHIEVEMENTS: Achievement[] = [
  { id: 'first_save', title: 'First Save', description: 'Add your first expense', icon: '🌱', xp: 100, unlocked: false },
  { id: 'week_streak', title: '7-Day Streak', description: 'Track expenses for 7 days', icon: '🔥', xp: 500, unlocked: false, progress: 0, target: 7 },
  { id: 'budget_master', title: 'Budget Master', description: 'Stay under budget for 3 months', icon: '🎯', xp: 1000, unlocked: false, progress: 0, target: 3 },
  { id: 'goal_achiever', title: 'Goal Achiever', description: 'Complete your first goal', icon: '🏆', xp: 750, unlocked: false },
  { id: 'saver_100', title: 'Century Saver', description: 'Save ₹100,000', icon: '💰', xp: 2000, unlocked: false, progress: 0, target: 100000 },
  { id: 'chat_master', title: 'Chat Master', description: 'Have 10 AI conversations', icon: '💬', xp: 300, unlocked: false, progress: 0, target: 10 },
]

export function checkAchievements(userStats: {
  expenseCount: number
  streak: number
  monthsUnderBudget: number
  goalsCompleted: number
  totalSaved: number
  chatCount: number
}): Achievement[] {
  const unlocked: Achievement[] = []

  ACHIEVEMENTS.forEach(achievement => {
    let shouldUnlock = false

    switch (achievement.id) {
      case 'first_save':
        shouldUnlock = userStats.expenseCount >= 1
        break
      case 'week_streak':
        shouldUnlock = userStats.streak >= 7
        achievement.progress = userStats.streak
        break
      case 'budget_master':
        shouldUnlock = userStats.monthsUnderBudget >= 3
        achievement.progress = userStats.monthsUnderBudget
        break
      case 'goal_achiever':
        shouldUnlock = userStats.goalsCompleted >= 1
        break
      case 'saver_100':
        shouldUnlock = userStats.totalSaved >= 100000
        achievement.progress = userStats.totalSaved
        break
      case 'chat_master':
        shouldUnlock = userStats.chatCount >= 10
        achievement.progress = userStats.chatCount
        break
    }

    if (shouldUnlock && !achievement.unlocked) {
      achievement.unlocked = true
      unlocked.push(achievement)
    }
  })

  return unlocked
}

export function calculateLevel(xp: number): { level: number; xpForNext: number; progress: number } {
  const level = Math.floor(xp / 1000) + 1
  const xpInLevel = xp % 1000
  const xpForNext = 1000
  const progress = (xpInLevel / xpForNext) * 100

  return { level, xpForNext, progress }
}
