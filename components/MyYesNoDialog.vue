<script lang="ts" setup>
defineProps({
  text: {
    type: String,
    default: 'Are you sure?',
  },
})

const emit = defineEmits(['yes', 'no'])

function onYes() {
  emit('yes')
}

function onNo() {
  emit('no')
}
</script>

<template>
  <UModal>
    <UCard>
      <div class="space-y-4">
        <p>{{ text }}</p>
        <div class="space-x-4">
          <UButton @click="onYes">
            Yes
          </UButton>
          <UButton variant="outline" @click="onNo">
            No
          </UButton>
        </div>
      </div>
    </UCard>
  </UModal>
</template>
