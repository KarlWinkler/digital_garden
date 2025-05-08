<script setup lang="ts">
import { useRouter } from 'vue-router'
import { store } from '@/store'

const router = useRouter()

console.log(store.user)
if (!store.user) {
  router.push({ path: '/' })
}
</script>

<template>
  <div class="container">
    <RouterLink to="/comments-feed" v-if="store.user!.is_superuser">Comments</RouterLink>
    <p>{{ store.user!.username }}</p>
    <p>{{ store.user!.email }}</p>
  </div>
</template>

<style>
.profile-container {
  padding: var(--spacing-4);
}
</style>
