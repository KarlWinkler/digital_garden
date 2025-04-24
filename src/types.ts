export type Post = {
  id: number
  title: string
  status: string
  created_at: string
  updated_at: string
  likes: number
  slug: string
  summary: string
  content: string
}

export type Category = {
  name: string
  posts: Post[]
}
