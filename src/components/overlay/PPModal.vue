<template>
  <Teleport to="body">
    <div v-if="modelValue" class="pp-modal-overlay" @click.self="handleClose">
      <div class="pp-modal">
        <header class="pp-modal-header">
          <slot name="header" />
        </header>
        <div class="pp-modal-body">
          <slot name="body" />
        </div>
        <footer class="pp-modal-footer">
          <slot name="footer" />
        </footer>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{ modelValue?: boolean; closable?: boolean }>(),
  { modelValue: true, closable: true }
);
const emit = defineEmits<{ (e: 'update:modelValue', value: boolean): void }>();

function handleClose() {
  if (props.closable) {
    emit('update:modelValue', false);
  }
}
</script>

<style scoped>
.pp-modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
}

.pp-modal {
  background: #fff;
  border-radius: var(--pp-border-radius-md);
  max-width: 90%;
  min-width: 300px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
}

.pp-modal-header,
.pp-modal-footer {
  padding: var(--pp-gap-md);
  background: var(--pp-secondary-light-color);
}

.pp-modal-body {
  padding: var(--pp-gap-md);
}
</style>
