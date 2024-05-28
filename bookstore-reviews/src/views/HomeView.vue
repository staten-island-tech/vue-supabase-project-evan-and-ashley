<template>
  <div>
    <div>
      <form name="login-form" @submit.prevent="login">
        <div>
          <label for="username">Username: </label>
          <input id="username" type="text" v-model="username" />
        </div>
        <div>
          <label for="password">Password: </label>
          <input id="password" type="password" v-model="password" />
        </div>
      </form>
    </div>
  </div>
  <!-- import books to exploreview and setup home ui in app.vue
  HomeView will have user's saved books and personal library
  ExploreView will have every book with comments and ratings -->
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
