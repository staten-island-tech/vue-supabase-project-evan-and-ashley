<template>
  <article class="card">
    <figure class="card-image"> 
      <img :src="link" alt="image of book" />
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

img {
	max-width: 13rem;
	display: block;
  margin: auto; /* add this */

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
