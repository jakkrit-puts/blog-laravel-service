<template>
  <div className="bg-white/70 py-5 border-b sticky top-0 z-50 backdrop-blur-md">
    <AppContainer class="flex items-center justify-between text-lightColor">
        <div className="w-auto md:w-1/3 flex item-center justify-start gap-2.5 md:gap-0">
            <LogoSite />
        </div>
        <!-- <div className="w-auto md:w-1/3 flex items-center justify-end gap-5">
          
        </div> -->
      </AppContainer>
  </div>
</template>

<script lang="ts" setup>
import LogoSite from '@/components/LogoSite.vue'
import AppContainer from '@/components/AppContainer.vue'
</script>

<style>

</style>