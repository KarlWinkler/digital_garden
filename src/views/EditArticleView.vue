<script setup lang="ts">
import { watch, ref } from 'vue'
import { useRoute } from 'vue-router'
import { type Post } from '@/types'
import { marked } from 'marked'
import DOMPurify from 'dompurify'

const route = useRoute()
const post = ref<Post | null>(null)
const preview = ref<boolean>(false)

fetch(`http://localhost:8008/api/post/${route.params.slug}`)
  .then((res) => res.json())
  .then((data) => (post.value = data))

watch(
  () => route.params.slug,
  (newSlug) => {
    console.log('FETCH')
    fetch(`http://localhost:8008/api/post/${newSlug}`)
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
</script>

<template>
  <div class="container">
    <div v-if="post" class="content">
      <h1>{{ post.title }}</h1>

      <div class="metadata">
        <p>status: {{ post.status }}</p>
        <p>created: {{ new Date(post.created_at).toLocaleString() }}</p>
        <p>updated: {{ new Date(post.updated_at).toLocaleString() }}</p>
        <p>summary: {{ post.summary }}</p>
      </div>

      <div v-if="preview">
        <div class="document" v-html="DOMPurify.sanitize(renderedMarkdown() as string)"></div>
      </div>
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
</style>
