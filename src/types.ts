export type Post = {
  id: number
  title: string
  status: string
  created_at: string
  updated_at: string
  likes: number
  slug: string
  description: string
}

export type Category = {
  name: string
  posts: Post[]
}
