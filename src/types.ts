export type Post = {
  id?: number
  title: string
  status: string
  created_at: string
  updated_at: string
  likes: number
  slug?: string
  summary: string
  content: string
  category: {
    name: string
  }
}

export type Category = {
  name: string
  posts: Post[]
}

export type Group = {
  name: string
}

export type User = {
  id: number
  username: string
  is_superuser: boolean
  groups: Group[]
}
