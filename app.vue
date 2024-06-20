<script setup lang="ts">
const topMenus = [
  [{
    label: '邮件引擎 (Email Engine) ',
    icon: 'i-heroicons-home',
    to: '/',
  }],
  [{
    label: '浏览我的邮件',
    icon: 'i-heroicons-chart-bar',
    to: '/materials',
  }],
  [{
    label: '设置中心',
    icon: 'i-heroicons-cog',
    to: '/command-palette',
  }],
]
</script>

<template>
  <UContainer>
    <MyHeader :links="topMenus" />
    <NuxtPage />
  </UContainer>
</template>
