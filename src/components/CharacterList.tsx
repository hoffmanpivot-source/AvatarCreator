import type { CharacterPreset } from '../types/character';
import styles from './CharacterList.module.css';

interface CharacterListProps {
  characters: CharacterPreset[];
  activeId: string | null;
  onSelect: (preset: CharacterPreset) => void;
  onDelete: (id: string) => void;
}

export default function CharacterList({ characters, activeId, onSelect, onDelete }: CharacterListProps) {
  if (characters.length === 0) {
    return (
      <div className={styles.empty}>
        <p>No saved characters</p>
        <p className={styles.hint}>Save or load a character to get started</p>
      </div>
    );
  }

  return (
    <div className={styles.list}>
      <div className={styles.header}>Saved Characters ({characters.length})</div>
      {characters.map((char) => (
        <div
          key={char.id}
          className={`${styles.item} ${char.id === activeId ? styles.itemActive : ''}`}
          onClick={() => onSelect(char)}
        >
          <div className={styles.itemInfo}>
            <span className={styles.itemName}>{char.name}</span>
            <span className={styles.itemTags}>{char.tags.join(', ')}</span>
          </div>
          <button
            className={styles.deleteBtn}
            onClick={(e) => {
              e.stopPropagation();
              if (confirm(`Delete "${char.name}"?`)) onDelete(char.id);
            }}
            title="Delete"
          >
            &times;
          </button>
        </div>
      ))}
    </div>
  );
}
