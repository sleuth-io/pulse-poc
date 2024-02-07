<script setup lang="ts">
const reviewDate = '2021-01-01';

const route = useRoute('workspaceSlug-folderSlug-definitionSlug-review-_create')
const router = useRouter()

const db = useState('db')
const workspace = db.value.workspaces.find((workspace) => workspace.slug === route.params.workspaceSlug)
const definition = workspace.folders.find((folder) => folder.slug === route.params.folderSlug).reviewDefinitions.find((definition) => definition.slug === route.params.definitionSlug)

const value = ref<Record<string, number>>({})

async function createReview() {
  definition.reviews.push({
    date: reviewDate,
    values: value,
  });

  await router.push({ name: 'workspaceSlug-folderSlug-definitionSlug' })
}
</script>

<template>
  <div class="flex flex-col">
    <label>
      Review date:
      <input v-model="reviewDate" type="date" />
    </label>

    <template v-for="field in definition.schema">
      <label>
        {{ field.title }}:
        <input v-model="value[field.id]" type="number" />
      </label>
    </template>
    <Button @click="createReview">Create</Button>
  </div>
</template>
