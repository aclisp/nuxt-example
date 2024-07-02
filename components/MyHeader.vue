<script setup lang="ts">
defineOptions({
  inheritAttrs: false,
})

const title = useTitle()
const open = ref(false)
const icon = computed(() => {
  return open.value ? 'i-heroicons-x-mark-20-solid' : 'i-heroicons-bars-3-20-solid'
})
</script>

<template>
  <div class="z-50 sticky top-0">
    <!-- mobile screens -->
    <div class="flex sm:hidden justify-between items-center mb-4 h-12 bg-white border-b border-gray-200 dark:border-gray-800 dark:bg-gray-900">
      <img class="w-8 h-8" src="/favicon.ico">
      <span>{{ title }}</span>
      <UPopover v-model:open="open" :popper="{ offsetDistance: 8 }">
        <UButton variant="link" :icon="icon" />
        <template #panel>
          <div class="p-2">
            <UVerticalNavigation v-bind="$attrs" />
          </div>
        </template>
      </UPopover>
    </div>
    <!-- desktop screens -->
    <UHorizontalNavigation class="hidden sm:flex mb-4 h-12 bg-white border-b border-gray-200 dark:border-gray-800 dark:bg-gray-900" v-bind="$attrs" />
  </div>
</template>
