interface Expense {
  amount: number
  category: string
  description: string
  date: string
}

export function generateCSV(expenses: Expense[]): string {
  const headers = ['Date', 'Category', 'Description', 'Amount']
  const rows = expenses.map(e => [
    e.date,
    e.category,
    e.description,
    e.amount.toString()
  ])
  
  const csv = [
    headers.join(','),
    ...rows.map(row => row.join(','))
  ].join('\n')
  
  return csv
}

export function downloadCSV(expenses: Expense[], filename: string = 'expenses.csv') {
  const csv = generateCSV(expenses)
  const blob = new Blob([csv], { type: 'text/csv' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}

export function generateMonthlyReport(expenses: Expense[], income: number): string {
  const total = expenses.reduce((sum, e) => sum + e.amount, 0)
  const byCategory = expenses.reduce((acc, e) => {
    acc[e.category] = (acc[e.category] || 0) + e.amount
    return acc
  }, {} as Record<string, number>)
  
  const topCategories = Object.entries(byCategory)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 5)
  
  return `
FINCOACH MONTHLY REPORT
========================

Income: ₹${income.toLocaleString()}
Total Expenses: ₹${total.toLocaleString()}
Savings: ₹${(income - total).toLocaleString()}
Savings Rate: ${((income - total) / income * 100).toFixed(1)}%

TOP SPENDING CATEGORIES:
${topCategories.map(([cat, amt]) => `${cat}: ₹${amt.toLocaleString()}`).join('\n')}

Total Transactions: ${expenses.length}
  `.trim()
}
