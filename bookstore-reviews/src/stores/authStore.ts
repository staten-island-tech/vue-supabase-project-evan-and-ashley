import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { SessionData } from '@/assets/types'

export const sessionStore = defineStore('session', () => {
  const session = ref<SessionData>({
    isLoggedIn: false,
    user: {
      id: '',
      email: '',
      username: ''
    }
  })
  return { session }
})
