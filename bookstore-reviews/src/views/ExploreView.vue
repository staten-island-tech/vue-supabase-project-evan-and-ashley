<template>
  <div v-if="sessionStore().session.isLoggedIn">
    <h2>Search Up Books and Leave Reviews</h2>
    <label> Search book by title: </label>
    <input type="text" v-model="inputTitle" id="title" />
    <button @click="fetchData">Search</button>
    <div class="all-cards">
      <MainCard v-for="(book, index) in justBooks" :key="index" :book="book" />
    </div>
  </div>
  <header v-if="!sessionStore().session.isLoggedIn">
    You have Been Logged out <RouterLink to="/">Sign in or Make an Account </RouterLink>
  </header>
</template>
<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { sessionStore } from '@/stores/authStore'
import MainCard from '@/components/MainCard.vue'

interface BookData {
  docs: any[]
}

const inputTitle = ref('')
const bookData = ref<BookData | null>(null)
const justBooks = ref<any[]>([])
const errorMessage = ref(<string | null>null)
const API = computed(() => `https://openlibrary.org/search.json?title=${inputTitle.value}&limit=20`)

async function fetchData() {
  if (inputTitle.value.length === 0) {
    errorMessage.value = 'Please enter a valid title.'
    return
  }

  try {
    bookData.value = null
    justBooks.value = []
    const res = await fetch(API.value)
    if (res.status >= 200 && res.status < 300) {
      bookData.value = await res.json()
      if (bookData.value) {
        justBooks.value = bookData.value.docs
      }
      // console.log(bookData.value)
      console.log(justBooks.value)
      errorMessage.value = null
    } else {
      throw new Error(res.statusText)
    }
  } catch (error) {
    console.log(error)
    errorMessage.value = 'An error occurred while making the API request.'
  }
}

onMounted(() => {
  fetchData()
})
</script>

<style scoped></style>
