<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  title: string
  value: string
  icon: string
  color: string
  delta: number | null
  deltaLabel?: string
}>()

const isUp = computed(() => (props.delta ?? 0) >= 0)
const deltaText = computed(() => {
  if (props.delta === null) return ''
  return `${isUp.value ? '+' : ''}${props.delta.toFixed(1)}%`
})
</script>

<template>
  <v-card class="pa-4" rounded="lg" elevation="2">
    <div class="d-flex align-center justify-space-between">
      <span class="text-medium-emphasis text-body-2">{{ title }}</span>
      <v-avatar :color="color" size="36" variant="tonal">
        <v-icon :icon="icon" size="20" />
      </v-avatar>
    </div>

    <div class="text-h4 font-weight-bold mt-3">{{ value }}</div>

    <div v-if="delta !== null" class="d-flex align-center mt-2">
      <v-icon
        :icon="isUp ? 'mdi-arrow-up' : 'mdi-arrow-down'"
        :color="isUp ? 'success' : 'error'"
        size="18"
      />
      <span :class="isUp ? 'text-success' : 'text-error'" class="text-body-2 font-weight-medium ml-1">
        {{ deltaText }}
      </span>
      <span class="text-medium-emphasis text-caption ml-2">{{ deltaLabel }}</span>
    </div>
  </v-card>
</template>
