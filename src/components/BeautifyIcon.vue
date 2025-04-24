<script setup lang="ts">
import FlowerSvg from '@/assets/flower-svg.vue'
import FlowerHoverSvg from '@/assets/flower-hover-svg.vue'
import LeafSvg from '@/assets/leaf-svg.vue'
import LeafHoverSvg from '@/assets/leaf-hover-svg.vue'

defineProps({
  status: {
    type: String,
    required: true,
  },
  hover: {
    type: Boolean,
    required: false,
  },
  iclass: {
    type: String,
    required: false,
  },
})
</script>

<template>
  <FlowerSvg v-if="status == 'Flower' && !hover" :class="iclass" />
  <FlowerHoverSvg v-if="status == 'Flower' && hover" :class="iclass" />
  <LeafSvg v-else-if="status == 'Sprout' && !hover" :class="iclass" />
  <LeafHoverSvg v-if="status == 'Sprout' && hover" :class="iclass" />
</template>
