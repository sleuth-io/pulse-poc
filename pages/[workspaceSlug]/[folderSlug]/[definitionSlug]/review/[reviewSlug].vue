<template>
  <div class="mt-6">
    <h2 class="text-xl">Review:</h2>
    <div>{{ $route.params.reviewSlug }}</div>
  </div>
</template>

<script setup lang="ts">
const $route = useRoute();
</script>
