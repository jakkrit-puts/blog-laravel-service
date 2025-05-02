<template>
  <AppContainer class="py-8">
    <div class="flex items-center justify-between pb-4">
      <h1 class="text-xl font-bold pb-2">Blog List</h1>
      <Button @click="handleToCreateBlog()">
        <Plus /> Add
      </Button>
    </div>
    <div>
      <div v-if="pending">
         <LoadingData msg="Data Loading..." />
      </div>
      <div v-else-if="error">
        <LoadingData msg="เกิดข้อผิดพลาด !!!" />
      </div>
      <div v-else>
        <AdminBlogsItemTable :blogs="blogs" @refresh="refresh" />
      </div>
    </div>
  </AppContainer>
</template>

<script lang="ts" setup>
import Button from '~/components/ui/button/Button.vue';
import { Plus } from 'lucide-vue-next'
import { useRouter } from "vue-router";

const { getBlogs } = useBlogs()
const { data: blogs, pending, error, refresh } = await useAsyncData('blogs', () => getBlogs())

definePageMeta({
  layout: 'admin'
})

const router = useRouter()
const handleToCreateBlog = () => {
  router.push("/admin/blogs/create");
}


</script>
