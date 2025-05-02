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
            <p class="mb-2 font-semibold">Drag & drop image here</p>
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
        <div class="w-full">
          <ClientOnly>
            <TinymceEditor 
              v-model="content" 
              :init="{
              height: 400,
              plugins: 'image preview',
              automatic_uploads: true,
              images_upload_handler: convertBlobToFile,
              menu: {
                file: { title: 'File', items: 'newdocument restoredraft | preview | importword exportpdf exportword | print | deleteallconversations' },
                edit: { title: 'Edit', items: 'undo redo | cut copy paste pastetext | selectall | searchreplace' },
                view: { title: 'View', items: 'code revisionhistory | visualaid visualchars visualblocks | spellchecker | preview fullscreen | showcomments' },
                insert: { title: 'Insert', items: 'image link media addcomment pageembed codesample inserttable | math | charmap emoticons hr | pagebreak nonbreaking anchor tableofcontents | insertdatetime' },
                format: { title: 'Format', items: 'bold italic underline strikethrough superscript subscript codeformat | styles blocks fontfamily fontsize align lineheight | forecolor backcolor | language | removeformat' },
                tools: { title: 'Tools', items: 'spellchecker spellcheckerlanguage | a11ycheck code wordcount' },
                table: { title: 'Table', items: 'inserttable | cell row column | advtablesort | tableprops deletetable' },
                help: { title: 'Help', items: 'help' }
              },
              // plugins: 'link image code',
              toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | code | image preview code'
            }" :api-key="API_TINY" />
              <p v-if="uploadingImageEditor" class="text-yellow-600">Uploading...</p>
              <p v-if="uploadingImageEditorError" class="text-red-600">{{ uploadError }}</p>
              <p v-if="imagePathEditor" class="mt-2 text-sm text-blue-600 line-clamp-2">
                Last Image Uploaded: {{ imagePathEditor }}
              </p>
            </ClientOnly>
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

type TinyMCEBlobInfo = {
  blob: () => Blob
  filename: () => string
}

definePageMeta({
  layout: 'admin'
})

// get token จาก cookie
const { token } = useAuth()

//สำหรับ upload image
const imagePath = ref('')
const uploading = ref(false)
const uploadError = ref('')

const imagePathEditor = ref('')
const uploadingImageEditor = ref(false)
const uploadingImageEditorError = ref('')

const API_TINY = ref("20jetb7k870q5dc0orxzvx9nr1c60554bepy0qut43s7njw0")
const content = ref('')

const formSchema = toTypedSchema(z.object({
  title: z.string().min(2).max(255),
  image: z
    .instanceof(File, { message: 'No file selected or invalid file type' })
    .refine(file => file.size < 2 * 1024 * 1024, { message: 'File too large (max 2 MB)' })
    .refine(file => file.type.startsWith('image/'), { message: 'Only image files allowed' }),
}))

const { handleSubmit } = useForm({
  validationSchema: formSchema,
})

const { value: image, errorMessage } = useField<File>('image')

const convertBlobToFile = async (
  blobInfo: TinyMCEBlobInfo,
  success: (url: string) => void,
  failure: (errMsg: string) => void
) => {
  try {
    uploadingImageEditor.value = true
    uploadingImageEditorError.value = ''

    const file = blobInfo.blob() as File
    const uploadedPath = await uploadImageForEditor(file)

    if (uploadedPath) {
      console.log(uploadedPath);
      imagePathEditor.value = uploadedPath
      success(uploadedPath)
    } else {
      failure('Upload failed')
    }
  } catch (error) {
    uploadingImageEditorError.value = 'Upload failed'
    failure('Unexpected error:' + error)
  } finally {
    uploadingImageEditor.value = false
  }
}

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

const uploadImageForEditor = async (file: File): Promise<string | null> => {
  const formData = new FormData()
  formData.append('image', file)
  try {
    const response = await axios.post('http://localhost:8000/api/uploadImage', formData, {
      headers: { 'Content-Type': 'multipart/form-data', 'Authorization': `Bearer ${token.value}` },
    })

    return response.data.url
  } catch (e) {
    console.log(e);
    return null
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
    content: content.value
  }
  console.log('Submit Payload:', JSON.stringify(payloadCreateBlog))
})


</script>

<style scoped>
input[type='file'] {
  display: block;
  margin: 0 auto;
}
</style>