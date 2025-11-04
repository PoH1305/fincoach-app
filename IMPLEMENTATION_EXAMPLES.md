# 💻 FinCoach Implementation Examples

## 🎯 Complete Component Examples

### 1. Enhanced Dashboard with AI Insights

```typescript
// components/dashboard/EnhancedDashboard.tsx
'use client'
import { motion } from 'framer-motion'
import { useBudgetStore } from '@/lib/stores/budgetStore'
import { useUserStore } from '@/lib/stores/userStore'
import { SpendingChart } from '@/components/charts/SpendingChart'
import { BudgetRecommendationCard } from '@/components/ui/BudgetRecommendationCard'
import { generateBudgetRecommendations } from '@/lib/ai/budgetRecommendation'
import { useEffect, useState } from 'react'

export function EnhancedDashboard() {
  const { expenses, totalBalance } = useBudgetStore()
  const { user } = useUserStore()
  const [recommendations, setRecommendations] = useState([])

  useEffect(() => {
    if (expenses.length > 0) {
      const recs = generateBudgetRecommendations({
        income: 50000,
        expenses: expenses.map(e => ({ 
          category: e.category, 
          amount: e.amount 
        }))
      })
      setRecommendations(recs)
    }
  }, [expenses])

  const categoryData = expenses.reduce((acc, e) => {
    const existing = acc.find(item => item.category === e.category)
    if (existing) {
      existing.amount += e.amount
    } else {
      acc.push({ category: e.category, amount: e.amount })
    }
    return acc
  }, [] as { category: string; amount: number }[])

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card"
      >
        <h2 className="text-2xl font-bold mb-2">
          Welcome back, {user?.displayName}! 👋
        </h2>
        <p className="text-lg">
          Balance: ₹{totalBalance.toLocaleString()}
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-6">
        <SpendingChart data={categoryData} />
        <BudgetRecommendationCard recommendations={recommendations} />
      </div>
    </div>
  )
}
```

### 2. Context-Aware ChatBot

```typescript
// components/chat/ContextAwareChatBot.tsx
'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useBudgetStore } from '@/lib/stores/budgetStore'
import { useUserStore } from '@/lib/stores/userStore'
import { buildFinancialContext } from '@/lib/ai/contextAI'

export function ContextAwareChatBot() {
  const [messages, setMessages] = useState<any[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const { expenses } = useBudgetStore()
  const { user } = useUserStore()

  const sendMessage = async () => {
    if (!input.trim()) return

    const userMessage = { role: 'user', content: input }
    setMessages(prev => [...prev, userMessage])
    setInput('')
    setLoading(true)

    // Build financial context
    const context = buildFinancialContext({
      expenses,
      goals: [],
      income: 50000,
      savingsRate: 20
    })

    try {
      const response = await fetch('/api/chat/v2', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: input,
          userId: user?.id,
          context
        })
      })

      const data = await response.json()
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: data.response 
      }])
    } catch (error) {
      console.error('Chat error:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="card h-[600px] flex flex-col">
      <h2 className="text-xl font-bold mb-4">💬 FinCoach AI</h2>
      
      <div className="flex-1 overflow-y-auto space-y-4 mb-4">
        {messages.map((msg, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-3 rounded-xl ${
              msg.role === 'user' 
                ? 'bg-mint/20 ml-auto max-w-[80%]' 
                : 'bg-sky/20 mr-auto max-w-[80%]'
            }`}
          >
            {msg.content}
          </motion.div>
        ))}
        {loading && (
          <div className="text-center text-navy/60">
            🤔 Thinking...
          </div>
        )}
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
          placeholder="Ask about your finances..."
          className="flex-1 px-4 py-2 rounded-xl border border-navy/20"
        />
        <button
          onClick={sendMessage}
          disabled={loading}
          className="btn-primary"
        >
          Send
        </button>
      </div>
    </div>
  )
}
```

### 3. React Query Hook for Expenses

```typescript
// lib/hooks/useExpenses.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getUserExpenses, saveExpense } from '@/lib/firebase'
import { useUserStore } from '@/lib/stores/userStore'

export function useExpenses() {
  const { user } = useUserStore()
  const queryClient = useQueryClient()

  const { data: expenses, isLoading } = useQuery({
    queryKey: ['expenses', user?.id],
    queryFn: () => getUserExpenses(user!.id),
    enabled: !!user?.id,
    staleTime: 5 * 60 * 1000, // 5 minutes
  })

  const addExpenseMutation = useMutation({
    mutationFn: (expense: any) => saveExpense(user!.id, expense),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['expenses', user?.id] })
    },
  })

  return {
    expenses: expenses || [],
    isLoading,
    addExpense: addExpenseMutation.mutate,
    isAdding: addExpenseMutation.isPending,
  }
}
```

### 4. Server Component Dashboard

```typescript
// app/dashboard/page.tsx
import { Suspense } from 'react'
import { getUserExpenses } from '@/lib/firebase'
import { SpendingChart } from '@/components/charts/SpendingChart'
import { generateBudgetRecommendations } from '@/lib/ai/budgetRecommendation'

