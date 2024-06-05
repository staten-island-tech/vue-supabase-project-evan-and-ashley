<template>
  <header v-if="sessionStore().session.isLoggedIn">
    <div class="wrapper">
      <nav>
        <RouterLink to="/home">Home</RouterLink>
        <RouterLink to="/explore">Explore</RouterLink>
        <RouterLink to="/profile">Profile</RouterLink>
        <RouterLink to="/reviewed">Reviewed Books</RouterLink>
        <button @click="signOut" :disabled="loading">Sign Out</button>
      </nav>
    </div>
  </header>
  <header v-if="!sessionStore().session.isLoggedIn">
    <div>Welcome To Bookstore Reviews</div>
  </header>
  <div class="container" style="padding: 50px 0 100px 0"></div>
  <RouterView />
</template>

<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import AOS from 'aos'
import 'aos/dist/aos.css'
AOS.init()

import { onMounted, ref } from 'vue'
import { supabase } from '@/lib/supabaseClient'
import { sessionStore } from './stores/authStore'

const session = ref()
const loading = ref(false)

async function signOut() {
  try {
    loading.value = true
    const { data, error } = await supabase.auth.signOut()
    if (error) throw error
    return data
  } catch (error) {
    alert(error.message)
  } finally {
    loading.value = false
    //  sessionStore.$patch({
    //     isLoggedIn: false,
    //     userId: '',
    // })
  }
}

onMounted(() => {
  supabase.auth.getSession().then(({ data }) => {
    session.value = data.session
  })
})

supabase.auth.onAuthStateChange((_, _session) => {
  session.value = _session
})
</script>

<style scoped>
ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
}
li {
  display: inline;
  float: left;
}

a {
  display: block;
  padding: 8px;
  background-color: #dddddd;
}
</style>
