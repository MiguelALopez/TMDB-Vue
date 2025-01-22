<script setup lang="ts">
import HeaderNavbar from '@/components/HeaderNavbar.vue'
import { getMovies } from '@/services/moviesService.ts'

import { ref } from 'vue'
import type { Movie } from '@/types/movie.ts'

const movies = ref<Movie[]>([])

getMovies().then((value) => movies.value = value)

</script>

<template>
  <header-navbar />
  <div class="mt-10 mx-10 grid lg:grid-cols-4 grid-cols-2 gap-5">
    <div v-for="(movie, index) in movies" :key="index" class="border">
      <img :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`" alt="" />
      <div class="my-3 mx-2">{{ movie.title }}</div>
    </div>
  </div>
</template>
