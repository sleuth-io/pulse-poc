import type { UserType } from "./use-database"

export default function() {
  const db = useDatabase()
  const currentUser = useState<UserType | null>("currentUser", () => db.value.users[0])

  const setCurrentUser = (user: UserType) => {
    currentUser.value = user
  }

  return { currentUser, setCurrentUser }
}
