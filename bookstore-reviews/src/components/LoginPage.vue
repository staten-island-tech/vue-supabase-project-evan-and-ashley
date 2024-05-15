<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { supabase } from '@/lib/supabaseClient'
import router from '@/router'

async function loginOrSignup(type: 'login' | 'signup') {
  try {
    if (type == 'login') {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.value,
        password: password.value
      })
      if (error) throw error
      return data
    } else {
      const { data, error } = await supabase.auth.signUp({
        email: email.value,
        password: password.value
      })
      if (error) throw error
      return data
    }
  } catch (error) {
    if (error instanceof Error) {
      alert(error.message)
    }
  }
}
</script>
