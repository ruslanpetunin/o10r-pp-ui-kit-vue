<template>
  <div class="accordion-item">
    <button
      class="accordion-header"
      @click="onHeaderClick"
      :aria-expanded="open"
      :aria-controls="'content-' + props.id"
      :id="'header-' + props.id"
    >
      <slot name="header" />
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
        :aria-labelledby="'header-' + props.id"
        :id="'content-' + props.id"
      >
        <div>
          <slot name="body"/>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import useAccordion from './../../../composables/useAccordion';

const props = withDefaults(
  defineProps<{
    id: string;
    closable: boolean;
  }>(),
  {
    closable: true,
  }
);

const emit = defineEmits<{
  (e: 'open', id: string): void;
  (e: 'closed', id: string): void;
}>();

const { toggleItem, isItemOpen } = useAccordion();
const open = computed(() => isItemOpen(props.id));

function onHeaderClick() {
  if (!open.value || props.closable) {
    toggleItem(props.id);

    if (open.value) {
      emit('open', props.id);
    } else {
      emit('closed', props.id);
    }
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
  border-top: 1px solid var(--pp-secondary-light-color);
}

.accordion-header {
  display: flex;
  justify-content: start;
  align-items: center;
  width: 100%;
  padding: 1rem;
  font-weight: bold;
  border: none;
  cursor: pointer;
  background: transparent;
}

.accordion-content>div {
  padding: 1rem;
}

button {
  -webkit-tap-highlight-color: transparent;
  outline: none;
}

button:active {
  background: inherit;
  color: inherit;
}
</style>
