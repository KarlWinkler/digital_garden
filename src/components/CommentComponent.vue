<script setup lang="ts">
import { type PropType } from 'vue'
import { type Comment } from '@/types.ts'
import { store } from '@/store'
import NewComment from '@/components/NewComment.vue'
import { formatDateTime } from '@/helpers'

defineProps({
  comment: {
    type: Object as PropType<Comment>,
    required: true,
  },
  parentId: {
    type: Number,
    required: false,
    default: null,
  },
  postId: Number,
})
</script>

<template>
  <div class="comment">
    <p class="comment-name">{{ comment.user.username }}</p>
    <p class="comment-date">
      {{ formatDateTime(comment.created_at) }}
    </p>
    <p class="comment-content">{{ comment.content }}</p>
    <NewComment button-name="Reply" v-if="store.user" :parent-id="comment.id" />
    <div v-for="comment in comment.children" :key="comment.id">
      <CommentComponent :comment="comment" />
    </div>
  </div>
</template>

<style>
.comment-name {
  font-weight: 700;

  margin: 0;
}
.comment-date {
  color: var(--color-midground);

  font-size: var(--font-size-small);
  font-weight: 200;

  margin: 0;
}

.comment-content {
  margin: var(--spacing-7) 0;
}
</style>
