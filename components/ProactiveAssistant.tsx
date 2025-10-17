'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Lightbulb, AlertTriangle, PartyPopper, TrendingUp } from 'lucide-react'
import { proactiveAI, AIInsight } from '../lib/proactiveAI'

export function ProactiveAssistant() {
  const [insights, setInsights] = useState<AIInsight[]>([])
  const [currentInsight, setCurrentInsight] = useState<AIInsight | null>(null)

  useEffect(() => {
    proactiveAI.subscribe((insight: AIInsight) => {
      setInsights(prev => [...prev, insight])
      if (insight.priority === 'high') {
        setCurrentInsight(insight)
      }
    })

    setInsights(proactiveAI.getActiveInsights())

    const interval = setInterval(async () => {
      const suggestion = await proactiveAI.generateContextualSuggestion('dashboard', {})
      if (suggestion && Math.random() > 0.8) {
        setInsights(prev => [...prev, suggestion])
      }
    }, 45000)

    return () => clearInterval(interval)
  }, [])

  const getIcon = (type: string) => {
    switch (type) {
      case 'warning': return <AlertTriangle className="w-5 h-5 text-coral" />
      case 'celebration': return <PartyPopper className="w-5 h-5 text-mint" />
      case 'tip': return <Lightbulb className="w-5 h-5 text-sky" />
      default: return <TrendingUp className="w-5 h-5 text-lavender" />
    }
  }

  const dismissInsight = (id: string) => {
    proactiveAI.dismissInsight(id)
    setInsights(prev => prev.filter(i => i.id !== id))
    if (currentInsight?.id === id) {
      setCurrentInsight(null)
    }
  }

  const showNextInsight = () => {
    const nextInsight = insights.find(i => i.id !== currentInsight?.id)
    setCurrentInsight(nextInsight || null)
  }

  return (
    <>
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 2 }}
      >
        <motion.button
          onClick={showNextInsight}
          className="w-14 h-14 bg-gradient-to-r from-mint to-sky rounded-full shadow-lg flex items-center justify-center"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Lightbulb className="w-6 h-6 text-navy" />
          {insights.length > 0 && (
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-coral rounded-full flex items-center justify-center text-white text-xs font-bold">
              {insights.length}
            </div>
          )}
        </motion.button>
      </motion.div>

      <AnimatePresence>
        {currentInsight && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            className="fixed bottom-24 right-6 z-40 max-w-sm"
          >
            <div className="card bg-gradient-to-r from-mint/20 to-sky/20 border-2 border-white/20">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  {getIcon(currentInsight.type)}
                  <h4 className="font-bold text-sm">{currentInsight.title}</h4>
                </div>
                <button onClick={() => dismissInsight(currentInsight.id)}>
                  <X className="w-4 h-4" />
                </button>
              </div>
              
              <p className="text-sm text-navy/80 mb-4">{currentInsight.message}</p>
              
              <div className="flex gap-2">
                <button
                  onClick={() => dismissInsight(currentInsight.id)}
                  className="flex-1 px-3 py-2 bg-white/20 rounded-xl text-xs hover:bg-white/30 transition-colors"
                >
                  Got it
                </button>
                <button
                  onClick={showNextInsight}
                  className="flex-1 px-3 py-2 bg-mint/30 rounded-xl text-xs hover:bg-mint/40 transition-colors"
                >
                  Next tip
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}