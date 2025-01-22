<script setup lang="ts">
import { getMovies } from '@/services/moviesService.ts';

import { onMounted, ref } from 'vue';
import type { Movie } from '@/types/movie.ts';

const movies = ref<Movie[]>([]);
const total_pages = ref(0);

onMounted(() => {
  loadMovies();
});

const loadMovies = async (page = 1) => {
  const response = await getMovies(page);
  movies.value = response.results;
  total_pages.value = response.total_pages;
};
</script>

<template>
  <div class="flex mt-10 justify-end mx-10">
    <el-pagination layout="prev, pager, next" :total="total_pages" @current-change="loadMovies" />
  </div>
  <div class="mt-3 mx-10 grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-5">
    <movie-card v-for="(movie, index) in movies" :key="index" :movie="movie" />
  </div>
  <div class="flex my-10 justify-end mx-10">
    <el-pagination background layout="prev, pager, next" :total="total_pages"
                   @current-change="loadMovies" />
  </div>
</template>
