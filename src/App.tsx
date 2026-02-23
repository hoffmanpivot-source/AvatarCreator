import { useState, useEffect, useCallback, useRef } from 'react';
import AvatarViewer from './components/AvatarViewer';
import type { AvatarViewerHandle } from './components/AvatarViewer';
import SliderPanel from './components/SliderPanel';
import SkinTonePicker from './components/SkinTonePicker';
import Toolbar from './components/Toolbar';
import CharacterList from './components/CharacterList';
import DevButtons from './components/DevButtons';
import { sendScreenshot, sendNote } from './utils/devFeedback';
import { DEFAULT_PARAMS, DEFAULT_TUNE } from './data/defaults';
import { findSkinTone } from './data/skinTones';
import { downloadJSON, loadJSONFile, saveToLocalStorage, loadFromLocalStorage } from './utils/fileIO';
import { BUILTIN_PRESETS } from './data/builtinPresets';
import type { CharacterParams, TuneValues, ParamKey, TuneKey, SkinTonePreset, CharacterPreset } from './types/character';
import './App.css';

function generateId(): string {
  return `char_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`;
}

export default function App() {
  const [params, setParams] = useState<CharacterParams>({ ...DEFAULT_PARAMS });
  const [tuneValues, setTuneValues] = useState<TuneValues>({ ...DEFAULT_TUNE });
  const [skinTone, setSkinTone] = useState<SkinTonePreset>(findSkinTone('Medium Light'));
  const [characterName, setCharacterName] = useState('Untitled');
  const [activeId, setActiveId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('body');
  const [characters, setCharacters] = useState<CharacterPreset[]>([]);
  const [showCharList, setShowCharList] = useState(true);
  const viewerRef = useRef<AvatarViewerHandle>(null);

  // Load saved characters from localStorage on mount (seed with built-ins on first run)
  useEffect(() => {
    const saved = loadFromLocalStorage();
    if (saved.length > 0) {
      setCharacters(saved);
    } else {
      setCharacters(BUILTIN_PRESETS);
    }
  }, []);

  // Persist characters to localStorage on change
  useEffect(() => {
    saveToLocalStorage(characters);
  }, [characters]);

  const buildPreset = useCallback((): CharacterPreset => {
    const id = activeId ?? generateId();
    return {
      id,
      name: characterName,
      tags: ['custom'],
      skinTone: skinTone.name,
      baseParams: { ...params },
      baseTune: { ...tuneValues },
    };
  }, [activeId, characterName, skinTone, params, tuneValues]);

  const loadPreset = useCallback((preset: CharacterPreset) => {
    setParams({ ...DEFAULT_PARAMS, ...preset.baseParams });
    setTuneValues({ ...DEFAULT_TUNE, ...preset.baseTune });
    setSkinTone(findSkinTone(preset.skinTone));
    setCharacterName(preset.name);
    setActiveId(preset.id);
  }, []);

  const handleNew = useCallback(() => {
    setParams({ ...DEFAULT_PARAMS });
    setTuneValues({ ...DEFAULT_TUNE });
    setSkinTone(findSkinTone('Medium Light'));
    setCharacterName('Untitled');
    setActiveId(null);
  }, []);

  const handleSave = useCallback(() => {
    const name = prompt('Character name:', characterName);
    if (!name?.trim()) return;
    const preset = buildPreset();
    preset.name = name.trim();
    if (!activeId) preset.id = generateId();
    setCharacterName(preset.name);
    setActiveId(preset.id);
    setCharacters((prev) => {
      const existing = prev.findIndex((c) => c.id === preset.id);
      if (existing >= 0) {
        const updated = [...prev];
        updated[existing] = preset;
        return updated;
      }
      return [...prev, preset];
    });
  }, [characterName, activeId, buildPreset]);

  const handleLoad = useCallback(async () => {
    const preset = await loadJSONFile();
    if (preset) {
      loadPreset(preset);
      // Add to list if not already there
      setCharacters((prev) => {
        if (prev.some((c) => c.id === preset.id)) return prev;
        return [...prev, preset];
      });
    }
  }, [loadPreset]);

  const handleClone = useCallback(() => {
    const name = prompt('Name for cloned character:', `${characterName} (copy)`);
    if (!name?.trim()) return;
    const preset = buildPreset();
    preset.id = generateId();
    preset.name = name.trim();
    setCharacterName(preset.name);
    setActiveId(preset.id);
    setCharacters((prev) => [...prev, preset]);
  }, [characterName, buildPreset]);

  const handleExportJSON = useCallback(() => {
    const preset = buildPreset();
    downloadJSON(preset);
  }, [buildPreset]);

  const handleDelete = useCallback((id: string) => {
    setCharacters((prev) => prev.filter((c) => c.id !== id));
    if (activeId === id) setActiveId(null);
  }, [activeId]);

  const handleParamChange = useCallback((key: ParamKey, value: number) => {
    setParams((prev) => ({ ...prev, [key]: value }));
  }, []);

  const handleTuneChange = useCallback((key: TuneKey, value: number) => {
    setTuneValues((prev) => ({ ...prev, [key]: value }));
  }, []);

  // --- Dev screenshot / note ---
  const handleScreenshot = useCallback(() => {
    const dataURL = viewerRef.current?.captureScreenshot();
    if (!dataURL) {
      alert('Could not capture screenshot');
      return;
    }
    const description = prompt('Describe the issue (optional):') ?? '';
    sendScreenshot(dataURL, description, characterName, params, tuneValues, skinTone.name);
  }, [characterName, params, tuneValues, skinTone]);

  const handleNote = useCallback(() => {
    const text = prompt('What do you want to note?');
    if (!text?.trim()) return;
    sendNote(text.trim(), characterName, params, tuneValues, skinTone.name);
  }, [characterName, params, tuneValues, skinTone]);

  // Keyboard shortcuts
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 's') {
        e.preventDefault();
        handleExportJSON();
      }
      if ((e.metaKey || e.ctrlKey) && e.key === 'n') {
        e.preventDefault();
        handleNew();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [handleExportJSON, handleNew]);

  return (
    <div className="app">
      <Toolbar
        characterName={characterName}
        onNew={handleNew}
        onSave={handleSave}
        onLoad={handleLoad}
        onClone={handleClone}
        onExportJSON={handleExportJSON}
      />
      <div className="main">
        {showCharList && (
          <div className="sidebar-left">
            <CharacterList
              characters={characters}
              activeId={activeId}
              onSelect={loadPreset}
              onDelete={handleDelete}
            />
          </div>
        )}
        <div className="viewer">
          <AvatarViewer
            ref={viewerRef}
            params={params}
            tuneValues={tuneValues}
            skinToneRGB={skinTone.rgb}
          />
          <button
            className="toggle-list-btn"
            onClick={() => setShowCharList((v) => !v)}
            title="Toggle character list"
          >
            {showCharList ? '\u25C0' : '\u25B6'}
          </button>
          <DevButtons onScreenshot={handleScreenshot} onNote={handleNote} />
        </div>
        <div className="sidebar-right">
          <SliderPanel
            activeTab={activeTab}
            onTabChange={setActiveTab}
            params={params}
            tuneValues={tuneValues}
            onParamChange={handleParamChange}
            onTuneChange={handleTuneChange}
          />
          <SkinTonePicker selected={skinTone} onSelect={setSkinTone} />
        </div>
      </div>
    </div>
  );
}
