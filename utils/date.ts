import type { FolderType } from "~/app.vue"

export function getStartDate(folder: FolderType) {
  let startDate = new Date().toISOString().substring(0, 10)

  const existing = folder.reviews.filter(review => review.startDate.startsWith(startDate)).length
  if (existing > 0) {
    startDate += `-${existing + 1}`
  }

  return startDate
}

