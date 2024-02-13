<script setup lang="ts">
const props = defineProps<{
  reviews: ReviewType[],
  workspaceSlug: string,
  folderSlug: string,
  title: string,
}>()
defineEmits<{createDraft: [review: ReviewType]}>()
</script>

<template>
  <div class="mt-6 text-lg font-bold">{{ title }}</div>

  <NuxtLink v-for="review in reviews" :key="review.slug"
    :to="`/${workspaceSlug}/${folderSlug}/${review.slug}`"
    class="flex px-3 h-12 items-center justify-start relative" :class="{
      'bg-green-400': review.status === 'completed',
      'bg-gray-400': review.status === 'draft',
      'bg-yellow-400': review.status === 'in-review',
    }">
    <i class="pi pi-user-edit" v-if="review.status === 'draft'" />
    <i class="pi pi-pencil" v-if="review.status === 'in-review'" />
    <i class="pi pi-check-circle" v-else-if="review.status === 'completed'" />
    <span class="ml-2">{{ folderSlug }} ({{ review.startDate }})</span>
    <Button v-if="review.status === 'completed'" :icon="'pi pi-copy'" class="!absolute top-0 right-0 h-12"
      @click.prevent="$emit('createDraft', review)" />
  </NuxtLink>
</template>
