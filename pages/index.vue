<script lang="ts" setup>
const reviewDefinitionSlug = 'weekly-dora'
const reviewDefinitionVersion = 1

const database = useState('db', () => null)

const definition = ref(JSON.parse(JSON.stringify(database.value?.workspaces[0].folders[0].reviewDefinitions.find(
    rd => rd.slug === reviewDefinitionSlug && rd.version === reviewDefinitionVersion
  ))))


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
  <div class="m-auto w-[80vw]">
    <Card v-for="field in definition.schema" class="mt-4">
      <template #content>
        <InputText v-model="field.title"></InputText></template>
    </Card>
    <Button label="+ Add field" class="mt-8" @click="addField" severity="secondary"/>
    <hr class="mt-8">
    <Button label="Save template" class="mt-8" @click="save"/>

  </div>
</template>
