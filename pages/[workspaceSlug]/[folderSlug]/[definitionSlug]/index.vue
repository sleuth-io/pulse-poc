<template>
  <div>
    <div>Definition: {{ params.definitionSlug }}</div>

    <div class="mt-6">
      <h2 class="text-xl">Reviews:</h2>
    </div>
    <div class="flex mt-3">
      <NuxtLink
        v-for="review in $db.workspaces
          .find((w) => w.slug === params.workspaceSlug)
          .folders.find((f) => f.slug === params.folderSlug)
          .reviewDefinitions.find((d) => d.slug === params.definitionSlug)
          .reviews"
        :key="review.slug"
        :to="`/${params.workspaceSlug}/${params.folderSlug}/${params.definitionSlug}/review/${review.slug}`"
        class="flex bg-gray-400 px-3 h-48 min-w-36 items-center justify-center"
      >
        <i class="pi pi-check mr-2" />
        {{ review.slug }}
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
const $route = useRoute();
const params = $route.params;
const $db = useState("db");
</script>
