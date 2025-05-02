<template>
    <div className="flex flex-col items-center justify-center py-8 mt-2 gap-4 min-h-80 w-full">
        <div class="space-x-2 flex items-center">
            <Loader2 class="w-5 h-6 animate-spin text-shop_light_green" />
            <span class="text-center text-shop_light_green">{{ msg ? msg: "No Data" }}</span>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { Loader2 } from 'lucide-vue-next'

defineProps<{
  msg?: string,
}>()
</script>
