<template>
  <div class="fixed inset-0 flex items-center justify-center bg-gray-100 overflow-hidden">
    <Card class="w-[90vw] max-w-sm p-4 space-y-3">
      <CardHeader class="flex flex-col items-center">
        <CardTitle class="text-lg">Login</CardTitle>
        <CardDescription class="text-sm">เข้าสู่ระบบ</CardDescription>
      </CardHeader>
      <CardContent class="pb-4">
        <form class="space-y-3" @submit="onSubmit">
          <FormField v-slot="{ componentField }" name="email">
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="Email" v-bind="componentField" />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
          <FormField v-slot="{ componentField }" name="password">
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Password" v-bind="componentField" />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
          <Button type="submit" class="w-full">Login</Button>
        </form>
        <div class="flex items-center justify-center gap-2 mt-3">
          <span> ยังไม่มีบัญชีผู้ใช้ใช่หรือไม่ </span>
          <NuxtLink to="/register" class="flex items-center hover:underline gap-2">
            <ArrowRight size="16" /> สมัครสมาชิก
          </NuxtLink>
        </div>
      </CardContent>
    </Card>
  </div>
</template>

<script setup>
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { useForm } from 'vee-validate'
import * as z from 'zod'
import { ArrowRight } from 'lucide-vue-next';
import { toTypedSchema } from '@vee-validate/zod'

const { login } = useAuth()


const formSchema = toTypedSchema(z.object({
  email: z.string()
    .min(1, { message: "กรุณากรอกอีเมล" })
    .email({ message: "อีเมลไม่ถูกต้อง" }),
  password: z.string()
    .min(1, { message: "กรุณากรอกรหัสผ่าน" })
    .min(8, { message: "รหัสผ่านต้องมีอย่างน้อย 8 ตัวอักษร" })
}))

const { handleSubmit } = useForm({
  validationSchema: formSchema,
})

const onSubmit = handleSubmit(async (values) => {
  try {
    await login(values)
  } catch (err) {
    alert(err?.error)
  }
})
</script>
