<script lang="ts" setup>
const route = useRoute('workspaceSlug-folderSlug-definitionSlug-_edit')


const reviewDefinitionSlug = 'weekly-dora'
const reviewDefinitionVersion = 1

const database = useState('db', () => null)

function getDefinition() {
  const workspace = database.value?.workspaces.find(
    ws => ws.slug === route.params.workspaceSlug
  )
  const folder = workspace.folders.find(
    fd => fd.slug === route.params.folderSlug
  )

  const reviewDefinitions = folder.reviewDefinitions.filter(
    rd => rd.slug === route.params.definitionSlug
  ).sort((a, b) => b.version - a.version)

  const latestReviewDefinition = JSON.parse(JSON.stringify(reviewDefinitions[0]))
  latestReviewDefinition.reviews = []

  return latestReviewDefinition
}

const definition = ref(JSON.parse(JSON.stringify(getDefinition())))


function addField() {
  definition.value.schema.push({
    title: 'New widget',
    slug: (Math.random() + 1).toString(36).substring(7)
  })
}

function save() {
  definition.value.version++
  database.value?.workspaces[0].folders[0].reviewDefinitions.push(definition.value)
  navigateTo({name: 'workspaceSlug-folderSlug-definitionSlug' })
}

</script>
<template>
  <div class="m-auto w-4/5">
    <h1>{{ definition.name }}</h1>
    <hr class="my-8" />
    <Card v-for="field in definition.schema" class="mt-4">
      <template #content>
        <InputText v-model="field.title"></InputText></template>
    </Card>
    <Button label="Add field" icon="pi pi-plus" class="mt-8" @click="addField" severity="secondary"/>
    <hr class="mt-8">
    <Button label="Save template" class="mt-8" icon="pi pi-save" @click="save"/>

  </div>
</template>
