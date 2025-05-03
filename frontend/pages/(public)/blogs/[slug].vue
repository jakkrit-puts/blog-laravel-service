<!-- eslint-disable vue/no-v-html -->
<template>
  <AppContainer :key="slug as string" class="py-6">

    <nav class="text-sm text-gray-500 mb-4 pb-2">
      <ul class="flex items-center text-base font-bold space-x-2">
        <li>
          <NuxtLink to="/" class="hover:underline ">Home</NuxtLink>
        </li>
        <li>/</li>
        <li>
          <NuxtLink to="/blogs" class="hover:underline">Blog</NuxtLink>
        </li>
        <li>/</li>
        <li class="text-gray-700 font-semibold truncate max-w-[200px]">{{ blogs?.title }}</li>
      </ul>
    </nav>

    <div v-if="blogs?.image" class="mb-6">
      <NuxtImg :src="blogs?.image" alt="cover image" class="w-full max-h-[400px] object-cover" loading="lazy" />
    </div>

    <h1 class="text-3xl font-bold pb-2">{{ blogs?.title }}</h1>
    <div class="flex items-center justify-between gap-4 border-b pb-2">
      <div class="flex items-center gap-2">
        <p class="text-gray-600 pr-2">Published: {{ dayjs(blogs?.created_at).format('DD-MM-YYYY') }}</p>
        <User /> <Badge>{{ blogs?.user?.name }}</Badge>
      </div>
      <div>
        <Badge>
         <Pin /> {{ blogs?.blog_type.toUpperCase() }}
        </Badge>
      </div>
    </div>
    <div class="mt-14">
      <div v-if="blogs?.content" v-html="blogs?.content" />
    </div>
  </AppContainer>
</template>

<script lang="ts" setup>
import { Badge } from '@/components/ui/badge'
import dayjs from 'dayjs';
import { User, Pin } from 'lucide-vue-next'


const route = useRoute();
const slug = route.params.slug;
const { getBlog } = useBlogs()

const { data: blogs } = await useAsyncData(`blogs-${slug}`, () => getBlog(slug as string))

useHead(() => ({
  title: blogs?.value?.title || 'บทความ',
  meta: [
    { name: 'description', content: blogs?.value?.description || 'บทความจาก Jakkrit DEV' },
    { property: 'og:title', content: blogs?.value?.title || 'บทความ' },
    { property: 'og:description', content: blogs?.value?.description || 'บทความจาก Jakkrit DEV' },
    { property: 'og:image', content: blogs?.value?.image || '/og-default.jpg' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: blogs?.value?.title },
    { name: 'twitter:description', content: blogs?.value?.description },
    { name: 'twitter:image', content: blogs?.value?.image }
  ]
}))

onBeforeRouteUpdate((to, from, next) => {
  refreshNuxtData('blogs')
  next()
})
</script>

<style></style>