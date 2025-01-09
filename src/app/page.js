"use client";
import React from "react";
import { Canvas, useFrame } from "@react-three/fiber";

export default function Home() {
  return (
    <div className="flex items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <Canvas className="w-full h-full">
          <AnimatedBox />
          <directionalLight position={[2, 5, 1]} />
        </Canvas>
      </main>
    </div>
  );
}
function AnimatedBox() {
  const boxRef = React.useRef();

  useFrame(() => {
    // Animation Code
    boxRef.current.rotation.x += 0.005;
    boxRef.current.rotation.y += 0.005;
    boxRef.current.rotation.z += 0.005;
  });
  return (
    <mesh ref={boxRef}>
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial color={0x00bfff} />
    </mesh>
  );
}
