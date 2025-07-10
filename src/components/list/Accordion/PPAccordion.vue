<template>
  <div class="accordion">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { provideAccordion } from './../../../composables/useAccordion';

const props = withDefaults(
  defineProps<{
    multiple?: boolean;
  }>(),
  {
    multiple: false,
  }
);

provideAccordion(props.multiple);
</script>

<style scoped>
.accordion {
  border: 1px solid var(--pp-secondary-light-color);
  border-radius: var(--pp-border-radius-md);
}
</style>
