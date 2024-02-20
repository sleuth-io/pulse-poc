<script setup lang="ts">
const items = ref([
  { label: 'Reviews', icon: 'pi pi-book', route: '/reviews' },
  { label: 'Data', icon: 'pi pi-database', route: '/data' },
])
</script>

<template>
  <div class="bg-surface-50 dark:bg-surface-800 dark:text-white flex flex-col h-screen">
    <TabMenu :model="items">
      <template #item="{ item, props }">
        <router-link v-if="item.route" v-slot="{ href, navigate }" :to="item.route" custom>
            <a v-ripple :href="href" v-bind="props.action" @click="navigate">
                <span v-bind="props.icon" />
                <span v-bind="props.label">{{ item.label }}</span>
            </a>
        </router-link>
    </template>
    </TabMenu>
      <NuxtPage />
  </div>
</template>

<style>
@import "./assets/css/base.css";
</style>
