export default {
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
};
