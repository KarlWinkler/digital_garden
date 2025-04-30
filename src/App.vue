<script setup lang="ts">
import { RouterView } from 'vue-router'
import HeaderComponent from '@/components/HeaderComponent.vue'
</script>

<template>
  <header>
    <HeaderComponent />
  </header>

  <div>
    <RouterView />
  </div>

  <footer></footer>
</template>

<style>
footer {
  height: 64px;
}
</style>
