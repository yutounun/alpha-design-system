# alpha-design-system

## 0.5.1

### Patch Changes

- b81546d: Add @fontsource-variable/geist in dependencies
- 7bbcc0e: Fix library build: externalize all `peerDependencies` and `dependencies` (including subpaths) so `vaul`, `recharts`, `cmdk`, and other runtime deps are not inlined from `node_modules/.pnpm` paths. Prevents `require('react')` errors in consumer apps using Vite 8 + Rolldown. Move `vaul` from devDependencies to dependencies. Document preferring subpath imports over the root barrel export.

## 0.5.0

### Minor Changes

- aff3040: Add `showClear` prop to `Input` and `SearchInput`.
    - `showClear?: boolean`: when true, renders a lucide `X` clear button while the value is non-empty and the field is enabled.
    - `onClear?: () => void`: separate callback fired when the clear button is pressed (already existed on `SearchInput`, now also on `Input`).
    - BREAKING (`SearchInput`): the clear button is no longer shown by passing only `onClear`. Set `showClear` explicitly.

### Patch Changes

- f2442f2: add showclear to button, fix dashboard page
- 06a8652: fix dependencies

## 0.4.0

### Minor Changes

- e4eb090: Add Drawer component backed by vaul, and use it on the dashboard mobile header to show search input and autocomplete from a bottom drawer.
- fc4b130: Add Progress component (linear, determinate/indeterminate) built on Radix Progress.
- b678554: Add `SearchInput` and `SearchCombobox` components (`cmdk`-based combobox with composable parts).

## 0.3.0

### Minor Changes

- b1563cf: Add Sidebar with sandbox/account switcher footer story, plus prerequisite primitives (avatar, tooltip, separator, sheet, skeleton, dropdown-menu).

## 0.2.0

### Minor Changes

- 80d4579: Add Card component with Header/Title/Description/Action/Content/Footer subcomponents.
- 80d4579: Add Chart component (Recharts v3, shadcn/ui-style) with Billing overview story and nine additional chart examples.
- d645cb0: Apply animation to Tab component

## 0.1.0

### Minor Changes

- 7b07779: Button, Tab, Input, Label Component
