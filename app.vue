<script setup lang="ts">
const navigationItems = [
  { label: "Home", route: "/" },
  { label: "Subpage", route: "/subpage" },
];

const database = useState("db", () => ({
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
}));
</script>

<template>
  <div class="bg-surface-50 dark:bg-surface-800 dark:text-white flex h-screen">
    <Sidebar />
    <div class="flex flex-1">
      <NuxtPage />
    </div>
  </div>
</template>

<style>
@import "./assets/css/base.css";
</style>
