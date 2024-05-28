<template>
    <div>
      <label> Search book by title: </label>
      <input type="text" v-model="inputTitle" id = "title"> 

    </div>
    
</template>

<script setup>
import { ref , onMounted} from 'vue'
console.log("error")

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


onMounted(() => {
  fetchData(API)
})

</script>

<style lang="scss" scoped>

</style>