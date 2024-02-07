<script lang="ts" setup>
const reviewDefinitionSlug = 'weekly-dora'
const reviewDefinitionVersion = 1

const database = useState('db', () => null)

const definition = computed(() =>
  database.value?.workspaces[0].folders[0].reviewDefinitions.find(
    rd => rd.slug === reviewDefinitionSlug && rd.version === reviewDefinitionVersion
  )
)

function addField() {
  definition.value.schema.push({
    title: 'New widget',
    slug: (Math.random() + 1).toString(36).substring(7)
  })
}

</script>
<template>
  <div class="m-auto w-[80vw]">
    <Card v-for="field in definition.schema" class="mt-4">
      <template #content>
        <InputText v-model="field.title"></InputText></template>
    </Card>
    <Button label="+ Add field" class="mt-8" @click="addField"/>
  </div>
</template>
