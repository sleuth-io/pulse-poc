<template>
  <div>
    <div>Review: {{ route.params.reviewSlug }}</div>
    <NuxtPage />
  </div>
</template>

<script setup lang="ts">
const route = useRoute('workspaceSlug-folderSlug-definitionSlug-review-reviewSlug')
</script>
