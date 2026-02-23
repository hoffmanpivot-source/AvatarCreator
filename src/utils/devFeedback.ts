import type { CharacterParams, TuneValues } from '../types/character';

const APP_VERSION = 'v1.0.0';
const DEV_SCREENSHOT_URL = 'http://localhost:8765/screenshot';

interface DevMeta {
  version: string;
  timestamp: string;
  characterName: string;
  description: string;
  params: CharacterParams;
  tuneValues: TuneValues;
  skinTone: string;
}

function buildMeta(
  description: string,
  characterName: string,
  params: CharacterParams,
  tuneValues: TuneValues,
  skinTone: string,
): DevMeta {
  return {
    version: APP_VERSION,
    timestamp: new Date().toISOString(),
    characterName,
    description,
    params,
    tuneValues,
    skinTone,
  };
}

function downloadFile(filename: string, content: string, mimeType: string): void {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function downloadDataURL(filename: string, dataURL: string): void {
  const a = document.createElement('a');
  a.href = dataURL;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

async function trySendToServer(body: object): Promise<boolean> {
  try {
    const resp = await fetch(DEV_SCREENSHOT_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    return resp.ok;
  } catch {
    return false;
  }
}

export async function sendScreenshot(
  imageDataURL: string,
  description: string,
  characterName: string,
  params: CharacterParams,
  tuneValues: TuneValues,
  skinTone: string,
): Promise<void> {
  const meta = buildMeta(description, characterName, params, tuneValues, skinTone);

  // Try dev server first
  const sent = await trySendToServer({ image: imageDataURL, meta });
  if (sent) {
    console.log('[Screenshot] sent to dev server');
    return;
  }

  // Fallback: download locally
  const ts = new Date().toISOString().replace(/[:.]/g, '-');
  downloadDataURL(`screenshot_${ts}.jpg`, imageDataURL);
  downloadFile(`screenshot_${ts}.json`, JSON.stringify(meta, null, 2), 'application/json');
  console.log('[Screenshot] saved locally');
}

export async function sendNote(
  description: string,
  characterName: string,
  params: CharacterParams,
  tuneValues: TuneValues,
  skinTone: string,
): Promise<void> {
  const meta = buildMeta(description, characterName, params, tuneValues, skinTone);

  // Try dev server first
  const sent = await trySendToServer({ meta });
  if (sent) {
    console.log('[Note] sent to dev server');
    return;
  }

  // Fallback: download locally
  const ts = new Date().toISOString().replace(/[:.]/g, '-');
  downloadFile(`note_${ts}.json`, JSON.stringify(meta, null, 2), 'application/json');
  console.log('[Note] saved locally');
}
