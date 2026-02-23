export interface SkinTonePreset {
  name: string;
  rgb: [number, number, number];
  hex: string;
}

// All numeric morph target params (51 keys)
export interface CharacterParams {
  // Macro (full-body) params
  gender: number;
  weight: number;
  height: number;
  age: number;
  proportions: number;
  // Muscles
  chestMuscle: number;
  backMuscle: number;
  shoulderMuscle: number;
  armMuscle: number;
  legMuscle: number;
  // Face
  faceWidth: number;
  faceLength: number;
  jawWidth: number;
  foreheadHeight: number;
  foreheadCirc: number;
  cheekBone: number;
  cheekPlump: number;
  // Nose & Mouth
  noseWidth: number;
  noseDepth: number;
  nostrilAngle: number;
  mouthWidth: number;
  lipFullness: number;
  // Eyes & Brows
  eyeSize: number;
  eyeHeight: number;
  eyebrowHeight: number;
  eyebrowAngle: number;
  // Ears & Skull
  earLength: number;
  earWidth: number;
  skullDepth: number;
  // Neck & Torso
  neckThick: number;
  neckLength: number;
  torsoWidth: number;
  waistCirc: number;
  hipWidth: number;
  hipCirc: number;
  buttocks: number;
  // Legs
  legLength: number;
  thighLength: number;
  thighCirc: number;
  calfLength: number;
  calfCirc: number;
  // Arms
  armLength: number;
  bicepLength: number;
  bicepCirc: number;
  forearmLength: number;
  forearmCirc: number;
  // Hands
  handSize: number;
  fingerLength: number;
  fingerThick: number;
  // Feet
  footLength: number;
  footWidth: number;
  footCirc: number;
}

export type ParamKey = keyof CharacterParams;

export const TUNE_KEYS = [
  'tune_vshape',
  'tune_breastSize',
  'tune_breastDist',
  'tune_breastVol',
  'tune_breastPoint',
] as const;

export type TuneKey = (typeof TUNE_KEYS)[number];
export type TuneValues = Record<TuneKey, number>;

export interface CharacterPreset {
  id: string;
  name: string;
  tags: string[];
  skinTone: string;
  baseParams: CharacterParams;
  baseTune: Partial<TuneValues>;
}
