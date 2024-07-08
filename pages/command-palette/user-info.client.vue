<script setup lang="ts">
import { readMe, updateUser } from '@directus/sdk'
import { object, string, type InferType } from 'yup'
import type { FormSubmitEvent } from '#ui/types'
import { MyYesNoDialog } from '#components'

definePageMeta({ middleware: 'auth' })

const schema = object({
  name: string()
    .min(2, 'Must be at least 2 characters')
    .required('Required'),
  title: string(),
  location: string(),
  avatar: string(),
})

type Schema = InferType<typeof schema>

const modal = useModal()
const directus = useDirectus()
const toast = useToast()

const token = await directus.getToken()

const user = await directus.request(readMe({
  fields: ['*', 'role.name'],
}))

const state = reactive({
  name: user.first_name ?? undefined,
  title: user.title ?? undefined,
  location: user.location ?? undefined,
  avatar: user.avatar ?? undefined,
})

const ts = ref(Date.now())
const avatar = computed(() => {
  return fileIdToURL(state.avatar, token, ts.value)
})

const { login, resetLogin } = useLogin()
watchEffect(() => {
  login.value = { isLoggedIn: true, name: state.name, avatar: avatar.value }
})

async function logout() {
  modal.open(MyYesNoDialog, {
    text: 'Do you really want to logout?',
    onNo() { modal.close() },
    async onYes() {
      modal.close()
      await directus.logout()
      resetLogin()
      await navigateTo('/login', { replace: true })
    },
  })
}

const { fileError, onFileChanged } = useFileInput({
  userId: user.id,
  fileTitle: 'Avatar',
  maxFileSize: 200000,
  acceptedFileTypes: ['image/png', 'image/jpeg'],
  onFileUploaded(fileId) {
    state.avatar = fileId
    ts.value = Date.now()
  },
})

const loading = ref(false)

async function onSubmit(event: FormSubmitEvent<Schema>) {
  loading.value = true
  await directus.request(updateUser(user.id, {
    first_name: event.data.name,
    title: event.data.title,
    location: event.data.location,
    avatar: event.data.avatar,
  }))
  toast.add({
    description: '个人资料已更新',
    color: 'primary',
    timeout: 1000,
  })
  loading.value = false
}
</script>

<template>
  <UContainer>
    <MySection>您已登录</MySection>
    <UForm :schema="schema" :state="state" @submit="onSubmit">
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <UFormGroup label="Email">
          <UInput disabled :value="user.email" icon="i-heroicons-envelope" />
        </UFormGroup>
        <UFormGroup label="Name" name="name">
          <UInput v-model="state.name" icon="i-heroicons-user-circle" />
        </UFormGroup>
        <UFormGroup label="Title" name="title">
          <UInput v-model="state.title" icon="i-heroicons-academic-cap" />
        </UFormGroup>
        <UFormGroup label="Location" name="location">
          <UInput v-model="state.location" icon="i-heroicons-map-pin" />
        </UFormGroup>
        <UFormGroup label="Avatar" :error="fileError">
          <img v-if="avatar" class="max-h-40 mb-1" :src="avatar">
          <UInput type="file" icon="i-heroicons-folder" accept="image/png, image/jpeg" @change="onFileChanged" />
          <UInput v-model="state.avatar" type="hidden" name="avatar" />
        </UFormGroup>
        <UFormGroup label="Role">
          <UInput disabled :value="user.role.name" icon="i-heroicons-user-group" />
        </UFormGroup>
        <UFormGroup label="Status">
          <UInput disabled :value="user.status" icon="i-heroicons-flag" />
        </UFormGroup>
      </div>
      <UButton :loading="loading" type="submit" icon="i-heroicons-check" class="mt-4">
        Save
      </UButton>
    </UForm>
    <MySection class="mt-4">
      更多操作
    </MySection>
    <UButton icon="i-heroicons-arrow-left-start-on-rectangle" @click="logout">
      Logout
    </UButton>
  </UContainer>
</template>
