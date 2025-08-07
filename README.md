# o10r-pp-ui-kit-vue

## Grid Components

The UI kit provides a simple grid system similar to Bootstrap. Use `PPGrid`, `PPGridRow` and `PPGridCol` components to arrange elements in columns.

```vue
<PPGrid>
  <PPGridRow>
    <PPGridCol :span="6">Left</PPGridCol>
    <PPGridCol :span="6">Right</PPGridCol>
  </PPGridRow>
</PPGrid>
```

The `span` prop accepts a value from `1` to `12` and controls the column width.
