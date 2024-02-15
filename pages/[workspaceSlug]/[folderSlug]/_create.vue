<script setup lang="ts">
import type {
  ExistingWidgetType,
  ReviewType,
} from '~/composables/use-database'

const route = useRoute('workspaceSlug-folderSlug-_create')
const db = useDatabase()

const folder = db.value.workspaces.find(w => w.slug === route.params.workspaceSlug)?.folders.find(f => f.slug === route.params.folderSlug)

const review = ref<ReviewType>({
  recurrence: 'monthly',
  startDate: getStartDate(folder),
  schema: [],
  slug: `${route.params.folderSlug}-${getStartDate(folder)}`,
  status: 'draft',
})

const widgetList = ref<ExistingWidgetType[]>([])

function createReview() {
  folder?.reviews.push(review.value)
  db.value.widgets.existingWidgets.push(...widgetList.value)

  navigateTo({
    name: 'workspaceSlug-folderSlug',
    params: route.params,
  })
}

function createNewWidget(type: string, title = ''): ExistingWidgetType {
  return {
    id: (Math.random() + 1).toString(36).substring(7),
    title: `New ${title} widget`,
    widgetTypeId: type,
    data: [],
  }
}

function addWidget(type: string, title: string) {
  const newWidget = createNewWidget(type, title)
  review.value.schema.push({
    widgetId: newWidget.id,
  })
  widgetList.value.push(newWidget)
}

const widgetMenu = ref()
function toggle(e: Event) {
  widgetMenu.value.toggle(e)
}

const widgetMenuItems = db.value.widgets.widgetTypes.map(w => ({
  label: w.title,
  value: w.id,
  existingWidget: false,
  command: ({ item }) => addWidget(item.value, item.label),
}))
</script>

<template>
  <div>
    <div class="flex-auto">
      <label for="recurrence" class="font-bold block mb-2">Recurrence</label>
      <Dropdown
        id="recurrence"
        v-model="review.recurrence"
        :options="['monthly', 'weekly']"
      />
    </div>

    <Divider />
    <Card v-for="widget in widgetList" :key="widget.id" class="mb-4">
      <template #content>
        <InputText v-model="widget.title" />
      </template>
    </Card>
    <Button
      type="button"
      label="Add widget"
      icon="pi pi-plus"
      severity="secondary"
      aria-haspopup="true"
      aria-controls="overlay_menu"
      @click="toggle"
    />
    <Menu id="overlay_menu" ref="widgetMenu" :model="widgetMenuItems" :popup="true" />
    <Divider />
    <Button label="Create" icon="pi pi-save" @click="createReview" />
  </div>
</template>
