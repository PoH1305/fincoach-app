interface ChartData {
  labels: string[]
  values: number[]
  type: 'pie' | 'line' | 'bar'
}

export function generateChartSummary(data: ChartData): string {
  const total = data.values.reduce((sum, v) => sum + v, 0)
  const max = Math.max(...data.values)
  const maxIndex = data.values.indexOf(max)
  const maxLabel = data.labels[maxIndex]
  const maxPercent = ((max / total) * 100).toFixed(1)

  if (data.type === 'pie') {
    return `Your spending is dominated by ${maxLabel} at ${maxPercent}% (₹${max}). ${
      maxPercent > '40' 
        ? 'Consider reducing this category to improve your savings rate.' 
        : 'Your spending is well-distributed across categories.'
    }`
  }

  if (data.type === 'line') {
    const trend = data.values[data.values.length - 1] > data.values[0] ? 'increasing' : 'decreasing'
    const change = Math.abs(data.values[data.values.length - 1] - data.values[0])
    return `Your spending trend is ${trend} by ₹${change} over this period. ${
      trend === 'increasing' 
        ? 'Review your recent expenses to identify areas to cut back.' 
        : 'Great job reducing your spending! Keep up the momentum.'
    }`
  }

  return `Highest spending: ${maxLabel} at ₹${max}. Focus on this category for maximum savings impact.`
}

export async function explainChartWithAI(chartData: ChartData, apiKey: string): Promise<string> {
  const prompt = `Analyze this financial chart data and provide a brief, actionable insight:
Type: ${chartData.type}
Categories: ${chartData.labels.join(', ')}
Amounts: ${chartData.values.map(v => `₹${v}`).join(', ')}

Provide one key insight and one actionable tip in 2 sentences.`

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { maxOutputTokens: 100, temperature: 0.5 }
        })
      }
    )
    const data = await response.json()
    return data?.candidates?.[0]?.content?.parts?.[0]?.text || generateChartSummary(chartData)
  } catch {
    return generateChartSummary(chartData)
  }
}
