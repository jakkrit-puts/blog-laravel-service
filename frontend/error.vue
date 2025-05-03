<template>
  <div class="flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-10 md:py-32">
    <div class="max-w-md w-full space-y-8">
      <div class="text-center">
        <LogoSite />

        <h2 class="mt-6 text-3xl font-extrabold text-gray-900">
          Looking for something?
        </h2>
        <p class="mt-2 text-sm text-gray-600">
          We&apos;re sorry. The Web address you entered is not a functioning
          page on our site.
        </p>
      </div>
      <div class="mt-8 space-y-6">
        <div class="space-y-4">
          <NuxtLink 
            href="/"
            class="flex items-center justify-center px-4 py-2 border border-transparent text-sm font-semibold rounded-md bg-gray-400  text-white hover:underline">
            Go to blog page
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

</script>