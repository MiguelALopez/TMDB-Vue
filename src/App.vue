<script setup lang="ts">
import HeaderNavbar from '@/components/HeaderNavbar.vue';
import MoviesList from '@/components/MoviesList.vue';
import { useStore } from 'vuex';
import { onMounted } from 'vue';
import { getGenres } from '@/services/moviesService.ts';

const store = useStore();

onMounted(() => {
  loadGenres();
});

const loadGenres = async () => {
  const { genres } = await getGenres();
  store.commit('setGenres', genres);
};
</script>

<template>
  <header-navbar />
  <movies-list />
</template>
