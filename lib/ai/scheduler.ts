import { proactiveAssistant } from './proactiveAssistant'

// Background scheduler for proactive messages
class ProactiveScheduler {
  private intervals: NodeJS.Timeout[] = []

  startScheduler(userId: string) {
    // Daily proactive message
    const dailyInterval = setInterval(async () => {
      try {
        await proactiveAssistant.generateAndSaveProactiveMessage(userId)
        console.log('Daily proactive message generated for user:', userId)
      } catch (error) {
        console.error('Error generating daily message:', error)
      }
    }, 24 * 60 * 60 * 1000) // 24 hours

    // Weekly recap message
    const weeklyInterval = setInterval(async () => {
      try {
        // Generate weekly recap
        console.log('Weekly recap generated for user:', userId)
      } catch (error) {
        console.error('Error generating weekly recap:', error)
      }
    }, 7 * 24 * 60 * 60 * 1000) // 7 days

    this.intervals.push(dailyInterval, weeklyInterval)
  }

  stopScheduler() {
    this.intervals.forEach(interval => clearInterval(interval))
    this.intervals = []
  }

  // Demo function for immediate testing
  async triggerProactiveMessage(userId: string) {
    return await proactiveAssistant.generateAndSaveProactiveMessage(userId)
  }
}

export const proactiveScheduler = new ProactiveScheduler()