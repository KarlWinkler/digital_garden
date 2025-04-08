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
  <div class="home-post" :title="post.title">
    <a :href="'/article/' + post.slug"></a>
  </div>
</template>

<style>
.home-post {
  width: 25px;
  height: 25px;

  border: 2px solid black;
}
</style>
