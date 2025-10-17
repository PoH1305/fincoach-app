'use client'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'

interface ToastProps {
  message: string
  emoji: string
  isVisible: boolean
  onClose: () => void
}

export function Toast({ message, emoji, isVisible, onClose }: ToastProps) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -50, scale: 0.9 }}
          className="fixed top-4 right-4 z-50 bg-gradient-to-r from-mint to-sky p-4 rounded-2xl shadow-2xl max-w-sm"
        >
          <div className="flex items-center gap-3">
            <span className="text-2xl">{emoji}</span>
            <p className="text-navy font-medium flex-1">{message}</p>
            <button onClick={onClose} className="text-navy/60 hover:text-navy">
              <X className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}