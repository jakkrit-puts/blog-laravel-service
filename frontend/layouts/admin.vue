<template>
   <div class="flex flex-col min-h-screen">
    <Header />
    <main >
      <slot />
    </main>
  </div>
</template>

<script setup>
import Header from '@/components/partials/Header.vue'
// import Footer from '@/components/partials/Footer.vue'
</script>