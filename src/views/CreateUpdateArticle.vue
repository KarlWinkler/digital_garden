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

const createEdit = route.fullPath.split('/').pop()
console.log(route.fullPath)

if (!store.user?.is_superuser) {
  router.push({ path: `/article/${route.params.slug}` })
}

watch(store, (newStore) => {
  if (!newStore.user) {
    router.push({ path: `/article/${route.params.slug}` })
  }
})

if (createEdit === 'edit') {
  fetch(`${API_URL}/api/post/${route.params.slug}`)
    .then((res) => res.json())
    .then((data) => (post.value = data))
} else {
  post.value = {
    title: '',
    status: 'Seed',
    created_at: '',
    updated_at: '',
    likes: 0,
    summary: '',
    content: '',
    category: {
      name: '',
    },
    top_level_comments: [],
  }
}

const updateTitle = (e: Event) => {
  const target = e.target as HTMLInputElement
  if (post.value) {
    post.value.title = target.value
  }
}

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

const updateCategory = (e: Event) => {
  const target = e.target as HTMLInputElement
  if (post.value) {
    post.value.category.name = target.value
  }
}

const savePost = () => {
  const csrfToken = getCookie('csrftoken')

  const requestData = JSON.stringify({
    title: post.value?.title,
    status: post.value?.status,
    summary: post.value?.summary,
    content: post.value?.content,
    category: post.value?.category.name,
  })

  if (csrfToken) {
    if (createEdit === 'edit') {
      fetch(`${API_URL}/api/post/${post.value?.id}`, {
        method: 'PUT',
        body: requestData,
        credentials: 'include',
        headers: {
          'X-CSRFToken': csrfToken,
        },
      })
        .then((res) => {
          if (!res.ok) {
            return Promise.reject(res)
          }
        })
        .then(() => router.push({ path: `/article/${post.value?.slug}` }))
        .catch(() => 'Failed to Save')
    } else if (createEdit === 'create') {
      fetch(`${API_URL}/api/post/`, {
        method: 'POST',
        body: requestData,
        credentials: 'include',
        headers: {
          'X-CSRFToken': csrfToken,
        },
      })
        .then((res) => {
          if (!res.ok) {
            return Promise.reject(res)
          }
        })
        .then(() => router.push({ path: `/` }))
        .catch(() => 'Failed to Save')
    }
  }
}
</script>

<template>
  <div class="container">
    <div v-if="post" class="content">
      <div class="action-buttons">
        <button @click="preview = !preview">{{ preview ? 'Edit' : 'Preview' }}</button>
        <button @click="savePost">Save</button>
      </div>

      <div v-if="preview">
        <h1>{{ post.title }}</h1>
      </div>
      <div v-else>
        <input class="title-form" type="text" @change="updateTitle" :value="post.title" />
      </div>

      <div v-if="!preview">
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
          <p>
            category:
            <input type="text" :defaultValue="post.category.name" @change="updateCategory" />
          </p>
        </div>

        <textarea :defaultValue="post.content" class="document-form" @change="updateContent" />
      </div>
      <div v-else>
        <ArticleContent :post="post" :content="post.content" />
      </div>
    </div>
  </div>
</template>

<style>
.action-buttons {
  display: grid;

  width: 200px;
}

.container {
  display: flex;

  align-items: center;

  flex-direction: column;
}

.title-form {
  font-size: 32px;

  margin: 24px 0;
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

@media screen and (max-width: 680px) {
  .content {
    max-width: 97%;
    justify-content: flex-start;
  }

  .title-form {
    max-width: 97%;
  }

  .document-form {
    width: 97%;
  }
}
</style>
