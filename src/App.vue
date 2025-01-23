<script setup lang="ts">
import { useStore } from 'vuex';
import { onMounted } from 'vue';
import { getGenres, getLanguages } from '@/services/moviesService.ts';

const store = useStore();

onMounted(() => {
  loadGenres();
  loadLanguages();
});

const loadGenres = async () => {
  const { genres } = await getGenres();
  await store.dispatch('setGenres', genres);
};

const loadLanguages = async () => {
  const languages = await getLanguages();
  await store.dispatch('setLanguages', languages);
};
</script>

<template>
  <router-view />
</template>
