# o10r-pp-ui-kit-vue

A lightweight UI kit for Vue 3 that provides layout, form and overlay components.

## Installation

```bash
npm install o10r-pp-ui-kit-vue
```

## Usage

Register all components globally:

```ts
import { createApp } from 'vue';
import App from './App.vue';

import PPUI from 'o10r-pp-ui-kit-vue';
import 'o10r-pp-ui-kit-vue/style.css';

createApp(App).use(PPUI).mount('#app');
```

Or import individual components on demand:

```ts
import { PPButton, PPInput } from 'o10r-pp-ui-kit-vue';
```

## Components

### Button

```vue
<script setup lang="ts">
function onClick() {
  console.log('clicked');
}
</script>

<template>
  <PPButton @click="onClick">Save</PPButton>
</template>
```

### Input

```vue
<script setup lang="ts">
import { ref } from 'vue';

const name = ref('');
</script>

<template>
  <PPInput
    type="text"
    name="username"
    label="Username"
    :value="name"
    @input="name = $event"
  />
</template>
```

### Checkbox

```vue
<script setup lang="ts">
import { ref } from 'vue';

const accept = ref(false);
</script>

<template>
  <PPCheckbox v-model="accept" label="I agree" />
</template>
```

### Select

```vue
<script setup lang="ts">
import { ref } from 'vue';

const color = ref('');
</script>

<template>
  <PPSelect v-model="color" label="Favorite color">
    <option value="red">Red</option>
    <option value="green">Green</option>
    <option value="blue">Blue</option>
  </PPSelect>
</template>
```

### Accordion

```vue
<PPAccordion :multiple="true" :defaultOpenIds="['a']">
  <PPAccordionItem id="a">
    <template #header>Section A</template>
    <template #body>A content</template>
  </PPAccordionItem>
  <PPAccordionItem id="b">
    <template #header>Section B</template>
    <template #body>B content</template>
  </PPAccordionItem>
</PPAccordion>
```

### Grid

```vue
<PPGrid>
  <PPGridRow>
    <PPGridCol :span="6">Left</PPGridCol>
    <PPGridCol :span="6">Right</PPGridCol>
  </PPGridRow>
</PPGrid>
```

`span` prop accepts a value from `1` to `12` and controls the column width.

### Modal

```vue
<script setup lang="ts">
import { ref } from 'vue';

const open = ref(false);
</script>

<template>
  <PPButton @click="open = true">Open</PPButton>

  <PPModal v-model="open">
    <template #header>Title</template>
    <template #body>Some text</template>
    <template #footer>
      <PPButton @click="open = false">Close</PPButton>
    </template>
  </PPModal>
</template>
```

## License

MIT

