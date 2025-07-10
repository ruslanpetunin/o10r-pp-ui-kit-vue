<template>
  <div class="pp-col" :style="columnStyle">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = withDefaults(
  defineProps<{
    span?: number;
  }>(),
  {
    span: 12,
  }
);

const columnStyle = computed(() => ({
  flex: `0 0 calc(100% / 12 * ${props.span})`,
  maxWidth: `calc(100% / 12 * ${props.span})`,
  paddingLeft: '0.5rem',
  paddingRight: '0.5rem',
}));
</script>

<style scoped>
.pp-col {
  box-sizing: border-box;
}
</style>
