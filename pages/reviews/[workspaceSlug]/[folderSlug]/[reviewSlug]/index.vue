<script setup lang="ts">
const route = useRoute('reviews-workspaceSlug-folderSlug-reviewSlug')
const params = route.params
const db = useDatabase()
const { currentUser } = useCurrentUser()

const review = db.value.workspaces
  .find(w => w.slug === params.workspaceSlug)!
  .folders.find(f => f.slug === params.folderSlug)!
  .reviews.find(d => d.slug === params.reviewSlug)!

const reviewWidgets = db.value.widgets.existingWidgets.filter(w =>
  review.schema.some(s => s.widgetId === w.id),
)

function getWidgetData(widgetId: string) {
  const data = reviewWidgets.find(w => w.id === widgetId)!.data
  return data.find(d => d._date === review.startDate)
}

function updateWidgetValue(widgetId: string, value: string) {
  const data = getWidgetData(widgetId)
  if (data) { data.value = value }
  else {
    reviewWidgets.find(w => w.id === widgetId)!.data.push({
      _date: review.startDate,
      _user: 1,
      value,
    })
  }
}

const tempWidgetValues = reviewWidgets.reduce(
  (acc, w) => {
    acc[w.id] = getWidgetData(w.id)?.value ?? ''
    return acc
  },
  {} as Record<string, string>,
)

const newWidgetsList = ref<ExistingWidgetType[]>([])

function createNewWidget(type: string, title = ''): ExistingWidgetType {
  return {
    id: (Math.random() + 1).toString(36).substring(7),
    title: `New ${title} widget`,
    widgetTypeId: type,
    data: [],
  }
}

function addWidget(widget: ExistingWidgetType, isExistingWidget: boolean) {
  if (isExistingWidget) {
    review.schema.push({
      widgetId: widget.id,
    })
    newWidgetsList.value.push({ ...widget, disabled: true })
  }
  else {
    const newWidget = createNewWidget(widget.widgetTypeId, widget.title)
    review.schema.push({
      widgetId: newWidget.id,
    })
    newWidgetsList.value.push(newWidget)
    db.value.widgets.existingWidgets.push(...newWidgetsList.value)
  }
}

const widgetMenu = ref()
function toggle(e: Event) {
  widgetMenu.value.toggle(e)
}

const widgetMenuItems = computed(() => [{
  label: 'New widgets',
  items: db.value.widgets.widgetTypes.map(w => ({
    label: w.title,
    command: () => addWidget(w, false),
  })),
}, {
  label: 'Configured widgets',
  items: db.value.widgets.existingWidgets.filter((w) => {
    return !review.schema.some(s => s.widgetId === w.id)
  }).map(w => ({
    label: w.title,
    command: () => addWidget(w, true),
  })),
}])

function save(publish = true) {
  if (newWidgetsList.value.length)
    db.value.widgets.existingWidgets.push(...newWidgetsList.value)

  if (publish) {
    if (review.status === 'draft') {
      for (const [key, value] of Object.entries(tempWidgetValues)) {
        const widget = reviewWidgets.find(w => w.id === key)!
        if (widget.data.some(d => d._date === review.startDate)) {
          widget.data.find(d => d._date === review.startDate)!.value = value
        }
        else {
          widget.data.push({
            _date: review.startDate,
            _user: 1,
            value,
          })
        }
      }
      review.status = 'in-progress'
    }
    else if (review.status === 'in-progress') { review.status = 'completed' }
  }
  navigateTo({ name: 'workspaceSlug-folderSlug' })
}

const moveStatusButtonText = computed(() => {
  if (review.status === 'draft')
    return 'Notify reviewers'
  else // if (review.status === 'in-progress')
    return 'Finalize review'
})

const hasPermissionToMoveStatus = computed(() => {
  return currentUser.value?.role === 'admin' || review.status === 'in-progress'
})

const moveStatusButtonIcon = computed(() => {
  if (review.status === 'draft')
    return 'pi pi-send'
  else // if (review.status === 'in-progress')
    return 'pi pi-check-circle'
})
</script>

<template>
  <div>
    <div>
      <h2 class="text-xl mb-6">
        <i class="pi pi-check mr-2" />
        Review: {{ review.slug }}
      </h2>
      <div>Date: {{ review.startDate }}</div>

      <div v-if="review.status === 'draft'">
        <Card
          v-for="widget in [...reviewWidgets, ...newWidgetsList]"
          :key="widget.id"
          class="mt-4"
        >
          <template #content>
            <InputText v-model="widget.title" :disabled="widget.disabled" />
            <Accordion class="mt-2">
              <AccordionTab header="PQL query config">
                <InputText :model-value="`${widget.disabled ? `pql: ${widget.title.toLowerCase().replaceAll(' ', '-')};` : ''}`" :disabled="widget.disabled" />
              </AccordionTab>
            </Accordion>
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
        <Menu id="overlay_menu" ref="widgetMenu" :model="widgetMenuItems" :popup="true">
          <template #submenuheader="{ item }">
            <div class="text-primary font-bold border-b">
              {{ item.label }}
            </div>
          </template>
        </Menu>
        <hr class="mt-8">
      </div>
      <div v-else class="mt-6 flex">
        <div
          v-for="widget in reviewWidgets"
          :key="widget.id"
          class="flex flex-col w-48 bg-gray-100 dark:bg-gray-700 p-6 mr-3"
        >
          <label :for="widget.id" class="text-sm">{{ widget.title }}</label>
          <InputText
            :model-value="getWidgetData(widget.id)?.value"
            :disabled="review.status === 'completed'"
            class="text-3xl mt-3"
            @update:model-value="(v) => updateWidgetValue(widget.id, v)"
          />
        </div>
      </div>
    </div>

    <template v-if="review.status !== 'completed'">
      <Button label="Save" class="mt-8" icon="pi pi-save" severity="secondary" @click="save(false)" />
      <Button v-if="hasPermissionToMoveStatus" :label="moveStatusButtonText" class="mt-8 ml-2" :icon="moveStatusButtonIcon" @click="save()" />
    </template>
  </div>
</template>
