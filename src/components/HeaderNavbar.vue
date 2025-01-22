<script setup lang="ts">
import { ref } from 'vue'
import { Search } from '@element-plus/icons-vue'
const input1 = ref('')
</script>

<template>
  <nav class="flex justify-between border-b-2 px-10">
    <h1 class="text-2xl font-bold m-4">TMDB-Vue</h1>
    <el-input
      class="p-4"
      v-model="input1"
      style="width: 240px"
      placeholder="Search..."
      :suffix-icon="Search"
    />
  </nav>
</template>
