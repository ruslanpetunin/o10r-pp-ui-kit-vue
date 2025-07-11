<template>
  <div class="select-wrapper">
    <div :class="['select-container', { 'has-error': hasError }]">
      <label :for="id" :class="['floating-label', { active: isFocused || modelValue }]">
        {{ label }}
      </label>
      <select
        :id="id"
        class="select-element"
        :value="modelValue"
        @input="onInput"
        @focus="isFocused = true"
        @blur="isFocused = false"
      >
        <slot />
      </select>
    </div>
    <div class="error-message">
      <span v-if="hasError">{{ error }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

const props = defineProps<{
  modelValue: string | number;
  label: string;
  error?: string;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | number): void;
}>();

const id = `select-${Math.random().toString(36).substring(2, 10)}`;
const isFocused = ref(false);
const hasError = computed(() => !!props.error);

function onInput(event: Event) {
  const target = event.target as HTMLSelectElement;
  emit('update:modelValue', target.value);
}
</script>

<style scoped>
.select-wrapper {
  width: 100%;
  display: flex;
}

.select-container {
  width: 100%;
  position: relative;
  border: 1px solid var(--pp-secondary-light-color);
  background-color: transparent;
  border-radius: var(--pp-border-radius-md);
  padding: var(--pp-gap-md) var(--pp-gap-md) var(--pp-gap-sm) var(--pp-gap-md);
  transition: border-color 0.2s, background-color 0.2s;
}

.select-container.has-error {
  border-color: var(--pp-error-color);
  background-color: var(--pp-error-light-color);
}

.select-container.has-error .floating-label {
  color: var(--pp-error-color);
}

.select-element {
  width: 100%;
  border: none;
  outline: none;
  padding: 0;
  background: transparent;
  font-size: var(--pp-font-size-md);
  color: var(--pp-text-color);
  appearance: none;
}

.floating-label {
  position: absolute;
  top: calc(var(--pp-gap-md) - var(--pp-gap-sm) / 2);
  left: var(--pp-gap-md);
  font-size: var(--pp-font-size-md);
  color: var(--pp-secondary-color);
  pointer-events: none;
  transition: 0.2s ease all;
}

.floating-label.active {
  top: calc(var(--pp-gap-sm) / 5);
  font-size: var(--pp-font-size-xs);
}

.error-message {
  margin-top: var(--pp-gap-xs);
  padding-left: var(--pp-gap-xs);
  font-size: var(--pp-font-size-xs);
  color: var(--pp-error-color);
}
</style>
