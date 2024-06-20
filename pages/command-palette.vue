<script setup lang="ts">
const menus = [
  {
    label: '用户信息',
    icon: 'i-heroicons-user-circle',
    to: '/command-palette/user-info',
  },
  {
    label: '通用设置',
    icon: 'i-heroicons-cog-6-tooth',
    to: '/command-palette/general-settings',
  },
]
</script>

<template>
  <div>
    <div class="flex flex-row">
      <MyAsideMenu :links="menus" />
      <NuxtPage />
    </div>
    <MyFooter />
  </div>
</template>
