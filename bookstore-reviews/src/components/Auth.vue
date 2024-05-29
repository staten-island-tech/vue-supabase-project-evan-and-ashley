<template>
  <form class="row flex-center flex" @submit.prevent="handleLogin">
    <div class="col-6 form-widget">
      <h1 class="header">Sign in</h1>
      <div>
        <input class="inputField" required type="email" placeholder="Your email" v-model="email" />
      </div>
      <input
        class="inputField"
        required
        type="password"
        placeholder="Your password"
        v-model="password"
      />
      <div>
        <input
          type="submit"
          class="button block"
          :value="loading ? 'Loading' : 'Login'"
          :disabled="loading"
        />
      </div>
    </div>
  </form>
  <RouterLink to="/SignUp" data-aos="slide-left" data-aos-duration="1000">Sign Up</RouterLink>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { supabase } from '@/lib/supabaseClient'

const loading = ref(false)
const email = ref('')
const password = ref('')

const handleLogin = async () => {
  try {
    loading.value = true
    const { error } = await supabase.auth.signInWithPassword({
      email: email.value,
      password: password.value
    })
    if (error) throw error
    alert('Check your email for the login link!')
  } catch (error) {
    if (error instanceof Error) {
      alert(error.message)
    }
  } finally {
    loading.value = false
  }
}
</script>

<style scoped></style>
