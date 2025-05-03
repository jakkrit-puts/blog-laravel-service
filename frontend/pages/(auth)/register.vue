<template>
  <div class="fixed inset-0 flex items-center justify-center bg-gray-100 overflow-hidden">
    <Card class="w-[90vw] max-w-sm p-4 space-y-3">
      <CardHeader class="flex flex-col items-center">
        <CardTitle class="text-lg">Register</CardTitle>
        <CardDescription class="text-sm">สมัครสมาชิก (for User)</CardDescription>
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
          <FormField v-slot="{ componentField }" name="name">
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Name" v-bind="componentField" />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
          <Button type="submit" class="w-full">Register</Button>
        </form>
        <div class="flex items-center justify-center gap-2 mt-3 max-md:text-sm">
          <span>มีบัญชีผู้ใช้แล้ว </span>
          <NuxtLink to="/login" class="flex items-center hover:underline gap-2">
            <ArrowRight size="16" /> เช้าสู่ระบบ
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

const { register } = useAuth()

const formSchema = toTypedSchema(z.object({
  email: z.string()
    .min(1, { message: "กรุณากรอกอีเมล" })
    .email({ message: "อีเมลไม่ถูกต้อง" }),
  password: z.string()
    .min(1, { message: "กรุณากรอกรหัสผ่าน" })
    .min(8, { message: "รหัสผ่านต้องมีอย่างน้อย 8 ตัวอักษร" }),
  name: z.string()
    .min(1, { message: "กรุณากรอกชื่อ-นามสกุล" })
}))

const { handleSubmit, resetForm } = useForm({
  validationSchema: formSchema,
})

const onSubmit = handleSubmit(async (values) => {
  try {
    await register(values)
    resetForm()
  } catch (err) {
    alert(err?.error)
  }
})

</script>
