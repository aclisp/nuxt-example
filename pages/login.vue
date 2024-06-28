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

const route = useRoute()

async function onSubmit(event: FormSubmitEvent<Schema>) {
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
}
</script>

<template>
  <UContainer class="flex max-w-xs h-[calc(100vh-10rem)]">
    <UForm :schema="schema" :state="state" class="w-full my-auto space-y-4" @submit="onSubmit">
      <UFormGroup label="Email" name="email">
        <UInput v-model="state.email" />
      </UFormGroup>
      <UFormGroup label="Password" name="password">
        <UInput v-model="state.password" type="password" />
      </UFormGroup>
      <UButton type="submit">
        Submit
      </UButton>
    </UForm>
  </UContainer>
</template>
