<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { ref, onMounted } from 'vue'
import { supabase } from './lib/supabaseClient'
import Account from './components/Account.vue'
import Auth from './components/Auth.vue'

const profiles = ref([])

async function getProfiles() {
  const { data, error } = await supabase.from('user_profile').select()
  if (error) {
    console.error(error)
  } else {
    profiles.value = data
  }
}

const session = ref()
onMounted(() => {
  supabase.auth.getSession().then(({ data }) => {
    session.value = data.session
  })

  supabase.auth.onAuthStateChange((_, _session) => {
    session.value = _session
  })
})

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
  <div class="container" style="padding: 50px 0 100px 0">
    <Account v-if="session" :session="session" />
    <Auth v-else />
  </div>
  <RouterView />
</template>

<style scoped></style>
