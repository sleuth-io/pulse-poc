<script setup lang="ts">
const route = useRoute('workspaceSlug-folderSlug-reviewSlug')
const params = route.params
const db = useDatabase()

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
      review.status = 'in-review'
    else
      review.status = 'completed'
  }
  navigateTo({ name: 'workspaceSlug-folderSlug' })
}
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
            v-model="review.entry[widget.id]" :disabled="review.status !== 'in-review'"
            class="text-3xl mt-3"
          />
        </div>
      </div>
    </div>

    <template v-if="review.status !== 'completed'">
      <Button label="Save" class="mt-8" icon="pi pi-save" severity="secondary" @click="save(false)" />
      <Button :label="review.status === 'draft' ? 'Notify reviewers' : 'Record metrics'" class="mt-8 ml-2" icon="pi pi-send" @click="save()" />
    </template>
  </div>
</template>
