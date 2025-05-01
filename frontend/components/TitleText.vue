<template>
    <h2 :class="cn('text-2xl font-bold text-shop_dark_green capitalize tracking-wide font-sans', className)">
        <slot />
    </h2>
</template>

<script setup lang="ts">
import { cn } from '@/lib/utils'

defineProps<{
    className?: string
}>()
</script>

<style></style>