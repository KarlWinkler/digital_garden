<script setup lang="ts">
import { type PropType } from 'vue'
import { type Comment } from '@/types.ts'
import { store } from '@/store'
import NewComment from '@/components/NewComment.vue'

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
    <p class="name">{{ comment.user.username }}</p>
    <p class="date">
      {{
        new Date(comment.created_at).toLocaleString('en-us', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          hour12: false,
          minute: '2-digit',
        })
      }}
    </p>
    <p class="content">{{ comment.content }}</p>
    <NewComment button-name="Reply" v-if="store.user" :parent-id="comment.id" />
    <div v-for="comment in comment.children" :key="comment.id">
      <CommentComponent :comment="comment" />
    </div>
  </div>
</template>

<style>
.name {
  font-weight: 700;

  margin: 0;
}
.date {
  color: #aaa;

  font-size: 12px;
  font-weight: 200;

  margin: 0;
}

.content {
  margin: 10px 0;
}
</style>
