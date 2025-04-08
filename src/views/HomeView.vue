<script setup lang="ts">
import { ref } from 'vue'
import FlowerIcon from '../assets/flower-svg.vue'

type Post = {
  id: number
  title: string
  status: string
  created_at: string
  updated_at: string
  likes: number
  slug: string
  description: string
}

type Category = {
  name: string
  posts: Post[]
}

const categories = ref<Category[]>([])

fetch('/data/posts.json')
  .then((res) => res.json())
  .then((data) => (categories.value = data.categories))
</script>

<template>
  <div class="garden-chart">
    <li v-for="category in categories" :key="category.name" class="garden-plant">
      <div class="garden-post">
        <li v-for="post in category.posts" :key="post.title">
          <div class="home-post" :title="post.title">
            <a :href="'/article/' + post.slug"></a>
          </div>
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
li {
  list-style-type: none;

  width: fit-content;
}

.garden-chart {
  display: flex;
}

.garden-plant {
  display: grid;

  grid-template-rows: 1fr 1fr;

  justify-content: center;

  gap: 12px;
}

.garden-post {
  align-self: self-end;
  justify-self: center;
}

.home-category-name {
  width: min-content;

  writing-mode: vertical-lr;

  transform: rotate(180deg);

  align-self: self-start;
}

.home-category-name > p {
  height: fit-content;
}

.home-post {
  width: 25px;
  height: 25px;

  border: 2px solid black;
}

li:has(.home-post) + li:has(.home-post) > .home-post {
  border-top: none;
}
</style>
