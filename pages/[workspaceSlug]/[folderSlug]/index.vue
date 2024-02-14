<script setup lang="ts">
import type { ReviewType } from '~/composables/use-database'

const route = useRoute('workspaceSlug-folderSlug')
const params = route.params
const db = useDatabase()
const { currentUser } = useCurrentUser()

const folder = computed(() => {
  return db.value.workspaces
    .find(w => w.slug === params.workspaceSlug)!
    .folders.find(f => f.slug === params.folderSlug)!
})

const completedReviews = computed(() =>
  folder.value.reviews.filter(r => r.status === 'completed').sort((a, b) => b.startDate.localeCompare(a.startDate)),
)

const draftReviews = computed(() =>
  folder.value.reviews.filter(r => r.status === 'draft').sort((a, b) => b.startDate.localeCompare(a.startDate)),
)

const inProgressReviews = computed(() =>
  folder.value.reviews.filter(r => r.status === 'in-progress').sort((a, b) => b.startDate.localeCompare(a.startDate)),
)

function createDraftFrom(review: ReviewType) {
  folder.value.reviews.unshift({
    ...review,
    status: 'draft',
    slug: (Math.random() + 1).toString(36).substring(7),
    startDate: getStartDate(folder.value),
  })
}
</script>

<template>
  <div>
    <h2 class="text-xl mb-6">
      Folder: {{ params.folderSlug }}
    </h2>
    <div class="flex gap-2 flex-col">
      <ReviewList
        title="Draft reviews" :reviews="draftReviews" :workspace-slug="params.workspaceSlug"
        :folder-slug="params.folderSlug" @create-draft="createDraftFrom"
      />
      <NuxtLink
        v-if="currentUser?.role === 'admin'"
        :to="`/${params.workspaceSlug}/${params.folderSlug}/_create`"
        class="flex px-3 h-12 items-center justify-center bg-gray-100"
      >
        <i class="pi pi-plus mr-2" />
        Create new draft
      </NuxtLink>

      <ReviewList
        title="In progress" :reviews="inProgressReviews" :workspace-slug="params.workspaceSlug"
        :folder-slug="params.folderSlug" @create-draft="createDraftFrom"
      />

      <ReviewList
        title="Completed" :reviews="completedReviews" :workspace-slug="params.workspaceSlug"
        :folder-slug="params.folderSlug" @create-draft="createDraftFrom"
      />
    </div>
  </div>
</template>
