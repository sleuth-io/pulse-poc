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

function toggleRecurrence() {
  if (folder.value.recurrence === null)
    folder.value.recurrence = 'weekly'
  else
    folder.value.recurrence = null
}

const recurrenceEnabled = computed(() => Boolean(folder.value.recurrence))

const completedReviews = computed(() =>
  folder.value.reviews.filter(r => r.status === 'completed').sort((a, b) => b.startDate.localeCompare(a.startDate)),
)

const draftReviews = computed(() =>
  folder.value.reviews.filter(r => r.status === 'draft').sort((a, b) => b.startDate.localeCompare(a.startDate)),
)

const inReviewReviews = computed(() =>
  folder.value.reviews.filter(r => r.status === 'in-review').sort((a, b) => b.startDate.localeCompare(a.startDate)),
)

function createDraftFrom(review: ReviewType) {
  folder.value.reviews.unshift({
    ...review,
    status: 'draft',
    entry: {},
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

    <div v-if="currentUser?.role === 'admin'">
      <div class="flex items-center mb-4">
        <label for="recurrence" class="font-bold text-lg mb-0.5 mr-4">Automatic recurrence:</label>
        <div :class="!folder.recurrence ? 'text-black' : 'text-gray-400'">
          Disabled
        </div>
        <InputSwitch id="recurrence" class="mx-1" :model-value="recurrenceEnabled" @click="toggleRecurrence" />
        <div :class="folder.recurrence ? 'text-black' : 'text-gray-400'">
          Enabled
        </div>
      </div>
    </div>

    <Card v-if="folder.recurrence">
      <!-- <template #title>Recurrence settings</template> -->
      <template #content>
        <div>
          <div class="text-lg font-bold">
            Settings
          </div>
          <div class="mt-2">
            <label for="recurrence" class="mr-2 w-20 inline-block">Repeat:</label>
            <Dropdown id="recurrence" v-model="folder.recurrence" class="w-56" :options="['monthly', 'weekly']" />
          </div>
          <div class="mt-2">
            <label for="date" class="mr-2 w-20 inline-block">Next cycle:</label>
            <InputText id="date" class="!w-56" type="date" />
          </div>
        </div>

        <div class="grid grid-cols-3 mt-6 gap-8">
          <div>
            <div class="text-lg font-bold text-gray-500 text-center">
              Draft
              <i
                v-tooltip.top="'At the beginning of a cycle:\n\n - The current draft review will move to In Progress\n\n - A fresh draft for the next cycle will be created'"
                class="pi pi-question-circle ml-1"
              />
            </div>
            <NuxtLink
              v-if="draftReviews.length > 0"
              :to="`/${params.workspaceSlug}/${params.folderSlug}/${draftReviews[0].slug}`"
              class="flex px-3 h-48 w-full items-center justify-center bg-gray-100"
            >
              <i class="pi pi-user-edit" />
              <span class="ml-2">{{ params.folderSlug }} ({{ draftReviews[0].startDate }})</span>
            </NuxtLink>
          </div>
          <div>
            <div class="text-lg font-bold text-yellow-500 text-center">
              In Progress
              <i
                v-tooltip.top="'In Progress reviews will be marked Ready To Review once all participants respond'"
                class="pi pi-question-circle ml-1"
              />
            </div>
            <NuxtLink
              v-if="inReviewReviews.length > 0"
              :to="`/${params.workspaceSlug}/${params.folderSlug}/${inReviewReviews[0].slug}`"
              class="flex px-3 h-48 w-full items-center justify-center bg-yellow-100"
            >
              <i class="pi pi-user-edit" />
              <span class="ml-2">{{ params.folderSlug }} ({{ inReviewReviews[0].startDate }})</span>
            </NuxtLink>
          </div>
          <div>
            <div class="text-lg font-bold text-orange-500 text-center">
              Ready to review
            </div>
            <div class="flex h-48 w-full border-orange-100 text-orange-300 border items-center justify-center" />
          </div>
        </div>
      </template>
    </Card>

    <div class="flex gap-2 flex-col">
      <template v-if="!recurrenceEnabled">
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
          title="Reviews in progress" :reviews="inReviewReviews" :workspace-slug="params.workspaceSlug"
          :folder-slug="params.folderSlug" @create-draft="createDraftFrom"
        />
      </template>

      <ReviewList
        title="Completed reviews" :reviews="completedReviews" :workspace-slug="params.workspaceSlug"
        :folder-slug="params.folderSlug" @create-draft="createDraftFrom"
      />
    </div>
  </div>
</template>
