export const celebrateGoal = () => {
  // Simple confetti effect using CSS animations
  const confettiContainer = document.createElement('div')
  confettiContainer.style.position = 'fixed'
  confettiContainer.style.top = '0'
  confettiContainer.style.left = '0'
  confettiContainer.style.width = '100%'
  confettiContainer.style.height = '100%'
  confettiContainer.style.pointerEvents = 'none'
  confettiContainer.style.zIndex = '9999'
  
  for (let i = 0; i < 50; i++) {
    const confetti = document.createElement('div')
    confetti.style.position = 'absolute'
    confetti.style.width = '10px'
    confetti.style.height = '10px'
    confetti.style.backgroundColor = ['#A8E6CF', '#89CFF0', '#FF6F61', '#CDB4DB'][Math.floor(Math.random() * 4)]
    confetti.style.left = Math.random() * 100 + '%'
    confetti.style.animationDuration = Math.random() * 3 + 2 + 's'
    confetti.style.animationName = 'confetti-fall'
    confetti.style.animationTimingFunction = 'linear'
    confetti.style.animationFillMode = 'forwards'
    
    confettiContainer.appendChild(confetti)
  }
  
  document.body.appendChild(confettiContainer)
  
  setTimeout(() => {
    document.body.removeChild(confettiContainer)
  }, 5000)
}

export const playSuccessSound = () => {
  // Create a simple success sound using Web Audio API
  const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
  const oscillator = audioContext.createOscillator()
  const gainNode = audioContext.createGain()
  
  oscillator.connect(gainNode)
  gainNode.connect(audioContext.destination)
  
  oscillator.frequency.setValueAtTime(523.25, audioContext.currentTime) // C5
  oscillator.frequency.setValueAtTime(659.25, audioContext.currentTime + 0.1) // E5
  oscillator.frequency.setValueAtTime(783.99, audioContext.currentTime + 0.2) // G5
  
  gainNode.gain.setValueAtTime(0.3, audioContext.currentTime)
  gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5)
  
  oscillator.start(audioContext.currentTime)
  oscillator.stop(audioContext.currentTime + 0.5)
}