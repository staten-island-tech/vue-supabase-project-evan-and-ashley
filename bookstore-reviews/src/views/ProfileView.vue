<template>
  <div v-if="sessionStore().isLoggedIn">This is Your Profile</div>
  <RouterLink v-if="!sessionStore().isLoggedIn" to="/">Sign in or Make an Account </RouterLink>
</template>

<script setup lang="ts">
import { sessionStore } from '@/stores/authStore'
</script>

<style scoped></style>
