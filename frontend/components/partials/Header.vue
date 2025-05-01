<template>
  <div className="bg-white/70 py-5 border-b sticky top-0 z-50 backdrop-blur-md">
    <AppContainer class="flex items-center justify-between text-lightColor">
      <div className="w-auto md:w-1/3 flex item-center justify-start gap-2.5 md:gap-0">
        <LogoSite />
      </div>
      <div class="w-auto flex items-center justify-between">
        <div v-if="user" class="flex items-center gap-4">
          <span>Hello: {{ user?.name }} </span>
          <Button @click="logout()">
           <LogOut /> Logout
          </Button>
        </div>
      </div>
    </AppContainer>
  </div>
</template>

<script lang="ts" setup>
import LogoSite from '@/components/LogoSite.vue'
import AppContainer from '@/components/AppContainer.vue'
import { LogOut } from 'lucide-vue-next'

const { user, logout } = useAuth()
</script>

<style></style>