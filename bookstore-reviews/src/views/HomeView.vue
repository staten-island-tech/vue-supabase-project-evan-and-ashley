<template>
  <header v-if="sessionStore().session.isLoggedIn">
    <div>This is your personal library</div>
    <div>
      <h1>{{ user }}</h1>
    </div>
  </header>
  <header v-if="!sessionStore().session.isLoggedIn">
    You have Been Logged out <RouterLink to="/">Sign in or Make an Account </RouterLink>
  </header>
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'
import { supabase } from '@/lib/supabaseClient'
import { storeToRefs } from 'pinia'
import { sessionStore } from '@/stores/authStore'

const authStore = sessionStore()
const { session } = storeToRefs(authStore)
const user = ref(session.value.user.id)

async function getUserComments() {
    const { data: commentsData, error: commnetsError } = await supabase.rpc('get_user_review', {
      current_user_id: user.value,
    });

    if (commnetsError) {
        console.log(commnetsError);
    } else {
        reviewComments.value = commentsData;
        console.log(reviewComments);
    }

}

onMounted(async ()=>{
  await getUserComments(); 
})

</script>

<style scoped></style>
