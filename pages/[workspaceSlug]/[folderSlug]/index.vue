<template>
  <div>
    <h2 class="text-xl">Folder: {{ params.folderSlug }}</h2>

    <div class="flex mt-3">
      <NuxtLink
        v-for="def in $db.workspaces
          .find((w) => w.slug === params.workspaceSlug)
          .folders.find((f) => f.slug === params.folderSlug).reviewDefinitions"
        :key="def.slug"
        :to="`/${params.workspaceSlug}/${params.folderSlug}/${def.slug}`"
        class="flex bg-gray-400 px-3 h-48 min-w-36 items-center justify-center"
      >
        <i class="pi pi-file mr-2" />
        {{ def.name }}
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
const $route = useRoute();
const params = $route.params;
const $db = useState("db");
</script>
