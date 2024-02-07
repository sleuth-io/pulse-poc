<template>
  <div class="flex-0 w-72 bg-surface-200 dark:bg-surface-600">
    <div class="p-4">
      <h1 class="text-xl font-bold">Workspaces</h1>
      <ul>
        <li v-for="workspace in $db.workspaces" :key="workspace.name">
          <router-link
            :to="`/${workspace.slug}`"
            class="block py-3"
            active-class="text-underline"
            >{{ workspace.name }}</router-link
          >
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
const $db = useState("db");
</script>
