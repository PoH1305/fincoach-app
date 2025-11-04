'use client'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Check } from 'lucide-react'
import { PREMIUM_PLANS } from '@/lib/premium/plans'

interface PricingModalProps {
  isOpen: boolean
  onClose: () => void
  onSelectPlan: (planId: string) => void
}

export function PricingModal({ isOpen, onClose, onSelectPlan }: PricingModalProps) {
  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-white rounded-3xl max-w-5xl w-full max-h-[90vh] overflow-y-auto"
        >
          <div className="p-6 border-b border-navy/10 flex items-center justify-between sticky top-0 bg-white z-10">
            <div>
              <h2 className="text-2xl font-bold">Upgrade to Premium</h2>
              <p className="text-navy/60">Choose the plan that fits your needs</p>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-navy/5 rounded-full">
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="p-6 grid md:grid-cols-3 gap-6">
            {PREMIUM_PLANS.map((plan) => (
              <motion.div
                key={plan.id}
                whileHover={{ scale: 1.02 }}
                className={`card relative ${
                  plan.popular ? 'ring-2 ring-mint shadow-xl' : ''
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-mint to-sky text-white px-4 py-1 rounded-full text-xs font-bold">
                    POPULAR
                  </div>
                )}

                <div className="text-center mb-6">
                  <div className="text-4xl mb-2">
                    {plan.id === 'free' && '🌱'}
                    {plan.id === 'premium' && '👑'}
                    {plan.id === 'pro' && '⚡'}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-3xl font-bold">₹{plan.price}</span>
                    <span className="text-navy/60">/{plan.interval}</span>
                  </div>
                </div>

                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <Check className="w-4 h-4 text-mint flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => onSelectPlan(plan.id)}
                  className={`w-full py-3 rounded-xl font-medium transition-colors ${
                    plan.popular
                      ? 'bg-gradient-to-r from-mint to-sky text-white hover:opacity-90'
                      : 'bg-navy/5 hover:bg-navy/10'
                  }`}
                >
                  {plan.id === 'free' ? 'Current Plan' : 'Upgrade Now'}
                </button>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
