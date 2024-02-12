<script setup lang="ts">
import type { ReviewType } from '~/app.vue'

const route = useRoute('workspaceSlug-folderSlug-_create')
const db = useDatabase()

const review = ref<ReviewType>({
  recurrence: 'monthly',
  startDate: new Date().toISOString(),
  entry: {},
  schema: [
    {
      id: 'new-widget',
      title: 'New widget',
    }
  ],
  slug: route.params.folderSlug + new Date().toISOString(),
  status: 'draft',
})
const folder = db.value.workspaces.find(w => w.slug === route.params.workspaceSlug)?.folders.find(f => f.slug === route.params.folderSlug)!

function createReview() {
  folder.reviews.push(review.value)

  navigateTo({
    name: 'workspaceSlug-folderSlug',
    params: route.params
  })
}

function addField() {
  review.value.schema.push({
    title: 'New widget',
    id: (Math.random() + 1).toString(36).substring(7)
  })
}
</script>

<template>
  <div>
    <div class="flex-auto">
      <label for="recurrence" class="font-bold block mb-2">Recurrence</label>
      <Dropdown
        v-model="review.recurrence"
        id="recurrence"
        :options="['monthly', 'weekly']"
      />
    </div>

    <Divider />
    <Card v-for="field in review.schema" class="mb-4">
      <template #content>
      <InputText v-model="field.title"></InputText></template>
    </Card>
    <Button label="Add field" icon="pi pi-plus" @click="addField" severity="secondary"/>
    <Divider />
    <Button label="Create"  icon="pi pi-save" @click="createReview" />
  </div>
</template>
