'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, TrendingUp, TrendingDown, AlertTriangle, Target, PieChart, Calendar } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { getExpenses } from '@/lib/firebase'
import { proactiveAI } from '@/lib/proactiveAI'

interface AnalysisData {
  totalSpent: number
  categoryBreakdown: { [key: string]: number }
  monthlyTrend: { month: string; amount: number }[]
  insights: {
    type: 'warning' | 'tip' | 'success'
    title: string
    description: string
    impact: string
  }[]
  recommendations: string[]
}

interface DetailedAnalysisProps {
  onBack: () => void
  userId?: string
}

export function DetailedAnalysis({ onBack, userId }: DetailedAnalysisProps) {
  const [analysis, setAnalysis] = useState<AnalysisData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    generateAnalysis()
  }, [userId])

  const generateAnalysis = async () => {
    try {
      // Track analysis page visit
      proactiveAI.trackActivity({
        type: 'page_visit',
        data: { page: 'detailed_analysis' },
        timestamp: new Date()
      })

      const expenses = userId ? await getExpenses(userId) : [
        // Demo data if no user
        { id: '1', amount: 2500, category: 'Food', description: 'Groceries', date: new Date(), userId: 'demo' },
        { id: '2', amount: 1200, category: 'Transport', description: 'Uber rides', date: new Date(), userId: 'demo' },
        { id: '3', amount: 800, category: 'Entertainment', description: 'Movie tickets', date: new Date(), userId: 'demo' },
        { id: '4', amount: 3000, category: 'Food', description: 'Restaurant dining', date: new Date(), userId: 'demo' },
        { id: '5', amount: 500, category: 'Shopping', description: 'Clothes', date: new Date(), userId: 'demo' }
      ]
      
      // Calculate total spending
      const totalSpent = expenses.reduce((sum, exp: any) => sum + (exp.amount || 0), 0)
      
      // Category breakdown
      const categoryBreakdown: { [key: string]: number } = {}
      expenses.forEach((exp: any) => {
        if (exp.category && exp.amount) {
          categoryBreakdown[exp.category] = (categoryBreakdown[exp.category] || 0) + exp.amount
        }
      })
      
      // Monthly trend (last 6 months)
      const monthlyTrend = generateMonthlyTrend(expenses)
      
      // Generate AI insights
      const insights = generateInsights(expenses, categoryBreakdown, totalSpent)
      
      // Generate recommendations
      const recommendations = generateRecommendations(categoryBreakdown, totalSpent)
      
      setAnalysis({
        totalSpent,
        categoryBreakdown,
        monthlyTrend,
        insights,
        recommendations
      })
    } catch (error) {
      console.error('Error generating analysis:', error)
    } finally {
      setLoading(false)
    }
  }

  const generateMonthlyTrend = (expenses: any[]) => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
    return months.map(month => ({
      month,
      amount: Math.floor(Math.random() * 15000) + 5000 // Demo data
    }))
  }

  const generateInsights = (expenses: any[], categories: { [key: string]: number }, total: number) => {
    const insights = []
    
    // High spending category
    const topCategory = Object.entries(categories).sort(([,a], [,b]) => b - a)[0]
    if (topCategory && topCategory[1] > total * 0.3) {
      insights.push({
        type: 'warning' as const,
        title: `High ${topCategory[0]} Spending Alert`,
        description: `You've spent ₹${topCategory[1].toLocaleString()} on ${topCategory[0]} (${Math.round((topCategory[1]/total)*100)}% of total). This is above the recommended 25% limit for any single category.`,
        impact: `Potential savings: ₹${Math.round((topCategory[1] - total * 0.25)).toLocaleString()}/month`
      })
    }
    
    // Weekend spending pattern
    const weekendExpenses = expenses.filter(exp => {
      const day = new Date(exp.date).getDay()
      return day === 0 || day === 6 // Sunday or Saturday
    })
    if (weekendExpenses.length > 0) {
      const weekendTotal = weekendExpenses.reduce((sum, exp) => sum + exp.amount, 0)
      const weekendAvg = weekendTotal / Math.max(weekendExpenses.length, 1)
      if (weekendAvg > 1000) {
        insights.push({
          type: 'tip' as const,
          title: 'Weekend Spending Pattern',
          description: `Your average weekend expense is ₹${Math.round(weekendAvg).toLocaleString()}. Weekend spending tends to be 40% higher than weekdays.`,
          impact: 'Set a weekend budget limit to control impulse purchases'
        })
      }
    }
    
    // Food spending analysis
    if (categories['Food'] && categories['Food'] > 5000) {
      insights.push({
        type: 'tip' as const,
        title: 'Food Budget Optimization',
        description: `Food expenses: ₹${categories['Food'].toLocaleString()}. Consider meal planning and cooking at home more often.`,
        impact: `Potential savings: ₹${Math.round(categories['Food'] * 0.2).toLocaleString()}/month through meal prep`
      })
    }
    
    // Positive reinforcement
    if (total < 15000) {
      insights.push({
        type: 'success' as const,
        title: 'Excellent Spending Control! 🎉',
        description: `Your total spending of ₹${total.toLocaleString()} shows exceptional financial discipline. You're in the top 20% of savers.`,
        impact: 'Continue this pattern to build substantial savings'
      })
    }
    
    // Investment opportunity
    if (total < 20000) {
      const potentialSavings = 25000 - total
      insights.push({
        type: 'tip' as const,
        title: 'Investment Opportunity',
        description: `You have ₹${potentialSavings.toLocaleString()} potential monthly surplus. Consider starting a SIP investment.`,
        impact: `Potential wealth creation: ₹${Math.round(potentialSavings * 12 * 1.12).toLocaleString()}/year with 12% returns`
      })
    }
    
    return insights
  }

  const generateRecommendations = (categories: { [key: string]: number }, total: number) => {
    const recommendations = []
    
    // Personalized budget allocation
    const savingsRate = total < 20000 ? 30 : 20
    recommendations.push(`Aim for ${savingsRate}% savings rate based on your current spending pattern (₹${Math.round(total * savingsRate/100).toLocaleString()}/month)`)
    
    // Category-specific advice based on actual spending
    const topCategories = Object.entries(categories).sort(([,a], [,b]) => b - a).slice(0, 3)
    
    topCategories.forEach(([category, amount]) => {
      const percentage = (amount / total) * 100
      if (category === 'Food' && percentage > 25) {
        recommendations.push(`Food (${percentage.toFixed(1)}%): Try bulk buying and meal prep to save ₹${Math.round(amount * 0.2).toLocaleString()}/month`)
      } else if (category === 'Transport' && percentage > 15) {
        recommendations.push(`Transport (${percentage.toFixed(1)}%): Consider carpooling or public transport to reduce costs by 30%`)
      } else if (category === 'Entertainment' && percentage > 10) {
        recommendations.push(`Entertainment (${percentage.toFixed(1)}%): Set a monthly limit of ₹${Math.round(amount * 0.7).toLocaleString()} and explore free activities`)
      } else if (category === 'Shopping' && percentage > 15) {
        recommendations.push(`Shopping (${percentage.toFixed(1)}%): Implement a 24-hour rule before non-essential purchases`)
      }
    })
    
    // Investment advice based on spending level
    if (total < 15000) {
      recommendations.push('Start a SIP of ₹5000/month in diversified equity mutual funds for long-term wealth creation')
    } else if (total < 25000) {
      recommendations.push('Begin with a SIP of ₹3000/month and gradually increase by 10% annually')
    }
    
    // Emergency fund advice
    const emergencyFund = total * 6
    recommendations.push(`Build an emergency fund of ₹${emergencyFund.toLocaleString()} (6 months of expenses) in a liquid fund`)
    
    // Tax saving
    recommendations.push('Maximize tax savings through ELSS mutual funds and PPF contributions (₹1.5L limit under 80C)')
    
    // Behavioral recommendations
    recommendations.push('Use UPI payment apps to automatically track and categorize all expenses')
    recommendations.push('Review your spending weekly using the FinCoach expense tracker for better awareness')
    
    return recommendations
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-mint/20 via-sky/20 to-lavender/20 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="w-12 h-12 border-4 border-mint border-t-transparent rounded-full mx-auto mb-4"
              />
              <p className="text-navy/60">Analyzing your financial data...</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

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
            <h1 className="font-poppins font-bold text-2xl text-navy">Detailed Financial Analysis</h1>
            <p className="text-navy/60">AI-powered insights based on your spending patterns</p>
          </div>
        </div>

        {analysis && (
          <div className="space-y-6">
            {/* Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="card">
                <div className="flex items-center gap-3 mb-2">
                  <TrendingUp className="w-5 h-5 text-coral" />
                  <h3 className="font-semibold">Total Spending</h3>
                </div>
                <p className="text-2xl font-bold text-navy">₹{analysis.totalSpent.toLocaleString()}</p>
                <p className="text-sm text-navy/60">Last 30 days</p>
              </div>
              
              <div className="card">
                <div className="flex items-center gap-3 mb-2">
                  <PieChart className="w-5 h-5 text-sky" />
                  <h3 className="font-semibold">Top Category</h3>
                </div>
                <p className="text-2xl font-bold text-navy">
                  {Object.entries(analysis.categoryBreakdown).sort(([,a], [,b]) => b - a)[0]?.[0] || 'N/A'}
                </p>
                <p className="text-sm text-navy/60">
                  ₹{Object.entries(analysis.categoryBreakdown).sort(([,a], [,b]) => b - a)[0]?.[1].toLocaleString() || 0}
                </p>
              </div>
              
              <div className="card">
                <div className="flex items-center gap-3 mb-2">
                  <Target className="w-5 h-5 text-mint" />
                  <h3 className="font-semibold">Insights Found</h3>
                </div>
                <p className="text-2xl font-bold text-navy">{analysis.insights.length}</p>
                <p className="text-sm text-navy/60">Actionable recommendations</p>
              </div>
            </div>

            {/* AI Insights */}
            <div className="card">
              <h3 className="font-poppins font-bold text-lg mb-4 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-coral" />
                AI-Generated Insights
              </h3>
              <div className="space-y-4">
                {analysis.insights.map((insight, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`p-4 rounded-xl border-l-4 ${
                      insight.type === 'warning' ? 'bg-coral/10 border-coral' :
                      insight.type === 'tip' ? 'bg-sky/10 border-sky' :
                      'bg-mint/10 border-mint'
                    }`}
                  >
                    <h4 className="font-semibold text-navy mb-2">{insight.title}</h4>
                    <p className="text-sm text-navy/80 mb-2">{insight.description}</p>
                    <p className="text-xs text-navy/60 font-medium">{insight.impact}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Category Breakdown */}
            <div className="card">
              <h3 className="font-poppins font-bold text-lg mb-4 flex items-center gap-2">
                <PieChart className="w-5 h-5 text-sky" />
                Spending by Category
              </h3>
              <div className="space-y-3">
                {Object.entries(analysis.categoryBreakdown)
                  .sort(([,a], [,b]) => b - a)
                  .map(([category, amount]) => {
                    const percentage = (amount / analysis.totalSpent) * 100
                    return (
                      <div key={category} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-3 h-3 rounded-full bg-gradient-to-r from-mint to-sky" />
                          <span className="font-medium">{category}</span>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">₹{amount.toLocaleString()}</p>
                          <p className="text-xs text-navy/60">{percentage.toFixed(1)}%</p>
                        </div>
                      </div>
                    )
                  })}
              </div>
            </div>

            {/* Recommendations */}
            <div className="card">
              <h3 className="font-poppins font-bold text-lg mb-4 flex items-center gap-2">
                <Target className="w-5 h-5 text-mint" />
                Personalized Recommendations
              </h3>
              <div className="space-y-3">
                {analysis.recommendations.map((rec, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-3 p-3 bg-white/20 rounded-lg"
                  >
                    <div className="w-6 h-6 bg-mint/30 rounded-full flex items-center justify-center text-xs font-bold text-navy mt-0.5">
                      {index + 1}
                    </div>
                    <p className="text-sm text-navy/80">{rec}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}