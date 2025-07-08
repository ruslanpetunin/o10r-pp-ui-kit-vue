<template>
  <input :type="type">
</template>

<script setup lang="ts">
defineProps<{
  type: 'text' | 'number' | 'email' | 'password' | 'tel',
}>();
</script>

<style scoped>
input {
  display: inline-block;
  width: 100%;
}
</style>
