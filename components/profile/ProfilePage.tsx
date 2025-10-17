'use client'
import { motion } from 'framer-motion'
import { User, Mail, Calendar, Trophy, Target, TrendingUp, Settings, LogOut } from 'lucide-react'
import { Button } from '@/components/ui/Button'

interface ProfilePageProps {
  onClose: () => void
}

export function ProfilePage({ onClose }: ProfilePageProps) {
  const userStats = {
    name: 'John Doe',
    email: 'john@example.com',
    joinDate: 'January 2024',
    totalSavings: 25000,
    level: 5,
    xp: 1250,
    goalsCompleted: 3,
    streakDays: 12
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-poppins font-bold">Profile</h2>
        <Button variant="ghost" onClick={onClose}>✕</Button>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card bg-gradient-to-r from-mint/20 to-sky/20"
      >
        <div className="flex items-center gap-6">
          <div className="w-20 h-20 bg-gradient-to-r from-mint to-sky rounded-full flex items-center justify-center text-3xl text-navy">
            👤
          </div>
          <div>
            <h3 className="text-2xl font-bold">{userStats.name}</h3>
            <p className="text-navy/60 flex items-center gap-2">
              <Mail className="w-4 h-4" />
              {userStats.email}
            </p>
            <p className="text-navy/60 flex items-center gap-2 mt-1">
              <Calendar className="w-4 h-4" />
              Joined {userStats.joinDate}
            </p>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="card text-center"
        >
          <TrendingUp className="w-8 h-8 text-mint mx-auto mb-2" />
          <p className="text-2xl font-bold">₹{userStats.totalSavings.toLocaleString()}</p>
          <p className="text-sm text-navy/60">Total Savings</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="card text-center"
        >
          <Trophy className="w-8 h-8 text-lavender mx-auto mb-2" />
          <p className="text-2xl font-bold">Level {userStats.level}</p>
          <p className="text-sm text-navy/60">{userStats.xp} XP</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="card text-center"
        >
          <Target className="w-8 h-8 text-sky mx-auto mb-2" />
          <p className="text-2xl font-bold">{userStats.goalsCompleted}</p>
          <p className="text-sm text-navy/60">Goals Completed</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="card text-center"
        >
          <div className="text-2xl mb-2">🔥</div>
          <p className="text-2xl font-bold">{userStats.streakDays}</p>
          <p className="text-sm text-navy/60">Day Streak</p>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card"
      >
        <h3 className="text-xl font-poppins font-bold mb-4">Account Settings</h3>
        <div className="space-y-3">
          <button className="w-full flex items-center gap-3 p-3 bg-white/10 rounded-2xl hover:bg-white/20 transition-colors">
            <Settings className="w-5 h-5" />
            <span>Edit Profile</span>
          </button>
          <button className="w-full flex items-center gap-3 p-3 bg-white/10 rounded-2xl hover:bg-white/20 transition-colors">
            <User className="w-5 h-5" />
            <span>Privacy Settings</span>
          </button>
          <button className="w-full flex items-center gap-3 p-3 bg-coral/20 rounded-2xl hover:bg-coral/30 transition-colors text-coral">
            <LogOut className="w-5 h-5" />
            <span>Sign Out</span>
          </button>
        </div>
      </motion.div>
    </div>
  )
}