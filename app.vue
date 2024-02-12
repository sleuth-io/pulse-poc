<script setup lang="ts">
export interface PulseType {
  workspaces: WorkspaceType[];
}

interface WorkspaceType {
  name: string;
  slug: string;
  folders: FolderType[];
}

interface FolderType {
  name: string;
  slug: string;
  reviews: ReviewType[];
}

export interface ReviewType {
  recurrence: "weekly" | "monthly";
  status: "draft" | "in-progress" | "published";
  startDate: string;
  slug: string;
  schema: SchemaType[];
  entry: EntryType;
}

interface SchemaType {
  title: string;
  id: string;
}

interface EntryType {
  [key: string]: number | string | null;
}

useState<PulseType>("db", () => ({
  workspaces: [
    {
      name: "Pulse engineering",
      slug: "pulse-engineering",
      folders: [
        {
          name: "Weekly DORA",
          slug: "weekly-dora",
          reviews: [
            {
              recurrence: "weekly",
              status: "draft",
              startDate: "2020-31-12",
              slug: "weekly-dora-2020-31-12",
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
              entry:
              {
                _date: null,
                _user: null,
                "mttr-widget": null,
                "frequency-widget": null,
              }
            },
            {
              recurrence: "weekly",
              startDate: "2021-01-07",
              status: "in-progress",
              slug: "weekly-dora-2021-01-07",
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
              entry:
              {
                _date: "2021-01-02",
                _user: 1,
                "mttr-widget": 1,
                "frequency-widget": null,
              },
            },
            {
              recurrence: "weekly",
              status: "published",
              startDate: "2021-01-01",
              slug: "weekly-dora-2021-01-01",
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
              entry:
              {
                _date: "2021-01-02",
                _user: 1,
                "mttr-widget": 1,
                "frequency-widget": 2,
              }
            },
            {
              recurrence: "weekly",
              status: "published",
              startDate: "2021-01-02",
              slug: "weekly-dora-2021-01-02",
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
              entry:
              {
                _date: "2021-01-02",
                _user: 1,
                "mttr-widget": 10,
                "frequency-widget": 5,
              }
            },
            {
              recurrence: "weekly",
              status: "published",
              startDate: "2021-01-03",
              slug: "weekly-dora-2021-01-03",
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
              entry:
              {
                _date: "2021-01-02",
                _user: 1,
                "mttr-widget": 3,
                "frequency-widget": 4,
              }
            },
          ]
        },
        {
          name: "Monthly DevEx",
          slug: "monthly-devex",
          reviews: [{
            recurrence: "monthly",
            status: "draft",
            startDate: "2021-01-01",
            slug: "monthly-devex",
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
            entry: {},
          },
          ],
        },
      ],
    }
  ]
}))
</script>

<template>
  <div class="bg-surface-50 dark:bg-surface-800 dark:text-white flex h-screen">
    <Sidebar />
    <div class="flex-1 py-4 px-8">
      <NuxtPage />
    </div>
  </div>
</template>

<style>
@import "./assets/css/base.css";
</style>
