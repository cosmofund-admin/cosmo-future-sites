
import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, Box, Sphere } from '@react-three/drei';
import { motion } from 'framer-motion';

const LogoMesh: React.FC = () => {
  const meshRef = useRef<any>();
  const sphereRef = useRef<any>();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime) * 0.2;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
    if (sphereRef.current) {
      sphereRef.current.rotation.x += 0.01;
      sphereRef.current.rotation.y += 0.01;
    }
  });

  return (
    <group ref={meshRef}>
      <Box ref={sphereRef} args={[1, 1, 1]} position={[0, 0, 0]}>
        <meshStandardMaterial 
          color="#00ffff"
          emissive="#8b5cf6"
          emissiveIntensity={0.3}
          transparent
          opacity={0.8}
        />
      </Box>
      <Sphere args={[0.6]} position={[0, 0, 0]}>
        <meshStandardMaterial 
          color="#f472b6"
          emissive="#00ffff"
          emissiveIntensity={0.2}
          transparent
          opacity={0.6}
          wireframe
        />
      </Sphere>
      <Text
        position={[0, -1.5, 0]}
        fontSize={0.5}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        font="/fonts/inter-bold.woff"
      >
        CosmoLab
      </Text>
    </group>
  );
};

const Logo3D: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, ease: "easeOut" }}
      className="w-64 h-64 mx-auto"
    >
      <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} color="#00ffff" intensity={1} />
        <pointLight position={[-10, -10, -10]} color="#8b5cf6" intensity={0.5} />
        <LogoMesh />
      </Canvas>
    </motion.div>
  );
};

export default Logo3D;
