<script setup lang="ts">
const route = useRoute('reviews-workspaceSlug')
const params = route.params
const db = useDatabase()
const { currentUser } = useCurrentUser()
</script>

<template>
  <div>
    <h2 class="text-xl mb-6">
      Workspace: {{ route.params.workspaceSlug }}
    </h2>

    <div class="flex gap-4 flex-wrap">
      <NuxtLink
        v-for="folder in db.workspaces.find(
          (w) => w.slug === params.workspaceSlug,
        )!.folders"
        :key="folder.slug"
        :to="`/reviews/${params.workspaceSlug}/${folder.slug}`"
        class="flex bg-gray-400 px-3 h-48 w-64 items-center justify-center"
      >
        <i class="pi pi-folder mr-2" />
        {{ folder.name }}
      </NuxtLink>
      <NuxtLink
        v-if="currentUser?.role === 'admin'"
        :to="`/reviews/${params.workspaceSlug}/_create`"
        class="flex bg-gray-200 px-3 h-48 w-64 items-center justify-center"
      >
        <i class="pi pi-plus mr-2" />
        New folder
      </NuxtLink>
    </div>
  </div>
</template>
