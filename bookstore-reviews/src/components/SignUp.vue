<script setup lang="ts">
import { ref } from 'vue'
import { supabase } from '@/lib/supabaseClient'

const loading = ref(false)
const email = ref('')
const password = ref('')

const handleSignUp = async () => {
  try {
    loading.value = true
    const { error } = await supabase.auth.signUp({
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
    isLoggedIn.value = true
  }
}
</script>

<template>
  <RouterLink to="/" data-aos="slide-left" data-aos-duration="1000">Go Back</RouterLink>
  <form class="row flex-center flex" @submit.prevent="handleSignUp">
    <div class="col-6 form-widget">
      <h1 class="header">Bookstore Reviews</h1>
      <p class="description">Create Your Account</p>
      <div>
        <input class="inputField" required type="email" placeholder="Your email" v-model="email" />
        <input
          class="inputField"
          required
          type="password"
          placeholder="Your password"
          v-model="password"
        />
        <!-- take to homeview when login -->
        <!-- sign up or login-->
      </div>
      <div>
        <input
          type="submit"
          class="button block"
          :value="loading ? 'Loading' : 'Sign Up'"
          :disabled="loading"
        />
      </div>
    </div>
  </form>
</template>
