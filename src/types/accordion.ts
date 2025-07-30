import type { Ref } from 'vue';

export interface AccordionContext {
  openItems: Ref<Set<string>>;
  toggleItem: (id: string) => void;
  isItemOpen: (id: string) => boolean;
  multiple: boolean;
}
