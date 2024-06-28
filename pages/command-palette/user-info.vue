<script setup lang="ts">
import { readMe } from '@directus/sdk'

definePageMeta({
  middleware: 'auth',
})

const token = await directus.getToken()

const data = await directus.request(readMe({
  fields: ['*', 'role.name'],
}))
</script>

<template>
  <UContainer>
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
        <NuxtImg height="12rem" :src="`${fileIdToURL(data.avatar, token)}`" />
      </UFormGroup>
      <UFormGroup label="Role">
        <UInput :value="data.role.name" icon="i-heroicons-user-group" />
      </UFormGroup>
      <UFormGroup label="Status">
        <UInput :value="data.status" icon="i-heroicons-check" />
      </UFormGroup>
    </div>
  </UContainer>
</template>
