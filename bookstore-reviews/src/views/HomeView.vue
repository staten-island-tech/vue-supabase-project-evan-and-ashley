<template>
  <div>This is your personal library</div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const username = ref('')
const password = ref('')

async function login() {
  try {
    const response = await fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: username.value.toLowerCase(),
        password: password.value
      })
    })
    const data = await response.json()
    console.log(data)
  } catch (error) {
    console.error(error)
  }
}
</script>

<style scoped></style>
