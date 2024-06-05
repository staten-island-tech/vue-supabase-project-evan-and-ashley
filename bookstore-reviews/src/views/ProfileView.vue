<template>
  <div v-if="isLoggedIn">This is Your Profile</div>
  <RouterLink v-if="!isLoggedIn" to="/">Sign in or Make an Account </RouterLink>
</template>

<script setup lang="ts">
import { userAuthStore } from '@/stores/authStore'
const { isLoggedIn } = userAuthStore()
</script>

<style scoped></style>
