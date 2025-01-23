<script setup lang="ts">
import type { Movie } from '@/types/movie.ts';
import { computed } from 'vue';
import { useStore } from 'vuex';
import MovieRate from '@/components/MovieRate.vue';

const { movie } = defineProps<{ movie: Movie }>();
const store = useStore();
const genres = computed(() => store.getters.getGenres);
</script>

<template>
  <div class="movie-card overflow-hidden border flex items-center justify-center">
    <el-empty class="card-img" :description="movie.title" v-if="!movie.poster_path" />
    <img
      v-else
      class="card-img h-full w-full object-cover"
      :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`"
      alt=""
    />
    <router-link :to="`/movie/${movie.id}`">
      <div class="card-description w-full h-full bg-black">
        <div class="flex flex-col h-full py-4 px-4 text-white">
          <h1 class="text-white text-center text-2xl font-bold">{{ movie.title }}</h1>
          <p class="mt-4">{{ movie.overview }}</p>

          <div class="flex flex-wrap gap-2 mt-4">
            <div
              v-for="genre in movie.genre_ids"
              :key="genre"
              class="bg-zinc-700 px-2 py-1 rounded"
            >
              {{ genres[genre] }}
            </div>
          </div>
          <movie-rate class="mt-4" :rate="movie.vote_average" />
        </div>
      </div>
    </router-link>
  </div>
</template>

<style scoped>
.movie-card {
  position: relative;

  &:hover {
    .card-img {
      transform: scale(1.1);
    }

    .card-description {
      opacity: 1;

      h2,
      p {
        transform: translateX(0);
      }
    }
  }

  .card-img {
    transition: transform 0.35s ease;
  }

  .card-description {
    color: white;
    position: absolute;
    inset: 0;
    transition: all 0.3s ease-in-out;
    background: rgba(9, 10, 12, 0.75);
    opacity: 0;

    h2,
    p {
      transition: all ease 0.35s;
      transform: translateX(-25px);

      overflow: hidden;
      display: -webkit-box;
      -webkit-line-clamp: 10; /* number of lines to show */
      line-clamp: 10;
      -webkit-box-orient: vertical;
    }
  }
}
</style>
