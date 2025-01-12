"use client";
import { useRef, useEffect, useState } from "react";
import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
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

const objs = [
  { name: "Space Man", url: "/Astronaut.glb" },
  { name: "A Box", url: "/box.glb" },
  { name: "A Small Shirt", url: "/sample.glb" },
  { name: "A Shirt", url: "/untitled.glb" },
];

export default function Home() {
  const [fileUrl, setFileUrl] = useState(objs[0]);
  const controlsRef = useRef();

  function selectFile(index) {
    setFileUrl(objs[index]);
  }

  useEffect(() => {
    const controls = controlsRef.current;
    if (controls) {
      console.log("Orbit position:", controls.target);
    }
  }, []);

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div className="p-10  w-full last:flex flex-col justify-center items-center h-screen">
        <h1 className="text-7xl">{fileUrl.name}</h1>
        <Canvas>
          <CameraController />
          {/* Gizmo Wrapper */}
          <GizmoHelper alignment="bottom-right" margin={[80, 80]}>
            <GizmoViewport />
            <GizmoViewcube />
          </GizmoHelper>
          <gridHelper args={[20, 20, 0xff22aa, 0x55ccff]} />
          {/* <AnimatedBox /> */}
          <TShirt fileUrl={fileUrl.url} scale={10} position={[0, 0, 0]} />
          {/* <SpotLightWithHelper
          intensity={200}
          position={[1, 5, 0]}
          angle={Math.PI / 8}
        /> */}
          {/* <ambientLight color={0xfcfcfc} /> */}
          {/* front */}
          <DirectionalLightWithHelper
            color="0x000"
            intensity={200}
            position={[1, 0, 10]}
          />
          {/* back */}
          <DirectionalLightWithHelper
            color="0x000"
            intensity={200}
            position={[-1, 0, -10]}
          />
          {/* right */}
          <DirectionalLightWithHelper
            color="red"
            intensity={200}
            position={[-10, 0, 0]}
          />
          {/* left */}
          <DirectionalLightWithHelper
            color="yellow"
            intensity={200}
            position={[10, 0, 0]}
          />

          <OrbitControls
            minDistance={5}
            maxDistance={20}
            minPolarAngle={Math.PI / 4}
            maxPolarAngle={Math.PI / 2}
          />
        </Canvas>
        <div className="flex overflow-xscroll h-8 w-full">
          {objs.map((obj, index) => (
            <div
              key={index}
              className="cursor-pointer p-2 hover:bg-gray-800"
              onClick={() => selectFile(index)}
            >
              {obj.name}
            </div>
          ))}
        </div>
      </div>
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

  useHelper(light, DirectionalLightHelper, 2, color);

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
      mesh.current.rotation.y += 0.005;
    }
  });

  return (
    <mesh ref={mesh} scale={2}>
      <primitive object={gltf.scene} position={position} />
    </mesh>
  );
}

function CameraController() {
  const { camera } = useThree();

  useEffect(() => {
    // Set the camera position
    camera.position.set(10, 2, 5);

    // Set the camera rotation
    camera.rotation.set(0, Math.PI / 4, 0);

    // Update the camera
    camera.updateProjectionMatrix();
  }, [camera]);

  return null;
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
