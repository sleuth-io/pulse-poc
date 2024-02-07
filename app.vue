<script setup lang="ts">
const navigationItems = [
  { label: 'Home', route: '/' },
  { label: 'Subpage', route: '/subpage' },
]
</script>

<template>
  <div class="bg-surface-50 dark:bg-surface-800 dark:text-white h-screen flex flex-col">
    <div>
      <Menubar :model="navigationItems" class="mb-4">
        <template #item="{ item, props }">
          <NuxtLink v-slot="{ href, navigate }" :to="item.route" custom>
            <a v-ripple :href="href" v-bind="props.action" @click="navigate">
              {{ item.label }}
            </a>
          </NuxtLink>
        </template>
      </Menubar>
      <NuxtPage />
    </div>
  </div>
</template>

<style>
@import "./assets/css/base.css"
</style>
