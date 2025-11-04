export class VoiceAssistant {
  private recognition: any
  private synthesis: SpeechSynthesis
  private isListening = false

  constructor() {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
      this.recognition = SpeechRecognition ? new SpeechRecognition() : null
      this.synthesis = window.speechSynthesis
      
      if (this.recognition) {
        this.recognition.continuous = false
        this.recognition.interimResults = false
        this.recognition.lang = 'en-US'
      }
    }
  }

  startListening(onResult: (text: string) => void, onError?: (error: string) => void) {
    if (!this.recognition) {
      onError?.('Speech recognition not supported')
      return
    }

    this.recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript
      onResult(transcript)
    }

    this.recognition.onerror = (event: any) => {
      onError?.(event.error)
    }

    this.recognition.start()
    this.isListening = true
  }

  stopListening() {
    if (this.recognition) {
      this.recognition.stop()
      this.isListening = false
    }
  }

  speak(text: string, onEnd?: () => void) {
    if (!this.synthesis) return

    this.synthesis.cancel()
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.rate = 1
    utterance.pitch = 1
    utterance.volume = 1
    
    if (onEnd) {
      utterance.onend = onEnd
    }

    this.synthesis.speak(utterance)
  }

  stopSpeaking() {
    if (this.synthesis) {
      this.synthesis.cancel()
    }
  }
}

export function parseVoiceCommand(text: string): { action: string; data?: any } {
  const lower = text.toLowerCase()

  if (lower.includes('add expense') || lower.includes('spent')) {
    const amount = lower.match(/\d+/)
    const category = lower.includes('food') ? 'Food' : 
                    lower.includes('transport') ? 'Transport' : 
                    lower.includes('shopping') ? 'Shopping' : 'Other'
    return { action: 'add_expense', data: { amount: amount?.[0], category } }
  }

  if (lower.includes('balance') || lower.includes('how much')) {
    return { action: 'check_balance' }
  }

  if (lower.includes('goal') || lower.includes('saving')) {
    return { action: 'check_goals' }
  }

  if (lower.includes('spending') || lower.includes('spent this month')) {
    return { action: 'check_spending' }
  }

  return { action: 'chat', data: { message: text } }
}
