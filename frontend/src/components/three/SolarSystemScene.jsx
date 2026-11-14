import { Suspense, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import * as THREE from 'three';
import PlanetModel from './PlanetModel.jsx';
import { PLANETS } from '../../services/mockData.js';
import { useApp } from '../../context/AppContext.jsx';

function OrbitRing({ radius }) {
  if (radius <= 0) return null;
  return (
    <mesh rotation={[Math.PI / 2, 0, 0]}>
      <ringGeometry args={[radius - 0.04, radius + 0.04, 96]} />
      <meshBasicMaterial
        color="#223354"
        side={THREE.DoubleSide}
        transparent
        opacity={0.35}
      />
    </mesh>
  );
}

function SceneContent({ paused }) {
  const { focusPlanet, setFocusPlanet } = useApp();
  const controlsRef = useRef();

  return (
    <>
      <color attach="background" args={['#040711']} />
      <ambientLight intensity={0.4} />
      <pointLight position={[0, 0, 0]} intensity={120} distance={200} decay={1.5} color="#fff8e7" />

      {/* OrbitControls configured to orbit nicely with center shifted right */}
      <OrbitControls
        ref={controlsRef}
        makeDefault
        target={[4, 0, 0]}
        minDistance={6}
        maxDistance={80}
        maxPolarAngle={Math.PI / 2 + 0.15}
        enableDamping
        dampingFactor={0.05}
      />

      <Stars radius={120} depth={60} count={3000} factor={4} saturation={0} fade speed={1} />

      <Suspense fallback={null}>
        {PLANETS.map((planet) => {
          const isSun = planet.name === 'Sol';
          return (
            <group key={planet.name}>
              <OrbitRing radius={planet.distance} />
              <PlanetModel
                name={planet.name}
                model={planet.model}
                size={planet.size}
                distance={planet.distance}
                orbitSpeed={planet.orbitSpeed}
                color={planet.color}
                isSun={isSun}
                isSelected={focusPlanet === planet.name}
                onClick={(name) => setFocusPlanet(name)}
                paused={paused}
              />
            </group>
          );
        })}
      </Suspense>
    </>
  );
}

export default function SolarSystemScene({ paused = false }) {
  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      <Canvas
        camera={{ position: [14, 18, 28], fov: 42 }}
        gl={{ antialias: true, alpha: false }}
        style={{ width: '100%', height: '100%', background: '#040711' }}
      >
        <SceneContent paused={paused} />
      </Canvas>
    </div>
  );
}
