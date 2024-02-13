<script setup lang="ts">
const db = useDatabase()

const { setCurrentUser, currentUser } = useCurrentUser()
const [admin, user] = db.value.users
</script>

<template>
  <div class="flex flex-col flex-0 w-64 bg-surface-200 dark:bg-surface-600 gap-3 p-4">
    <div>
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
    <NuxtLink to="/database" class="mt-auto">
      <i class="pi pi-database mr-2" />Database
    </NuxtLink>
    <div>Viewing as:</div>
    <div class="flex gap-4">
      <Button label="Admin" plain @click="setCurrentUser(admin)" :disabled="admin === currentUser" />
      <Button label="User" plain @click="setCurrentUser(user)" :disabled="user === currentUser" />
    </div>
  </div>
</template>
