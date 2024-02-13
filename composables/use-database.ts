export interface PulseType {
  workspaces: WorkspaceType[];
  users: UserType[];
}

export interface UserType {
  email: string;
  role: "admin" | "user";
}

interface WorkspaceType {
  name: string;
  slug: string;
  folders: FolderType[];
}

export interface FolderType {
  name: string;
  slug: string;
  recurrence: "weekly" | "monthly" | null;
  reviews: ReviewType[];
}

export interface ReviewType {
  recurrence: "weekly" | "monthly";
  status: "draft" | "in-review" | "completed";
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

export default () =>
  useState<PulseType>("db", () => ({
    users: [
      {
        email: "admin@pulse.io",
        role: "admin",
      },
      {
        email: "user@pulse.io",
        role: "user",
      },
    ],
    workspaces: [
      {
        name: "Pulse engineering",
        slug: "pulse-engineering",
        folders: [
          {
            name: "Weekly DORA",
            slug: "weekly-dora",
            recurrence: null,
            reviews: [
              {
                recurrence: "weekly",
                status: "draft",
                startDate: "2024-02-12",
                slug: "weekly-dora-2024-02-12",
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
                entry: {
                  _date: "2024-02-12",
                  _user: 1,
                  "mttr-widget": 1,
                  "frequency-widget": 2,
                },
              },
              {
                recurrence: "weekly",
                status: "in-review",
                startDate: "2024-02-05",
                slug: "weekly-dora-2024-02-05",
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
                entry: {
                  _date: "2024-02-05",
                  _user: 1,
                  "mttr-widget": 1,
                  "frequency-widget": 2,
                },
              },
              {
                recurrence: "weekly",
                status: "completed",
                startDate: "2024-01-15",
                slug: "weekly-dora-2024-01-15",
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
                entry: {
                  _date: "2024-01-15",
                  _user: 1,
                  "mttr-widget": 1,
                  "frequency-widget": 2,
                },
              },
              {
                recurrence: "weekly",
                status: "completed",
                startDate: "2024-01-22",
                slug: "weekly-dora-2024-01-22",
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
                entry: {
                  _date: "2024-01-22",
                  _user: 1,
                  "mttr-widget": 10,
                  "frequency-widget": 5,
                },
              },
              {
                recurrence: "weekly",
                status: "completed",
                startDate: "2024-01-29",
                slug: "weekly-dora-2024-01-29",
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
                entry: {
                  _date: "2024-01-29",
                  _user: 1,
                  "mttr-widget": 3,
                  "frequency-widget": 4,
                },
              },
            ],
          },
          {
            name: "Monthly DevEx",
            slug: "monthly-devex",
            recurrence: null,
            reviews: [
              {
                recurrence: "monthly",
                status: "draft",
                startDate: "2024-01-01",
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
      },
    ],
  }));
