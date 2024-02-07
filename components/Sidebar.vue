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
          <ul>
            <li
              v-for="folder in workspace.folders"
              :key="folder.name"
              class="pl-2"
            >
              <router-link
                :to="`/${workspace.slug}/${folder.slug}`"
                class="block py-1"
                active-class="text-underline"
              >
                <i class="pi pi-folder mr-2" />
                <span>{{ folder.name }}</span>
              </router-link>

              <ul>
                <li
                  v-for="def in folder.reviewDefinitions"
                  :key="def.slug"
                  class="pl-2"
                >
                  <router-link
                    :to="`/${workspace.slug}/${folder.slug}/${def.slug}`"
                    class="block py-1"
                    active-class="text-underline"
                  >
                    <i class="pi pi-file mr-2" />
                    <span>{{ def.name }}</span>
                  </router-link>
                </li>
              </ul>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
const $db = useState("db");
</script>
