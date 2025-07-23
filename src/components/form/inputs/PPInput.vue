<template>
  <div class="input-wrapper">
    <div :class="['input-container', { 'has-error': hasError }]">
      <label :for="id" :class="['floating-label', { active: isFocused || value }]">
        {{ label }}
      </label>

      <input
        class="input-element"
        :id="id"
        :name="name"
        :type="type"
        :value="value"
        @input="onInput"
        @focus="isFocused = true"
        @blur="(isFocused = false) || emit('blur')"
      />
    </div>

    <div v-if="hasError" class="error-message">
      <span>{{ error }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import useMask from './../../../composables/useMask';

const props = defineProps<{
  type: 'text' | 'number' | 'email' | 'password' | 'tel',
  name: string,
  label: string;
  error?: string;
  mask?: string | ((value: string) => string);
}>();

const emit = defineEmits<{
  (event: 'blur'): void;
  (event: 'input', value: string): void;
}>();

const id = `input-${Math.random().toString(36).substring(2, 10)}`;
const value = ref<string>('');
const isFocused = ref(false);
const hasError = computed(() => !!props.error);

const onInput = (event: Event) => {
  const target = event.target as HTMLInputElement;

  if (typeof props.mask === 'string') {
    const result = useMask(props.mask, target);

    value.value = result.maskedValue;

    emit('input', result.unmaskedValue);
  } else {
    value.value = props.mask ? props.mask(target.value) : target.value;

    emit('input', value.value);
  }
};
</script>

<style scoped>
.input-wrapper {
  width: 100%;
  display: flex;
  flex-direction: column;
}

.input-container {
  width: 100%;
  position: relative;
  border: 1px solid var(--pp-secondary-light-color);
  background-color: transparent;
  border-radius: var(--pp-border-radius-md);
  transition: border-color 0.2s, background-color 0.2s;
}

.input-container.has-error {
  border-color: var(--pp-error-color);
  background-color: var(--pp-error-light-color);
}

.input-container.has-error .floating-label {
  color: var(--pp-error-color);
}

.input-element {
  width: 100%;
  border: none;
  outline: none;
  padding: var(--pp-gap-md) var(--pp-gap-md) var(--pp-gap-sm) var(--pp-gap-md);
  background: transparent;
  font-size: var(--pp-font-size-md);
  color: var(--pp-text-color);
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
  top: calc(var(--pp-gap-xs) / 5);
  font-size: var(--pp-font-size-xs);
}

.error-message {
  margin-top: var(--pp-gap-xs);
  padding-left: var(--pp-gap-xs);
  font-size: var(--pp-font-size-xs);
  color: var(--pp-error-color);
}
</style>
