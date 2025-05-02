<template>
    <div>
        <div ref="editor" class="min-h-[300px] h-[400px] w-full max-w-full border border-gray-300 bg-white" />
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, defineEmits, defineProps } from 'vue'
const editor = ref<HTMLElement | null>(null)
const quillInstance = ref()

const props = defineProps<{ modelValue: string }>()
const emit = defineEmits(['update:modelValue'])

onMounted(async () => {
    const Quill = (await import('quill')).default
    quillInstance.value = new Quill(editor.value!, {
        theme: 'snow',
        placeholder: ' เขียนเนื้อหาที่นี่...',
        modules: {
            toolbar: [
                [{ 'font': [] }, { 'size': ['small', false, 'large', 'huge'] }],
                [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
                ['bold', 'italic', 'underline', 'strike'],
                [{ 'color': [] }, { 'background': [] }],
                [{ 'script': 'sub' }, { 'script': 'super' }],
                [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                [{ 'indent': '-1' }, { 'indent': '+1' }],
                [{ 'align': [] }],
                ['blockquote', 'code-block'],
                ['link', 'image', 'video'],
                ['clean']
            ]
        }
    })

    quillInstance.value.root.innerHTML = props.modelValue || ''
    quillInstance.value.on('text-change', () => {
        const html = quillInstance.value.root.innerHTML
        emit('update:modelValue', html)
    })
})

watch(() => props.modelValue, (newValue) => {
    if (quillInstance.value && quillInstance.value.root.innerHTML !== newValue) {
        quillInstance.value.root.innerHTML = newValue || ''
    }
})
</script>

<style>
@import "quill/dist/quill.snow.css";
</style>