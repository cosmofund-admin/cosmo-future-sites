import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Box, Torus, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

const AnimatedBox = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.3;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.2;
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.1;
    }
  });

  return (
    <Box ref={meshRef} args={[1, 1, 1]}>
      <meshStandardMaterial color="#333333" metalness={0.8} roughness={0.2} />
    </Box>
  );
};

const AnimatedTorus = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2;
      meshRef.current.rotation.z = state.clock.elapsedTime * 0.4;
      meshRef.current.position.x = Math.cos(state.clock.elapsedTime * 0.5) * 0.5;
    }
  });

  return (
    <Torus ref={meshRef} args={[0.8, 0.3, 16, 100]} position={[2, 0, 0]}>
      <meshStandardMaterial color="#666666" metalness={0.9} roughness={0.1} />
    </Torus>
  );
};

const Logo3D: React.FC = () => {
  return (
    <div className="w-full h-96 relative">
      <Canvas className="bg-transparent">
        <PerspectiveCamera makeDefault position={[0, 0, 5]} />
        <ambientLight intensity={0.3} />
        <directionalLight position={[10, 10, 5]} intensity={1} color="#ffffff" />
        <directionalLight position={[-10, -10, -5]} intensity={0.5} color="#ffffff" />
        
        <AnimatedBox />
        <AnimatedTorus />
        
        {/* Fog for depth */}
        <fog attach="fog" args={['#000000', 3, 10]} />
      </Canvas>
    </div>
  );
};

export default Logo3D;