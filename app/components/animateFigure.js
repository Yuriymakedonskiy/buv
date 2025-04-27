'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';

export function Model({ url }) {
  const modelRef = useRef();
  const { scene } = useGLTF(url);

  useFrame(() => {
    if (modelRef.current) {
      modelRef.current.rotation.y += 0.015; // вращение модели
    }
  });

  return <primitive ref={modelRef} object={scene} scale={1} />;
}
