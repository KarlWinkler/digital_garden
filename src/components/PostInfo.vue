<script setup lang="ts">
import { type PropType } from 'vue'
import { type Post } from '../types.ts'

defineProps({
  post: {
    type: Object as PropType<Post>,
    required: true,
  },
})
</script>

<template>
  <div :class="`post-info-container ${post.slug}`">
    <p>{{ post.title }}</p>
  </div>
</template>

<style>
.post-info-container {
  position: absolute;
  display: none;

  background-color: white;

  width: max-content;

  border: var(--border-width-large) double black;
  padding: var(--spacing-9) var(--spacing-6);
}

.post-info-container p {
  margin: 0;
}
</style>
