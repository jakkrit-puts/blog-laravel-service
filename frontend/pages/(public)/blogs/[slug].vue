<template>
  <AppContainer class="py-8">
    <h1 class="text-3xl font-bold pb-2">{{ "Blog 01" }}</h1>
    <div class="flex items-center gap-4">
      <p class="text-gray-600">Published: {{ "2024-11-01" }}</p>

      <Badge>Tech</Badge>

    </div>
    <div class="mt-4">
      Content
    </div>
  </AppContainer>
</template>

<script lang="ts" setup>
import { Badge } from '@/components/ui/badge'

const route = useRoute();
const slug = route.params.slug;

console.log({ slug });

</script>

<style></style>