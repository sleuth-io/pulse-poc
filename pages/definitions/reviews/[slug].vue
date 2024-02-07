<script setup lang="ts">
const route = useRoute('definitions-reviews-slug')
</script>

<template>
  <div>
    <h1>Reviews</h1>
    <pre>{{ route.params.slug }}</pre>
  </div>
</template>
