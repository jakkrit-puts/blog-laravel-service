<template>
  <div class="fixed inset-0 flex items-center justify-center bg-gray-100 overflow-hidden">
    <Card class="w-[90vw] max-w-sm p-4 space-y-3">
      <CardHeader class="flex flex-col items-center">
        <CardTitle class="text-lg">Login</CardTitle>
        <CardDescription class="text-sm">เข้าสู่ระบบ Admin</CardDescription>
      </CardHeader>
      <CardContent class="pb-4">
        <form class="space-y-3" @submit.prevent="onSubmit">
          <div class="space-y-1">
            <Label for="email">Email</Label>
            <Input id="email" v-model="form.email" type="email" required />
          </div>
          <div class="space-y-1">
            <Label for="password">Password</Label>
            <Input id="password" v-model="form.password" type="password" required />
          </div>
          <Button type="submit" class="w-full">Login</Button>
        </form>
      </CardContent>
    </Card>
  </div>
</template>

<script setup>
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
const { login } = useAuth()

const form = ref({
  email: '',
  password: ''
})

const onSubmit = async () => {
  try {
    await login(form.value)
  } catch (err) {
    alert(err?.error || 'Login failed.')
  }
}
</script>
