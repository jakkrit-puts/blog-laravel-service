<script setup lang="ts">
import { cn } from '@/lib/utils'

defineProps<{
  className?: string
  spanDesign?: string
}>()
</script>

<template>
  <NuxtLink
   to="/blogs" 
   :class="cn(
    'text-2xl text-blog_btn_dark_green font-black tracking-wider uppercase hover:text-blog_light_green group',
    className
  )">
    <span class="text-blog_light_green group-hover:text-blog_dark_green">JAKKRIT</span> DEV
    <!-- <span :class="cn(' text-blog_light_green group-hover:text-blog_dark_green', spanDesign)">
      er
    </span> -->
  </NuxtLink>
</template>
