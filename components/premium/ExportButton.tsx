'use client'
import { Download } from 'lucide-react'
import { downloadCSV, generateMonthlyReport } from '@/lib/export/reportGenerator'
import { useBudgetStore } from '@/lib/stores/budgetStore'
import { checkFeatureAccess } from '@/lib/premium/plans'

interface ExportButtonProps {
  userPlan: string
  onUpgradeClick: () => void
}

export function ExportButton({ userPlan, onUpgradeClick }: ExportButtonProps) {
  const { expenses } = useBudgetStore()
  const hasAccess = checkFeatureAccess(userPlan, 'export')

  const handleExport = () => {
    if (!hasAccess) {
      onUpgradeClick()
      return
    }
    downloadCSV(expenses, `fincoach-expenses-${new Date().toISOString().split('T')[0]}.csv`)
  }

  return (
    <button
      onClick={handleExport}
      className="flex items-center gap-2 px-4 py-2 bg-mint text-white rounded-xl hover:bg-mint/90 transition-colors"
    >
      <Download className="w-4 h-4" />
      Export CSV
      {!hasAccess && <span className="text-xs">👑</span>}
    </button>
  )
}
