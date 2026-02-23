# Dev Log

Track all development attempts — successes AND failures.

---

### 2026-02-22: v1.0.0 — Initial build

**What was done:**
- Scaffolded React + Vite + TypeScript project
- Ported morph target system from ReactAvatar (PARAM_KEYS, MORPH_SCALE, REMAP, min/max formula)
- 11 slider tabs with 56 sliders covering all body morphs + 5 tune shape keys
- 16 skin tone swatches (8 natural + 8 fantasy)
- Save/Load/Clone/Export character system (localStorage + JSON file download/upload)
- 4 built-in presets from ReactAvatar (Default, Athletic, Feminine, Curvy)
- Dark theme UI matching ReactAvatar design language
- Keyboard shortcuts: Ctrl+S export, Ctrl+N new, double-click slider to reset

**Data stolen from ReactAvatar:**
- `template.glb` (14,517 verts, 100 shape keys, 65 bones)
- Morph target names, categories, MORPH_SCALE, REMAP constants
- Skin tone definitions (16 presets)
- Character preset JSON format + 4 built-in presets

**Result:** Compiles with zero TypeScript errors. Ready for browser testing.
