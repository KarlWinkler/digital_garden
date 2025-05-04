<script setup lang="ts">
import { type PropType } from 'vue'
import { type Post } from '../types.ts'
import { marked } from 'marked'
import DOMPurify from 'dompurify'
import { formatDate } from '@/helpers.ts'

const props = defineProps({
  post: {
    type: Object as PropType<Post>,
    required: true,
  },
})

const renderedMarkdown = () => {
  if (props.post) {
    return marked.parse(props.post.content)
  }

  return ''
}
</script>

<template>
  <div v-if="post" class="article-content">
    <div class="metadata">
      <p>status: {{ post.status }}</p>
      <p>created: {{ formatDate(post.created_at) }}</p>
      <p>updated: {{ formatDate(post.updated_at) }}</p>
      <p>summary: {{ post.summary }}</p>
    </div>

    <div class="document" v-html="DOMPurify.sanitize(renderedMarkdown() as string)"></div>
  </div>
</template>

<style lang="css">
.article-content {
  max-width: 680px;
}

.metadata {
  display: flex;

  color: var(--color-midground);

  font-size: 12px;

  gap: 12px;
}

.metadata p {
  margin: 0;
}

.document {
  width: 680px;
}

@media screen and (max-width: 680px) {
  .article-content {
    max-width: 100%;
    justify-content: flex-start;
  }

  .document code {
    text-wrap: wrap;
  }

  .document {
    width: 100%;
  }
}
</style>
