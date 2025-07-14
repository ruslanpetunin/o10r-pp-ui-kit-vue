<template>
  <div class="accordion-item">
    <button
      class="accordion-header"
      @click="onHeaderClick"
      :aria-expanded="open"
      :aria-controls="'content-' + props.index"
      :id="'header-' + props.index"
    >
      {{ props.title }}
    </button>

    <Transition
      @before-enter="onBeforeEnter"
      @enter="onEnter"
      @after-enter="onAfterEnter"
      @before-leave="onBeforeLeave"
      @leave="onLeave"
    >
      <div
        v-show="open"
        class="accordion-content"
        :aria-labelledby="'header-' + props.index"
        :id="'content-' + props.index"
      >
        <div>
          <slot />
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import useAccordion from './../../../composables/useAccordion';

const props = defineProps<{
  index: number;
  title: string;
}>();

const emit = defineEmits<{
  (e: 'open', index: number): void;
}>();

const { toggleItem, isItemOpen } = useAccordion();
const open = computed(() => isItemOpen(props.index));

function onHeaderClick() {
  toggleItem(props.index);

  if (open.value) {
    emit('open', props.index);
  }
}

function onBeforeEnter(el: Element) {
  const element = el as HTMLElement;

  element.style.height = '0';
  element.style.overflow = 'hidden';
}

function onEnter(el: Element) {
  const element = el as HTMLElement;
  const height = element.scrollHeight;

  element.style.transition = 'height 0.3s ease';
  element.style.height = height + 'px';
}

function onAfterEnter(el: Element) {
  const element = el as HTMLElement;

  element.style.height = 'auto';
  element.style.overflow = '';
}

function onBeforeLeave(el: Element) {
  const element = el as HTMLElement;

  element.style.height = element.scrollHeight + 'px';
  element.style.overflow = 'hidden';
}

function onLeave(el: Element) {
  const element = el as HTMLElement;

  void element.offsetHeight; // Force reflow
  element.style.transition = 'height 0.3s ease';
  element.style.height = '0';
}
</script>

<style scoped>
.accordion-item + .accordion-item {
  border-top: 1px solid var(--pp-secondary-color);
}

.accordion-header {
  width: 100%;
  text-align: left;
  padding: 1rem;
  font-weight: bold;
  background: var(--pp-secondary-light-color);
  border: none;
  cursor: pointer;
}

.accordion-header:focus {
  outline: 2px solid #007acc;
}

.accordion-content>div {
  padding: 1rem;
}
</style>
