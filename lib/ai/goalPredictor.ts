interface Goal {
  id: string
  title: string
  targetAmount: number
  currentAmount: number
  deadline: string
  monthlyContribution?: number
}

interface Expense {
  amount: number
  date: string
}

interface Prediction {
  completionDate: string
  monthsNeeded: number
  confidence: number
  onTrack: boolean
  recommendation: string
  requiredMonthly: number
}

export function predictGoalCompletion(goal: Goal, expenses: Expense[], income: number): Prediction {
  const remaining = goal.target - goal.currentAmount
  const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0)
  const avgMonthlySavings = income - (totalExpenses / (expenses.length > 0 ? 1 : 1))
  
  const monthsNeeded = Math.ceil(remaining / Math.max(avgMonthlySavings, 1))
  const deadlineDate = new Date(goal.deadline)
  const now = new Date()
  const monthsAvailable = Math.max(1, Math.round((deadlineDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24 * 30)))
  
  const requiredMonthly = remaining / monthsAvailable
  const onTrack = avgMonthlySavings >= requiredMonthly
  
  const expenseVariance = calculateVariance(expenses)
  const confidence = Math.max(0.3, Math.min(0.95, 1 - (expenseVariance / income)))
  
  const completionDate = new Date()
  completionDate.setMonth(completionDate.getMonth() + monthsNeeded)
  
  let recommendation = ''
  if (!onTrack) {
    const shortfall = requiredMonthly - avgMonthlySavings
    recommendation = `Increase savings by ₹${Math.round(shortfall)}/month to reach goal on time`
  } else if (confidence < 0.6) {
    recommendation = 'Your spending varies a lot. Try to maintain consistent savings'
  } else {
    recommendation = `Great! Keep saving ₹${Math.round(avgMonthlySavings)}/month`
  }
  
  return {
    completionDate: completionDate.toISOString().split('T')[0],
    monthsNeeded,
    confidence: Math.round(confidence * 100) / 100,
    onTrack,
    recommendation,
    requiredMonthly: Math.round(requiredMonthly)
  }
}

function calculateVariance(expenses: Expense[]): number {
  if (expenses.length < 2) return 0
  const amounts = expenses.map(e => e.amount)
  const mean = amounts.reduce((sum, a) => sum + a, 0) / amounts.length
  const variance = amounts.reduce((sum, a) => sum + Math.pow(a - mean, 2), 0) / amounts.length
  return Math.sqrt(variance)
}

export function getGoalMilestones(goal: Goal, prediction: Prediction): Array<{ month: number; amount: number; date: string }> {
  const milestones = []
  const monthlyTarget = prediction.requiredMonthly
  
  for (let i = 1; i <= Math.min(prediction.monthsNeeded, 12); i++) {
    const date = new Date()
    date.setMonth(date.getMonth() + i)
    milestones.push({
      month: i,
      amount: goal.currentAmount + (monthlyTarget * i),
      date: date.toISOString().split('T')[0]
    })
  }
  
  return milestones
}
