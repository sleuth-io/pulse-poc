<script setup lang="ts">
import type { ReviewType } from '~/composables/use-database'

const route = useRoute('workspaceSlug-folderSlug')
const params = route.params
const db = useDatabase()
const { currentUser } = useCurrentUser()

const today = ref(new Date())
const tomorrow = new Date(today.value.getTime() + 24 * 60 * 60 * 1000)
const nextCycleDate = ref(tomorrow.toISOString().substring(0, 10))

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

const inProgressReviews = computed(() =>
  folder.value.reviews.filter(r => r.status === 'in-progress').sort((a, b) => b.startDate.localeCompare(a.startDate)),
)

function createDraftFrom(review: ReviewType) {
  folder.value.reviews.unshift({
    ...review,
    status: "draft",
    slug: (Math.random() + 1).toString(36).substring(7),
    startDate: getStartDate(folder.value),
  })
}

function simulateNextCycle() {
  const nextCycle = new Date(nextCycleDate.value)
  today.value = new Date(nextCycleDate.value)
  nextCycle.setDate(nextCycle.getDate() + 7)
  nextCycleDate.value = nextCycle.toISOString().substring(0, 10)
  if (draftReviews.value.length > 0) {
    const currentDraft = draftReviews.value[0]
    currentDraft.status = 'in-progress'
    createDraftFrom(currentDraft)
  }
  else if (inProgressReviews.value.length > 0) {
    createDraftFrom(inProgressReviews.value[0])
  }
  else if (inReviewReviews.value.length > 0) {
    createDraftFrom(inReviewReviews.value[0])
  }
  else if (completedReviews.value.length > 0) {
    createDraftFrom(completedReviews.value[0])
  }
}
</script>

<template>
  <div>
    <h2 class="text-xl mb-6">
      Folder: {{ params.folderSlug }}
    </h2>

    <Panel v-if="folder.recurrence" header="Time simulation" toggleable :collapsed="true" class="mb-4">
      <div class="mb-2">
        Today is: {{ today.toISOString().substring(0, 10) }}
      </div>
      <Button label="Simulate next cycle" @click="simulateNextCycle" />
    </Panel>

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
            <InputText id="date" v-model="nextCycleDate" class="!w-56" type="date" />
          </div>
        </div>

        <div class="mt-6">
          <div class="text-lg font-bold mb-2">
            Upcoming draft
            <i
              v-tooltip.top="'At the beginning of a cycle:\n\n - The current draft will move to In Progress\n\n - A fresh draft for the next cycle will be created'"
              class="pi pi-question-circle ml-1"
            />
          </div>
          <NuxtLink
            v-if="draftReviews.length > 0"
            :to="`/${params.workspaceSlug}/${params.folderSlug}/${draftReviews[0].slug}`"
            class="flex px-3 h-12 w-full items-center bg-gray-100"
          >
            <i class="pi pi-user-edit" />
            <span class="ml-2">{{ params.folderSlug }} ({{ draftReviews[0].startDate }})</span>
          </NuxtLink>
          <NuxtLink
            v-else
            :to="`/${params.workspaceSlug}/${params.folderSlug}/_create`"
            class="flex px-3 h-12 items-center bg-gray-100"
          >
            <i class="pi pi-plus mr-2" />
            Create new draft
          </NuxtLink>
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
      </template>

      <ReviewList
        title="In progress" :reviews="inProgressReviews" :workspace-slug="params.workspaceSlug"
        :folder-slug="params.folderSlug" @create-draft="createDraftFrom"
      />

      <ReviewList
        title="Ready to review" :reviews="inReviewReviews" :workspace-slug="params.workspaceSlug"
        :folder-slug="params.folderSlug" @create-draft="createDraftFrom"
      />

      <ReviewList
        title="Completed" :reviews="completedReviews" :workspace-slug="params.workspaceSlug"
        :folder-slug="params.folderSlug" @create-draft="createDraftFrom"
      />
    </div>
  </div>
</template>
