<template>
  <div>
    <h2>{{ works.title }}</h2>
    <img :src="String(link)" alt="book image" />
    <p>{{ works.description }}</p>

    <h2>Leave Review for the book</h2>
    <label for="rating"> Rating: </label>
    <select id="rating" v-model="rating">
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
      <option value="4">4</option>
      <option value="5">5</option>
    </select>

    <label for="comment">Comment: </label>
    <textarea id="comment" v-model="comment"></textarea>

    <button type="submit" @click="submitReview">Submit Review</button>

    <h2>REVIEWS</h2>
    <h2>Book Rating: {{ avgRating }}</h2>
    <ul v-if="reviewComments.length > 0">
      <li v-for="(review, index) in reviewComments" :key="index">
        <p>Rating: {{ review.rating }} / 5</p>
        <p>Comment: {{ review.comment }}</p>
        <p>By: {{ review.username }}</p>
      </li>
    </ul>
    <p v-else>No reviews yet!</p>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { supabase } from '@/lib/supabaseClient'
import { storeToRefs } from 'pinia'
import { sessionStore } from '@/stores/authStore'
import type { SessionData, Book, ReviewCommentBook } from '@/assets/types'

const authStore = sessionStore()
const { session } = storeToRefs(authStore)
const user = ref<SessionData['user']['id']>(session.value.user.id)
console.log(user)
const rating = ref('')
const comment = ref('')
let works = ref<Book>({
  key: '',
  title: '',
  description: '',
  covers: []
})
const link = ref<String>('')

const API = computed(() => `https://openlibrary.org/works/${route.params.id}.json`)
const route = useRoute()
const errorMessage = ref<string | null>(null)
const loading = ref<boolean>(true)
const reviewComments = ref<ReviewCommentBook[]>([])
const avgRating = ref<number | null>(null)

//no paramter herE?
async function fetchData(): Promise<void> {
  try {
    const res = await fetch(`https://openlibrary.org/works/${route.params.id}.json`)
    if (res.status >= 200 && res.status < 300) {
      works.value = await res.json()
      console.log(works)
      errorMessage.value = null
    } else {
      throw new Error(res.statusText)
    }
  } catch (error) {
    console.log(error)
    errorMessage.value = 'An error occurred while making the API request.'
  }
}

async function submitReview(): Promise<void> {
  if (rating.value && comment.value) {
    try {
      const { data: reviewData, error: reviewError } = await supabase.from('review').insert([
        {
          book: works.value.key,
          user: user.value,
          rating: parseInt(rating.value),
          comment: comment.value
        }
      ])
      console.log(reviewData)
      if (reviewError) {
        console.log(reviewError)
      } else {
        console.log('Review submitted successfully')
      }

      const { data: existingBook, error: existingBookError } = await supabase
        .from('books')
        .select('cover_id')
        .eq('cover_id', works.value.covers[0])
      if (existingBook !== null) {
        if (existingBook.length > 0) {
          console.log(existingBook)
        } else if (existingBookError) {
          console.log(existingBookError)
        }
      } else {
        const { data: bookData, error: bookError } = await supabase.from('books').insert([
          {
            key: works.value.key,
            title: works.value.title,
            description: works.value.description,
            covers: works.value.covers[0]
          }
        ])
        if (bookError) {
          console.log(bookError)
        } else {
          console.log('book updated')
        }
      }
    } catch (error) {
      console.log(error)
    }
  } else {
    alert('Please fill in all fields')
  }
}

async function getComments() {
  const { data: commentsData, error: commnetsError } = await supabase.rpc('get_book_review', {
    book_id: works.value.key
  })
  if (commnetsError) {
    console.log(commnetsError)
  } else {
    reviewComments.value = commentsData
    console.log(reviewComments)
  }
}

async function getRating() {
  const { data: ratingData, error: ratingError } = await supabase.rpc('get_book_rating', {
    p_book_id: works.value.key
  })
  if (ratingError) {
    console.log(ratingError)
  } else {
    avgRating.value = ratingData[0].avg_rating
    console.log(avgRating.value)
  }
}

onMounted(async () => {
  await fetchData() //paramater here
  link.value = `https://covers.openlibrary.org/b/id/${works.value.covers[0]}-L.jpg`
  await getComments()
  await getRating()
})
</script>

<style lang="scss" scoped></style>
