import { defineStore } from 'pinia'

interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
}

interface ChatSession {
  id: string
  title: string
  lastMessage: string
  timestamp: Date
}

// Sample chat history data
const sampleChatHistory: ChatSession[] = [
  {
    id: '1',
    title: 'Building a React Native App',
    lastMessage: 'Here are the steps to set up your development environment...',
    timestamp: new Date('2025-01-22T14:30:00')
  },
  {
    id: '2',
    title: 'Python Data Analysis Project',
    lastMessage: 'You can use pandas to analyze the CSV data efficiently...',
    timestamp: new Date('2025-01-22T16:45:00')
  },
  {
    id: '3',
    title: 'Docker Container Setup',
    lastMessage: 'The Dockerfile should include all necessary dependencies...',
    timestamp: new Date('2025-01-22T18:20:00')
  },
  {
    id: '4',
    title: 'API Authentication Methods',
    lastMessage: 'JWT tokens are commonly used for secure API authentication...',
    timestamp: new Date('2025-01-22T20:15:00')
  },
  {
    id: '5',
    title: 'Database Optimization Tips',
    lastMessage: 'Adding proper indexes can significantly improve query performance...',
    timestamp: new Date('2025-01-22T21:30:00')
  },
  {
    id: '6',
    title: 'CSS Grid Layout Tutorial',
    lastMessage: 'Grid template areas provide an intuitive way to design layouts...',
    timestamp: new Date('2025-01-22T22:45:00')
  },
  {
    id: '7',
    title: 'Git Workflow Best Practices',
    lastMessage: 'Always create feature branches for new development work...',
    timestamp: new Date('2025-01-23T00:01:00')
  }
]

export const useChatStore = defineStore('chat', {
  state: () => ({
    messages: [] as ChatMessage[],
    chatHistory: [...sampleChatHistory] as ChatSession[],
    isLoading: false,
    currentSessionId: null as string | null,
  }),

  actions: {
    async sendMessage(message: string) {
      if (!message.trim()) return

      this.isLoading = true
      
      // Create a new session if none exists
      if (!this.currentSessionId) {
        const newSession: ChatSession = {
          id: Date.now().toString(),
          title: message.slice(0, 30) + (message.length > 30 ? '...' : ''),
          lastMessage: message,
          timestamp: new Date()
        }
        this.chatHistory.unshift(newSession)
        this.currentSessionId = newSession.id
      }

      // Add user message
      this.messages.push({
        role: 'user',
        content: message
      })

      try {
        // Call OpenAI API
        const config = useRuntimeConfig()
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${config.openaiApiKey}`,
          },
          body: JSON.stringify({
            model: 'gpt-3.5-turbo',
            messages: this.messages,
          }),
        })

        const data = await response.json()
        const assistantMessage = data.choices[0].message.content

        // Add assistant message
        this.messages.push({
          role: 'assistant',
          content: assistantMessage
        })

        // Update current session
        const currentSession = this.chatHistory.find(session => session.id === this.currentSessionId)
        if (currentSession) {
          currentSession.lastMessage = assistantMessage
          currentSession.timestamp = new Date()
        }

      } catch (error) {
        console.error('Error:', error)
        // Handle error appropriately
      } finally {
        this.isLoading = false
      }
    },

    startNewChat() {
      this.messages = []
      this.currentSessionId = null
    },

    loadChatSession(sessionId: string) {
      // In a real app, you'd load messages from a backend
      // For now, we'll just switch sessions
      this.currentSessionId = sessionId
      this.messages = []
    },

    deleteChatSession(sessionId: string) {
      this.chatHistory = this.chatHistory.filter(session => session.id !== sessionId)
      if (this.currentSessionId === sessionId) {
        this.startNewChat()
      }
    }
  },
})
