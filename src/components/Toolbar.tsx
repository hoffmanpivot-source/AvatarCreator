import styles from './Toolbar.module.css';

interface ToolbarProps {
  characterName: string;
  onNew: () => void;
  onSave: () => void;
  onLoad: () => void;
  onClone: () => void;
  onExportJSON: () => void;
}

export default function Toolbar({ characterName, onNew, onSave, onLoad, onClone, onExportJSON }: ToolbarProps) {
  return (
    <div className={styles.toolbar}>
      <div className={styles.left}>
        <span className={styles.appName}>AvatarCreator</span>
        <span className={styles.version}>v1.0.0</span>
      </div>
      <div className={styles.center}>
        <span className={styles.charName}>{characterName}</span>
      </div>
      <div className={styles.right}>
        <button className={styles.btn} onClick={onNew} title="New character (Ctrl+N)">New</button>
        <button className={styles.btn} onClick={onLoad} title="Load JSON file">Load</button>
        <button className={styles.btn} onClick={onClone} title="Clone current character">Clone</button>
        <button className={`${styles.btn} ${styles.btnPrimary}`} onClick={onSave} title="Save to character list">Save</button>
        <button className={`${styles.btn} ${styles.btnAccent}`} onClick={onExportJSON} title="Export as JSON file (Ctrl+S)">Export</button>
      </div>
    </div>
  );
}
