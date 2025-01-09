"use client";
import { ModelViewer } from "@/gltf";
import { useRef } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Mesh } from "three";

export default function Home() {
  return (
    <div className="flex bg-red-50 justify-center items-center h-screen">
      <Canvas className="h-2xl w-2xl">
        <ambientLight intensity={0.3} />
        {/* <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} /> */}
        <pointLight position={[-10, -10, -10]} />
        <OrbitControls />
        <MeshComponent />
      </Canvas>
    </div>
  );
}

function MeshComponent() {
  const fileUrl = "/Tshirt.glb";
  const mesh = useRef(null);
  const gltf = useLoader(GLTFLoader, fileUrl);

  useFrame(() => {
    mesh.current.rotation.x += 0.01;
  });

  return (
    <mesh ref={mesh}>
      <primitive object={gltf.scene} />
    </mesh>
  );
}
