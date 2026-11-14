import { useEffect, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF, Html } from '@react-three/drei';
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
  registerPlanet,
}) {
  const groupRef = useRef();
  const meshRef = useRef();
  const ringRef = useRef();

  // Load the GLB model from /models/planetas/...
  const { scene } = useGLTF(model);

  // Register this planet's mesh reference so camera controller can track its world coordinates
  useEffect(() => {
    if (meshRef.current && registerPlanet) {
      registerPlanet(name, meshRef.current);
    }
  }, [name, registerPlanet]);

  useFrame((state, delta) => {
    // When selected, pause orbital revolution so the camera frames it stably
    const canOrbit = !paused && !isSelected && distance > 0;
    if (canOrbit && groupRef.current) {
      groupRef.current.rotation.y += orbitSpeed * 15 * delta;
    }

    // Axial spin continues so the planet rotates on its own axis
    if (meshRef.current) {
      meshRef.current.rotation.y += (isSun ? 0.2 : 0.45) * delta;
    }

    // Gentle pulse animation for the selection ring
    if (isSelected && ringRef.current) {
      const pulse = 1 + Math.sin(state.clock.elapsedTime * 4) * 0.05;
      ringRef.current.scale.set(pulse, pulse, pulse);
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
        onPointerOver={(e) => {
          e.stopPropagation();
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={(e) => {
          e.stopPropagation();
          document.body.style.cursor = 'auto';
        }}
      >
        <primitive object={clonedScene} />

        {/* Emissive glow for Sun */}
        {isSun && (
          <pointLight color="#fbbf24" intensity={100} distance={160} decay={1.8} />
        )}

        {/* Selection indicator ring with animated pulsing */}
        {isSelected && (
          <group ref={ringRef} rotation={[Math.PI / 2, 0, 0]}>
            <mesh>
              <ringGeometry args={[1.35, 1.48, 48]} />
              <meshBasicMaterial color="#38bdf8" side={THREE.DoubleSide} transparent opacity={0.85} />
            </mesh>
            <mesh>
              <ringGeometry args={[1.55, 1.6, 48]} />
              <meshBasicMaterial color="#4f8ef7" side={THREE.DoubleSide} transparent opacity={0.4} />
            </mesh>
          </group>
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
