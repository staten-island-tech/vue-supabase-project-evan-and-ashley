<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'

import { ref, onMounted } from 'vue'
import { supabase } from './lib/supabaseClient'

const profiles = ref([])

async function getProfiles() {
  const { data, error } = await supabase.from('user_profile').select()
  if (error) {
    console.error(error)
  } else {
    profiles.value = data
  }
}

onMounted(async () => {
  await getProfiles()
})
</script>

<template>
  <ul>
    <li v-for="profile in profiles" :key="profile.id">{{ profile.username }}</li>
    <!-- https://supabase.com/docs/guides/getting-started/quickstarts/vue
    https://supabase.com/dashboard/project/kzqlgtcpzttmatwfxlxz
  --></ul>
  <div>
    <nav>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/profile">Profile</RouterLink>
    </nav>
  </div>
  <RouterView />
</template>

<style scoped></style>
