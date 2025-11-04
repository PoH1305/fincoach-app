import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface Expense {
  id: string
  amount: number
  category: string
  description: string
  date: string
}

interface Budget {
  category: string
  limit: number
  spent: number
}

interface BudgetState {
  expenses: Expense[]
  budgets: Budget[]
  totalBalance: number
  addExpense: (expense: Expense) => void
  setExpenses: (expenses: Expense[]) => void
  setBudget: (category: string, limit: number) => void
  updateBalance: (amount: number) => void
}

export const useBudgetStore = create<BudgetState>()(
  persist(
    (set) => ({
      expenses: [],
      budgets: [],
      totalBalance: 50000,
      addExpense: (expense) => set((state) => {
        const newExpenses = [expense, ...state.expenses]
        const budgets = state.budgets.map(b => 
          b.category === expense.category 
            ? { ...b, spent: b.spent + expense.amount }
            : b
        )
        return { 
          expenses: newExpenses,
          budgets,
          totalBalance: state.totalBalance - expense.amount
        }
      }),
      setExpenses: (expenses) => set({ expenses }),
      setBudget: (category, limit) => set((state) => {
        const existing = state.budgets.find(b => b.category === category)
        if (existing) {
          return {
            budgets: state.budgets.map(b => 
              b.category === category ? { ...b, limit } : b
            )
          }
        }
        return {
          budgets: [...state.budgets, { category, limit, spent: 0 }]
        }
      }),
      updateBalance: (amount) => set((state) => ({ 
        totalBalance: state.totalBalance + amount 
      })),
    }),
    { name: 'fincoach-budget' }
  )
)
