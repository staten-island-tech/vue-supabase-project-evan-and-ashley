<template>
  <article class="card">
    <figure class="card-image">
      <img :src="link" />
    </figure>
    <h1 class="card-header">
      {{ book.title }}
    </h1>

    <router-link :to="bookPath">
      <button class="icon-button">Learn More</button>
    </router-link>
  </article>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, type PropType } from 'vue'
import { defineProps } from 'vue'
import AOS from 'aos'
import 'aos/dist/aos.css'
AOS.init()

interface Book {
  cover_id: string
  key: string
  title: string
}

const props = defineProps({
  book: {
    type: Object as PropType<Book>,
    required: true
  }
})

const coverId = ref<string>('')
const link = ref<string>('')
const tempKey = ref<string>('')
const key = ref<string>('')

onMounted(() => {
  coverId.value = props.book.cover_i
  link.value = `https://covers.openlibrary.org/b/id/${coverId.value}-L.jpg`
  tempKey.value = props.book.key
  key.value = tempKey.value.slice(7)
  console.log(props.book)
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
@import url('https://fonts.googleapis.com/css2?family=Lexend:wght@300;400;500;600;700;800;900&display=swap');

*,
*:after,
*:before {
  box-sizing: border-box;
}

body {
  font-family: 'Lexend', sans-serif;
  line-height: 1.5;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #393232;
}

img {
  max-width: 13rem;
  display: block;
}

.card-list {
  width: 90%;
  max-width: 400px;
}

.card {
	background-color: white;
  box-shadow: 0.50rem 0 0.50rem rgba(0, 0, 0, 0.25);
	border-radius: 15px;
  width: 19rem;
	overflow: hidden;
	padding: 1.25rem;
	position: relative;
	transition: .15s ease-in;
  display: flex; /* add this */
  flex-direction: column; /* add this */
  align-items: center; /* add this */
  text-align: center; /* add this */
  margin-top: 2rem;
  margin-left: 2rem;

	
	&:hover, &:focus-within {
		box-shadow: 0 0 0 2px #16C79A;
			transform: translatey(-5px);
	}
}

.card-image {
	border-radius: 10px;
	overflow: hidden;
  display: flex; /* add this */
  justify-content: center; /* add this */

}
button{

  display: inline-block;
                outline: 0;
                border: 0;
                cursor: pointer;
                border-radius: 8px;
                padding: 14px 24px 16px;
                font-size: 18px;
                font-weight: 700;
                line-height: 1;
                transition: transform 200ms,background 200ms;
                background: transparent;
                color: #000000;
                box-shadow: 0 0 0 3px #000000 inset;
                :hover{
                    transform: translateY(-2px);
                }
                
}
</style>
