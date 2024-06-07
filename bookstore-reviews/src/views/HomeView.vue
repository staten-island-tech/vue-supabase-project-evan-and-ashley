<template>
  <header v-if="sessionStore().session.isLoggedIn">
    <h1>Comments you have made:</h1>
    <div v-if="reviewComments.length > 0">
      <div v-for="(review, index) in reviewComments" :key="index" class="review">
        <div class="review-img">
          <img
            :src="`https://covers.openlibrary.org/b/id/${review.book_id}-L.jpg`"
            alt="'book image'"
          />
        </div>
        <div class="review-content">
          <h2>Title: {{ review.book_title }}</h2>
          <h2>Rating: {{ review.rating }}</h2>
          <h2>Comment: {{ review.comment }}</h2>
          <button @click="removeComment(review)">Remove Comment</button>
        </div>
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
const reviewComments = ref<ReviewCommentHome[]>([])

async function getUserComments() {
  const { data: commentsData, error: commentsError } = await supabase
    .from('review')
    .select('user, book, rating, comment')
    .eq('user', sessionStore().session.user.id)

  if (commentsError) {
    console.log(commentsError)
  } else {
    // reviewComments.value = commentsData
    console.log(reviewComments.value)
  }
}

onMounted(async () => {
  if (sessionStore().session.user.id) {
    await getUserComments()
  } else {
    console.log('User ID is not defined')
  }
})

async function removeComment(review: ReviewCommentHome) {
  try {
    const { error } = await supabase.from('review').delete().eq('id', review.book_id)
    if (error) {
      console.log(error)
    } else {
      reviewComments.value = reviewComments.value.filter((r) => r.book_id !== review.book_id)
    }
  } catch (error) {
    console.log(error)
  }
}
</script>

<style scoped>
.review:not(:last-child) {
  border-bottom: 1px solid #ccc; 
}
.review {
  border-bottom: 1px solid gray;
  display: flex;
  margin-top: 1rem;
}
.review-content {
  margin-left: 1rem;
}
img {
  max-width: 5rem;
  display: block;
}
</style>
