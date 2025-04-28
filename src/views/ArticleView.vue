<script setup lang="ts">
import { watch, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { type Post } from '@/types'
import { API_URL } from '@/environment'
import { store } from '@/store'
import ArticleContent from '@/components/ArticleContent.vue'

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

const edit = () => router.push({ path: `/article/${route.params.slug}/edit` })
</script>

<template>
  <div class="container">
    <div v-if="post" class="content">
      <button v-if="store.user?.is_superuser" @click="edit">Edit</button>
      <h1>{{ post.title }}</h1>

      <ArticleContent :post="post" />
    </div>
  </div>
</template>

<style>
.container {
  display: flex;

  align-items: center;

  flex-direction: column;
}
</style>
