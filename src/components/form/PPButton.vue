<template>
  <button class="ui-button"><slot /></button>
</template>

<style scoped>
.ui-button {
  padding: var(--pp-gap-sm) var(--pp-gap-md);
  background: var(--pp-primary-color);
  color: var(--pp-primary-on-color);
  border-radius: var(--pp-border-radius-sm);
  font-size: var(--pp-font-size-md);
  border: none;
}
</style>
