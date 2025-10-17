'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Slider } from '@/components/ui/Slider'
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from 'recharts'

export function ConsequenceEngine() {
  const [monthlyAmount, setMonthlyAmount] = useState(5000)
  const [timeframe, setTimeframe] = useState(12) // months

  // Calculate scenarios
  const spendScenario = {
    title: "If You Spend ₹" + monthlyAmount.toLocaleString(),
    subtitle: "Short-term pleasure",
    emoji: "🛍️",
    color: "coral",
    items: ["New gadgets", "Dining out", "Entertainment", "Impulse buys"],
    futureValue: 0
  }

  const saveScenario = {
    title: "If You Save ₹" + monthlyAmount.toLocaleString(),
    subtitle: "Long-term wealth",
    emoji: "🌱",
    color: "mint",
    items: ["Emergency fund", "Investment growth", "Financial freedom", "Peace of mind"],
    futureValue: monthlyAmount * timeframe * 1.08 // 8% annual return
  }

  // Generate chart data
  const chartData = Array.from({ length: timeframe + 1 }, (_, i) => ({
    month: i,
    spending: 0,
    saving: monthlyAmount * i * (1 + (0.08 / 12) * i) // Compound growth
  }))

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h2 className="text-4xl font-poppins font-bold bg-gradient-to-r from-coral to-mint bg-clip-text text-transparent">
          Parallel Futures
        </h2>
        <p className="text-lg text-navy/70">See how your choices shape your financial destiny</p>
      </div>

      {/* Controls */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card space-y-6"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Monthly Amount: ₹{monthlyAmount.toLocaleString()}</label>
            <Slider
              value={[monthlyAmount]}
              onValueChange={(value) => setMonthlyAmount(value[0])}
              max={20000}
              min={1000}
              step={500}
              className="w-full"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Time Period: {timeframe} months</label>
            <Slider
              value={[timeframe]}
              onValueChange={(value) => setTimeframe(value[0])}
              max={60}
              min={6}
              step={6}
              className="w-full"
            />
          </div>
        </div>
      </motion.div>

      {/* Split Screen Scenarios */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Spending Scenario */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          className="card bg-gradient-to-br from-coral/20 to-coral/5 border-l-4 border-coral"
        >
          <div className="text-center space-y-4">
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-6xl"
            >
              {spendScenario.emoji}
            </motion.div>
            
            <div>
              <h3 className="text-2xl font-bold text-coral">{spendScenario.title}</h3>
              <p className="text-navy/60">{spendScenario.subtitle}</p>
            </div>

            <div className="space-y-2">
              {spendScenario.items.map((item, index) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-2 bg-white/20 rounded-lg text-sm"
                >
                  {item}
                </motion.div>
              ))}
            </div>

            <div className="pt-4 border-t border-coral/20">
              <p className="text-sm text-navy/60">Future Value</p>
              <p className="text-3xl font-bold text-coral">₹0</p>
              <p className="text-xs text-navy/50">Money spent is gone forever</p>
            </div>
          </div>
        </motion.div>

        {/* Saving Scenario */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          className="card bg-gradient-to-br from-mint/20 to-mint/5 border-l-4 border-mint"
        >
          <div className="text-center space-y-4">
            <motion.div
              animate={{ 
                scale: [1, 1.2, 1],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ duration: 3, repeat: Infinity }}
              className="text-6xl"
            >
              {saveScenario.emoji}
            </motion.div>
            
            <div>
              <h3 className="text-2xl font-bold text-mint">{saveScenario.title}</h3>
              <p className="text-navy/60">{saveScenario.subtitle}</p>
            </div>

            <div className="space-y-2">
              {saveScenario.items.map((item, index) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-2 bg-white/20 rounded-lg text-sm"
                >
                  {item}
                </motion.div>
              ))}
            </div>

            <div className="pt-4 border-t border-mint/20">
              <p className="text-sm text-navy/60">Future Value</p>
              <p className="text-3xl font-bold text-mint">₹{Math.round(saveScenario.futureValue).toLocaleString()}</p>
              <p className="text-xs text-navy/50">With 8% annual growth</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Growth Visualization */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        className="card"
      >
        <h3 className="text-2xl font-poppins font-bold mb-6 text-center">
          Watch Your Money Grow 📈
        </h3>
        
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <XAxis dataKey="month" label={{ value: 'Months', position: 'insideBottom', offset: -10 }} />
            <YAxis label={{ value: 'Amount (₹)', angle: -90, position: 'insideLeft' }} />
            <Line 
              type="monotone" 
              dataKey="spending" 
              stroke="#FF6F61" 
              strokeWidth={3}
              strokeDasharray="5 5"
              name="Spending Path"
            />
            <Line 
              type="monotone" 
              dataKey="saving" 
              stroke="#A8E6CF" 
              strokeWidth={3}
              name="Saving Path"
            />
          </LineChart>
        </ResponsiveContainer>

        <div className="flex justify-center gap-6 mt-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-4 h-1 bg-coral"></div>
            <span>Spending (₹0 growth)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-1 bg-mint"></div>
            <span>Saving (with growth)</span>
          </div>
        </div>
      </motion.div>

      {/* Call to Action */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="card text-center bg-gradient-to-r from-mint/20 to-sky/20"
      >
        <h3 className="text-2xl font-bold mb-4">Ready to Choose Your Future? 🚀</h3>
        <p className="text-navy/70 mb-6">
          Every rupee you save today is a step towards financial freedom tomorrow.
        </p>
        <div className="flex gap-4 justify-center">
          <button className="btn-primary">Start Saving Plan</button>
          <button className="px-6 py-3 bg-white/20 backdrop-blur-md border border-white/30 rounded-2xl hover:bg-white/30 transition-all">
            Learn More
          </button>
        </div>
      </motion.div>
    </div>
  )
}