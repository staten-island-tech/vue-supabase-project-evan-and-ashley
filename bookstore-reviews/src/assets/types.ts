export type SessionData = {
  isLoggedIn: boolean | undefined
  user: {
    id: string
    email: string | undefined
    username: string | undefined
  }
}
