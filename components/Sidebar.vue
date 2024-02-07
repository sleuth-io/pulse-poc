<template>
  <div class="flex-0 w-72 bg-surface-200 dark:bg-surface-600">
    <div class="p-4">
      <h1 class="text-xl font-bold">Workspaces</h1>
      <ul>
        <li v-for="workspace in $db.workspaces" :key="workspace.name">
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

              <ul>
                <li
                  v-for="def in getUniqueReviewDefinitions(folder.reviewDefinitions)"
                  :key="def.slug"
                  class="pl-2"
                >
                  <NuxtLink
                    :to="`/${workspace.slug}/${folder.slug}/${def.slug}`"
                    class="block py-1"
                    active-class="text-underline"
                  >
                    <i class="pi pi-file mr-2" />
                    <span>{{ def.name }}</span>
                  </NuxtLink>
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

function getUniqueReviewDefinitions(reviewDefinitions) {
  const uniqueSlugs = new Set()
  reviewDefinitions.forEach(rd => uniqueSlugs.add(rd.slug))

  return Array.from(uniqueSlugs).map(slug => {
    const definitionsWithSlug = reviewDefinitions.filter(rd => rd.slug === slug)
    const sorted = definitionsWithSlug.sort((a, b) => a.version - b.version).reverse()
    return sorted[0]
  })
}
</script>
