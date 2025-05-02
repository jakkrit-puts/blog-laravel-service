<script setup lang="ts">
import dayjs from 'dayjs'
import { Calendar } from 'lucide-vue-next'


interface Blog {
    _id: string
    title: string
    image: string
    content: string
    slug: string
    publishedAt: string
    blogcategories?: { title: string }
}

// mock blogs data
const blogs: Blog[] = [
    {
        _id: '1',
        title: 'How to build a blog in Nuxt 3',
        content: `Lorem, ipsum dolor sit amet consectetur adipisicing elit. Optio fugit odit aliquid placeat
        eos quo tempore, beatae itaque nesciunt eius harum ipsam error rem, eveniet, nulla
        cupiditate exercitationem tempora. Asperiores.`,
        image: "https://picsum.photos/id/237/500/500",
        slug: 'nuxt3-blog',
        publishedAt: '2024-04-15',
        blogcategories: { title: 'Lifestyle' }
    },
    {
        _id: '2',
        title: 'Exploring Composition API',
        content: `Lorem, ipsum dolor sit amet consectetur adipisicing elit. Optio fugit odit aliquid placeat
        eos quo tempore, beatae itaque nesciunt eius harum ipsam error rem, eveniet, nulla
        cupiditate exercitationem tempora. Asperiores.`,
        image: "https://picsum.photos/id/237/500/500",
        slug: "Test001",
        publishedAt: '2024-04-10',
        blogcategories: { title: 'Tech' }
    },
    {
        _id: '3',
        title: 'Exploring Composition API',
        content: `Lorem, ipsum dolor sit amet consectetur adipisicing elit. Optio fugit odit aliquid placeat
        eos quo tempore, beatae itaque nesciunt eius harum ipsam error rem, eveniet, nulla
        cupiditate exercitationem tempora. Asperiores.`,
        image: "https://picsum.photos/id/237/500/500",
        slug: "Test001",
        publishedAt: '2024-04-10',
        blogcategories: { title: 'Tech' }
    },
    {
        _id: '4',
        title: 'Exploring Composition API',
        content: `Lorem, ipsum dolor sit amet consectetur adipisicing elit. Optio fugit odit aliquid placeat
        eos quo tempore, beatae itaque nesciunt eius harum ipsam error rem, eveniet, nulla
        cupiditate exercitationem tempora. Asperiores.`,
        image: "https://picsum.photos/id/237/500/500",
        slug: "Test001",
        publishedAt: '2024-04-10',
        blogcategories: { title: 'Tech' }
    },
    {
        _id: '5',
        title: 'Exploring Composition API',
        content: `Lorem, ipsum dolor sit amet consectetur adipisicing elit. Optio fugit odit aliquid placeat
        eos quo tempore, beatae itaque nesciunt eius harum ipsam error rem, eveniet, nulla
        cupiditate exercitationem tempora. Asperiores.`,
        image: "https://picsum.photos/id/237/500/500",
        slug: "Tes001",
        publishedAt: '2024-04-10',
        blogcategories: { title: 'Tech' }
    }, {
        _id: '6',
        title: 'Exploring Composition API',
        content: `Lorem, ipsum dolor sit amet consectetur adipisicing elit. Optio fugit odit aliquid placeat
        eos quo tempore, beatae itaque nesciunt eius harum ipsam error rem, eveniet, nulla
        cupiditate exercitationem tempora. Asperiores.`,
        image: "https://picsum.photos/id/237/500/500",
        slug: "Test-001",
        publishedAt: '2024-04-10',
        blogcategories: { title: 'Tech' }
    }
]
</script>

<template>
    <div class="mb-10 lg:mb-20">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mt-5">
            <div v-for="item in blogs" :key="item._id" class="rounded-lg overflow-hidden">
                <NuxtImg :src="item.image" class="w-full object-cover" alt="image blog" quality="80" loading="lazy" />
                <div class="bg-blog_light_bg/70 p-5">
                    <div class="text-xs flex items-center gap-5">
                        <div class="flex items-center relative group cursor-pointer">
                            <p class="font-semibold text-blog_dark_green tracking-wider">
                                {{ item?.blogcategories?.title }}
                            </p>
                            <span
                                class="absolute left-0 -bottom-1.5 bg-lightColor/30 inline-block w-full h-[2px] group-hover:bg-blog_dark_green " />
                        </div>
                        <p
                            class="flex items-center gap-1 text-lightColor relative group hover:cursor-pointer hover:text-blog_dark_green ">
                            <Calendar :size="15"/>
                            {{ dayjs(item?.publishedAt).format('MMMM D, YYYY') }}
                            <span
                                class="absolute left-0 -bottom-1.5 bg-lightColor/30 inline-block w-full h-[2px] group-hover:bg-blog_dark_green " />
                        </p>
                    </div>
                    <NuxtLink 
                        :to="{ name: 'blogs-slug', params: { slug: item?.slug } }"
                        class="text-base font-semibold tracking-wide mt-5 line-clamp-2 hover:text-blog_dark_green">
                        {{ item?.title }}
                        <p class="line-clamp-2 font-normal hover:text-gray-700">
                            {{ item?.content }}
                        </p>
                    </NuxtLink>
                </div>
            </div>
        </div>
    </div>
</template>
