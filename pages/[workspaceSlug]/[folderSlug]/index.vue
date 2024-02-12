<template>
  <div>
    <h2 class="text-xl">Folder: {{ params.folderSlug }}</h2>

    <div class="flex gap-4 flex-wrap">
      <NuxtLink v-for="review in folder.reviews" :key="review.slug"
        :to="`/${params.workspaceSlug}/${params.folderSlug}/${review.slug}`"
        class="flex px-3 h-48 min-w-36 items-center justify-center relative" :class="{
          'bg-green-400': review.status === 'completed',
          'bg-gray-400': review.status === 'draft',
          'bg-yellow-400': review.status === 'in-review',
        }">
        <i class="pi pi-user-edit" v-if="review.status === 'draft'" />
        <i class="pi pi-pencil" v-if="review.status === 'in-review'" />
        <i class="pi pi-check-circle" v-else-if="review.status === 'completed'" />
        <span class="ml-2">{{ params.folderSlug }} ({{ review.startDate }})</span>
        <Button v-if="review.status === 'completed'" :icon="'pi pi-copy'" class="!absolute top-0 right-0"
          @click.prevent="createDraftFrom(review)" />
      </NuxtLink>

      <NuxtLink
        :to="`/${params.workspaceSlug}/${params.folderSlug}/_create`"
        class="flex px-3 h-48 min-w-36 items-center justify-center bg-gray-200">
        <i class="pi pi-plus mr-2" />
        New review
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ReviewType } from '~/app.vue';

const route = useRoute('workspaceSlug-folderSlug');
const params = route.params
const db = useDatabase()

const folder = computed(() => {
  return db.value.workspaces
    .find((w) => w.slug === params.workspaceSlug)!
    .folders.find((f) => f.slug === params.folderSlug)!
})

function createDraftFrom(review: ReviewType) {
  folder.value.reviews.unshift({
    ...review,
    status: 'draft',
    entry: {},
    slug: (Math.random() + 1).toString(36).substring(7)
  })
}
</script>
