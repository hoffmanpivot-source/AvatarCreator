import { SKIN_TONES, FANTASY_TONES } from '../data/skinTones';
import type { SkinTonePreset } from '../types/character';
import styles from './SkinTonePicker.module.css';

interface SkinTonePickerProps {
  selected: SkinTonePreset;
  onSelect: (tone: SkinTonePreset) => void;
}

function SwatchRow({ tones, selected, onSelect, label }: {
  tones: SkinTonePreset[];
  selected: SkinTonePreset;
  onSelect: (t: SkinTonePreset) => void;
  label: string;
}) {
  return (
    <div className={styles.section}>
      <div className={styles.sectionLabel}>{label}</div>
      <div className={styles.swatches}>
        {tones.map((tone) => (
          <button
            key={tone.name}
            className={`${styles.swatch} ${tone.name === selected.name ? styles.swatchActive : ''}`}
            style={{ backgroundColor: tone.hex }}
            onClick={() => onSelect(tone)}
            title={tone.name}
          />
        ))}
      </div>
    </div>
  );
}

export default function SkinTonePicker({ selected, onSelect }: SkinTonePickerProps) {
  return (
    <div className={styles.picker}>
      <div className={styles.currentLabel}>Skin: {selected.name}</div>
      <SwatchRow tones={SKIN_TONES} selected={selected} onSelect={onSelect} label="Natural" />
      <SwatchRow tones={FANTASY_TONES} selected={selected} onSelect={onSelect} label="Fantasy" />
    </div>
  );
}
