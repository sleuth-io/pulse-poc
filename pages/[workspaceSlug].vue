<template>
  <div>
    <div>Workspace: {{ $route.params.workspaceSlug }}</div>
    <NuxtPage />
  </div>
</template>

<script setup lang="ts">
const $route = useRoute();
</script>
