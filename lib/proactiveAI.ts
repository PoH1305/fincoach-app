import { generateGeminiResponse } from './customAI'

interface UserActivity {
  type: 'expense' | 'goal' | 'chat' | 'learning' | 'page_visit'
  data: any
  timestamp: Date
}

interface AIInsight {
  id: string
  type: 'suggestion' | 'warning' | 'celebration' | 'tip'
  title: string
  message: string
  priority: 'low' | 'medium' | 'high'
  timestamp: Date
  dismissed: boolean
}

class ProactiveAI {
  private activities: UserActivity[] = []
  private insights: AIInsight[] = []
  private observers: ((insight: AIInsight) => void)[] = []

  // Track user activities
  trackActivity(activity: UserActivity) {
    this.activities.push(activity)
    this.analyzeAndSuggest()
  }

  // Subscribe to AI insights
  subscribe(callback: (insight: AIInsight) => void) {
    this.observers.push(callback)
  }

  // Analyze patterns and generate suggestions
  private async analyzeAndSuggest() {
    const recentActivities = this.activities.slice(-10)
    
    // Expense pattern analysis
    const expenseInsights = this.analyzeExpensePatterns(recentActivities)
    
    // Learning progress analysis
    const learningInsights = this.analyzeLearningProgress(recentActivities)
    
    // Goal tracking analysis
    const goalInsights = this.analyzeGoalProgress(recentActivities)
    
    // Combine all insights
    const allInsights = [...expenseInsights, ...learningInsights, ...goalInsights]
    
    // Generate AI-powered suggestions
    for (const insight of allInsights) {
      if (!this.isDuplicate(insight)) {
        this.insights.push(insight)
        this.notifyObservers(insight)
      }
    }
  }

  private analyzeExpensePatterns(activities: UserActivity[]): AIInsight[] {
    const insights: AIInsight[] = []
    const expenses = activities.filter(a => a.type === 'expense')
    
    if (expenses.length >= 3) {
      const totalSpent = expenses.reduce((sum, e) => sum + e.data.amount, 0)
      const avgExpense = totalSpent / expenses.length
      
      // High spending warning
      if (avgExpense > 1000) {
        insights.push({
          id: `expense-warning-${Date.now()}`,
          type: 'warning',
          title: 'High Spending Alert! 💸',
          message: `You've spent ₹${totalSpent} recently. Consider reviewing your budget to stay on track.`,
          priority: 'high',
          timestamp: new Date(),
          dismissed: false
        })
      }
      
      // Category-specific suggestions
      const categories = expenses.map(e => e.data.category)
      const foodExpenses = categories.filter(c => c === 'Food').length
      
      if (foodExpenses >= 2) {
        insights.push({
          id: `food-tip-${Date.now()}`,
          type: 'tip',
          title: 'Smart Food Budgeting 🍽️',
          message: 'Try meal planning to reduce food expenses by 20-30%. Cook at home more often!',
          priority: 'medium',
          timestamp: new Date(),
          dismissed: false
        })
      }
    }
    
    return insights
  }

  private analyzeLearningProgress(activities: UserActivity[]): AIInsight[] {
    const insights: AIInsight[] = []
    const learningActivities = activities.filter(a => a.type === 'learning')
    
    if (learningActivities.length === 0) {
      insights.push({
        id: `learning-reminder-${Date.now()}`,
        type: 'suggestion',
        title: 'Keep Learning! 📚',
        message: 'Complete a financial lesson today to improve your money management skills.',
        priority: 'medium',
        timestamp: new Date(),
        dismissed: false
      })
    }
    
    if (learningActivities.length >= 2) {
      insights.push({
        id: `learning-celebration-${Date.now()}`,
        type: 'celebration',
        title: 'Great Progress! 🎉',
        message: 'You\'re building strong financial knowledge. Keep up the excellent work!',
        priority: 'low',
        timestamp: new Date(),
        dismissed: false
      })
    }
    
    return insights
  }

  private analyzeGoalProgress(activities: UserActivity[]): AIInsight[] {
    const insights: AIInsight[] = []
    const goalActivities = activities.filter(a => a.type === 'goal')
    
    if (goalActivities.length === 0) {
      insights.push({
        id: `goal-suggestion-${Date.now()}`,
        type: 'suggestion',
        title: 'Set Your Financial Goals 🎯',
        message: 'Define clear financial goals to stay motivated and track your progress effectively.',
        priority: 'medium',
        timestamp: new Date(),
        dismissed: false
      })
    }
    
    return insights
  }

  private isDuplicate(newInsight: AIInsight): boolean {
    return this.insights.some(existing => 
      existing.type === newInsight.type && 
      existing.title === newInsight.title &&
      Date.now() - existing.timestamp.getTime() < 3600000 // 1 hour
    )
  }

  private notifyObservers(insight: AIInsight) {
    this.observers.forEach(callback => callback(insight))
  }

  // Get all active insights
  getActiveInsights(): AIInsight[] {
    return this.insights.filter(i => !i.dismissed)
  }

  // Dismiss an insight
  dismissInsight(id: string) {
    const insight = this.insights.find(i => i.id === id)
    if (insight) {
      insight.dismissed = true
    }
  }

  // Generate contextual suggestions based on current page
  async generateContextualSuggestion(currentPage: string, userData: any): Promise<AIInsight | null> {
    const suggestions = {
      dashboard: [
        'Check your spending trends from last week',
        'Set a savings goal for this month',
        'Review your budget categories'
      ],
      expenses: [
        'Try the envelope budgeting method',
        'Set spending limits for each category',
        'Track your daily expenses for better control'
      ],
      learning: [
        'Complete the Smart Investing module',
        'Take the personality quiz for personalized advice',
        'Learn about emergency fund basics'
      ],
      chat: [
        'Ask about investment strategies',
        'Get help with debt management',
        'Learn about tax-saving options'
      ]
    }

    const pageSuggestions = suggestions[currentPage as keyof typeof suggestions]
    if (pageSuggestions) {
      const randomSuggestion = pageSuggestions[Math.floor(Math.random() * pageSuggestions.length)]
      
      return {
        id: `contextual-${Date.now()}`,
        type: 'tip',
        title: 'Smart Suggestion 💡',
        message: randomSuggestion,
        priority: 'low',
        timestamp: new Date(),
        dismissed: false
      }
    }
    
    return null
  }
}

export const proactiveAI = new ProactiveAI()
export type { UserActivity, AIInsight }