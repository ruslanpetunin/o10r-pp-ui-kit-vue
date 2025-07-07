import { ref, provide, inject } from 'vue';
import type { AccordionContext } from './../types/accordion';

const ACCORDION_KEY = Symbol('accordion');

export function provideAccordion(multiple = false) {
  const openItems = ref(new Set<number>());

  function toggleItem(index: number) {
    if (openItems.value.has(index)) {
      openItems.value.delete(index);
    } else {
      if (!multiple) {
        openItems.value.clear();
      }

      openItems.value.add(index);
    }
  }

  function isItemOpen(index: number) {
    return openItems.value.has(index);
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
