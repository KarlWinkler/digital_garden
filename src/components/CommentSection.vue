<script setup lang="ts">
import { type PropType } from 'vue'
import { useRoute } from 'vue-router'
import { store } from '@/store'
import { type Comment } from '@/types'
import CommentComponent from '@/components/CommentComponent.vue'
import NewComment from '@/components/NewComment.vue'

const route = useRoute()

defineProps({
  comments: {
    type: Object as PropType<Comment[]>,
    required: true,
  },
  postId: Number,
})
</script>

<template>
  <div class="comment-section">
    <h3 id="comment">Comments</h3>

    <NewComment v-if="store.user" button-name="+ Comment" />
    <div v-else>
      <p><a :href="`/login?path=${route.path}`">Log in</a> to comment</p>
    </div>

    <div class="comments" v-for="comment in comments" :key="comment.id">
      <CommentComponent :comment="comment" />
    </div>
  </div>
</template>

<style>
.comment-section {
  align-self: flex-start;
}

.comments {
  padding: 16px;
  margin: 6px;

  border-radius: 16px;
}

.comment .comment {
  padding: 12px;
  margin: 6px;

  border-left: 1px solid black;
}
</style>
