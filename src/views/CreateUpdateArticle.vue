<script setup lang="ts">
import { watch, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { type Post } from '@/types'
import ArticleContent from '@/components/ArticleContent.vue'
import { store } from '@/store'
import { getCookie } from '@/helpers'
import { API_URL } from '@/environment'

const route = useRoute()
const router = useRouter()

const post = ref<Post | null>(null)
const preview = ref<boolean>(false)

if (!store.user?.is_superuser) {
  router.push({ path: `/article/${route.params.slug}` })
}

fetch(`${API_URL}/api/post/${route.params.slug}`)
  .then((res) => res.json())
  .then((data) => {
    post.value = data
  })

watch(
  () => route.params.slug,
  (newSlug) => {
    console.log('FETCH')
    fetch(`${API_URL}/api/post/${newSlug}`)
      .then((res) => res.json())
      .then((data) => (post.value = data))
  },
)

const updateContent = (e: Event) => {
  const target = e.target as HTMLInputElement
  if (post.value) {
    post.value.content = target.value
  }
}

const updateStatus = (e: Event) => {
  const target = e.target as HTMLInputElement
  if (post.value) {
    post.value.status = target.value
  }
}

const updateSummary = (e: Event) => {
  const target = e.target as HTMLInputElement
  if (post.value) {
    post.value.summary = target.value
  }
}

const savePost = () => {
  const csrfToken = getCookie('csrftoken')

  if (csrfToken) {
    fetch(`${API_URL}/api/post/${post.value?.id}`, {
      method: 'PUT',
      body: JSON.stringify({
        status: post.value?.status,
        summary: post.value?.summary,
        content: post.value?.content,
      }),
      credentials: 'include',
      headers: {
        'X-CSRFToken': csrfToken,
      },
    }).then(() => router.push({ path: `/article/${post.value?.slug}` }))
  }
}
</script>

<template>
  <div class="container">
    <div v-if="post" class="content">
      <h1>{{ post.title }}</h1>
      <button @click="preview = !preview">{{ preview ? 'Preview' : 'Edit' }}</button>

      <div v-if="preview">
        <div class="metadata-form">
          <p>
            status:
            <select :value="post.status" @change="updateStatus">
              <option value="Seed">Seed</option>
              <option value="Sprout">Sprout</option>
              <option value="Flower">Flower</option>
            </select>
          </p>
          <p>created: {{ new Date(post.created_at).toLocaleString() }}</p>
          <p>updated: {{ new Date(post.updated_at).toLocaleString() }}</p>
          <p>summary: <input type="text" :defaultValue="post.summary" @change="updateSummary" /></p>
        </div>

        <textarea :defaultValue="post.content" class="document-form" @change="updateContent" />

        <button @click="savePost">Save</button>
      </div>
      <div v-else>
        <ArticleContent :post="post" :content="post.content" />
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

.metadata-form p {
  margin: 0;
}

.document-form {
  width: 680px;
  height: fit-content;
  field-sizing: content;

  background-color: transparent;

  padding: 4px;
  margin: 16px 0;
}
</style>
