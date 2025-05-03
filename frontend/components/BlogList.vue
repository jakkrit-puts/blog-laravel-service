<template>
    <div v-if="blogs" class="mb-10 lg:mb-20" >
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mt-5">
            <div v-for="item in blogs" :key="item.id" class="rounded-lg overflow-hidden">
                <NuxtImg 
                    :src="item.image" 
                    class="w-full h-60 object-cover transition-transform duration-300 ease-in-out transform hover:scale-105 hover:brightness-110" alt="image blog" quality="80"
                    loading="lazy" 
                />
                <div class="bg-blog_light_bg/70 p-5">
                    <div class="text-xs flex items-center gap-5">
                        <div class="flex items-center relative group cursor-pointer">
                            <p class="font-semibold text-blog_dark_green tracking-wider">
                                {{ item?.user?.name }}
                            </p>
                            <span
                                class="absolute left-0 -bottom-1.5 bg-lightColor/30 inline-block w-full h-[2px] group-hover:bg-blog_dark_green " />
                        </div>
                        <p
                            class="flex items-center gap-1 text-lightColor relative group hover:cursor-pointer hover:text-blog_dark_green ">
                            <Calendar :size="15" />
                            {{ dayjs(item?.created_at).format('MMMM D, YYYY') }}
                            <span
                                class="absolute left-0 -bottom-1.5 bg-lightColor/30 inline-block w-full h-[2px] group-hover:bg-blog_dark_green " />
                        </p>
                    </div>
                    <NuxtLink 
                        :to="{ name: 'blogs-slug', params: { slug: item?.slug } }"
                        class="text-base font-semibold tracking-wide mt-5 line-clamp-2 hover:text-blog_dark_green">
                        {{ item?.title }}
                        <!-- <p class="line-clamp-2 font-normal hover:text-gray-700">
                            {{ item?.content }}
                        </p> -->
                    </NuxtLink>
                </div>
            </div>
        </div>
    </div>
</template>


<script setup lang="ts">
import dayjs from 'dayjs'
import { Calendar } from 'lucide-vue-next'
import type { IBlogResponse } from './admin/BlogsItemTable.vue';

defineProps<{
    blogs: Array<IBlogResponse>,
}>()
</script>
