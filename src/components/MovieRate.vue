<script setup lang="ts">
import { computed } from 'vue';

const { rate } = defineProps<{ rate: number }>();
const vote = computed(() => Number((rate / 2).toPrecision(2)));
</script>

<template>
  <el-rate v-model="vote" disabled show-score text-color="#ff9900" score-template="{value} / 5" />
</template>

<style scoped></style>
