<script setup lang="ts">
import { type PropType } from 'vue'
import { type Post } from '../types.ts'
import { marked } from 'marked'
import DOMPurify from 'dompurify'

const props = defineProps({
  post: {
    type: Object as PropType<Post>,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
})

const renderedMarkdown = () => {
  if (props.post) {
    return marked.parse(props.content)
  }

  return ''
}
</script>

<template>
  <div v-if="post" class="content">
    <div class="metadata">
      <p>status: {{ post.status }}</p>
      <p>created: {{ new Date(post.created_at).toLocaleString() }}</p>
      <p>updated: {{ new Date(post.updated_at).toLocaleString() }}</p>
      <p>summary: {{ post.summary }}</p>
    </div>

    <div class="document" v-html="DOMPurify.sanitize(renderedMarkdown() as string)"></div>
  </div>
</template>

<style lang="css" scoped>
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
