<script setup lang="ts">
import MovieCard from '@/components/MovieCard.vue';
import { getMovies, searchMovie } from '@/services/moviesService.ts';
import { computed, onMounted, ref, watch } from 'vue';
import type { Movie, MovieResponse } from '@/types/movie.ts';
import { useStore } from 'vuex';

const movies = ref<Movie[]>([]);
const total_pages = ref(0);
const current_page = ref(1);

const store = useStore();
const searchQuery = computed(() => store.state.searchQuery);
type FilterType = 'now_playing' | 'popular' | 'top_rated' | 'upcoming' | 'search';
const selectedFilter = ref<FilterType>('now_playing');

onMounted(() => {
  loadMovies();
});

watch(searchQuery, () => {
  current_page.value = 1;
  if (searchQuery.value === '') {
    selectedFilter.value = 'now_playing';
    loadMovies();
  } else {
    selectedFilter.value = 'search';
    loadMovies('search', 1, searchQuery.value);
  }
});

const changePage = (page: number) => {
  current_page.value = page;
  if (selectedFilter.value !== 'search') {
    store.dispatch('search', '');
  }
  loadMovies(selectedFilter.value, page, searchQuery.value);
};

const loadMovies = async (movieType: FilterType = 'now_playing', page = 1, searchQuery = '') => {
  let response: MovieResponse;
  switch (movieType) {
    case 'now_playing':
    case 'popular':
    case 'top_rated':
    case 'upcoming':
      response = await getMovies(page, movieType);
      break;
    case 'search':
      response = await searchMovie(searchQuery, page);
      break;
  }
  movies.value = response.results;
  total_pages.value = response.total_pages;
};
</script>

<template>
  <div class="mx-10">
    <div class="flex mt-10 justify-end">
      <el-pagination
        layout="prev, pager, next"
        :total="total_pages"
        :current-page="current_page"
        @current-change="changePage"
      />
    </div>
    <div class="mt-3 grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-5">
      <movie-card v-for="(movie, index) in movies" :key="index" :movie="movie" />
    </div>
    <div class="flex my-10 justify-end">
      <el-pagination
        layout="prev, pager, next"
        :total="total_pages"
        :current-page="current_page"
        @current-change="changePage"
      />
    </div>
  </div>
</template>
