<template>
  <AppContainer class="py-8" >
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
import LoadingData from '@/components/LoadingData.vue'

const start = performance.now()

const { getBlogs } = useBlogs()
const { data: blogs, pending, error } = await useAsyncData('blogs-public', () => getBlogs(), {
  server: false 
})

const end = performance.now()
console.log(`API Response Time: ${Math.round(end - start)} ms`)

</script>

<style></style>