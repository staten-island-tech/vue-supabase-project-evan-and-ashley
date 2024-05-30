<template>
    <div>
      <label> Search book by title: </label>
      <input type="text" v-model="inputTitle" id = "title"> 
      <button @click="fetchData">Search</button>

    </div>
    
</template>
<script setup>
import { ref, onMounted, computed } from 'vue'
const inputTitle = ref('')
const bookData = ref(null)
const errorMessage = ref(null)
const API = computed(() => `https://openlibrary.org/search.json?title=${inputTitle.value}&limit=20`)

async function fetchData() {
  if (inputTitle.value.length === 0) {
    errorMessage.value = 'Please enter a valid title.'
    return
  }

  try {
    bookData.value = null
    const res = await fetch(API.value)
    if (res.status >= 200 && res.status < 300) {
      bookData.value = await res.json()
      console.log(bookData.value)
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
  fetchData(API.value)
})

</script>

<style lang="scss" scoped>

</style>