<template>
  <div class="pp-row">
    <slot />
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
.pp-row {
  display: flex;
  flex-wrap: wrap;
  margin-left: -0.5rem;
  margin-right: -0.5rem;
}
</style>
