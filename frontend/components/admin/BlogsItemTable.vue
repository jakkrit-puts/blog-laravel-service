<template>
  <Table>
    <TableHeader>
      <TableRow>
        <TableHead class="w-[100px]">
          #
        </TableHead>
        <TableHead class="w-[200px]">
          Title
        </TableHead>
        <TableHead class="w-[300px]">
          Description
        </TableHead>
        <TableHead class="w-[50]">
          Type
        </TableHead>
        <TableHead>Author</TableHead>
        <TableHead>Date</TableHead>
        <TableHead class="text-center">
          Action
        </TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      <TableRow v-for="item in blogs" :key="item.id">
        <TableCell class="font-medium">
          {{ item.id }}
        </TableCell>
        <TableCell class="font-medium">
          {{ item.title }}
        </TableCell>
        <TableCell>
          <p class="truncate w-72 max-md:w-12">
            {{ item.description }}
          </p>
        </TableCell>
        <TableCell class="font-medium">
          {{ item.blog_type }}
        </TableCell>
        <TableCell>{{ item.user.name }}</TableCell>
        <TableCell>{{ dayjs(item?.created_at).format('DD-MM-YYYY') }}</TableCell>
        <TableCell class="text-center">
          <div class="space-x-2">
            <Button class="bg-sky-700" size="icon"  @click="handleUpdate(item?.slug)">
              <Pen :size="20" />
            </Button>
            <Button class="bg-red-500" size="icon" @click="handleRemove(item?.id)" >
              <Trash2 :size="20" />
            </Button>
          </div>
        </TableCell>
      </TableRow>
    </TableBody>
  </Table>
</template>

<script setup lang="ts">
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Pen, Trash2 } from 'lucide-vue-next';
import dayjs from 'dayjs';
import { useRouter } from "vue-router";

export interface IBlogResponse {
  id: number;
  title: string;
  content: string;
  description: string;
  blog_type: string;
  slug: string;
  image: string;
  user_id: number;
  created_at: Date;
  updated_at: Date;
  user: User;
}

export interface User {
  name: string;
}

defineProps<{
  blogs: Array<IBlogResponse>,
}>()

const emit = defineEmits<{
  (e: 'refresh'): void
}>()

const { removeBlogs } = useBlogs()
const router = useRouter()


const handleRemove = async (id: number) => {
  await removeBlogs(id)
  emit('refresh')
}

const handleUpdate = async (slug: string) => {
  router.push({ path: '/admin/blogs/update', query: { slug: slug } })
}

</script>