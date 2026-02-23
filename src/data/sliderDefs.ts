import type { ParamKey, TuneKey } from '../types/character';

export interface SliderDef {
  key: string;
  label: string;
  leftLabel: string;
  rightLabel: string;
  min: number;
  max: number;
  step: number;
  source: 'params' | 'tune';
}

export interface SliderTab {
  id: string;
  label: string;
  sliders: SliderDef[];
}

function p(key: ParamKey, label: string, leftLabel: string, rightLabel: string): SliderDef {
  return { key, label, leftLabel, rightLabel, min: -1, max: 2, step: 0.01, source: 'params' };
}

function t(key: TuneKey, label: string, leftLabel: string, rightLabel: string, max = 3): SliderDef {
  return { key, label, leftLabel, rightLabel, min: -1, max, step: 0.01, source: 'tune' };
}

export const SLIDER_TABS: SliderTab[] = [
  {
    id: 'body', label: 'Body',
    sliders: [
      p('gender', 'Gender', 'Female', 'Male'),
      p('age', 'Age', 'Young', 'Old'),
      p('height', 'Height', 'Short', 'Tall'),
      p('weight', 'Weight', 'Thin', 'Heavy'),
      p('proportions', 'Build', 'Compact', 'Lanky'),
    ],
  },
  {
    id: 'muscles', label: 'Muscles',
    sliders: [
      p('chestMuscle', 'Chest', 'Flat', 'Buff'),
      p('backMuscle', 'Back', 'Flat', 'Buff'),
      p('shoulderMuscle', 'Shoulders', 'Flat', 'Buff'),
      p('armMuscle', 'Arms', 'Flat', 'Buff'),
      p('legMuscle', 'Legs', 'Flat', 'Buff'),
    ],
  },
  {
    id: 'face', label: 'Face',
    sliders: [
      p('faceWidth', 'Face Width', 'Narrow', 'Wide'),
      p('faceLength', 'Face Length', 'Short', 'Long'),
      p('jawWidth', 'Jaw', 'Narrow', 'Wide'),
      p('foreheadHeight', 'Forehead Ht', 'Small', 'Large'),
      p('foreheadCirc', 'Forehead Wd', 'Narrow', 'Wide'),
      p('cheekBone', 'Cheekbone', 'Flat', 'Prominent'),
      p('cheekPlump', 'Cheek Plump', 'Lean', 'Full'),
      p('skullDepth', 'Skull Depth', 'Flat', 'Deep'),
    ],
  },
  {
    id: 'nose-mouth', label: 'Nose & Mouth',
    sliders: [
      p('noseWidth', 'Nose Width', 'Narrow', 'Wide'),
      p('noseDepth', 'Nose Depth', 'Flat', 'Long'),
      p('nostrilAngle', 'Nostrils', 'Down', 'Up'),
      p('mouthWidth', 'Mouth Width', 'Small', 'Wide'),
      p('lipFullness', 'Lip Fullness', 'Thin', 'Full'),
    ],
  },
  {
    id: 'eyes', label: 'Eyes',
    sliders: [
      p('eyeSize', 'Eye Size', 'Small', 'Large'),
      p('eyeHeight', 'Eye Height', 'Narrow', 'Tall'),
      p('eyebrowHeight', 'Brow Height', 'Low', 'High'),
      p('eyebrowAngle', 'Brow Angle', 'Flat', 'Arched'),
    ],
  },
  {
    id: 'ears', label: 'Ears',
    sliders: [
      p('earLength', 'Ear Length', 'Short', 'Long'),
      p('earWidth', 'Ear Width', 'Flat', 'Out'),
    ],
  },
  {
    id: 'torso', label: 'Torso',
    sliders: [
      p('neckThick', 'Neck Thick', 'Thin', 'Thick'),
      p('neckLength', 'Neck Length', 'Short', 'Long'),
      p('torsoWidth', 'Shoulders', 'Narrow', 'Broad'),
      p('waistCirc', 'Waist', 'Thin', 'Wide'),
      p('hipWidth', 'Hip Width', 'Narrow', 'Wide'),
      p('hipCirc', 'Hip Circ', 'Thin', 'Full'),
      p('buttocks', 'Buttocks', 'Flat', 'Full'),
    ],
  },
  {
    id: 'arms', label: 'Arms',
    sliders: [
      p('armLength', 'Arm Length', 'Short', 'Long'),
      p('bicepLength', 'Bicep Length', 'Short', 'Long'),
      p('bicepCirc', 'Bicep Circ', 'Thin', 'Thick'),
      p('forearmLength', 'Forearm Length', 'Short', 'Long'),
      p('forearmCirc', 'Forearm Circ', 'Thin', 'Thick'),
    ],
  },
  {
    id: 'legs', label: 'Legs',
    sliders: [
      p('legLength', 'Leg Length', 'Short', 'Long'),
      p('thighLength', 'Thigh Length', 'Short', 'Long'),
      p('thighCirc', 'Thigh Circ', 'Thin', 'Thick'),
      p('calfLength', 'Calf Length', 'Short', 'Long'),
      p('calfCirc', 'Calf Circ', 'Thin', 'Thick'),
    ],
  },
  {
    id: 'hands-feet', label: 'Hands & Feet',
    sliders: [
      p('handSize', 'Hand Size', 'Small', 'Large'),
      p('fingerLength', 'Finger Length', 'Short', 'Long'),
      p('fingerThick', 'Finger Thick', 'Thin', 'Thick'),
      p('footLength', 'Foot Length', 'Small', 'Large'),
      p('footWidth', 'Foot Width', 'Narrow', 'Wide'),
      p('footCirc', 'Foot Circ', 'Thin', 'Thick'),
    ],
  },
  {
    id: 'tune', label: 'Tune',
    sliders: [
      t('tune_vshape', 'V-Shape', 'None', 'Max'),
      t('tune_breastSize', 'Breast Size', 'None', 'Max'),
      t('tune_breastDist', 'Breast Distance', 'None', 'Max'),
      t('tune_breastVol', 'Breast Volume', 'None', 'Max'),
      t('tune_breastPoint', 'Breast Point', 'None', 'Max'),
    ],
  },
];
