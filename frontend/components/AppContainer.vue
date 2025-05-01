<template>
  <div :class="cn('max-w-screen-xl mx-auto px-4', className)">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { cn } from '@/lib/utils'

defineProps<{
  className?: string
}>()
</script>

<style></style>