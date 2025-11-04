import { NextRequest, NextResponse } from 'next/server'
import { calculateHealthScore } from '@/lib/ai/healthScore'

export async function POST(request: NextRequest) {
  try {
    const { income, expenses, savings, debt } = await request.json()
    
    if (!income || income <= 0) {
      return NextResponse.json({ error: 'Invalid income' }, { status: 400 })
    }
    
    const result = calculateHealthScore({
      income,
      expenses: expenses || 0,
      savings: savings || 0,
      debt: debt || 0
    })
    
    return NextResponse.json(result)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to calculate health score' }, { status: 500 })
  }
}
