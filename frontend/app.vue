<template>
  <NuxtLayout>
    <NuxtPage />
    <Toaster position="top-right" rich-colors close-button />
  </NuxtLayout>
</template>

<script setup>
import { Toaster } from 'vue-sonner'
</script>