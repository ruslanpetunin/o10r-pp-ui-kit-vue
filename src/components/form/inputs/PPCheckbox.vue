<template>
  <div class="checkbox-wrapper">
    <label class="checkbox-container">
      <input
        type="checkbox"
        class="checkbox-element"
        :checked="modelValue"
        @change="onChange"
      />
      <span class="checkbox-label">{{ label }}</span>
    </label>
    <div class="error-message">
      <span v-if="hasError">{{ error }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  modelValue: boolean;
  label: string;
  error?: string;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void;
}>();

const hasError = computed(() => !!props.error);

function onChange(event: Event) {
  const target = event.target as HTMLInputElement;
  emit('update:modelValue', target.checked);
}
</script>

<style scoped>
.checkbox-wrapper {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.checkbox-container {
  display: inline-flex;
  align-items: center;
  gap: var(--pp-gap-xs);
  cursor: pointer;
  user-select: none;
}

.checkbox-element {
  width: var(--pp-font-size-md);
  height: var(--pp-font-size-md);
  margin: 0;
  accent-color: var(--pp-primary-color);
}

.checkbox-label {
  font-size: var(--pp-font-size-md);
  color: var(--pp-text-color);
}

.error-message {
  margin-top: var(--pp-gap-xs);
  padding-left: var(--pp-gap-xs);
  font-size: var(--pp-font-size-xs);
  color: var(--pp-error-color);
}
</style>
