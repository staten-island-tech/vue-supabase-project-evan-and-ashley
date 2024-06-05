<template>
  <div class="book-card">
    <h1>
      {{ book.title }}
    </h1>
    <img :src="link" />
    <router-link :to="bookPath">
      <button>Learn More</button>
    </router-link>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { defineProps } from 'vue'
import AOS from 'aos'
import 'aos/dist/aos.css'
AOS.init()

const props = defineProps({
  book: Object
})

const coverId = ref('')
const link = ref('')
const tempKey = ref('')
const key = ref('')

onMounted(() => {
  coverId.value = props.book.cover_i
  link.value = `https://covers.openlibrary.org/b/id/${coverId.value}-L.jpg`
  tempKey.value = props.book.key
  key.value = tempKey.value.slice(7)
  console.log(coverId.value)
  console.log(link.value)
  console.log(key.value)
})

const bookPath = computed(() => {
  return `/bookData/${key.value}`
})
console.log(bookPath)
</script>

<style scoped>
.book-card {
  background-color: aqua;
  margin-top: 2rem;
  max-width: 50vw;
}
</style>
