export interface PremiumPlan {
  id: string
  name: string
  price: number
  interval: 'month' | 'year'
  features: string[]
  popular?: boolean
}

export const PREMIUM_PLANS: PremiumPlan[] = [
  {
    id: 'free',
    name: 'Free',
    price: 0,
    interval: 'month',
    features: [
      'Basic expense tracking',
      'Up to 3 goals',
      '7-day AI memory',
      'Health score',
      'Basic insights'
    ]
  },
  {
    id: 'premium',
    name: 'Premium',
    price: 299,
    interval: 'month',
    popular: true,
    features: [
      'Everything in Free',
      'Unlimited goals',
      '90-day AI memory',
      'Investment insights',
      'Export reports (PDF/CSV)',
      'Priority support',
      'Advanced analytics'
    ]
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 599,
    interval: 'month',
    features: [
      'Everything in Premium',
      'Bank account sync',
      'Tax preparation mode',
      'Custom AI coaching',
      'Weekly digest emails',
      'API access',
      'White-label reports'
    ]
  }
]

export function checkFeatureAccess(userPlan: string, feature: string): boolean {
  const premiumFeatures = ['unlimited_goals', 'export', 'bank_sync', 'tax_prep', 'advanced_analytics']
  const proFeatures = ['bank_sync', 'tax_prep', 'api_access', 'custom_coaching']
  
  if (userPlan === 'pro') return true
  if (userPlan === 'premium') return !proFeatures.includes(feature)
  return !premiumFeatures.includes(feature)
}

export function getFeatureLimit(userPlan: string, feature: string): number {
  const limits: Record<string, Record<string, number>> = {
    free: { goals: 3, memory_days: 7, exports: 0 },
    premium: { goals: -1, memory_days: 90, exports: 10 },
    pro: { goals: -1, memory_days: 365, exports: -1 }
  }
  return limits[userPlan]?.[feature] ?? 0
}
