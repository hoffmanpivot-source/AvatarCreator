import { useEffect, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import type { CharacterParams, TuneValues, TuneKey, ParamKey } from '../types/character';
import { TUNE_KEYS } from '../types/character';
import { PARAM_KEYS, MORPH_SCALE, REMAP } from '../data/defaults';

interface MorphMap {
  [key: string]: { minIdx: number; maxIdx: number };
}
interface TuneMap {
  [key: string]: number;
}

interface AvatarModelProps {
  params: CharacterParams;
  tuneValues: TuneValues;
  skinToneRGB: [number, number, number];
}

export default function AvatarModel({ params, tuneValues, skinToneRGB }: AvatarModelProps) {
  const { scene } = useGLTF('/template.glb');

  const meshesRef = useRef<THREE.Mesh[]>([]);
  const allMeshesRef = useRef<THREE.Mesh[]>([]);
  const morphMapRef = useRef<MorphMap>({});
  const tuneMapRef = useRef<TuneMap>({});
  const paramsRef = useRef(params);
  const tuneRef = useRef(tuneValues);
  const skinRef = useRef(skinToneRGB);

  paramsRef.current = params;
  tuneRef.current = tuneValues;
  skinRef.current = skinToneRGB;

  useEffect(() => {
    if (!scene) return;

    const morphMeshes: THREE.Mesh[] = [];
    const allMeshes: THREE.Mesh[] = [];
    const morphMap: MorphMap = {};
    const tuneMap: TuneMap = {};

    // Remove Icosphere helper
    const toRemove: THREE.Object3D[] = [];
    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        if (child.name === 'Icosphere') {
          toRemove.push(child);
        } else {
          allMeshes.push(child as THREE.Mesh);
          (child as THREE.Mesh).frustumCulled = false;
        }
      }
    });
    for (const obj of toRemove) obj.removeFromParent();

    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        if (mesh.morphTargetDictionary && mesh.morphTargetInfluences) {
          mesh.morphTargetInfluences.fill(0);
          morphMeshes.push(mesh);

          if (Object.keys(morphMap).length === 0) {
            const dict = mesh.morphTargetDictionary;
            for (const key of PARAM_KEYS) {
              const minKey = `${key}_min`;
              const maxKey = `${key}_max`;
              if (minKey in dict && maxKey in dict) {
                morphMap[key] = { minIdx: dict[minKey], maxIdx: dict[maxKey] };
              }
            }
            for (const key of TUNE_KEYS) {
              if (key in dict) {
                tuneMap[key] = dict[key];
              }
            }
          }
        }
      }
    });

    // Set up materials
    for (const mesh of allMeshes) {
      const mat = mesh.material;
      if (mat && 'color' in mat) {
        const stdMat = mat as THREE.MeshStandardMaterial;
        // Strip any embedded textures (won't load properly from GLB in some contexts)
        stdMat.map = null;
        stdMat.color.setRGB(...skinRef.current);
        stdMat.side = THREE.DoubleSide;
        stdMat.needsUpdate = true;
      }
    }

    // Center model
    const box = new THREE.Box3();
    if (morphMeshes.length > 0) {
      const posAttr = morphMeshes[0].geometry.attributes.position;
      const v = new THREE.Vector3();
      for (let i = 0; i < posAttr.count; i++) {
        v.set(posAttr.getX(i), posAttr.getY(i), posAttr.getZ(i));
        box.expandByPoint(v);
      }
    } else {
      box.setFromObject(scene);
    }
    const center = box.getCenter(new THREE.Vector3());
    scene.position.set(-center.x, -box.min.y, -center.z);

    meshesRef.current = morphMeshes;
    allMeshesRef.current = allMeshes;
    morphMapRef.current = morphMap;
    tuneMapRef.current = tuneMap;
  }, [scene]);

  // Apply morph targets every frame
  useFrame(() => {
    const meshes = meshesRef.current;
    const map = morphMapRef.current;
    const tMap = tuneMapRef.current;
    const p = paramsRef.current;
    const t = tuneRef.current;

    for (const mesh of meshes) {
      if (!mesh.morphTargetInfluences) continue;

      for (const key of PARAM_KEYS) {
        const entry = map[key];
        if (!entry) continue;
        const raw = p[key as ParamKey] as number;
        const remap = REMAP[key as ParamKey];
        const v = remap ? remap[0] + raw * (remap[1] - remap[0]) : raw;
        const scale = MORPH_SCALE[key as ParamKey] ?? 1;
        mesh.morphTargetInfluences[entry.minIdx] = Math.max(0, (1 - 2 * v)) * scale;
        mesh.morphTargetInfluences[entry.maxIdx] = Math.max(0, (2 * v - 1)) * scale;
      }

      for (const key of TUNE_KEYS) {
        const idx = tMap[key];
        if (idx !== undefined) {
          mesh.morphTargetInfluences[idx] = t[key as TuneKey] ?? 0;
        }
      }
    }
  });

  // Skin tone update
  useEffect(() => {
    for (const mesh of allMeshesRef.current) {
      const mat = mesh.material;
      if (mat && 'color' in mat) {
        (mat as THREE.MeshStandardMaterial).color.setRGB(...skinToneRGB);
      }
    }
  }, [skinToneRGB]);

  return <primitive object={scene} />;
}
