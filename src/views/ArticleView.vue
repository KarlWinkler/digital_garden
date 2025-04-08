<script setup lang="ts">
import { watch, ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const content = ref('')

fetch(`/data/${route.params.slug}.json`)
  .then((res) => res.json())
  .then((data) => (content.value = data.content))

watch(
  () => route.params.slug,
  (newSlug, oldSlug) => {
    console.log('FETCH')
    fetch(`data/${newSlug}.json`)
      .then((res) => res.json())
      .then((data) => (content.value = data.content))
  },
)
</script>

<template>
  <p>The Article has the slug: {{ $route.params.slug }}</p>

  <div>
    {{ content }}
  </div>
</template>
