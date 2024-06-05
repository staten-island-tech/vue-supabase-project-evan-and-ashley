<template>
  <header v-if="sessionStore().isLoggedIn">
    <div>This is your personal library</div>
  </header>
  <RouterLink v-if="!sessionStore().isLoggedIn" to="/">Sign in or Make an Account </RouterLink>
</template>

<script setup lang="ts">
import { sessionStore } from '@/stores/authStore'
</script>

<style scoped></style>
