<template>
  <div>
    <div>Folder: {{ $route.params.folderSlug }}</div>
    <NuxtPage />
  </div>
</template>

<script setup lang="ts">
const $route = useRoute();
</script>
