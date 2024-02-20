<script setup lang="ts">
const db = useDatabase()

const tables = computed(() => db.value.widgets.existingWidgets.map(w => `${w.id.split('-')[0]}-data`))
</script>

<template>
  <div class="flex flex-col flex-0 w-64 bg-surface-200 dark:bg-surface-600 gap-3 p-4">
    <div>
      <NuxtLink to="/">
        <h1 class="text-xl font-bold">
          Gathered data
        </h1>
      </NuxtLink>
      <ul>
        <li v-for="table in tables" :key="table">
          <NuxtLink
            :to="`/data/${table}`"
            class="block py-3"
            active-class="text-underline"
          >
            {{ table }}
          </NuxtLink>
        </li>
      </ul>
    </div>
  </div>
</template>
