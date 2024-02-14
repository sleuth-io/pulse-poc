<script setup lang="ts">
const props = defineProps<{
  reviews: ReviewType[]
  workspaceSlug: string
  folderSlug: string
  title: string
}>()
defineEmits<{ createDraft: [review: ReviewType] }>()

const { currentUser } = useCurrentUser()

const filteredReviews = computed(() => {
  return props.reviews.filter(r => currentUser.value?.role === 'admin' ? true : r.status !== 'draft')
})
</script>

<template>
  <div v-if="filteredReviews.length > 0" class="mt-6 text-lg font-bold">
    {{ title }}
  </div>

  <NuxtLink
    v-for="review in filteredReviews"
    :key="review.slug"
    :to="`/${workspaceSlug}/${folderSlug}/${review.slug}`"
    class="flex px-3 h-12 items-center justify-start relative" :class="{
      'bg-green-400': review.status === 'completed',
      'bg-gray-400': review.status === 'draft',
      'bg-yellow-400': review.status === 'in-progress',
    }"
  >
    <i v-if="review.status === 'draft'" class="pi pi-user-edit" />
    <i v-else-if="review.status === 'completed'" class="pi pi-check-circle" />
    <i v-else class="pi pi-pencil" />
    <span class="ml-2">{{ folderSlug }} ({{ review.startDate }})</span>
    <Button
      v-if="review.status !== 'draft' && currentUser?.role === 'admin'"
      icon="pi pi-copy" class="!absolute top-0 right-0 h-12"
      severity="secondary"
      @click.prevent="$emit('createDraft', review)"
    />
  </NuxtLink>
</template>
