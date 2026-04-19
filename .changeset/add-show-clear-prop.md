---
"alpha-design-system": minor
---

Add `showClear` prop to `Input` and `SearchInput`.

- `showClear?: boolean`: when true, renders a lucide `X` clear button while the value is non-empty and the field is enabled.
- `onClear?: () => void`: separate callback fired when the clear button is pressed (already existed on `SearchInput`, now also on `Input`).
- BREAKING (`SearchInput`): the clear button is no longer shown by passing only `onClear`. Set `showClear` explicitly.
