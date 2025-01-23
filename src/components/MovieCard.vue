<script setup lang="ts">
import type { Movie } from '@/types/movie.ts';

const { movie } = defineProps<{ movie: Movie }>();
</script>

<template>
  <div class="border flex items-center justify-center">
    <el-empty :description="movie.title" v-if="!movie.poster_path" />
    <img
      v-else
      class="h-full w-full object-cover"
      :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`"
      alt=""
    />
  </div>
</template>

<style scoped></style>
