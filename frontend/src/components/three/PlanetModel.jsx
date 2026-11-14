import { Suspense, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

export default function PlanetModel({
  name,
  model,
  size = 1,
  distance = 10,
  orbitSpeed = 0.005,
  color,
  isSun = false,
  isSelected = false,
  onClick,
  paused = false,
}) {
  const groupRef = useRef();
  const meshRef = useRef();

  // Load the GLB model from /models/planetas/...
  const { scene } = useGLTF(model);

  useFrame((state, delta) => {
    if (!paused && groupRef.current && distance > 0) {
      groupRef.current.rotation.y += orbitSpeed * 15 * delta;
    }
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.5 * delta;
    }
  });

  // Clone scene so multiple instances don't collide
  const clonedScene = scene.clone();

  return (
    <group ref={groupRef}>
      <group
        ref={meshRef}
        position={[distance, 0, 0]}
        scale={[size, size, size]}
        onClick={(e) => {
          e.stopPropagation();
          onClick?.(name);
        }}
        onPointerOver={() => (document.body.style.cursor = 'pointer')}
        onPointerOut={() => (document.body.style.cursor = 'auto')}
      >
        <primitive object={clonedScene} />

        {/* Emissive glow for Sun */}
        {isSun && (
          <pointLight color="#fbbf24" intensity={80} distance={150} decay={2} />
        )}

        {/* Selection indicator ring */}
        {isSelected && (
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <ringGeometry args={[1.4, 1.6, 32]} />
            <meshBasicMaterial color="#4f8ef7" side={THREE.DoubleSide} />
          </mesh>
        )}
      </group>
    </group>
  );
}

// Preload planet models
const PLANET_MODELS = [
  'Sol.glb', 'Mercurio.glb', 'Venus.glb', 'Tierra.glb', 'Luna.glb',
  'Marte.glb', 'Jupiter.glb', 'Saturno.glb', 'Urano.glb', 'Neptuno.glb'
];
PLANET_MODELS.forEach((file) => {
  useGLTF.preload(`/models/planetas/${file}`);
});
