import { SLIDER_TABS } from '../data/sliderDefs';
import type { SliderDef } from '../data/sliderDefs';
import type { CharacterParams, TuneValues, ParamKey, TuneKey } from '../types/character';
import styles from './SliderPanel.module.css';

interface SliderPanelProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  params: CharacterParams;
  tuneValues: TuneValues;
  onParamChange: (key: ParamKey, value: number) => void;
  onTuneChange: (key: TuneKey, value: number) => void;
}

function SliderRow({ def, value, onChange }: { def: SliderDef; value: number; onChange: (v: number) => void }) {
  return (
    <div className={styles.sliderRow}>
      <div className={styles.sliderHeader}>
        <span className={styles.label}>{def.label}</span>
        <span className={styles.value}>{value.toFixed(2)}</span>
      </div>
      <div className={styles.sliderTrack}>
        <span className={styles.rangeLabel}>{def.leftLabel}</span>
        <input
          type="range"
          min={def.min}
          max={def.max}
          step={def.step}
          value={value}
          onChange={(e) => onChange(parseFloat(e.target.value))}
          onDoubleClick={() => onChange(def.source === 'tune' ? 0 : 0.5)}
          className={`${styles.slider} ${def.source === 'tune' ? styles.sliderTune : ''}`}
        />
        <span className={styles.rangeLabel}>{def.rightLabel}</span>
      </div>
    </div>
  );
}

export default function SliderPanel({
  activeTab, onTabChange, params, tuneValues, onParamChange, onTuneChange,
}: SliderPanelProps) {
  const currentTab = SLIDER_TABS.find((t) => t.id === activeTab) ?? SLIDER_TABS[0];

  const getValue = (def: SliderDef): number => {
    if (def.source === 'tune') return tuneValues[def.key as TuneKey] ?? 0;
    return (params[def.key as ParamKey] as number) ?? 0.5;
  };

  const handleChange = (def: SliderDef, value: number) => {
    if (def.source === 'tune') {
      onTuneChange(def.key as TuneKey, value);
    } else {
      onParamChange(def.key as ParamKey, value);
    }
  };

  return (
    <div className={styles.panel}>
      <div className={styles.tabs}>
        {SLIDER_TABS.map((tab) => (
          <button
            key={tab.id}
            className={`${styles.tab} ${tab.id === activeTab ? styles.tabActive : ''}`}
            onClick={() => onTabChange(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className={styles.sliders}>
        {currentTab.sliders.map((def) => (
          <SliderRow
            key={def.key}
            def={def}
            value={getValue(def)}
            onChange={(v) => handleChange(def, v)}
          />
        ))}
      </div>
    </div>
  );
}
