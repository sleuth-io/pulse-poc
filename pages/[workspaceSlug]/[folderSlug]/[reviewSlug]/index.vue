<script setup lang="ts">
const route = useRoute('workspaceSlug-folderSlug-reviewSlug')
const params = route.params
const db = useDatabase()
const { currentUser } = useCurrentUser()

const review = db.value.workspaces
  .find(w => w.slug === params.workspaceSlug)!
  .folders.find(f => f.slug === params.folderSlug)!
  .reviews.find(d => d.slug === params.reviewSlug)!

function addField() {
  review.schema.push({
    title: 'New widget',
    id: (Math.random() + 1).toString(36).substring(7),
  })
}

function save(publish = true) {
  if (publish) {
    if (review.status === 'draft')
      review.status = 'in-progress'
    else if (review.status === 'in-progress')
      review.status = 'in-review'
    else if (review.status === 'in-review')
      review.status = 'completed'
  }
  navigateTo({ name: 'workspaceSlug-folderSlug' })
}

const moveStatusButtonText = computed(() => {
  if (review.status === 'draft')
    return 'Notify reviewers'
  else if (review.status === 'in-progress')
    return 'Record metrics'
  else
    return 'Finalize review'
})

const hasPermissionToMoveStatus = computed(() => {
  return currentUser.value?.role === 'admin' || review.status === 'in-progress'
})

const moveStatusButtonIcon = computed(() => {
  if (review.status === 'draft')
    return 'pi pi-send'
  else if (review.status === 'in-progress')
    return 'pi pi-chart-line'
  else
    return 'pi pi-check-circle'
})
</script>

<template>
  <div>
    <div>
      <h2 class="text-xl mb-6">
        <i class="pi pi-check mr-2" />
        Review: {{ review.slug }}
      </h2>
      <div>Date: {{ review.startDate }}</div>

      <div v-if="review.status === 'draft'">
        <Card v-for="(field, i) in review.schema" :key="i" class="mt-4">
          <template #content>
            <InputText v-model="field.title" />
          </template>
        </Card>
        <Button label="Add field" icon="pi pi-plus" class="mt-8" severity="secondary" @click="addField" />
        <hr class="mt-8">
      </div>
      <div v-else class="mt-6 flex">
        <div
          v-for="widget in review.schema" :key="widget.id"
          class="flex flex-col w-48 bg-gray-100 dark:bg-gray-700 p-6 mr-3"
        >
          <label :for="widget.id" class="text-sm">{{ widget.title }}</label>
          <InputText
            v-model="review.entry[widget.id]" :disabled="review.status === 'completed'"
            class="text-3xl mt-3"
          />
        </div>
      </div>
    </div>

    <template v-if="review.status !== 'completed'">
      <Button label="Save" class="mt-8" icon="pi pi-save" severity="secondary" @click="save(false)" />
      <Button v-if="hasPermissionToMoveStatus" :label="moveStatusButtonText" class="mt-8 ml-2" :icon="moveStatusButtonIcon" @click="save()" />
    </template>
  </div>
</template>
