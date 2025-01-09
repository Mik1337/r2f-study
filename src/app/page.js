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
        <ambientLight intensity={0.1} />
        <spotLight position={[0, 10, 10]} angle={0.15} penumbra={1} />
        <pointLight position={[10, 10, -10]} />
        <OrbitControls ref={controlsRef} />
        <MeshComponent />
      </Canvas>
    </div>
  );
}

function MeshComponent() {
  const fileUrl = "/untitled.glb";
  const mesh = useRef(null);
  const gltf = useLoader(GLTFLoader, fileUrl);

  useFrame(() => {
    mesh.current.rotation.y += 0.01;
  });

  return (
    <mesh ref={mesh}>
      <primitive object={gltf.scene} position={[0, 0, 0]} />
    </mesh>
  );
}
