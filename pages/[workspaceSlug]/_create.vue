<script setup lang="ts">
const route = useRoute('workspaceSlug-_create')
const folderName = ref('')
const db = useDatabase()
const workspace = db.value.workspaces.find(w => w.slug === route.params.workspaceSlug)!

function createFolder() {
  const folderSlug = folderName.value.toLowerCase().replace(/\s/g, '-')

  workspace.folders.push({
    name: folderName.value,
    reviews: [],
    slug: folderSlug,
  })

  navigateTo({
    name: 'workspaceSlug-folderSlug',
    params: {
      ...route.params,
      folderSlug,
    },
  })
}
</script>

<template>
  <div>
    <InputText v-model="folderName" placeholder="New folder name" />
    <Button label="Create" @click="createFolder" />
  </div>
</template>
