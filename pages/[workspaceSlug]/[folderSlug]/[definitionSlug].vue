<template>
  <div>
    <div>Definition: {{ route.params.definitionSlug }}</div>
    <NuxtPage />
  </div>
</template>

<script setup lang="ts">
const route = useRoute('workspaceSlug-folderSlug-definitionSlug');
</script>
