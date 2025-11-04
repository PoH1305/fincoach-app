'use client'
import { motion } from 'framer-motion'
import { Brain, Check } from 'lucide-react'
import { useEffect, useState } from 'react'
import { getAIMemory } from '@/lib/ai/aiMemory'
import { useUserStore } from '@/lib/stores/userStore'

export function MemoryIndicator() {
  const { user } = useUserStore()
  const [memoryStats, setMemoryStats] = useState({ conversations: 0, insights: 0 })

  useEffect(() => {
    if (user) {
      getAIMemory(user.id).then(memory => {
        if (memory) {
          setMemoryStats({
            conversations: memory.context.conversations?.length || 0,
            insights: memory.context.insights?.length || 0
          })
        }
      })
    }
  }, [user])

  if (!user || memoryStats.conversations === 0) return null

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="card bg-gradient-to-r from-mint/10 to-sky/10"
    >
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-mint/20 flex items-center justify-center">
          <Brain className="w-5 h-5 text-mint" />
        </div>
        <div className="flex-1">
          <h4 className="font-semibold text-sm">AI Memory Active</h4>
          <p className="text-xs text-navy/60">
            {memoryStats.conversations} conversations • {memoryStats.insights} insights
          </p>
        </div>
        <Check className="w-5 h-5 text-mint" />
      </div>
    </motion.div>
  )
}
