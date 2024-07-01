<script setup lang="ts">
import { readMe } from '@directus/sdk'

definePageMeta({ middleware: 'auth' })

const token = await directus.getToken()

const data = await directus.request(readMe({
  fields: ['*', 'role.name'],
}))

const avatar = fileIdToURL(data.avatar, token)
const login = useLogin()
login.value = { isLoggedIn: true, name: data.first_name, avatar }

async function logout() {
  await directus.logout()
  login.value = { isLoggedIn: false, name: '', avatar: '' }
  await navigateTo('/login', { replace: true })
}
</script>

<template>
  <UContainer>
    <MySection>您已登录</MySection>
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <UFormGroup label="Email">
        <UInput :value="data.email" icon="i-heroicons-envelope" />
      </UFormGroup>
      <UFormGroup label="Name">
        <UInput :value="data.first_name" icon="i-heroicons-user-circle" />
      </UFormGroup>
      <UFormGroup label="Title">
        <UInput :value="data.title" icon="i-heroicons-academic-cap" />
      </UFormGroup>
      <UFormGroup label="Location">
        <UInput :value="data.location" icon="i-heroicons-map-pin" />
      </UFormGroup>
      <UFormGroup label="Avatar">
        <img class="w-1/2" :src="avatar">
      </UFormGroup>
      <UFormGroup label="Role">
        <UInput :value="data.role.name" icon="i-heroicons-user-group" />
      </UFormGroup>
      <UFormGroup label="Status">
        <UInput :value="data.status" icon="i-heroicons-check" />
      </UFormGroup>
    </div>
    <MySection class="mt-4">
      更多操作
    </MySection>
    <UButton icon="i-heroicons-arrow-right-end-on-rectangle" @click="logout">
      Logout
    </UButton>
  </UContainer>
</template>
