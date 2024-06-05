<template>
  <header v-if="sessionStore().session.isLoggedIn">
    <h2>This is Your Profile</h2>
    <div>Username:</div>
    <div>Email:</div>
    <div>Bio:</div>
    <div>Full Name:</div>
    <button type="submit">Edit Profile</button>
    <form @submit.prevent="updateProfile">
      <label for="username">Username:</label>
      <input type="text" id="username" v-model="profile.username" />
      <br />
      <label for="email">Email:</label>
      <input type="email" id="email" v-model="profile.email" />
      <br />
      <label for="bio">Bio:</label>
      <textarea id="bio" v-model="profile.bio" />
      <br />
      <button type="submit">Update Profile</button>
    </form>
  </header>
  <header v-if="!sessionStore().session.isLoggedIn">
    You have Been Logged out <RouterLink to="/">Sign in or Make an Account </RouterLink>
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { supabase } from '@/lib/supabaseClient'
import { sessionStore } from '@/stores/authStore'

const profile = ref({
  username: '',
  email: '',
  bio: ''
})

onMounted(async () => {
  if (sessionStore().session.isLoggedIn) {
    const { data, error } = await supabase
      .from('profiles')
      .select('username, bio, email')
      .eq('id', sessionStore().session.user.id)
      .single()
    if (error) {
      console.error(error)
    } else {
      profile.value = data
    }
  }
})

async function updateProfile() {
  if (sessionStore().session.isLoggedIn) {
    const { data, error } = await supabase
      .from('profiles')
      .update({ id: sessionStore().session.user.id, ...profile.value })
    if (error) {
      console.error(error)
    } else {
      console.log('Profile updated successfully!')
    }
  }
}
</script>

<style scoped></style>
