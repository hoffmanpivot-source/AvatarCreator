import type { SkinTonePreset } from '../types/character';

export const SKIN_TONES: SkinTonePreset[] = [
  { name: 'Porcelain',    rgb: [0.95, 0.87, 0.82], hex: '#F2DED1' },
  { name: 'Fair',         rgb: [0.91, 0.78, 0.65], hex: '#E8C7A6' },
  { name: 'Light',        rgb: [0.82, 0.63, 0.52], hex: '#D1A185' },
  { name: 'Medium Light', rgb: [0.76, 0.57, 0.45], hex: '#C29173' },
  { name: 'Medium',       rgb: [0.65, 0.45, 0.33], hex: '#A67354' },
  { name: 'Medium Dark',  rgb: [0.50, 0.33, 0.22], hex: '#805438' },
  { name: 'Dark',         rgb: [0.37, 0.24, 0.16], hex: '#5E3D28' },
  { name: 'Deep',         rgb: [0.26, 0.17, 0.12], hex: '#422B1E' },
];

export const FANTASY_TONES: SkinTonePreset[] = [
  { name: 'Ocean Blue',    rgb: [0.30, 0.50, 0.85], hex: '#4D80D9' },
  { name: 'Emerald',       rgb: [0.20, 0.70, 0.40], hex: '#33B366' },
  { name: 'Ruby Red',      rgb: [0.80, 0.25, 0.25], hex: '#CC4040' },
  { name: 'Royal Purple',  rgb: [0.55, 0.30, 0.75], hex: '#8C4DC0' },
  { name: 'Gold',          rgb: [0.85, 0.70, 0.30], hex: '#D9B34D' },
  { name: 'Silver',        rgb: [0.78, 0.78, 0.80], hex: '#C7C7CC' },
  { name: 'Obsidian',      rgb: [0.15, 0.15, 0.18], hex: '#26262E' },
  { name: 'Rose Pink',     rgb: [0.90, 0.55, 0.65], hex: '#E68CA6' },
];

export const ALL_SKIN_TONES = [...SKIN_TONES, ...FANTASY_TONES];

export function findSkinTone(name: string): SkinTonePreset {
  return ALL_SKIN_TONES.find((t) => t.name === name) ?? SKIN_TONES[3]; // default: Medium Light
}
