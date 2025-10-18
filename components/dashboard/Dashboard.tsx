'use client'
import { motion } from 'framer-motion'
import { Sprout, TrendingUp, Target, Award, Trophy, Bell, Users, Brain } from 'lucide-react'
import { Button } from '@/components/ui/Button'

interface DashboardProps {
  setActiveTab: (tab: string) => void
  showNotification: (message: string, emoji?: string) => void
}

export function Dashboard({ setActiveTab, showNotification }: DashboardProps) {
  return (
    <div className="min-h-screen p-6 space-y-8">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4 mb-6 lg:mb-8"
      >
        <motion.div
          animate={{ rotate: [0, 5, -5, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-6xl"
        >
          🌱
        </motion.div>
        <h1 className="text-2xl md:text-4xl font-poppins font-bold bg-gradient-to-r from-mint to-sky bg-clip-text text-transparent">
          Welcome back! 
        </h1>
        <p className="text-base md:text-lg text-navy/70">You have ₹24,500 remaining this month! 💰</p>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {(() => {
          const monthlyIncome = 50000 // Default income
          const totalExpenses = 25500 // Demo expenses
          const balance = monthlyIncome - totalExpenses
          const savingsRate = Math.round((balance / monthlyIncome) * 100)
          
          return [
            { icon: TrendingUp, label: 'Balance', value: `₹${balance.toLocaleString()}`, color: balance >= 0 ? 'mint' : 'coral' },
            { icon: Target, label: 'Goal Progress', value: '70%', color: 'sky' },
            { icon: Award, label: 'XP Level', value: 'Level 5', color: 'coral' },
            { icon: Sprout, label: 'Savings Rate', value: `${savingsRate}%`, color: 'lavender' }
          ]
        })().map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="card group hover:scale-105"
          >
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-2xl bg-${stat.color}/20`}>
                <stat.icon className={`w-6 h-6 text-${stat.color}`} />
              </div>
              <div>
                <p className="text-sm text-navy/60">{stat.label}</p>
                <p className={`text-2xl font-bold ${stat.label === 'Balance' && stat.value.includes('-') ? 'text-red-600' : 'text-navy'}`}>
                  {stat.value}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="card"
      >
        <h2 className="text-xl md:text-2xl font-poppins font-bold mb-4 md:mb-6">Quick Actions</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
          <Button 
            onClick={() => setActiveTab('tracker')} 
            variant="secondary" 
            className="flex-col h-16 md:h-20 gap-1 md:gap-2 text-xs md:text-sm"
          >
            <span className="text-2xl">💸</span>
            <span className="text-sm">Add Expense</span>
          </Button>
          <Button 
            onClick={() => setActiveTab('goalSetting')} 
            variant="secondary" 
            className="flex-col h-16 md:h-20 gap-1 md:gap-2 text-xs md:text-sm"
          >
            <span className="text-2xl">🎯</span>
            <span className="text-sm">Set Goal</span>
          </Button>
          <Button 
            onClick={() => setActiveTab('chat')} 
            variant="secondary" 
            className="flex-col h-16 md:h-20 gap-1 md:gap-2 text-xs md:text-sm"
          >
            <span className="text-2xl">🤖</span>
            <span className="text-sm">Chat Coach</span>
          </Button>
          <Button 
            onClick={() => showNotification('Reports feature coming soon!', '📊')} 
            variant="secondary" 
            className="flex-col h-16 md:h-20 gap-1 md:gap-2 text-xs md:text-sm"
          >
            <span className="text-2xl">📊</span>
            <span className="text-sm">View Reports</span>
          </Button>
        </div>
      </motion.div>

      {/* Additional Features */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="card cursor-pointer hover:scale-105"
          onClick={() => setActiveTab('achievements')}
        >
          <div className="flex items-center gap-3 mb-3">
            <Trophy className="w-6 h-6 text-lavender" />
            <h3 className="font-bold">Achievements</h3>
          </div>
          <p className="text-sm text-navy/60">Track your progress and earn rewards</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="card cursor-pointer hover:scale-105"
          onClick={() => setActiveTab('bills')}
        >
          <div className="flex items-center gap-3 mb-3">
            <Bell className="w-6 h-6 text-coral" />
            <h3 className="font-bold">Bill Reminders</h3>
          </div>
          <p className="text-sm text-navy/60">Never miss a payment again</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="card cursor-pointer hover:scale-105"
          onClick={() => setActiveTab('investments')}
        >
          <div className="flex items-center gap-3 mb-3">
            <TrendingUp className="w-6 h-6 text-mint" />
            <h3 className="font-bold">Investments</h3>
          </div>
          <p className="text-sm text-navy/60">Grow your wealth with smart investing</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
          className="card cursor-pointer hover:scale-105"
          onClick={() => setActiveTab('social')}
        >
          <div className="flex items-center gap-3 mb-3">
            <Users className="w-6 h-6 text-sky" />
            <h3 className="font-bold">Social Challenges</h3>
          </div>
          <p className="text-sm text-navy/60">Join friends in savings challenges</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1 }}
          className="card cursor-pointer hover:scale-105"
          onClick={() => setActiveTab('insights')}
        >
          <div className="flex items-center gap-3 mb-3">
            <Brain className="w-6 h-6 text-lavender" />
            <h3 className="font-bold">AI Insights</h3>
          </div>
          <p className="text-sm text-navy/60">Get personalized financial advice</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="card cursor-pointer hover:scale-105"
          onClick={() => setActiveTab('games')}
        >
          <div className="flex items-center gap-3 mb-3">
            <span className="text-2xl">🎮</span>
            <h3 className="font-bold">Savings Games</h3>
          </div>
          <p className="text-sm text-navy/60">Learn through fun challenges</p>
        </motion.div>
      </div>

      {/* Motivational Quote */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.7 }}
        className="card text-center bg-gradient-to-r from-mint/20 to-sky/20"
      >
        <p className="text-lg font-medium text-navy mb-2">
          "Every rupee saved is a step towards your dreams! 🌟"
        </p>
        <p className="text-sm text-navy/60">- Your FinCoach</p>
      </motion.div>
    </div>
  )
}