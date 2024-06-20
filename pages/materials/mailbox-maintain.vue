<script setup lang="ts">
const items: string[] = []
for (let i = 0; i < 20; i++) {
  items.push(String(i))
}
</script>

<template>
  <UContainer>
    <div v-for="item in items" :key="item" class="w-32 h-32 bg-blue-200">
      {{ item }}
    </div>
  </UContainer>
</template>
