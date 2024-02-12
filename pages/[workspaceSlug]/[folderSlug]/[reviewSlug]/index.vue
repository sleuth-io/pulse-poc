<template>
  <div>
    <div>
      <h2 class="text-xl">
        <i class="pi pi-check mr-2" />
        Review: {{ review.slug }}
      </h2>
      <div>Date: {{ review.startDate }}</div>

      <div v-if="review.status === 'draft'">
        <Card v-for="field in review.schema" class="mt-4">
          <template #content>
            <InputText v-model="field.title"></InputText>
          </template>
        </Card>
        <Button label="Add field" icon="pi pi-plus" class="mt-8" @click="addField" severity="secondary" />
        <hr class="mt-8">
      </div>
      <div v-else class="mt-6 flex">
        <div v-for="widget in review.schema" :key="widget.id"
          class="flex flex-col w-48 bg-gray-100 dark:bg-gray-700 p-6 mr-3">
          <label :for="widget.id" class="text-sm">{{ widget.title }}</label>
          <InputText v-model="review.entry[widget.id]" :disabled="review.status !== 'in-progress'"
            class="text-3xl mt-3" />
        </div>
      </div>
    </div>

    <template v-if="review.status !== 'published'">
      <Button label="Save" class="mt-8" icon="pi pi-save" severity="secondary" @click="save(false)" />
      <Button label="Publish" class="mt-8" icon="pi pi-save" @click="save()" />
    </template>
  </div>
</template>

<script setup lang="ts">
const route = useRoute("workspaceSlug-folderSlug-reviewSlug")
const params = route.params
const db = useDatabase()

const review = db.value.workspaces
  .find((w) => w.slug === params.workspaceSlug)!
  .folders.find((f) => f.slug === params.folderSlug)!
  .reviews.find((d) => d.slug === params.reviewSlug)!


function addField() {
  review.schema.push({
    title: 'New widget',
    id: (Math.random() + 1).toString(36).substring(7)
  })
}

function save(publish = true) {
  if (publish) {
    if (review.status === 'draft') {
      review.status = 'in-progress'
    } else {
      review.status = 'published'
    }
  }
  navigateTo({ name: 'workspaceSlug-folderSlug' })
}
</script>
