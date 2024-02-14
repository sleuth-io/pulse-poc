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

function createNewWidget(): ExistingWidgetType {
  return {
    id: (Math.random() + 1).toString(36).substring(7),
    title: 'New widget',
    widgetTypeId: 'number',
    data: [],
  }
}

function createReview() {
  folder?.reviews.push(review.value)
  db.value.widgets.existingWidgets.push(...widgetList.value)

  navigateTo({
    name: 'workspaceSlug-folderSlug',
    params: route.params,
  })
}

function addWidget() {
  const newWidget = createNewWidget()
  review.value.schema.push({
    widgetId: newWidget.id,
  })
  widgetList.value.push(newWidget)
}
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
      label="Add widget"
      icon="pi pi-plus"
      severity="secondary"
      @click="addWidget"
    />
    <Divider />
    <Button label="Create" icon="pi pi-save" @click="createReview" />
  </div>
</template>
