<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import type { Movie } from '@/types/movie.ts';
import { getMovie } from '@/services/moviesService.ts';
import { Back } from '@element-plus/icons-vue';
import MovieRate from '@/components/MovieRate.vue';
import { useStore } from 'vuex';

const { movieId } = defineProps(['movieId']);

const movie = ref<Movie>();
const store = useStore();
const languages = computed(() => store.getters.getLanguages);

const year = computed(() => new Date(`${movie.value?.release_date}`).getFullYear());
const budget = computed(() => {
  if (!movie?.value?.budget) return 'N/A';
  return `$${movie?.value?.budget.toLocaleString()}`;
});
const revenue = computed(() => {
  if (!movie?.value?.revenue) return 'N/A';
  return `$${movie?.value?.revenue.toLocaleString()}`;
});
const duration = computed(() => {
  if (!movie?.value?.runtime) return 'N/A';
  const hours = Math.floor(movie?.value?.runtime / 60);
  const minutes = movie?.value?.runtime % 60;
  return `${hours}h ${minutes}m`;
});
onMounted(async () => {
  movie.value = await getMovie(movieId);
});
</script>

<template>
  <div class="py-10 text-white bg-zinc-800 h-full min-h-screen" v-if="movie">
    <div class="container">
      <router-link to="/">
        <el-icon class="mx-10 mb-10" size="30">
          <Back />
        </el-icon>
      </router-link>
      <div class="flex sm:flex-row flex-col gap-10 px-10">
        <div class="lg:flex-[0_0_25%] flex-1">
          <el-empty
            class="bg-zinc-100 rounded-lg"
            :description="movie.title"
            v-if="!movie.poster_path"
          />
          <img
            v-else
            class="rounded-lg object-cover"
            :src="`https://image.tmdb.org/t/p/w500${movie?.poster_path}`"
            alt=""
          />
        </div>
        <div class="lg:flex-[0_0_75%] flex-1">
          <div class="flex lg:flex-row flex-col justify-between lg:items-center pr-10">
            <div class="flex lg:flex-row flex-col lg:items-center lg:gap-3">
              <h1 class="text-3xl font-bold">{{ movie?.title }}</h1>
              <span class="lg:text-3xl text-xl font-light text-zinc-300">({{ year }})</span>
            </div>
            <movie-rate :rate="movie.vote_average" />
          </div>

          <div class="text-zinc-300 text-sm">
            {{ movie?.genres?.map((genre) => genre.name).join(', ') }} • {{ duration }} •
            {{ movie?.origin_country && movie?.origin_country[0] }}
          </div>
          <div class="mt-10 italic text-zinc-300 text-sm">{{ movie.tagline }}</div>
          <div v-if="movie?.overview" class="mt-3">
            <h2 class="text-xl font-bold">Overview</h2>
            <p>{{ movie?.overview }}</p>
          </div>
          <div class="flex gap-10 mt-3">
            <div v-if="movie?.budget">
              <h2 class="text-lg font-bold">Budget</h2>
              <p class="text-zinc-300">{{ budget }}</p>
            </div>
            <div v-if="movie?.revenue">
              <h2 class="text-lg font-bold">Revenue</h2>
              <p class="text-zinc-300">{{ revenue }}</p>
            </div>
            <div v-if="languages">
              <h2 class="text-lg font-bold">Original Language</h2>
              <p class="text-zinc-300">{{ languages[movie.original_language] }}</p>
            </div>
          </div>
          <div v-if="movie?.production_companies" class="mt-3">
            <h2 class="text-xl font-bold">Studios</h2>
            <div class="flex gap-3 items-center text-zinc-300">
              {{ movie.production_companies.map((company) => company.name).join(', ') }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
