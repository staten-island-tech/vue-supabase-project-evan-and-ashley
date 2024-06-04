<template>
    <div>
        <h1> book info</h1>
        <h1>{{ works.title }}</h1>
        <p>{{ works.description }}</p>

        <h2> Leave Review for the book</h2>
        <label for="rating"> Rating: </label>
        <select id="rating" v-model="rating">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
        </select>

        <label for="comment">Comment: </label>
        <textarea id="comment" v-model="comment"></textarea>

        <button type="submit" @click="submitReview">Submit Review</button>

    </div>
</template>

<script setup>
import { onMounted, ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import { supabase } from '@/lib/supabaseClient'

const rating = ref('')
const comment = ref('')
let works = ref('');
let loaded = false
const API = computed(() => `https://openlibrary.org/works/${route.params.id}.json`);
const route = useRoute();
const errorMessage = ref(null)
const loading = ref(true);
const user = ref (''); 
//no paramter herE?
async function fetchData() {
    try {


        const res = await fetch(`https://openlibrary.org/works/${route.params.id}.json`)
        if (res.status >= 200 && res.status < 300) {
            works.value = await res.json()
            // console.log(bookData.value)
            console.log(works)
            console.log(works.value.key)
            errorMessage.value = null
        } else {
            throw new Error(res.statusText)
        }
    } catch (error) {
        console.log(error)
        errorMessage.value = 'An error occurred while making the API request.'
    }

}

async function submitReview() {
    if (rating.value && comment.value) {
        try {
            const { data, error } = await supabase
                .from('review')
                .insert([
                    {
                        book: works.value.key,
                        user: user.value,
                        rating: parseInt(rating.value),
                        comment: comment.value,
                    }
                ]);
            if (error) {
                console.log(error);
            } else {
                console.log('Review submitted successfully')
            }
        } catch (error) {
            console.log(error)
        }
    } else {
        alert('Please fill in all fields')
    }
}

async function getCurrentUser (){
    const { user, error } = await supabase.auth.getUser(); 
    if (error) {
        console.log(error);
        return null
    }
    return user; 
}

onMounted(async () => {
    await fetchData() //paramater here
    user.value = await getCurrentUser (); 
})
</script>

<style lang="scss" scoped></style>