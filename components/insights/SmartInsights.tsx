'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Brain, TrendingUp, AlertTriangle, Lightbulb } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { DetailedAnalysis } from './DetailedAnalysis'

const insights = [
  {
    id: 1,
    type: 'warning',
    icon: AlertTriangle,
    color: 'coral',
    title: 'Weekend Spending Alert',
    message: 'You spend 40% more on weekends. Try setting a weekend budget of ₹2000.',
    action: 'Set Weekend Limit',
    impact: 'Save ₹3200/month'
  },
  {
    id: 2,
    type: 'opportunity',
    icon: TrendingUp,
    color: 'mint',
    title: 'Investment Opportunity',
    message: 'You have ₹15000 sitting idle. Consider investing in mutual funds for better returns.',
    action: 'Start SIP',
    impact: 'Earn ₹1800 extra/year'
  },
  {
    id: 3,
    type: 'tip',
    icon: Lightbulb,
    color: 'sky',
    title: 'Smart Saving Tip',
    message: 'Your grocery spending is consistent. Try bulk buying to save 15% on monthly groceries.',
    action: 'Plan Bulk Shopping',
    impact: 'Save ₹900/month'
  }
]

export function SmartInsights() {
  const [showDetailedAnalysis, setShowDetailedAnalysis] = useState(false)

  if (showDetailedAnalysis) {
    return <DetailedAnalysis onBack={() => setShowDetailedAnalysis(false)} />
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Brain className="w-8 h-8 text-lavender" />
        <div>
          <h2 className="text-2xl font-poppins font-bold">AI Insights</h2>
          <p className="text-navy/60">Personalized recommendations for your financial journey</p>
        </div>
      </div>

      <div className="space-y-4">
        {insights.map((insight, index) => (
          <motion.div
            key={insight.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="card border-l-4 border-coral bg-gradient-to-r from-coral/10 to-transparent"
          >
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-2xl bg-coral/20 flex-shrink-0">
                <insight.icon className="w-6 h-6 text-coral" />
              </div>
              
              <div className="flex-1">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-bold text-lg">{insight.title}</h3>
                    <p className="text-navy/70 mt-1">{insight.message}</p>
                  </div>
                  
                  <div className="px-3 py-1 rounded-full text-xs font-medium bg-coral/20 text-coral">
                    {insight.impact}
                  </div>
                </div>
                
                <Button size="sm" variant="secondary" className="mt-2">
                  {insight.action}
                </Button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card bg-gradient-to-r from-lavender/20 to-mint/20 text-center"
      >
        <div className="text-4xl mb-3">🤖</div>
        <h3 className="text-xl font-bold mb-2">Your AI Financial Coach Says:</h3>
        <p className="text-navy/70 mb-4">
          "You're making excellent progress! Focus on weekend spending control and consider investing your idle money."
        </p>
        <Button onClick={() => setShowDetailedAnalysis(true)}>Get Detailed Analysis</Button>
      </motion.div>
    </div>
  )
}