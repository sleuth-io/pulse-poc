<script setup lang="ts">
const db = useDatabase()
const workspaceSlug = db.value.workspaces[0].slug
navigateTo({ name: 'workspaceSlug', params: { workspaceSlug } })
</script>
