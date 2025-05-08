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
  top_level_comments: Comment[]
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
  email: string
  is_superuser: boolean
  groups: Group[]
}

export type Comment = {
  id: number
  user: {
    username: string
  }
  content: string
  created_at: string
  children: Comment[]
}

export type PostComment = {
  id: number
  username: string
  content: string
  created_at: string
  post_slug: string
  post_title: string
}
