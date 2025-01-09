"use client";
import { ModelViewer } from "@/gltf";
import React from "react";

export default function Home() {
  return (
    <div className="flex bg-white items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <ModelViewer scale="0.5" modelPath={"/box.glb"} position={[0, -10, 0]} />
    </div>
  );
}
