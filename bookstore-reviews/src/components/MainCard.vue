<template>
  <article class="card">
    <figure class="card-image"> 
      <img :src="link" />
    </figure>
    <h1 class="card-header">
      {{ book.title }}
    </h1>
    
    <router-link :to="bookPath">
      <button class="icon-button" >Learn More</button>
    </router-link>
  </article>
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

@import url('https://fonts.googleapis.com/css2?family=Lexend:wght@300;400;500;600;700;800;900&display=swap');

*, *:after, *:before {
	box-sizing: border-box;
}

body {
	font-family: "Lexend", sans-serif;
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
	background-color: gray;
  box-shadow: 0 0 0 1px rgba(#000, .05), 0 20px 50px 0 rgba(#000, .1);
	border-radius: 15px;
	overflow: hidden;
	padding: 1.25rem;
	position: relative;
	transition: .15s ease-in;
  align-items: center;
	
	&:hover, &:focus-within {
		box-shadow: 0 0 0 2px #16C79A, 0 10px 60px 0 rgba(#000, .1);
			transform: translatey(-5px);
	}
}

.card-image {
	border-radius: 10px;
	overflow: hidden;
}
/* 
.card-header {
	margin-top: 1.5rem;
	display: flex;
	align-items: center;
	justify-content: space-between;
	a {
		font-weight: 600;
		font-size: 1.375rem;
		line-height: 1.25;
		padding-right: 1rem;
		text-decoration: none;
		color: inherit;
		will-change: transform;
		&:after {
			content: "";
			position: absolute;
			left: 0;
			top: 0;
			right: 0;
			bottom: 0;
		}
	}
	
	
}

.icon-button {
	border: 0;
	background-color: #fff;
	border-radius: 50%;
	width: 2.5rem;
	height: 2.5rem;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-shrink: 0;
	font-size: 1.25rem;
	transition: .25s ease;
	box-shadow: 0 0 0 1px rgba(#000, .05), 0 3px 8px 0 rgba(#000, .15);
	z-index: 1;
	cursor: pointer;
	color: #565656;
	
	svg {
		width: 1em;
		height: 1em;
	}
	&:hover, &:focus {
		background-color: #EC4646;
		color: #FFF;
	}
}

.card-footer {
	margin-top: 1.25rem;
	border-top: 1px solid #ddd;
	padding-top: 1.25rem;
	display: flex;
	align-items: center;
	flex-wrap: wrap;
}

.card-meta {	
	display: flex;
	align-items: center;
	color: #787878;
	&:first-child:after {
		display: block;
		content: "";
		width: 4px;
		height: 4px;
		border-radius: 50%;
		background-color: currentcolor;
		margin-left: .75rem;
		margin-right: .75rem;
	}
	svg {
		flex-shrink: 0;
		width: 1em;
		height: 1em;
		margin-right: .25em;
	}
} */
</style>
