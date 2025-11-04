interface FinancialData {
  income: number
  expenses: number
  savings: number
  debt: number
}

interface HealthScore {
  score: number
  grade: 'A' | 'B' | 'C' | 'D' | 'F'
  breakdown: {
    savings: number
    debt: number
    emergency: number
  }
  insights: string[]
}

export function calculateHealthScore(data: FinancialData): HealthScore {
  const totalExpenses = data.expenses
  const savingsRate = data.income > 0 ? (data.income - totalExpenses) / data.income : 0
  const debtRatio = data.income > 0 ? data.debt / data.income : 0
  const emergencyMonths = totalExpenses > 0 ? data.savings / totalExpenses : 0
  const emergencyScore = Math.min(emergencyMonths / 6, 1)
  
  const savingsPoints = Math.max(0, Math.min(savingsRate * 100, 40))
  const debtPoints = Math.max(0, (1 - Math.min(debtRatio, 1)) * 30)
  const emergencyPoints = emergencyScore * 30
  
  const score = Math.round(savingsPoints + debtPoints + emergencyPoints)
  
  const insights: string[] = []
  if (savingsRate < 0.1) insights.push('💡 Try to save at least 10% of your income')
  if (debtRatio > 0.3) insights.push('⚠️ High debt ratio - focus on paying down debt')
  if (emergencyMonths < 3) insights.push('🎯 Build emergency fund to cover 6 months expenses')
  if (score >= 80) insights.push('🎉 Excellent financial health! Keep it up!')
  
  return {
    score,
    grade: score >= 90 ? 'A' : score >= 80 ? 'B' : score >= 70 ? 'C' : score >= 60 ? 'D' : 'F',
    breakdown: {
      savings: Math.round(savingsPoints),
      debt: Math.round(debtPoints),
      emergency: Math.round(emergencyPoints)
    },
    insights
  }
}

export function getScoreColor(score: number): string {
  if (score >= 80) return '#10B981' // green
  if (score >= 60) return '#F59E0B' // yellow
  return '#EF4444' // red
}

export function getScoreTrend(current: number, previous: number): { value: number; direction: 'up' | 'down' | 'stable' } {
  const diff = current - previous
  return {
    value: Math.abs(diff),
    direction: diff > 2 ? 'up' : diff < -2 ? 'down' : 'stable'
  }
}
