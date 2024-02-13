<script setup lang="ts">
const route = useRoute('workspaceSlug-folderSlug-_create')
const db = useDatabase()

const folder = db.value.workspaces.find(w => w.slug === route.params.workspaceSlug)?.folders.find(f => f.slug === route.params.folderSlug)

const review = ref<ReviewType>({
  recurrence: 'monthly',
  startDate: getStartDate(folder),
  entry: {},
  schema: [
    {
      id: 'new-widget',
      title: 'New widget',
    },
  ],
  slug: `${route.params.folderSlug}-${getStartDate(folder)}`,
  status: 'draft',
})

function createReview() {
  folder?.reviews.push(review.value)

  navigateTo({
    name: 'workspaceSlug-folderSlug',
    params: route.params,
  })
}

function addField() {
  review.value.schema.push({
    title: 'New widget',
    id: (Math.random() + 1).toString(36).substring(7),
  })
}
</script>

<template>
  <div>
    <div class="flex-auto">
      <label for="recurrence" class="font-bold block mb-2">Recurrence</label>
      <Dropdown
        id="recurrence"
        v-model="review.recurrence"
        :options="['monthly', 'weekly']"
      />
    </div>

    <Divider />
    <Card v-for="(field, i) in review.schema" :key="i" class="mb-4">
      <template #content>
        <InputText v-model="field.title" />
      </template>
    </Card>
    <Button label="Add field" icon="pi pi-plus" severity="secondary" @click="addField" />
    <Divider />
    <Button label="Create" icon="pi pi-save" @click="createReview" />
  </div>
</template>
