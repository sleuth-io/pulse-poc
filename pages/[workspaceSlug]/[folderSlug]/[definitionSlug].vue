<template>
  <div>
    <div>Definition: {{ route.params.definitionSlug }}</div>
    <NuxtLink :to="`/${route.params.workspaceSlug}/${route.params.folderSlug}/${route.params.definitionSlug}/review/_create`">
      <Button>Create review</Button>
    </NuxtLink>
    <NuxtPage />
  </div>
</template>

<script setup lang="ts">
const route = useRoute('workspaceSlug-folderSlug-definitionSlug');
</script>
