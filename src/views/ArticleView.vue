<script setup lang="ts">
import { watch, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { type Post } from '@/types'
import { marked } from 'marked'
import DOMPurify from 'dompurify'
import { API_URL } from '@/environment'
import { store } from '@/store'

const route = useRoute()
const router = useRouter()
const post = ref<Post | null>(null)

fetch(`${API_URL}/api/post/${route.params.slug}`)
  .then((res) => res.json())
  .then((data) => (post.value = data))

watch(
  () => route.params.slug,
  (newSlug) => {
    console.log('FETCH')
    fetch(`${API_URL}/api/post/${newSlug}`)
      .then((res) => res.json())
      .then((data) => (post.value = data))
  },
)

const renderedMarkdown = () => {
  if (post.value) {
    return marked.parse(post.value.content)
  }

  return ''
}

const edit = () => router.push({ path: `/article/${route.params.slug}/edit` })
</script>

<template>
  <div class="container">
    <div v-if="post" class="content">
      <button v-if="store.user?.is_superuser" @click="edit">Edit</button>
      <h1>{{ post.title }}</h1>

      <div class="metadata">
        <p>status: {{ post.status }}</p>
        <p>created: {{ new Date(post.created_at).toLocaleString() }}</p>
        <p>updated: {{ new Date(post.updated_at).toLocaleString() }}</p>
        <p>summary: {{ post.summary }}</p>
      </div>

      <div class="document" v-html="DOMPurify.sanitize(renderedMarkdown() as string)"></div>
    </div>
  </div>
</template>

<style>
.container {
  display: flex;

  align-items: center;

  flex-direction: column;
}

.content {
  max-width: 680px;
}

.metadata {
  color: #aaa;
}

.metadata p {
  margin: 0;
}

.document {
  width: 680px;
}

@media screen and (max-width: 720px) {
  .content {
    max-width: 250px;
  }

  .document {
    width: 250px;
  }
}
</style>
