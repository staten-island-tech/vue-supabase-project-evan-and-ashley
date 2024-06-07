<template>
  <header v-if="sessionStore().session.isLoggedIn">
    <div class="wrapper">
      <nav>
        <ul>
          <li>
            <RouterLink to="/home">Home</RouterLink>
          </li>
          <li>
            <RouterLink to="/explore">Explore</RouterLink>
          </li>
          <li>
            <RouterLink to="/profile">Profile</RouterLink>
          </li>
        </ul>
        <div class="logo-container"> 
          <img src='@/images/bookstore.png' alt="Bookhub logo"/>
          <span class="website-name">BookHub</span>
        </div>
      </nav>
      <button @click="signOut" :disabled="loading" alt="sign out button">Sign Out</button>

    </div>
  </header>
  <header v-if="!sessionStore().session.isLoggedIn">
    <div>Welcome To Bookstore Reviews</div>
  </header>
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
const loading = ref<boolean>(false)

async function signOut(): Promise<void> {
  try {
    loading.value = true
    const { error } = await supabase.auth.signOut()
    if (error) throw error
  } catch (error: any) {
    alert(error.message)
  } finally {
    loading.value = false
    sessionStore().session.user.id = ''
    sessionStore().session.isLoggedIn = false
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

.wrapper {
    width: 100%;
    box-sizing: border-box; 
  }

  nav {
    display: flex; 
    justify-content: space-between;
    align-items: center; 
    background-color: #f5f5f5; 
    padding: 20px; 
  }

  ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
    display: flex; 
  }

  li {
    margin-right: 20px; 
    font-size: 2rem;
  }

  a {
    display: block;
    margin-left: 1rem;
    background-color: #f5f5f5;
        color: #333; 
    text-decoration: none; 
  }

  /* Add this to add an image to the nav bar */
  nav img {
    width: 5rem; /* set image width */
    height: 5rem; 
    margin-right: 10px; 
  }

  button {
    background-color: #333;
    color: #fff;
    border: none;
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
  }

  button:hover {
    background-color: #444;
  }

  .logo-container {
   display: flex; /* added this to make logo and website name inline */
   align-items: center; /* added this to center logo and website name vertically */
 }

 .website-name {
   font-size: 3rem; /* added this to style the website name */
    font-weight: bold; /* added this to style the website name */
    margin-left: 10px; /* added this to add space between logo and website name */
 }


</style>
