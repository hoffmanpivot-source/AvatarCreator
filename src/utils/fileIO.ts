import type { CharacterPreset } from '../types/character';

export function downloadJSON(preset: CharacterPreset): void {
  const json = JSON.stringify(preset, null, 2);
  const blob = new Blob([json], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${preset.id}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function loadJSONFile(): Promise<CharacterPreset | null> {
  return new Promise((resolve) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = async () => {
      const file = input.files?.[0];
      if (!file) { resolve(null); return; }
      try {
        const text = await file.text();
        const data = JSON.parse(text) as CharacterPreset;
        // Basic validation
        if (!data.id || !data.name || !data.baseParams) {
          throw new Error('Invalid preset format');
        }
        resolve(data);
      } catch {
        alert('Failed to load preset file. Make sure it is a valid character JSON.');
        resolve(null);
      }
    };
    input.click();
  });
}

const STORAGE_KEY = 'avatarcreator_characters';

export function saveToLocalStorage(presets: CharacterPreset[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(presets));
}

export function loadFromLocalStorage(): CharacterPreset[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as CharacterPreset[];
  } catch {
    return [];
  }
}
