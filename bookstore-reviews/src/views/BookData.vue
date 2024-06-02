<template>
    <div>
        <h1 >Loading...</h1>
        <h1 >{{ works.value.title }}</h1>
        <p >{{ works.value.description.value }}</p>
    </div>
</template>

<script setup>
import { onMounted, ref, computed } from 'vue';
import { useRoute } from 'vue-router';


const works = ref('');
const API = computed(() => `https://openlibrary.org/works/${route.params.id}.json`);
const route = useRoute();
const errorMessage = ref(null)
const loading = ref(true);

async function fetchData() {
    try {
        works.value = null
        const res = await fetch(API.value)
        if (res.status >= 200 && res.status < 300) {
            works.value = await res.json()
            // console.log(bookData.value)
            console.log(works.value)
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
    fetchData(API)
})
</script>

<style lang="scss" scoped></style>