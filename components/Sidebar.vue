<script setup lang="ts">
const db = useDatabase()
</script>

<template>
  <div class="flex flex-col flex-0 w-72 bg-surface-200 dark:bg-surface-600">
    <div class="p-4">
      <NuxtLink to="/">
        <h1 class="text-xl font-bold">Workspaces</h1>
      </NuxtLink>
      <ul>
        <li v-for="workspace in db.workspaces" :key="workspace.name">
          <NuxtLink
            :to="`/${workspace.slug}`"
            class="block py-3"
            active-class="text-underline"
            >{{ workspace.name }}</NuxtLink
          >
          <ul>
            <li
              v-for="folder in workspace.folders"
              :key="folder.name"
              class="pl-2"
            >
              <NuxtLink
                :to="`/${workspace.slug}/${folder.slug}`"
                class="block py-1"
                active-class="text-underline"
              >
                <i class="pi pi-folder mr-2" />
                <span>{{ folder.name }}</span>
              </NuxtLink>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <NuxtLink to="/database" class="mt-auto p-4">
      <i class="pi pi-database mr-2" />Database
    </NuxtLink>
  </div>
</template>
