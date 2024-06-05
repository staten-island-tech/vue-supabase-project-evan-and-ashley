import { defineStore } from 'pinia'
import { ref } from 'vue'

export const sessionStore = defineStore('session', () => {
  const isLoggedIn = ref(false)

  return { isLoggedIn }
})
