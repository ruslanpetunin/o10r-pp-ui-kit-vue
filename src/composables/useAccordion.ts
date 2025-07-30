import { ref, provide, inject } from 'vue';
import type { AccordionContext } from './../types/accordion';

const ACCORDION_KEY = Symbol('accordion');

export function provideAccordion(multiple = false, defaultOpenIds: string[] = []) {
  const openItems = ref(new Set<string>(defaultOpenIds));

  function toggleItem(id: string) {
    if (openItems.value.has(id)) {
      openItems.value.delete(id);
    } else {
      if (!multiple) {
        openItems.value.clear();
      }

      openItems.value.add(id);
    }
  }

  function isItemOpen(id: string) {
    return openItems.value.has(id);
  }

  const context: AccordionContext = {
    openItems,
    toggleItem,
    isItemOpen,
    multiple,
  };

  provide(ACCORDION_KEY, context);

  return context;
}

export default function() {
  const context = inject<AccordionContext>(ACCORDION_KEY);

  if (!context) {
    throw new Error('useAccordion must be used within Accordion provider');
  }

  return context;
}
