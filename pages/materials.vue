<script setup lang="ts">
const menus = [
  {
    label: '数据总览',
    icon: 'i-heroicons-chart-pie',
    to: '/materials/overview',
  },
  {
    label: '发送记录',
    icon: 'i-heroicons-shopping-bag',
    to: '/materials/sending-records',
  },
  {
    label: '邮箱列表',
    icon: 'i-heroicons-clipboard-document-list',
    to: '/materials/mailbox-maintain',
  },
  {
    label: '地址管理',
    icon: 'i-heroicons-book-open',
    to: '/materials/address-book',
  },
]

// for (let i = 0; i < 20; i++) {
//   menus.push({
//     label: `测试菜单 ${i}`,
//     icon: 'i-heroicons-face-smile',
//     to: '',
//   })
// }
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
