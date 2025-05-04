<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import PostItem from '@/components/PostItem.vue'
import { type Post } from '@/types'
import { API_URL } from '@/environment'
import { store } from '@/store'

type Category = {
  name: string
  posts: Post[]
}

const router = useRouter()
const categories = ref<Category[]>([])

fetch(`${API_URL}/api/post/`)
  .then((res) => res.json())
  .then((data) => (categories.value = data))
</script>

<template>
  <button v-if="store.user?.is_superuser" @click="router.push({ path: `/article/create` })">
    new
  </button>
  <div class="garden-chart">
    <li v-for="category in categories" :key="category.name" class="garden-plant">
      <div class="garden-post">
        <li v-for="post in category.posts" :key="post.title" class="post-item">
          <PostItem :post="post" />
        </li>
      </div>
      <div class="home-category-name">
        <p :title="category.name">
          {{ category.name.substring(0, 16) }}
        </p>
      </div>
    </li>
  </div>
</template>

<style>
.garden-chart {
  display: flex;

  padding: 24px;
}

.garden-plant {
  display: grid;

  grid-template-rows: 1fr 1fr;

  justify-items: center;
}

.garden-post {
  align-self: self-end;
  justify-self: center;

  padding: 12px;
}

.home-category-name {
  align-self: self-start;

  width: min-content;
}

.home-category-name > p {
  height: fit-content;
}

li:has(.home-post) + li:has(.home-post) .home-post {
  margin-top: -2px;
}
</style>
