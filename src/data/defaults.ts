import type { CharacterParams, TuneValues, ParamKey } from '../types/character';

export const DEFAULT_PARAMS: CharacterParams = {
  gender: 0.5, weight: 0.5, height: 0.5, age: 0.5, proportions: 0.5,
  chestMuscle: 0.5, backMuscle: 0.5, shoulderMuscle: 0.5, armMuscle: 0.5, legMuscle: 0.5,
  faceWidth: 0.5, faceLength: 0.5, jawWidth: 0.5, foreheadHeight: 0.5, foreheadCirc: 0.5,
  cheekBone: 0.5, cheekPlump: 0.5,
  noseWidth: 0.5, noseDepth: 0.5, nostrilAngle: 0.5, mouthWidth: 0.5, lipFullness: 0.5,
  eyeSize: 0.5, eyeHeight: 0.5, eyebrowHeight: 0.5, eyebrowAngle: 0.5,
  earLength: 0.5, earWidth: 0.5, skullDepth: 0.5,
  neckThick: 0.5, neckLength: 0.5, torsoWidth: 0.5, waistCirc: 0.5,
  hipWidth: 0.5, hipCirc: 0.5, buttocks: 0.5,
  legLength: 0.5, thighLength: 0.5, thighCirc: 0.5, calfLength: 0.5, calfCirc: 0.5,
  armLength: 0.5, bicepLength: 0.5, bicepCirc: 0.5, forearmLength: 0.5, forearmCirc: 0.5,
  handSize: 0.5, fingerLength: 0.5, fingerThick: 0.5,
  footLength: 0.5, footWidth: 0.5, footCirc: 0.5,
};

export const DEFAULT_TUNE: TuneValues = {
  tune_vshape: 0,
  tune_breastSize: 0,
  tune_breastDist: 0,
  tune_breastVol: 0,
  tune_breastPoint: 0,
};

// All params that have min/max morph targets in the template GLB
export const PARAM_KEYS: ParamKey[] = [
  'gender', 'weight', 'height', 'age', 'proportions',
  'chestMuscle', 'backMuscle', 'shoulderMuscle', 'armMuscle', 'legMuscle',
  'faceWidth', 'faceLength', 'jawWidth', 'foreheadHeight', 'foreheadCirc',
  'cheekBone', 'cheekPlump',
  'noseWidth', 'noseDepth', 'nostrilAngle', 'mouthWidth', 'lipFullness',
  'eyeSize', 'eyeHeight', 'eyebrowHeight', 'eyebrowAngle',
  'earLength', 'earWidth', 'skullDepth',
  'neckThick', 'neckLength', 'torsoWidth', 'waistCirc',
  'hipWidth', 'hipCirc', 'buttocks',
  'legLength', 'thighLength', 'thighCirc', 'calfLength', 'calfCirc',
  'armLength', 'bicepLength', 'bicepCirc', 'forearmLength', 'forearmCirc',
  'handSize', 'fingerLength', 'fingerThick',
  'footLength', 'footWidth', 'footCirc',
];

// Amplify morph influence for params where MakeHuman's range is too subtle
export const MORPH_SCALE: Partial<Record<ParamKey, number>> = {
  fingerLength: 3.0,
  fingerThick: 3.0,
  handSize: 3.0,
};

// Remap slider range: [min_effective, max_effective]
export const REMAP: Partial<Record<ParamKey, [number, number]>> = {
  age: [0.15, 1.0],
  fingerLength: [0.0, 0.60],
  fingerThick: [0.25, 1.0],
  handSize: [0.0, 0.90],
};
