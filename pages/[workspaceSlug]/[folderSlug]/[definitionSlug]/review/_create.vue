<script setup lang="ts">
const reviewDate = "2021-01-01";

const route = useRoute(
  "workspaceSlug-folderSlug-definitionSlug-review-_create"
);
const router = useRouter();

const db = useState("db");

const workspace = db.value.workspaces.find(
  (workspace) => workspace.slug === route.params.workspaceSlug
);
const definition = workspace.folders
  .find((folder) => folder.slug === route.params.folderSlug)
  .reviewDefinitions.sort((a, b) => b.version - a.version)
  .find((definition) => definition.slug === route.params.definitionSlug);

const value = ref<Record<string, number>>({});

async function createReview() {
  definition.reviews.push({
    slug: `${definition.slug}-${reviewDate}-${(Math.random() + 1).toString(36).substring(7)}`,
    date: reviewDate,
    values: value,
  });

  await router.push({ name: "workspaceSlug-folderSlug-definitionSlug" });
}
</script>

<template>
  <div class="flex flex-col">
    <div>
      <div>
        <p>Review date:</p>
        <InputText v-model="reviewDate" type="date" class="w-52 mb-3" />
      </div>

      <template v-for="field in definition.schema">
        <div>
          <p>{{ field.title }}:</p>
          <InputText
            v-model="value[field.id]"
            type="number"
            class="w-52 mb-3"
          />
        </div>
      </template>
      <Button @click="createReview" label="Create" />
    </div>
  </div>
</template>
