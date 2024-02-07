<template>
  <div>
    <h2 class="text-xl">
      <i class="pi pi-check mr-2" />
      Review: {{ review.slug }}
    </h2>
    <div>Date: {{ review.date }}</div>

    <div class="mt-6 flex">
      <div
        v-for="sItem in mappedValuesToSchema"
        :key="sItem.id"
        class="flex flex-col w-48 bg-gray-100 dark:bg-gray-700 p-6 mr-3"
      >
        <label :for="sItem.id" class="text-sm">{{ sItem.title }}</label>
        <div class="text-3xl mt-3">{{ sItem.value }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const $route = useRoute(
  "workspaceSlug-folderSlug-definitionSlug-definitionVersion-review-reviewSlug"
);
const params = $route.params;
const $db = useState("db");

const definitionSchema = computed(
  () =>
    $db.value.workspaces
      .find((w) => w.slug === params.workspaceSlug)
      .folders.find((f) => f.slug === params.folderSlug)
      .reviewDefinitions.find((d) => d.slug === params.definitionSlug && d.version === Number(params.definitionVersion)).schema
);

const review = computed(() =>
  $db.value.workspaces
    .find((w) => w.slug === params.workspaceSlug)
    .folders.find((f) => f.slug === params.folderSlug)
    .reviewDefinitions.find((d) => d.slug === params.definitionSlug && d.version === Number(params.definitionVersion))
    .reviews.find((r) => r.slug === params.reviewSlug)
);

const mappedValuesToSchema = computed(() => {
  return definitionSchema.value.map((sItem) => {
    return {
      ...sItem,
      value: review.value.values[sItem.id],
    };
  });
});
</script>
