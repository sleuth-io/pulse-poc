<script setup lang="ts">
const navigationItems = [
  { label: "Home", route: "/" },
  { label: "Subpage", route: "/subpage" },
];

const database = useState("db", () => ({
  workspaces: [
    {
      name: "Pulse engineering",
      slug: "pulse-engineering",
      folders: [
        {
          name: "Frontend",
          slug: "frontend",
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
                  slug: "weekly-dora-2021-01-01",
                  date: "2021-01-01",
                  values: {
                    "mttr-widget": 10,
                    "frequency-widget": 5,
                  },
                },
              ],
            },{
              name: "Monthly DevEx",
              recurrence: "monthly",
              startDate: "2021-01-01",
              slug: "monthly-devex",
              version: 1,
              schema: [
                {
                  title: "Potato",
                  id: "potato",
                },
                {
                  title: "Tomato",
                  id: "tomato",
                },
              ],
              reviews: [],
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
    <div class="flex-1">
      <NuxtPage />
    </div>
  </div>
</template>

<style>
@import "./assets/css/base.css";
</style>
