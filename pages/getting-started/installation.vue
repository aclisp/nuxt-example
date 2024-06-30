<script setup lang="ts">
const { data } = await useFetch('/api/hello')
const png = `data:image/png;base64,${data.value?.png}`
const captcha = `data:image/png;base64,${data.value?.captcha}`
</script>

<template>
  <UContainer>
    <img :src="png">
    <div>{{ data?.hello }}</div>
    <img :src="captcha">
  </UContainer>
</template>
