'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Plus, TrendingDown, TrendingUp } from 'lucide-react'
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from 'recharts'
import { Button } from '@/components/ui/Button'
import { saveExpense, getUserExpenses } from '../../lib/firebase'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../../lib/firebase'
import { proactiveAI } from '../../lib/proactiveAI'
import { useAppStore } from '../../lib/store'

const categories = [
  { name: 'Food', color: '#FF6F61', icon: '🍽️' },
  { name: 'Transport', color: '#89CFF0', icon: '🚗' },
  { name: 'Bills', color: '#A8E6CF', icon: '💡' },
  { name: 'Entertainment', color: '#CDB4DB', icon: '🎬' },
  { name: 'Shopping', color: '#FFB6C1', icon: '🛍️' }
]

export function ExpenseTracker() {
  const { user, expenses, addExpense, setExpenses } = useAppStore()
  const [monthlyIncome, setMonthlyIncome] = useState(50000)
  const [showIncomeForm, setShowIncomeForm] = useState(false)
  const [newIncome, setNewIncome] = useState('')
  
  useEffect(() => {
    if (expenses.length === 0) {
      const demoExpenses = [
        { id: '1', category: 'Food', amount: 1200, date: '2024-01-15', description: 'Lunch at cafe' },
        { id: '2', category: 'Transport', amount: 600, date: '2024-01-14', description: 'Uber ride' },
        { id: '3', category: 'Bills', amount: 900, date: '2024-01-13', description: 'Electricity bill' }
      ]
      setExpenses(demoExpenses)
    }
  }, [])
  

  
  const [showAddForm, setShowAddForm] = useState(false)
  const [newExpense, setNewExpense] = useState({ category: 'Food', amount: '', description: '' })

  const categoryTotals = categories.map(cat => ({
    name: cat.name,
    value: expenses.filter(e => e.category === cat.name).reduce((sum, e) => sum + e.amount, 0),
    color: cat.color,
    icon: cat.icon
  })).filter(cat => cat.value > 0)

  const totalSpent = expenses.reduce((sum, expense) => sum + expense.amount, 0)

  const handleAddExpense = () => {
    if (!newExpense.amount) return
    
    const expense = {
      id: Date.now().toString(),
      category: newExpense.category,
      amount: parseInt(newExpense.amount),
      date: new Date().toISOString().split('T')[0],
      description: newExpense.description || 'No description'
    }
    
    addExpense(expense)
    setNewExpense({ category: 'Food', amount: '', description: '' })
    setShowAddForm(false)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-poppins font-bold">Expense Tracker</h2>
          <p className="text-navy/60">Keep track of your spending 📊</p>
        </div>
        <div className="flex gap-3">
          <Button onClick={() => setShowAddForm(true)} className="gap-2">
            <Plus className="w-4 h-4" />
            Add Expense
          </Button>
          <Button onClick={() => setShowIncomeForm(true)} variant="secondary" className="gap-2">
            <TrendingUp className="w-4 h-4" />
            Add Income
          </Button>
        </div>
      </div>

      {/* Income vs Expense Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card bg-gradient-to-r from-mint/20 to-sky/20"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-navy/60">Monthly Income</p>
              <p className="text-4xl font-bold text-navy">₹{monthlyIncome.toLocaleString()}</p>
            </div>
            <div className="text-6xl">💰</div>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="card bg-gradient-to-r from-coral/20 to-lavender/20"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-navy/60">Total Spent This Month</p>
              <p className="text-4xl font-bold text-navy">₹{totalSpent.toLocaleString()}</p>
            </div>
            <div className="text-6xl">💸</div>
          </div>
        </motion.div>
      </div>
      
      {/* Balance Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="card bg-gradient-to-r from-purple/20 to-mint/20"
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-sm text-navy/60">Remaining Balance</p>
            <p className={`text-3xl font-bold ${(monthlyIncome - totalSpent) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              ₹{(monthlyIncome - totalSpent).toLocaleString()}
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-navy/60">Savings Rate</p>
            <p className="text-2xl font-bold text-purple-600">
              {Math.round(((monthlyIncome - totalSpent) / monthlyIncome) * 100)}%
            </p>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-4">
          <div 
            className={`h-4 rounded-full transition-all duration-500 ${
              totalSpent > monthlyIncome ? 'bg-red-500' : 'bg-green-500'
            }`}
            style={{ width: `${Math.min((totalSpent / monthlyIncome) * 100, 100)}%` }}
          />
        </div>
        <div className="flex justify-between text-xs text-navy/60 mt-2">
          <span>₹0</span>
          <span>₹{monthlyIncome.toLocaleString()}</span>
        </div>
      </motion.div>

      {/* Category Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {categoryTotals.map((category, index) => (
          <motion.div
            key={category.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="card hover:scale-105"
            style={{ borderLeft: `4px solid ${category.color}` }}
          >
            <div className="text-center space-y-2">
              <div className="text-3xl">{category.icon}</div>
              <h3 className="font-semibold">{category.name}</h3>
              <p className="text-2xl font-bold" style={{ color: category.color }}>
                ₹{category.value.toLocaleString()}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pie Chart */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="card"
        >
          <h3 className="text-xl font-poppins font-bold mb-4">Spending Breakdown</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryTotals}
                cx="50%"
                cy="50%"
                outerRadius={100}
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {categoryTotals.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Bar Chart */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="card"
        >
          <h3 className="text-xl font-poppins font-bold mb-4">Category Comparison</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={categoryTotals}>
              <XAxis dataKey="name" />
              <YAxis />
              <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                {categoryTotals.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Recent Transactions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card"
      >
        <h3 className="text-xl font-poppins font-bold mb-4">Recent Transactions</h3>
        <div className="space-y-3 max-h-80 overflow-y-auto">
          {expenses.slice(0, 8).map((expense, index) => {
            const category = categories.find(cat => cat.name === expense.category)
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="flex items-center justify-between p-3 bg-white/10 rounded-2xl hover:bg-white/20 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div 
                    className="w-10 h-10 rounded-full flex items-center justify-center text-lg"
                    style={{ backgroundColor: category?.color + '20' }}
                  >
                    {category?.icon}
                  </div>
                  <div>
                    <p className="font-medium">{expense.description}</p>
                    <p className="text-sm text-navy/60">{expense.category} • {expense.date}</p>
                  </div>
                </div>
                <p className="font-bold text-lg" style={{ color: category?.color }}>
                  -₹{expense.amount}
                </p>
              </motion.div>
            )
          })}
        </div>
      </motion.div>

      {/* Add Expense Modal */}
      {showAddForm && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={() => setShowAddForm(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="card max-w-md w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-2xl font-poppins font-bold mb-6">Add New Expense</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Category</label>
                <select
                  value={newExpense.category}
                  onChange={(e) => setNewExpense({...newExpense, category: e.target.value})}
                  className="w-full p-3 bg-white/20 backdrop-blur-md border border-white/30 rounded-2xl focus:outline-none focus:ring-2 focus:ring-mint/50"
                >
                  {categories.map(cat => (
                    <option key={cat.name} value={cat.name}>{cat.icon} {cat.name}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Amount (₹)</label>
                <input
                  type="number"
                  value={newExpense.amount}
                  onChange={(e) => setNewExpense({...newExpense, amount: e.target.value})}
                  className="w-full p-3 bg-white/20 backdrop-blur-md border border-white/30 rounded-2xl focus:outline-none focus:ring-2 focus:ring-mint/50"
                  placeholder="Enter amount"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Description</label>
                <input
                  type="text"
                  value={newExpense.description}
                  onChange={(e) => setNewExpense({...newExpense, description: e.target.value})}
                  className="w-full p-3 bg-white/20 backdrop-blur-md border border-white/30 rounded-2xl focus:outline-none focus:ring-2 focus:ring-mint/50"
                  placeholder="What did you buy?"
                />
              </div>
              
              <div className="flex gap-3">
                <Button variant="secondary" onClick={() => setShowAddForm(false)} className="flex-1">
                  Cancel
                </Button>
                <Button onClick={handleAddExpense} className="flex-1">
                  Add Expense
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
      
      {/* Add Income Modal */}
      {showIncomeForm && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={() => setShowIncomeForm(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="card max-w-md w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-2xl font-poppins font-bold mb-6">Set Monthly Income</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Monthly Income (₹)</label>
                <input
                  type="number"
                  value={newIncome}
                  onChange={(e) => setNewIncome(e.target.value)}
                  className="w-full p-3 bg-white/20 backdrop-blur-md border border-white/30 rounded-2xl focus:outline-none focus:ring-2 focus:ring-mint/50"
                  placeholder="Enter your monthly income"
                />
              </div>
              
              <div className="bg-mint/10 p-4 rounded-xl">
                <p className="text-sm text-navy/80">
                  💡 <strong>Tip:</strong> Include your salary, freelance income, and any other regular monthly earnings.
                </p>
              </div>
              
              <div className="flex gap-3">
                <Button 
                  variant="secondary" 
                  onClick={() => {
                    setShowIncomeForm(false)
                    setNewIncome('')
                  }} 
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button 
                  onClick={() => {
                    if (newIncome) {
                      setMonthlyIncome(parseInt(newIncome))
                      setShowIncomeForm(false)
                      setNewIncome('')
                    }
                  }} 
                  className="flex-1"
                >
                  Set Income
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}