<template>
  <div v-if="sessionStore().session.isLoggedIn">
    <div class="header-content">
      <div class="search">
        <label class="label" for="title"> Search book</label>
        <input
          type="text"
          v-model="inputTitle"
          id="title"
          placeholder="What book are you looking for?"
          class="searchTerm"
        />
        <button @click="fetchData" class="searchButton">search</button>
      </div>
    </div>
    <div>Search Up Books and Leave Reviews</div>
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

const inputTitle = ref<string>('')
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
        bookData.value.docs.forEach((book) => {
          let link = ''
          if (book.cover_i) {
            link = `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`
          }
          justBooks.value.push({ ...book, link })
        })
      }
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

<style scoped>
.header-content {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 75vh;
  background: linear-gradient(rgb(141, 39, 174, 0.3), rgba(141, 39, 174, 0.5)),
    url(@/images/library-img.jpg);
}

.search {
  width: 30%;
  position: relative;
  display: flex;
  align-items: center;
}

.searchTerm {
  width: 20%;
  border: 3px solid #00b4cc;
  border-right: none;
  padding: 5px;
  height: 36px;
  border-radius: 5px 0 0 5px;
  outline: none;
  color: #9dbfaf;
  flex: 1;
}

.searchTerm:focus {
  color: #00b4cc;
}

.searchButton {
  width: 6rem;
  height: 36px;
  border: 1px solid #00b4cc;
  background: #00b4cc;
  text-align: center;
  color: black;
  border-radius: 0 5px 5px 0;
  cursor: pointer;
  font-size: 20px;
}
.all-cards {
  flex-wrap: wrap;
  display: flex;
  justify-content: space-around;
}
.label {
  font-weight: 500;
  color: white;
  margin-right: 10px; /* add some margin to separate from the input field */
  display: inline-block; /* make it an inline-block element */
  vertical-align: middle; /* align it vertically with the input field */
}
</style>
