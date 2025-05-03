<template>
    <AppContainer class="py-8">
        <div class="flex items-center justify-between  border-b w-full ">
            <h1 class="text-xl font-bold pb-3">Edit Blog</h1>
            <Button variant="link" @click="goToBack()">
                <ArrowLeft />
            </Button>
        </div>
        <div class="mt-8">
            <form class="w-full space-y-6" @submit="onSubmit">
                <FormField v-slot="{ componentField }" name="title">
                    <FormItem>
                        <!-- <FormLabel>Title</FormLabel> -->
                        <h1 class="text-lg">หัวข้อเรื่อง</h1>
                        <FormControl>
                            <Input type="text" placeholder="Blog Title" v-bind="componentField" />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                </FormField>
                <FormField v-slot="{ componentField }" name="description">
                    <FormItem>
                        <!-- <FormLabel>Title</FormLabel> -->
                        <h1 class="text-lg">รายละเอียด</h1>
                        <FormControl>
                            <Input type="text" placeholder="Description" v-bind="componentField" />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                </FormField>
                <FormField v-slot="{ componentField }" name="blog_type">
                    <FormItem>
                        <!-- <FormLabel>Title</FormLabel> -->
                        <h1 class="text-lg">ประเภท</h1>
                        <FormControl>
                            <Input 
                                type="text" placeholder="Blog Type เช่น. Tech, Life, Sport"
                                v-bind="componentField" />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                </FormField>
                <div>
                    <h1 class="text-lg mb-4">รูปภาพ (Cover)</h1>
                    <div class="border-2 border-dashed rounded-md p-4 text-center" @dragover.prevent @drop="onDrop">
                        <p class="mb-2 font-semibold">Drag & drop image here</p>
                        <input type="file" accept="image/*" @change="onFileChange">
                        <p v-if="image && typeof image !== 'string'" class='mt-2 text-sm text-green-600 line-clamp-1'>{{
                            image.name }}</p>
                    </div>
                    <p v-if="errorMessage" class="mt-1 text-sm text-red-600">{{ errorMessage }}</p>
                    <p v-if="imagePath" class="mt-2 text-sm text-blue-600 line-clamp-2">
                        Image Uploaded: {{ imagePath }}
                    </p>
                    <p v-if="uploading" class="text-yellow-600">Uploading...</p>
                    <p v-if="uploadError" class="text-red-600">{{ uploadError }}</p>
                </div>
                <div class="w-full">
                    <h1 class="text-lg mb-4">Content</h1>
                    <QuillEditor v-model="content" />
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
    FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import QuillEditor from '~/components/QuillEditor.vue'
import { toTypedSchema } from '@vee-validate/zod'
import { ArrowLeft } from 'lucide-vue-next';
import { useForm, useField } from 'vee-validate'
import * as z from 'zod'
import axios from 'axios'
import { useRouter } from "vue-router";

definePageMeta({
    layout: 'admin'
})

// get token จาก cookie
const { token } = useAuth()
// composables
const { update, getBlog } = useBlogs()

const route = useRoute()
const router = useRouter()
const blogSlug = route.query.slug || ''


//สำหรับ upload image
const imagePath = ref('')
const uploading = ref(false)
const uploadError = ref('')
const content = ref('')
const blogId = ref<number | null>(null)



onMounted(async () => {
    if (!blogSlug) return

    if (blogSlug) {
        const data = await getBlog(blogSlug as string)
        if (data) {
            setFieldValue('title', data.title)
            setFieldValue('description', data.description)
            setFieldValue('blog_type', data.blog_type)
            setFieldValue('image', data.image)
            content.value = data.content
            blogId.value = data.id
        }
    }
})

const formSchema = toTypedSchema(z.object({
    title: z.string().min(2).max(255),
    description: z.string().min(2).max(255),
    blog_type: z.string().min(2).max(255),
    image: z.union([
        z.instanceof(File, { message: 'No file selected or invalid file type' })
            .refine(file => file.size < 2 * 1024 * 1024, { message: 'File too large (max 2 MB)' })
            .refine(file => file.type.startsWith('image/'), { message: 'Only image files allowed' }),
        z.string()
    ]).optional()
}))

const { handleSubmit, setFieldValue } = useForm({
    validationSchema: formSchema,
})

const { value: image, errorMessage } = useField<File | string>('image')

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

const onSubmit = handleSubmit(async (values) => {
    const payloadCreateBlog = {
        title: values.title,
        description: values.description,
        blog_type: values.blog_type,
        image: imagePath.value,
        content: content.value
    }
    try {
        await update(payloadCreateBlog, Number(blogId.value));
    } catch (err) {
        console.log(err);
    }
})

const goToBack = () => {
    router.push("/admin")
}
</script>

<style scoped>
input[type='file'] {
    display: block;
    margin: 0 auto;
}
</style>