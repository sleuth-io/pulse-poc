<template>
  <div>
    <div>Definition: {{ params.definitionSlug }}</div>

    <div class="flex">
      <router-link
        v-for="review in $db.workspaces
          .find((w) => w.slug === params.workspaceSlug)
          .folders.find((f) => f.slug === params.folderSlug)
          .reviewDefinitions.find((d) => d.slug === params.definitionSlug)
          .reviews"
        :key="review.slug"
        :to="`/${params.workspaceSlug}/${params.folderSlug}/${params.definitionSlug}/review/${review.slug}`"
        class="flex bg-gray-400 px-3 h-48 items-center"
      >
        {{ review.slug }}
      </router-link>
    </div>
    <NuxtPage />
  </div>
</template>

<script setup lang="ts">
const $route = useRoute();
const params = $route.params;
const $db = useState("db");
</script>
