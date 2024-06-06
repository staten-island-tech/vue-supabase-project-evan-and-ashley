<template>
  <header v-if="sessionStore().session.isLoggedIn">
    <h2>This is Your Profile</h2>
    <div v-if="!isEditing">
      <div>Full Name: {{ profile.full_name }}</div>
      <div>Username: {{ profile.username }}</div>
      <div>Email: {{ profile.email }}</div>
      <div>Bio: {{ profile.bio }}</div>
      <button type="button" @click="isEditing = true">Edit Profile</button>
    </div>
    <form v-if="isEditing" @submit.prevent="updateProfile">
      <label for="full-name">Full Name:</label>
      <input type="text" id="full-name" v-model="profile.full_name" />
      <br />
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
      <button type="button" @click="isEditing = false">Back</button>
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

interface Profile {
  username: string
  email: string
  bio: string
  full_name: string
}

const profile = ref<Profile>({
  username: '',
  email: '',
  bio: '',
  full_name: ''
})

const isEditing = ref<boolean>(false)

let data: Profile | null = null

onMounted(async () => {
  if (sessionStore().session.isLoggedIn) {
    const { data: fetchData, error } = await supabase
      .from('profiles')
      .select('username, bio, email, full_name')
      .eq('user_id', sessionStore().session.user.id)
      .single()
    if (error) {
      console.error(error)
    } else {
      data = fetchData
      profile.value = data
    }
  }
})

async function updateProfile(): Promise<void> {
  if (sessionStore().session.isLoggedIn) {
    const updates = {
      username: profile.value.username,
      bio: profile.value.bio,
      email: profile.value.email,
      full_name: profile.value.full_name ?? ''
    }

    if (data != null) {
      const { data: updateData, error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('user_id', sessionStore().session.user.id)
      if (error) {
        console.error(error)
      } else {
        alert('Profile updated successfully!')
        isEditing.value = false
      }
    } else {
      const { data: insertData, error } = await supabase
        .from('profiles')
        .insert({ ...updates, user_id: sessionStore().session.user.id })
      if (error) {
        console.error(error)
      } else {
        alert('Profile created successfully!')
        isEditing.value = false
      }
    }
  }
}
</script>

<style scoped></style>
