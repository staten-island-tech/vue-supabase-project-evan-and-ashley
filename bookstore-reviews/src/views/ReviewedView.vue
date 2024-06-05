<template>
    <div>
        <h1>Reviewed Books</h1>
        <p>{{ bookTitles }}</p>
    </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { userAuthStore } from '@/stores/authStore'
const { isLoggedIn } = userAuthStore()
import MainCard from '@/components/MainCard.vue'
import { supabase } from '@/lib/supabaseClient'


async function displayBookTitles(){
    try{
        const {data,error} = await supabase
        .from('books')
        .select('title');

        if (error) {
            console.log(error)
        }else{
            const bookTitles = data.map((book) => book.title)
            console.log(bookTitles)
        }
        
        }
        catch(error){
            console.log(error); }
    
}
displayBookTitles()

</script>

<style lang="scss" scoped>

</style>