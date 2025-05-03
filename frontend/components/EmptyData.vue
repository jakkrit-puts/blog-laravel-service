<template>
    <div>
        <div class="flex flex-col items-center justify-center py-12 text-center text-gray-500">
            <InboxIcon class="w-12 h-12 mb-4 text-gray-400" />
            <p className="text-lg font-medium">{{ msg ? msg : "No Data..." }}</p>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { InboxIcon } from 'lucide-vue-next';

defineProps<{
    msg?: string,
}>()
</script>

<style></style>