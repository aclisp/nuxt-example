<script lang="ts" setup>
defineProps({
  text: {
    type: String,
    default: 'Success.',
  },
})

const emit = defineEmits(['ok'])

function onOk() {
  emit('ok')
}
</script>

<template>
  <UModal>
    <UCard>
      <div class="space-y-4">
        <p>{{ text }}</p>
        <UButton @click="onOk">
          OK
        </UButton>
      </div>
    </UCard>
  </UModal>
</template>
