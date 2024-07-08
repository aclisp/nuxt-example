<script setup lang="ts">
import { object, string, type InferType } from 'yup'
import type { FormSubmitEvent } from '#ui/types'

const schema = object({
  email: string().email('Invalid email').required('Required'),
  password: string()
    .min(6, 'Must be at least 6 characters')
    .required('Required'),
})

type Schema = InferType<typeof schema>

const state = reactive({
  email: undefined,
  password: undefined,
})

const toast = useToast()
const directus = useDirectus()
const route = useRoute()

const loading = ref(false)

async function onSubmit(event: FormSubmitEvent<Schema>) {
  loading.value = true
  const { email, password } = event.data
  let redirect = route.query.redirect as string
  if (!redirect) redirect = '/'

  try {
    await directus.login(email, password)
    await navigateTo(redirect, { replace: true })
  }
  catch (error) {
    toast.add({
      title: 'Login Error',
      description: directusErrorMessage(error),
      color: 'red',
    })
  }
  loading.value = false
}
</script>

<template>
  <UContainer class="flex max-w-xs h-[calc(100vh-10rem)]">
    <UForm :schema="schema" :state="state" class="w-full my-auto space-y-4" @submit="onSubmit">
      <MySection>请先登录</MySection>
      <UFormGroup label="Email" name="email">
        <UInput v-model="state.email" autocomplete="on" />
      </UFormGroup>
      <UFormGroup label="Password" name="password">
        <UInput v-model="state.password" type="password" autocomplete="on" />
      </UFormGroup>
      <UButton type="submit" :loading="loading">
        Login
      </UButton>
      <div class="flex justify-between">
        <ULink to="/register" class="hover:underline text-primary">
          注册账号
        </ULink>
        <ULink to="/reset-password" class="hover:underline text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200">
          忘记密码
        </ULink>
      </div>
    </UForm>
  </UContainer>
</template>
