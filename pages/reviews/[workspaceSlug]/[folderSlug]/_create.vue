<script setup lang="ts">
import type {
  ExistingWidgetType,
  ReviewType,
} from '~/composables/use-database'

const route = useRoute('reviews-workspaceSlug-folderSlug-_create')
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
  navigateTo({
    name: 'reviews-workspaceSlug-folderSlug',
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

function addWidget(widget: ExistingWidgetType, isExistingWidget: boolean) {
  if (isExistingWidget) {
    review.value.schema.push({
      widgetId: widget.id,
    })
    widgetList.value.push({ ...widget, disabled: true })
  }
  else {
    const newWidget = createNewWidget(widget.widgetTypeId, widget.title)
    review.value.schema.push({
      widgetId: newWidget.id,
    })
    widgetList.value.push(newWidget)
    db.value.widgets.existingWidgets.push(...widgetList.value)
  }
}

const widgetMenu = ref()
function toggle(e: Event) {
  widgetMenu.value.toggle(e)
}

const widgetMenuItems = computed(() => [{
  label: 'Empty widgets',
  items: db.value.widgets.widgetTypes.map(w => ({
    label: w.title,
    command: () => addWidget(w, false),
  })),
}, {
  label: 'Existing widgets',
  items: db.value.widgets.existingWidgets.filter((w) => {
    return !review.value.schema.some(s => s.widgetId === w.id)
  }).map(w => ({
    label: w.title,
    command: () => addWidget(w, true),
  })),
}])
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
        <InputText v-model="widget.title" :disabled="widget.disabled" />
        <Accordion class="mt-2">
          <AccordionTab header="PQL query config">
            <InputText :model-value="`pql:${widget.title.toLowerCase()}; dont-know-how-this-will-look`" :disabled="true" />
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
    <Divider />
    <Button label="Create" icon="pi pi-save" @click="createReview" />
  </div>
</template>
