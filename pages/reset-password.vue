<script setup lang="ts">
import { object, string, type InferType } from 'yup'
import type { FormSubmitEvent } from '#ui/types'
import { MySuccessDialog } from '#components'

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
const state: Schema = reactive({
  email: '',
  captcha: '',
  imgid: '',
})
const { data: captcha, refresh: refreshCaptcha } = await useFetch('/api/generate-captcha')
watchEffect(() => {
  state.imgid = captcha.value?.imgid
})
const toast = useToast()
const modal = useModal()
const loading = ref(false)
async function onSubmit(event: FormSubmitEvent<Schema>) {
  loading.value = true
  const { ok, msg } = await $fetch('/api/reset-password', { method: 'POST', body: event.data })
  refreshCaptcha()
  loading.value = false
  if (ok) {
    modal.open(MySuccessDialog, {
      preventClose: true,
      text: msg,
      async onOk() {
        modal.close()
        await navigateTo('/login')
      },
    })
    return
  }
  toast.add({
    description: msg,
    color: 'red',
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
          <img :src="`data:image/png;base64,${captcha?.img}`" @click="() => refreshCaptcha()">
        </template>
      </UFormGroup>
      <UInput v-model="state.imgid" type="hidden" name="imgid" />
      <UButton type="submit" :loading="loading">
        Reset Password
      </UButton>
    </UForm>
  </UContainer>
</template>
