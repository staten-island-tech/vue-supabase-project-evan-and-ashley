<template>
  <header v-if="sessionStore().session.isLoggedIn">
    <div>This is your personal library</div>
  </header>
  <header v-if="!sessionStore().session.isLoggedIn">
    You have Been Logged out <RouterLink to="/">Sign in or Make an Account </RouterLink>
  </header>
</template>

<script setup lang="ts">
import { sessionStore } from '@/stores/authStore'
</script>

<style scoped></style>
