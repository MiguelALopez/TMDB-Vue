<script setup lang="ts">
import type { Movie } from '@/types/movie.ts'

const { movie } = defineProps<{ movie: Movie }>()

</script>

<template>
  <div class="border">
    <img :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`" alt="" />
    <div class="my-3 mx-2">{{ movie.title }}</div>
  </div>

</template>

<style scoped>

</style>
