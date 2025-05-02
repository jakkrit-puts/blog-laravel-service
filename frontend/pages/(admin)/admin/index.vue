<template>
   <AppContainer class="py-8">
    <div class="flex items-center justify-between pb-4">
      <h1 class="text-xl font-bold pb-2">Blog List</h1>
      <Button @click="handleToCreateBlog()">
       <Plus />  Add
      </Button>
    </div>
    <div>
      <AdminBlogsItemTable />
    </div>
  </AppContainer>
</template>

<script lang="ts" setup>
import Button from '~/components/ui/button/Button.vue';
import { Plus } from 'lucide-vue-next'
import { useRouter } from "vue-router";

definePageMeta({
  layout: 'admin'
})

const router = useRouter()

const handleToCreateBlog = () => {
  router.push("/admin/blogs/create");
}
</script>
