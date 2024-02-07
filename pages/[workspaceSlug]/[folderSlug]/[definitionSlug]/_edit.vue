<script lang="ts" setup>
const route = useRoute('workspaceSlug-folderSlug-definitionSlug')


const reviewDefinitionSlug = 'weekly-dora'
const reviewDefinitionVersion = 1

const database = useState('db', () => null)

function getDefinition() {
  const workspace = database.value?.workspaces.find(
    withScopeId => withScopeId.slug === route.params.workspaceSlug
  )
  const folder = workspace.folders.find(
    fd => fd.slug === route.params.folderSlug
  )
  const reviewDefinition = folder.reviewDefinitions.find(
    rd => rd.slug === route.params.definitionSlug
  )

  return reviewDefinition
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
    <Button label="+ Add field" class="mt-8" @click="addField" severity="secondary"/>
    <hr class="mt-8">
    <Button label="Save template" class="mt-8" @click="save"/>

  </div>
</template>
