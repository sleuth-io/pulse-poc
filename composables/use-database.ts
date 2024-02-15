export interface PulseType {
  workspaces: WorkspaceType[]
  users: UserType[]
  widgets: WidgetsType
}

export interface UserType {
  email: string
  role: 'admin' | 'user'
}

interface WorkspaceType {
  name: string
  slug: string
  folders: FolderType[]
}

export interface FolderType {
  name: string
  slug: string
  recurrence: 'weekly' | 'monthly' | null
  reviews: ReviewType[]
}

export interface ReviewType {
  recurrence: 'weekly' | 'monthly'
  status: 'draft' | 'in-progress' | 'completed'
  startDate: string
  slug: string
  schema: SchemaType[]
}

interface SchemaType {
  widgetId: string
}

interface WidgetsType {
  widgetTypes: WidgetType[]
  existingWidgets: ExistingWidgetType[]
}

interface WidgetType {
  id: string
  title: string
  type: 'number' | 'string'
}
export interface ExistingWidgetType {
  id: string
  title: string
  widgetTypeId: string
  data: WidgetDataType[]
}

interface WidgetDataType {
  _date: string
  _user: number | null
  value: number | string | null
}

export default () =>
  useState<PulseType>('db', () => ({
    users: [
      {
        email: 'admin@pulse.io',
        role: 'admin',
      },
      {
        email: 'user@pulse.io',
        role: 'user',
      },
    ],
    workspaces: [
      {
        name: 'Pulse engineering',
        slug: 'pulse-engineering',
        folders: [
          {
            name: 'Weekly DORA',
            slug: 'weekly-dora',
            recurrence: null,
            reviews: [
              {
                recurrence: 'weekly',
                status: 'draft',
                startDate: '2024-02-12',
                slug: 'weekly-dora-2024-02-12',
                schema: [
                  {
                    widgetId: 'mttr-widget-team-1',
                  },
                  {
                    widgetId: 'frequency-widget-team-1',
                  },
                ],
              },
              {
                recurrence: 'weekly',
                status: 'in-progress',
                startDate: '2024-02-05',
                slug: 'weekly-dora-2024-02-05',
                schema: [
                  {
                    widgetId: 'mttr-widget-team-1',
                  },
                  {
                    widgetId: 'frequency-widget-team-1',
                  },
                ],
              },
              {
                recurrence: 'weekly',
                status: 'completed',
                startDate: '2024-01-15',
                slug: 'weekly-dora-2024-01-15',
                schema: [
                  {
                    widgetId: 'mttr-widget-team-1',
                  },
                  {
                    widgetId: 'frequency-widget-team-1',
                  },
                ],
              },
              {
                recurrence: 'weekly',
                status: 'completed',
                startDate: '2024-01-22',
                slug: 'weekly-dora-2024-01-22',
                schema: [
                  {
                    widgetId: 'mttr-widget-team-1',
                  },
                  {
                    widgetId: 'frequency-widget-team-1',
                  },
                ],
              },
              {
                recurrence: 'weekly',
                status: 'completed',
                startDate: '2024-01-29',
                slug: 'weekly-dora-2024-01-29',
                schema: [
                  {
                    widgetId: 'mttr-widget-team-1',
                  },
                  {
                    widgetId: 'frequency-widget-team-1',
                  },
                ],
              },
            ],
          },
          {
            name: 'Monthly DevEx',
            slug: 'monthly-devex',
            recurrence: null,
            reviews: [
              {
                recurrence: 'monthly',
                status: 'draft',
                startDate: '2024-02-05',
                slug: 'monthly-devex',
                schema: [
                  {
                    widgetId: 'potato-widget-1',
                  },
                  {
                    widgetId: 'tomato-widget-1',
                  },
                  {
                    widgetId: 'mttr-widget-team-1',
                  },
                  {
                    widgetId: 'frequency-widget-team-1',
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
    widgets: {
      widgetTypes: [
        {
          id: 'mttr',
          title: 'MTTR',
          type: 'number',
        },
        {
          id: 'frequency',
          title: 'Frequency',
          type: 'number',
        },
        {
          id: 'number',
          title: 'Number',
          type: 'number',
        },
      ],
      existingWidgets: [
        {
          id: 'mttr-widget-team-1',
          title: 'MTTR for team 1',
          widgetTypeId: 'mttr',
          data: [
            {
              _date: '2024-01-15',
              _user: 1,
              value: 3,
            },
            {
              _date: '2024-01-22',
              _user: 1,
              value: 2,
            },
            {
              _date: '2024-01-29',
              _user: 1,
              value: 1,
            },
            // {
            //   _date: '2024-02-05',
            //   _user: 1,
            //   value: 3,
            // },
            {
              _date: '2024-02-12',
              _user: 1,
              value: 5,
            },
          ],
        },
        {
          id: 'frequency-widget-team-1',
          title: 'Frequency for team 1',
          widgetTypeId: 'frequency',
          data: [
            {
              _date: '2024-01-15',
              _user: 1,
              value: 2,
            },
            {
              _date: '2024-01-22',
              _user: 1,
              value: 4,
            },
            {
              _date: '2024-01-29',
              _user: 1,
              value: 5,
            },
            // {
            //   _date: '2024-02-05',
            //   _user: 1,
            //   value: 2,
            // },
            {
              _date: '2024-02-12',
              _user: 1,
              value: 7,
            },
          ],
        },
        {
          id: 'potato-widget-1',
          title: 'Potato',
          widgetTypeId: 'number',
          data: [],
        },
        {
          id: 'tomato-widget-1',
          title: 'Tomato',
          widgetTypeId: 'number',
          data: [],
        },
      ],
    },
  }))
