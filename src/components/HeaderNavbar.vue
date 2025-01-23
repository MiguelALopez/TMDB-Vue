<script setup lang="ts">
import { ref, watch } from 'vue';
import { Search } from '@element-plus/icons-vue';
import { useStore } from 'vuex';

const input1 = ref('');
const store = useStore();
watch(input1, () => {
  store.dispatch('search', input1.value);
});
</script>

<template>
  <nav class="flex justify-between items-center border-b-2 px-10">
    <h1 class="sm:text-2xl font-bold">TMDB-Vue</h1>
    <el-input
      class="py-4"
      v-model="input1"
      style="width: 240px"
      placeholder="Search..."
      :suffix-icon="Search"
    />
  </nav>
</template>
