<template>
  <header v-if="isLoggedIn">
    <div class="wrapper">
      <nav>
        <RouterLink to="/explore" data-aos="slide-left" data-aos-duration="1000"
          >Explore</RouterLink
        >
        <RouterLink to="/explore" data-aos="slide-left" data-aos-duration="1000"
          >Explore</RouterLink
        >
        <RouterLink to="/explore" data-aos="slide-left" data-aos-duration="1000"
          >Explore</RouterLink
        >
      </nav>
      </div>
  </header>

</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router'
import AOS from 'aos'
import 'aos/dist/aos.css'
AOS.init()

import { onMounted, ref } from 'vue'
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