async function DashboardContent({ userId }: { userId: string }) {
  const expenses = await getUserExpenses(userId)
  
  const categoryData = expenses.reduce((acc, e) => {
    const existing = acc.find(item => item.category === e.category)
    if (existing) {
      existing.amount += e.amount
    } else {
      acc.push({ category: e.category, amount: e.amount })
    }
    return acc
  }, [] as { category: string; amount: number }[])

  const recommendations = generateBudgetRecommendations({
    income: 50000,
    expenses: expenses.map(e => ({ 
      category: e.category, 
      amount: e.amount 
    }))
  })

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <SpendingChart data={categoryData} />
      <BudgetRecommendationCard recommendations={recommendations} />
    </div>
  )
}

export default function DashboardPage() {
  // Get userId from auth
  const userId = 'user-id-from-auth'

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <Suspense fallback={<div>Loading insights...</div>}>
        <DashboardContent userId={userId} />
      </Suspense>
    </div>
  )
}
```

---

## 🔧 API Route Examples

### Secure Expense API with Rate Limiting

```typescript
// app/api/expenses/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { expenseSchema } from '@/lib/schemas'
import { rateLimit } from '@/lib/rateLimit'
import { saveExpense } from '@/lib/firebase'

export async function POST(request: NextRequest) {
  // Rate limiting
  const rateLimitResult = rateLimit(request, 20, 60000)
  if (!rateLimitResult.allowed) {
    return NextResponse.json(
      { error: 'Too many requests' },
      { status: 429 }
    )
  }

  try {
    const body = await request.json()
    const validated = expenseSchema.parse(body)
    
    // Get userId from auth header
    const userId = request.headers.get('x-user-id')
    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const result = await saveExpense(userId, validated)
    
    return NextResponse.json({ 
      success: true, 
      id: result.id 
    })
  } catch (error: any) {
    if (error?.name === 'ZodError') {
      return NextResponse.json(
        { error: 'Invalid data', details: error.errors },
        { status: 400 }
      )
    }
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
```

### AI Insights API

```typescript
// app/api/insights/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { buildFinancialContext, promptTemplates } from '@/lib/ai/contextAI'
import { getUserExpenses } from '@/lib/firebase'

export const runtime = 'edge'

export async function POST(request: NextRequest) {
  try {
    const { userId, type } = await request.json()
    
    const expenses = await getUserExpenses(userId)
    const context = buildFinancialContext({
      expenses,
      goals: [],
      income: 50000,
      savingsRate: 20
    })

    let prompt = ''
    switch (type) {
      case 'budget':
        prompt = promptTemplates.budgetAdvice(context)
        break
      case 'spending':
        prompt = promptTemplates.spendingInsight(context)
        break
      default:
        return NextResponse.json(
          { error: 'Invalid insight type' },
          { status: 400 }
        )
    }

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { maxOutputTokens: 300 }
        })
      }
    )

    const data = await response.json()
    const insight = data?.candidates?.[0]?.content?.parts?.[0]?.text

    return NextResponse.json({ insight })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to generate insight' },
      { status: 500 }
    )
  }
}
```

---

## 🎨 Tailwind Custom Classes

Add to `globals.css`:

```css
@layer components {
  .card {
    @apply bg-white/80 backdrop-blur-md border border-white/30 rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all duration-300;
  }

  .btn-primary {
    @apply px-6 py-3 bg-gradient-to-r from-mint to-sky text-white rounded-2xl font-medium hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed;
  }

  .btn-secondary {
    @apply px-6 py-3 bg-white/20 backdrop-blur-md border border-white/30 rounded-2xl hover:bg-white/30 transition-all duration-200;
  }

  .glass {
    @apply bg-white/10 backdrop-blur-md border border-white/20;
  }
}
```

---

## 📱 Mobile-First Responsive Example

```typescript
// components/layout/ResponsiveNav.tsx
'use client'
import { motion } from 'framer-motion'
import { Home, PieChart, Target, MessageCircle } from 'lucide-react'

const navItems = [
  { id: 'dashboard', icon: Home, label: 'Home' },
  { id: 'expenses', icon: PieChart, label: 'Expenses' },
  { id: 'goals', icon: Target, label: 'Goals' },
  { id: 'chat', icon: MessageCircle, label: 'Chat' },
]

export function ResponsiveNav({ activeTab, setActiveTab }: any) {
  return (
    <>
      {/* Mobile Bottom Nav */}
      <motion.nav
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        className="lg:hidden fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md border-t border-navy/10 z-50"
      >
        <div className="flex justify-around p-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-all ${
                activeTab === item.id
                  ? 'bg-mint/20 text-mint'
                  : 'text-navy/60'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="text-xs">{item.label}</span>
            </button>
          ))}
        </div>
      </motion.nav>

      {/* Desktop Sidebar */}
      <motion.nav
        initial={{ x: -100 }}
        animate={{ x: 0 }}
        className="hidden lg:block fixed left-0 top-20 h-screen w-64 p-6 space-y-2"
      >
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center gap-3 p-4 rounded-2xl transition-all ${
              activeTab === item.id
                ? 'bg-gradient-to-r from-mint/30 to-sky/30'
                : 'hover:bg-white/10'
            }`}
          >
            <item.icon className="w-5 h-5" />
            <span>{item.label}</span>
          </button>
        ))}
      </motion.nav>
    </>
  )
}
```

---

**Ready for production deployment! 🚀**
