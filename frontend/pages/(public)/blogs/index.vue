<template>
  <AppContainer class="py-8">
    <div v-if="pending">
      <LoadingData msg="Data Loading..." />
    </div>
    <div v-else-if="error">
      <LoadingData msg="เกิดข้อผิดพลาด !!!" />
    </div>
    <div v-else>
      <BlogList :blogs="blogs" />
    </div>
  </AppContainer>
</template>

<script lang="ts" setup>
import BlogList from '@/components/BlogList.vue'
import AppContainer from '@/components/AppContainer.vue'

const { getBlogs } = useBlogs()
const { data: blogs, pending, error } = await useAsyncData('blogs-public', () => getBlogs())
</script>

<style></style>