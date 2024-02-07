<template>
  <div>
    <h2 class="text-xl">Workspace: {{ $route.params.workspaceSlug }}</h2>

    <div class="flex mt-3">
      <NuxtLink
        v-for="folder in $db.workspaces.find(
          (w) => w.slug === params.workspaceSlug
        ).folders"
        :key="folder.slug"
        :to="`/${params.workspaceSlug}/${folder.slug}`"
        class="flex bg-gray-400 px-3 h-48 min-w-36 items-center justify-center"
      >
        <i class="pi pi-folder mr-2" />
        {{ folder.name }}
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
const $route = useRoute();
const params = $route.params;
const $db = useState("db");
</script>
