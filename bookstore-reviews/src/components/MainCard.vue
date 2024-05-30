<template>
    <div>

    </div>
</template>

<script setup>
import { computed } from 'vue'
import { defineProps } from 'vue'
import AOS from 'aos'
import 'aos/dist/aos.css'
AOS.init()

const props = defineProps({
//   book: String
})

const causePath = computed(() => {
  return `/DeathData/${props.cause}`
})
</script>

<style lang="scss" scoped>

</style>