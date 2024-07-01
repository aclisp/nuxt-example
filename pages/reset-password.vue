<script setup lang="ts">
import { object, string, type InferType } from 'yup'
import type { FormSubmitEvent } from '#ui/types'

const schema = object({
  email: string()
    .email('Invalid email')
    .required('Required'),
  captcha: string()
    .matches(/^[1-9][0-9]{5}$/, '输入格式不对')
    .required('Required'),
  imgid: string(),
})
type Schema = InferType<typeof schema>
const { data: captcha } = await useFetch('/api/generate-captcha')
const state = reactive({
  email: undefined,
  captcha: undefined,
  imgid: captcha.value?.imgid,
})
const toast = useToast()
async function onSubmit(event: FormSubmitEvent<Schema>) {
  const { ok, msg } = await $fetch('/api/reset-password', { method: 'POST', body: event.data })
  let timeout, callback
  if (ok) {
    timeout = 4000
    callback = () => {
      navigateTo('/login')
    }
  }
  toast.add({
    description: msg,
    color: ok ? 'primary' : 'red',
    timeout, callback,
  })
}
</script>

<template>
  <UContainer class="flex max-w-xs h-[calc(100vh-10rem)]">
    <UForm :schema="schema" :state="state" class="w-full my-auto space-y-4" @submit="onSubmit">
      <MySection>重置密码</MySection>
      <UFormGroup label="Email" name="email">
        <UInput v-model="state.email" autocomplete="on" />
      </UFormGroup>
      <UFormGroup label="请输入图中的验证码" name="captcha">
        <UInput v-model="state.captcha" autocomplete="off" />
        <template #hint>
          <img :src="`data:image/png;base64,${captcha?.img}`">
        </template>
      </UFormGroup>
      <UInput v-model="state.imgid" type="hidden" name="imgid" />
      <UButton type="submit">
        Reset Password
      </UButton>
    </UForm>
  </UContainer>
</template>
