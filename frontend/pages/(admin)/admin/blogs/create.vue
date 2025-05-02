<template>
  <AppContainer class="py-8">
    <div class="flex items-center justify-between pb-4">
      <h1 class="text-xl font-bold pb-2">Add Blog</h1>
    </div>
    <div>
      <form class="w-full space-y-6" @submit="onSubmit">
        <FormField v-slot="{ componentField }" name="title">
          <FormItem>
            <FormLabel>Title</FormLabel>
            <FormControl>
              <Input type="text" placeholder="Blog Title" v-bind="componentField" />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
        <div>
          <div class="border-2 border-dashed rounded-md p-4 text-center" @dragover.prevent @drop="onDrop">
            <p class="mb-2">Drag & drop image here</p>
            <input type="file" accept="image/*" @change="onFileChange">
            <p v-if="image" class="mt-2 text-sm text-green-600 line-clamp-1">{{ image.name }}</p>
          </div>
          <p v-if="errorMessage" class="mt-1 text-sm text-red-600">{{ errorMessage }}</p>
          <p v-if="imagePath" class="mt-2 text-sm text-blue-600 line-clamp-2">
            Image Uploaded: {{ imagePath }}
          </p>
          <p v-if="uploading" class="text-yellow-600">Uploading...</p>
          <p v-if="uploadError" class="text-red-600">{{ uploadError }}</p>
        </div>
        <Button type="submit">
          Submit
        </Button>
      </form>
    </div>
  </AppContainer>
</template>

<script lang="ts" setup>
import { Button } from '@/components/ui/button'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { toTypedSchema } from '@vee-validate/zod'
import { useForm, useField } from 'vee-validate'
import * as z from 'zod'
import axios from 'axios'

definePageMeta({
  layout: 'admin'
})

// get token จาก cookie
const { token } = useAuth()

//สำหรับ upload image
const imagePath = ref('')
const uploading = ref(false)
const uploadError = ref('')

const formSchema = toTypedSchema(z.object({
  title: z.string().min(2).max(255),
  image: z
    .instanceof(File, { message: 'No file selected or invalid file type' })
    .refine(file => file.size < 2 * 1024 * 1024, { message: 'File too large (max 2 MB)' })
    .refine(file => file.type.startsWith('image/'), { message: 'Only image files allowed' })
}))

const { handleSubmit } = useForm({
  validationSchema: formSchema,
})

const { value: image, errorMessage } = useField<File>('image')

const uploadImage = async (file: File) => {
  const formData = new FormData()
  formData.append('image', file)

  uploading.value = true
  uploadError.value = ''

  try {
    const response = await axios.post('http://localhost:8000/api/uploadImage', formData, {
      headers: { 'Content-Type': 'multipart/form-data', 'Authorization': `Bearer ${token.value}` },
    })
    imagePath.value = response.data.path
  } catch (error) {
    uploadError.value = 'Upload failed'
    console.error(error)
  } finally {
    uploading.value = false
  }
}


const onDrop = async (event: DragEvent) => {
  event.preventDefault()
  const files = event.dataTransfer?.files
  if (files?.length) {
    const file = files[0]
    image.value = file
    await uploadImage(file)
  }
}

const onFileChange = async (e: Event) => {
  const files = (e.target as HTMLInputElement).files
  if (files?.length) {
    if (files?.length) {
      const file = files[0]
      image.value = file
      await uploadImage(file)
    }
  }
}

const onSubmit = handleSubmit((values) => {
  const payloadCreateBlog = {
    title: values.title,
    image: imagePath.value,
  }
  console.log('Submit Payload:', payloadCreateBlog)
})
</script>

<style scoped>
input[type='file'] {
  display: block;
  margin: 0 auto;
}
</style>