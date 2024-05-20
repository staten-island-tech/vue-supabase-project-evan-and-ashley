<template>
  <header>
    <div class="wrapper">
      <nav>
        <RouterLink to="/explore" data-aos="slide-left" data-aos-duration="1000">Explore</RouterLink>
      </nav>
    </div>
  </header>
  <div class="container" style="padding: 50px 0 100px 0">
    <Account v-if="session" :session="session" />
    <Auth v-else />
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import Account from './components/Account.vue'
import Auth from './components/Auth.vue'
import { supabase } from '@/lib/supabaseClient'

const session = ref()

onMounted(() => {
  supabase.auth.getSession().then(({ data }) => {
    session.value = data.session
  })

  supabase.auth.onAuthStateChange((_, _session) => {
    session.value = _session
  })
})
</script>


<!--   
import { RouterLink, RouterView } from 'vue-router'
import Account from '/components/Account.vue'
import Auth from './components/Auth.vue'  -->

<!-- // const profiles = ref([])

// async function getProfiles() {
//   const { data, error } = await supabase.from('user_profile').select()
//   if (error) {
//     console.error(error)
//   } else {
//     profiles.value = data
//   }
// }

// const session = ref()
// onMounted(() => {
//   supabase.auth.getSession().then(({ data }) => {
//     session.value = data.session
//   })

//   supabase.auth.onAuthStateChange((_, _session) => {
//     session.value = _session
//   })
// })

// onMounted(async () => {
//   await getProfiles()
// })
</script>

<style scoped></style> -->
