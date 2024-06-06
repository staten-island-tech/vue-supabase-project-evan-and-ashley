<template>
  <header v-if="sessionStore().session.isLoggedIn">
    <h2>This is your personal library</h2>
    <div v-if="reviewComments.length > 0">
      <div v-for="(review, index) in reviewComments" :key="index">
        <img :src="`https://covers.openlibrary.org/b/id/${review.book_id}-L.jpg`" />
        <h2>Tile: {{ review.book_title }}</h2>
        <h2>Rating: {{ review.rating }}</h2>
        <h2>Comment: {{ review.comment }}</h2>
        <button @click="removeComment(review.id)">Remove Comment</button>
      </div>
    </div>
  </header>
  <header v-if="!sessionStore().session.isLoggedIn">
    You have Been Logged out <RouterLink to="/">Sign in or Make an Account </RouterLink>
  </header>
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'
import { supabase } from '@/lib/supabaseClient'
import { storeToRefs } from 'pinia'
import { sessionStore } from '@/stores/authStore'
import type { ReviewCommentHome } from '@/assets/types'

const authStore = sessionStore()
const { session } = storeToRefs(authStore)
const user = ref<string>(session.value.user.id)
const reviewComments = ref<ReviewCommentHome[]>([])

async function getUserComments() {
  const { data: commentsData, error: commentsError } = await supabase.rpc('new_get_user_review', {
    current_user_id: user.value
  })

  if (commentsError) {
    console.log(commentsError)
  } else {
    reviewComments.value = commentsData
    console.log(reviewComments)
  }
}

onMounted(async () => {
  await getUserComments()
})

async function removeComment(commentId: String) {
  try {
    const { error } = await supabase.from('review').delete().eq('id', commentId)
    if (error) {
      console.log(error)
    } else {
      reviewComments.value = reviewComments.value.filter((comment) => comment.id !== commentId)
    }
  } catch (error) {
    console.log(error)
  }
}
</script>

<style scoped></style>
