<script setup>
import Header from '@/components/partials/Header.vue'
import Footer from '@/components/partials/Footer.vue'
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <Header />
    <main class="flex-1">
      <slot />
    </main>
    <Footer />
  </div>
</template>