<template>
  <div v-html="safeHtml"></div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import useMarkdown from '../composables/useMarkdown';

const props = defineProps<{
  content: string;
}>();

const safeHtml = ref<string>('');

onMounted(
  async () => {
    safeHtml.value = await useMarkdown(props.content)
  }
);
</script>
