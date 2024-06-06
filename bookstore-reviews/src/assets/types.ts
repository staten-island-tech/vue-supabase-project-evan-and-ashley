export type SessionData = {
  isLoggedIn: boolean | undefined
  user: {
    id: string
    email: string | undefined
    username: string | undefined
  }
}

export type Book = {
  key: string
  title: string
  description: string
  covers: string[]
}

export type Review = {
  id: number
  book: string
  user: string
  rating: number
  comment: string
  username: string
}

export type ReviewCommentBook = {
  rating: number
  comment: string
  username: string
}

export type ReviewCommentHome = {
  book_id: number
  id: string
  length: number
  book_title: string
  rating: string
  comment: string
}
