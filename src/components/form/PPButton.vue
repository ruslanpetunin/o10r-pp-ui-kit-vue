<template>
  <button class="ui-button"><slot /></button>
</template>

<style scoped>
.ui-button {
  display: inline-block;
  padding: var(--pp-gap-sm) var(--pp-gap-md);
  background: var(--pp-primary-color);
  color: var(--pp-primary-on-color);
  border: 1px solid var(--pp-primary-color);
  border-radius: var(--pp-border-radius-sm);
  font-size: var(--pp-font-size-md);
  font-weight: var(--pp-font-weight-bold);
  cursor: pointer;
  text-align: center;
  transition: background-color 0.15s, border-color 0.15s;
}

.ui-button:hover {
  background: var(--pp-primary-color-hover);
  border-color: var(--pp-primary-color-hover);
}

.ui-button:active {
  background: var(--pp-primary-color-active);
  border-color: var(--pp-primary-color-active);
}

.ui-button:disabled {
  opacity: var(--pp-disabled-opacity);
  cursor: not-allowed;
}
</style>
