<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { ref, onMounted } from 'vue'
import { supabase } from './lib/supabaseClient'

const profiles = ref([])

async function getProfiles() {
  const { data } = await supabase.from('countries').select()
  profiles.value = data
}

onMounted(() => {
  getProfiles()
})
</script>

<template>
  <ul>
    <!-- <li v-for="country in profiles" :key="country.id">{{ country.name }}</li> 
    https://supabase.com/docs/guides/getting-started/quickstarts/vue
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
