'use client'
import { motion } from 'framer-motion'
import { TrendingUp, TrendingDown, DollarSign, PieChart } from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, PieChart as RechartsPie, Cell } from 'recharts'

const investments = [
  { name: 'Mutual Funds', amount: 45000, returns: 12.5, color: '#A8E6CF', icon: '📈' },
  { name: 'Stocks', amount: 25000, returns: -2.1, color: '#FF6F61', icon: '📊' },
  { name: 'Fixed Deposits', amount: 80000, returns: 6.8, color: '#89CFF0', icon: '🏦' },
  { name: 'Gold ETF', amount: 15000, returns: 8.3, color: '#CDB4DB', icon: '🥇' }
]

const performanceData = [
  { month: 'Jan', value: 150000 },
  { month: 'Feb', value: 155000 },
  { month: 'Mar', value: 148000 },
  { month: 'Apr', value: 162000 },
  { month: 'May', value: 165000 },
  { month: 'Jun', value: 165000 }
]

export function InvestmentTracker() {
  const totalInvestment = investments.reduce((sum, inv) => sum + inv.amount, 0)
  const totalReturns = investments.reduce((sum, inv) => sum + (inv.amount * inv.returns / 100), 0)
  const overallReturn = (totalReturns / totalInvestment) * 100

  return (
    <div className="space-y-6">
      {/* Portfolio Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card bg-gradient-to-r from-mint/20 to-sky/20"
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-2xl font-poppins font-bold">Investment Portfolio</h3>
            <p className="text-navy/60">Total Value: ₹{totalInvestment.toLocaleString()}</p>
          </div>
          <div className="text-right">
            <div className={`flex items-center gap-2 ${overallReturn >= 0 ? 'text-mint' : 'text-coral'}`}>
              {overallReturn >= 0 ? <TrendingUp className="w-6 h-6" /> : <TrendingDown className="w-6 h-6" />}
              <span className="text-2xl font-bold">{overallReturn.toFixed(1)}%</span>
            </div>
            <p className="text-sm text-navy/60">Overall Returns</p>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-3 bg-white/20 rounded-2xl">
            <p className="text-sm text-navy/60">Invested</p>
            <p className="text-xl font-bold">₹{totalInvestment.toLocaleString()}</p>
          </div>
          <div className="text-center p-3 bg-white/20 rounded-2xl">
            <p className="text-sm text-navy/60">Current Value</p>
            <p className="text-xl font-bold">₹{(totalInvestment + totalReturns).toLocaleString()}</p>
          </div>
        </div>
      </motion.div>

      {/* Investment Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {investments.map((investment, index) => (
          <motion.div
            key={investment.name}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className="card hover:scale-105"
            style={{ borderLeft: `4px solid ${investment.color}` }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{investment.icon}</span>
                <div>
                  <h4 className="font-semibold">{investment.name}</h4>
                  <p className="text-sm text-navy/60">₹{investment.amount.toLocaleString()}</p>
                </div>
              </div>
              
              <div className="text-right">
                <div className={`flex items-center gap-1 ${
                  investment.returns >= 0 ? 'text-mint' : 'text-coral'
                }`}>
                  {investment.returns >= 0 ? 
                    <TrendingUp className="w-4 h-4" /> : 
                    <TrendingDown className="w-4 h-4" />
                  }
                  <span className="font-bold">{investment.returns}%</span>
                </div>
                <p className="text-xs text-navy/60">
                  {investment.returns >= 0 ? '+' : ''}₹{(investment.amount * investment.returns / 100).toLocaleString()}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Performance Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card"
      >
        <h4 className="text-xl font-poppins font-bold mb-4">Portfolio Performance</h4>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={performanceData}>
            <XAxis dataKey="month" />
            <YAxis />
            <Line 
              type="monotone" 
              dataKey="value" 
              stroke="#A8E6CF" 
              strokeWidth={3}
              dot={{ fill: '#A8E6CF', strokeWidth: 2, r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Investment Allocation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card"
      >
        <h4 className="text-xl font-poppins font-bold mb-4">Asset Allocation</h4>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ResponsiveContainer width="100%" height={200}>
            <RechartsPie>
              <RechartsPie
                data={investments}
                cx="50%"
                cy="50%"
                outerRadius={80}
                dataKey="amount"
              >
                {investments.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </RechartsPie>
            </RechartsPie>
          </ResponsiveContainer>
          
          <div className="space-y-3">
            {investments.map((investment) => (
              <div key={investment.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div 
                    className="w-4 h-4 rounded-full" 
                    style={{ backgroundColor: investment.color }}
                  />
                  <span className="text-sm">{investment.name}</span>
                </div>
                <span className="text-sm font-medium">
                  {((investment.amount / totalInvestment) * 100).toFixed(1)}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  )
}