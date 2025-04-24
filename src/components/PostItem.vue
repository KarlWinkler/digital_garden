<script setup lang="ts">
import { type PropType, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { type Post } from '../types.ts'
import BeautifyIcon from './BeautifyIcon.vue'
import PostInfo from './PostInfo.vue'

const props = defineProps({
  post: {
    type: Object as PropType<Post>,
    required: true,
  },
})

const hover = ref(false)

const hoverEffect = (e: MouseEvent) => {
  hover.value = true
  const mouseX = e.clientX
  const mouseY = e.clientY

  const prop = document.querySelector(`.post-info-container.${props.post.slug}`) as HTMLElement
  const parent = prop.closest('.home-post') as HTMLElement

  const parentX = parent.getBoundingClientRect().x
  const parentY = parent.getBoundingClientRect().y

  const posX = mouseX - parentX
  const posY = mouseY - parentY

  if (prop) {
    prop.style.top = `${posY}px`
    prop.style.left = `${posX}px`
    prop.style.display = 'inline'
  }
}
</script>

<template>
  <RouterLink :to="`/article/${post.slug}`">
    <div class="home-post" @mouseleave="hover = false" @mousemove="hoverEffect($event)">
      <BeautifyIcon :status="post.status" iclass="flower-left" v-bind="hover && { hover }" />
      <BeautifyIcon :status="post.status" iclass="flower-right" v-bind="hover && { hover }" />
      <PostInfo :post="post" v-if="hover" />
    </div>
  </RouterLink>
</template>

<style>
.home-post {
  position: relative;
  --svg-width: 48px;

  width: var(--svg-width);
  height: var(--svg-width);

  margin: 0 var(--svg-width);

  border: 2px solid black;
}

.home-post:hover {
  position: relative;
  background-color: aliceblue;
  transform: scale(1.1);

  transition: all 0.05s;

  z-index: 999;
}

.flower-left {
  position: absolute;

  top: -5px;
  left: calc(var(--svg-width) * -1 - 2px);

  height: auto;
  width: var(--svg-width);

  transform: scale(-1, 1);
}

.flower-right {
  position: absolute;

  top: -15px;
  right: calc(var(--svg-width) * -1 - 2px);

  height: auto;
  width: var(--svg-width);
}
</style>
