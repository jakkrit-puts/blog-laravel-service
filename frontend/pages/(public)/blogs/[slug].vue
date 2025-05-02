<!-- eslint-disable vue/no-v-html -->
<template>
  <AppContainer :key="slug as string" class="py-8" >
    <h1 class="text-3xl font-bold pb-2">{{ blogs?.title }}</h1>
    <div class="flex items-center gap-4">
      <p class="text-gray-600">Published: {{  dayjs(blogs?.created_at).format('DD-MM-YYYY') }}</p>
      <Badge>{{ blogs?.user?.name }}</Badge>
    </div>
    <div class="mt-14">
      <div v-if="blogs?.content" v-html="blogs?.content" />
    </div>
  </AppContainer>
</template> 

<script lang="ts" setup>
import { Badge } from '@/components/ui/badge'
import dayjs from 'dayjs';

const route = useRoute();
const slug = route.params.slug;
const { getBlog } = useBlogs()

const { data: blogs } = await useAsyncData(`blogs-${slug}`, () => getBlog(slug as string))

onBeforeRouteUpdate((to, from, next) => {
  refreshNuxtData('blogs')
  next()
})
</script>

<style></style>