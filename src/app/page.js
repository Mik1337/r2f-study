"use client";
import { ModelViewer } from "@/gltf";
import { useRef, useEffect } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

export default function Home() {
  const controlsRef = useRef();

  useEffect(() => {
    const controls = controlsRef.current;
    if (controls) {
      console.log("Orbit position:", controls.target);
    }
  }, []);

  return (
    <div className="flex bg-red-100  justify-center items-center h-screen">
      <Canvas>
        <ambientLight position={[0, 0, 5]} intensity={10} />
        <directionalLight position={[0, 0, 5]} intensity={10} />
        <MeshComponent />
        <OrbitControls />
      </Canvas>
    </div>
  );
}

function MeshComponent() {
  const fileUrl = "/untitled.glb";
  const mesh = useRef(null);
  const gltf = useLoader(GLTFLoader, fileUrl);

  // Re-add the useFrame hook to rotate the object
  useFrame(() => {
    if (mesh.current) {
      mesh.current.rotation.y += 0.01;
    }
  });

  return (
    <mesh ref={mesh}>
      <primitive object={gltf.scene} position={[0, 0, 0]} />
    </mesh>
  );
}
