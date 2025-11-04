interface Expense {
  amount: number
  category: string
  date: string
}

interface SpendingAnalysis {
  insight: string
  topCategory: { name: string; amount: number; percentage: number }
  trend: 'increasing' | 'decreasing' | 'stable'
  recommendation: string
}

export function analyzeSpending(expenses: Expense[], previousExpenses: Expense[] = []): SpendingAnalysis {
  const currentTotal = expenses.reduce((sum, e) => sum + e.amount, 0)
  const previousTotal = previousExpenses.reduce((sum, e) => sum + e.amount, 0)
  
  const categoryTotals = expenses.reduce((acc, e) => {
    acc[e.category] = (acc[e.category] || 0) + e.amount
    return acc
  }, {} as Record<string, number>)
  
  const topCategory = Object.entries(categoryTotals)
    .sort(([, a], [, b]) => b - a)[0]
  
  const changePercent = previousTotal > 0 
    ? ((currentTotal - previousTotal) / previousTotal) * 100 
    : 0
  
  const trend = changePercent > 10 ? 'increasing' : changePercent < -10 ? 'decreasing' : 'stable'
  
  let insight = ''
  if (trend === 'increasing') {
    insight = `Your spending increased by ${Math.abs(changePercent).toFixed(0)}% this month`
  } else if (trend === 'decreasing') {
    insight = `Great! You reduced spending by ${Math.abs(changePercent).toFixed(0)}%`
  } else {
    insight = `Your spending is consistent with last month`
  }
  
  let recommendation = ''
  if (topCategory && topCategory[1] > currentTotal * 0.3) {
    recommendation = `${topCategory[0]} is ${((topCategory[1]/currentTotal)*100).toFixed(0)}% of spending. Consider reducing this category.`
  } else if (trend === 'increasing') {
    recommendation = 'Review recent purchases and identify areas to cut back.'
  } else {
    recommendation = 'Keep up the good work! Stay consistent with your budget.'
  }
  
  return {
    insight,
    topCategory: {
      name: topCategory?.[0] || 'None',
      amount: topCategory?.[1] || 0,
      percentage: topCategory ? (topCategory[1] / currentTotal) * 100 : 0
    },
    trend,
    recommendation
  }
}

export async function generateAIInsight(expenses: Expense[], income: number): Promise<string> {
  const analysis = analyzeSpending(expenses)
  const savingsRate = ((income - expenses.reduce((s, e) => s + e.amount, 0)) / income) * 100
  
  const insights = [
    `💡 ${analysis.insight}. ${analysis.recommendation}`,
    `🎯 You're saving ${savingsRate.toFixed(0)}% of your income this month.`,
    `📊 Top spending: ${analysis.topCategory.name} (₹${analysis.topCategory.amount.toLocaleString()})`,
  ]
  
  return insights[Math.floor(Math.random() * insights.length)]
}
