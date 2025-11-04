interface SpendingData {
  income: number
  expenses: { category: string; amount: number }[]
}

interface BudgetRecommendation {
  category: string
  recommended: number
  current: number
  status: 'good' | 'warning' | 'critical'
  tip: string
}

export function generateBudgetRecommendations(data: SpendingData): BudgetRecommendation[] {
  const { income, expenses } = data
  const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0)
  
  // 50-30-20 rule: 50% needs, 30% wants, 20% savings
  const needsLimit = income * 0.5
  const wantsLimit = income * 0.3
  const savingsTarget = income * 0.2

  const categoryMapping: Record<string, 'needs' | 'wants'> = {
    'Food': 'needs',
    'Groceries': 'needs',
    'Rent': 'needs',
    'Utilities': 'needs',
    'Transport': 'needs',
    'Healthcare': 'needs',
    'Entertainment': 'wants',
    'Shopping': 'wants',
    'Dining': 'wants',
    'Travel': 'wants',
  }

  const needsSpending = expenses
    .filter(e => categoryMapping[e.category] === 'needs')
    .reduce((sum, e) => sum + e.amount, 0)
  
  const wantsSpending = expenses
    .filter(e => categoryMapping[e.category] === 'wants')
    .reduce((sum, e) => sum + e.amount, 0)

  const recommendations: BudgetRecommendation[] = []

  // Needs analysis
  if (needsSpending > needsLimit) {
    recommendations.push({
      category: 'Essential Expenses',
      recommended: needsLimit,
      current: needsSpending,
      status: 'warning',
      tip: `Reduce essential expenses by ₹${Math.round(needsSpending - needsLimit)}. Consider cheaper alternatives or negotiate bills.`
    })
  } else {
    recommendations.push({
      category: 'Essential Expenses',
      recommended: needsLimit,
      current: needsSpending,
      status: 'good',
      tip: 'Your essential spending is under control! Great job.'
    })
  }

  // Wants analysis
  if (wantsSpending > wantsLimit) {
    recommendations.push({
      category: 'Discretionary Spending',
      recommended: wantsLimit,
      current: wantsSpending,
      status: 'critical',
      tip: `Cut discretionary spending by ₹${Math.round(wantsSpending - wantsLimit)}. Focus on experiences over things.`
    })
  } else {
    recommendations.push({
      category: 'Discretionary Spending',
      recommended: wantsLimit,
      current: wantsSpending,
      status: 'good',
      tip: 'You have room for guilt-free spending! Enjoy within limits.'
    })
  }

  // Savings analysis
  const actualSavings = income - totalExpenses
  if (actualSavings < savingsTarget) {
    recommendations.push({
      category: 'Savings',
      recommended: savingsTarget,
      current: actualSavings,
      status: 'warning',
      tip: `Increase savings by ₹${Math.round(savingsTarget - actualSavings)}. Automate transfers on payday.`
    })
  } else {
    recommendations.push({
      category: 'Savings',
      recommended: savingsTarget,
      current: actualSavings,
      status: 'good',
      tip: `Excellent! You're saving ${Math.round((actualSavings/income)*100)}% of income. Consider investing surplus.`
    })
  }

  return recommendations
}
