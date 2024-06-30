<script setup lang="ts">
const { data } = await useFetch('/api/hello')
const src = `data:image/png;base64,${data.value?.png}`
</script>

<template>
  <UContainer>
    <div>Installation</div>
    <img :src="src">
  </UContainer>
</template>
