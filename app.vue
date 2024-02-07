<script setup lang="ts">
const navigationItems = [
  { label: 'Home', route: '/' },
  { label: 'Subpage', route: '/subpage' },
]

const database = useState('db', () => ({
  workspaces: [
    {
      name: "Pulse engineering",
      folders: [
        {
          name: "Frontend",
          reviewDefinitions: [
            {
              name: "Weekly DORA",
              recurrence: "weekly",
              startDate: "2021-01-01",
              slug: "weekly-dora",
              version: 1,
              schema: [
                {
                  title: "MTTR widget",
                  id: "mttr-widget",
                },
                {
                  title: "Frequency widget",
                  id: "frequency-widget",
                },
              ],
              reviews: [
                {
                  date: "2021-01-01",
                  values: {
                    "mttr-widget": 10,
                    "frequency-widget": 5,
                  },
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}))
</script>

<template>
  <div class="bg-surface-50 dark:bg-surface-800 dark:text-white h-screen flex flex-col">
    <div>
      {{ database }}
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
