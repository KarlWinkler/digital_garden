<script setup lang="ts">
import { ref } from 'vue'
import { type PostComment } from '@/types'
import { API_URL } from '@/environment'

const comments = ref<PostComment[]>([])

fetch(`${API_URL}/api/post/comment/all`)
  .then((res) => res.json())
  .then((data) => (comments.value = data))
</script>

<template>
  <div class="container">
    <div class="comment-container" v-for="comment in comments" :key="comment.id">
      <RouterLink :to="`article/${comment.post_slug}`">{{ comment.post_title }}</RouterLink>
      <p class="username">{{ comment.username }}</p>
      <p class="content">{{ comment.content }}</p>
    </div>
  </div>
</template>

<style scoped lang="css">
.comment-container {
  width: var(--full-width);

  border: var(--border-width-small) solid black;
  border-radius: var(--border-radius-small);

  padding: var(--spacing-6);
  margin: var(--spacing-7);
}

.username {
  color: var(--color-midground);
}
</style>
