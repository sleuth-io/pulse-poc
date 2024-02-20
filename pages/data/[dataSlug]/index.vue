<template>
  <div>
    <DataTable :value="data">
      <Column field="_date" header="Date"></Column>
      <Column field="value" header="Value"></Column>
      <Column field="_user" header="User ID"></Column>
    </DataTable>
  </div>
</template>

<script setup lang="ts">
const route = useRoute('data-dataSlug')
const db = useDatabase()

const dataSlug = route.params.dataSlug
const data = db.value.widgets.existingWidgets.find(w => w.id.includes(dataSlug.split('-')[0]))?.data
</script>
