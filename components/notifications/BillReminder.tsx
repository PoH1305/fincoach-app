'use client'
import { motion } from 'framer-motion'
import { Clock, Zap, Wifi, Phone, CreditCard } from 'lucide-react'
import { Button } from '@/components/ui/Button'

const bills = [
  { id: 1, name: 'Electricity Bill', amount: 2400, dueDate: '2024-01-18', icon: Zap, color: 'coral', daysLeft: 3 },
  { id: 2, name: 'Internet Bill', amount: 1200, dueDate: '2024-01-20', icon: Wifi, color: 'sky', daysLeft: 5 },
  { id: 3, name: 'Phone Bill', amount: 800, dueDate: '2024-01-25', icon: Phone, color: 'mint', daysLeft: 10 },
  { id: 4, name: 'Credit Card', amount: 15000, dueDate: '2024-01-22', icon: CreditCard, color: 'lavender', daysLeft: 7 }
]

export function BillReminder() {
  const urgentBills = bills.filter(bill => bill.daysLeft <= 5)

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-poppins font-bold">Bill Reminders</h3>
        <div className="flex items-center gap-2 text-coral">
          <Clock className="w-5 h-5" />
          <span className="font-medium">{urgentBills.length} urgent</span>
        </div>
      </div>

      <div className="space-y-3">
        {bills.map((bill, index) => (
          <motion.div
            key={bill.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`card ${bill.daysLeft <= 3 ? 'border-l-4 border-coral' : ''} ${
              bill.daysLeft <= 3 ? 'bg-coral/10' : ''
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-2xl bg-${bill.color}/20`}>
                  <bill.icon className={`w-6 h-6 text-${bill.color}`} />
                </div>
                <div>
                  <h4 className="font-semibold">{bill.name}</h4>
                  <p className="text-sm text-navy/60">Due: {bill.dueDate}</p>
                </div>
              </div>
              
              <div className="text-right">
                <p className="text-xl font-bold">₹{bill.amount.toLocaleString()}</p>
                <p className={`text-sm font-medium ${
                  bill.daysLeft <= 3 ? 'text-coral' : 
                  bill.daysLeft <= 7 ? 'text-orange-500' : 'text-mint'
                }`}>
                  {bill.daysLeft} days left
                </p>
              </div>
            </div>

            {bill.daysLeft <= 3 && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="mt-4 pt-4 border-t border-coral/20"
              >
                <div className="flex gap-2">
                  <Button size="sm" className="flex-1">Pay Now</Button>
                  <Button size="sm" variant="secondary">Remind Later</Button>
                </div>
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card bg-gradient-to-r from-mint/20 to-sky/20 text-center"
      >
        <h4 className="font-bold mb-2">💡 Smart Tip</h4>
        <p className="text-sm text-navy/70">
          Set up auto-pay for recurring bills to never miss a payment and improve your credit score!
        </p>
      </motion.div>
    </div>
  )
}