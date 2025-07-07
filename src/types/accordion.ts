import type { Ref } from 'vue';

export interface AccordionContext {
  openItems: Ref<Set<number>>;
  toggleItem: (index: number) => void;
  isItemOpen: (index: number) => boolean;
  multiple: boolean;
}
