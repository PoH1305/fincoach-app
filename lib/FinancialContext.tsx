'use client'
import { createContext, useContext, useState, ReactNode } from 'react'

interface FinancialData {
  monthlyIncome: number
  totalExpenses: number
  expenses: any[]
}

interface FinancialContextType {
  financialData: FinancialData
  updateIncome: (income: number) => void
  updateExpenses: (expenses: any[]) => void
  getBalance: () => number
  getSavingsRate: () => number
}

const FinancialContext = createContext<FinancialContextType | undefined>(undefined)

export function FinancialProvider({ children }: { children: ReactNode }) {
  const [financialData, setFinancialData] = useState<FinancialData>({
    monthlyIncome: 50000,
    totalExpenses: 0,
    expenses: []
  })

  const updateIncome = (income: number) => {
    setFinancialData(prev => ({ ...prev, monthlyIncome: income }))
  }

  const updateExpenses = (expenses: any[]) => {
    const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0)
    setFinancialData(prev => ({ ...prev, expenses, totalExpenses }))
  }

  const getBalance = () => {
    return financialData.monthlyIncome - financialData.totalExpenses
  }

  const getSavingsRate = () => {
    if (financialData.monthlyIncome === 0) return 0
    return Math.round((getBalance() / financialData.monthlyIncome) * 100)
  }

  return (
    <FinancialContext.Provider value={{
      financialData,
      updateIncome,
      updateExpenses,
      getBalance,
      getSavingsRate
    }}>
      {children}
    </FinancialContext.Provider>
  )
}

export function useFinancial() {
  const context = useContext(FinancialContext)
  if (context === undefined) {
    throw new Error('useFinancial must be used within a FinancialProvider')
  }
  return context
}