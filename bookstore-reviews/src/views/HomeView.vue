<template>
  <header v-if="isLoggedIn">
    <div>This is your personal library</div>
  </header>
  <RouterLink v-if="!isLoggedIn" to="/">Sign in or Make an Account </RouterLink>
</template>

<script setup lang="ts">
import { userAuthStore } from '@/stores/authStore'
const { isLoggedIn } = userAuthStore()
</script>

<style scoped></style>
