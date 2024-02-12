<template>
  <div>
    <h2 class="text-xl">Folder: {{ params.folderSlug }}</h2>

    <div class="flex mt-3">
      <NuxtLink
        v-for="review in db.workspaces
          .find((w) => w.slug === params.workspaceSlug)!
          .folders.find((f) => f.slug === params.folderSlug)!.reviews"
        :key="review.slug"
        :to="`/${params.workspaceSlug}/${params.folderSlug}/${review.slug}`"
        class="flex px-3 h-48 min-w-36 items-center justify-center mr-3"
        :class="{
          'bg-green-400': review.status === 'published',
          'bg-gray-400': review.status === 'draft',
          'bg-yellow-400': review.status === 'in-progress',
        }"
      >
        <i class="pi pi-user-edit" v-if="review.status === 'draft'" />
        <i class="pi pi-pencil" v-if="review.status === 'in-progress'" />
        <i class="pi pi-check-circle" v-else-if="review.status === 'published'" />
        <span class="ml-2">{{ review.slug }} ({{ review.startDate }})</span>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute('workspaceSlug-folderSlug');
const params = route.params
const db = useDatabase()
</script>
