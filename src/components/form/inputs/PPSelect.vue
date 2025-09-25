<template>
  <div class="select-wrapper">
    <div :class="['select-container', { 'has-error': hasError }]">
      <label :for="id" :class="['floating-label', { active: valueRef }]">
        {{ label }}
      </label>
      <select
        class="select-element"
        :id="id"
        :name="name"
        :value="valueRef"
        @input="onInput"
      >
        <option value disabled hidden></option>
        <slot />
      </select>
      <svg class="arrow" viewBox="0 0 12 12">
        <path d="M10.193 3.97a.75.75 0 0 1 1.062 1.062L6.53 9.756a.75.75 0 0 1-1.06 0L.745 5.032A.75.75 0 0 1 1.807 3.97L6 8.163l4.193-4.193z" fill-rule="evenodd"></path>
      </svg>
    </div>
    <div class="error-message">
      <span v-if="hasError">{{ error }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

const props = defineProps<{
  name: string,
  label: string;
  value?: string;
  error?: string;
}>();

const emit = defineEmits<{
  (event: 'input', value: string): void;
}>();

const id = `select-${Math.random().toString(36).substring(2, 10)}`;
const isFocused = ref(false);
const hasError = computed(() => !!props.error);
const valueRef = ref<string>(props.value || '');

function onInput(event: Event) {
  const target = event.target as HTMLSelectElement;

  valueRef.value = target.value;

  emit('input', valueRef.value);
}
</script>

<style scoped>
.select-wrapper {
  width: 100%;
}

.select-container {
  width: 100%;
  position: relative;
  border: 1px solid var(--pp-secondary-light-color);
  background-color: transparent;
  border-radius: var(--pp-border-radius-md);
  transition: border-color 0.2s, background-color 0.2s;
}

.select-container.has-error {
  border-color: var(--pp-error-color);
  background-color: var(--pp-error-light-color);
}

.select-container.has-error .arrow {
  fill: var(--pp-error-color);
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
  padding: var(--pp-gap-md) var(--pp-gap-md) var(--pp-gap-sm) var(--pp-gap-md);
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

.arrow {
  position: absolute;
  top: .8rem;
  right: .8rem;
  width: .75rem;
  height: .75rem;
  fill: var(--pp-text-color);
}
</style>
