<script setup lang="ts">
defineOptions({
  inheritAttrs: false,
})

const open = ref(false)
const icon = computed(() => {
  return open.value ? 'i-heroicons-chevron-left-20-solid' : 'i-heroicons-chevron-right-20-solid'
})
</script>

<template>
  <div class="z-50">
    <!-- mobile screens -->
    <div class="fixed sm:hidden left-0">
      <UPopover v-model:open="open">
        <UButton variant="link" :icon="icon" />
        <template #panel>
          <div class="p-2">
            <UVerticalNavigation class="overflow-y-auto h-96" v-bind="$attrs" />
          </div>
        </template>
      </UPopover>
    </div>
    <!-- desktop screens -->
    <UVerticalNavigation class="hidden sm:block flex-none overflow-y-auto h-[calc(100vh-8rem)] sticky top-16 w-40" v-bind="$attrs" />
  </div>
</template>
