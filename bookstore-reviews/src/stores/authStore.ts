import { ref } from 'vue'

const isLoggedIn = ref(false)

export function userAuthStore() {
  return {
    isLoggedIn
  }
}
