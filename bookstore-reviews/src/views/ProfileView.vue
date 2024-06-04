<template>
  <div v-if="isLoggedIn">This is Your Profile</div>
</template>

<script setup lang="ts">
import { userAuthStore } from '@/stores/authStore'
const { isLoggedIn } = userAuthStore()
</script>

<style scoped></style>
