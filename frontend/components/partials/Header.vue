<template>
  <div className="bg-white/70 py-5 border-b sticky top-0 z-50 backdrop-blur-md">
    <AppContainer class="flex items-center justify-between text-lightColor">
      <div className="w-auto md:w-1/3 flex item-center justify-start gap-2.5 md:gap-0">
        <LogoSite class="max-md:text-xl" />
      </div>
      <div class="w-auto flex items-center justify-between">
        <div v-if="user" class="flex items-center gap-2">
          <span class="max-md:text-xs ">Hello: {{ user?.name }} </span>
         <div v-if="user?.role === 'admin'">
          <Button @click="handleToAdminDashbaord()">
            <User /> <span class="max-md:hidden">Dashboard</span>
          </Button>
         </div>
          <Button @click="logout()">
            <LogOut /> <span class="max-md:hidden">Logout</span>
          </Button>
        </div>
      </div>
    </AppContainer>
  </div>
</template>

<script setup>
import LogoSite from '@/components/LogoSite.vue'
import AppContainer from '@/components/AppContainer.vue'
import { LogOut, User } from 'lucide-vue-next'
import { useRouter } from "vue-router";

const { user, logout } = useAuth()
const router = useRouter()

const handleToAdminDashbaord = () => {
  router.push("/admin");
}

</script>

<style></style>