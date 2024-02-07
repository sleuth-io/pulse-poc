<template>
  <div>
    <div>Definition: {{ params.definitionSlug }}</div>
    <NuxtLink
      :to="{
        name: 'workspaceSlug-folderSlug-definitionSlug-_edit',
      }"
      rel="noopener"
      class="mr-3"
    >
      <Button label="Edit definition" icon="pi pi-pencil" />
    </NuxtLink>
    <NuxtLink
      :to="{
        name: 'workspaceSlug-folderSlug-definitionSlug-review-_create',
      }"
      rel="noopener"
    >
      <Button label="Create new review" icon="pi pi-file" />
    </NuxtLink>
    <div class="mt-6">
      <h2 class="text-xl">Reviews:</h2>
    </div>
    <template v-for="rd in sortedReviewDefinitions">
      <div v-if="rd.reviews.length">
        <div class="tw-my-4">Version: {{ rd.version }}</div>
        <div class="flex mt-3">
          <NuxtLink
            v-for="review in rd.reviews"
            :key="review.slug"
            :to="`/${params.workspaceSlug}/${params.folderSlug}/${params.definitionSlug}/${rd.version}/review/${review.slug}`"
            class="flex bg-gray-400 px-3 h-48 min-w-36 items-center justify-center mr-3"
          >
            <i class="pi pi-check mr-2" />
            {{ review.slug }}
          </NuxtLink>
        </div>
        <Divider />
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
const $route = useRoute("workspaceSlug-folderSlug-definitionSlug");
const params = $route.params;
const $db = useState("db");

const sortedReviewDefinitions = $db.value.workspaces
  .find((w) => w.slug === params.workspaceSlug)
  .folders.find((f) => f.slug === params.folderSlug)
  .reviewDefinitions.filter((d) => d.slug === params.definitionSlug)
  .sort((a, b) => b.version - a.version);
</script>
