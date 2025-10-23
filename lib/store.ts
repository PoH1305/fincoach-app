import { create } from 'zustand'

interface User {
  id: string
  email: string
  displayName: string
  personalityType?: string
}

interface Expense {
  id: string
  amount: number
  category: string
  description: string
  date: string
}

interface AppState {
  user: User | null
  expenses: Expense[]
  totalBalance: number
  setUser: (user: User | null) => void
  addExpense: (expense: Expense) => void
  setExpenses: (expenses: Expense[]) => void
}

export const useAppStore = create<AppState>((set) => ({
  user: null,
  expenses: [],
  totalBalance: 0,
  setUser: (user) => set({ user }),
  addExpense: (expense) => set((state) => ({ 
    expenses: [expense, ...state.expenses],
    totalBalance: state.totalBalance - expense.amount
  })),
  setExpenses: (expenses) => set({ expenses })
}))