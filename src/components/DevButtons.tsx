import styles from './DevButtons.module.css';

interface DevButtonsProps {
  onScreenshot: () => void;
  onNote: () => void;
}

export default function DevButtons({ onScreenshot, onNote }: DevButtonsProps) {
  return (
    <div className={styles.container}>
      <button
        className={styles.btn}
        onClick={onScreenshot}
        title="Take screenshot with note"
      >
        <span className={styles.icon}>&#x1F4F8;</span>
      </button>
      <button
        className={styles.btn}
        onClick={onNote}
        title="Save dev note"
      >
        <span className={styles.icon}>&#x1F4DD;</span>
      </button>
    </div>
  );
}
