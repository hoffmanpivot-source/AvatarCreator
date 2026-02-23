# CLAUDE.md

## Project Overview

AvatarCreator is a standalone web app (React + Vite + R3F) for creating and editing MakeHuman character presets. Uses the same `template.glb` as ReactAvatar — 14,517 verts, 100 shape keys, 65 Mixamo bones. Body-only (no equipment/animation). Exports JSON files compatible with ReactAvatar's `assets/characters/` format.

## Development Commands

```bash
npm run dev       # Start Vite dev server (http://localhost:5173)
npm run build     # Production build
npx tsc --noEmit  # TypeScript check
```

## Version Management

Format: `vMAJOR.MINOR.PATCH` in `src/App.tsx` toolbar display and `package.json`.
- PATCH: bug fixes, small tweaks
- MINOR: new features, UI changes
- MAJOR: breaking changes to preset format

## Tech Stack

React 18 + TypeScript + Vite + Three.js + React Three Fiber + @react-three/drei

## Key Files

- `src/App.tsx` — Main app layout, state management, keyboard shortcuts
- `src/components/AvatarModel.tsx` — GLB loading, morph target application (useFrame)
- `src/components/AvatarViewer.tsx` — R3F Canvas, lighting, OrbitControls
- `src/components/SliderPanel.tsx` — Tabbed slider UI (11 categories, 56 sliders)
- `src/components/SkinTonePicker.tsx` — 16 skin tone swatches
- `src/components/Toolbar.tsx` — New/Save/Load/Clone/Export buttons
- `src/components/CharacterList.tsx` — Saved characters sidebar
- `src/data/sliderDefs.ts` — Slider definitions (key, label, range, category)
- `src/data/skinTones.ts` — Skin tone presets (8 natural + 8 fantasy)
- `src/data/defaults.ts` — Default params, MORPH_SCALE, REMAP constants
- `src/data/builtinPresets.ts` — 4 built-in character presets
- `src/types/character.ts` — CharacterPreset, CharacterParams, TuneValues
- `src/utils/fileIO.ts` — JSON save/load (File API + localStorage)

## Important Rules

- No `as any` casts
- Morph target application must match ReactAvatar exactly (MORPH_SCALE, REMAP, min/max formula)
- Exported JSON must be compatible with ReactAvatar `assets/characters/` format
- Commit always means commit + push

## Commit Rules

- Commit after every significant change
- Always commit + push together
- Update version, dev_log, and handoff as work progresses

## Session Protocol

### Start Every Session
1. Read this file (CLAUDE.md)
2. Read newest handoff doc in `docs/`
3. Read `docs/dev_log.md`

### Handoff Protocol
- Update incrementally as you work (after commits, every 15-20 min)
- MAX 150 LINES
- New session = increment major version (1.0 -> 2.0)
- Content: where we are, what's next, known issues, work log

### Dev Log (`docs/dev_log.md`)
- Track ALL attempts including failures
- Format: date, description, tried, result, lesson
