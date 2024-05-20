<template>
    <div>
        <h1> hellow</h1>
    </div>
</template>

<script setup>
import { ref } from 'vue'


const bookData = ref(null)
    const API = 'https://openlibrary.org/search.json?title=lost'
    async function fetchData(link) {
  try {
    bookData.value = null
    const res = await fetch(link)
    if (res.status >= 200 && res.status < 300) {
        bookData.value = await res.json()
      console.log(bookData.value)
    } else {
      throw new Error(res.statusText)
    }
  } catch (error) {
    console.log(error)
  }
}


</script>

<style lang="scss" scoped>

</style>