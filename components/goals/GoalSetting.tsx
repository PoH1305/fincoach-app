'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, Plus, Target, Music, Building, Laptop, Car, Home, Plane, GraduationCap, Trophy } from 'lucide-react'
import { Button } from '@/components/ui/Button'

interface Goal {
  id: string
  title: string
  targetAmount: number
  currentAmount: number
  icon: string
  color: string
  deadline: string
  category: string
}

interface GoalSettingProps {
  onBack: () => void
}

export function GoalSetting({ onBack }: GoalSettingProps) {
  const [goals, setGoals] = useState<Goal[]>([
    {
      id: '1',
      title: 'Concert Tickets',
      targetAmount: 12000,
      currentAmount: 8000,
      icon: '🎵',
      color: 'from-purple-400 to-purple-600',
      deadline: '2024-12-31',
      category: 'Entertainment'
    },
    {
      id: '2',
      title: 'Emergency Fund',
      targetAmount: 100000,
      currentAmount: 20000,
      icon: '🏥',
      color: 'from-red-400 to-red-600',
      deadline: '2025-06-30',
      category: 'Safety'
    },
    {
      id: '3',
      title: 'New Laptop',
      targetAmount: 80000,
      currentAmount: 0,
      icon: '💻',
      color: 'from-blue-400 to-blue-600',
      deadline: '2024-11-30',
      category: 'Technology'
    }
  ])

  const [showAddGoal, setShowAddGoal] = useState(false)
  const [newGoal, setNewGoal] = useState({
    title: '',
    targetAmount: '',
    deadline: '',
    category: 'Personal',
    icon: '🎯'
  })

  const goalCategories = [
    { name: 'Entertainment', icon: '🎵', color: 'from-purple-400 to-purple-600' },
    { name: 'Emergency', icon: '🏥', color: 'from-red-400 to-red-600' },
    { name: 'Technology', icon: '💻', color: 'from-blue-400 to-blue-600' },
    { name: 'Travel', icon: '✈️', color: 'from-green-400 to-green-600' },
    { name: 'Education', icon: '🎓', color: 'from-yellow-400 to-yellow-600' },
    { name: 'Home', icon: '🏠', color: 'from-indigo-400 to-indigo-600' },
    { name: 'Vehicle', icon: '🚗', color: 'from-orange-400 to-orange-600' },
    { name: 'Personal', icon: '🎯', color: 'from-pink-400 to-pink-600' }
  ]

  const getProgress = (current: number, target: number) => {
    return Math.min((current / target) * 100, 100)
  }

  const addGoal = () => {
    if (!newGoal.title || !newGoal.targetAmount) return

    const selectedCategory = goalCategories.find(cat => cat.name === newGoal.category)
    const goal: Goal = {
      id: Date.now().toString(),
      title: newGoal.title,
      targetAmount: parseInt(newGoal.targetAmount),
      currentAmount: 0,
      icon: selectedCategory?.icon || '🎯',
      color: selectedCategory?.color || 'from-mint-400 to-mint-600',
      deadline: newGoal.deadline,
      category: newGoal.category
    }

    setGoals(prev => [...prev, goal])
    setNewGoal({ title: '', targetAmount: '', deadline: '', category: 'Personal', icon: '🎯' })
    setShowAddGoal(false)
  }

  const updateGoalProgress = (goalId: string, amount: number) => {
    setGoals(prev => prev.map(goal => 
      goal.id === goalId 
        ? { ...goal, currentAmount: Math.min(goal.currentAmount + amount, goal.targetAmount) }
        : goal
    ))
  }

  const totalSaved = goals.reduce((sum, goal) => sum + goal.currentAmount, 0)
  const completedGoals = goals.filter(goal => goal.currentAmount >= goal.targetAmount).length

  return (
    <div className="min-h-screen bg-gradient-to-br from-mint/20 via-sky/20 to-lavender/20 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button onClick={onBack} variant="ghost" size="sm">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <div>
            <h1 className="font-poppins font-bold text-2xl text-navy">My Goals</h1>
            <p className="text-navy/60">Track your financial dreams and make them reality</p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="card text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">{goals.length}</div>
            <div className="text-navy/60">Active Goals</div>
          </div>
          <div className="card text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">₹{totalSaved.toLocaleString()}</div>
            <div className="text-navy/60">Total Saved</div>
          </div>
          <div className="card text-center">
            <div className="text-3xl font-bold text-orange-600 mb-2">{completedGoals}</div>
            <div className="text-navy/60">Completed</div>
          </div>
        </div>

        {/* Goals Section */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-poppins font-bold text-xl text-navy flex items-center gap-2">
            <Target className="w-6 h-6 text-purple-600" />
            My Goals
          </h2>
          <Button onClick={() => setShowAddGoal(true)} className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Add Goal
          </Button>
        </div>

        {/* Goals List */}
        <div className="space-y-4 mb-8">
          <AnimatePresence>
            {goals.map((goal) => {
              const progress = getProgress(goal.currentAmount, goal.targetAmount)
              return (
                <motion.div
                  key={goal.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="card hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${goal.color} flex items-center justify-center text-2xl`}>
                        {goal.icon}
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg text-navy">{goal.title}</h3>
                        <p className="text-sm text-navy/60">
                          ₹{goal.currentAmount.toLocaleString()} of ₹{goal.targetAmount.toLocaleString()}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-purple-600">{Math.round(progress)}%</div>
                      <div className="text-xs text-navy/60">Complete</div>
                    </div>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className={`h-3 rounded-full bg-gradient-to-r ${goal.color}`}
                    />
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => updateGoalProgress(goal.id, 1000)}
                      className="flex-1"
                    >
                      Add ₹1,000
                    </Button>
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => updateGoalProgress(goal.id, 5000)}
                      className="flex-1"
                    >
                      Add ₹5,000
                    </Button>
                  </div>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </div>

        {/* Achievements Section */}
        <div className="card">
          <h3 className="font-poppins font-bold text-lg mb-4 flex items-center gap-2">
            <Trophy className="w-5 h-5 text-yellow-600" />
            Achievements
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-red-100 rounded-xl">
              <div className="text-3xl mb-2">🎯</div>
              <div className="text-sm font-medium">First Goal</div>
            </div>
            <div className="text-center p-4 bg-orange-100 rounded-xl">
              <div className="text-3xl mb-2">🔥</div>
              <div className="text-sm font-medium">On Fire</div>
            </div>
            <div className="text-center p-4 bg-gray-100 rounded-xl opacity-50">
              <div className="text-3xl mb-2">💎</div>
              <div className="text-sm font-medium">Diamond</div>
            </div>
            <div className="text-center p-4 bg-gray-100 rounded-xl opacity-50">
              <div className="text-3xl mb-2">👑</div>
              <div className="text-sm font-medium">Champion</div>
            </div>
          </div>
        </div>

        {/* Add Goal Modal */}
        <AnimatePresence>
          {showAddGoal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="card max-w-md w-full"
              >
                <h3 className="font-poppins font-bold text-xl mb-6">Add New Goal</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Goal Title</label>
                    <input
                      type="text"
                      value={newGoal.title}
                      onChange={(e) => setNewGoal(prev => ({ ...prev, title: e.target.value }))}
                      placeholder="e.g., New iPhone"
                      className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-mint/50 focus:border-mint"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Target Amount (₹)</label>
                    <input
                      type="number"
                      value={newGoal.targetAmount}
                      onChange={(e) => setNewGoal(prev => ({ ...prev, targetAmount: e.target.value }))}
                      placeholder="50000"
                      className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-mint/50 focus:border-mint"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Category</label>
                    <select
                      value={newGoal.category}
                      onChange={(e) => setNewGoal(prev => ({ ...prev, category: e.target.value }))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-mint/50 focus:border-mint"
                    >
                      {goalCategories.map(category => (
                        <option key={category.name} value={category.name}>
                          {category.icon} {category.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Target Date</label>
                    <input
                      type="date"
                      value={newGoal.deadline}
                      onChange={(e) => setNewGoal(prev => ({ ...prev, deadline: e.target.value }))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-mint/50 focus:border-mint"
                    />
                  </div>
                </div>
                
                <div className="flex gap-3 mt-6">
                  <Button
                    variant="secondary"
                    onClick={() => setShowAddGoal(false)}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  <Button onClick={addGoal} className="flex-1">
                    Add Goal
                  </Button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}