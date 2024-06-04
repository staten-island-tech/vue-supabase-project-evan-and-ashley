<template>
  <header v-if="isLoggedIn">
    <div>This is your personal library</div>
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { userAuthStore } from '@/stores/authStore'
const { isLoggedIn } = userAuthStore()
</script>

<style scoped></style>
