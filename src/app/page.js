"use client";
import { useRef, useEffect } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import {
  GizmoHelper,
  GizmoViewcube,
  GizmoViewport,
  OrbitControls,
  useHelper,
} from "@react-three/drei";
import { SpotLightHelper } from "three";
// import { useControls } from "leva";
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
        {/* Gizmo Wrapper */}
        <GizmoHelper alignment="bottom-right" margin={[80, 80]}>
          <GizmoViewport />
          <GizmoViewcube />
        </GizmoHelper>
        <gridHelper args={[20, 20, 0xff22aa, 0x55ccff]} />
        {/* <AnimatedBox /> */}
        <TShirt />
        <SpotLightWithHelper />
        <OrbitControls />
      </Canvas>
    </div>
  );
}

function AnimatedBox() {
  const boxRef = useRef();

  // let { speed } = useControls({
  //   speed: {
  //     value: 0.005,
  //     min: 0.0,
  //     max: 0.03,
  //     step: 0.001,
  //   },
  // });

  useFrame(() => {
    // Animation Code
    boxRef.current.rotation.y += 0.01;
  });

  return (
    <mesh ref={boxRef}>
      <boxGeometry args={[2, 3, 2]} />
      <meshPhongMaterial color={0x00bfff} />
    </mesh>
  );
}

function SpotLightWithHelper() {
  const light = useRef();

  useHelper(light, SpotLightHelper, "orange");

  return (
    <spotLight
      ref={light}
      intensity={50}
      position={[4, 2, 3]}
      angle={Math.PI / 8}
    />
  );
}

function TShirt({ fileUrl = "untitled.glb", position = [0, 0, 0] }) {
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
      <primitive object={gltf.scene} position={position} />
    </mesh>
  );
}
