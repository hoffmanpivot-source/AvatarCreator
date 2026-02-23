import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Suspense } from 'react';
import AvatarModel from './AvatarModel';
import type { CharacterParams, TuneValues } from '../types/character';

interface AvatarViewerProps {
  params: CharacterParams;
  tuneValues: TuneValues;
  skinToneRGB: [number, number, number];
}

export default function AvatarViewer({ params, tuneValues, skinToneRGB }: AvatarViewerProps) {
  return (
    <div style={{ width: '100%', height: '100%', background: '#1a1a2e' }}>
      <Canvas
        camera={{ position: [0, 0.8, 2.5], fov: 45 }}
        gl={{ antialias: true }}
      >
        <ambientLight intensity={1.0} />
        <directionalLight position={[2, 3, 4]} intensity={1.2} />
        <directionalLight position={[-2, 1, 2]} intensity={0.5} />
        <directionalLight position={[0, -2, 4]} intensity={0.4} />
        <Suspense fallback={null}>
          <AvatarModel
            params={params}
            tuneValues={tuneValues}
            skinToneRGB={skinToneRGB}
          />
        </Suspense>
        <OrbitControls
          target={[0, 0.8, 0]}
          minDistance={0.5}
          maxDistance={6}
          enablePan={true}
        />
        <gridHelper args={[4, 20, '#333', '#222']} />
      </Canvas>
    </div>
  );
}
