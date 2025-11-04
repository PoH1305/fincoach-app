interface FinancialContext {
  expenses: any[]
  goals: any[]
  income: number
  savingsRate: number
}

export function buildFinancialContext(data: FinancialContext): string {
  const totalExpenses = data.expenses.reduce((sum, e) => sum + e.amount, 0)
  const categoryBreakdown = data.expenses.reduce((acc, e) => {
    acc[e.category] = (acc[e.category] || 0) + e.amount
    return acc
  }, {} as Record<string, number>)

  return `
Financial Profile:
- Monthly Income: ₹${data.income}
- Total Expenses: ₹${totalExpenses}
- Savings Rate: ${data.savingsRate}%
- Top Categories: ${Object.entries(categoryBreakdown)
    .sort(([,a], [,b]) => (b as number) - (a as number))
    .slice(0, 3)
    .map(([cat, amt]) => `${cat} (₹${amt})`)
    .join(', ')}
- Active Goals: ${data.goals.length}
  `.trim()
}

export const promptTemplates = {
  budgetAdvice: (context: string) => `
You are FinCoach, an expert financial advisor. Based on this user's profile:
${context}

Provide personalized budget optimization advice. Focus on:
1. Identifying spending patterns
2. Suggesting realistic savings opportunities
3. Recommending budget allocation (50-30-20 rule)
Keep response under 150 words, actionable, and encouraging.
`,

  goalStrategy: (context: string, goal: string) => `
User Profile:
${context}

Goal: ${goal}

Create a step-by-step savings strategy to achieve this goal. Include:
1. Monthly savings target
2. Timeline estimate
3. Practical tips to reach the goal faster
Keep response concise and motivating.
`,

  spendingInsight: (context: string) => `
Analyze this spending pattern:
${context}

Provide 3 key insights:
1. Biggest spending category and why it matters
2. One area to reduce spending
3. Positive spending habit to celebrate
Be supportive and data-driven.
`,
}
