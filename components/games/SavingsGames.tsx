'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/Button'

const games = [
  {
    id: 1,
    title: '30-Day Savings Challenge',
    description: 'Save ₹1 on day 1, ₹2 on day 2... ₹30 on day 30',
    totalSavings: 465,
    currentDay: 7,
    icon: '🎯',
    difficulty: 'Easy',
    active: true
  },
  {
    id: 2,
    title: 'Coffee Cup Challenge',
    description: 'Skip one coffee purchase = ₹100 saved',
    totalSavings: 500,
    currentDay: 5,
    icon: '☕',
    difficulty: 'Easy',
    active: true
  },
  {
    id: 3,
    title: 'Spare Change Game',
    description: 'Round up purchases and save the change',
    totalSavings: 1250,
    currentDay: 15,
    icon: '🪙',
    difficulty: 'Medium',
    active: false
  }
]

const scenarios = [
  {
    title: 'Emergency Fund Simulator',
    description: 'Your car breaks down! Do you have ₹15,000 saved?',
    options: ['Use savings ✅', 'Take loan ❌', 'Ask family ❌'],
    lesson: 'Emergency funds prevent debt and stress'
  },
  {
    title: 'Investment Growth Game',
    description: 'You have ₹10,000. Where do you invest?',
    options: ['Mutual Fund (+12%)', 'Fixed Deposit (+6%)', 'Keep cash (0%)'],
    lesson: 'Investing beats inflation and grows wealth'
  }
]

export function SavingsGames() {
  const [selectedScenario, setSelectedScenario] = useState(0)

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4"
      >
        <div className="text-6xl">🎮</div>
        <h2 className="text-3xl font-poppins font-bold">Savings Games</h2>
        <p className="text-navy/60">Learn to save money through fun challenges and scenarios</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card bg-gradient-to-r from-mint/20 to-sky/20"
      >
        <h3 className="text-xl font-poppins font-bold mb-4">Your Active Challenges</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {games.filter(game => game.active).map((game) => (
            <div key={game.id} className="bg-white/20 p-4 rounded-2xl">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">{game.icon}</span>
                <div>
                  <h4 className="font-bold">{game.title}</h4>
                  <p className="text-sm text-navy/60">Day {game.currentDay}</p>
                </div>
              </div>
              <div className="mb-3">
                <div className="flex justify-between text-sm mb-1">
                  <span>Progress</span>
                  <span>{Math.round((game.currentDay / 30) * 100)}%</span>
                </div>
                <div className="w-full bg-white/20 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-mint to-sky h-2 rounded-full"
                    style={{ width: `${(game.currentDay / 30) * 100}%` }}
                  />
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold text-mint">₹{game.totalSavings}</span>
                <Button size="sm">Continue</Button>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {games.filter(game => !game.active).map((game, index) => (
          <motion.div
            key={game.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className="card hover:scale-105 cursor-pointer"
          >
            <div className="text-center space-y-4">
              <div className="text-4xl">{game.icon}</div>
              <div>
                <h3 className="font-bold text-lg">{game.title}</h3>
                <p className="text-sm text-navy/60 mt-2">{game.description}</p>
              </div>
              <div className="flex justify-between items-center">
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-mint/20 text-mint">
                  {game.difficulty}
                </span>
                <span className="font-bold text-mint">₹{game.totalSavings}</span>
              </div>
              <Button className="w-full">Start Challenge</Button>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card"
      >
        <h3 className="text-xl font-poppins font-bold mb-4">💡 Scenario Simulator</h3>
        <div className="bg-gradient-to-r from-lavender/20 to-coral/20 p-6 rounded-2xl">
          <h4 className="font-bold text-lg mb-3">{scenarios[selectedScenario].title}</h4>
          <p className="text-navy/70 mb-4">{scenarios[selectedScenario].description}</p>
          
          <div className="space-y-2 mb-4">
            {scenarios[selectedScenario].options.map((option, index) => (
              <button
                key={index}
                className="w-full p-3 text-left bg-white/20 rounded-xl hover:bg-white/30 transition-colors"
              >
                {option}
              </button>
            ))}
          </div>
          
          <div className="bg-mint/20 p-3 rounded-xl">
            <p className="text-sm font-medium">💡 Lesson: {scenarios[selectedScenario].lesson}</p>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card bg-gradient-to-r from-sky/20 to-mint/20"
      >
        <h3 className="text-xl font-poppins font-bold mb-4">🧠 Quick Savings Quiz</h3>
        <div className="p-4 bg-white/20 rounded-2xl">
          <p className="font-medium mb-3">Which saves more money in a year?</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <button className="p-3 bg-mint/20 rounded-xl hover:bg-mint/30 transition-colors">
              A) Skip ₹100 coffee daily
            </button>
            <button className="p-3 bg-white/20 rounded-xl hover:bg-white/30 transition-colors">
              B) Cancel ₹500 subscription
            </button>
          </div>
          <p className="text-xs text-mint mt-2">💡 Answer: A saves ₹36,500/year vs B saves ₹6,000/year</p>
        </div>
      </motion.div>
    </div>
  )
}