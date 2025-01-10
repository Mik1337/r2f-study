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
import { DirectionalLightHelper, SpotLightHelper } from "three";
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
    <div className="flexjustify-center items-center h-screen">
      <Canvas>
        {/* Gizmo Wrapper */}
        {/* <GizmoHelper alignment="bottom-right" margin={[80, 80]}>
          <GizmoViewport />
          <GizmoViewcube />
        </GizmoHelper>
        <gridHelper args={[20, 20, 0xff22aa, 0x55ccff]} /> */}
        {/* <AnimatedBox /> */}
        <TShirt fileUrl="/untitled.glb" scale={1} position={[0, 0, 0]} />
        {/* <SpotLightWithHelper
          intensity={200}
          position={[1, 5, 0]}
          angle={Math.PI / 8}
        /> */}
        {/* <ambientLight color={0xfcfcfc} /> */}
        {/* front */}
        <DirectionalLightWithHelper
          color="0x000"
          intensity={30}
          position={[1, 0, 10]}
        />
        {/* back */}
        <DirectionalLightWithHelper
          color="0x000"
          intensity={30}
          position={[-1, 0, -10]}
        />
        {/* right */}
        <DirectionalLightWithHelper
          color="red"
          intensity={50}
          position={[-10, 0, 0]}
        />
        {/* left */}
        <DirectionalLightWithHelper
          color="yellow"
          intensity={100}
          position={[10, 0, 0]}
        />

        <OrbitControls />
      </Canvas>
    </div>
  );
}

function DirectionalLightWithHelper({
  intensity,
  position,
  angle = 0,
  color = "0xff22aa",
}) {
  const light = useRef();

  // useHelper(light, DirectionalLightHelper, 2, color);

  // useFrame(({ clock }) => {
  //   const elapsedTime = clock.getElapsedTime();
  //   light.current.position.x = radius * Math.cos(elapsedTime * speed);
  //   light.current.position.z = radius * Math.sin(elapsedTime * speed);
  // });

  return (
    <directionalLight
      ref={light}
      intensity={intensity}
      position={position}
      angle={angle}
      color={color}
      castShadow
    />
  );
}

function SpotLightWithHelper({
  intensity,
  position,
  angle = 0,
  color = "0x000",
}) {
  const light = useRef();

  useHelper(light, SpotLightHelper, "orange");

  return (
    <spotLight
      ref={light}
      intensity={intensity}
      position={position}
      angle={angle}
      color={color}
    />
  );
}

function TShirt({ fileUrl = "untitled.glb", position = [0, 0, 0] }, scale = 1) {
  const mesh = useRef(null);
  const gltf = useLoader(GLTFLoader, fileUrl);

  // Re-add the useFrame hook to rotate the object
  useFrame(() => {
    if (mesh.current) {
      mesh.current.rotation.y += 0.01;
    }
  });

  return (
    <mesh ref={mesh} scale={scale}>
      <primitive object={gltf.scene} position={position} />
    </mesh>
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
