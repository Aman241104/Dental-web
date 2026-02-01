"use client";

import { useEffect } from "react";
import { useGLTF, Float, Center } from "@react-three/drei";
import * as THREE from "three";

// Preload the GLB
useGLTF.preload("/teeth.glb");

export default function ToothModel({ scale = 1 }: { scale?: number }) {
  const { scene } = useGLTF("/teeth.glb");
  const clonedScene = scene.clone(); // Clone for multiple instances

  useEffect(() => {
     clonedScene.traverse((object) => {
         if ((object as THREE.Mesh).isMesh) {
             const mesh = object as THREE.Mesh;
             if (mesh.material) {
                 const mat = mesh.material as THREE.MeshStandardMaterial;
                 mat.envMapIntensity = 1.2;
                 mat.metalness = 0.1;
                 mat.roughness = 0.2;
                 mat.needsUpdate = true;
             }
         }
     });
  }, [clonedScene]);

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        <Center>
            <primitive object={clonedScene} scale={scale} rotation={[0, 0, 0]} />
        </Center>
    </Float>
  );
}
