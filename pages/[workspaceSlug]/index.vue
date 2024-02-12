<template>
  <div>
    <h2 class="text-xl">Workspace: {{ route.params.workspaceSlug }}</h2>

    <div class="flex mt-3">
      <NuxtLink
        v-for="folder in db.workspaces.find(
          (w) => w.slug === params.workspaceSlug
        )!.folders"
        :key="folder.slug"
        :to="`/${params.workspaceSlug}/${folder.slug}`"
        class="flex bg-gray-400 px-3 h-48 min-w-36 items-center justify-center mr-3"
      >
        <i class="pi pi-folder mr-2" />
        {{ folder.name }}
      </NuxtLink>
      <NuxtLink
        :to="`/${params.workspaceSlug}/_create`"
        class="flex bg-gray-200 px-3 h-48 min-w-36 items-center justify-center mr-3"
      >
        <i class="pi pi-plus mr-2" />
        New folder
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute('workspaceSlug');
const params = route.params;
const db = useDatabase();
</script>
